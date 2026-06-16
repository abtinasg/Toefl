import { useState } from 'react'
import { Calendar, RotateCcw, Info } from 'lucide-react'
import { useProgressContext } from '../context/ProgressContext'
import { Card } from '../components/ui'
import { EXAM_FACTS, EXAM_SECTIONS } from '../data/examInfo'
import { toFa } from '../lib/utils'

export function Settings() {
  const { settings, setSettings, examDate, resetAll, doneCount } = useProgressContext()
  const [confirming, setConfirming] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold">⚙️ تنظیمات</h2>
        <p className="mt-1 text-sm text-slate-400">تاریخ شروع برنامه و مدیریت پیشرفت.</p>
      </div>

      <Card>
        <h3 className="mb-4 flex items-center gap-2 font-bold">
          <Calendar size={18} className="text-brand-600" /> تاریخ شروع برنامه
        </h3>
        <label className="block text-sm text-slate-500">روزی که برنامه را شروع می‌کنی</label>
        <input
          type="date"
          value={settings.startDate}
          onChange={(e) => setSettings({ ...settings, startDate: e.target.value })}
          className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm dark:border-slate-700 dark:bg-slate-900"
          dir="ltr"
        />
        <p className="mt-3 rounded-xl bg-brand-50 p-3 text-sm text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
          روز آزمون تخمینی (پایان هفته‌ی ۱۲):{' '}
          <span className="font-bold" dir="ltr">
            {examDate.toLocaleDateString('fa-IR')}
          </span>
        </p>
      </Card>

      <Card>
        <h3 className="mb-4 flex items-center gap-2 font-bold">
          <Info size={18} className="text-slate-500" /> خلاصه‌ی فرمت آزمون ۲۰۲۶
        </h3>
        <ul className="space-y-2 text-sm">
          <li className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800">
            <span className="text-slate-500">مدت کل</span>
            <span className="font-medium">{toFa(EXAM_FACTS.totalDurationMin)} دقیقه</span>
          </li>
          {EXAM_SECTIONS.map((s) => (
            <li
              key={s.key}
              className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800"
            >
              <span className="text-slate-500">{s.nameFa}</span>
              <span className="font-medium">
                {toFa(s.durationMin)} دقیقه • {s.items}
              </span>
            </li>
          ))}
          <li className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800">
            <span className="text-slate-500">نمره‌دهی</span>
            <span className="font-medium">{EXAM_FACTS.newScale}</span>
          </li>
          <li className="flex justify-between">
            <span className="text-slate-500">دریافت نتیجه</span>
            <span className="font-medium">{EXAM_FACTS.scoreReturn}</span>
          </li>
        </ul>
      </Card>

      <Card>
        <h3 className="mb-2 flex items-center gap-2 font-bold text-rose-600">
          <RotateCcw size={18} /> ریست پیشرفت
        </h3>
        <p className="text-sm text-slate-500">
          تا الان {toFa(doneCount)} تسک تیک خورده. این کار همه‌ی تیک‌ها را پاک می‌کند و قابل بازگشت
          نیست.
        </p>
        {!confirming ? (
          <button
            onClick={() => setConfirming(true)}
            className="mt-3 rounded-xl border border-rose-200 px-4 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50 dark:border-rose-900 dark:hover:bg-rose-950/30"
          >
            ریست همه‌ی پیشرفت
          </button>
        ) : (
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => {
                resetAll()
                setConfirming(false)
              }}
              className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-700"
            >
              مطمئنم، پاک کن
            </button>
            <button
              onClick={() => setConfirming(false)}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-500 dark:border-slate-700"
            >
              انصراف
            </button>
          </div>
        )}
      </Card>

      <p className="text-center text-xs text-slate-400">
        پیشرفت تو به‌صورت محلی در مرورگر ذخیره می‌شود (بدون نیاز به حساب کاربری).
      </p>
    </div>
  )
}
