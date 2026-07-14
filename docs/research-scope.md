# German Train Sim World research scope

## Purpose

Build a player-first reference for signals, aspects, boards and safety systems encountered while driving German infrastructure in Train Sim World.

The guide is not intended to reproduce infrastructure drawings to engineering tolerances. Visual assets need the correct recognisable head shape, lights, relative positions, numbers, subsidiary indicators and boards so that a player can identify an indication accurately.

## Content boundary

Include:

- official German route content compatible with Train Sim World 3 and later;
- preserved collection routes originally released for earlier Train Sim World versions;
- cross-border routes where German signalling or safety systems are actively encountered;
- locomotive, gameplay and timetable add-ons where they materially change what a player must recognise or operate;
- route-specific or train-specific differences when they affect player action.

Do not catalogue a locomotive solely because it can be spawned on a route. Include it when its cab systems, safety-system controls or route interaction add information needed by a player.

## Systems

The route audit should identify all relevant systems rather than starting with Ks alone. Expected categories include:

- lineside signalling: Ks, H/V, Hl, Sv, mechanical signals and cross-border systems;
- subsidiary and operational indications: Zs, Sh, Ra, Lf, Ne and related boards;
- train protection: PZB, LZB, ETCS and GNT/NeiTech where represented;
- vigilance and cab systems: Sifa and train-specific displays;
- associated trackside equipment when it changes player behaviour.

## Page layers

Each player-facing page should provide:

1. **Recognise it** (a clear visual and a short identification description).
2. **What it means** (plain English, retaining the official German identifier).
3. **What to do** (speed, braking, acknowledgement, release or other action).
4. **Technical detail** (real-world operating context and combinations).
5. **In Train Sim World** (implementation, route examples and differences).
6. **Evidence** (sources and confidence).

## Organisation

Primary hierarchy:

```text
Country → System → Signal/device → Aspect/state
```

Routes provide cross-references and evidence. A route page may summarise everything encountered there, but signal definitions should not be duplicated per route.

## Visual asset requirements

Use reusable components for:

- signal heads;
- lamps;
- indicators and numeral displays;
- mast and identification plates;
- boards;
- mounting arrangements.

Exact millimetre dimensions are optional. Correct relative positioning and recognisable appearance are required.

## Evidence hierarchy

1. Direct, repeatable observation in the current Train Sim World build.
2. Official Dovetail Games manuals, tutorials, articles and release material.
3. Official or authoritative German railway rules and infrastructure material.
4. Reliable video or photographic evidence showing the game clearly.
5. Community reports, explicitly marked as unverified.
6. Real-world rules used to fill a game-specific gap, explicitly marked as inferred.

## Confidence and discrepancy handling

Every route-to-system claim should carry an evidence status:

- `confirmed-in-game`
- `official-documentation`
- `reliable-visual-evidence`
- `probable-needs-verification`
- `unknown`

Game differences should be classified as:

- `intentional-simplification`
- `likely-engine-limitation`
- `repeatable-defect`
- `unverified-report`

Version-specific behaviour must include the observed game version and observation date where known.
