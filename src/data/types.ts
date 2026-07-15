/**
 * Data model for the "Iconographic Signal Dots" system.
 *
 * A signal is a vertical stack of PANELS separated by soft rules. The primary
 * panel is a free canvas of DOTS (one dot = one lamp: colour + position + size),
 * which is exactly what the signal editor produces. Auxiliary panel types cover
 * position-lights, feathers, bordered glyphs (theatre routes / speed figures)
 * and mechanical arms (semaphores).
 *
 * Everything is country-namespaced (UK ships first; Germany then USA planned).
 */

export type CountryCode = 'uk' | 'de' | 'us'

export interface Country {
  code: CountryCode
  name: string
  short: string
  adjective: string
  flag: string
  status: 'live' | 'coming-soon'
}

/* ------------------------------------------------------------------ *
 * Dots.
 * ------------------------------------------------------------------ */

export type LampColour =
  | 'red'
  | 'amber'
  | 'yellow'
  | 'green'
  | 'white'
  | 'lunar'
  | 'blue'

/** A dot is off (hollow ring), on (solid fill + ring), or flashing (pulsing). */
export type DotState = 'off' | 'on' | 'flash'

/** A lamp/lens on a free-canvas panel. Colour, position and size are structural. */
export interface LampSlot {
  /** Stable id — the aspect state key, builder toggle key and editor handle. */
  id: string
  color: LampColour
  /** Centre within the panel canvas (px). */
  x: number
  y: number
  /** Dot radius (px). */
  r: number
  label: string
}

/* ------------------------------------------------------------------ *
 * Panels.
 * ------------------------------------------------------------------ */

/** Free canvas of dots — the main signal head, GPL clusters, German Ks, etc. */
export interface LampsPanel {
  type: 'lamps'
  id: string
  w: number
  h: number
  lamps: LampSlot[]
}

/** Position-light subsidiary: two white dots on a diagonal. Lit per aspect. */
export interface PosLightPanel {
  type: 'poslight'
  id: string
  /** Diagonal direction: up-right (default) or up-left. */
  dir?: 'ur' | 'ul'
  r?: number
  label: string
}

/** UK junction indicator (feather): a short diagonal run of white dots. */
export interface FeatherPanel {
  type: 'feather'
  id: string
  dir?: 'ur' | 'ul'
  r?: number
  label: string
}

/** A bordered mono glyph — theatre route indicator or German Zs speed figure. */
export interface GlyphPanel {
  type: 'glyph'
  id: string
  /** Yellow border/ink (e.g. Zs3v); default ink. */
  tone?: 'yellow'
  size?: number
  label: string
  /** Fixed text for a static sign; otherwise the character comes per-aspect. */
  text?: string
}

export type ArmKind = 'stop' | 'distant' | 'banner'

/**
 * A flat mechanical indicator with a position per aspect. `stop`/`distant` are
 * semaphore arms (with a night lamp beneath the pivot); `banner` is a banner
 * repeater (a black bar on a white disc, no lamp).
 */
export interface ArmPanel {
  type: 'arm'
  id: string
  kind: ArmKind
  label: string
}

export type SignKind =
  | 'psr'
  | 'psr-diff'
  | 'tsr-warn'
  | 'tsr-commence'
  | 'tsr-terminate'

/** A static lineside sign (speed boards) — flat plate, no aspect state. */
export interface SignPanel {
  type: 'sign'
  id: string
  kind: SignKind
  primary?: string
  secondary?: string
  size?: number
  label: string
}

export type Panel =
  | LampsPanel
  | PosLightPanel
  | FeatherPanel
  | GlyphPanel
  | ArmPanel
  | SignPanel

/* ------------------------------------------------------------------ *
 * Aspects.
 * ------------------------------------------------------------------ */

export type ArmPosition = 'danger' | 'clear'

export interface Aspect {
  id: string
  name: string
  meaning: string
  /** Shared concept id so the same idea cross-links across variants/countries. */
  concept: string

  /* State (all optional; unset elements take their default). */
  /** Dot state by lamp-slot id (default off). */
  lamps?: Record<string, DotState>
  /** Arm position by arm-panel id (default danger). */
  arms?: Record<string, ArmPosition>
  /** ids of feather / poslight panels that are lit. */
  on?: string[]
  /** Glyph-panel id -> character shown. */
  glyphs?: Record<string, string>

  /* Content template (game-first spine; real-world note only on divergence). */
  whatItMeans: string
  whatYouDo: string
  sequenceNote?: string
  safetyInteraction?: string
  lookAlikes?: string
  controls?: string
  realWorldNote?: string
  related?: string[]
}

export interface SignalVariant {
  id: string
  name: string
  shortName?: string
  blurb: string
  /** The signal structure — panels rendered top to bottom. */
  panels: Panel[]
  aspects: Aspect[]
}

export interface SignalFamily {
  id: string
  name: string
  blurb: string
  intro: string
  variants: SignalVariant[]
}

/* ------------------------------------------------------------------ *
 * Safety systems.
 * ------------------------------------------------------------------ */

export interface SafetySystem {
  id: string
  abbr: string
  name: string
  blurb: string
  whatItIs: string
  driverExperience: string
  howYouInteract: string
  aspectInteraction: string
  controls?: string
  realWorldNote?: string
  edgeBehaviour?: string
}

export interface CountryData {
  country: Country
  families: SignalFamily[]
  safetySystems: SafetySystem[]
}
