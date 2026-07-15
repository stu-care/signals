import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useCurrentCountry } from '@/lib/useCurrentCountry'
import { getCountryData, getFamily } from '@/data'
import type {
  ArmPosition,
  LampSetting,
  LampState,
  SignalFamily,
  SignalVariant,
} from '@/data/types'
import { SignalRenderer } from '@/components/signal/SignalRenderer'
import { FlashingBadge } from '@/components/signal/FlashingBadge'
import { decodeBuilder, encodeBuilder, type BuilderState } from '@/lib/url-state'
import { interpret, isExtinguished, type SignalState } from '@/lib/interpret'
import { ComingSoon } from '@/pages/ComingSoon'

const NEXT_STATE: Record<LampState, LampState> = {
  off: 'steady',
  steady: 'flashing',
  flashing: 'off',
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
      (decoded.familyId && getFamily(country.code, decoded.familyId)) ||
      data.families[0]
    const variant =
      family.variants.find((v) => v.id === decoded.variantId) ?? family.variants[0]
    // Keep only lamp states that belong to THIS variant, so a stray id from a
    // hand-edited or cross-variant URL can't leak into interpretation or badges.
    const rawSetting = decoded.setting ?? {}
    const setting: LampSetting = {}
    for (const lamp of variant.geometry.lamps) {
      const s = rawSetting[lamp.id]
      if (s && s !== 'off') setting[lamp.id] = s
    }
    const rawArms = decoded.arms ?? {}
    const arms: Record<string, ArmPosition> = {}
    for (const arm of variant.geometry.arms ?? []) {
      if (rawArms[arm.id] === 'clear') arms[arm.id] = 'clear'
    }
    return {
      familyId: family.id,
      variantId: variant.id,
      setting,
      arms,
      indicators: decoded.indicators ?? {},
    }
  }, [data, params, country.code])

  if (!data || !state) return <ComingSoon country={country} />

  const family = getFamily(country.code, state.familyId)!
  const variant = family.variants.find((v) => v.id === state.variantId)!

  const update = (next: BuilderState) => {
    setParams(encodeBuilder(next), { replace: true })
    setCopied(false)
  }

  const selectFamily = (f: SignalFamily) =>
    update({
      familyId: f.id,
      variantId: f.variants[0].id,
      setting: {},
      arms: {},
      indicators: {},
    })

  const selectVariant = (v: SignalVariant) =>
    update({ ...state, variantId: v.id, setting: {}, arms: {}, indicators: {} })

  const cycleLamp = (id: string) => {
    const current = state.setting[id] ?? 'off'
    update({ ...state, setting: { ...state.setting, [id]: NEXT_STATE[current] } })
  }

  const toggleArm = (id: string) => {
    const current = state.arms[id] ?? 'danger'
    update({
      ...state,
      arms: { ...state.arms, [id]: current === 'clear' ? 'danger' : 'clear' },
    })
  }

  const toggleFeather = (id: string) =>
    update({
      ...state,
      indicators: {
        ...state.indicators,
        feather: state.indicators.feather === id ? undefined : id,
      },
    })

  const setTheatre = (value: string) =>
    update({
      ...state,
      indicators: { ...state.indicators, theatre: value || undefined },
    })

  const clearAll = () => update({ ...state, setting: {}, arms: {}, indicators: {} })

  const signalState: SignalState = { lamps: state.setting, arms: state.arms }
  const result = interpret(variant, signalState)
  const extinguished = isExtinguished(variant, signalState)
  const anyFlashing = variant.geometry.lamps.some(
    (lamp) => (state.setting[lamp.id] ?? 'off') === 'flashing',
  )

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold sm:text-3xl">Identify a signal</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Pick the signal type, then set it to match what you see — tap a lamp to cycle it{' '}
        <span className="whitespace-nowrap">off → steady → flashing</span>, or toggle an
        arm. The interpretation updates as you go.
      </p>

      {/* Type pickers */}
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
              <Chip
                key={v.id}
                active={v.id === variant.id}
                onClick={() => selectVariant(v)}
              >
                {v.shortName ?? v.name}
              </Chip>
            ))}
          </Picker>
        )}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,320px)_1fr]">
        {/* Signal + lamp controls */}
        <div className="rounded-2xl border border-border bg-surface p-6">
          <div className="flex justify-center">
            <SignalRenderer
              geometry={variant.geometry}
              setting={state.setting}
              arms={state.arms}
              indicators={state.indicators}
              width={200}
            />
          </div>

          {/* Arm controls (semaphore / banner repeater) */}
          {variant.geometry.arms && variant.geometry.arms.length > 0 && (
            <div className="mt-6 space-y-2" role="group" aria-label="Arms">
              {variant.geometry.arms.map((arm) => {
                const pos = state.arms[arm.id] ?? 'danger'
                return (
                  <button
                    key={arm.id}
                    type="button"
                    onClick={() => toggleArm(arm.id)}
                    className="flex w-full items-center justify-between rounded-lg border border-border bg-surface-2 px-3 py-2 text-left text-sm transition hover:border-border-strong"
                    aria-pressed={pos === 'clear'}
                  >
                    <span>{arm.label}</span>
                    <span
                      className={[
                        'rounded px-2 py-0.5 text-xs font-semibold',
                        pos === 'clear' ? 'bg-signal-green/20 text-signal-green' : 'bg-signal-red/20 text-signal-red',
                      ].join(' ')}
                    >
                      {pos === 'clear' ? 'Clear (raised)' : 'Danger (horizontal)'}
                    </span>
                  </button>
                )
              })}
            </div>
          )}

          <div className="mt-6 space-y-2" role="group" aria-label="Lamps">
            {variant.geometry.lamps.map((lamp) => {
              const s = state.setting[lamp.id] ?? 'off'
              return (
                <button
                  key={lamp.id}
                  type="button"
                  onClick={() => cycleLamp(lamp.id)}
                  className="flex w-full items-center justify-between rounded-lg border border-border bg-surface-2 px-3 py-2 text-left text-sm transition hover:border-border-strong"
                  aria-pressed={s !== 'off'}
                >
                  <span className="flex items-center gap-2">
                    <span
                      aria-hidden
                      className="inline-block size-3.5 rounded-full"
                      style={{
                        backgroundColor:
                          s === 'off' ? 'transparent' : `var(--sig-${lamp.colour})`,
                        boxShadow: `inset 0 0 0 2px var(--sig-${lamp.colour})`,
                        opacity: s === 'off' ? 0.4 : 1,
                      }}
                    />
                    {lamp.label}
                  </span>
                  <StateBadge state={s} />
                </button>
              )
            })}
          </div>

          {/* Indicator controls */}
          {(variant.geometry.feathers?.length || variant.geometry.theatre) && (
            <div className="mt-4 space-y-3 border-t border-border pt-4">
              {variant.geometry.feathers?.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => toggleFeather(f.id)}
                  className="flex w-full items-center justify-between rounded-lg border border-border bg-surface-2 px-3 py-2 text-left text-sm transition hover:border-border-strong"
                  aria-pressed={state.indicators.feather === f.id}
                >
                  <span>Junction indicator (feather)</span>
                  <StateBadge state={state.indicators.feather === f.id ? 'steady' : 'off'} />
                </button>
              ))}
              {variant.geometry.theatre && (
                <label className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm">
                  <span>Theatre route indicator</span>
                  <input
                    value={state.indicators.theatre ?? ''}
                    onChange={(e) => setTheatre(e.target.value.slice(0, 2).toUpperCase())}
                    placeholder="—"
                    className="w-16 rounded border border-border bg-bg px-2 py-1 text-center font-mono"
                    aria-label="Theatre indicator character"
                  />
                </label>
              )}
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
          <p className="mt-3 text-center">
            <Link
              to={`/${country.code}/calibrate?f=${family.id}&v=${variant.id}`}
              className="text-xs text-faint hover:text-muted"
            >
              Calibrate geometry (drag &amp; export) →
            </Link>
          </p>
        </div>

        {/* Interpretation */}
        <div
          className="rounded-2xl border border-border bg-surface p-6"
          aria-live="polite"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">
            Interpretation
          </p>

          {extinguished ? (
            <div className="mt-3">
              <h2 className="text-xl font-bold">No lamps lit</h2>
              <p className="mt-2 text-muted">
                Tap a lamp to begin. An unlit signal (all lamps out) usually means the
                signal is defective — treat it as danger and be prepared to stop.
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
                <p className="text-xs font-semibold uppercase tracking-widest text-muted">
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
                This combination isn’t a defined {family.name.toLowerCase()} aspect. The
                closest recognised {result.closest.length > 1 ? 'aspects are' : 'aspect is'}:
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
      <span className="text-xs font-semibold uppercase tracking-widest text-muted">
        {label}
      </span>
      {children}
    </div>
  )
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        'rounded-full border px-3 py-1.5 text-sm font-medium transition',
        active
          ? 'border-accent bg-accent text-accent-contrast'
          : 'border-border bg-surface-2 text-muted hover:text-text',
      ].join(' ')}
    >
      {children}
    </button>
  )
}

function StateBadge({ state }: { state: LampState }) {
  const map: Record<LampState, string> = {
    off: 'Off',
    steady: 'Steady',
    flashing: 'Flashing',
  }
  return (
    <span
      className={[
        'rounded px-2 py-0.5 text-xs font-semibold',
        state === 'off' ? 'bg-bg text-muted' : 'bg-accent/15 text-accent',
      ].join(' ')}
    >
      {map[state]}
    </span>
  )
}
