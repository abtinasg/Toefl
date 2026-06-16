// تبدیل اعداد انگلیسی به فارسی برای نمایش
const FA_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']

export function toFa(value: number | string): string {
  return String(value).replace(/\d/g, (d) => FA_DIGITS[Number(d)])
}

export function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n))
}

// تعداد روز بین دو تاریخ (روزهای کامل)
export function daysBetween(from: Date, to: Date): number {
  const ms = to.setHours(0, 0, 0, 0) - new Date(from).setHours(0, 0, 0, 0)
  return Math.round(ms / 86_400_000)
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}

// قالب‌بندی ساعت (مثلاً 2.5 -> «۲ ساعت و ۳۰ دقیقه»)
export function formatHours(hours: number): string {
  const h = Math.floor(hours)
  const m = Math.round((hours - h) * 60)
  if (h && m) return `${toFa(h)} ساعت و ${toFa(m)} دقیقه`
  if (h) return `${toFa(h)} ساعت`
  return `${toFa(m)} دقیقه`
}
