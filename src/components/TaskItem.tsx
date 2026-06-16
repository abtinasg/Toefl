import { Check, ExternalLink } from 'lucide-react'
import type { Task } from '../data/roadmap'
import { SKILL_META } from '../lib/skillMeta'
import { Badge } from './ui'
import { cn, toFa } from '../lib/utils'

export function TaskItem({
  task,
  done,
  onToggle,
}: {
  task: Task
  done: boolean
  onToggle: () => void
}) {
  const meta = SKILL_META[task.skill]
  return (
    <div
      className={cn(
        'group flex items-start gap-3 rounded-xl border p-3 transition-colors',
        done
          ? 'border-emerald-200 bg-emerald-50/60 dark:border-emerald-900/50 dark:bg-emerald-950/20'
          : 'border-slate-200 bg-white hover:border-brand-300 dark:border-slate-800 dark:bg-slate-900',
      )}
    >
      <button
        onClick={onToggle}
        aria-label={done ? 'لغو تکمیل' : 'تکمیل شد'}
        className={cn(
          'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 transition-all',
          done
            ? 'border-emerald-500 bg-emerald-500 text-white'
            : 'border-slate-300 text-transparent hover:border-brand-400 dark:border-slate-600',
        )}
      >
        <Check size={16} strokeWidth={3} />
      </button>

      <div className="min-w-0 flex-1">
        <p
          className={cn(
            'text-sm leading-6',
            done && 'text-slate-400 line-through dark:text-slate-500',
          )}
        >
          {task.text}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Badge color={meta.color}>
            {meta.emoji} {meta.label}
          </Badge>
          <span className="text-xs text-slate-400">{toFa(task.minutes)} دقیقه</span>
          {task.resource && (
            <a
              href={task.resource}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs text-brand-600 hover:underline dark:text-brand-400"
            >
              <ExternalLink size={12} /> منبع
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
