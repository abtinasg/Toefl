import { useMemo, useState } from 'react'
import {
  Plus,
  Trash2,
  Search,
  Pin,
  PinOff,
  StickyNote,
  ChevronRight,
  Clock,
  Type,
  PenLine,
} from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Card } from '../components/ui'
import { HandwritingCanvas, type Stroke } from '../components/HandwritingCanvas'
import { cn, toFa } from '../lib/utils'

interface Note {
  id: string
  title: string
  body: string
  strokes?: Stroke[]
  mode?: 'text' | 'draw'
  createdAt: number
  updatedAt: number
  pinned: boolean
}

const fmtDate = (ts: number) => {
  try {
    return new Date(ts).toLocaleDateString('fa-IR', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return ''
  }
}

const countWords = (s: string) => (s.trim() ? s.trim().split(/\s+/).length : 0)

export function Notes() {
  const [notes, setNotes] = useLocalStorage<Note[]>('toefl-notes-v1', [])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  const sorted = useMemo(() => {
    const q = query.trim().toLowerCase()
    return [...notes]
      .filter(
        (n) =>
          !q ||
          n.title.toLowerCase().includes(q) ||
          n.body.toLowerCase().includes(q),
      )
      .sort((a, b) => {
        if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
        return b.updatedAt - a.updatedAt
      })
  }, [notes, query])

  const selected = notes.find((n) => n.id === selectedId) || null

  const createNote = () => {
    const now = Date.now()
    const note: Note = {
      id: crypto.randomUUID(),
      title: '',
      body: '',
      strokes: [],
      mode: 'draw',
      createdAt: now,
      updatedAt: now,
      pinned: false,
    }
    setNotes((prev) => [note, ...prev])
    setSelectedId(note.id)
  }

  const update = (id: string, patch: Partial<Note>) =>
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...patch, updatedAt: Date.now() } : n)),
    )

  const remove = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id))
    if (selectedId === id) setSelectedId(null)
  }

  const togglePin = (id: string, pinned: boolean) =>
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, pinned } : n)))

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-xl font-extrabold">📝 یادداشت‌ها</h2>
          <p className="mt-1 text-sm text-slate-400">
            دفترچه‌ی شخصی‌ات — قالب‌ها، نکته‌ها، واژگان و هرچی لازم داری. خودکار ذخیره می‌شود.
          </p>
        </div>
        <button
          onClick={createNote}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-700"
        >
          <Plus size={18} /> یادداشت جدید
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[20rem_1fr]">
        {/* فهرست یادداشت‌ها */}
        <div className={cn('space-y-3', selected && 'hidden lg:block')}>
          <div className="relative">
            <Search
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="جستجو در یادداشت‌ها…"
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pr-9 pl-3 text-sm outline-none focus:border-brand-400 dark:border-slate-700 dark:bg-slate-900"
            />
          </div>

          {sorted.length === 0 ? (
            <Card className="flex flex-col items-center gap-2 py-10 text-center">
              <StickyNote size={32} className="text-slate-300" />
              <p className="text-sm text-slate-400">
                {notes.length === 0
                  ? 'هنوز یادداشتی نداری. یکی بساز!'
                  : 'یادداشتی با این جستجو پیدا نشد.'}
              </p>
            </Card>
          ) : (
            <div className="space-y-2">
              {sorted.map((n) => (
                <button
                  key={n.id}
                  onClick={() => setSelectedId(n.id)}
                  className={cn(
                    'w-full rounded-xl border p-3 text-right transition',
                    selectedId === n.id
                      ? 'border-brand-400 bg-brand-50 dark:border-brand-700 dark:bg-brand-900/30'
                      : 'border-slate-200 bg-white hover:border-brand-300 dark:border-slate-800 dark:bg-slate-900',
                  )}
                >
                  <div className="flex items-center gap-1.5">
                    {n.pinned && <Pin size={13} className="shrink-0 text-amber-500" />}
                    <h4 className="truncate text-sm font-bold">
                      {n.title.trim() || 'بدون عنوان'}
                    </h4>
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">
                    {n.mode === 'text'
                      ? n.body.trim() || 'خالی…'
                      : `✍️ دست‌نویس · ${toFa(n.strokes?.length ?? 0)} خط`}
                  </p>
                  <div className="mt-2 flex items-center gap-1 text-[11px] text-slate-400">
                    <Clock size={11} /> {fmtDate(n.updatedAt)}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ویرایشگر */}
        <div className={cn(!selected && 'hidden lg:block')}>
          {selected ? (
            <Card className="flex min-h-[60vh] flex-col p-4">
              <div className="mb-3 flex items-center gap-2">
                <button
                  onClick={() => setSelectedId(null)}
                  className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 lg:hidden dark:hover:bg-slate-800"
                  aria-label="بازگشت"
                >
                  <ChevronRight size={20} />
                </button>
                <input
                  value={selected.title}
                  onChange={(e) => update(selected.id, { title: e.target.value })}
                  placeholder="عنوان یادداشت…"
                  className="flex-1 bg-transparent text-lg font-bold outline-none placeholder:text-slate-300"
                />
                <button
                  onClick={() => togglePin(selected.id, !selected.pinned)}
                  aria-label="سنجاق"
                  className={cn(
                    'rounded-lg p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800',
                    selected.pinned ? 'text-amber-500' : 'text-slate-400',
                  )}
                >
                  {selected.pinned ? <Pin size={18} /> : <PinOff size={18} />}
                </button>
                <button
                  onClick={() => remove(selected.id)}
                  aria-label="حذف"
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-rose-950/30"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* تب متن / دست‌نویس */}
              <div className="mb-3 inline-flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
                <button
                  onClick={() => update(selected.id, { mode: 'draw' })}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition',
                    (selected.mode ?? 'draw') === 'draw'
                      ? 'bg-white text-brand-700 shadow-sm dark:bg-slate-900 dark:text-brand-300'
                      : 'text-slate-500',
                  )}
                >
                  <PenLine size={15} /> دست‌نویس
                </button>
                <button
                  onClick={() => update(selected.id, { mode: 'text' })}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition',
                    selected.mode === 'text'
                      ? 'bg-white text-brand-700 shadow-sm dark:bg-slate-900 dark:text-brand-300'
                      : 'text-slate-500',
                  )}
                >
                  <Type size={15} /> متن
                </button>
              </div>

              {selected.mode === 'text' ? (
                <>
                  <textarea
                    value={selected.body}
                    onChange={(e) => update(selected.id, { body: e.target.value })}
                    placeholder="اینجا بنویس… (متن فارسی و انگلیسی هر دو پشتیبانی می‌شود)"
                    className="flex-1 resize-none bg-transparent text-sm leading-7 outline-none placeholder:text-slate-300"
                  />
                  <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-400 dark:border-slate-800">
                    <span>{toFa(countWords(selected.body))} کلمه</span>
                    <span>آخرین ویرایش: {fmtDate(selected.updatedAt)}</span>
                  </div>
                </>
              ) : (
                <HandwritingCanvas
                  key={selected.id}
                  strokes={selected.strokes ?? []}
                  onChange={(s) => update(selected.id, { strokes: s })}
                />
              )}
            </Card>
          ) : (
            <Card className="hidden min-h-[60vh] flex-col items-center justify-center gap-2 text-center lg:flex">
              <StickyNote size={40} className="text-slate-300" />
              <p className="text-sm text-slate-400">
                یک یادداشت را از فهرست انتخاب کن یا یکی جدید بساز.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
