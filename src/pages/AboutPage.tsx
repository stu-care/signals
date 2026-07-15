import { Link } from 'react-router-dom'

export function AboutPage() {
  return (
    <article className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold">About Signals</h1>
      <div className="mt-4 space-y-4 text-muted">
        <p>
          <strong className="text-text">Signals</strong> is a fan-made, interactive
          reference for the railway signals and safety systems represented in{' '}
          <em>Train Sim World</em>. Its aim is simple: when you see a signal in-game, you
          can quickly work out what it means and what to do.
        </p>
        <p>
          The site teaches the systems as the game represents them, and adds a{' '}
          <em>real-world note</em> where the game meaningfully differs from real
          practice. It starts with the United Kingdom, with Germany and the USA planned.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-text">
          Not real-world training — please read
        </h2>
        <p>
          This is <strong className="text-text">not</strong> a training resource for real
          railway signalling and must never be used to operate, work on, or make decisions
          about real trains or infrastructure. Real signalling is governed by official
          rules and formal training. Content here is simplified and may differ from
          real-world practice.
        </p>
        <p>
          Signals is not affiliated with or endorsed by Dovetail Games, Network Rail, the
          RSSB, or any railway body. Trademarks belong to their respective owners.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-text">Privacy</h2>
        <p>
          No analytics, no tracking, no accounts, and nothing is sent anywhere. The site
          is fully static and works offline once installed.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-text">Contributing &amp; errors</h2>
        <p>
          Spotted a mistake or a signal we’re missing?{' '}
          <a
            href="https://github.com/stu-care/signals/issues"
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:underline"
          >
            Open an issue on GitHub ↗
          </a>
          . The project is open source. See also{' '}
          <Link to="/sources" className="text-accent hover:underline">
            Sources &amp; further reading
          </Link>
          .
        </p>
      </div>
    </article>
  )
}
