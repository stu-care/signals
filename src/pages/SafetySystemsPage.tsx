import { Link } from 'react-router-dom'
import { useCurrentCountry } from '@/lib/useCurrentCountry'
import { getCountryData } from '@/data'
import { ComingSoon } from '@/pages/ComingSoon'

export function SafetySystemsPage() {
  const country = useCurrentCountry()
  const data = getCountryData(country.code)
  if (!data) return <ComingSoon country={country} />

  return (
    <div>
      <h1 className="text-2xl font-bold sm:text-3xl">Safety systems</h1>
      <p className="mt-2 max-w-2xl text-muted">
        The systems working alongside the signals: what warns you, what stops you, and
        how you respond.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {data.safetySystems.map((s) => (
          <li key={s.id}>
            <Link
              to={`/${country.code}/safety/${s.id}`}
              className="block h-full rounded-2xl border border-border bg-surface p-5 transition hover:border-border-strong hover:bg-surface-2"
            >
              <div className="flex items-baseline gap-2">
                <span className="rounded bg-surface-2 px-2 py-0.5 font-mono text-sm font-bold text-accent">
                  {s.abbr}
                </span>
                <h2 className="text-lg font-semibold">{s.name}</h2>
              </div>
              <p className="mt-2 text-sm text-muted">{s.blurb}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
