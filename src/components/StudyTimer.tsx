import { useEffect, useRef, useState } from 'react'
import { Play, Pause, RotateCcw, Timer as TimerIcon } from 'lucide-react'
import { Card } from './ui'
import { cn, toFa } from '../lib/utils'

interface Preset {
  label: string
  minutes: number
  color: string
}

// زمان‌ها مطابق بخش‌های آزمون ۲۰۲۶ + پومودورو
const PRESETS: Preset[] = [
  { label: 'پومودورو', minutes: 25, color: 'bg-brand-500' },
  { label: 'ریدینگ ۳۰′', minutes: 30, color: 'bg-blue-500' },
  { label: 'لیسنینگ ۲۹′', minutes: 29, color: 'bg-violet-500' },
  { label: 'رایتینگ ۲۳′', minutes: 23, color: 'bg-amber-500' },
  { label: 'اسپیکینگ ۸′', minutes: 8, color: 'bg-rose-500' },
  { label: 'استراحت ۵′', minutes: 5, color: 'bg-emerald-500' },
]

function beep() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = 880
    gain.gain.setValueAtTime(0.001, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.05)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8)
    osc.start()
    osc.stop(ctx.currentTime + 0.85)
  } catch {
    /* صدا در دسترس نیست */
  }
}

export function StudyTimer() {
  const [preset, setPreset] = useState(PRESETS[0])
  const [remaining, setRemaining] = useState(PRESETS[0].minutes * 60)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    if (!running) return
    intervalRef.current = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          beep()
          setRunning(false)
          return 0
        }
        return r - 1
      })
    }, 1000)
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current)
    }
  }, [running])

  const pick = (p: Preset) => {
    setPreset(p)
    setRemaining(p.minutes * 60)
    setRunning(false)
  }
  const reset = () => {
    setRemaining(preset.minutes * 60)
    setRunning(false)
  }

  const total = preset.minutes * 60
  const pct = total ? ((total - remaining) / total) * 100 : 0
  const mm = String(Math.floor(remaining / 60)).padStart(2, '0')
  const ss = String(remaining % 60).padStart(2, '0')

  return (
    <Card>
      <div className="mb-4 flex items-center gap-2">
        <TimerIcon size={18} className="text-brand-600" />
        <h3 className="font-bold">تایمر تمرین</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            onClick={() => pick(p)}
            className={cn(
              'rounded-lg px-3 py-1.5 text-xs font-medium transition',
              preset.label === p.label
                ? `${p.color} text-white`
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700',
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-col items-center">
        <div
          className="font-mono text-5xl font-black tabular-nums tracking-tight"
          dir="ltr"
        >
          {toFa(mm)}:{toFa(ss)}
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            className={cn('h-full rounded-full transition-all duration-300', preset.color)}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="mt-5 flex justify-center gap-3">
        <button
          onClick={() => setRunning((r) => !r)}
          disabled={remaining === 0}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-700 disabled:opacity-40"
        >
          {running ? <Pause size={18} /> : <Play size={18} />}
          {running ? 'مکث' : 'شروع'}
        </button>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
        >
          <RotateCcw size={16} /> ریست
        </button>
      </div>
    </Card>
  )
}
