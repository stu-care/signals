import { useEffect, useState } from 'react'
import { getStoredTheme, toggleTheme, type Theme } from '@/lib/theme'

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    setTheme(getStoredTheme())
  }, [])

  return (
    <button
      type="button"
      onClick={() => setTheme(toggleTheme())}
      className="rounded-lg border border-border bg-surface-2 px-2.5 py-1.5 text-sm"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}
