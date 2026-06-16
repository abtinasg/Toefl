import { useState } from 'react'
import { ChevronDown, CheckCircle2, Circle, Coffee } from 'lucide-react'
import { ROADMAP, dayMinutes, PHASES, type Day, type Week } from '../data/roadmap'
import { useProgressContext } from '../context/ProgressContext'
import { Card, Badge, ProgressBar } from '../components/ui'
import { TaskItem } from '../components/TaskItem'
import { cn, toFa, formatHours } from '../lib/utils'

const PHASE_COLORS = ['blue', 'violet', 'amber', 'green'] as const

function DayBlock({ d }: { d: Day }) {
  const { isDone, toggleTask, dayDone } = useProgressContext()
  const [open, setOpen] = useState(false)
  const status = dayDone(d)
  const mins = dayMinutes(d)

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 bg-slate-50 p-3 text-right transition hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800"
      >
        {status.complete ? (
          <CheckCircle2 size={20} className="shrink-0 text-emerald-500" />
        ) : d.isRest ? (
          <Coffee size={20} className="shrink-0 text-amber-500" />
        ) : (
          <Circle size={20} className="shrink-0 text-slate-300" />
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400">{d.label}</span>
            <span className="truncate text-sm font-medium">{d.title}</span>
          </div>
          <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
            <span>{formatHours(mins / 60)}</span>
            <span>•</span>
            <span>
              {toFa(status.done)}/{toFa(status.total)} تسک
            </span>
          </div>
        </div>
        <ChevronDown
          size={18}
          className={cn('shrink-0 text-slate-400 transition', open && 'rotate-180')}
        />
      </button>
      {open && (
        <div className="space-y-2 p-3">
          {d.tasks.map((t) => (
            <TaskItem key={t.id} task={t} done={isDone(t.id)} onToggle={() => toggleTask(t.id)} />
          ))}
        </div>
      )}
    </div>
  )
}

function WeekCard({ w, defaultOpen }: { w: Week; defaultOpen: boolean }) {
  const { weekProgress } = useProgressContext()
  const [open, setOpen] = useState(defaultOpen)
  const prog = weekProgress.find((p) => p.week === w.number)!
  const color = PHASE_COLORS[w.phase - 1]

  return (
    <Card className="p-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 p-4 text-right"
      >
        <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
          <span className="text-[10px] text-slate-400">هفته</span>
          <span className="text-lg font-black leading-none">{toFa(w.number)}</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-bold">{w.title}</h3>
            <Badge color={color}>{prog.percent ? `${toFa(prog.percent)}٪` : 'شروع نشده'}</Badge>
          </div>
          <p className="mt-1 line-clamp-1 text-xs text-slate-400">{w.goal}</p>
          <div className="mt-2">
            <ProgressBar percent={prog.percent} />
          </div>
        </div>
        <ChevronDown
          size={20}
          className={cn('shrink-0 text-slate-400 transition', open && 'rotate-180')}
        />
      </button>
      {open && (
        <div className="space-y-2 border-t border-slate-100 p-4 dark:border-slate-800">
          {w.days.map((d) => (
            <DayBlock key={d.id} d={d} />
          ))}
        </div>
      )}
    </Card>
  )
}

export function Roadmap() {
  const { currentWeek } = useProgressContext()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold">🗓️ رودمپ ۱۲ هفته‌ای</h2>
        <p className="mt-1 text-sm text-slate-400">
          ۴ فاز، ۶ روز مطالعه در هفته، با ساعت مشخص برای هر تسک. روی هر روز بزن تا تسک‌ها رو ببینی و
          تیک بزنی.
        </p>
      </div>

      {/* نمای فازها */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {PHASES.map((p, i) => (
          <Card key={p.id} className="p-4">
            <Badge color={PHASE_COLORS[i]}>فاز {toFa(p.id)}</Badge>
            <h4 className="mt-2 text-sm font-bold leading-snug">{p.name}</h4>
            <p className="mt-1 text-xs text-slate-400">هفته {p.weeks}</p>
            <p className="text-xs text-slate-400">{p.hours}</p>
          </Card>
        ))}
      </div>

      {/* هفته‌ها */}
      <div className="space-y-3">
        {ROADMAP.map((w) => (
          <WeekCard key={w.number} w={w} defaultOpen={w.number === currentWeek} />
        ))}
      </div>
    </div>
  )
}
