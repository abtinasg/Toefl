// رودمپ کامل ۱۲ هفته‌ای تافل ۲۰۲۶ — هدف نمره ۹۵+
// مبتنی بر فرمت جدید آزمون (Adaptive R/L، تسک‌های جدید Speaking/Writing)
// طراحی‌شده برای شروع از سطح IELTS ~۵.۵/۶ بعد از ۵ ماه دوری از زبان.
// ۶ روز مطالعه + ۱ روز مرور/استراحت در هفته. مجموع ~۲۰۰+ ساعت.

export type SkillTag =
  | 'reading'
  | 'listening'
  | 'speaking'
  | 'writing'
  | 'vocab'
  | 'grammar'
  | 'mock'
  | 'review'
  | 'rest'

export interface Task {
  id: string
  text: string
  minutes: number
  skill: SkillTag
  resource?: string
}

export interface Day {
  id: string
  label: string
  title: string
  isRest?: boolean
  tasks: Task[]
}

export interface Week {
  number: number
  phase: number
  phaseName: string
  title: string
  goal: string
  days: Day[]
}

let _c = 0
const T = (text: string, minutes: number, skill: SkillTag, resource?: string): Task => ({
  id: `t${++_c}`,
  text,
  minutes,
  skill,
  resource,
})

const FA_DAY = ['روز ۱', 'روز ۲', 'روز ۳', 'روز ۴', 'روز ۵', 'روز ۶', 'روز ۷']
const day = (
  week: number,
  index: number,
  title: string,
  tasks: Task[],
  isRest = false,
): Day => ({
  id: `w${week}d${index + 1}`,
  label: FA_DAY[index],
  title,
  isRest,
  tasks,
})

const TESTINNO = 'https://testinno.ir'
const ETS = 'https://www.ets.org/toefl'

// تسک‌های پرتکرار
const vocab = (min = 20) =>
  T('مرور و یادگیری واژگان آکادمیک (Academic Word List) با فلش‌کارت', min, 'vocab', TESTINNO)
const errorLog = (min = 15) =>
  T('ثبت خطاها در «دفترچه خطا» و مرور اشتباهات امروز', min, 'review')
const restDay = (week: number, index: number, note: string): Day =>
  day(
    week,
    index,
    'مرور سبک و استراحت فعال',
    [
      T('مرور دفترچه خطای کل هفته و جمع‌بندی نکات', 30, 'review'),
      T(note, 25, 'listening'),
      T('استراحت ذهنی — بدون فشار درسی', 5, 'rest'),
    ],
    true,
  )

