import { Link } from 'react-router-dom'
import { useCurrentCountry } from '@/lib/useCurrentCountry'
import { getCountryData } from '@/data'
import { SignalRenderer } from '@/components/signal/SignalRenderer'
import { FitScale } from '@/components/signal/FitScale'
import { ComingSoon } from '@/pages/ComingSoon'

export function CataloguePage() {
  const country = useCurrentCountry()
  const data = getCountryData(country.code)
  if (!data) return <ComingSoon country={country} />

  return (
    <div>
      <h1 className="text-2xl font-bold sm:text-3xl">Catalogue</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Every {country.adjective} aspect, grouped by signal type. Find the one that
        matches what you saw and open it for the full explanation.
      </p>

      {data.families.map((family) => (
        <section key={family.id} className="mt-10">
          <h2 className="text-xl font-semibold">{family.name}</h2>
          <p className="mt-1 max-w-2xl text-sm text-muted">{family.blurb}</p>

          {family.variants.map((variant) => (
            <div key={variant.id} className="mt-5">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-muted">
                {variant.name}
              </h3>
              <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {variant.aspects.map((aspect) => (
                  <li key={aspect.id}>
                    <Link
                      to={`/${country.code}/aspect/${family.id}/${variant.id}/${aspect.id}`}
                      className="flex h-full flex-col items-center rounded-none border border-border bg-surface p-4 text-center transition hover:border-faint hover:bg-surface-2"
                    >
                      <div className="h-[104px] w-full">
                        <FitScale>
                          <SignalRenderer
                            panels={variant.panels}
                            state={{
                              lamps: aspect.lamps,
                              arms: aspect.arms,
                              on: aspect.on,
                              feathers: aspect.feathers,
                              glyphs: aspect.glyphs,
                            }}
                            scale={1.05}
                          />
                        </FitScale>
                      </div>
                      <span className="mt-3 text-sm font-semibold">{aspect.name}</span>
                      <span className="text-xs text-muted">{aspect.meaning}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ))}
    </div>
  )
}
