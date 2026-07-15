import { useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useCurrentCountry } from '@/lib/useCurrentCountry'
import { getCountryData, getFamily } from '@/data'
import type { SignalGeometry } from '@/data/types'
import { SignalRenderer } from '@/components/signal/SignalRenderer'
import { ComingSoon } from '@/pages/ComingSoon'

/**
 * In-app calibration tool. Drag any element's handle to reposition it, then copy
 * the updated geometry straight back into the data file. This is the round-trip
 * that makes tuning lamp positions painless — tune visually, paste the numbers.
 */

interface Handle {
  id: string
  label: string
  x: number
  y: number
}

function clone(geo: SignalGeometry): SignalGeometry {
  return structuredClone(geo)
}

function handlesFor(geo: SignalGeometry): Handle[] {
  const hs: Handle[] = []
  geo.backplates.forEach((p, i) =>
    hs.push({ id: `plate:${i}`, label: `plate ${i}`, x: p.x, y: p.y }),
  )
  geo.lamps.forEach((l) => hs.push({ id: `lamp:${l.id}`, label: l.label, x: l.x, y: l.y }))
  ;(geo.arms ?? []).forEach((a) =>
    hs.push({ id: `arm:${a.id}`, label: `${a.label} pivot`, x: a.pivotX, y: a.pivotY }),
  )
  ;(geo.feathers ?? []).forEach((f) =>
    hs.push({ id: `feather:${f.id}`, label: 'feather origin', x: f.originX, y: f.originY }),
  )
  if (geo.theatre) hs.push({ id: 'theatre', label: 'theatre', x: geo.theatre.x, y: geo.theatre.y })
  if (geo.sign) hs.push({ id: 'sign', label: 'sign', x: geo.sign.x, y: geo.sign.y })
  return hs
}

function applyHandle(geo: SignalGeometry, id: string, x: number, y: number): SignalGeometry {
  const g = clone(geo)
  const nx = Math.round(x)
  const ny = Math.round(y)
  const [kind, key] = id.split(':')
  if (kind === 'plate') {
    const p = g.backplates[Number(key)]
    if (p) { p.x = nx; p.y = ny }
  } else if (kind === 'lamp') {
    const l = g.lamps.find((l) => l.id === key)
    if (l) { l.x = nx; l.y = ny }
  } else if (kind === 'arm') {
    const a = g.arms?.find((a) => a.id === key)
    if (a) { a.pivotX = nx; a.pivotY = ny }
  } else if (kind === 'feather') {
    const f = g.feathers?.find((f) => f.id === key)
    if (f) { f.originX = nx; f.originY = ny }
  } else if (kind === 'theatre' && g.theatre) {
    g.theatre.x = nx; g.theatre.y = ny
  } else if (kind === 'sign' && g.sign) {
    g.sign.x = nx; g.sign.y = ny
  }
  return g
}

const WIDTH = 380

