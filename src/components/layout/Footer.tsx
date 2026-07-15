import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-surface/40">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted">
        <p className="font-medium text-text">
          Fan-made reference — not for real-world railway training.
        </p>
        <p className="mt-1 max-w-2xl">
          Explains signals and safety systems as represented in{' '}
          <em>Train Sim World</em>. Not affiliated with Dovetail Games or any railway
          body. Details are simplified and may differ from real-world practice.
        </p>
        <nav className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          <Link to="/about" className="hover:text-text">
            About &amp; disclaimer
          </Link>
          <Link to="/sources" className="hover:text-text">
            Sources &amp; further reading
          </Link>
          <a
            href="https://github.com/stu-care/signals/issues"
            target="_blank"
            rel="noreferrer"
            className="hover:text-text"
          >
            Spotted an error? Report it ↗
          </a>
        </nav>
      </div>
    </footer>
  )
}
