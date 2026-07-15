import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-lg py-16 text-center">
      <p className="font-mono text-5xl font-bold text-sig-red">404</p>
      <h1 className="mt-4 text-2xl font-bold">Signal not found</h1>
      <p className="mt-3 text-muted">
        That page doesn’t exist. Treat it as a red — stop, and go back.
      </p>
      <Link
        to="/uk"
        className="mt-6 inline-block rounded-none bg-accent px-5 py-3 font-semibold text-white transition hover:brightness-110"
      >
        Back to Signals →
      </Link>
    </div>
  )
}
