import { NavLink } from 'react-router-dom'
import { useCurrentCountry } from '@/lib/useCurrentCountry'
import { Search } from '@/components/Search'
import { CountrySwitcher } from './CountrySwitcher'

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
        </div>
      </div>
    </header>
  )
}

function SignalMark() {
  // Three iconographic dots — the Signal Dots mark.
  return (
    <svg width="14" height="34" viewBox="0 0 14 34" aria-hidden="true">
      <circle cx="7" cy="7" r="5" fill="#e5372b" stroke="#a4160c" strokeWidth="1.4" />
      <circle cx="7" cy="17" r="5" fill="#f1c015" stroke="#9c7d07" strokeWidth="1.4" />
      <circle cx="7" cy="27" r="5" fill="#1fa85a" stroke="#0c6234" strokeWidth="1.4" />
    </svg>
  )
}
