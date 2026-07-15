import type {
  ArmPanel,
  ArmPosition,
  Aspect,
  DotState,
  GlyphPanel,
  LampSlot,
  Panel,
  SignalVariant,
} from '@/data/types'

/**
 * Deterministic interpretation of a signal configuration.
 *
 * The builder sets each element — dots (off / on / flash), arms (danger /
 * clear), aux panels (feather / poslight lit) and glyph characters. We compare
 * that against each defined aspect: an exact match returns it, otherwise we
 * return "not a recognised aspect" plus the closest defined aspect(s).
 */

export interface SignalState {
  lamps: Record<string, DotState>
  arms: Record<string, ArmPosition>
  on: string[]
  glyphs: Record<string, string>
}

export interface RecognisedResult {
  kind: 'recognised'
  aspect: Aspect
}
export interface UnrecognisedResult {
  kind: 'unrecognised'
  closest: Array<{ aspect: Aspect; distance: number }>
}
export type InterpretationResult = RecognisedResult | UnrecognisedResult

/* ---- element collectors ------------------------------------------ */

export function lampSlots(variant: SignalVariant): LampSlot[] {
  const out: LampSlot[] = []
  for (const p of variant.panels) if (p.type === 'lamps') out.push(...p.lamps)
  return out
}
export function armPanels(variant: SignalVariant): ArmPanel[] {
  return variant.panels.filter((p): p is ArmPanel => p.type === 'arm')
}
export function auxPanels(variant: SignalVariant): Panel[] {
  return variant.panels.filter((p) => p.type === 'poslight' || p.type === 'feather')
}
/** Glyph panels whose character is per-aspect (not a fixed static sign). */
export function glyphPanels(variant: SignalVariant): GlyphPanel[] {
  return variant.panels.filter(
    (p): p is GlyphPanel => p.type === 'glyph' && p.text === undefined,
  )
}

/* ---- matching ---------------------------------------------------- */

function distance(variant: SignalVariant, state: SignalState, aspect: Aspect): number {
  let d = 0
  for (const l of lampSlots(variant)) {
    if ((state.lamps[l.id] ?? 'off') !== (aspect.lamps?.[l.id] ?? 'off')) d += 1
  }
  for (const a of armPanels(variant)) {
    if ((state.arms[a.id] ?? 'danger') !== (aspect.arms?.[a.id] ?? 'danger')) d += 1
  }
  for (const p of auxPanels(variant)) {
    if (state.on.includes(p.id) !== !!aspect.on?.includes(p.id)) d += 1
  }
  for (const g of glyphPanels(variant)) {
    if ((state.glyphs[g.id] ?? '') !== (aspect.glyphs?.[g.id] ?? '')) d += 1
  }
  return d
}

export function interpret(variant: SignalVariant, state: SignalState): InterpretationResult {
  for (const aspect of variant.aspects) {
    if (distance(variant, state, aspect) === 0) return { kind: 'recognised', aspect }
  }
  const ranked = variant.aspects
    .map((aspect) => ({ aspect, distance: distance(variant, state, aspect) }))
    .sort((x, y) => x.distance - y.distance)
  const best = ranked[0]?.distance ?? Infinity
  const closest = ranked.filter((r) => r.distance <= best + 1).slice(0, 3)
  return { kind: 'unrecognised', closest }
}

/**
 * A lamp-based signal showing nothing (all dots off, nothing else lit). Only
 * meaningful for signals that have lamps and no arms — a semaphore always has
 * an arm position, so it is never "extinguished".
 */
export function isExtinguished(variant: SignalVariant, state: SignalState): boolean {
  const slots = lampSlots(variant)
  if (slots.length === 0 || armPanels(variant).length > 0) return false
  const anyLamp = slots.some((l) => (state.lamps[l.id] ?? 'off') !== 'off')
  return !anyLamp && state.on.length === 0
}
