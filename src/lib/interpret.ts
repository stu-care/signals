import type {
  ArmPosition,
  Aspect,
  LampSetting,
  SignalVariant,
} from '@/data/types'

/**
 * Deterministic interpretation of a signal configuration.
 *
 * The builder lets a player set each physical element — lamps (off / steady /
 * flashing) and arms (danger / clear). We compare that configuration against
 * the variant's defined aspects:
 *  - an exact match returns that aspect;
 *  - otherwise we return "not a recognised aspect" plus the closest defined
 *    aspect(s), ranked by how few elements differ.
 */

export interface SignalState {
  lamps: LampSetting
  arms: Record<string, ArmPosition>
}

export interface RecognisedResult {
  kind: 'recognised'
  aspect: Aspect
}

export interface UnrecognisedResult {
  kind: 'unrecognised'
  /** Closest defined aspects, nearest first. */
  closest: Array<{ aspect: Aspect; distance: number }>
}

export type InterpretationResult = RecognisedResult | UnrecognisedResult

/** How many elements differ between the current state and an aspect. */
function distance(variant: SignalVariant, state: SignalState, aspect: Aspect): number {
  let d = 0
  for (const lamp of variant.geometry.lamps) {
    const a = state.lamps[lamp.id] ?? 'off'
    const b = aspect.lamps[lamp.id] ?? 'off'
    if (a !== b) d += 1
  }
  for (const arm of variant.geometry.arms ?? []) {
    const a = state.arms[arm.id] ?? 'danger'
    const b = aspect.arms?.[arm.id] ?? 'danger'
    if (a !== b) d += 1
  }
  return d
}

export function interpret(
  variant: SignalVariant,
  state: SignalState,
): InterpretationResult {
  for (const aspect of variant.aspects) {
    if (distance(variant, state, aspect) === 0) {
      return { kind: 'recognised', aspect }
    }
  }

  const ranked = variant.aspects
    .map((aspect) => ({ aspect, distance: distance(variant, state, aspect) }))
    .sort((x, y) => x.distance - y.distance)

  const best = ranked[0]?.distance ?? Infinity
  const closest = ranked.filter((r) => r.distance <= best + 1).slice(0, 3)

  return { kind: 'unrecognised', closest }
}

/**
 * Is a lamp-based signal showing nothing? (An all-off head is "extinguished",
 * not an aspect.) Only meaningful for signals that have lamps — a semaphore is
 * never "extinguished" because its arm always has a position.
 */
export function isExtinguished(variant: SignalVariant, state: SignalState): boolean {
  if (variant.geometry.lamps.length === 0) return false
  return variant.geometry.lamps.every(
    (lamp) => (state.lamps[lamp.id] ?? 'off') === 'off',
  )
}