export const ROADMAP: Week[] = [
  // ===================== فاز ۱: پایه‌سازی (هفته ۱–۳) =====================
  {
    number: 1,
    phase: 1,
    phaseName: 'پایه‌سازی و فعال‌سازی مجدد',
    title: 'بیدارسازی زبان + آشنایی با فرمت ۲۰۲۶',
    goal: 'بعد از ۵ ماه دوری، گوش و چشم را دوباره به انگلیسی عادت بده و آزمون جدید را کامل بشناس.',
    days: [
      day(1, 0, 'آشنایی با ساختار آزمون ۲۰۲۶', [
        T('مطالعه‌ی کامل ساختار جدید تافل ۲۰۲۶ (۴ بخش، زمان‌ها، نمره‌دهی دوگانه)', 30, 'review', ETS),
        T('درک سیستم Adaptive در Reading و Listening', 20, 'review'),
        vocab(20),
        T('شنیدن یک پادکست ساده انگلیسی (مثلاً VOA Learning English)', 25, 'listening'),
        T('خواندن یک مقاله کوتاه و خلاصه‌نویسی شفاهی', 25, 'reading'),
      ]),
      day(1, 1, 'آزمون تشخیصی (Diagnostic)', [
        T('یک تست تشخیصی Reading کوتاه برای سنجش سطح فعلی', 35, 'reading', TESTINNO),
        T('یک تست تشخیصی Listening کوتاه', 30, 'listening', TESTINNO),
        vocab(20),
        T('یادداشت نقاط ضعف اولیه در هر مهارت', 20, 'review'),
        errorLog(15),
      ]),
      day(1, 2, 'بازسازی پایه‌ی گرامر (۱)', [
        T('مرور زمان‌ها (Tenses) و کاربرد درست آن‌ها', 35, 'grammar'),
        vocab(20),
        T('تمرین Listen & Repeat: تکرار دقیق ۱۰ جمله کوتاه', 25, 'speaking'),
        T('خواندن مقاله آکادمیک کوتاه + پیدا کردن ایده اصلی', 30, 'reading'),
        errorLog(15),
      ]),
      day(1, 3, 'بازسازی پایه‌ی گرامر (۲)', [
        T('مرور جملات شرطی، مجهول و وابسته (relative clauses)', 35, 'grammar'),
        vocab(20),
        T('شنیدن یک سخنرانی کوتاه آکادمیک + نت‌برداری', 30, 'listening'),
        T('بازگویی شفاهی چیزی که شنیدی در ۴۵ ثانیه', 20, 'speaking'),
        errorLog(15),
      ]),
      day(1, 4, 'تقویت گوش (Active Listening)', [
        T('شنیدن یک TED Talk کوتاه (زیرنویس انگلیسی)', 25, 'listening'),
        T('شنیدن دوباره بدون زیرنویس + نت‌برداری', 25, 'listening'),
        vocab(20),
        T('خواندن متن TED + استخراج واژگان جدید', 25, 'reading'),
        errorLog(15),
      ]),
      day(1, 5, 'تمرین ترکیبی سبک', [
        T('یک پاساژ Reading کامل با تمرکز روی درک، نه سرعت', 35, 'reading', TESTINNO),
        T('یک مکالمه (Conversation) Listening + پاسخ سوالات', 25, 'listening', TESTINNO),
        vocab(20),
        T('نوشتن یک پاراگراف ۱۰۰ کلمه‌ای درباره روزت', 25, 'writing'),
        errorLog(15),
      ]),
      restDay(1, 6, 'تماشای یک قسمت سریال انگلیسی با زیرنویس انگلیسی'),
    ],
  },
  {
    number: 2,
    phase: 1,
    phaseName: 'پایه‌سازی و فعال‌سازی مجدد',
    title: 'سیستم واژگان + دقت گرامری',
    goal: 'یک سیستم منظم واژگان بساز و گرامر را تا حد دقت نوشتاری بالا ببر (کلید Writing جدید).',
    days: [
      day(2, 0, 'سیستم واژگان آکادمیک', [
        T('راه‌اندازی فلش‌کارت (Anki یا Testinno) با ۵۷۰ کلمه AWL', 30, 'vocab', TESTINNO),
        T('یادگیری ۲۰ کلمه‌ی جدید + جمله‌سازی با هرکدام', 35, 'vocab'),
        T('سخنرانی آکادمیک ۵ دقیقه‌ای + نت‌برداری ساختاریافته', 30, 'listening'),
        T('بازگویی شفاهی خلاصه‌ی سخنرانی', 20, 'speaking'),
        errorLog(15),
      ]),
      day(2, 1, 'گرامر برای نوشتار دقیق', [
        T('مرور خطاهای رایج: حرف تعریف، حرف اضافه، توافق فعل و فاعل', 35, 'grammar'),
        vocab(25),
        T('نوشتن ۵ جمله پیچیده و خودبازبینی گرامری', 25, 'writing'),
        T('یک پاساژ Reading + تمرین واژگان در متن', 30, 'reading', TESTINNO),
        errorLog(15),
      ]),
      day(2, 2, 'دقت تلفظ و روانی', [
        T('Listen & Repeat: ۱۵ جمله با تمرکز روی استرس و آهنگ کلام', 30, 'speaking'),
        vocab(25),
        T('شنیدن مکالمه دانشگاهی + شناسایی هدف گوینده', 30, 'listening', TESTINNO),
        T('خواندن با صدای بلند یک پاراگراف + ضبط صدا', 20, 'speaking'),
        errorLog(15),
      ]),
      day(2, 3, 'درک مطلب پایه', [
        T('۲ پاساژ Reading + تکنیک یافتن ایده اصلی و جزئیات', 45, 'reading', TESTINNO),
        vocab(25),
        T('سخنرانی Listening + تمرین سوالات استنتاجی', 30, 'listening'),
        errorLog(15),
      ]),
      day(2, 4, 'نوشتار پاراگرافی', [
        T('یادگیری ساختار پاراگراف آکادمیک (Topic–Support–Conclusion)', 30, 'writing'),
        T('نوشتن دو پاراگراف موافق/مخالف یک موضوع ساده', 35, 'writing'),
        vocab(25),
        T('شنیدن پادکست + خلاصه نوشتاری ۵ خطی', 25, 'listening'),
        errorLog(15),
      ]),
      day(2, 5, 'جمع‌بندی هفته', [
        T('مینی‌تست Reading + Listening زمان‌دار', 50, 'mock', TESTINNO),
        vocab(25),
        T('بازگویی شفاهی یک موضوع آشنا در ۴۵ ثانیه', 20, 'speaking'),
        errorLog(20),
      ]),
      restDay(2, 6, 'گوش دادن به یک پادکست آکادمیک دلخواه بدون نت‌برداری'),
    ],
  },
  {
    number: 3,
    phase: 1,
    phaseName: 'پایه‌سازی و فعال‌سازی مجدد',
    title: 'مبانی ۴ مهارت + نت‌برداری',
    goal: 'تکنیک‌های پایه‌ی هر چهار مهارت و سیستم نت‌برداری استاندارد تافل را یاد بگیر.',
    days: [
      day(3, 0, 'نت‌برداری استاندارد', [
        T('یادگیری سیستم نت‌برداری (نمادها، اختصارات، ساختار درختی)', 30, 'listening'),
        T('تمرین نت‌برداری روی ۲ سخنرانی کوتاه', 35, 'listening', TESTINNO),
        vocab(25),
        T('بازسازی محتوای سخنرانی از روی نت‌ها', 20, 'speaking'),
        errorLog(15),
      ]),
      day(3, 1, 'مبانی Reading آکادمیک', [
        T('تکنیک skimming و scanning روی ۲ پاساژ', 40, 'reading', TESTINNO),
        vocab(25),
        T('تمرین سوالات Vocabulary-in-context', 25, 'reading'),
        T('Listen & Repeat: ۱۵ جمله بلندتر', 25, 'speaking'),
        errorLog(15),
      ]),
      day(3, 2, 'مبانی Speaking', [
        T('آشنایی با همه‌ی تسک‌های Speaking ۲۰۲۶ و زمان‌بندی هرکدام', 25, 'speaking', ETS),
        T('تمرین تسک مستقل: پاسخ ۴۵ ثانیه‌ای + ضبط و گوش‌دادن', 35, 'speaking'),
        vocab(25),
        T('یک پاساژ Reading زمان‌دار', 30, 'reading', TESTINNO),
        errorLog(15),
      ]),
      day(3, 3, 'مبانی Writing', [
        T('آشنایی با تسک‌های Writing ۲۰۲۶ (Integrated + Academic Discussion)', 25, 'writing', ETS),
        T('نوشتن پاسخ Academic Discussion نمونه (۱۰۰ کلمه)', 40, 'writing'),
        vocab(25),
        T('سخنرانی Listening + نت‌برداری', 30, 'listening'),
        errorLog(15),
      ]),
      day(3, 4, 'ترکیب Reading + Listening', [
        T('یک پاساژ Reading و یک سخنرانی هم‌موضوع (پایه‌ی تسک Integrated)', 45, 'reading', TESTINNO),
        vocab(25),
        T('نوشتن خلاصه‌ی تلفیقی از هر دو منبع', 30, 'writing'),
        errorLog(20),
      ]),
      day(3, 5, 'آزمون پایان فاز ۱', [
        T('مینی‌موک: یک بخش Reading + یک بخش Listening کامل زمان‌دار', 60, 'mock', TESTINNO),
        T('یک تسک Speaking + یک تسک Writing', 30, 'mock'),
        T('تحلیل نتیجه و به‌روزرسانی نقاط ضعف', 25, 'review'),
        errorLog(15),
      ]),
      restDay(3, 6, 'فیلم انگلیسی با زیرنویس انگلیسی + یادداشت ۱۰ اصطلاح'),
    ],
  },
  // ===================== فاز ۲: مهارت‌سازی (هفته ۴–۷) =====================
  {
    number: 4,
    phase: 2,
    phaseName: 'مهارت‌سازی تخصصی',
    title: 'تسلط بر Reading (فرمت ۲۰۲۶)',
    goal: 'سه نوع تسک جدید Reading و همه‌ی انواع سوال را با دقت و سرعت تمرین کن.',
    days: [
      day(4, 0, 'انواع سوال Reading', [
        T('مرور همه‌ی انواع سوال Reading و استراتژی هرکدام', 30, 'reading'),
        T('تمرین سوالات Factual و Negative Factual', 35, 'reading', TESTINNO),
        vocab(25),
        T('Listen & Repeat + یک تسک Speaking مستقل', 30, 'speaking'),
        errorLog(15),
      ]),
      day(4, 1, 'استنتاج و هدف نویسنده', [
        T('تمرین سوالات Inference و Rhetorical Purpose', 40, 'reading', TESTINNO),
        vocab(25),
        T('سخنرانی Listening + سوالات هدف و نگرش', 30, 'listening'),
        errorLog(15),
        T('نوشتن یک پاراگراف استدلالی', 25, 'writing'),
      ]),
      day(4, 2, 'سوالات خلاصه و جدول', [
        T('تمرین Prose Summary و Fill-in-a-Table', 40, 'reading', TESTINNO),
        vocab(25),
        T('۲ پاساژ زمان‌دار (هر کدام ۱۸ دقیقه)', 36, 'reading'),
        errorLog(15),
      ]),
      day(4, 3, 'سرعت و مدیریت زمان', [
        T('۳ پاساژ پشت سر هم با سقف زمانی سخت', 54, 'reading', TESTINNO),
        vocab(25),
        T('بازگویی شفاهی خلاصه‌ی یکی از پاساژها', 20, 'speaking'),
        errorLog(20),
      ]),
      day(4, 4, 'واژگان در متن + تمرین تطبیقی', [
        T('تمرین تشخیص معنی واژگان از روی بافت متن', 30, 'reading'),
        T('تمرین در حالت تطبیقی (سختی متغیر)', 35, 'reading', TESTINNO),
        vocab(25),
        T('سخنرانی Listening + نت‌برداری', 30, 'listening'),
        errorLog(15),
      ]),
      day(4, 5, 'تست کامل Reading', [
        T('یک بخش Reading کامل و زمان‌دار (۳۰ دقیقه)', 30, 'mock', TESTINNO),
        T('تحلیل کامل خطاها و دسته‌بندی نوع اشتباه', 35, 'review'),
        vocab(25),
        T('یک تسک Writing تلفیقی', 30, 'writing'),
        errorLog(15),
      ]),
      restDay(4, 6, 'خواندن یک مقاله‌ی علمی دلخواه (National Geographic/BBC)'),
    ],
  },
  {
    number: 5,
    phase: 2,
    phaseName: 'مهارت‌سازی تخصصی',
    title: 'تسلط بر Listening (فرمت ۲۰۲۶)',
    goal: 'چهار نوع تسک Listening (آکادمیک و روزمره) و نت‌برداری سریع را کامل کن.',
    days: [
      day(5, 0, 'مکالمات دانشگاهی', [
        T('تمرین Conversations (دفتر استاد، خدمات دانشجویی)', 35, 'listening', TESTINNO),
        T('شناسایی مشکل/هدف و راه‌حل در مکالمه', 25, 'listening'),
        vocab(25),
        T('Listen & Repeat: ۲۰ جمله', 30, 'speaking'),
        errorLog(15),
      ]),
      day(5, 1, 'سخنرانی‌های آکادمیک', [
        T('۲ سخنرانی آکادمیک + نت‌برداری ساختاریافته', 40, 'listening', TESTINNO),
        vocab(25),
        T('سوالات Function و Attitude (لحن و قصد گوینده)', 30, 'listening'),
        errorLog(15),
        T('بازگویی شفاهی یک سخنرانی', 20, 'speaking'),
      ]),
      day(5, 2, 'جزئیات و سازماندهی', [
        T('تمرین سوالات Detail و Organization', 35, 'listening', TESTINNO),
        vocab(25),
        T('تمرین تشخیص ربط بین بخش‌های سخنرانی', 30, 'listening'),
        T('یک پاساژ Reading زمان‌دار', 30, 'reading'),
        errorLog(15),
      ]),
      day(5, 3, 'تمرین تطبیقی Listening', [
        T('تمرین در حالت Adaptive با سختی متغیر', 40, 'listening', TESTINNO),
        vocab(25),
        T('نت‌برداری سریع روی صوت با سرعت بالا', 30, 'listening'),
        errorLog(20),
        T('یک تسک Speaking تلفیقی', 25, 'speaking'),
      ]),
      day(5, 4, 'گوش دادن به لهجه‌های مختلف', [
        T('شنیدن صوت با لهجه‌های بریتیش/استرالیایی/آمریکایی', 35, 'listening'),
        vocab(25),
        T('سخنرانی طولانی + پاسخ به مجموعه سوال کامل', 35, 'listening', TESTINNO),
        errorLog(15),
      ]),
      day(5, 5, 'تست کامل Listening', [
        T('یک بخش Listening کامل و زمان‌دار (۲۹ دقیقه)', 29, 'mock', TESTINNO),
        T('تحلیل خطاها و دسته‌بندی نوع اشتباه', 35, 'review'),
        vocab(25),
        T('یک پاراگراف Writing', 25, 'writing'),
        errorLog(15),
      ]),
      restDay(5, 6, 'گوش دادن به یک پادکست بلند بدون نت (مثلاً 6 Minute English)'),
    ],
  },
  {
    number: 6,
    phase: 2,
    phaseName: 'مهارت‌سازی تخصصی',
    title: 'تسلط بر Speaking (فرمت ۲۰۲۶)',
    goal: 'تسک Listen & Repeat و سایر تسک‌ها را با روانی، تلفظ درست و ساختار منسجم تمرین کن.',
    days: [
      day(6, 0, 'Listen & Repeat حرفه‌ای', [
        T('تمرین فشرده Listen & Repeat: ۲۵ جمله با ضبط و مقایسه', 40, 'speaking', TESTINNO),
        T('کار روی استرس کلمات و آهنگ جمله (intonation)', 25, 'speaking'),
        vocab(25),
        T('یک سخنرانی Listening', 25, 'listening'),
        errorLog(15),
      ]),
      day(6, 1, 'تسک مستقل (Independent)', [
        T('قالب پاسخ ۴۵ ثانیه‌ای: نظر + ۲ دلیل + مثال', 30, 'speaking'),
        T('تمرین ۵ سوال مستقل با ضبط صدا', 40, 'speaking', TESTINNO),
        vocab(25),
        T('گوش دادن به نمونه پاسخ نمره‌بالا و تحلیل', 25, 'speaking'),
        errorLog(15),
      ]),
      day(6, 2, 'تسک تلفیقی Read–Listen–Speak', [
        T('قالب پاسخ تلفیقی: خواندن، شنیدن، خلاصه گفتاری', 35, 'speaking'),
        T('تمرین ۳ تسک تلفیقی کامل با ضبط', 45, 'speaking', TESTINNO),
        vocab(25),
        errorLog(20),
      ]),
      day(6, 3, 'روانی و کاهش مکث', [
        T('تمرین shadowing روی ۲ صوت بومی', 30, 'speaking'),
        T('تمرین پاسخ بدون مکث طولانی (filler-free)', 30, 'speaking'),
        vocab(25),
        T('یک پاساژ Reading + یک سخنرانی Listening', 45, 'reading'),
        errorLog(15),
      ]),
      day(6, 4, 'تلفظ و ارزیابی خود', [
        T('ضبط ۵ پاسخ و ارزیابی با معیارهای ETS (تلفظ، روانی، گرامر)', 40, 'speaking'),
        vocab(25),
        T('Listen & Repeat: ۲۰ جمله سخت‌تر', 30, 'speaking', TESTINNO),
        T('نوشتن یک پاراگراف', 20, 'writing'),
        errorLog(15),
      ]),
      day(6, 5, 'تست کامل Speaking', [
        T('یک بخش Speaking کامل و زمان‌دار (۸ دقیقه، همه تسک‌ها)', 20, 'mock', TESTINNO),
        T('گوش دادن به ضبط‌ها و نمره‌دهی خودت', 35, 'review'),
        vocab(25),
        T('یک بخش Listening', 30, 'listening'),
        errorLog(20),
      ]),
      restDay(6, 6, 'مکالمه‌ی آزاد انگلیسی با خودت یا یک هم‌مباحثه به مدت ۱۵ دقیقه'),
    ],
  },
  {
    number: 7,
    phase: 2,
    phaseName: 'مهارت‌سازی تخصصی',
    title: 'تسلط بر Writing (فرمت ۲۰۲۶)',
    goal: 'دقت گرامری بالا، تسک Integrated و Academic Discussion را با ساختار قوی بنویس.',
    days: [
      day(7, 0, 'تسک Integrated Writing', [
        T('قالب تسک تلفیقی: خواندن ۳ نکته، شنیدن رد/تأیید، نوشتن', 35, 'writing'),
        T('نوشتن یک پاسخ تلفیقی کامل (۱۵۰–۲۰۰ کلمه)', 40, 'writing', TESTINNO),
        vocab(25),
        errorLog(20),
      ]),
      day(7, 1, 'تسک Academic Discussion', [
        T('قالب پاسخ به بحث کلاسی: موضع + دلیل + مثال (۱۰ دقیقه)', 30, 'writing'),
        T('نوشتن ۲ پاسخ Academic Discussion', 45, 'writing', TESTINNO),
        vocab(25),
        T('یک سخنرانی Listening', 25, 'listening'),
        errorLog(15),
      ]),
      day(7, 2, 'دقت گرامری و ویرایش', [
        T('بازبینی نوشته‌های قبلی و اصلاح خطاهای گرامری', 35, 'grammar'),
        T('تمرین جملات پیچیده و متنوع (variety)', 30, 'writing'),
        vocab(25),
        T('یک پاساژ Reading زمان‌دار', 30, 'reading'),
        errorLog(15),
      ]),
      day(7, 3, 'تنوع واژگانی در نوشتار', [
        T('یادگیری collocations و عبارات آکادمیک پرکاربرد', 30, 'vocab'),
        T('بازنویسی یک متن با واژگان قوی‌تر', 35, 'writing'),
        vocab(20),
        T('یک تسک Speaking تلفیقی', 30, 'speaking'),
        errorLog(15),
      ]),
      day(7, 4, 'نوشتن زیر فشار زمان', [
        T('نوشتن یک Integrated و یک Academic Discussion پشت سر هم', 50, 'writing', TESTINNO),
        vocab(25),
        T('خودارزیابی با معیارهای نمره‌دهی Writing', 30, 'review'),
        errorLog(15),
      ]),
      day(7, 5, 'تست کامل Writing', [
        T('یک بخش Writing کامل و زمان‌دار (۲۳ دقیقه)', 23, 'mock', TESTINNO),
        T('تحلیل و نمره‌دهی + فهرست خطاهای تکراری', 35, 'review'),
        vocab(25),
        T('یک بخش Reading', 30, 'reading'),
        errorLog(20),
      ]),
      restDay(7, 6, 'نوشتن آزاد ۱۰ دقیقه‌ای دفترچه خاطرات به انگلیسی'),
    ],
  },
  // ===================== فاز ۳: تمرین فشرده (هفته ۸–۱۰) =====================
  {
    number: 8,
    phase: 3,
    phaseName: 'تمرین فشرده و هدف‌گیری ضعف',
    title: 'بخش‌های کامل Reading + Listening',
    goal: 'با سرعت و دقت واقعی آزمون، بخش‌های کامل بزن و نقاط ضعف را هدف بگیر.',
    days: [
      day(8, 0, 'Reading زمان‌دار', [
        T('۲ بخش Reading کامل پشت سر هم', 60, 'mock', TESTINNO),
        T('تحلیل عمیق خطاها', 30, 'review'),
        vocab(25),
        errorLog(20),
      ]),
      day(8, 1, 'Listening زمان‌دار', [
        T('۲ بخش Listening کامل', 58, 'mock', TESTINNO),
        T('تحلیل خطاها و بازشنیدن قسمت‌های سخت', 35, 'review'),
        vocab(25),
        errorLog(20),
      ]),
      day(8, 2, 'هدف‌گیری ضعف ۱', [
        T('تمرکز روی ضعیف‌ترین نوع سوال Reading (طبق دفترچه خطا)', 45, 'reading'),
        vocab(25),
        T('یک بخش Listening', 30, 'listening', TESTINNO),
        T('یک تسک Speaking تلفیقی', 25, 'speaking'),
        errorLog(20),
      ]),
      day(8, 3, 'هدف‌گیری ضعف ۲', [
        T('تمرکز روی ضعیف‌ترین نوع سوال Listening', 45, 'listening', TESTINNO),
        vocab(25),
        T('یک بخش Reading زمان‌دار', 30, 'reading'),
        T('یک تسک Writing', 30, 'writing'),
        errorLog(20),
      ]),
      day(8, 4, 'تمرین تطبیقی فشرده', [
        T('تمرین R+L در حالت Adaptive با سختی بالا', 55, 'mock', TESTINNO),
        vocab(25),
        T('Listen & Repeat + تسک مستقل Speaking', 30, 'speaking'),
        errorLog(20),
      ]),
      day(8, 5, 'نیمه‌موک R+L', [
        T('یک Reading + یک Listening کامل، پشت سر هم بدون توقف', 60, 'mock', TESTINNO),
        T('تحلیل کامل و به‌روزرسانی نمودار پیشرفت', 40, 'review'),
        vocab(25),
        errorLog(20),
      ]),
      restDay(8, 6, 'تماشای مستند انگلیسی + نت‌برداری سبک از ۱۰ نکته'),
    ],
  },
  {
    number: 9,
    phase: 3,
    phaseName: 'تمرین فشرده و هدف‌گیری ضعف',
    title: 'بخش‌های کامل Speaking + Writing',
    goal: 'تسک‌های تولیدی را زیر فشار زمان و با کیفیت نمره‌بالا تمرین کن.',
    days: [
      day(9, 0, 'Speaking فشرده', [
        T('۲ بخش Speaking کامل با ضبط', 40, 'mock', TESTINNO),
        T('نمره‌دهی دقیق با معیارهای ETS', 35, 'review'),
        vocab(25),
        T('یک بخش Reading', 30, 'reading'),
        errorLog(20),
      ]),
      day(9, 1, 'Writing فشرده', [
        T('۲ بخش Writing کامل', 50, 'mock', TESTINNO),
        T('ویرایش گرامری و نمره‌دهی', 35, 'review'),
        vocab(25),
        T('یک بخش Listening', 30, 'listening'),
        errorLog(20),
      ]),
      day(9, 2, 'تلفیق Speaking + Listening', [
        T('تمرکز روی تسک‌های تلفیقی Speaking (Read–Listen–Speak)', 45, 'speaking', TESTINNO),
        vocab(25),
        T('یک بخش Listening کامل', 30, 'listening'),
        errorLog(20),
        T('یک تسک Integrated Writing', 30, 'writing'),
      ]),
      day(9, 3, 'تلفیق Writing + منابع', [
        T('تمرکز روی Integrated Writing با صوت‌های سخت‌تر', 45, 'writing', TESTINNO),
        vocab(25),
        T('Academic Discussion زیر فشار زمان', 25, 'writing'),
        T('یک بخش Reading', 30, 'reading'),
        errorLog(20),
      ]),
      day(9, 4, 'روانی و سرعت تولید', [
        T('shadowing + تمرین پاسخ سریع Speaking', 40, 'speaking'),
        vocab(25),
        T('نوشتن سریع با حفظ دقت گرامری', 35, 'writing'),
        T('یک بخش Listening', 30, 'listening', TESTINNO),
        errorLog(20),
      ]),
      day(9, 5, 'نیمه‌موک S+W', [
        T('یک Speaking + یک Writing کامل پشت سر هم', 35, 'mock', TESTINNO),
        T('تحلیل کامل و به‌روزرسانی نمودار پیشرفت', 40, 'review'),
        vocab(25),
        T('یک بخش Reading', 30, 'reading'),
        errorLog(20),
      ]),
      restDay(9, 6, 'گوش دادن به یک سخنرانی دانشگاهی واقعی (YouTube lecture)'),
    ],
  },
  {
    number: 10,
    phase: 3,
    phaseName: 'تمرین فشرده و هدف‌گیری ضعف',
    title: 'تمرین ترکیبی و شبیه‌سازی Adaptive',
    goal: 'هر چهار مهارت را در یک نشست ترکیب کن و به شرایط واقعی آزمون نزدیک شو.',
    days: [
      day(10, 0, 'نشست ترکیبی ۱', [
        T('Reading + Listening کامل زمان‌دار', 60, 'mock', TESTINNO),
        T('Speaking کامل', 20, 'mock'),
        T('تحلیل خطاها', 30, 'review'),
        vocab(20),
        errorLog(15),
      ]),
      day(10, 1, 'نشست ترکیبی ۲', [
        T('Listening + Writing کامل زمان‌دار', 55, 'mock', TESTINNO),
        T('یک بخش Reading', 30, 'reading'),
        T('تحلیل و نمره‌دهی', 35, 'review'),
        vocab(20),
        errorLog(15),
      ]),
      day(10, 2, 'شبیه‌سازی Adaptive', [
        T('تمرین R+L در سخت‌ترین حالت تطبیقی', 60, 'mock', TESTINNO),
        T('بررسی مدیریت زمان و خستگی ذهنی', 25, 'review'),
        vocab(25),
        T('یک بخش Speaking', 20, 'speaking'),
        errorLog(20),
      ]),
      day(10, 3, 'رفع آخرین ضعف‌ها', [
        T('کار روی دو ضعف باقی‌مانده طبق دفترچه خطا', 50, 'review'),
        vocab(25),
        T('یک بخش Writing', 25, 'writing', TESTINNO),
        T('یک بخش Listening', 30, 'listening'),
        errorLog(20),
      ]),
      day(10, 4, 'تثبیت سرعت', [
        T('Reading با سقف زمانی فشرده‌تر از واقعی', 40, 'reading', TESTINNO),
        vocab(25),
        T('Speaking سریع بدون مکث', 25, 'speaking'),
        T('یک بخش Listening', 30, 'listening'),
        errorLog(20),
      ]),
      day(10, 5, 'نیمه‌موک کامل', [
        T('سه بخش پشت سر هم (R + L + S) در شرایط واقعی', 65, 'mock', TESTINNO),
        T('تحلیل کامل + به‌روزرسانی نمودار', 35, 'review'),
        vocab(20),
        errorLog(15),
      ]),
      restDay(10, 6, 'استراحت کامل ذهنی + تماشای فیلم انگلیسی برای لذت'),
    ],
  },
  // ===================== فاز ۴: موک و تثبیت (هفته ۱۱–۱۲) =====================
  {
    number: 11,
    phase: 4,
    phaseName: 'آزمون شبیه‌سازی و تثبیت',
    title: 'موک‌های کامل + مرور عمیق',
    goal: 'آزمون کامل در شرایط واقعی بزن، خطاها را ریشه‌ای رفع کن و استراتژی روز آزمون را بساز.',
    days: [
      day(11, 0, 'موک کامل ۱', [
        T('آزمون کامل تافل (هر ۴ بخش پشت سر هم، ۹۰ دقیقه)', 90, 'mock', TESTINNO),
        T('استراحت کوتاه + ثبت احساس و انرژی', 10, 'rest'),
        vocab(15),
      ]),
      day(11, 1, 'مرور عمیق موک ۱', [
        T('تحلیل کامل تک‌تک خطاهای موک ۱', 60, 'review'),
        T('بازشنیدن/بازخوانی قسمت‌های اشتباه', 30, 'review'),
        vocab(25),
        errorLog(20),
      ]),
      day(11, 2, 'تقویت هدفمند', [
        T('تمرین متمرکز روی ضعیف‌ترین بخش موک ۱', 50, 'review', TESTINNO),
        vocab(25),
        T('یک بخش Speaking + یک تسک Writing', 35, 'speaking'),
        errorLog(20),
      ]),
      day(11, 3, 'موک کامل ۲', [
        T('آزمون کامل تافل دوم (۹۰ دقیقه)', 90, 'mock', TESTINNO),
        T('ثبت زمان‌بندی هر بخش', 10, 'review'),
        vocab(15),
      ]),
      day(11, 4, 'مرور عمیق موک ۲', [
        T('تحلیل کامل خطاهای موک ۲ و مقایسه با موک ۱', 60, 'review'),
        vocab(25),
        T('کار روی الگوهای خطای تکراری', 35, 'review'),
        errorLog(20),
      ]),
      day(11, 5, 'استراتژی روز آزمون', [
        T('تدوین برنامه‌ی مدیریت زمان و استراحت‌های بین بخش', 30, 'review'),
        T('تمرین تکنیک‌های کنترل استرس و تمرکز', 25, 'review'),
        vocab(25),
        T('یک بخش سبک از هر مهارت برای حفظ آمادگی', 40, 'mock'),
        errorLog(15),
      ]),
      restDay(11, 6, 'استراحت + مرور فقط فلش‌کارت‌های واژگان'),
    ],
  },
  {
    number: 12,
    phase: 4,
    phaseName: 'آزمون شبیه‌سازی و تثبیت',
    title: 'تثبیت نهایی + کاهش فشار (Taper)',
    goal: 'با موک نهایی به اوج برس، سپس فشار را کم کن تا روز آزمون با اعتماد به نفس کامل بروی.',
    days: [
      day(12, 0, 'موک نهایی', [
        T('آزمون کامل تافل نهایی در ساعت واقعی آزمونت (۹۰ دقیقه)', 90, 'mock', TESTINNO),
        T('ثبت نمره‌ی تخمینی و مقایسه با هدف ۹۵+', 15, 'review'),
        vocab(15),
      ]),
      day(12, 1, 'مرور نهایی موک', [
        T('مرور خطاهای موک نهایی (فقط نکات کلیدی)', 45, 'review'),
        vocab(25),
        T('تمرین سبک هر مهارت برای حفظ ریتم', 40, 'mock'),
        errorLog(15),
      ]),
      day(12, 2, 'جمع‌بندی استراتژی‌ها', [
        T('مرور قالب‌های Speaking و Writing', 35, 'review'),
        T('مرور تکنیک‌های Reading و Listening', 30, 'review'),
        vocab(25),
        T('یک تسک Speaking + یک Writing سبک', 30, 'speaking'),
      ]),
      day(12, 3, 'کاهش فشار (Taper)', [
        T('تمرین سبک و کوتاه فقط برای گرم‌نگه‌داشتن', 40, 'mock'),
        T('مرور فلش‌کارت‌های واژگان', 25, 'vocab'),
        T('شنیدن انگلیسی برای سرگرمی (بدون فشار)', 25, 'listening'),
      ]),
      day(12, 4, 'آماده‌سازی روز آزمون', [
        T('چک‌لیست روز آزمون (مدارک، زمان، مسیر/تنظیمات آنلاین)', 25, 'review', ETS),
        T('مرور سریع قالب‌ها و نکات طلایی', 30, 'review'),
        T('خواب کافی و تغذیه‌ی خوب — بدون مطالعه‌ی سنگین', 5, 'rest'),
        vocab(15),
      ]),
      day(12, 5, 'استراحت کامل قبل از آزمون', [
        T('فقط مرور ذهنی استراتژی‌ها — بدون آزمون', 20, 'review'),
        T('ریلکسیشن و خواب زودهنگام', 10, 'rest'),
      ], true),
      day(12, 6, '🎯 روز آزمون', [
        T('صبحانه‌ی سبک، گرم‌کردن با چند جمله Listen & Repeat', 15, 'speaking'),
        T('حضور در آزمون با اعتماد به نفس — تو آماده‌ای!', 90, 'mock'),
      ], true),
    ],
  },
]

