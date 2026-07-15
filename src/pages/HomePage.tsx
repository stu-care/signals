import { Link } from 'react-router-dom'
import { useCurrentCountry } from '@/lib/useCurrentCountry'
import { getCountryData } from '@/data'
import { SignalRenderer } from '@/components/signal/SignalRenderer'
import { ComingSoon } from '@/pages/ComingSoon'

export function HomePage() {
  const country = useCurrentCountry()
  const data = getCountryData(country.code)
  const base = `/${country.code}`

  if (!data) return <ComingSoon country={country} />

  const featured = data.families[0]?.variants[0]

  return (
    <div>
      <section className="grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            {country.flag} {country.adjective} signalling · Train Sim World
          </p>
          <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">
            See a signal in-game and know exactly what it means.
          </h1>
          <p className="mt-4 max-w-xl text-muted">
            An interactive reference for the signals and safety systems you meet on{' '}
            {country.adjective} routes. Match what you see, learn what to do, and
            understand how the safety systems behind it work.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to={`${base}/build`}
              className="rounded-xl bg-accent px-5 py-3 font-semibold text-accent-contrast transition hover:brightness-110"
            >
              Identify a signal →
            </Link>
            <Link
              to={`${base}/catalogue`}
              className="rounded-xl border border-border-strong px-5 py-3 font-semibold transition hover:bg-surface-2"
            >
              Browse the catalogue
            </Link>
          </div>
        </div>
        {featured && (
          <div className="flex justify-center rounded-2xl border border-border bg-surface p-6">
            <SignalRenderer
              geometry={featured.geometry}
              setting={{ green: 'steady' }}
              width={150}
            />
          </div>
        )}
      </section>

      <section className="mt-14 grid gap-4 sm:grid-cols-3">
        <EntryCard
          to={`${base}/build`}
          title="Identify"
          body="Set the lamps to match what you see and get the exact interpretation."
        />
        <EntryCard
          to={`${base}/catalogue`}
          title="Catalogue"
          body="Scan every aspect, grouped by signal type, and click for the detail."
        />
        <EntryCard
          to={`${base}/safety`}
          title="Safety systems"
          body="AWS, TPWS, DRA — what warns you, what stops you, and how you respond."
        />
      </section>
    </div>
  )
}

function EntryCard({ to, title, body }: { to: string; title: string; body: string }) {
  return (
    <Link
      to={to}
      className="group rounded-2xl border border-border bg-surface p-5 transition hover:border-border-strong hover:bg-surface-2"
    >
      <h2 className="text-lg font-semibold">
        {title}
        <span className="ml-1 inline-block transition group-hover:translate-x-0.5">→</span>
      </h2>
      <p className="mt-2 text-sm text-muted">{body}</p>
    </Link>
  )
}
