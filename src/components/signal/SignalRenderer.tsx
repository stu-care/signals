import type {
  ArmPanel,
  ArmPosition,
  DotState,
  FeatherPanel,
  GlyphPanel,
  JunctionPanel,
  LampColour,
  LampsPanel,
  Panel,
  PosLightPanel,
  SignPanel,
} from '@/data/types'
import { roundedPolyPath } from '@/lib/shape'

/** Signal-state input: which dots are lit, arm positions, lit aux panels, glyph text. */
export interface SignalStateInput {
  lamps?: Record<string, DotState>
  arms?: Record<string, ArmPosition>
  on?: string[]
  feathers?: Record<string, number[]>
  glyphs?: Record<string, string>
}

interface SignalRendererProps {
  panels: Panel[]
  state?: SignalStateInput
  /** Multiplies every px size — the whole signal scales as one. */
  scale?: number
  /**
   * Show aux panels (feather / poslight / empty glyph) even when inactive —
   * used by the builder so they can be toggled. Off elsewhere so the catalogue
   * and detail pages only draw what is actually lit.
   */
  showInactive?: boolean
  ariaLabel?: string
  className?: string
}

/** Is a panel visible for the given state? (lamps/arms always; aux only if lit.) */
function panelVisible(panel: Panel, state?: SignalStateInput, showInactive?: boolean): boolean {
  if (showInactive) return true
  if (panel.type === 'lamps' || panel.type === 'arm' || panel.type === 'sign') return true
  if (panel.type === 'glyph') return (panel.text ?? state?.glyphs?.[panel.id] ?? '') !== ''
  if (panel.type === 'junction') return (state?.feathers?.[panel.id]?.length ?? 0) > 0
  return state?.on?.includes(panel.id) ?? false
}

/** Dot fill + darker-shade ring, per the Signal Dots guide. */
const LAMP: Record<LampColour, { on: string; ring: string }> = {
  red: { on: '#e5372b', ring: '#a4160c' },
  amber: { on: '#ef8b1b', ring: '#a5590a' },
  yellow: { on: '#f1c015', ring: '#9c7d07' },
  green: { on: '#1fa85a', ring: '#0c6234' },
  white: { on: '#ffffff', ring: '#8a93ad' },
  lunar: { on: '#e9f0ff', ring: '#8290bb' },
  blue: { on: '#2f6fed', ring: '#14479f' },
}

const MONO = "'IBM Plex Mono', monospace"

/* ---- the atom ---------------------------------------------------- */

function Dot({ color, state, r }: { color: LampColour; state: DotState; r: number }) {
  const c = LAMP[color]
  const lit = state === 'on' || state === 'flash'
  const light = color === 'white' || color === 'lunar'
  const ringW = Math.max(1.3, r * 0.16)

  let background = 'transparent'
  let border = `${ringW}px solid #c2c6ce`
  let boxShadow = 'none'
  if (lit) {
    border = `${ringW}px solid ${c.ring}`
    background = light ? (color === 'white' ? '#eef1fb' : '#e2eaff') : c.on
    boxShadow = 'inset 0 1.4px 0 rgba(255,255,255,.55)'
  }
  return (
    <div
      className={state === 'flash' ? 'signal-dot-flash' : undefined}
      style={{ width: r * 2, height: r * 2, borderRadius: '50%', background, border, boxShadow }}
    />
  )
}

function SoftRule({ scale }: { scale: number }) {
  const mid = 'rgba(20,24,34,.22)'
  return (
    <div
      style={{
        width: '68%',
        minWidth: 38 * scale,
        height: 1,
        margin: `${10 * scale}px auto`,
        background: `linear-gradient(90deg,transparent,${mid} 22%,${mid} 78%,transparent)`,
      }}
    />
  )
}

