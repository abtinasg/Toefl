import { useCallback, useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { ALL_DAYS, ROADMAP, TOTAL_TASKS, dayMinutes, type Day } from '../data/roadmap'
import { DEFAULT_START_DATE } from '../data/examInfo'
import { daysBetween } from '../lib/utils'

const STORAGE_KEY = 'toefl-progress-v1'
const SETTINGS_KEY = 'toefl-settings-v1'

interface Settings {
  startDate: string // ISO yyyy-mm-dd
}

// نگاشت taskId -> تاریخ تکمیل (ISO date)
type Completed = Record<string, string>

const todayISO = () => new Date().toISOString().slice(0, 10)

export function useProgress() {
  const [completed, setCompleted, resetCompleted] = useLocalStorage<Completed>(STORAGE_KEY, {})
  const [settings, setSettings] = useLocalStorage<Settings>(SETTINGS_KEY, {
    startDate: DEFAULT_START_DATE,
  })

  const toggleTask = useCallback(
    (taskId: string) => {
      setCompleted((prev) => {
        const next = { ...prev }
        if (next[taskId]) delete next[taskId]
        else next[taskId] = todayISO()
        return next
      })
    },
    [setCompleted],
  )

  const isDone = useCallback((taskId: string) => Boolean(completed[taskId]), [completed])

  const doneCount = Object.keys(completed).length
  const overallPercent = TOTAL_TASKS ? Math.round((doneCount / TOTAL_TASKS) * 100) : 0

  // پیشرفت هر هفته
  const weekProgress = useMemo(
    () =>
      ROADMAP.map((w) => {
        const ids = w.days.flatMap((d) => d.tasks.map((t) => t.id))
        const done = ids.filter((id) => completed[id]).length
        return {
          week: w.number,
          phase: w.phase,
          total: ids.length,
          done,
          percent: ids.length ? Math.round((done / ids.length) * 100) : 0,
        }
      }),
    [completed],
  )

  // پیشرفت هر روز (برای نمایش تیک کامل‌شدن روز)
  const dayDone = useCallback(
    (d: Day) => {
      const ids = d.tasks.map((t) => t.id)
      const done = ids.filter((id) => completed[id]).length
      return { done, total: ids.length, complete: done === ids.length && ids.length > 0 }
    },
    [completed],
  )

  // تاریخ‌ها و شمارش معکوس
  const start = new Date(settings.startDate)
  const examDate = new Date(start)
  examDate.setDate(examDate.getDate() + ROADMAP.length * 7 - 1) // آخرین روز برنامه = روز آزمون
  const today = new Date()
  const daysElapsed = Math.max(0, daysBetween(start, today))
  const daysToExam = daysBetween(today, new Date(examDate))
  const currentDayNumber = Math.min(ALL_DAYS.length, daysElapsed + 1)
  const currentWeek = Math.min(ROADMAP.length, Math.floor(daysElapsed / 7) + 1)

  // روز امروز در برنامه
  const todayPlan = ALL_DAYS[Math.min(ALL_DAYS.length - 1, daysElapsed)]

  // استریک: تعداد روزهای متوالی منتهی به امروز که حداقل یک تسک تیک خورده
  const streak = useMemo(() => {
    const dates = new Set(Object.values(completed))
    let s = 0
    const cursor = new Date()
    for (;;) {
      const iso = cursor.toISOString().slice(0, 10)
      if (dates.has(iso)) {
        s++
        cursor.setDate(cursor.getDate() - 1)
      } else break
    }
    return s
  }, [completed])

  // مجموع ساعت تکمیل‌شده
  const minutesDone = useMemo(() => {
    let m = 0
    for (const { day } of ALL_DAYS) {
      for (const t of day.tasks) if (completed[t.id]) m += t.minutes
    }
    return m
  }, [completed])

  const totalMinutes = useMemo(
    () => ALL_DAYS.reduce((sum, { day }) => sum + dayMinutes(day), 0),
    [],
  )

  const resetAll = useCallback(() => {
    resetCompleted()
  }, [resetCompleted])

  return {
    completed,
    toggleTask,
    isDone,
    doneCount,
    overallPercent,
    weekProgress,
    dayDone,
    settings,
    setSettings,
    start,
    examDate,
    daysElapsed,
    daysToExam,
    currentDayNumber,
    currentWeek,
    todayPlan,
    streak,
    minutesDone,
    totalMinutes,
    resetAll,
  }
}
