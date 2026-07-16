export interface ShapePoint {
  x: number
  y: number
  /** Corner radius at this vertex (px); 0 = sharp. */
  r?: number
}

const round = (n: number) => Math.round(n * 100) / 100

/**
 * SVG path `d` for a closed polygon through `points`, rounding each corner by its
 * own `r` (clamped to half the shorter adjacent edge so radii never overshoot).
 * With fewer than three points it degrades to an open polyline.
 */
export function roundedPolyPath(points: ShapePoint[]): string {
  const n = points.length
  if (n < 3) {
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${round(p.x)} ${round(p.y)}`).join(' ')
  }
  const parts: string[] = []
  for (let i = 0; i < n; i++) {
    const cur = points[i]
    const prev = points[(i - 1 + n) % n]
    const next = points[(i + 1) % n]
    const vpx = prev.x - cur.x
    const vpy = prev.y - cur.y
    const vnx = next.x - cur.x
    const vny = next.y - cur.y
    const lp = Math.hypot(vpx, vpy) || 1
    const ln = Math.hypot(vnx, vny) || 1
    const r = Math.max(0, Math.min(cur.r ?? 0, lp / 2, ln / 2))
    const p1x = cur.x + (vpx / lp) * r
    const p1y = cur.y + (vpy / lp) * r
    const p2x = cur.x + (vnx / ln) * r
    const p2y = cur.y + (vny / ln) * r
    parts.push(`${i === 0 ? 'M' : 'L'} ${round(p1x)} ${round(p1y)}`)
    if (r > 0) parts.push(`Q ${round(cur.x)} ${round(cur.y)} ${round(p2x)} ${round(p2y)}`)
  }
  parts.push('Z')
  return parts.join(' ')
}
