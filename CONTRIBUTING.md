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

Signal content is **JSON data** — no CMS, no database:

- **`src/data/types.ts`** — the shape of everything: a `SignalFamily` has `SignalVariant`s, each a stack of **panels** (`lamps`, `arm`, `feather`, `poslight`, `glyph`, `sign`) plus a list of `aspects`.
- **`src/data/uk/families/*.json`** — one JSON file per signal family (the source of truth).
- **`src/data/uk/index.ts`** — thin typed loader that imports the JSON.

### The signal editor (easiest way)

Run the app locally and open **`/editor`**:

```bash
npm run dev      # then visit http://localhost:5173/editor
```

The editor lets you build a signal by dropping **dots** (one dot = one lamp: colour, size, position) onto a panel canvas, stack panels into a signal, define each **aspect** (which dots are on/flashing, arm positions, etc.) and edit its information, then **Save to disk** — it writes straight back to the JSON via a dev-only backend (`vite-editor-plugin.ts`). The editor is not part of the production build.

### The Signal Dots system

Signals are drawn by [`SignalRenderer`](src/components/signal/SignalRenderer.tsx) as flat iconographic dots: off is a hollow ring, on is a solid fill + a darker colour ring, flashing pulses. A signal is a stack of panels separated by soft rules. Lamp/arm/panel ids are also the builder's toggle keys and the URL-state keys, so keep them stable and descriptive.

### Aspects

Each aspect declares which `lamps` are lit (`on`/`flash`), which `arms` are `clear`, which aux panels are `on`, and any `glyphs`, plus the content template: `whatItMeans`, `whatYouDo`, `sequenceNote`, `safetyInteraction`, `lookAlikes`, `controls`, and an optional `realWorldNote`. Aspects that share a `concept` cross-link across variants.

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
