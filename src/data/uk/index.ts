import type { CountryData, SafetySystem, SignalFamily } from '../types'
import { getCountry } from '../countries'
import colourLight from './families/colour-light.json'
import semaphore from './families/semaphore.json'
import groundPositionLight from './families/ground-position-light.json'
import bannerRepeater from './families/banner-repeater.json'
import speedIndications from './families/speed-indications.json'
import safety from './safety.json'

/**
 * Signal data lives in JSON (so the editor can round-trip it); these thin
 * imports type it. The family order here is the display order.
 */
const families = [
  colourLight,
  semaphore,
  groundPositionLight,
  bannerRepeater,
  speedIndications,
] as unknown as SignalFamily[]

export const ukData: CountryData = {
  country: getCountry('uk')!,
  families,
  safetySystems: safety as unknown as SafetySystem[],
}
