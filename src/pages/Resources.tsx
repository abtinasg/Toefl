import { ExternalLink, Star } from 'lucide-react'
import { RESOURCES } from '../data/resources'
import { Card, Badge } from '../components/ui'

export function Resources() {
  const featured = RESOURCES.filter((r) => r.featured)
  const rest = RESOURCES.filter((r) => !r.featured)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold">📚 کتابخانه‌ی منابع</h2>
        <p className="mt-1 text-sm text-slate-400">
          منابع تمرین، کتاب و ابزارهای پیشنهادی برای آماده‌سازی تافل ۲۰۲۶.
        </p>
      </div>

      <div>
        <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-amber-600">
          <Star size={16} /> منابع اصلی
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {featured.map((r) => (
            <ResourceCard key={r.title} r={r} highlight />
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-bold text-slate-500">منابع تکمیلی</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {rest.map((r) => (
            <ResourceCard key={r.title} r={r} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ResourceCard({
  r,
  highlight,
}: {
  r: (typeof RESOURCES)[number]
  highlight?: boolean
}) {
  return (
    <a href={r.url} target="_blank" rel="noreferrer" className="block">
      <Card
        className={
          highlight
            ? 'h-full border-brand-200 transition hover:border-brand-400 dark:border-brand-900'
            : 'h-full transition hover:border-brand-300'
        }
      >
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-bold">{r.title}</h4>
          <ExternalLink size={16} className="shrink-0 text-slate-400" />
        </div>
        <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">{r.desc}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {r.tags.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </Card>
    </a>
  )
}