export function CalibratePage() {
  const country = useCurrentCountry()
  const data = getCountryData(country.code)
  const [params, setParams] = useSearchParams()
  const svgRef = useRef<SVGSVGElement>(null)
  const [dragging, setDragging] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const familyId = params.get('f') ?? data?.families[0]?.id
  const family = familyId ? getFamily(country.code, familyId) : undefined
  const variantId = params.get('v') ?? family?.variants[0]?.id
  const variant = family?.variants.find((v) => v.id === variantId) ?? family?.variants[0]

  const workingKey = `${familyId}/${variant?.id}`
  const [geo, setGeo] = useState<SignalGeometry | null>(() =>
    variant ? clone(variant.geometry) : null,
  )
  // Reset the working copy when the selected variant changes (React's
  // adjust-state-during-render pattern — no effect needed).
  const [lastKey, setLastKey] = useState(workingKey)
  if (variant && workingKey !== lastKey) {
    setLastKey(workingKey)
    setGeo(clone(variant.geometry))
  }

  const current = geo ?? variant?.geometry ?? null
  const handles = useMemo(() => (current ? handlesFor(current) : []), [current])
  const height = current ? (WIDTH * current.viewBox.h) / current.viewBox.w : 0

  if (!data) return <ComingSoon country={country} />
  if (!family || !variant || !current) return <p className="text-muted">No signal selected.</p>

  const select = (f: string, v: string) => setParams({ f, v }, { replace: true })

  const toSvg = (clientX: number, clientY: number) => {
    const svg = svgRef.current
    if (!svg) return null
    const pt = svg.createSVGPoint()
    pt.x = clientX
    pt.y = clientY
    const ctm = svg.getScreenCTM()
    if (!ctm) return null
    return pt.matrixTransform(ctm.inverse())
  }

  const onMove = (e: React.PointerEvent) => {
    if (!dragging) return
    const p = toSvg(e.clientX, e.clientY)
    if (p) setGeo(applyHandle(current, dragging, p.x, p.y))
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(current, null, 2))
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold sm:text-3xl">Calibrate geometry</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Drag any handle to reposition it, then copy the geometry back into the data file.
        Positions snap to whole numbers.
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {data.families.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => select(f.id, f.variants[0].id)}
            aria-pressed={f.id === family.id}
            className={[
              'rounded-full border px-3 py-1.5 text-sm',
              f.id === family.id ? 'border-accent bg-accent text-accent-contrast' : 'border-border bg-surface-2 text-muted',
            ].join(' ')}
          >
            {f.name}
          </button>
        ))}
      </div>
      {family.variants.length > 1 && (
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {family.variants.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => select(family.id, v.id)}
              aria-pressed={v.id === variant.id}
              className={[
                'rounded-full border px-3 py-1 text-xs',
                v.id === variant.id ? 'border-accent bg-accent text-accent-contrast' : 'border-border bg-surface-2 text-muted',
              ].join(' ')}
            >
              {v.shortName ?? v.name}
            </button>
          ))}
        </div>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface p-4">
          <div
            className="relative mx-auto"
            style={{ width: WIDTH, height }}
            onPointerMove={onMove}
            onPointerUp={() => setDragging(null)}
            onPointerLeave={() => setDragging(null)}
          >
            <div className="pointer-events-none absolute inset-0">
              <SignalRenderer geometry={current} width={WIDTH} />
            </div>
            <svg
              ref={svgRef}
              className="absolute inset-0"
              width={WIDTH}
              height={height}
              viewBox={`0 0 ${current.viewBox.w} ${current.viewBox.h}`}
            >
              {handles.map((h) => (
                <g key={h.id}>
                  <circle
                    cx={h.x}
                    cy={h.y}
                    r={9}
                    fill={dragging === h.id ? 'var(--accent)' : 'rgba(74,163,255,0.35)'}
                    stroke="var(--accent)"
                    strokeWidth={1.5}
                    style={{ cursor: 'grab' }}
                    onPointerDown={(e) => {
                      ;(e.target as Element).setPointerCapture(e.pointerId)
                      setDragging(h.id)
                      setCopied(false)
                    }}
                  >
                    <title>{h.label}</title>
                  </circle>
                </g>
              ))}
            </svg>
          </div>
          <p className="mt-2 text-center text-xs text-faint">
            Handles: lamps, plates, arms, feather origin, theatre & signs.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">
              geometry
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setGeo(clone(variant.geometry))}
                className="rounded-lg border border-border px-3 py-1.5 text-xs transition hover:bg-surface-2"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={copy}
                className="rounded-lg border border-border px-3 py-1.5 text-xs transition hover:bg-surface-2"
              >
                {copied ? 'Copied ✓' : 'Copy geometry'}
              </button>
            </div>
          </div>
          <pre className="mt-3 max-h-[60vh] overflow-auto rounded-lg bg-bg p-3 text-xs leading-relaxed text-muted">
            {JSON.stringify(current, null, 2)}
          </pre>
        </div>
      </div>

      <p className="mt-6 text-sm text-muted">
        <Link
          to={`/${country.code}/build?f=${family.id}&v=${variant.id}`}
          className="text-accent hover:underline"
        >
          ← Back to the builder
        </Link>
      </p>
    </div>
  )
}
