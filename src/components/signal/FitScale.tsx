import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Scales its child down (never up) so a fixed-size signal always fits its box.
 * The signal renderer draws at absolute pixel sizes, so a wide one (a junction
 * fan) or a tall one (a German mast plate) can overflow a small card or column.
 * FitScale measures the child's natural size against the available box and
 * applies a transform to fit both dimensions, preserving aspect ratio.
 *
 * The parent must have a definite size (e.g. a fixed height + grid-cell width).
 */
export function FitScale({ children }: { children: ReactNode }) {
  const boxRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const box = boxRef.current
    const content = contentRef.current
    if (!box || !content) return
    const measure = () => {
      // offsetWidth/Height are layout sizes — unaffected by our transform, so
      // this never feeds back into a resize loop.
      const natW = content.offsetWidth
      const natH = content.offsetHeight
      if (!natW || !natH) return
      const s = Math.min(1, box.clientWidth / natW, box.clientHeight / natH)
      setScale(Number.isFinite(s) && s > 0 ? s : 1)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(box)
    ro.observe(content)
    return () => ro.disconnect()
  }, [])

  return (
    <div
      ref={boxRef}
      style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
    >
      <div
        ref={contentRef}
        style={{ position: 'absolute', top: '50%', left: '50%', transform: `translate(-50%, -50%) scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  )
}
