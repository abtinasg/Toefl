// اطلاعات رسمی آزمون تافل iBT نسخه ۲۰۲۶ (از ۲۱ ژانویه ۲۰۲۶)
// منبع: ETS، Magoosh، Manya Group — تحقیق ۲۰۲۶

export interface ExamSection {
  key: 'reading' | 'listening' | 'speaking' | 'writing'
  name: string
  nameFa: string
  durationMin: number
  items: string
  highlight: string
}

export const EXAM_SECTIONS: ExamSection[] = [
  {
    key: 'reading',
    name: 'Reading',
    nameFa: 'ریدینگ (درک مطلب)',
    durationMin: 30,
    items: 'تا ۵۰ آیتم',
    highlight: 'تطبیقی چندمرحله‌ای + ۳ نوع تسک جدید',
  },
  {
    key: 'listening',
    name: 'Listening',
    nameFa: 'لیسنینگ (شنیداری)',
    durationMin: 29,
    items: 'تا ۴۷ آیتم',
    highlight: 'تطبیقی + ۴ نوع تسک (آکادمیک و روزمره)',
  },
  {
    key: 'speaking',
    name: 'Speaking',
    nameFa: 'اسپیکینگ (گفتاری)',
    durationMin: 8,
    items: 'تا ۱۱ آیتم',
    highlight: 'تسک‌های جدید از جمله Listen & Repeat',
  },
  {
    key: 'writing',
    name: 'Writing',
    nameFa: 'رایتینگ (نوشتاری)',
    durationMin: 23,
    items: 'تا ۱۲ آیتم',
    highlight: 'تمرکز روی دقت گرامری و پاسخ کاربردی',
  },
]

export const EXAM_FACTS = {
  totalDurationMin: 90,
  effectiveDate: '۲۱ ژانویه ۲۰۲۶',
  scoreReturn: 'تا ۷۲ ساعت (نمره R/L سر جلسه)',
  oldScale: '۰ تا ۱۲۰',
  newScale: '۱.۰ تا ۶.۰ (هم‌راستا با CEFR)',
}

// مپینگ تقریبی هدف کاربر روی مقیاس‌ها
export const GOAL = {
  targetScore120: 95,
  targetBand: 5.0,
  cefr: 'C1',
  note: 'نمره ۹۵+ روی مقیاس ۰–۱۲۰ تقریباً معادل باند ۵.۰ و سطح C1 است.',
}

// نگاشت نمره ۰–۱۲۰ به باند ۱–۶ (تقریبی برای نمایش)
export const SCORE_MAP: { band: number; range120: string; cefr: string }[] = [
  { band: 6.0, range120: '۱۱۴–۱۲۰', cefr: 'C2' },
  { band: 5.5, range120: '۱۰۵–۱۱۳', cefr: 'C1+' },
  { band: 5.0, range120: '۹۲–۱۰۴', cefr: 'C1' },
  { band: 4.5, range120: '۷۸–۹۱', cefr: 'B2+' },
  { band: 4.0, range120: '۶۰–۷۷', cefr: 'B2' },
  { band: 3.5, range120: '۴۶–۵۹', cefr: 'B1+' },
]

// تاریخ پیش‌فرض شروع و آزمون (کاربر می‌تواند در تنظیمات تغییر دهد)
export const DEFAULT_START_DATE = '2026-06-16'
export const PROGRAM_WEEKS = 12
export const STUDY_DAYS_PER_WEEK = 6
