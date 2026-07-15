import type {
  Aspect,
  CountryCode,
  CountryData,
  SafetySystem,
  SignalFamily,
  SignalVariant,
} from './types'
import { ukData } from './uk'

/**
 * Country dataset registry. Only live countries have data; the switcher shows
 * Germany/USA as "Coming soon" until their datasets land here.
 */
const DATASETS: Partial<Record<CountryCode, CountryData>> = {
  uk: ukData,
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

/** Flat list of every aspect across a country, with its family/variant context. */
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
