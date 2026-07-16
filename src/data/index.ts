import type {
  Aspect,
  CountryCode,
  CountryData,
  LampsPanel,
  Panel,
  SafetySystem,
  SharedLampPanel,
  SignalFamily,
  SignalVariant,
} from './types'
import { COUNTRIES } from './countries'

/**
 * Resolve `lamps-ref` panels to full lamp panels using a country's shared
 * definitions, so the renderer/interpreter only ever meet resolved lamp panels.
 * An unresolved reference becomes an empty placeholder rather than crashing.
 */
export function resolveLampsRefs(panels: Panel[], shared: SharedLampPanel[]): Panel[] {
  const byId = new Map(shared.map((s) => [s.id, s]))
  return panels.map((p): Panel => {
    if (p.type !== 'lamps-ref') return p
    const def = byId.get(p.ref)
    const resolved: LampsPanel = def
      ? { type: 'lamps', id: p.id, w: def.w, h: def.h, lamps: def.lamps, ...(def.backplate ? { backplate: def.backplate } : {}) }
      : { type: 'lamps', id: p.id, w: 20, h: 20, lamps: [] }
    return resolved
  })
}

/**
 * Country datasets are discovered dynamically from the JSON files on disk:
 * every `src/data/<country>/families/*.json` is a family, and an optional
 * `src/data/<country>/safety.json` holds that country's safety systems. This
 * means the editor can add a family for any country (UK, DE, US) and it appears
 * after a reload — no hand-registration. A country is "live" once it has ≥1
 * family.
 */
const familyModules = import.meta.glob('./*/families/*.json', {
  eager: true,
  import: 'default',
})
const safetyModules = import.meta.glob('./*/safety.json', {
  eager: true,
  import: 'default',
})
const lampPanelModules = import.meta.glob('./*/lamp-panels.json', {
  eager: true,
  import: 'default',
})

/** './uk/families/colour-light.json' -> 'uk' */
function countryOf(path: string): string {
  return path.split('/')[1]
}

function buildDatasets(): Partial<Record<CountryCode, CountryData>> {
  const out: Partial<Record<CountryCode, CountryData>> = {}
  for (const country of COUNTRIES) {
    const sharedEntry = Object.entries(lampPanelModules).find(
      ([p]) => countryOf(p) === country.code,
    )
    const shared = (sharedEntry?.[1] as unknown as SharedLampPanel[]) ?? []

    const families = Object.entries(familyModules)
      .filter(([p]) => countryOf(p) === country.code)
      .map(([, m]) => m as unknown as SignalFamily)
      .map((f) => ({
        ...f,
        variants: f.variants.map((v) => ({ ...v, panels: resolveLampsRefs(v.panels, shared) })),
      }))
      .sort(
        (a, b) => (a.order ?? 1000) - (b.order ?? 1000) || a.name.localeCompare(b.name),
      )
    if (families.length === 0) continue

    const safetyEntry = Object.entries(safetyModules).find(
      ([p]) => countryOf(p) === country.code,
    )
    out[country.code] = {
      country: { ...country, status: 'live' }, // has content -> live
      families,
      safetySystems: (safetyEntry?.[1] as unknown as SafetySystem[]) ?? [],
    }
  }
  return out
}

const DATASETS = buildDatasets()

/** Country codes that actually have data (for the switcher / routing guards). */
export function liveCountryCodes(): string[] {
  return Object.keys(DATASETS)
}

export function getCountryData(code: string): CountryData | undefined {
  return DATASETS[code as CountryCode]
}

export function getFamily(code: string, familyId: string): SignalFamily | undefined {
  return getCountryData(code)?.families.find((f) => f.id === familyId)
}

export function getVariant(
  code: string,
  familyId: string,
  variantId: string,
): SignalVariant | undefined {
  return getFamily(code, familyId)?.variants.find((v) => v.id === variantId)
}

export function getSafetySystem(code: string, id: string): SafetySystem | undefined {
  return getCountryData(code)?.safetySystems.find((s) => s.id === id)
}

export interface AspectEntry {
  family: SignalFamily
  variant: SignalVariant
  aspect: Aspect
}

/** First aspect anywhere in the country matching a shared concept id. */
export function findAspectByConcept(
  code: string,
  concept: string,
): AspectEntry | undefined {
  return getAllAspects(code).find((e) => e.aspect.concept === concept)
}

/** Which variants can display a given concept (for "shown on" lists). */
export function variantsShowingConcept(code: string, concept: string): AspectEntry[] {
  return getAllAspects(code).filter((e) => e.aspect.concept === concept)
}

export interface LibraryPanel {
  code: string
  familyName: string
  variantName: string
  panel: Panel
}

/** Every panel across all live datasets — a library to reuse when building. */
export function getAllLibraryPanels(): LibraryPanel[] {
  const out: LibraryPanel[] = []
  for (const code of Object.keys(DATASETS) as CountryCode[]) {
    const data = DATASETS[code]
    if (!data) continue
    for (const family of data.families) {
      for (const variant of family.variants) {
        for (const panel of variant.panels) {
          out.push({ code, familyName: family.name, variantName: variant.shortName ?? variant.name, panel })
        }
      }
    }
  }
  return out
}

export function getAllAspects(code: string): AspectEntry[] {
  const data = getCountryData(code)
  if (!data) return []
  const out: AspectEntry[] = []
  for (const family of data.families) {
    for (const variant of family.variants) {
      for (const aspect of variant.aspects) {
        out.push({ family, variant, aspect })
      }
    }
  }
  return out
}
