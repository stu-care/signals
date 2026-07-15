import type { ReactNode } from 'react'

/**
 * A labelled content card used on detail pages. `highlight` gives the accent
 * treatment used for the primary "What you do" field.
 */
export function Field({
  label,
  children,
  highlight,
}: {
  label: string
  children: ReactNode
  highlight?: boolean
}) {
  return (
    <section
      className={[
        'mt-6 rounded-none p-4',
        highlight
          ? 'border border-accent/40 bg-accent/5'
          : 'border border-border bg-surface',
      ].join(' ')}
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-muted">{label}</p>
      <p className="mt-1">{children}</p>
    </section>
  )
}
