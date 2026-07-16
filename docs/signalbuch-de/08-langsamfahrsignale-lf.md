# Langsamfahrsignale (Lf) — Slow-speed signals

Slow-speed signals (*Langsamfahrsignale*) mark stretches of line that must be run over below the normal permitted speed. They cover both **temporary** restrictions — set up as needed for engineering work or defects and taken down again afterward — and **permanent** ones written into the route tables. Almost all are triangular, rectangular or square lineside boards (*Scheiben* / *Tafeln*) with a black figure or letter on a coloured field; only the announce disc **Lf 1** carries a night indication (two yellow lamps rising to the left). The governing rule is that a **shown figure means ten times its value in km/h** is the permitted speed (so a "5" = 50 km/h).

**Intro — ESO (23) / § 21 (1):** *Die Langsamfahrsignale dienen zur Kennzeichnung von Langsamfahrstellen.* — "Slow-speed signals serve to mark slow-speed sections." On the federal railways temporary slow-speed sections are as a rule marked by a start board and an end board (signals **Lf 2** and **Lf 3**). Per **AB 51**, the signals **Lf 1**, **Lf 1/2**, **Lf 2** and **Lf 3** apply to both trains and shunting movements; they are **not fixed** installations and on the federal railways may only be set up on the special order of the infrastructure manager (on the NE railways the operating manager may designate other places). *Zusatz:* restrictions valid for only a single train, or needed because signal interlocking has been suspended, are not signalled where trains are advised by written order (*Befehl*) rather than by the "La" (the notice of temporary speed restrictions).

---

### `Lf 1` — Langsamfahrscheibe · *Slow-speed announce disc*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Lf 1 |
| **German title** | Langsamfahrscheibe |
| **English** | Slow-speed announce disc |
| **Form** | Formsignal (+ Nachtzeichen) |
| **DS 301 ref** | AB 51a, AB 52, AB 53, AB 55–58 |
| **DV 301 ref** | § 21 (3), (4), (4a), (6)–(10) |
| **Source** | SB-DBAG 2006 p.27–28 |

**Signalbild (DE):** Eine auf der Spitze stehende, dreieckige, gelbe Scheibe mit weißem Rand zeigt eine schwarze Kennziffer. Bei Dunkelheit: unter dem beleuchteten Tageszeichen zwei schräg nach links steigende gelbe Lichter. Bei beschränkten Platzverhältnissen befinden sich die Lichter vor dem Tageszeichen. Die gezeigte Kennziffer bedeutet, dass der 10fache Wert in km/h als Fahrgeschwindigkeit zugelassen ist.

**Signal picture (EN):** A triangular yellow disc standing on its point, with a white border, shows a black figure. In darkness: below the illuminated day indication, two yellow lights rising diagonally to the left. Where space is restricted the lights are placed in front of the day indication. The figure shown means that ten times its value in km/h is the permitted running speed.

**Bedeutung (DE):** Es folgt eine vorübergehende Langsamfahrstelle, auf der die angezeigte Geschwindigkeit nicht überschritten werden darf.

**Meaning (EN):** A temporary slow-speed section follows, on which the indicated speed must not be exceeded. Lf 1 announces that on the section (normally bounded by Lf 2 and Lf 3) at most the speed given by the figure may be used until the last vehicle of the train or shunting movement has left the section.

**Siting notes:**
- Stands as a rule at braking distance ahead of signal Lf 2 (§ 21 (6) / AB 55); a shorter distance is permitted in unavoidable cases if it matches the actually required braking distance, published by order, in the La, or in an operating instruction (AB 57 / § 21 (9)).
- The yellow disc may be retroreflective; if so it is not lit when the night indication is used. The night lamps are fitted at the signal by day too but only lit for the night indication, and where space is tight may stand up to 15 m ahead of the signal (AB 51a / § 21 (3)).
- Where a restriction begins after a line or route divergence, Lf 1 is supplemented by a yellow, black-bordered direction arrow showing which direction it applies to (§ 21 (7)); a retroreflective Lf 1 needs a retroreflective arrow.
- Where a second, slower section joins directly onto the first, its Lf 1 stands beyond the first section's Lf 2 (AB 56 / § 21 (8)). Where trains start or continue beyond an Lf 1, a second Lf 1 **without** the yellow lights is set up (AB 58 / § 21 (10)).
- Valid figures: 0.5, 1, 2, 3, 4, 5 … 15 (AB 53 / § 21 (4a)).

