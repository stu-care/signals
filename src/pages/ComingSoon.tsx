import { Link } from 'react-router-dom'
import type { Country } from '@/data/types'

export function ComingSoon({ country }: { country: Country }) {
  return (
    <div className="mx-auto max-w-lg py-16 text-center">
      <p className="text-5xl">{country.flag}</p>
      <h1 className="mt-4 text-2xl font-bold">{country.name} — coming soon</h1>
      <p className="mt-3 text-muted">
        {country.adjective} signals and safety systems aren’t in Signals yet. The United
        Kingdom is available now, with Germany and the USA planned.
      </p>
      <Link
        to="/uk"
        className="mt-6 inline-block rounded-xl bg-accent px-5 py-3 font-semibold text-accent-contrast transition hover:brightness-110"
      >
        Go to UK signals →
      </Link>
    </div>
  )
}
