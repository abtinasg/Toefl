import { createContext, useContext, type ReactNode } from 'react'
import { useProgress } from '../hooks/useProgress'

type ProgressValue = ReturnType<typeof useProgress>

const ProgressContext = createContext<ProgressValue | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const value = useProgress()
  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgressContext(): ProgressValue {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgressContext باید داخل ProgressProvider استفاده شود')
  return ctx
}
