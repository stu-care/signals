import { useId, type ReactNode } from 'react'
import type {
  ArmPosition,
  IndicatorSetting,
  LampColour,
  LampSetting,
  LampSpec,
  LampState,
  SemaphoreArmSpec,
  SignSpec,
  SignalGeometry,
} from '@/data/types'

interface SignalRendererProps {
  geometry: SignalGeometry
  setting?: LampSetting
  arms?: Record<string, ArmPosition>
  indicators?: IndicatorSetting
  /** Accessible label; if omitted, one is derived from the lit elements. */
  ariaLabel?: string
  className?: string
  /** Pixel width; height derived from the viewBox aspect ratio. */
  width?: number
}

const LAMP_VAR: Record<LampColour, string> = {
  red: 'var(--sig-red)',
  yellow: 'var(--sig-yellow)',
  green: 'var(--sig-green)',
  white: 'var(--sig-white)',
}

function lampState(setting: LampSetting | undefined, id: string): LampState {
  return setting?.[id] ?? 'off'
}

function deriveLabel(
  geometry: SignalGeometry,
  setting?: LampSetting,
  indicators?: IndicatorSetting,
  arms?: Record<string, ArmPosition>,
): string {
  if (geometry.sign) return geometry.sign.label

  const lit = geometry.lamps
    .map((l) => ({ l, s: lampState(setting, l.id) }))
    .filter((x) => x.s !== 'off')
  const parts = lit.map(
    (x) => `${x.l.label.toLowerCase()}${x.s === 'flashing' ? ' (flashing)' : ''}`,
  )

  for (const arm of geometry.arms ?? []) {
    const pos = arms?.[arm.id] ?? 'danger'
    parts.push(`${arm.label.toLowerCase()} ${pos === 'clear' ? 'raised (clear)' : 'horizontal (danger)'}`)
  }

  const extras: string[] = []
  if (indicators?.feather) {
    const f = geometry.feathers?.find((x) => x.id === indicators.feather)
    extras.push(f ? `with ${f.label.toLowerCase()}` : 'with a junction indicator')
  }
  if (indicators?.theatre) extras.push(`theatre route ${indicators.theatre}`)

  if (parts.length === 0 && extras.length === 0) return 'Signal with no lamps lit'
  const base = parts.length ? `Signal showing ${parts.join(' and ')}` : 'Signal'
  return [base, ...extras].join(', ')
}

export function SignalRenderer({
  geometry,
  setting,
  arms,
  indicators,
  ariaLabel,
  className,
  width = 180,
}: SignalRendererProps) {
  const uid = useId().replace(/:/g, '')
  const glow = `glow-${uid}`
  const { viewBox, post, backplates, lamps, feathers, theatre, arms: armSpecs, sign } =
    geometry
  const height = (width * viewBox.h) / viewBox.w
  const label = ariaLabel ?? deriveLabel(geometry, setting, indicators, arms)

  const activeFeather = feathers?.find((f) => f.id === indicators?.feather)

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${viewBox.w} ${viewBox.h}`}
      role="img"
      aria-label={label}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id={glow} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Post */}
      {post && (
        <rect
          x={post.x}
          y={post.top}
          width={post.width}
          height={post.bottom - post.top}
          fill="#2b3644"
          rx={2}
        />
      )}

      {/* Backing plates / heads */}
      {backplates.map((p, i) => (
        <rect
          key={i}
          x={p.x}
          y={p.y}
          width={p.w}
          height={p.h}
          rx={p.radius}
          fill="#0c1116"
          stroke="#39485a"
          strokeWidth={2}
        />
      ))}

      {/* Theatre route indicator box (structure faint; character when active) */}
      {theatre && (
        <g>
          <rect
            x={theatre.x}
            y={theatre.y}
            width={theatre.w}
            height={theatre.h}
            rx={4}
            fill="#0c1116"
            stroke="#39485a"
            strokeWidth={2}
          />
          {indicators?.theatre && (
            <text
              x={theatre.x + theatre.w / 2}
              y={theatre.y + theatre.h / 2}
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="ui-monospace, monospace"
              fontWeight="700"
              fontSize={theatre.h * 0.72}
              fill="var(--sig-white)"
              style={{ filter: `url(#${glow})` }}
            >
              {indicators.theatre}
            </text>
          )}
        </g>
      )}

      {/* Lamp housings + off-lenses first, so a lit lamp is never covered by a
          later (possibly overlapping) lamp's dark base. */}
      {lamps.map((lamp) => (
        <LampBase key={`base-${lamp.id}`} lamp={lamp} />
      ))}
      {/* Lit lenses on top. */}
      {lamps.map((lamp) => {
        const s = lampState(setting, lamp.id)
        return s === 'off' ? null : (
          <LampLit key={`lit-${lamp.id}`} lamp={lamp} state={s} glowId={glow} />
        )
      })}

      {/* Junction indicator (feather) — only drawn when lit */}
      {activeFeather &&
        Array.from({ length: activeFeather.lampCount }).map((_, i) => {
          const theta = (activeFeather.angleDeg * Math.PI) / 180
          const cx = activeFeather.originX + Math.cos(theta) * activeFeather.spacing * i
          const cy = activeFeather.originY + Math.sin(theta) * activeFeather.spacing * i
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={activeFeather.r}
              fill="var(--sig-white)"
              style={{ filter: `url(#${glow})` }}
            />
          )
        })}

      {/* Semaphore / banner-repeater arms */}
      {armSpecs?.map((arm) => (
        <Arm key={arm.id} arm={arm} position={arms?.[arm.id] ?? 'danger'} glowId={glow} />
      ))}

      {/* Static lineside sign (speed boards) */}
      {sign && <Sign sign={sign} />}
    </svg>
  )
}

