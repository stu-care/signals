import type { ArmPosition, DotState } from '@/data/types'

/**
 * Encode/decode builder state to and from URL query params so any signal
 * configuration is a shareable, bookmarkable link.
 *
 *   ?f=colour-light&v=colour-light-4&l=yellow-upper:o,yellow-main:o
 *   ?f=semaphore&v=semaphore-stop&a=home
 *   ?f=colour-light&v=colour-light-4&on=feather&g=theatre:2
 */

export interface BuilderState {
  familyId: string
  variantId: string
  lamps: Record<string, DotState>
  arms: Record<string, ArmPosition>
  on: string[]
  feathers: Record<string, number[]>
  glyphs: Record<string, string>
}

const dotCode: Record<Exclude<DotState, 'off'>, string> = { on: 'o', flash: 'f' }
const codeDot: Record<string, DotState> = { o: 'on', f: 'flash' }

export function encodeBuilder(state: BuilderState): URLSearchParams {
  const params = new URLSearchParams()
  params.set('f', state.familyId)
  params.set('v', state.variantId)

  const lamps = Object.entries(state.lamps)
    .filter(([, s]) => s !== 'off')
    .map(([id, s]) => `${id}:${dotCode[s as 'on' | 'flash']}`)
  if (lamps.length) params.set('l', lamps.join(','))

  const arms = Object.entries(state.arms)
    .filter(([, p]) => p === 'clear')
    .map(([id]) => id)
  if (arms.length) params.set('a', arms.join(','))

  if (state.on.length) params.set('on', state.on.join(','))

  const feathers = Object.entries(state.feathers)
    .filter(([, ps]) => ps.length)
    .map(([id, ps]) => `${id}:${[...ps].sort((a, b) => a - b).join('.')}`)
  if (feathers.length) params.set('jf', feathers.join(','))

  const glyphs = Object.entries(state.glyphs)
    .filter(([, v]) => v !== '')
    .map(([id, v]) => `${id}:${v}`)
  if (glyphs.length) params.set('g', glyphs.join(','))

  return params
}

export function decodeBuilder(params: URLSearchParams): Partial<BuilderState> {
  const familyId = params.get('f') ?? undefined
  const variantId = params.get('v') ?? undefined

  const lamps: Record<string, DotState> = {}
  const l = params.get('l')
  if (l) {
    for (const token of l.split(',')) {
      const idx = token.lastIndexOf(':')
      if (idx === -1) continue
      const id = token.slice(0, idx)
      const state = codeDot[token.slice(idx + 1)]
      if (id && state) lamps[id] = state
    }
  }

  const arms: Record<string, ArmPosition> = {}
  const a = params.get('a')
  if (a) for (const id of a.split(',')) if (id) arms[id] = 'clear'

  const on = (params.get('on')?.split(',').filter(Boolean)) ?? []

  const feathers: Record<string, number[]> = {}
  const jf = params.get('jf')
  if (jf) {
    for (const token of jf.split(',')) {
      const idx = token.lastIndexOf(':')
      if (idx === -1) continue
      const id = token.slice(0, idx)
      const ps = token
        .slice(idx + 1)
        .split('.')
        .map(Number)
        .filter((n) => Number.isInteger(n) && n >= 1 && n <= 6)
      if (id && ps.length) feathers[id] = ps
    }
  }

  const glyphs: Record<string, string> = {}
  const g = params.get('g')
  if (g) {
    for (const token of g.split(',')) {
      const idx = token.lastIndexOf(':')
      if (idx === -1) continue
      const id = token.slice(0, idx)
      const v = token.slice(idx + 1)
      if (id && v) glyphs[id] = v
    }
  }

  return {
    ...(familyId ? { familyId } : {}),
    ...(variantId ? { variantId } : {}),
    lamps,
    arms,
    on,
    feathers,
    glyphs,
  }
}
