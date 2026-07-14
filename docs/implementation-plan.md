# Train Sim World signal reference implementation plan

## Goal

Build a player-first, evidence-backed reference for every lineside signal, board and safety system a player can encounter in Train Sim World 3 and later-compatible content.

The first complete country is Germany. The first implemented system is Ks, followed by Hl and H/V.

## Product principles

1. **Recognition first**: a player must be able to start from what they see and reach the correct meaning quickly.
2. **Player action is explicit**: every aspect states what the driver should do, including relevant safety-system controls.
3. **Reality and TSW are separate**: real-world meaning, simulated behaviour and known discrepancies are stored independently.
4. **Evidence is field-level**: claims carry sources and confidence rather than inheriting credibility from an entire page.
5. **One canonical dataset**: website pages, indexes and SVG illustrations are generated from reusable records.
6. **Approximate artwork is acceptable**: diagrams prioritise correct lamps, indicators, boards and relative placement over engineering dimensions.

## Information architecture

- Country
  - System
    - Physical signal or device
    - Aspect or state
- Route
  - Systems encountered
  - Signals and aspects observed
  - TSW-specific behaviour
- Visual index
  - Browse by illuminated lights, colours, indicators and boards

## Canonical entities

### Aspect

Meaning, recognition description, displayed lamps, driver action, safety-system interaction, compatible physical signals, route observations and discrepancies.

### Physical asset

Signal head, lamp coordinates, mast or dwarf mounting, compatible subsidiary indicators and SVG implementation details.

### Indicator or board

Zs, Sh, Ra, Lf, Ne and related equipment, including numeric values and combinations.

### Safety system

PZB, LZB, ETCS, GNT and Sifa operation, cab indications and interventions.

### Route observation

Evidence that an entity or behaviour occurs in a particular TSW route, version, timetable or rolling-stock layer.

## Delivery sequence

### Milestone 1: usable Ks vertical slice

- [x] Route research scaffold
- [x] Saxony route audit
- [x] Aspect JSON Schema started
- [x] Delivery plan documented
- [x] Core Ks 1, Ks 2 and Hp 0 aspect records
- [x] Starter SVGs for core Ks displays
- [ ] Ks physical head and mounting records
- [ ] Zs 3 and Zs 3v records and numeric rendering
- [ ] Ks repeater and shortened-braking-distance variants
- [ ] Visual-index manifest
- [ ] Validate against observed TSW Dresden examples

### Milestone 2: complete Ks player reference

- [ ] All Ks displays encountered on German TSW routes
- [ ] Subsidiary indicators and combinations
- [ ] PZB actions and caveats
- [ ] Route occurrence evidence
- [ ] TSW discrepancy records
- [ ] Generated player-facing pages or a static prototype

### Milestone 3: eastern German systems

- [ ] Hl aspect catalogue
- [ ] Hl hardware and SVGs
- [ ] Dresden transition and mixed-system examples
- [ ] Rapid Transit route audit

### Milestone 4: remaining German systems

- [ ] H/V
- [ ] Semaphore signals
- [ ] Sv where represented
- [ ] Sh, Ra, Ne and Lf libraries
- [ ] Full PZB, LZB, ETCS, GNT and Sifa guides

### Milestone 5: coverage validation

- [ ] Audit every in-scope German and German cross-border route
- [ ] Produce completeness matrix
- [ ] Resolve or publish outstanding uncertainty
- [ ] Confirm that every player-observable driving instruction is represented

## Definition of done for an aspect

An aspect is complete when it has:

- a stable identifier and official designation;
- a plain-English recognition description;
- real-world meaning;
- practical player action;
- machine-readable lamp states;
- relevant safety-system guidance with appropriate caveats;
- at least one compatible physical asset;
- an SVG illustration;
- source and confidence metadata;
- route evidence, or an explicit status that route occurrence remains unverified.

## Immediate work queue

1. Implement the core Ks records and SVGs.
2. Add Zs 3 and Zs 3v combinations, including flashing Ks 1.
3. Model Ks main, distant and multi-section physical functions.
4. Record repeaters and shortened braking-distance marker lights.
5. Verify each combination against Leipzig–Dresden and Dresden–Riesa evidence.
