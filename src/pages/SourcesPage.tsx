export function SourcesPage() {
  return (
    <article className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold">Sources &amp; further reading</h1>
      <p className="mt-4 text-muted">
        Signals teaches the systems as represented in <em>Train Sim World</em>, checked
        against publicly available references. This page collects general further reading;
        it is not a citation of any official rulebook. Where the game diverges from real
        practice, the relevant page carries a “real-world note”.
      </p>

      <h2 className="mt-8 text-xl font-semibold">General references</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
        <li>
          Wikipedia — “Railway signalling in Great Britain” and related articles (a useful
          overview of aspects and systems).
        </li>
        <li>
          RSSB and Network Rail publicly published standards and explainer material on
          signalling principles, AWS and TPWS.
        </li>
        <li>
          Established railway enthusiast resources documenting signal aspects, junction
          indicators and semaphore practice.
        </li>
        <li>
          Train Sim World in-game training modules and manuals, for how each system is
          modelled and controlled.
        </li>
      </ul>

      <p className="mt-8 text-sm text-faint">
        Specific per-page references will be added as content is expanded and verified.
      </p>
    </article>
  )
}
