import type {
  ArmPosition,
  IndicatorSetting,
  LampSetting,
  LampState,
} from '@/data/types'

/**
 * Encode/decode builder state to and from URL query params so any signal
 * configuration is a shareable, bookmarkable link.
 *
 *   ?f=colour-light&v=colour-light-4&l=yellow-upper:s,yellow-main:s&fe=position-1&th=2
 *   ?f=semaphore&v=semaphore-stop&a=home:c
 */

export interface BuilderState {
  familyId: string
  variantId: string
  setting: LampSetting
  arms: Record<string, ArmPosition>
  indicators: IndicatorSetting
}

const stateCode: Record<Exclude<LampState, 'off'>, string> = {
  steady: 's',
  flashing: 'f',
}

const codeState: Record<string, LampState> = {
  s: 'steady',
  f: 'flashing',
}

export function encodeBuilder(state: BuilderState): URLSearchParams {
  const params = new URLSearchParams()
  params.set('f', state.familyId)
  params.set('v', state.variantId)

  const lamps = Object.entries(state.setting)
    .filter(([, s]) => s !== 'off')
    .map(([id, s]) => `${id}:${stateCode[s as 'steady' | 'flashing']}`)
  if (lamps.length) params.set('l', lamps.join(','))

  const arms = Object.entries(state.arms)
    .filter(([, p]) => p === 'clear')
    .map(([id]) => `${id}:c`)
  if (arms.length) params.set('a', arms.join(','))

  if (state.indicators.feather) params.set('fe', state.indicators.feather)
  if (state.indicators.theatre) params.set('th', state.indicators.theatre)

  return params
}

export function decodeBuilder(params: URLSearchParams): Partial<BuilderState> {
  const familyId = params.get('f') ?? undefined
  const variantId = params.get('v') ?? undefined

  const setting: LampSetting = {}
  const l = params.get('l')
  if (l) {
    for (const token of l.split(',')) {
      const idx = token.lastIndexOf(':')
      if (idx === -1) continue
      const id = token.slice(0, idx)
      const code = token.slice(idx + 1)
      const state = codeState[code]
      if (id && state) setting[id] = state
    }
  }

  const arms: Record<string, ArmPosition> = {}
  const a = params.get('a')
  if (a) {
    for (const token of a.split(',')) {
      const idx = token.lastIndexOf(':')
      if (idx === -1) continue
      const id = token.slice(0, idx)
      if (id && token.slice(idx + 1) === 'c') arms[id] = 'clear'
    }
  }

  const indicators: IndicatorSetting = {}
  const fe = params.get('fe')
  if (fe) indicators.feather = fe
  const th = params.get('th')
  if (th) indicators.theatre = th

  return {
    ...(familyId ? { familyId } : {}),
    ...(variantId ? { variantId } : {}),
    setting,
    arms,
    indicators,
  }
}