function Glyph({
  text,
  tone,
  size,
}: {
  text: string
  tone?: 'yellow'
  size: number
}) {
  const yellow = tone === 'yellow'
  const len = text.length || 1
  const w = len > 1 ? size * (0.42 + 0.4 * len) : size
  return (
    <div
      style={{
        minWidth: size,
        width: w,
        height: size,
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `1.6px solid ${yellow ? '#c99a12' : '#20242a'}`,
        color: yellow ? '#a8790a' : '#1c1f24',
        fontFamily: MONO,
        fontWeight: 600,
        fontSize: size * 0.56,
        lineHeight: 1,
      }}
    >
      {text}
    </div>
  )
}

/* ---- panels ------------------------------------------------------ */

function LampsPanelView({
  panel,
  state,
  scale,
}: {
  panel: LampsPanel
  state?: SignalStateInput
  scale: number
}) {
  // Draw off dots first, then lit (on/flash) dots, so where two lamps share a
  // position (e.g. a GPL red and white in the same place) the LIT one is always
  // on top. sort() is stable, so relative order within each group is preserved.
  const ordered = panel.lamps
    .map((l) => ({ l, st: state?.lamps?.[l.id] ?? 'off' }))
    .sort((a, b) => (a.st === 'off' ? 0 : 1) - (b.st === 'off' ? 0 : 1))

  const bp = panel.backplate
  return (
    <div style={{ position: 'relative', width: panel.w * scale, height: panel.h * scale }}>
      {bp && bp.points.length >= 2 && (
        <svg
          width={panel.w * scale}
          height={panel.h * scale}
          viewBox={`0 0 ${panel.w} ${panel.h}`}
          style={{ position: 'absolute', inset: 0, overflow: 'visible', pointerEvents: 'none' }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={roundedPolyPath(bp.points)}
            fill="none"
            stroke="rgba(20,24,34,.3)"
            strokeWidth={1.3}
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}
      {ordered.map(({ l, st }) => (
        <div
          key={l.id}
          style={{ position: 'absolute', left: (l.x - l.r) * scale, top: (l.y - l.r) * scale }}
        >
          <Dot color={l.color} state={st} r={l.r * scale} />
        </div>
      ))}
    </div>
  )
}

function PosLightView({
  panel,
  state,
  scale,
}: {
  panel: PosLightPanel
  state?: SignalStateInput
  scale: number
}) {
  const on = state?.on?.includes(panel.id) ?? false
  const R = (panel.r ?? 7) * scale
  const box = R * 2 * 2.15
  const ul = panel.dir === 'ul'
  const lower = ul ? { right: 0, bottom: 0 } : { left: 0, bottom: 0 }
  const upper = ul ? { left: 0, top: 0 } : { right: 0, top: 0 }
  const s: DotState = on ? 'on' : 'off'
  return (
    <div style={{ position: 'relative', width: box, height: box }}>
      <div style={{ position: 'absolute', ...lower }}>
        <Dot color="white" state={s} r={R} />
      </div>
      <div style={{ position: 'absolute', ...upper }}>
        <Dot color="white" state={s} r={R} />
      </div>
    </div>
  )
}

function FeatherView({
  panel,
  state,
  scale,
}: {
  panel: FeatherPanel
  state?: SignalStateInput
  scale: number
}) {
  const on = state?.on?.includes(panel.id) ?? false
  const R = (panel.r ?? 5) * scale
  const left = (panel.dir ?? 'ur').indexOf('l') >= 0
  const n = 5
  const step = R * 2 + 3 * scale
  const W = step * (n - 1)
  const Hh = step * (n - 1) * 0.72
  const s: DotState = on ? 'on' : 'off'
  return (
    <div style={{ position: 'relative', width: W + R * 2, height: Hh + R * 2 }}>
      {Array.from({ length: n }).map((_, i) => {
        const dx = left ? W - i * step : i * step
        const dy = Hh - i * step * 0.72
        return (
          <div key={i} style={{ position: 'absolute', left: dx, top: dy }}>
            <Dot color="white" state={s} r={R} />
          </div>
        )
      })}
    </div>
  )
}

function GlyphView({
  panel,
  state,
  scale,
}: {
  panel: GlyphPanel
  state?: SignalStateInput
  scale: number
}) {
  const text = panel.text ?? state?.glyphs?.[panel.id] ?? ''
  return <Glyph text={text} tone={panel.tone} size={(panel.size ?? 26) * scale} />
}

/** Night-lamp colour for a mechanical arm. */
function armLight(kind: ArmPanel['kind'], pos: ArmPosition): LampColour {
  if (pos === 'clear') return 'green'
  return kind === 'stop' ? 'red' : 'yellow'
}

function BannerView({
  panel,
  state,
  scale,
}: {
  panel: ArmPanel
  state?: SignalStateInput
  scale: number
}) {
  const pos = state?.arms?.[panel.id] ?? 'danger'
  const R = 28
  const c = R + 5
  // "off" (clear) inclines the bar up to the left (+45° in screen coords).
  const rot = pos === 'clear' ? 45 : 0
  // Green variant: the disc turns green, but only in the "off" (inclined)
  // indication. The bar itself stays black.
  const greenBg = panel.tone === 'green' && pos === 'clear'
  const disc = greenBg ? '#1fa85a' : '#ffffff'
  const discStroke = greenBg ? '#0c6234' : '#c2c6ce'
  return (
    <svg
      width={(R + 5) * 2 * scale}
      height={(R + 5) * 2 * scale}
      viewBox={`0 0 ${(R + 5) * 2} ${(R + 5) * 2}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx={c} cy={c} r={R} fill={disc} stroke={discStroke} strokeWidth={2} />
      <g transform={`translate(${c} ${c}) rotate(${rot})`}>
        <rect x={-R * 0.82} y={-4} width={R * 1.64} height={8} rx={2} fill="#1c1f24" />
      </g>
    </svg>
  )
}

/**
 * Angle (deg above horizontal, so negative points down) and side for each
 * standard UK junction-indicator position. Per side the three arms are inclined
 * 45° up, horizontal, then 45° down: positions 1–3 diverge left, 4–6 right.
 */
function junctionRay(position: number): { angle: number; side: -1 | 1 } {
  const table: Record<number, { angle: number; side: -1 | 1 }> = {
    1: { angle: 45, side: -1 },
    2: { angle: 0, side: -1 },
    3: { angle: -45, side: -1 },
    4: { angle: 45, side: 1 },
    5: { angle: 0, side: 1 },
    6: { angle: -45, side: 1 },
  }
  return table[position] ?? { angle: 45, side: -1 }
}

/**
 * Multi-position junction indicator. Draws the declared positions as a faint
 * fan and lights the active ones — so "first left" (position 1) and "second
 * left" (position 2) can be compared at a glance.
 */
function JunctionView({
  panel,
  state,
  scale,
  showInactive,
}: {
  panel: JunctionPanel
  state?: SignalStateInput
  scale: number
  showInactive?: boolean
}) {
  const R = (panel.r ?? 5) * scale
  const lit = new Set(state?.feathers?.[panel.id] ?? [])
  const n = 5
  const step = R * 2 + 3 * scale
  const start = step * 0.7
  const reach = start + step * (n - 1) + R // centre of last dot + radius

  // Bounding box across all declared positions, measured from the origin.
  // Feathers can point up (positive angle), horizontal, or down (negative), so
  // track vertical extent both ways and centre the origin between them.
  let maxUp = 0
  let maxDown = 0
  let maxLeft = 0
  let maxRight = 0
  for (const p of panel.positions) {
    const { angle, side } = junctionRay(p)
    const rad = (angle * Math.PI) / 180
    const v = Math.sin(rad) * reach // + up
    const h = Math.abs(Math.cos(rad)) * reach
    if (v >= 0) maxUp = Math.max(maxUp, v)
    if (v <= 0) maxDown = Math.max(maxDown, -v)
    if (side < 0) maxLeft = Math.max(maxLeft, h)
    else maxRight = Math.max(maxRight, h)
  }
  const W = maxLeft + maxRight + R * 2
  const H = maxUp + maxDown + R * 2
  // Origin: at the left/right split, with the up feathers above and down below.
  const ox = maxLeft + R
  const oy = maxUp + R

  return (
    <div style={{ position: 'relative', width: W, height: H }}>
      {panel.positions.map((p) => {
        const on = lit.has(p)
        if (!on && !showInactive) return null
        const { angle, side } = junctionRay(p)
        const rad = (angle * Math.PI) / 180
        const dx = side * Math.cos(rad) * step
        const dy = -Math.sin(rad) * step
        const sx = ox + side * Math.cos(rad) * start
        const sy = oy - Math.sin(rad) * start
        return (
          <div key={p} style={{ opacity: on ? 1 : 0.16 }}>
            {Array.from({ length: n }).map((_, i) => (
              <div
                key={i}
                style={{ position: 'absolute', left: sx + dx * i - R, top: sy + dy * i - R }}
              >
                <Dot color="white" state={on ? 'on' : 'off'} r={R} />
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}

function ArmView({
  panel,
  state,
  scale,
}: {
  panel: ArmPanel
  state?: SignalStateInput
  scale: number
}) {
  if (panel.kind === 'banner') return <BannerView panel={panel} state={state} scale={scale} />
  const pos = state?.arms?.[panel.id] ?? 'danger'
  // 180deg = horizontal (danger/caution); 225deg raises the tip 45deg (clear).
  const rot = pos === 'clear' ? 225 : 180
  const light = LAMP[armLight(panel.kind, pos)]
  const px = 76
  const py = 40
  const L = 54
  const T = 12
  const half = T / 2

  return (
    <svg
      width={100 * scale}
      height={92 * scale}
      viewBox="0 0 100 92"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform={`translate(${px} ${py}) rotate(${rot})`}>
        {panel.kind === 'stop' ? (
          <>
            <rect x={0} y={-half} width={L} height={T} rx={3} fill="#e5372b" stroke="#a4160c" strokeWidth={1.5} />
            <rect x={L - 15} y={-half} width={4} height={T} fill="#ffffff" />
          </>
        ) : (
          <>
            <polygon
              points={`0,${-half} ${L},${-half} ${L - 9},0 ${L},${half} 0,${half}`}
              fill="#f1c015"
              stroke="#9c7d07"
              strokeWidth={1.5}
            />
            <polyline
              points={`${L - 24},${-half + 3} ${L - 13},0 ${L - 24},${half - 3}`}
              fill="none"
              stroke="#1c1f24"
              strokeWidth={2.5}
            />
          </>
        )}
      </g>
      {/* pivot boss */}
      <circle cx={px} cy={py} r={3} fill="#1c1f24" />
      {/* night lamp directly beneath the pivot */}
      <circle cx={px} cy={py + 26} r={7} fill={light.on} stroke={light.ring} strokeWidth={1.6} />
    </svg>
  )
}

const SIGN_INK = '#1c1f24'
const SIGN_RED = '#d81e2c'
const SIGN_YELLOW = '#f1c015'
const SIGN_TSR = '#CDFC01'
const SIGN_TSR_RING = '#8a9e05'

/** A left/right triangular arrow (for the diverging-route panels). */
function arrowSvg(dir: 'left' | 'right', color: string, h: number) {
  const w = h * 0.92
  const pts = dir === 'left' ? `${w},0 0,${h / 2} ${w},${h}` : `0,0 ${w},${h / 2} 0,${h}`
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} xmlns="http://www.w3.org/2000/svg">
      <polygon points={pts} fill={color} />
    </svg>
  )
}

function SignView({ panel, scale }: { panel: SignPanel; scale: number }) {
  const s = (panel.size ?? 30) * scale
  const bw = Math.max(1.5, 2 * scale)
  const num = (color: string, fs: number) =>
    ({ fontFamily: MONO, fontWeight: 700, fontSize: fs, color, lineHeight: 1 }) as const
  const plate = (w: number, h: number, bg: string, bc: string) =>
    ({
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      width: w,
      height: h,
      background: bg,
      border: `${bw}px solid ${bc}`,
      borderRadius: 2 * scale,
      boxSizing: 'border-box' as const,
    })
  /** A red-ring roundel (permissible-speed style). */
  const roundel = (children: React.ReactNode) => {
    const dia = s * 1.66
    const ring = Math.max(3, s * 0.2)
    return (
      <div
        style={{
          width: dia,
          height: dia,
          borderRadius: '50%',
          background: '#ffffff',
          border: `${ring}px solid ${SIGN_RED}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box',
        }}
      >
        {children}
      </div>
    )
  }

  // Permissible speed — red ring, black figure.
  if (panel.kind === 'psr') {
    return roundel(<span style={num(SIGN_INK, s * 0.66)}>{panel.primary}</span>)
  }
  // Differential permissible — red ring, two figures split by a line.
  if (panel.kind === 'psr-diff') {
    return roundel(
      <>
        <span style={num(SIGN_INK, s * 0.46)}>{panel.primary}</span>
        <div style={{ width: '54%', height: bw, background: SIGN_INK, margin: `${s * 0.09}px 0` }} />
        <span style={num(SIGN_INK, s * 0.46)}>{panel.secondary}</span>
      </>,
    )
  }
  // Diverging-route arrow panels — a shallow white plate with a coloured border
  // (red for the permissible route, yellow for its warning) and a black arrow.
  // No figure: these sit above the matching speed indicator.
  if (panel.kind === 'psr-diverge' || panel.kind === 'psr-warn-diverge') {
    const border = panel.kind === 'psr-diverge' ? SIGN_RED : SIGN_YELLOW
    return (
      <div style={plate(s * 1.8, s * 0.78, '#ffffff', border)}>
        {arrowSvg(panel.arrow ?? 'left', SIGN_INK, s * 0.46)}
      </div>
    )
  }
  // Warning indicator — downward triangle, yellow border, white ground, black figure.
  if (panel.kind === 'psr-warn') {
    const tw = s * 1.95
    const th = s * 1.66
    const sw = Math.max(3, s * 0.13)
    return (
      <div style={{ position: 'relative', width: tw, height: th }}>
        <svg width={tw} height={th} viewBox={`0 0 ${tw} ${th}`} xmlns="http://www.w3.org/2000/svg">
          <polygon
            points={`${sw},${sw} ${tw - sw},${sw} ${tw / 2},${th - sw}`}
            fill="#ffffff"
            stroke={SIGN_YELLOW}
            strokeWidth={sw}
            strokeLinejoin="round"
          />
        </svg>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: th * 0.2,
          }}
        >
          <span style={num(SIGN_INK, s * 0.5)}>{panel.primary}</span>
        </div>
      </div>
    )
  }
  // TSR warning — yellow-green board, two white dots side by side.
  if (panel.kind === 'tsr-warn') {
    const d = s * 0.28
    const dot = {
      width: d,
      height: d,
      borderRadius: '50%',
      background: '#ffffff',
      boxShadow: `inset 0 0 0 ${Math.max(1, bw * 0.7)}px rgba(0,0,0,.2)`,
    } as const
    return (
      <div style={{ ...plate(s * 1.75, s * 1.15, SIGN_TSR, SIGN_TSR_RING), flexDirection: 'row', gap: s * 0.32 }}>
        <div style={dot} />
        <div style={dot} />
      </div>
    )
  }
  // TSR commencement — yellow-green board, black figure.
  if (panel.kind === 'tsr-commence') {
    return (
      <div style={plate(s * 1.5, s * 1.15, SIGN_TSR, SIGN_TSR_RING)}>
        <span style={num(SIGN_INK, s * 0.72)}>{panel.primary}</span>
      </div>
    )
  }
  // German main-signal mast plate — portrait board, white / red / white bands.
  if (panel.kind === 'de-mast-main') {
    const w = s * 0.82
    const h = s * 2.1
    return (
      <div
        style={{
          width: w,
          height: h,
          border: `${bw}px solid #20242a`,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <div style={{ flex: 1, background: '#ffffff' }} />
        <div style={{ flex: 1, background: SIGN_RED }} />
        <div style={{ flex: 1, background: '#ffffff' }} />
      </div>
    )
  }
  // German distant-signal board (Ne 2, Vorsignaltafel) — white portrait board
  // with a black diagonal cross (an X): the arms run corner to corner, leaving a
  // white V-notch on each edge.
  if (panel.kind === 'de-vorsignaltafel') {
    const w = s * 1.2
    const h = s * 1.6
    const m = bw + s * 0.03 // inset from the border to the X corners
    const t = w * 0.22 // arm thickness
    return (
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} xmlns="http://www.w3.org/2000/svg">
        <rect x={bw / 2} y={bw / 2} width={w - bw} height={h - bw} fill="#ffffff" stroke="#20242a" strokeWidth={bw} />
        <line x1={m} y1={m} x2={w - m} y2={h - m} stroke="#1c1f24" strokeWidth={t} strokeLinecap="butt" />
        <line x1={w - m} y1={m} x2={m} y2={h - m} stroke="#1c1f24" strokeWidth={t} strokeLinecap="butt" />
      </svg>
    )
  }
  // TSR termination — yellow-green board, black "T".
  return (
    <div style={plate(s * 1.15, s * 1.15, SIGN_TSR, SIGN_TSR_RING)}>
      <span style={num(SIGN_INK, s * 0.72)}>T</span>
    </div>
  )
}