**Maps to →** family `langsamfahrsignale` · panel `sign` (kind `de-lf1`), static triangular board with black figure glyph; optional `lamps` note for the night indication (two `yellow` lamps on a left-rising diagonal, only lit at night). Aspect concept `slow-announce` (shared with Lf 6).

---

### `Lf 1/2` — Langsamfahrbeginnscheibe · *Slow-speed begin board*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Lf 1/2 |
| **German title** | Langsamfahrbeginnscheibe |
| **English** | Slow-speed begin board |
| **Form** | Formsignal |
| **DS 301 ref** | — |
| **DV 301 ref** | § 21 (11), (12), (13), (14), (14a) |
| **Source** | SB-DBAG 2006 p.28 |

**Signalbild (DE):** Eine rechteckige, auf der Schmalseite stehende, gelbe Scheibe mit weißem Rand zeigt eine schwarze Kennziffer. *Zusatz:* Das Signal wird neu nicht mehr aufgestellt.

**Signal picture (EN):** A rectangular yellow board standing on its short side, with a white border, shows a black figure. *Zusatz:* the signal is no longer newly installed.

**Bedeutung (DE):** Auf dem am Signal beginnenden, in der Regel durch eine Endscheibe begrenzten Gleisabschnitt darf die angezeigte Geschwindigkeit nicht überschritten werden.

**Meaning (EN):** On the track section beginning at the signal — normally bounded by an end board — the indicated speed must not be exceeded. It combines announce and start functions in one board. The restriction holds until the last vehicle has left the section.

**Siting notes:**
- Shows restrictions on station main tracks that are not through main tracks; stands at the start of the slow track immediately to its right and is **not** pre-announced by signal (§ 21 (13)).
- Where the distance from the track start to the slow section suffices for braking, Lf 1 + Lf 2 are used **instead** of Lf 1/2 (§ 21 (13)).
- The driver is informed of installed Lf 1/2 boards via the La and must arrive at the La speed (the lowest, where tracks differ); from Lf 1/2 the indicated speed must not be exceeded (§ 21 (14)). On departures, Lf 3 tells the driver a restriction exists for that track.
- To be lit in darkness (exceptions permitted by the infrastructure manager) (§ 21 (12)). While an Lf 1/2 is marked invalid, no Lf 3 may be set up (§ 21 (14a)).

**Maps to →** family `langsamfahrsignale` · panel `sign` (kind `de-lf1-2`), static rectangular yellow board with black figure glyph. Aspect concept `slow-begin` (shared with Lf 2 / Lf 5). DR-only (DV 301); no DS 301 equivalent, and no longer newly installed.

---

### `Lf 2` — Anfangscheibe · *Start board*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Lf 2 |
| **German title** | Anfangscheibe |
| **English** | Start board (of the temporary slow section) |
| **Form** | Formsignal |
| **DS 301 ref** | AB 59, AB 60, AB 61, AB 62, AB 63, AB 63a |
| **DV 301 ref** | § 21 (15), (15a), (16), (16a), (17), (17a) |
| **Source** | SB-DBAG 2006 p.29 |

**Signalbild (DE):** Eine rechteckige, auf der Schmalseite stehende, gelbe Scheibe mit weißem Rand und schwarzem »A«. Die gelbe Scheibe mit weißem Rand und schwarzem A darf quadratisch sein.

**Signal picture (EN):** A rectangular yellow board standing on its short side, with a white border and a black "A". The board may be square.

**Bedeutung (DE):** Anfang der vorübergehenden Langsamfahrstelle.

**Meaning (EN):** Start of the temporary slow-speed section — the point from which the speed announced by Lf 1 must be observed.

**Siting notes:**
- Stands at the start of the slow section (§ 21 (16) / AB 60), immediately to the right of its track, or to the left for left-hand running; marked with a *Zuordnungstafel* (allocation board) if its position between two tracks would otherwise make it ambiguous (§ 21 (17a) / AB 63a).
- Lit in darkness or retroreflective (§ 21 (16a) / AB 61). On NE railways the operating manager decides whether Lf 2 is set up and whether it is lit (AB 62).
- If Lf 2 stands before a line/route divergence, the Lf 1 direction arrow is repeated on it; a retroreflective Lf 2 needs a retroreflective arrow (§ 21 (17) / AB 63).

