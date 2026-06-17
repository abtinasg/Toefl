import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Pen,
  Highlighter,
  Eraser,
  Undo2,
  Redo2,
  Trash2,
  Download,
  Hand,
} from 'lucide-react'
import { cn } from '../lib/utils'

export interface Pt {
  x: number
  y: number
  p: number
}
export interface Stroke {
  points: Pt[]
  color: string
  width: number
  tool: 'pen' | 'highlighter'
}

type Tool = 'pen' | 'highlighter' | 'eraser'

const COLORS = ['#0f172a', '#2563eb', '#dc2626', '#16a34a', '#d97706', '#7c3aed']
const WIDTHS = [2, 4, 7, 12]
const ERASER_RADIUS = 14

function pressureFactor(p: number) {
  // ماوس فشار ۰ یا ۰.۵ می‌دهد؛ قلم ۰..۱
  const v = p > 0 ? p : 0.5
  return 0.45 + 0.55 * v
}

function drawStroke(ctx: CanvasRenderingContext2D, s: Stroke) {
  ctx.save()
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.strokeStyle = s.color
  ctx.globalAlpha = s.tool === 'highlighter' ? 0.32 : 1
  const pts = s.points
  if (pts.length === 1) {
    const a = pts[0]
    ctx.fillStyle = s.color
    ctx.beginPath()
    ctx.arc(a.x, a.y, (s.width * pressureFactor(a.p)) / 2, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
    return
  }
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1]
    const b = pts[i]
    const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }
    ctx.beginPath()
    ctx.lineWidth = s.width * pressureFactor((a.p + b.p) / 2)
    ctx.moveTo(a.x, a.y)
    ctx.quadraticCurveTo(a.x, a.y, mid.x, mid.y)
    ctx.lineTo(b.x, b.y)
    ctx.stroke()
  }
  ctx.restore()
}

function dist2(a: Pt, x: number, y: number) {
  const dx = a.x - x
  const dy = a.y - y
  return dx * dx + dy * dy
}

