import type { ReactNode } from 'react'

/**
 * The "Real-world note" callout. The site's spine is game-first; this block
 * appears only where real-world signalling meaningfully differs from the game.
 */
export function RealWorldNote({ children }: { children: ReactNode }) {
  return (
    <div className="mt-6 rounded-xl border border-signal-yellow/40 bg-signal-yellow/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-signal-yellow">
        Real-world note
      </p>
      <p className="mt-1 text-sm">{children}</p>
    </div>
  )
}
