import { NavLink, useLocation } from 'react-router-dom'
import { type ReactNode } from 'react'
import {
  LayoutDashboard,
  CalendarRange,
  GraduationCap,
  Library,
  NotebookPen,
  StickyNote,
  Settings as SettingsIcon,
  Moon,
  Sun,
} from 'lucide-react'
import { cn } from '../lib/utils'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useEffect } from 'react'

const NAV = [
  { to: '/', label: 'داشبورد', icon: LayoutDashboard },
  { to: '/roadmap', label: 'رودمپ', icon: CalendarRange },
  { to: '/skills', label: 'مهارت‌ها', icon: GraduationCap },
  { to: '/resources', label: 'منابع', icon: Library },
  { to: '/errorlog', label: 'دفترچه', icon: NotebookPen },
  { to: '/notes', label: 'یادداشت', icon: StickyNote },
  { to: '/settings', label: 'تنظیمات', icon: SettingsIcon },
]

function useTheme() {
  const [dark, setDark] = useLocalStorage<boolean>('toefl-theme-dark', false)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])
  return { dark, setDark }
}

export function Layout({ children }: { children: ReactNode }) {
  const { dark, setDark } = useTheme()
  const { pathname } = useLocation()

  return (
    <div className="min-h-screen">
      {/* هدر */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            <div>
              <h1 className="text-base font-bold leading-tight">رودمپ تافل ۲۰۲۶</h1>
              <p className="text-xs text-slate-400">هدف: نمره ۹۵+</p>
            </div>
          </div>
          <button
            onClick={() => setDark(!dark)}
            aria-label="تغییر تم"
            className="rounded-xl border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* ناوبری دسکتاپ */}
        <nav className="mx-auto hidden max-w-5xl gap-1 px-4 pb-2 sm:flex">
          {NAV.map((item) => {
            const active = pathname === item.to
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={cn(
                  'flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition',
                  active
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300'
                    : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800',
                )}
              >
                <Icon size={16} /> {item.label}
              </NavLink>
            )
          })}
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6 pb-24 sm:pb-10 animate-fade-in">{children}</main>

      {/* ناوبری موبایل (پایین) */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95 sm:hidden">
        <div className="mx-auto flex max-w-5xl justify-around">
          {NAV.map((item) => {
            const active = pathname === item.to
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={cn(
                  'flex flex-1 flex-col items-center gap-1 py-2 text-[10px] font-medium transition',
                  active ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400',
                )}
              >
                <Icon size={20} /> {item.label}
              </NavLink>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
