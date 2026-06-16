import { useState } from 'react'
import { Lightbulb, AlertTriangle, ListChecks, Trophy } from 'lucide-react'
import { SKILL_GUIDES } from '../data/skills'
import { EXAM_SECTIONS, EXAM_FACTS, GOAL, SCORE_MAP } from '../data/examInfo'
import { Card, Badge } from '../components/ui'
import { cn, toFa } from '../lib/utils'

export function Skills() {
  const [active, setActive] = useState(0)
  const g = SKILL_GUIDES[active]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold">🎓 راهنمای ۴ مهارت (فرمت ۲۰۲۶)</h2>
        <p className="mt-1 text-sm text-slate-400">
          آزمون جدید {toFa(EXAM_FACTS.totalDurationMin)} دقیقه‌ست با نمره‌دهی دوگانه. هدف {toFa(GOAL.targetScore120)}+ تقریباً
          باند {toFa(GOAL.targetBand.toFixed(1))} و سطح {GOAL.cefr} است.
        </p>
      </div>

      {/* خلاصه‌ی بخش‌های آزمون */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {EXAM_SECTIONS.map((s) => (
          <Card key={s.key} className="p-4">
            <div className="text-xl">
              {SKILL_GUIDES.find((g) => g.key === s.key)?.emoji}
            </div>
            <h4 className="mt-1 text-sm font-bold">{s.nameFa}</h4>
            <p className="text-xs text-slate-400">{toFa(s.durationMin)} دقیقه • {s.items}</p>
            <p className="mt-1 text-[11px] leading-5 text-brand-600 dark:text-brand-400">{s.highlight}</p>
          </Card>
        ))}
      </div>

      {/* تب‌ها */}
      <div className="flex gap-2 overflow-x-auto scrollbar-thin pb-1">
        {SKILL_GUIDES.map((s, i) => (
          <button
            key={s.key}
            onClick={() => setActive(i)}
            className={cn(
              'flex shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition',
              active === i
                ? 'bg-brand-600 text-white'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700',
            )}
          >
            {s.emoji} {s.nameFa}
          </button>
        ))}
      </div>

      {/* محتوای مهارت انتخاب‌شده */}
      <Card>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{g.emoji}</span>
          <div>
            <h3 className="text-lg font-bold">{g.nameFa}</h3>
            <p className="text-xs text-slate-400">
              {g.name} • {toFa(g.durationMin)} دقیقه
            </p>
          </div>
        </div>
        <p className="mt-4 rounded-xl bg-slate-50 p-3 text-sm leading-7 dark:bg-slate-800/50">
          {g.format2026}
        </p>

        <Section icon={<ListChecks size={16} />} title="انواع تسک" color="text-brand-600">
          <ul className="space-y-1.5">
            {g.taskTypes.map((t, i) => (
              <li key={i} className="flex gap-2 text-sm">
                <span className="text-brand-500">▸</span> {t}
              </li>
            ))}
          </ul>
        </Section>

        <Section icon={<Lightbulb size={16} />} title="استراتژی‌های امتیازآور" color="text-emerald-600">
          <ul className="space-y-1.5">
            {g.strategies.map((t, i) => (
              <li key={i} className="flex gap-2 text-sm">
                <span className="text-emerald-500">✓</span> {t}
              </li>
            ))}
          </ul>
        </Section>

        <Section icon={<AlertTriangle size={16} />} title="اشتباهات رایج" color="text-rose-600">
          <ul className="space-y-1.5">
            {g.mistakes.map((t, i) => (
              <li key={i} className="flex gap-2 text-sm">
                <span className="text-rose-500">✗</span> {t}
              </li>
            ))}
          </ul>
        </Section>

        <div className="mt-4 flex items-start gap-3 rounded-xl bg-amber-50 p-3 dark:bg-amber-900/20">
          <Trophy size={18} className="mt-0.5 shrink-0 text-amber-500" />
          <p className="text-sm leading-7 text-amber-800 dark:text-amber-200">{g.c1Target}</p>
        </div>
      </Card>

      {/* جدول نگاشت نمره */}
      <Card>
        <h3 className="mb-3 font-bold">📐 نگاشت تقریبی نمره (باند ۲۰۲۶ ↔ مقیاس ۰–۱۲۰)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-center text-sm">
            <thead>
              <tr className="text-slate-400">
                <th className="p-2 font-medium">باند</th>
                <th className="p-2 font-medium">مقیاس ۰–۱۲۰</th>
                <th className="p-2 font-medium">CEFR</th>
              </tr>
            </thead>
            <tbody>
              {SCORE_MAP.map((row) => {
                const isGoal = row.band === GOAL.targetBand
                return (
                  <tr
                    key={row.band}
                    className={cn(
                      'border-t border-slate-100 dark:border-slate-800',
                      isGoal && 'bg-brand-50 font-bold dark:bg-brand-900/30',
                    )}
                  >
                    <td className="p-2">
                      {toFa(row.band.toFixed(1))} {isGoal && <Badge color="blue">هدف تو</Badge>}
                    </td>
                    <td className="p-2">{row.range120}</td>
                    <td className="p-2">{row.cefr}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-slate-400">{GOAL.note}</p>
      </Card>
    </div>
  )
}

function Section({
  icon,
  title,
  color,
  children,
}: {
  icon: React.ReactNode
  title: string
  color: string
  children: React.ReactNode
}) {
  return (
    <div className="mt-5">
      <h4 className={cn('mb-2 flex items-center gap-2 text-sm font-bold', color)}>
        {icon} {title}
      </h4>
      {children}
    </div>
  )
}
