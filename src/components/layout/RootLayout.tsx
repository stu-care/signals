import { useEffect, useState } from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import { DisclaimerGate } from '@/components/DisclaimerGate'
import { hasAcceptedDisclaimer } from '@/lib/disclaimer'
import { Header } from './Header'
import { Footer } from './Footer'

export function RootLayout() {
  // Lazy init reads storage synchronously, so a returning visitor never renders
  // the gate (no flash) and a first-time visitor gets an inert background on the
  // very first paint.
  const [accepted, setAccepted] = useState(() => hasAcceptedDisclaimer())

  // Lock background scroll while the gate is open.
  useEffect(() => {
    if (accepted) return
    const root = document.documentElement
    const prev = root.style.overflow
    root.style.overflow = 'hidden'
    return () => {
      root.style.overflow = prev
    }
  }, [accepted])

  const onAccept = () => {
    setAccepted(true)
    // Move focus into the content now that it is interactive again.
    requestAnimationFrame(() => document.getElementById('main')?.focus())
  }

  return (
    <>
      {/* While the gate is open the whole app is inert: removed from tab order
          and hidden from assistive tech, so the disclaimer truly blocks. */}
      <div className="flex min-h-full flex-col" inert={!accepted}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-40 focus:rounded-lg focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-contrast"
        >
          Skip to content
        </a>
        <Header />
        <main
          id="main"
          tabIndex={-1}
          className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 outline-none"
        >
          <Outlet />
        </main>
        <Footer />
      </div>
      {!accepted && <DisclaimerGate onAccept={onAccept} />}
      <ScrollRestoration />
    </>
  )
}
