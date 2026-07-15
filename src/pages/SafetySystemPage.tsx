import { Link, useParams } from 'react-router-dom'
import { useCurrentCountry } from '@/lib/useCurrentCountry'
import { getSafetySystem } from '@/data'
import { Field } from '@/components/ui/Field'
import { RealWorldNote } from '@/components/ui/RealWorldNote'
import { NotFoundPage } from '@/pages/NotFoundPage'

export function SafetySystemPage() {
  const country = useCurrentCountry()
  const { systemId } = useParams()
  const system = getSafetySystem(country.code, systemId ?? '')
  if (!system) return <NotFoundPage />

  const base = `/${country.code}`

  return (
    <article className="mx-auto max-w-3xl">
      <nav className="text-sm text-muted">
        <Link to={`${base}/safety`} className="hover:text-text">
          Safety systems
        </Link>
      </nav>
      <div className="mt-3 flex items-baseline gap-3">
        <span className="rounded bg-surface-2 px-2 py-1 font-mono text-sm font-bold text-accent">
          {system.abbr}
        </span>
        <h1 className="text-3xl font-bold">{system.name}</h1>
      </div>
      <p className="mt-3 text-lg text-muted">{system.blurb}</p>

      <Field label="What it is">{system.whatItIs}</Field>
      <Field label="What the driver experiences">{system.driverExperience}</Field>
      <Field label="How you interact with it">{system.howYouInteract}</Field>
      <Field label="How it interacts with the signals">{system.aspectInteraction}</Field>
      {system.edgeBehaviour && (
        <Field label="Worth knowing">{system.edgeBehaviour}</Field>
      )}
      {system.controls && (
        <Field label="In Train Sim World — controls">{system.controls}</Field>
      )}
      {system.realWorldNote && <RealWorldNote>{system.realWorldNote}</RealWorldNote>}
    </article>
  )
}
