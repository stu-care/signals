import type {
  ArmPanel,
  ArmPosition,
  DotState,
  FeatherPanel,
  GlyphPanel,
  LampColour,
  LampsPanel,
  Panel,
  PosLightPanel,
  SignPanel,
} from '@/data/types'

/** Signal-state input: which dots are lit, arm positions, lit aux panels, glyph text. */
export interface SignalStateInput {
  lamps?: Record<string, DotState>
  arms?: Record<string, ArmPosition>
  on?: string[]
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
        borderRadius: 5,
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
  return (
    <div style={{ position: 'relative', width: panel.w * scale, height: panel.h * scale }}>
      {panel.lamps.map((l) => {
        const st = state?.lamps?.[l.id] ?? 'off'
        return (
          <div
            key={l.id}
            style={{ position: 'absolute', left: (l.x - l.r) * scale, top: (l.y - l.r) * scale }}
          >
            <Dot color={l.color} state={st} r={l.r * scale} />
          </div>
        )
      })}
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
  const rot = pos === 'clear' ? -45 : 0
  return (
    <svg
      width={(R + 5) * 2 * scale}
      height={(R + 5) * 2 * scale}
      viewBox={`0 0 ${(R + 5) * 2} ${(R + 5) * 2}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx={c} cy={c} r={R} fill="#ffffff" stroke="#c2c6ce" strokeWidth={2} />
      <g transform={`translate(${c} ${c}) rotate(${rot})`}>
        <rect x={-R * 0.82} y={-4} width={R * 1.64} height={8} rx={2} fill="#1c1f24" />
      </g>
    </svg>
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
      borderRadius: 6 * scale,
      boxSizing: 'border-box' as const,
    })

  if (panel.kind === 'psr-diff') {
    return (
      <div style={plate(s * 1.4, s * 1.95, '#ffffff', '#20242a')}>
        <span style={num('#1c1f24', s * 0.62)}>{panel.primary}</span>
        <div style={{ width: '78%', height: bw, background: '#20242a', margin: `${s * 0.12}px 0` }} />
        <span style={num('#1c1f24', s * 0.62)}>{panel.secondary}</span>
      </div>
    )
  }
  if (panel.kind === 'tsr-warn') {
    const d = s * 0.22
    return (
      <div style={{ ...plate(s * 1.7, s * 1.15, '#f1c015', '#9c7d07'), position: 'relative' }}>
        <div style={{ position: 'absolute', width: d, height: d, borderRadius: '50%', background: '#fff', left: '25%', top: '24%' }} />
        <div style={{ position: 'absolute', width: d, height: d, borderRadius: '50%', background: '#fff', right: '25%', bottom: '24%' }} />
      </div>
    )
  }
  if (panel.kind === 'tsr-commence') {
    return (
      <div style={plate(s * 1.5, s * 1.15, '#1c1f24', '#20242a')}>
        <span style={num('#ffffff', s * 0.72)}>{panel.primary}</span>
      </div>
    )
  }
  if (panel.kind === 'tsr-terminate') {
    return (
      <div style={plate(s * 1.15, s * 1.15, '#1c1f24', '#20242a')}>
        <span style={num('#ffffff', s * 0.72)}>T</span>
      </div>
    )
  }
  // psr
  return (
    <div style={plate(s * 1.5, s * 1.15, '#ffffff', '#20242a')}>
      <span style={num('#1c1f24', s * 0.72)}>{panel.primary}</span>
    </div>
  )
}

function PanelView({
  panel,
  state,
  scale,
}: {
  panel: Panel
  state?: SignalStateInput
  scale: number
}) {
  switch (panel.type) {
    case 'lamps':
      return <LampsPanelView panel={panel} state={state} scale={scale} />
    case 'poslight':
      return <PosLightView panel={panel} state={state} scale={scale} />
    case 'feather':
      return <FeatherView panel={panel} state={state} scale={scale} />
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
          <PanelView panel={p} state={state} scale={scale} />
        </div>
      ))}
    </div>
  )
}