function PanelView({
  panel,
  state,
  scale,
  showInactive,
}: {
  panel: Panel
  state?: SignalStateInput
  scale: number
  showInactive?: boolean
}) {
  switch (panel.type) {
    case 'lamps':
      return <LampsPanelView panel={panel} state={state} scale={scale} />
    case 'poslight':
      return <PosLightView panel={panel} state={state} scale={scale} />
    case 'feather':
      return <FeatherView panel={panel} state={state} scale={scale} />
    case 'junction':
      return <JunctionView panel={panel} state={state} scale={scale} showInactive={showInactive} />
    case 'glyph':
      return <GlyphView panel={panel} state={state} scale={scale} />
    case 'arm':
      return <ArmView panel={panel} state={state} scale={scale} />
    case 'sign':
      return <SignView panel={panel} scale={scale} />
  }
}

/* ---- accessible label -------------------------------------------- */

function deriveLabel(panels: Panel[], state?: SignalStateInput): string {
  const parts: string[] = []
  for (const p of panels) {
    if (p.type === 'lamps') {
      for (const l of p.lamps) {
        const s = state?.lamps?.[l.id] ?? 'off'
        if (s !== 'off') parts.push(`${l.label.toLowerCase()}${s === 'flash' ? ' (flashing)' : ''}`)
      }
    } else if (p.type === 'arm') {
      const pos = state?.arms?.[p.id] ?? 'danger'
      parts.push(`${p.label.toLowerCase()} ${pos === 'clear' ? 'raised (clear)' : 'horizontal (danger)'}`)
    } else if (p.type === 'poslight' || p.type === 'feather') {
      if (state?.on?.includes(p.id)) parts.push(`${p.label.toLowerCase()} lit`)
    } else if (p.type === 'junction') {
      const on = state?.feathers?.[p.id] ?? []
      if (on.length) parts.push(`${p.label.toLowerCase()} at position ${[...on].sort((a, b) => a - b).join(' and ')}`)
    } else if (p.type === 'glyph') {
      const t = p.text ?? state?.glyphs?.[p.id]
      if (t) parts.push(`${p.label.toLowerCase()} showing ${t}`)
    }
  }
  if (parts.length === 0) return 'Signal with nothing lit'
  return `Signal showing ${parts.join(', ')}`
}

export function SignalRenderer({
  panels,
  state,
  scale = 1,
  showInactive,
  ariaLabel,
  className,
}: SignalRendererProps) {
  const visible = panels.filter((p) => panelVisible(p, state, showInactive))
  return (
    <div
      className={className}
      role="img"
      aria-label={ariaLabel ?? deriveLabel(panels, state)}
      style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {visible.map((p, i) => (
        <div key={p.id} style={{ display: 'contents' }}>
          {i > 0 && <SoftRule scale={scale} />}
          <PanelView panel={p} state={state} scale={scale} showInactive={showInactive} />
        </div>
      ))}
    </div>
  )
}
