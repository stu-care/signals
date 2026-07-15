import { useParams } from 'react-router-dom'
import { getCountry, DEFAULT_COUNTRY } from '@/data/countries'
import type { Country } from '@/data/types'

/** Current country from the route, falling back to the default (UK). */
export function useCurrentCountry(): Country {
  const { country } = useParams()
  return getCountry(country ?? '') ?? getCountry(DEFAULT_COUNTRY)!
}