// محاسبه‌ی مجموع دقایق یک روز
export function dayMinutes(d: Day): number {
  return d.tasks.reduce((sum, t) => sum + t.minutes, 0)
}

// همه‌ی روزها به‌صورت یک آرایه‌ی صاف (برای محاسبه‌ی پیشرفت کلی)
export const ALL_DAYS: { week: number; day: Day }[] = ROADMAP.flatMap((w) =>
  w.days.map((d) => ({ week: w.number, day: d })),
)

export const ALL_TASK_IDS: string[] = ROADMAP.flatMap((w) =>
  w.days.flatMap((d) => d.tasks.map((t) => t.id)),
)

export const TOTAL_TASKS = ALL_TASK_IDS.length

export const PHASES = [
  { id: 1, name: 'پایه‌سازی و فعال‌سازی مجدد', weeks: '۱–۳', hours: '~۲.۵ ساعت/روز' },
  { id: 2, name: 'مهارت‌سازی تخصصی', weeks: '۴–۷', hours: '~۳ ساعت/روز' },
  { id: 3, name: 'تمرین فشرده و هدف‌گیری ضعف', weeks: '۸–۱۰', hours: '~۳.۵ ساعت/روز' },
  { id: 4, name: 'آزمون شبیه‌سازی و تثبیت', weeks: '۱۱–۱۲', hours: '~۳ ساعت/روز' },
]
