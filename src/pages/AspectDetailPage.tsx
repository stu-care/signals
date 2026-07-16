import { Link, useParams } from 'react-router-dom'
import { useCurrentCountry } from '@/lib/useCurrentCountry'
import {
  findAspectByConcept,
  getCountryData,
  getVariant,
  variantsShowingConcept,
} from '@/data'
import { SignalRenderer } from '@/components/signal/SignalRenderer'
import { FitScale } from '@/components/signal/FitScale'
import { FlashingBadge } from '@/components/signal/FlashingBadge'
import { Field } from '@/components/ui/Field'
import { RealWorldNote } from '@/components/ui/RealWorldNote'
import { encodeBuilder } from '@/lib/url-state'
import { NotFoundPage } from '@/pages/NotFoundPage'

export function AspectDetailPage() {
  const country = useCurrentCountry()
  const { familyId, variantId, aspectId } = useParams()
  const data = getCountryData(country.code)
  const variant = getVariant(country.code, familyId ?? '', variantId ?? '')
  const family = data?.families.find((f) => f.id === familyId)
  const aspect = variant?.aspects.find((a) => a.id === aspectId)

  if (!data || !family || !variant || !aspect) return <NotFoundPage />

  const base = `/${country.code}`
  const builderHref = `${base}/build?${encodeBuilder({
    familyId: family.id,
    variantId: variant.id,
    lamps: aspect.lamps ?? {},
    arms: aspect.arms ?? {},
    on: aspect.on ?? [],
    feathers: aspect.feathers ?? {},
    glyphs: aspect.glyphs ?? {},
  }).toString()}`

  const shownOn = variantsShowingConcept(country.code, aspect.concept)
  const anyFlashing = Object.values(aspect.lamps ?? {}).includes('flash')
  const aspectState = {
    lamps: aspect.lamps,
    arms: aspect.arms,
    on: aspect.on,
    feathers: aspect.feathers,
    glyphs: aspect.glyphs,
  }

  return (
    <article className="mx-auto max-w-3xl">
      <nav className="text-sm text-muted">
        <Link to={`${base}/catalogue`} className="hover:text-ink">
          Catalogue
        </Link>
        <span className="px-1.5">/</span>
        <span>{family.name}</span>
      </nav>

      <div className="mt-4 grid gap-6 sm:grid-cols-[160px_1fr] sm:items-center">
        <div className="rounded-none border border-border bg-surface p-4">
          <div className="h-40 w-full">
            <FitScale>
              <SignalRenderer panels={variant.panels} state={aspectState} scale={1.5} />
            </FitScale>
          </div>
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-3xl font-bold">{aspect.name}</h1>
            {anyFlashing && <FlashingBadge />}
          </div>
          <p className="mt-1 text-lg text-accent">{aspect.meaning}</p>
          <p className="mt-3 text-muted">{aspect.whatItMeans}</p>
          <Link
            to={builderHref}
            className="mt-4 inline-block rounded-none border border-border px-4 py-2 text-sm font-semibold transition hover:bg-surface-2"
          >
            Open in the builder →
          </Link>
        </div>
      </div>

      <Field label="What you do" highlight>
        {aspect.whatYouDo}
      </Field>
      {aspect.sequenceNote && (
        <Field label="Where it sits in the sequence">{aspect.sequenceNote}</Field>
      )}
      <Field label="Shown on">
        {shownOn.map((e, i) => (
          <span key={`${e.variant.id}-${e.aspect.id}`}>
            {i > 0 && ', '}
            <Link
              to={`${base}/aspect/${e.family.id}/${e.variant.id}/${e.aspect.id}`}
              className="text-accent hover:underline"
            >
              {e.variant.name}
            </Link>
          </span>
        ))}
      </Field>
      {aspect.safetyInteraction && (
        <Field label="Safety-system interaction">
          {aspect.safetyInteraction}{' '}
          <SafetyLinks base={base} text={aspect.safetyInteraction} />
        </Field>
      )}
      {aspect.lookAlikes && <Field label="Don’t confuse with">{aspect.lookAlikes}</Field>}
      {aspect.controls && (
        <Field label="In Train Sim World — controls">{aspect.controls}</Field>
      )}
      {aspect.realWorldNote && <RealWorldNote>{aspect.realWorldNote}</RealWorldNote>}

      {aspect.related && aspect.related.length > 0 && (
        <div className="mt-8 border-t border-border pt-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">
            Compare with
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {aspect.related.map((concept) => {
              const e = findAspectByConcept(country.code, concept)
              if (!e) return null
              return (
                <li key={concept}>
                  <Link
                    to={`${base}/aspect/${e.family.id}/${e.variant.id}/${e.aspect.id}`}
                    className="rounded-none border border-border bg-surface-2 px-3 py-1.5 text-sm hover:border-faint"
                  >
                    {e.aspect.name} — {e.aspect.meaning}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </article>
  )
}

/** Turn AWS / TPWS / DRA mentions into links to their reference pages. */
function SafetyLinks({ base, text }: { base: string; text: string }) {
  const systems = [
    { id: 'aws', abbr: 'AWS' },
    { id: 'tpws', abbr: 'TPWS' },
    { id: 'dra', abbr: 'DRA' },
  ].filter((s) => text.includes(s.abbr))
  if (!systems.length) return null
  return (
    <span className="mt-2 block text-sm">
      {systems.map((s, i) => (
        <span key={s.id}>
          {i > 0 && ' · '}
          <Link to={`${base}/safety/${s.id}`} className="text-accent hover:underline">
            More on {s.abbr} →
          </Link>
        </span>
      ))}
    </span>
  )
}
