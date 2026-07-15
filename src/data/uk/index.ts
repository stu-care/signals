import type { CountryData } from '../types'
import { getCountry } from '../countries'
import { colourLightFamily } from './colour-light'
import { semaphoreFamily } from './semaphore'
import { groundSignalFamily } from './ground-signals'
import { bannerRepeaterFamily } from './banner-repeater'
import { speedFamily } from './speed'
import { ukSafetySystems } from './safety'

const uk = getCountry('uk')!

export const ukData: CountryData = {
  country: uk,
  families: [
    colourLightFamily,
    semaphoreFamily,
    groundSignalFamily,
    bannerRepeaterFamily,
    speedFamily,
  ],
  safetySystems: ukSafetySystems,
}
