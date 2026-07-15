/**
 * Core typed data model for Signals.
 *
 * Everything is country-namespaced from day one (UK ships first; Germany then
 * USA are planned). Signal geometry is expressed as EDITABLE NUMBERS — never
 * AI-drawn path data — so lamp positions and plate shapes can be tuned by hand
 * or via the in-app calibration tool and fed straight back into these files.
 */

export type CountryCode = 'uk' | 'de' | 'us'

export interface Country {
  code: CountryCode
  /** Display name, e.g. "United Kingdom". */
  name: string
  /** Short label for the switcher, e.g. "UK". */
  short: string
  /** Adjective, e.g. "British". */
  adjective: string
  flag: string
  status: 'live' | 'coming-soon'
}

/* ------------------------------------------------------------------ *
 * Geometry — parametric primitives, positioned by editable numbers.
 * ------------------------------------------------------------------ */

export type LampColour = 'red' | 'yellow' | 'green' | 'white'

/** How a lamp is currently showing. Default (absent) = off. */
export type LampState = 'off' | 'steady' | 'flashing'

/** A physical lamp/lens on a signal, positioned by number. */
export interface LampSpec {
  /** Stable id — also the external-SVG hook (#lamp-<id>) and builder toggle key. */
  id: string
  x: number
  y: number
  /** Lens radius. */
  r: number
  colour: LampColour
  /** Always-on text label (identification never relies on colour alone). */
  label: string
  /** Optional short position hint, e.g. "top", "centre". */
  position?: string
}

/** Black backing plate / signal head — a rounded rectangle. */
export interface PlateSpec {
  x: number
  y: number
  w: number
  h: number
  radius: number
}

/** Vertical post the head is mounted on. */
export interface PostSpec {
  x: number
  width: number
  top: number
  bottom: number
}

/**
 * Junction indicator ("feather") — a row of white lights at an angle.
 * UK positions 1–6 correspond to different angles; store the angle directly.
 */
export interface FeatherSpec {
  id: string
  originX: number
  originY: number
  /** Angle in degrees, 0 = pointing right, negative = upward. */
  angleDeg: number
  lampCount: number
  spacing: number
  r: number
  label: string
}

/** Theatre-type route indicator: a box that shows an alphanumeric character. */
export interface TheatreSpec {
  id: string
  x: number
  y: number
  w: number
  h: number
  label: string
}

/** Position of a pivoting arm (semaphore / banner repeater). */
export type ArmPosition = 'danger' | 'clear'

/**
 * A pivoting arm. `stop` = red arm with a white stripe and a square end;
 * `distant` = yellow arm with a black chevron and a fishtail end; `banner` =
 * a black bar across a white disc (banner repeater). Danger/caution sits
 * horizontal; clear rises to ~45deg (upper-quadrant).
 */
export interface SemaphoreArmSpec {
  id: string
  pivotX: number
  pivotY: number
  length: number
  thickness: number
  kind: 'stop' | 'distant' | 'banner'
  label: string
}

/** A static lineside sign (speed boards etc.) — no aspect, just an appearance. */
export interface SignSpec {
  id: string
  kind: 'psr' | 'psr-diff' | 'tsr-warn' | 'tsr-commence' | 'tsr-terminate'
  x: number
  y: number
  w: number
  h: number
  /** Main number/character, e.g. "40". */
  primary?: string
  /** Secondary number for differential boards (e.g. freight speed). */
  secondary?: string
  label: string
}

export interface SignalGeometry {
  viewBox: { w: number; h: number }
  post?: PostSpec
  /** One or more backing plates (heads stacked vertically, subsidiary, etc.). */
  backplates: PlateSpec[]
  lamps: LampSpec[]
  feathers?: FeatherSpec[]
  theatre?: TheatreSpec
  arms?: SemaphoreArmSpec[]
  sign?: SignSpec
}

/* ------------------------------------------------------------------ *
 * Aspects, variants, families.
 * ------------------------------------------------------------------ */

/** The lit/flashing state of each lamp for a given aspect (default off). */
export type LampSetting = Record<string, LampState>

/** Optional indicator states shown alongside an aspect. */
export interface IndicatorSetting {
  /** Active feather id, if a junction indicator is lit. */
  feather?: string
  /** Character shown in the theatre box, if lit. */
  theatre?: string
}

export interface Aspect {
  id: string
  /** e.g. "Double yellow". */
  name: string
  /** Official short meaning, e.g. "Preliminary caution". */
  meaning: string
  /**
   * Shared concept id so the same idea links across variants/countries
   * (e.g. a "caution" concept shown differently on 3- vs 4-aspect).
   */
  concept: string
  /** Which lamps are lit and how. Lamps not listed are off. */
  lamps: LampSetting
  /** Arm positions for mechanical signals. Arms not listed default to danger. */
  arms?: Record<string, ArmPosition>

  /* Content template (game-first spine; real-world note only on divergence). */
  whatItMeans: string
  whatYouDo: string
  sequenceNote?: string
  /** How safety systems (AWS/TPWS/DRA) react to this aspect. */
  safetyInteraction?: string
  /** Identification pitfalls / look-alikes. */
  lookAlikes?: string
  /** "In Train Sim World" controls note (default binding caveat). */
  controls?: string
  /** Shown only where the game diverges from real-world signalling. */
  realWorldNote?: string
  /** Related aspect concepts for "compare with" links. */
  related?: string[]
}

export interface SignalVariant {
  id: string
  name: string
  shortName?: string
  blurb: string
  geometry: SignalGeometry
  aspects: Aspect[]
}

export interface SignalFamily {
  id: string
  name: string
  /** One-line description for the catalogue and nav. */
  blurb: string
  /** Longer intro for the family page. */
  intro: string
  variants: SignalVariant[]
}

/* ------------------------------------------------------------------ *
 * Safety systems.
 * ------------------------------------------------------------------ */

export interface SafetySystem {
  id: string
  /** e.g. "AWS". */
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
