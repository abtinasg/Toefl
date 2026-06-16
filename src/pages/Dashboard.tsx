import { Link } from 'react-router-dom'
import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from 'recharts'
import { CalendarClock, Flame, Clock, Target, ArrowLeft } from 'lucide-react'
import { useProgressContext } from '../context/ProgressContext'
import { Card, ProgressRing, Badge } from '../components/ui'
import { TaskItem } from '../components/TaskItem'
import { StudyTimer } from '../components/StudyTimer'
import { GOAL, EXAM_FACTS } from '../data/examInfo'
import { toFa, formatHours } from '../lib/utils'

function Stat({
  icon,
  value,
  label,
  color,
}: {
  icon: React.ReactNode
  value: React.ReactNode
  label: string
  color: string
}) {
  return (
    <Card className="flex items-center gap-3">
      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}>{icon}</div>
      <div>
        <div className="text-lg font-bold leading-tight">{value}</div>
        <div className="text-xs text-slate-400">{label}</div>
      </div>
    </Card>
  )
}

export function Dashboard() {
  const {
    overallPercent,
    daysToExam,
    streak,
    minutesDone,
    totalMinutes,
    currentWeek,
    todayPlan,
    weekProgress,
    isDone,
    toggleTask,
    daysElapsed,
  } = useProgressContext()

  const chartData = weekProgress.map((w) => ({
    name: toFa(w.week),
    percent: w.percent,
    phase: w.phase,
  }))
  const phaseColors = ['#3b82f6', '#8b5cf6', '#f59e0b', '#10b981']

  const started = daysElapsed >= 0 && daysElapsed < 84

  return (
    <div className="space-y-6">
      {/* قهرمان */}
      <Card className="bg-gradient-to-l from-brand-600 to-emerald-600 text-white">
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
          <div className="text-center sm:text-right">
            <Badge color="slate">
              <Target size={12} /> هفته‌ی {toFa(currentWeek)} از ۱۲
            </Badge>
            <h2 className="mt-3 text-2xl font-extrabold">سلام! بزن بریم 🚀</h2>
            <p className="mt-1 max-w-md text-sm text-white/85">
              مسیر ۱۲ هفته‌ای تا نمره‌ی {toFa(GOAL.targetScore120)}+ تافل ۲۰۲۶. هر روز یک قدم
              نزدیک‌تر.
            </p>
          </div>
          <ProgressRing
            percent={overallPercent}
            label={
              <div className="text-center text-white">
                <div className="text-3xl font-black">{toFa(overallPercent)}٪</div>
                <div className="text-xs text-white/80">پیشرفت کل</div>
              </div>
            }
          />
        </div>
      </Card>

      {/* آمار */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat
          icon={<CalendarClock size={20} className="text-brand-600" />}
          value={daysToExam >= 0 ? `${toFa(daysToExam)} روز` : 'گذشته'}
          label="تا روز آزمون"
          color="bg-brand-100 dark:bg-brand-900/40"
        />
        <Stat
          icon={<Flame size={20} className="text-rose-500" />}
          value={`${toFa(streak)} روز`}
          label="استریک مطالعه"
          color="bg-rose-100 dark:bg-rose-900/40"
        />
        <Stat
          icon={<Clock size={20} className="text-emerald-600" />}
          value={formatHours(minutesDone / 60)}
          label={`از ${formatHours(totalMinutes / 60)}`}
          color="bg-emerald-100 dark:bg-emerald-900/40"
        />
        <Stat
          icon={<Target size={20} className="text-amber-500" />}
          value={`باند ${toFa(GOAL.targetBand.toFixed(1))}`}
          label={`هدف ≈ ${GOAL.cefr}`}
          color="bg-amber-100 dark:bg-amber-900/40"
        />
      </div>

      {/* تسک‌های امروز */}
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="font-bold">📌 برنامه‌ی امروز</h3>
            {todayPlan && (
              <p className="text-xs text-slate-400">
                هفته‌ی {toFa(todayPlan.week)} — {todayPlan.day.title}
              </p>
            )}
          </div>
          <Link
            to="/roadmap"
            className="inline-flex items-center gap-1 text-sm text-brand-600 hover:underline dark:text-brand-400"
          >
            کل رودمپ <ArrowLeft size={14} />
          </Link>
        </div>

        {!started && daysElapsed < 0 && (
          <p className="rounded-xl bg-amber-50 p-3 text-sm text-amber-700 dark:bg-amber-900/20 dark:text-amber-300">
            تاریخ شروع برنامه هنوز نرسیده. می‌تونی از تب تنظیمات تاریخ شروع رو تغییر بدی یا از همین حالا
            از رودمپ جلو بزنی.
          </p>
        )}

        {todayPlan && (
          <div className="space-y-2">
            {todayPlan.day.tasks.map((t) => (
              <TaskItem key={t.id} task={t} done={isDone(t.id)} onToggle={() => toggleTask(t.id)} />
            ))}
          </div>
        )}
      </Card>

      {/* تایمر تمرین */}
      <StudyTimer />

      {/* نمودار پیشرفت هفتگی */}
      <Card>
        <h3 className="mb-4 font-bold">📊 پیشرفت هفته‌به‌هفته</h3>
        <div className="h-48" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip
                cursor={{ fill: 'rgba(148,163,184,0.1)' }}
                formatter={(v: number) => [`${toFa(v)}٪`, 'پیشرفت']}
                labelFormatter={(l) => `هفته ${l}`}
                contentStyle={{ borderRadius: 12, fontSize: 12, direction: 'rtl' }}
              />
              <Bar dataKey="percent" radius={[6, 6, 0, 0]}>
                {chartData.map((d, i) => (
                  <Cell key={i} fill={phaseColors[d.phase - 1]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-2 text-center text-xs text-slate-400">
          مدت آزمون جدید: {toFa(EXAM_FACTS.totalDurationMin)} دقیقه — نمره‌دهی دوگانه {EXAM_FACTS.newScale}
        </p>
      </Card>
    </div>
  )
}
