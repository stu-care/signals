/**
 * Badge shown alongside an aspect whose lamps flash. It also carries the
 * "flashing" information for users with prefers-reduced-motion, where the lamp
 * animation itself is suppressed.
 */
export function FlashingBadge() {
  return (
    <span className="rounded bg-signal-yellow/20 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-signal-yellow">
      Flashing
    </span>
  )
}
