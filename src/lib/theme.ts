/**
 * Theme handling. Dark is the default (project decision: dark theme first).
 * A user may opt into light; the choice is stored and applied before paint
 * in main.tsx to avoid a flash.
 */

export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'signals.theme'

export function getStoredTheme(): Theme {
  const stored = safeGet(STORAGE_KEY)
  return stored === 'light' ? 'light' : 'dark'
}

export function applyStoredTheme(): void {
  applyTheme(getStoredTheme())
}

export function applyTheme(theme: Theme): void {
  const root = document.documentElement
  root.classList.toggle('light', theme === 'light')
  root.classList.toggle('dark', theme === 'dark')
  safeSet(STORAGE_KEY, theme)
}

export function toggleTheme(): Theme {
  const next: Theme = getStoredTheme() === 'dark' ? 'light' : 'dark'
  applyTheme(next)
  return next
}

function safeGet(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function safeSet(key: string, value: string): void {
  try {
    localStorage.setItem(key, value)
  } catch {
    /* ignore (private mode etc.) */
  }
}
