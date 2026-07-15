import { useNavigate } from 'react-router-dom'
import { COUNTRIES } from '@/data/countries'
import { useCurrentCountry } from '@/lib/useCurrentCountry'

/**
 * Country switcher — visible from day one (project decision). UK is live;
 * Germany and USA appear as disabled "Coming soon" options.
 */
export function CountrySwitcher() {
  const current = useCurrentCountry()
  const navigate = useNavigate()

  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="sr-only">Country</span>
      <select
        value={current.code}
        onChange={(e) => navigate(`/${e.target.value}`)}
        className="rounded-lg border border-border bg-surface-2 px-2 py-1.5 text-text"
        aria-label="Choose country"
      >
        {COUNTRIES.map((c) => (
          <option key={c.code} value={c.code} disabled={c.status !== 'live'}>
            {c.flag} {c.name}
            {c.status !== 'live' ? ' — coming soon' : ''}
          </option>
        ))}
      </select>
    </label>
  )
}
