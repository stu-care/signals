import { NavLink } from 'react-router-dom'
import { useCurrentCountry } from '@/lib/useCurrentCountry'
import { Search } from '@/components/Search'
import { CountrySwitcher } from './CountrySwitcher'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  const country = useCurrentCountry()
  const base = `/${country.code}`

  const navClass = ({ isActive }: { isActive: boolean }) =>
    [
      'rounded-lg px-3 py-1.5 text-sm font-medium transition',
      isActive ? 'bg-surface-2 text-text' : 'text-muted hover:text-text',
    ].join(' ')

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-bg/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3">
        <NavLink to={base} className="flex items-center gap-2 font-bold tracking-tight">
          <SignalMark />
          <span>Signals</span>
        </NavLink>

        <nav className="order-3 flex w-full items-center gap-1 sm:order-none sm:w-auto">
          <NavLink to={`${base}/build`} className={navClass}>
            Identify
          </NavLink>
          <NavLink to={`${base}/catalogue`} className={navClass}>
            Catalogue
          </NavLink>
          <NavLink to={`${base}/safety`} className={navClass}>
            Safety systems
          </NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Search />
          <CountrySwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

function SignalMark() {
  return (
    <svg width="20" height="34" viewBox="0 0 20 34" aria-hidden="true">
      <rect x="4" y="1" width="12" height="26" rx="4" fill="#0c1116" stroke="#39485a" />
      <circle cx="10" cy="7" r="3.4" fill="var(--sig-green)" />
      <circle cx="10" cy="15" r="3.4" fill="var(--sig-yellow)" opacity="0.35" />
      <circle cx="10" cy="23" r="3.4" fill="var(--sig-red)" opacity="0.35" />
      <rect x="8.5" y="27" width="3" height="7" fill="#2b3644" />
    </svg>
  )
}
