import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useCurrentCountry } from '@/lib/useCurrentCountry'
import { getCountryData, getFamily } from '@/data'
import type { DotState, LampColour, SignalFamily, SignalVariant } from '@/data/types'
import { SignalRenderer } from '@/components/signal/SignalRenderer'
import { FlashingBadge } from '@/components/signal/FlashingBadge'
import { decodeBuilder, encodeBuilder, type BuilderState } from '@/lib/url-state'
import {
  armPanels,
  auxPanels,
  glyphPanels,
  interpret,
  isExtinguished,
  lampSlots,
  type SignalState,
} from '@/lib/interpret'
import { ComingSoon } from '@/pages/ComingSoon'

const NEXT: Record<DotState, DotState> = { off: 'on', on: 'flash', flash: 'off' }

const DOT_FILL: Record<LampColour, string> = {
  red: '#e5372b',
  amber: '#ef8b1b',
  yellow: '#f1c015',
  green: '#1fa85a',
  white: '#c9d3ea',
  lunar: '#b9c6e8',
  blue: '#2f6fed',
}

export function BuilderPage() {
  const country = useCurrentCountry()
  const data = getCountryData(country.code)
  const [params, setParams] = useSearchParams()
  const [copied, setCopied] = useState(false)

  const state: BuilderState | null = useMemo(() => {
    if (!data) return null
    const decoded = decodeBuilder(params)
    const family =
      (decoded.familyId && getFamily(country.code, decoded.familyId)) || data.families[0]
    const variant = family.variants.find((v) => v.id === decoded.variantId) ?? family.variants[0]

    // Keep only elements that belong to THIS variant (guard stray URL keys).
    const lampIds = new Set(lampSlots(variant).map((l) => l.id))
    const armIds = new Set(armPanels(variant).map((a) => a.id))
    const auxIds = new Set(auxPanels(variant).map((p) => p.id))
    const glyphIds = new Set(glyphPanels(variant).map((p) => p.id))

    const lamps: Record<string, DotState> = {}
    for (const [id, s] of Object.entries(decoded.lamps ?? {})) if (lampIds.has(id) && s !== 'off') lamps[id] = s
    const arms: Record<string, 'danger' | 'clear'> = {}
    for (const [id, p] of Object.entries(decoded.arms ?? {})) if (armIds.has(id) && p === 'clear') arms[id] = 'clear'
    const on = (decoded.on ?? []).filter((id) => auxIds.has(id))
    const glyphs: Record<string, string> = {}
    for (const [id, v] of Object.entries(decoded.glyphs ?? {})) if (glyphIds.has(id) && v) glyphs[id] = v

    return { familyId: family.id, variantId: variant.id, lamps, arms, on, glyphs }
  }, [data, params, country.code])

  if (!data || !state) return <ComingSoon country={country} />

  const family = getFamily(country.code, state.familyId)!
  const variant = family.variants.find((v) => v.id === state.variantId)!

  const update = (next: BuilderState) => {
    setParams(encodeBuilder(next), { replace: true })
    setCopied(false)
  }

  const selectFamily = (f: SignalFamily) =>
    update({ familyId: f.id, variantId: f.variants[0].id, lamps: {}, arms: {}, on: [], glyphs: {} })
  const selectVariant = (v: SignalVariant) =>
    update({ ...state, variantId: v.id, lamps: {}, arms: {}, on: [], glyphs: {} })

  const cycleLamp = (id: string) =>
    update({ ...state, lamps: { ...state.lamps, [id]: NEXT[state.lamps[id] ?? 'off'] } })
  const toggleArm = (id: string) =>
    update({ ...state, arms: { ...state.arms, [id]: (state.arms[id] ?? 'danger') === 'clear' ? 'danger' : 'clear' } })
  const toggleAux = (id: string) =>
    update({ ...state, on: state.on.includes(id) ? state.on.filter((x) => x !== id) : [...state.on, id] })
  const setGlyph = (id: string, v: string) =>
    update({ ...state, glyphs: { ...state.glyphs, [id]: v } })
  const clearAll = () => update({ ...state, lamps: {}, arms: {}, on: [], glyphs: {} })

  const signalState: SignalState = { lamps: state.lamps, arms: state.arms, on: state.on, glyphs: state.glyphs }
  const result = interpret(variant, signalState)
  const extinguished = isExtinguished(variant, signalState)
  const anyFlashing = Object.values(state.lamps).includes('flash')

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  const slots = lampSlots(variant)
  const arms = armPanels(variant)
  const aux = auxPanels(variant)
  const glyphs = glyphPanels(variant)
  const armLabel = (kind: string, pos: 'danger' | 'clear') => {
    if (kind === 'banner') return pos === 'clear' ? 'Inclined (off)' : 'Horizontal (on)'
    return pos === 'clear' ? 'Clear (raised)' : 'Danger (horizontal)'
  }

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Identify a signal</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Pick the signal type, then set it to match what you see — tap a dot to cycle it{' '}
        <span className="whitespace-nowrap">off → on → flashing</span>, or toggle an arm. The
        interpretation updates as you go.
      </p>

      <div className="mt-6 space-y-3">
        <Picker label="Signal type">
          {data.families.map((f) => (
            <Chip key={f.id} active={f.id === family.id} onClick={() => selectFamily(f)}>
              {f.name}
            </Chip>
          ))}
        </Picker>
        {family.variants.length > 1 && (
          <Picker label="Variant">
            {family.variants.map((v) => (
              <Chip key={v.id} active={v.id === variant.id} onClick={() => selectVariant(v)}>
                {v.shortName ?? v.name}
              </Chip>
            ))}
          </Picker>
        )}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,340px)_1fr]">
        <div className="rounded-2xl border border-border bg-surface p-6">
          <div className="flex min-h-[220px] items-center justify-center py-4">
            <SignalRenderer panels={variant.panels} state={signalState} scale={1.9} showInactive />
          </div>

          <div className="mt-4 space-y-2">
            {slots.map((lamp) => {
              const s = state.lamps[lamp.id] ?? 'off'
              return (
                <button
                  key={lamp.id}
                  type="button"
                  onClick={() => cycleLamp(lamp.id)}
                  className="flex w-full items-center justify-between rounded-lg border border-border bg-white px-3 py-2 text-left text-sm transition hover:border-accent"
                  aria-pressed={s !== 'off'}
                >
                  <span className="flex items-center gap-2">
                    <span
                      aria-hidden
                      className="inline-block size-3.5 rounded-full"
                      style={{
                        backgroundColor: s === 'off' ? 'transparent' : DOT_FILL[lamp.color],
                        boxShadow: `inset 0 0 0 2px ${DOT_FILL[lamp.color]}`,
                        opacity: s === 'off' ? 0.5 : 1,
                      }}
                    />
                    {lamp.label}
                  </span>
                  <StateBadge state={s} />
                </button>
              )
            })}

            {arms.map((arm) => {
              const pos = state.arms[arm.id] ?? 'danger'
              return (
                <button
                  key={arm.id}
                  type="button"
                  onClick={() => toggleArm(arm.id)}
                  className="flex w-full items-center justify-between rounded-lg border border-border bg-white px-3 py-2 text-left text-sm transition hover:border-accent"
                  aria-pressed={pos === 'clear'}
                >
                  <span>{arm.label}</span>
                  <span
                    className={[
                      'rounded px-2 py-0.5 text-xs font-semibold',
                      pos === 'clear' ? 'bg-sig-green/15 text-sig-green' : 'bg-sig-red/15 text-sig-red',
                    ].join(' ')}
                  >
                    {armLabel(arm.kind, pos)}
                  </span>
                </button>
              )
            })}
          </div>

          {(aux.length > 0 || glyphs.length > 0) && (
            <div className="mt-4 space-y-3 border-t border-border pt-4">
              {aux.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => toggleAux(p.id)}
                  className="flex w-full items-center justify-between rounded-lg border border-border bg-white px-3 py-2 text-left text-sm transition hover:border-accent"
                  aria-pressed={state.on.includes(p.id)}
                >
                  <span>{'label' in p ? p.label : p.id}</span>
                  <StateBadge state={state.on.includes(p.id) ? 'on' : 'off'} />
                </button>
              ))}
              {glyphs.map((p) => (
                <label
                  key={p.id}
                  className="flex items-center justify-between gap-3 rounded-lg border border-border bg-white px-3 py-2 text-sm"
                >
                  <span>{p.label}</span>
                  <input
                    value={state.glyphs[p.id] ?? ''}
                    onChange={(e) => setGlyph(p.id, e.target.value.slice(0, 3).toUpperCase())}
                    placeholder="—"
                    className="w-16 rounded border border-border bg-surface px-2 py-1 text-center font-mono"
                    aria-label={p.label}
                  />
                </label>
              ))}
            </div>
          )}

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={clearAll}
              className="flex-1 rounded-lg border border-border px-3 py-2 text-sm transition hover:bg-surface-2"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={share}
              className="flex-1 rounded-lg border border-border px-3 py-2 text-sm transition hover:bg-surface-2"
            >
              {copied ? 'Link copied ✓' : 'Share this'}
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6" aria-live="polite">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
            Interpretation
          </p>

          {extinguished ? (
            <div className="mt-3">
              <h2 className="text-xl font-bold">Nothing lit</h2>
              <p className="mt-2 text-muted">
                Tap a dot to begin. A signal with all lamps out usually means it is defective —
                treat it as danger and be prepared to stop.
              </p>
            </div>
          ) : result.kind === 'recognised' ? (
            <div className="mt-3">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">{result.aspect.name}</h2>
                {anyFlashing && <FlashingBadge />}
              </div>
              <p className="mt-1 text-lg text-accent">{result.aspect.meaning}</p>
              <p className="mt-4">{result.aspect.whatItMeans}</p>
              <div className="mt-4 rounded-xl border border-border bg-surface-2 p-4">
                <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted">
                  What you do
                </p>
                <p className="mt-1">{result.aspect.whatYouDo}</p>
              </div>
              <Link
                to={`/${country.code}/aspect/${family.id}/${variant.id}/${result.aspect.id}`}
                className="mt-4 inline-block font-semibold text-accent hover:underline"
              >
                Explain this in full →
              </Link>
            </div>
          ) : (
            <div className="mt-3">
              <h2 className="text-xl font-bold">Not a recognised aspect</h2>
              <p className="mt-2 text-muted">
                This combination isn’t a defined {family.name.toLowerCase()} aspect. The closest{' '}
                {result.closest.length > 1 ? 'aspects are' : 'aspect is'}:
              </p>
              <ul className="mt-3 space-y-2">
                {result.closest.map(({ aspect }) => (
                  <li key={aspect.id}>
                    <Link
                      to={`/${country.code}/aspect/${family.id}/${variant.id}/${aspect.id}`}
                      className="font-semibold text-accent hover:underline"
                    >
                      {aspect.name}
                    </Link>{' '}
                    <span className="text-muted">— {aspect.meaning}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Picker({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="font-mono text-xs font-semibold uppercase tracking-widest text-muted">
        {label}
      </span>
      {children}
    </div>
  )
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        'rounded-full border px-3 py-1.5 text-sm font-medium transition',
        active ? 'border-accent bg-accent text-white' : 'border-border bg-white text-muted hover:border-accent',
      ].join(' ')}
    >
      {children}
    </button>
  )
}

function StateBadge({ state }: { state: DotState }) {
  const map: Record<DotState, string> = { off: 'Off', on: 'On', flash: 'Flashing' }
  return (
    <span
      className={[
        'rounded px-2 py-0.5 text-xs font-semibold',
        state === 'off' ? 'bg-surface-2 text-muted' : 'bg-accent/12 text-accent',
      ].join(' ')}
    >
      {map[state]}
    </span>
  )
}
