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
  /**
   * Whether this lamp can flash. Only lamps with `canFlash` offer the
   * off → on → flash cycle in the builder; the rest cycle off → on. Most lamps
   * never flash, so this defaults to false to avoid a dead click.
   */
  canFlash?: boolean
}

/* ------------------------------------------------------------------ *
 * Panels.
 * ------------------------------------------------------------------ */

/** A vertex on a custom backplate outline. `r` rounds that corner (px; 0 = sharp). */
export interface BackplatePoint {
  x: number
  y: number
  r?: number
}

/**
 * An optional custom outline behind a lamp panel, drawn as a soft grey line only
 * (no fill) so a signal head can be shaped to look accurate. Points are a closed
 * polygon in the panel's coordinate space; each corner can be individually curved.
 */
export interface Backplate {
  points: BackplatePoint[]
}

/** Free canvas of dots — the main signal head, GPL clusters, German Ks, etc. */
export interface LampsPanel {
  type: 'lamps'
  id: string
  w: number
  h: number
  lamps: LampSlot[]
  /** Optional soft-grey outline shaped around the dots. */
  backplate?: Backplate
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

/**
 * Multi-position junction indicator. A real signal shows one feather at a time,
 * angled to say which diverging route is set: positions 1–3 fan out to the left
 * ("first left", "second left", "third left") and 4–6 to the right. This panel
 * draws the whole fan faintly and lights the active position(s) per aspect, so a
 * player can compare what e.g. a first-left and a second-left feather look like.
 */
export interface JunctionPanel {
  type: 'junction'
  id: string
  /** Standard positions this indicator can display (1–6). */
  positions: number[]
  /** Dot radius (px). */
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
 * repeater (a black bar on a disc, no lamp). `tone: 'green'` turns the disc
 * green in the "off" (inclined) indication; the bar stays black.
 */
export interface ArmPanel {
  type: 'arm'
  id: string
  kind: ArmKind
  /** Banner disc: default white, or green in the off indication. */
  tone?: 'green'
  label: string
}

export type SignKind =
  | 'psr'
  | 'psr-diff'
  | 'psr-diverge'
  | 'psr-warn'
  | 'psr-warn-diverge'
  | 'tsr-warn'
  | 'tsr-commence'
  | 'tsr-terminate'
  // German lineside boards.
  | 'de-mast-main'
  | 'de-vorsignaltafel'

/** A static lineside sign (speed boards) — flat plate, no aspect state. */
export interface SignPanel {
  type: 'sign'
  id: string
  kind: SignKind
  primary?: string
  secondary?: string
  size?: number
  /** Route-divergence arrow direction (for the diverging-panel kinds). */
  arrow?: 'left' | 'right'
  label: string
}

export type Panel =
  | LampsPanel
  | PosLightPanel
  | FeatherPanel
  | JunctionPanel
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
  /** Junction-panel id -> which positions (1–6) are lit. */
  feathers?: Record<string, number[]>
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
  /** Display order within a country (lower first); defaults high if unset. */
  order?: number
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