export function HandwritingCanvas({
  strokes,
  onChange,
  height = 460,
}: {
  strokes: Stroke[]
  onChange: (s: Stroke[]) => void
  height?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const current = useRef<Stroke | null>(null)
  const erasingRef = useRef(false)
  const cssSize = useRef({ w: 0, h: height })

  const [tool, setTool] = useState<Tool>('pen')
  const [color, setColor] = useState(COLORS[0])
  const [width, setWidth] = useState(WIDTHS[1])
  const [penOnly, setPenOnly] = useState(false)
  const [redoStack, setRedoStack] = useState<Stroke[]>([])

  const getCtx = () => canvasRef.current?.getContext('2d') ?? null

  const redraw = useCallback(() => {
    const ctx = getCtx()
    const canvas = canvasRef.current
    if (!ctx || !canvas) return
    const dpr = window.devicePixelRatio || 1
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, cssSize.current.w, cssSize.current.h)
    for (const s of strokes) drawStroke(ctx, s)
    if (current.current) drawStroke(ctx, current.current)
  }, [strokes])

  const resize = useCallback(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const dpr = window.devicePixelRatio || 1
    const w = wrap.clientWidth
    const h = height
    cssSize.current = { w, h }
    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    redraw()
  }, [height, redraw])

  useEffect(() => {
    resize()
    const ro = new ResizeObserver(resize)
    if (wrapRef.current) ro.observe(wrapRef.current)
    return () => ro.disconnect()
  }, [resize])

  useEffect(() => {
    redraw()
  }, [strokes, redraw])

  const localPoint = (e: React.PointerEvent): Pt => {
    const rect = canvasRef.current!.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top, p: e.pressure }
  }

  const shouldDraw = (e: React.PointerEvent) => {
    if (penOnly && e.pointerType === 'touch') return false
    return true
  }

  const eraseAt = (x: number, y: number) => {
    const r2 = ERASER_RADIUS * ERASER_RADIUS
    const kept = strokes.filter((s) => !s.points.some((pt) => dist2(pt, x, y) < r2))
    if (kept.length !== strokes.length) onChange(kept)
  }

  const onPointerDown = (e: React.PointerEvent) => {
    if (!shouldDraw(e)) return
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
    const pt = localPoint(e)
    if (tool === 'eraser') {
      erasingRef.current = true
      eraseAt(pt.x, pt.y)
      return
    }
    current.current = { points: [pt], color, width, tool }
    redraw()
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (tool === 'eraser') {
      if (erasingRef.current) {
        const pt = localPoint(e)
        eraseAt(pt.x, pt.y)
      }
      return
    }
    if (!current.current) return
    // رویدادهای فشرده‌شده برای خطوط نرم‌تر
    const events = (e.nativeEvent.getCoalescedEvents?.() as PointerEvent[]) || [e.nativeEvent]
    const rect = canvasRef.current!.getBoundingClientRect()
    for (const ev of events) {
      current.current.points.push({
        x: ev.clientX - rect.left,
        y: ev.clientY - rect.top,
        p: ev.pressure,
      })
    }
    redraw()
  }

  const finishStroke = () => {
    if (tool === 'eraser') {
      erasingRef.current = false
      return
    }
    if (current.current && current.current.points.length) {
      onChange([...strokes, current.current])
      setRedoStack([])
    }
    current.current = null
  }

  const undo = () => {
    if (!strokes.length) return
    const last = strokes[strokes.length - 1]
    setRedoStack((r) => [...r, last])
    onChange(strokes.slice(0, -1))
  }
  const redo = () => {
    if (!redoStack.length) return
    const last = redoStack[redoStack.length - 1]
    setRedoStack((r) => r.slice(0, -1))
    onChange([...strokes, last])
  }
  const clearAll = () => {
    if (strokes.length && confirm('کل دست‌نوشته پاک شود؟')) {
      onChange([])
      setRedoStack([])
    }
  }

  const exportPng = () => {
    const { w, h } = cssSize.current
    const dpr = window.devicePixelRatio || 1
    const off = document.createElement('canvas')
    off.width = w * dpr
    off.height = h * dpr
    const ctx = off.getContext('2d')!
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, w, h)
    for (const s of strokes) drawStroke(ctx, s)
    const a = document.createElement('a')
    a.href = off.toDataURL('image/png')
    a.download = `note-${Date.now()}.png`
    a.click()
  }

  const ToolBtn = ({
    active,
    onClick,
    label,
    children,
  }: {
    active?: boolean
    onClick: () => void
    label: string
    children: React.ReactNode
  }) => (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-lg transition',
        active
          ? 'bg-brand-600 text-white'
          : 'bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700',
      )}
    >
      {children}
    </button>
  )

  return (
    <div className="flex flex-col gap-3">
      {/* نوار ابزار */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex gap-1.5">
          <ToolBtn active={tool === 'pen'} onClick={() => setTool('pen')} label="قلم">
            <Pen size={17} />
          </ToolBtn>
          <ToolBtn
            active={tool === 'highlighter'}
            onClick={() => setTool('highlighter')}
            label="ماژیک"
          >
            <Highlighter size={17} />
          </ToolBtn>
          <ToolBtn active={tool === 'eraser'} onClick={() => setTool('eraser')} label="پاک‌کن">
            <Eraser size={17} />
          </ToolBtn>
        </div>

        <div className="mx-1 h-6 w-px bg-slate-200 dark:bg-slate-700" />

        {/* رنگ‌ها */}
        <div className="flex gap-1.5">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => {
                setColor(c)
                if (tool === 'eraser') setTool('pen')
              }}
              aria-label={`رنگ ${c}`}
              className={cn(
                'h-7 w-7 rounded-full border-2 transition',
                color === c ? 'border-brand-400 scale-110' : 'border-transparent',
              )}
              style={{ background: c }}
            />
          ))}
        </div>

        <div className="mx-1 h-6 w-px bg-slate-200 dark:bg-slate-700" />

        {/* ضخامت */}
        <div className="flex items-center gap-1.5">
          {WIDTHS.map((w) => (
            <button
              key={w}
              onClick={() => setWidth(w)}
              aria-label={`ضخامت ${w}`}
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-lg transition',
                width === w
                  ? 'bg-brand-100 dark:bg-brand-900/40'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800',
              )}
            >
              <span
                className="rounded-full bg-slate-700 dark:bg-slate-200"
                style={{ width: w + 2, height: w + 2 }}
              />
            </button>
          ))}
        </div>

        <div className="mr-auto flex gap-1.5">
          <ToolBtn
            active={penOnly}
            onClick={() => setPenOnly((v) => !v)}
            label="فقط قلم (پس‌زدن کف دست)"
          >
            <Hand size={17} />
          </ToolBtn>
          <ToolBtn onClick={undo} label="واگرد">
            <Undo2 size={17} />
          </ToolBtn>
          <ToolBtn onClick={redo} label="ازنو">
            <Redo2 size={17} />
          </ToolBtn>
          <ToolBtn onClick={exportPng} label="خروجی PNG">
            <Download size={17} />
          </ToolBtn>
          <ToolBtn onClick={clearAll} label="پاک‌کردن همه">
            <Trash2 size={17} />
          </ToolBtn>
        </div>
      </div>

      {/* بوم */}
      <div
        ref={wrapRef}
        className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, transparent 31px, rgba(148,163,184,0.18) 32px)',
          backgroundSize: '100% 32px',
        }}
      >
        <canvas
          ref={canvasRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={finishStroke}
          onPointerLeave={finishStroke}
          onPointerCancel={finishStroke}
          className={cn(
            'block touch-none',
            tool === 'eraser' ? 'cursor-cell' : 'cursor-crosshair',
          )}
        />
      </div>
      <p className="text-xs text-slate-400">
        با Apple Pencil یا انگشت بنویس؛ فشار قلم روی ضخامت خط اثر می‌گذارد. برای جلوگیری از خط‌افتادن
        کف دست، «فقط قلم» را روشن کن.
      </p>
    </div>
  )
}
