import { useMemo, useState } from 'react'
import { Plus, Trash2, NotebookPen } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Card, Badge } from '../components/ui'
import { SKILL_META } from '../lib/skillMeta'
import type { SkillTag } from '../data/roadmap'
import { cn, toFa } from '../lib/utils'

interface ErrorEntry {
  id: string
  date: string
  skill: SkillTag
  text: string
}

const SKILLS: SkillTag[] = ['reading', 'listening', 'speaking', 'writing', 'vocab', 'grammar']

export function ErrorLog() {
  const [entries, setEntries] = useLocalStorage<ErrorEntry[]>('toefl-errorlog-v1', [])
  const [text, setText] = useState('')
  const [skill, setSkill] = useState<SkillTag>('reading')
  const [filter, setFilter] = useState<SkillTag | 'all'>('all')

  const add = () => {
    const t = text.trim()
    if (!t) return
    setEntries((prev) => [
      { id: crypto.randomUUID(), date: new Date().toISOString().slice(0, 10), skill, text: t },
      ...prev,
    ])
    setText('')
  }

  const remove = (id: string) => setEntries((prev) => prev.filter((e) => e.id !== id))

  const visible = useMemo(
    () => (filter === 'all' ? entries : entries.filter((e) => e.skill === filter)),
    [entries, filter],
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold">📓 دفترچه‌ی خطا</h2>
        <p className="mt-1 text-sm text-slate-400">
          هر اشتباهی که در تمرین‌ها می‌کنی اینجا یادداشت کن. مرور همین‌ها بزرگ‌ترین جهش نمره را
          می‌سازد.
        </p>
      </div>

      {/* فرم افزودن */}
      <Card>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="مثلاً: در سوال Inference گزینه‌ی درست‌به‌نظر ولی بی‌ربط را انتخاب کردم…"
          rows={3}
          className="w-full resize-none rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-brand-400 dark:border-slate-700 dark:bg-slate-900"
        />
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {SKILLS.map((s) => (
            <button
              key={s}
              onClick={() => setSkill(s)}
              className={cn(
                'rounded-lg px-3 py-1.5 text-xs font-medium transition',
                skill === s
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700',
              )}
            >
              {SKILL_META[s].emoji} {SKILL_META[s].label}
            </button>
          ))}
          <button
            onClick={add}
            className="mr-auto inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-emerald-700"
          >
            <Plus size={16} /> ثبت
          </button>
        </div>
      </Card>

      {/* فیلتر */}
      {entries.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={cn(
              'rounded-lg px-3 py-1.5 text-xs font-medium transition',
              filter === 'all'
                ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900'
                : 'bg-slate-100 text-slate-500 dark:bg-slate-800',
            )}
          >
            همه ({toFa(entries.length)})
          </button>
          {SKILLS.map((s) => {
            const n = entries.filter((e) => e.skill === s).length
            if (!n) return null
            return (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-xs font-medium transition',
                  filter === s
                    ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900'
                    : 'bg-slate-100 text-slate-500 dark:bg-slate-800',
                )}
              >
                {SKILL_META[s].emoji} {SKILL_META[s].label} ({toFa(n)})
              </button>
            )
          })}
        </div>
      )}

      {/* فهرست */}
      {visible.length === 0 ? (
        <Card className="flex flex-col items-center gap-2 py-10 text-center">
          <NotebookPen size={32} className="text-slate-300" />
          <p className="text-sm text-slate-400">
            هنوز خطایی ثبت نکردی. بعد از هر تمرین، اشتباهاتت را اینجا بنویس.
          </p>
        </Card>
      ) : (
        <div className="space-y-2">
          {visible.map((e) => {
            const meta = SKILL_META[e.skill]
            return (
              <Card key={e.id} className="flex items-start gap-3 p-4">
                <div className="min-w-0 flex-1">
                  <p className="text-sm leading-7">{e.text}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge color={meta.color}>
                      {meta.emoji} {meta.label}
                    </Badge>
                    <span className="text-xs text-slate-400" dir="ltr">
                      {e.date}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => remove(e.id)}
                  aria-label="حذف"
                  className="shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-rose-950/30"
                >
                  <Trash2 size={16} />
                </button>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
