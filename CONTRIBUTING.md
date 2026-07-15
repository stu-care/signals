# Contributing to Signals

Thanks for helping make Signals better! This is a fan-made reference for signalling as represented in *Train Sim World* — corrections and additions from people who know the game (and real signalling) are very welcome.

> Reminder: Signals is **not** real-world training material. Keep contributions framed around what a player sees and does in-game, with a "real-world note" only where the game diverges.

## Reporting an inaccuracy

The most valuable contribution is telling us where we're wrong. **[Open a "Report an inaccuracy" issue](https://github.com/stu-care/signals/issues/new/choose).** Please include:

- Which signal / aspect / page.
- What it currently says, and what it should say.
- Where you saw it (route and, if possible, a screenshot), and a source if you have one.

## Suggesting a signal

Missing a signal or indicator you've seen in-game? **[Open a "Suggest a signal" issue](https://github.com/stu-care/signals/issues/new/choose)** with the signal type, the route you saw it on, and what its aspects mean.

## How the data model works

All content is typed data — no CMS, no database. To add or change a signal you edit files under [`src/data`](src/data):

- **`src/data/types.ts`** — the shape of everything (`SignalFamily` → `SignalVariant` → `Aspect`, plus geometry primitives: lamps, arms, feathers, theatre boxes, signs).
- **`src/data/uk/*.ts`** — one file per signal family. Each `SignalVariant` has a `geometry` (drawn from plain numbers) and a list of `aspects`.
- **`src/data/uk/index.ts`** — registers the families for the UK.

### Geometry is numbers, not artwork

Signals are drawn by [`SignalRenderer`](src/components/signal/SignalRenderer.tsx) from the numbers in each variant's `geometry` — lamp `{x, y, r, colour}`, plate `{x, y, w, h, radius}`, arm `{pivotX, pivotY, length, thickness, kind}`, etc. To adjust a signal, change the numbers; you never hand-write SVG paths. Lamp/arm ids are also the builder's toggle keys and the URL-state keys, so keep them stable and descriptive.

### Aspects

Each aspect declares which `lamps` are lit (and whether `steady`/`flashing`) and/or which `arms` are `clear`, plus the content template: `whatItMeans`, `whatYouDo`, `sequenceNote`, `safetyInteraction`, `lookAlikes`, `controls`, and an optional `realWorldNote`. Aspects that share a `concept` cross-link across variants.

## Development

```bash
npm install
npm run dev
npm run typecheck   # must pass
npm run build       # must pass
```

Please make sure `npm run build` is clean before opening a pull request. Match the surrounding code style (the repo uses TypeScript strict mode and Tailwind).

## Licence

By contributing you agree that your contributions are licensed under the project's [MIT licence](LICENSE).