function LampBase({ lamp }: { lamp: LampSpec }) {
  const colour = LAMP_VAR[lamp.colour]
  return (
    <g>
      {/* Recessed housing bezel — gives depth without encroaching on neighbours. */}
      <circle
        cx={lamp.x}
        cy={lamp.y}
        r={lamp.r + 2.5}
        fill="#05080b"
        stroke="#2c3745"
        strokeWidth={1.5}
      />
      {/* Off-lens base: so a flashing lamp reveals this dark lens in its off
          phase and genuinely appears to switch off. */}
      <circle cx={lamp.x} cy={lamp.y} r={lamp.r} fill="#0a0e12" />
      {/* Faint colour tint so an unlit lens is still identifiable at a glance. */}
      <circle cx={lamp.x} cy={lamp.y} r={lamp.r * 0.92} fill={colour} opacity={0.1} />
    </g>
  )
}

function LampLit({
  lamp,
  state,
  glowId,
}: {
  lamp: LampSpec
  state: LampState
  glowId: string
}) {
  const colour = LAMP_VAR[lamp.colour]
  return (
    <circle
      cx={lamp.x}
      cy={lamp.y}
      r={lamp.r}
      fill={colour}
      className={state === 'flashing' ? 'signal-lamp-flash' : undefined}
      style={{ filter: `url(#${glowId})` }}
    />
  )
}

/** Night spectacle-light colour for a mechanical arm, or null (banner). */
function armLightColour(
  kind: SemaphoreArmSpec['kind'],
  position: ArmPosition,
): LampColour | null {
  if (kind === 'banner') return null
  if (position === 'clear') return 'green'
  return kind === 'stop' ? 'red' : 'yellow'
}

