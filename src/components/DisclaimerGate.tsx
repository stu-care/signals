import { useEffect, useRef, type KeyboardEvent } from 'react'
import { acceptDisclaimer } from '@/lib/disclaimer'

/**
 * Full-screen blocking gate shown on first arrival (and again after a version
 * bump). Rendered only while unaccepted (RootLayout owns that state and makes
 * the rest of the app inert), and it traps focus so keyboard / assistive-tech
 * users cannot reach the site without acknowledging.
 */
export function DisclaimerGate({ onAccept }: { onAccept: () => void }) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    buttonRef.current?.focus()
  }, [])

  const accept = () => {
    acceptDisclaimer()
    onAccept()
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    // The button is the only focusable element, so pin Tab to it and ignore
    // Escape (acknowledgement is required, not dismissable).
    if (e.key === 'Tab' || e.key === 'Escape') {
      e.preventDefault()
      buttonRef.current?.focus()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg/95 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="disclaimer-title"
      onKeyDown={onKeyDown}
    >
      <div className="max-w-lg rounded-2xl border border-border-strong bg-surface p-6 shadow-2xl sm:p-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">
          Please read
        </p>
        <h1 id="disclaimer-title" className="text-xl font-bold sm:text-2xl">
          This is a fan-made game reference — not real-world training
        </h1>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
          <p>
            <strong className="text-text">Signals</strong> explains railway signals and
            safety systems as they are represented in the video game{' '}
            <em>Train Sim World</em>. It exists to help players understand what they see
            in-game.
          </p>
          <p>
            It is <strong className="text-text">not</strong> a training resource for real
            railway signalling, and must never be used to operate, work on, or make
            decisions about real trains or infrastructure. Real signalling is governed by
            official rules and formal training. Details here are simplified and may differ
            from real-world practice.
          </p>
          <p>Not affiliated with or endorsed by Dovetail Games or any railway body.</p>
        </div>
        <button
          ref={buttonRef}
          type="button"
          onClick={accept}
          className="mt-6 w-full rounded-xl bg-accent px-4 py-3 font-semibold text-accent-contrast transition hover:brightness-110 focus-visible:brightness-110"
        >
          I understand — enter Signals
        </button>
      </div>
    </div>
  )
}
