# Signals

**An interactive reference for the railway signals and safety systems you meet in [Train Sim World](https://www.dovetailgames.com/).** See a signal in-game, work out exactly what it means and what to do.

🔗 **Live:** [signals.stu.care](https://signals.stu.care)

> [!WARNING]
> **This is a fan-made game reference — not real-world railway training.** It explains signalling as represented in *Train Sim World*, and must never be used to operate, work on, or make decisions about real trains or infrastructure. Details are simplified and may differ from real-world practice. Not affiliated with or endorsed by Dovetail Games, Network Rail, the RSSB, or any railway body.

## What it does

- **Identify** — an interactive builder: pick a signal type, set its lamps/arms/indicators, and get the exact interpretation. Every configuration has a shareable URL.
- **Catalogue** — a scannable gallery of every aspect, grouped by signal type.
- **Detail pages** — for each aspect: what it means, what you do, where it sits in the sequence, how the safety systems interact, look-alikes, and the in-game controls.
- **Safety systems** — AWS, TPWS, DRA (and an ERTMS stub).

It starts with the **United Kingdom**; Germany and the USA are planned (the site is built country-first).

## Coverage (UK, v1)

Colour-light 2/3/4-aspect signals (including flashing yellows and junction/route indicators) · semaphore stop & distant signals · ground position-light shunt signals · banner repeaters · permanent and temporary speed boards · AWS / TPWS / DRA.

## Tech

Static single-page app — React + Vite + TypeScript, React Router, Tailwind CSS, installable offline PWA. No backend, no analytics, no runtime calls to anything. All signal data lives in typed files under [`src/data`](src/data). Signal artwork is drawn from **editable numeric layout specs** (no hand-tuned SVG path data), so lamp positions and shapes are just numbers you can change.

## Develop

```bash
npm install
npm run dev        # start the dev server
npm run build      # type-check + production build
npm run preview    # preview the production build
npm run typecheck  # types only
```

Requires Node 20+.

## Contributing

Spotted a mistake, or a signal we're missing? **[Open an issue](https://github.com/stu-care/signals/issues/new/choose).** See [CONTRIBUTING.md](CONTRIBUTING.md) for how the data model works and how to add a signal. The project is open source under the [MIT licence](LICENSE).
