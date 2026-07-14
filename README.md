# Signals

A player-facing reference for railway signals, aspects, boards and train-protection systems encountered in Train Sim World.

The first research area is Germany, covering official route content compatible with Train Sim World 3 onwards (including preserved collection routes that remain usable in later games).

## Principles

- Explain what the player can see.
- Explain what it means in real railway operation.
- Explain what the player should do.
- Record differences, simplifications and defects in Train Sim World.
- Keep beginner guidance separate from deeper technical detail.
- Do not present inferred route coverage as confirmed observation.

## Proposed information architecture

```text
country
└── system
    └── signal, board or safety system
        └── aspect, indication or operating state
```

Routes are evidence and cross-references rather than the primary navigation structure.

## Repository structure

- `docs/research-scope.md` defines the agreed scope and evidence rules.
- `docs/germany/route-matrix.md` tracks route-by-route research.
- `data/germany/routes.json` is the machine-readable route inventory.
- `schemas/route.schema.json` validates route records.

## Evidence statuses

- `confirmed-in-game`
- `official-documentation`
- `reliable-visual-evidence`
- `probable-needs-verification`
- `unknown`

All bugs and discrepancies should additionally be classified as one of:

- `intentional-simplification`
- `likely-engine-limitation`
- `repeatable-defect`
- `unverified-report`
