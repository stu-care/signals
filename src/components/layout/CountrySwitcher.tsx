import { useNavigate } from 'react-router-dom'
import { COUNTRIES } from '@/data/countries'
import { liveCountryCodes } from '@/data'
import { useCurrentCountry } from '@/lib/useCurrentCountry'

/**
 * Country switcher — visible from day one (project decision). A country is
 * enabled once it has data on disk; the rest show as "coming soon".
 */
export function CountrySwitcher() {
  const current = useCurrentCountry()
  const navigate = useNavigate()
  const live = new Set(liveCountryCodes())

  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="sr-only">Country</span>
      <select
        value={current.code}
        onChange={(e) => navigate(`/${e.target.value}`)}
        className="rounded-none border border-border bg-surface-2 px-2 py-1.5 text-ink"
        aria-label="Choose country"
      >
        {COUNTRIES.map((c) => (
          <option key={c.code} value={c.code} disabled={!live.has(c.code)}>
            {c.name}
            {live.has(c.code) ? '' : ' — coming soon'}
          </option>
        ))}
      </select>
    </label>
  )
}