function Arm({
  arm,
  position,
  glowId,
}: {
  arm: SemaphoreArmSpec
  position: ArmPosition
  glowId: string
}) {
  const { pivotX, pivotY, length, thickness, kind } = arm
  // 180deg = horizontal (danger/caution); 225deg raises the tip 45deg (upper quadrant clear).
  const rot = position === 'clear' ? 225 : 180
  const light = armLightColour(kind, position)
  const half = thickness / 2

  if (kind === 'banner') {
    // Banner repeater: black bar across a white disc; horizontal = caution,
    // inclined up = the signal it repeats is off (clear).
    return (
      <g>
        <circle
          cx={pivotX}
          cy={pivotY}
          r={length}
          fill="#eef4fb"
          stroke="#39485a"
          strokeWidth={2}
        />
        <g transform={`translate(${pivotX} ${pivotY}) rotate(${position === 'clear' ? -45 : 0})`}>
          <rect
            x={-length * 0.82}
            y={-half}
            width={length * 1.64}
            height={thickness}
            rx={2}
            fill="#0b0f14"
          />
        </g>
      </g>
    )
  }

  return (
    <g>
      <g transform={`translate(${pivotX} ${pivotY}) rotate(${rot})`}>
        {kind === 'stop' ? (
          <>
            <rect
              x={0}
              y={-half}
              width={length}
              height={thickness}
              rx={2}
              fill="#d21f26"
              stroke="#3a0a0d"
              strokeWidth={1}
            />
            <rect x={length - 15} y={-half} width={5} height={thickness} fill="#ffffff" />
          </>
        ) : (
          <>
            {/* distant arm: fishtail (notched) end */}
            <polygon
              points={`0,${-half} ${length},${-half} ${length - 9},0 ${length},${half} 0,${half}`}
              fill="#f2b21c"
              stroke="#4a3400"
              strokeWidth={1}
            />
            {/* black chevron */}
            <polyline
              points={`${length - 24},${-half + 3} ${length - 13},0 ${length - 24},${half - 3}`}
              fill="none"
              stroke="#151515"
              strokeWidth={3}
            />
          </>
        )}
      </g>

      {/* Pivot boss */}
      <circle cx={pivotX} cy={pivotY} r={4} fill="#1a2029" stroke="#39485a" strokeWidth={1} />

      {/* Night spectacle light, coloured by state */}
      {light && (
        <circle
          cx={pivotX}
          cy={pivotY + length * 0.5}
          r={7}
          fill={LAMP_VAR[light]}
          style={{ filter: `url(#${glowId})` }}
        />
      )}
    </g>
  )
}

const SIGN_INK = '#0b0f14'
const SIGN_FACE = '#eef4fb'

function Sign({ sign }: { sign: SignSpec }) {
  const { x, y, w, h, kind, primary, secondary } = sign
  const cx = x + w / 2

  if (kind === 'psr-diff') {
    return (
      <g>
        <rect x={x} y={y} width={w} height={h} rx={6} fill={SIGN_FACE} stroke="#2c3745" strokeWidth={2} />
        <line x1={x + 6} y1={y + h / 2} x2={x + w - 6} y2={y + h / 2} stroke={SIGN_INK} strokeWidth={2} />
        <SignText x={cx} y={y + h * 0.28}>{primary}</SignText>
        <SignText x={cx} y={y + h * 0.74}>{secondary}</SignText>
      </g>
    )
  }

  if (kind === 'tsr-commence') {
    // Illuminated speed indicator: white figures on black.
    return (
      <g>
        <rect x={x} y={y} width={w} height={h} rx={6} fill="#0b0f14" stroke="#2c3745" strokeWidth={2} />
        <SignText x={cx} y={y + h / 2} fill={SIGN_FACE}>{primary}</SignText>
      </g>
    )
  }

  if (kind === 'tsr-warn') {
    // Warning indicator: rectangular board, yellow all over, with two white
    // reflectorised spots (these replaced the earlier two flashing white lights).
    const spotR = h * 0.13
    return (
      <g>
        <rect x={x} y={y} width={w} height={h} rx={6} fill="#f2c21c" stroke="#4a3a00" strokeWidth={2} />
        <circle cx={cx - w * 0.17} cy={y + h * 0.35} r={spotR} fill="#ffffff" />
        <circle cx={cx + w * 0.17} cy={y + h * 0.65} r={spotR} fill="#ffffff" />
      </g>
    )
  }

  if (kind === 'tsr-terminate') {
    // Termination indicator: white "T" on black.
    return (
      <g>
        <rect x={x} y={y} width={w} height={h} rx={6} fill="#0b0f14" stroke="#2c3745" strokeWidth={2} />
        <SignText x={cx} y={y + h / 2} fill={SIGN_FACE}>T</SignText>
      </g>
    )
  }

  // psr: reflective white plate with black figures.
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={6} fill={SIGN_FACE} stroke="#2c3745" strokeWidth={2} />
      <SignText x={cx} y={y + h / 2}>{primary}</SignText>
    </g>
  )
}

function SignText({
  x,
  y,
  fill = SIGN_INK,
  children,
}: {
  x: number
  y: number
  fill?: string
  children: ReactNode
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="central"
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontWeight={800}
      fontSize={26}
      fill={fill}
    >
      {children}
    </text>
  )
}