**Maps to →** family `langsamfahrsignale` · panel `sign` (kind `de-lf2`), static rectangular (or square) yellow board with black "A" glyph. Aspect concept `slow-begin` (shared with Lf 1/2 / Lf 5).

---

### `Lf 3` — Endscheibe · *End board*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Lf 3 |
| **German title** | Endscheibe |
| **English** | End board (of the temporary slow section) |
| **Form** | Formsignal |
| **DS 301 ref** | AB 63b, AB 64, AB 65, AB 66 |
| **DV 301 ref** | § 21 (18), (18a), (19), (20), (21) |
| **Source** | SB-DBAG 2006 p.29 |

**Signalbild (DE):** Eine rechteckige, auf der Schmalseite stehende, weiße Scheibe mit schwarzem Rand und schwarzem »E«. Die weiße Scheibe mit schwarzem »E« darf quadratisch sein.

**Signal picture (EN):** A rectangular white board standing on its short side, with a black border and a black "E". The board may be square.

**Bedeutung (DE):** Ende der vorübergehenden Langsamfahrstelle.

**Meaning (EN):** End of the temporary slow-speed section — from the last vehicle passing it, the restriction no longer applies.

**Siting notes:**
- Stands at the end of the slow section (§ 21 (19) / AB 64), immediately to the right of its track; on single lines it may stand immediately to the left, though *Zusatz:* at DB AG it stands immediately to the right on single lines.
- Not set up where a second slow section joins directly on (§ 21 (19)).
- Lit in darkness or retroreflective (§ 21 (20) / AB 65). On NE railways the operating manager decides whether Lf 3 is set up and whether it is lit (§ 21 (21) / AB 66).

**Maps to →** family `langsamfahrsignale` · panel `sign` (kind `de-lf3`), static rectangular (or square) white board with black "E" glyph. Aspect concept `slow-end`.

---

### `Lf 4` — Geschwindigkeitstafel · *Speed board*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Lf 4 |
| **German title** | Geschwindigkeitstafel |
| **English** | Speed board (permanent restriction) |
| **Form** | Formsignal (ortsfest) |
| **DS 301 ref** | AB 67, AB 68 |
| **DV 301 ref** | § 22 (1), (2), (3), (4), (6), (7), (8) |
| **Source** | SB-DBAG 2006 p.30 (DS), p.33–34 (DV) |

**Signalbild (DE):** *(DS 301)* Eine auf der Spitze stehende, dreieckige, weiße Scheibe mit schwarzem Rand zeigt eine schwarze Kennziffer. *(DV 301, § 22 (1))* Eine auf der Spitze stehende dreieckige, weiße Tafel mit schwarzem Rand zeigt eine schwarze Geschwindigkeitszahl. Bei beschränktem Raum kann die Dreieckspitze nach oben zeigen. Die gezeigte Kennziffer bedeutet, dass der 10fache Wert in km/h als Fahrgeschwindigkeit zugelassen ist.

**Signal picture (EN):** A triangular white board standing on its point, with a black border, showing a black figure. Where space is restricted the triangle may point upward. The figure shown means ten times its value in km/h is the permitted running speed. *(Both DS 301 and DV 301 describe this board; DS 301 restricts it to branch lines / Nebenbahnen, while DV 301 uses it as the general permanent speed board.)*

**Bedeutung (DE):** *(DS 301)* Es folgt eine ständige Langsamfahrstelle, auf der die angezeigte Geschwindigkeit nicht überschritten werden darf. *(DV 301)* Die angezeigte Geschwindigkeit darf vom Signal ab nicht überschritten werden.

**Meaning (EN):** A permanent slow-speed section follows (DS 301) / from the signal onward the indicated speed must not be exceeded (DV 301). It marks a permanent speed change or restriction written into the route tables (VzG) and, where relevant, the timetable.

