import type { ReactNode } from 'react'

/**
 * The "Real-world note" callout. The site's spine is game-first; this block
 * appears only where real-world signalling meaningfully differs from the game.
 */
export function RealWorldNote({ children }: { children: ReactNode }) {
  return (
    <div className="mt-6 rounded-none border border-sig-yellow/40 bg-sig-yellow/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-sig-yellow">
        Real-world note
      </p>
      <p className="mt-1 text-sm">{children}</p>
    </div>
  )
}
