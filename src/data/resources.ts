// کتابخانه‌ی منابع آماده‌سازی تافل ۲۰۲۶
export interface Resource {
  title: string
  desc: string
  url: string
  tags: string[]
  featured?: boolean
}

export const RESOURCES: Resource[] = [
  {
    title: 'Testinno (تستینو)',
    desc: 'پلتفرم ایرانی تافل/آیلتس/GRE با تست‌های شبیه‌سازی‌شده، کتاب و منابع تمرین. منبع اصلی تمرین در این رودمپ.',
    url: 'https://testinno.ir',
    tags: ['تمرین', 'تست', 'کتاب', 'فارسی'],
    featured: true,
  },
  {
    title: 'ETS — TOEFL iBT رسمی',
    desc: 'سایت رسمی برگزارکننده‌ی آزمون. اطلاعات فرمت ۲۰۲۶، ثبت‌نام، و نمونه‌سوالات رسمی.',
    url: 'https://www.ets.org/toefl',
    tags: ['رسمی', 'ثبت‌نام', 'فرمت'],
    featured: true,
  },
  {
    title: 'TOEFL Practice (TPO) رسمی ETS',
    desc: 'مجموعه تست‌های تمرینی رسمی (TPO) برای شبیه‌سازی دقیق آزمون واقعی.',
    url: 'https://www.ets.org/toefl/test-takers/ibt/prepare.html',
    tags: ['تست', 'رسمی'],
  },
  {
    title: 'The Official Guide to the TOEFL iBT',
    desc: 'کتاب مرجع رسمی ETS با توضیح کامل بخش‌ها، استراتژی‌ها و تست‌های واقعی. بهترین منبع برای سوالات اصیل.',
    url: 'https://www.ets.org/toefl/test-takers/ibt/prepare/test-prep-resources.html',
    tags: ['کتاب', 'رسمی'],
  },
  {
    title: 'TST Prep',
    desc: 'تست‌های رایگان کامل و ویدیوهای آموزشی برای هر بخش تافل، به‌روزشده برای فرمت ۲۰۲۶.',
    url: 'https://tstprep.com/toefl/',
    tags: ['رایگان', 'ویدیو', 'تست'],
  },
  {
    title: 'BestMyTest',
    desc: 'تست نمونه‌ی رایگان و راهنمای تمرین تافل با نمره‌دهی.',
    url: 'https://www.bestmytest.com/toefl/practice-test',
    tags: ['رایگان', 'تست'],
  },
  {
    title: 'Magoosh TOEFL Blog',
    desc: 'مقالات تحلیلی درباره‌ی تغییرات ۲۰۲۶ و استراتژی‌های هر بخش.',
    url: 'https://toefl.magoosh.com/toefl-2026-changes',
    tags: ['مقاله', 'استراتژی'],
  },
  {
    title: 'Academic Word List (AWL)',
    desc: 'لیست ۵۷۰ خانواده‌ی واژگان آکادمیک پرکاربرد؛ پایه‌ی برنامه‌ی واژگان روزانه.',
    url: 'https://www.eapfoundation.com/vocab/academic/awl/',
    tags: ['واژگان', 'رایگان'],
  },
  {
    title: 'BBC 6 Minute English',
    desc: 'پادکست کوتاه برای تقویت شنیداری و واژگان روزمره و آکادمیک.',
    url: 'https://www.bbc.co.uk/learningenglish/english/features/6-minute-english',
    tags: ['شنیداری', 'پادکست', 'رایگان'],
  },
  {
    title: 'TED Talks',
    desc: 'سخنرانی‌های آکادمیک با زیرنویس برای تمرین Listening و shadowing.',
    url: 'https://www.ted.com/talks',
    tags: ['شنیداری', 'گفتاری', 'رایگان'],
  },
  {
    title: 'Anki (فلش‌کارت)',
    desc: 'اپ فلش‌کارت با تکرار فاصله‌دار برای حفظ ماندگار واژگان.',
    url: 'https://apps.ankiweb.net/',
    tags: ['واژگان', 'ابزار', 'رایگان'],
  },
]