**Siting notes:**
- *DS 301 (branch lines only):* set up as a rule at braking distance ahead of the slow section, or at a distance sufficient for braking before level crossings; lit only where operation requires (AB 67). Provided where the permitted speed ahead is ≥ 25 % higher than on the restriction, at a distant signal to announce an Hp 1 speed limit, or to cut speed before a level crossing (AB 68).
- *DV 301:* shows the speed changes of the route-table (VzG) speeds for running lines and station through-main tracks, and restrictions for non-technically-secured level crossings (§ 22 (2)). On a reduction it stands at braking distance ahead of the Lf 5 change point; minimum shortened distance 300 m on main lines, 150 m on branch lines (§ 22 (3)); before a non-secured level crossing at least 150 m ahead of the crossing or Lf 5 (§ 22 (6)).
- After a divergence, an Lf 4 standing before the last point carries a white, black-bordered direction arrow (§ 22 (4)); a retroreflective board needs a retroreflective arrow.
- Also used to announce a main signal that imposes an Hp-1 speed limit in the following pointwork, set up level with the distant signal (§ 22 (7)). The board is fixed, stands immediately to the right (left for wrong-direction running on double track), is not lit in darkness but may be retroreflective (§ 22 (8)). Where a stop is exceptionally required before a non-secured crossing, Lf 4 shows the figure 0 and an Lf 5 is set up (§ 22 (6)).

**Maps to →** family `langsamfahrsignale` · panel `sign` (kind `de-lf4`), static triangular white board with black figure glyph. Aspect concept `speed-board` (shared with Lf 7). Permanent (ortsfest), unlike the temporary Lf 1/2/3.

---

### `Lf 5` — Anfangtafel / Eckentafel · *Start board (of the permanent restriction)*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Lf 5 |
| **German title** | Anfangtafel (DS 301) / Eckentafel (DV 301) |
| **English** | Start / corner board — point at which the Lf 4 speed must be reached |
| **Form** | Formsignal (ortsfest) |
| **DS 301 ref** | AB 70 |
| **DV 301 ref** | § 23 (1), (2), (3), (4) |
| **Source** | SB-DBAG 2006 p.30 (DS), p.34 (DV) |

**Signalbild (DE):** *(DS 301 — Anfangtafel)* Eine rechteckige, auf der Schmalseite stehende, weiße Tafel mit schwarzem »A«. *(DV 301 — Eckentafel)* Eine rechteckige, weiße Tafel mit schwarzen Ecken.

**Signal picture (EN):** *(DS 301 — start board)* a rectangular white board standing on its short side with a black "A". *(DV 301 — corner board)* a rectangular white board with black corners.

**Bedeutung (DE):** Die auf der Geschwindigkeitstafel »Lf 4« angezeigte Geschwindigkeitsbegrenzung muss durchgeführt sein.

**Meaning (EN):** The speed restriction shown on the speed board Lf 4 must have been achieved by this point — it marks the start of the permanently restricted section.

**Siting notes:**
- *DS 301:* set up only on branch lines where the point from which the Lf 4 speed applies before a level crossing must be specially marked; stands immediately to the right (left for left-hand running), with a *Zuordnungstafel* where its position would be ambiguous between two tracks. **No longer newly installed** (AB 70).
- *DV 301:* the corner board marks the point at which the Lf 4 restriction must be reached (§ 23 (2)); also set up before non-secured level crossings on branch lines where that point needs special marking, and always where Lf 4 shows the figure 0 — there it marks where to stop.
- Repeats the Lf 4 direction arrow if it stands before a divergence (§ 23 (3)); fixed, immediately right (left for wrong-direction running on double track), not lit in darkness but may be retroreflective (§ 23 (4)). *Footnote:* except before non-secured level crossings on branch lines, Lf 5 may until further notice not be set up.

**Maps to →** family `langsamfahrsignale` · panel `sign` (kind `de-lf5`), static white board (black "A" on DS, black corners on DV). Aspect concept `slow-begin` (shared with Lf 2 / Lf 1/2). Permanent counterpart to the temporary Lf 2.

---

### `Lf 6` — Geschwindigkeits-Ankündetafel · *Speed-announce board*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Lf 6 |
| **German title** | Geschwindigkeits-Ankündetafel |
| **English** | Speed-announce board (expect an Lf 7) |
| **Form** | Formsignal (ortsfest) |
| **DS 301 ref** | AB 71a |
| **DV 301 ref** | § 23a (1), (2) |
| **Source** | SB-DBAG 2006 p.31 |

**Signalbild (DE):** Eine auf der Spitze stehende, schwarz und weiß umrandete, dreieckige, gelbe Tafel zeigt eine schwarze Kennziffer. Die gezeigte Kennziffer bedeutet, dass der 10-fache Wert in km/h als Fahrgeschwindigkeit vom Signal »Lf 7« ab zugelassen ist. Bei beschränktem Raum kann die Dreieckspitze nach oben zeigen.

