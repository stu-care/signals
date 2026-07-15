import type { Country, CountryCode } from './types'

/**
 * Country registry. UK is live in v1; Germany then USA are planned and shown
 * in the switcher as "Coming soon" (project decision: visible switcher from
 * day one).
 */
export const COUNTRIES: Country[] = [
  {
    code: 'uk',
    name: 'United Kingdom',
    short: 'UK',
    adjective: 'British',
    flag: '🇬🇧',
    status: 'live',
  },
  {
    code: 'de',
    name: 'Germany',
    short: 'DE',
    adjective: 'German',
    flag: '🇩🇪',
    status: 'coming-soon',
  },
  {
    code: 'us',
    name: 'United States',
    short: 'US',
    adjective: 'American',
    flag: '🇺🇸',
    status: 'coming-soon',
  },
]

export const DEFAULT_COUNTRY: CountryCode = 'uk'

export function getCountry(code: string): Country | undefined {
  return COUNTRIES.find((c) => c.code === code)
}