**Signal picture (EN):** A triangular yellow board standing on its point, with a black and white border, showing a black figure. The figure shown means ten times its value in km/h is the permitted running speed **from signal Lf 7 onward**. Where space is restricted the triangle may point upward.

**Bedeutung (DE):** Ein Geschwindigkeitssignal »Lf 7« ist zu erwarten.

**Meaning (EN):** Expect a speed signal Lf 7 — a reduced speed is permitted from the coming Lf 7.

**Siting notes:**
- Set up when a lower speed is permitted from Lf 7; stands as a rule at braking distance ahead of Lf 7, or at a distance sufficient for braking before branch-line level crossings, with the shortened distance noted in the timetable or a written instruction (§ 23a (2) / AB 71a). In unavoidable cases the infrastructure/operating manager may allow a distance shorter than braking distance if it still meets the actually required braking distance.
- Lit in darkness or retroreflective. Where the restriction begins after a divergence, supplemented by a yellow, black-bordered direction arrow; a retroreflective board needs a retroreflective arrow. Valid figures 1–15.
- On branch lines (except before level crossings) Lf 6 may, with the supervisory authority's approval, be omitted where the layout gives the driver another suitable cue, then published in the timetable (§ 23a (2)).

**Maps to →** family `langsamfahrsignale` · panel `sign` (kind `de-lf6`), static triangular yellow board with black figure glyph. Aspect concept `slow-announce` (shared with Lf 1). The permanent-restriction announcer, paired with Lf 7.

---

### `Lf 7` — Geschwindigkeitstafel · *Speed board*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Lf 7 |
| **German title** | Geschwindigkeitstafel |
| **English** | Speed board — indicated speed not to be exceeded from the signal |
| **Form** | Formsignal (ortsfest) |
| **DS 301 ref** | AB 71c, AB 71f, AB 71g, AB 71h |
| **DV 301 ref** | § 23b (1), (2), (3), (5), (6), (7) |
| **Source** | SB-DBAG 2006 p.31–32 |

**Signalbild (DE):** Eine rechteckige, auf der Schmalseite stehende, weiße Tafel mit schwarzem Rand zeigt eine schwarze Kennziffer. Die weiße Tafel mit schwarzem Rand darf quadratisch sein. Die gezeigte Kennziffer bedeutet, dass der 10-fache Wert in km/h als Fahrgeschwindigkeit vom Signal »Lf 7« ab zugelassen ist.

**Signal picture (EN):** A rectangular white board standing on its short side, with a black border, showing a black figure; the board may be square. The figure shown means ten times its value in km/h is the permitted running speed from signal Lf 7 onward.

**Bedeutung (DE):** Die angezeigte Geschwindigkeit darf vom Signal ab nicht überschritten werden.

**Meaning (EN):** The indicated speed must not be exceeded from the signal onward. Lf 7 marks a speed change.

**Siting notes:**
- Marks a speed change; lit in darkness or retroreflective (§ 23b (3) / AB 71c). Valid figures 1–20 (17–20 marked with an asterisk in the source).
- An Lf 7 mounted at a main signal applies only for aspect Hp 1, Ks 1 without Zs 3, or Ks 2 without Zs 3 (§ 23b (3)).
- A signalled speed change also exists at junctions and route divergences in stations when passing from one line to another, and at the end of a restriction shown by a main signal or Zs 3; Lf 7 is then set up beyond the last point traversed at the divergence/crossover or on departure, except where a restriction is being shown (§ 23b (5) / AB 71f).
- On branch lines (except before level crossings) Lf 7 may be omitted with the supervisory authority's approval where the layout gives another suitable cue, published in the timetable (§ 23b (6) / AB 71g).
- If a board reading "Bü" is fitted below an Lf 7 set up to end a restriction after a level crossing, speed may be increased once the leading vehicle reaches the middle of the crossing (§ 23b (7) / AB 71h).

**Maps to →** family `langsamfahrsignale` · panel `sign` (kind `de-lf7`), static rectangular (or square) white board with black figure glyph. Aspect concept `speed-board` (shared with Lf 4). Paired with the announcer Lf 6.

---

*Governing references retained per entry (DS 301 `AB n` / DV 301 `§ n (m)`); source pages are the printed SB-DBAG 2006 page numbers. Siting-rule summaries are condensed from the AB/§ paragraphs and are not verbatim translations.*
