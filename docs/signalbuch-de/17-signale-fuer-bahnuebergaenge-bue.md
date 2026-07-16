# Signale für Bahnübergänge (Bü) — Level-crossing signals

Level-crossing signals (*Signale für Bahnübergänge*, plus the *So* boards and the *Pf 2* whistle board) govern how a train approaches a *Bahnübergang* — a place where road, path or track crosses the railway on the level. They fall into two families: **monitoring signals** (*Überwachungssignale* — Bü 0/100/1/101, plus their announcement and switch-on boards Bü 2/3 and So 14/15), which confirm to the driver whether a crossing protected by flashing lights, light signals or half-barriers has actually secured itself, and **audible-warning boards** (Bü 4 *Pfeiftafel*, Pf 2, Bü 5 *Läutetafel*), which stand before crossings with **no** technical protection and tell the driver to whistle or ring the bell. A related traceback signal, **Zs 9** (*Bahnübergangstafel*), is documented in full in [06-zusatzsignale-zs.md](06-zusatzsignale-zs.md).

**Intro — ESO (46b) / § 63 (1):** *Die Überwachungssignale »Bü 0«/»Bü 1« sowie die Signale »Bü 2« und »Bü 3« / »So 14« und »So 15« stehen vor Bahnübergängen mit Blinklichtern oder Lichtzeichen (mit oder ohne Halbschranken), die Signale »Bü 4« / »Pf 2« und »Bü 5« stehen vor Bahnübergängen ohne technische Sicherung.* — "The monitoring signals Bü 0 / Bü 1, together with the signals Bü 2 and Bü 3 / So 14 and So 15, stand before level crossings protected by flashing lights or light signals (with or without half-barriers); the signals Bü 4 / Pf 2 and Bü 5 stand before level crossings without technical protection." Per AB 225 / § 63 (2) the signals may also be used before crossings with (full) barriers; per § 63 (3), on propelled (pushed) trains the crew member at the head of the train must sound the horn at Bü 4 / Pf 2 / Bü 5 and again several times before running onto the crossing.

---

### `Bü 0` — Überwachungssignal · *Monitoring signal — stop before crossings*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Bü 0 |
| **German title** | Überwachungssignal |
| **English** | Monitoring signal — "Halt before level crossings! Continue once secured" |
| **Form** | Form- oder Lichtsignal |
| **DS 301 ref** | ESO (46b) |
| **DV 301 ref** | § 64 (1) |
| **Source** | SB-DBAG 2006 p.66 |

**Signalbild (DE):** *Form- oder Lichtsignal:* Eine runde, gelbe Scheibe auf einem schwarzen Signalschirm mit gelber Umrahmung über einem schwarz-weiß, schräg gestreiften Mastschild. Scheibe, Umrahmung und Mastschild sind rückstrahlend. Anstatt der Scheibe und der gelben Umrahmung kann das Signal auch zwei waagerecht angeordnete gelbe Lichter bzw. rückstrahlende Scheiben zeigen.

**Signal picture (EN):** *Form or light signal:* a round yellow disc on a black signal screen with a yellow border, over a black-and-white diagonally striped mast plate. Disc, border and mast plate are retro-reflective. Instead of the disc and yellow border, the signal may instead show **two yellow lights** (or reflective discs) arranged horizontally.

**Bedeutung (DE):** Halt vor Bahnübergängen! – Weiterfahrt nach Sicherung.

**Meaning (EN):** Halt before the level crossing! The crossing is **not** confirmed secured — the driver must be prepared to stop and may only continue once it is secured. Where the monitoring signal stands more than 5 % closer to the crossing than the line's braking distance (Eisenbahnen des Bundes), this is marked by a retro-reflective white triangle standing on its point with a black border.

**Maps to →** family `bahnuebergaenge` · variant `ueberwachungssignal` · aspect concept `xing-monitor-stop`. Panels: `lamps` (one or two `LampSlot`, `color: yellow`; the two-light form is horizontal) **plus** a static `sign` for the black-and-white diagonally striped mast plate (`kind: 'de-bue-mastschild'`). The disc-only form renders as a `sign` (yellow disc, yellow border on black); the light form as `lamps`.

---

### `Bü 100` — Überwachungssignal (Lichtsignal) · *Monitoring signal — single yellow light*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Bü 100 |
| **German title** | Überwachungssignal |
| **English** | Monitoring signal (single-light variant) — "Halt before level crossings! Continue once secured" |
| **Form** | Lichtsignal |
| **DS 301 ref** | AB 243 |
| **DV 301 ref** | § 64 (1) |
| **Source** | SB-DBAG 2006 p.67 |

**Signalbild (DE):** *Lichtsignal:* Ein gelbes Licht auf einem schwarzen Signalschirm über einem schwarz-weiß, schräg gestreiften rückstrahlenden Mastschild. Das gelbe Licht kann bei den NE auf Strecken mit einer zulässigen Geschwindigkeit bis zu 60 km/h entfallen. Ist bei den Eisenbahnen des Bundes der Abstand der Überwachungssignale vom Bahnübergang um mehr als 5 % kürzer als der Bremsweg der Strecke, so ist dies bei Signal »Bü 100« durch ein weißes Zusatzlicht am linken Rand des Signalschirms kenntlich.

**Signal picture (EN):** *Light signal:* a single yellow light on a black signal screen over a black-and-white diagonally striped retro-reflective mast plate. On non-federal railways (NE) on lines permitting up to 60 km/h the yellow light may be omitted. Where the signal stands more than 5 % closer to the crossing than the braking distance (federal railways), a **white supplementary light** at the left edge of the screen marks the fact (in place of Bü 0's white triangle).

**Bedeutung (DE):** Halt vor Bahnübergängen! – Weiterfahrt nach Sicherung.

**Meaning (EN):** Halt before the level crossing! Identical meaning to Bü 0 — the crossing is not confirmed secured; be prepared to stop and continue only once secured.

**Maps to →** family `bahnuebergaenge` · variant `ueberwachungssignal` · aspect concept `xing-monitor-stop`. Panels: `lamps` (one `LampSlot`, `color: yellow`; optional white supplementary lamp at the left edge) **plus** the striped mast-plate `sign` (`kind: 'de-bue-mastschild'`).

---

### `Bü 1` — Überwachungssignal · *Monitoring signal — crossing may be passed*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Bü 1 |
| **German title** | Überwachungssignal |
| **English** | Monitoring signal — "The level crossing may be passed" |
| **Form** | Lichtsignal |
| **DS 301 ref** | ESO (46b) |
| **DV 301 ref** | § 64 (2) |
| **Source** | SB-DBAG 2006 p.67 |

**Signalbild (DE):** *Lichtsignal:* Ein blinkendes, weißes Licht über einer runden, gelben Scheibe in einer gelben Umrahmung auf schwarzem Signalschirm über einem schwarz-weiß, schräg gestreiften Mastschild. Scheibe, Umrahmung und Mastschild sind rückstrahlend. Anstatt des weißen Blinklichtes über der Scheibe und der gelben Umrahmung kann das Signal »Bü 1« auch ein weißes Licht über zwei waagerecht angeordneten gelben Lichtern bzw. rückstrahlenden Scheiben zeigen.

**Signal picture (EN):** *Light signal:* a **flashing white light** above the round yellow disc in its yellow border, on a black signal screen over the black-and-white diagonally striped mast plate. Disc, border and mast plate are retro-reflective. Instead of the flashing white light over disc-and-border, Bü 1 may show a white light **over two horizontally arranged yellow lights** (or reflective discs). Where the signal serves several crossings, two mast plates stand side by side (§ 64 (3)).

**Bedeutung (DE):** Der Bahnübergang darf befahren werden.

**Meaning (EN):** The level crossing may be passed — it is confirmed secured. Effectively the "clear" counterpart to Bü 0: the flashing white light means the protection has switched on correctly.

**Maps to →** family `bahnuebergaenge` · variant `ueberwachungssignal` · aspect concept `xing-monitor-clear`. Panels: `lamps` — a white lamp with `canFlash: true` above one or two yellow lamps — **plus** the striped mast-plate `sign` (`kind: 'de-bue-mastschild'`). Shares the head with Bü 0 (Bü 0 = no flashing white; Bü 1 = flashing white present).

---

### `Bü 101` — Überwachungssignal (Lichtsignal) · *Monitoring signal — flashing-white variant*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Bü 101 |
| **German title** | Überwachungssignal |
| **English** | Monitoring signal (single-light variant) — "The level crossing may be passed" |
| **Form** | Lichtsignal |
| **DS 301 ref** | AB 243, AB 244 |
| **DV 301 ref** | § 64 (2) |
| **Source** | SB-DBAG 2006 p.68 |

**Signalbild (DE):** *Lichtsignal:* Ein blinkendes, weißes Licht auf einem schwarzen Signalschirm über einem schwarz-weiß, schräg gestreiften rückstrahlenden Mastschild; oder ein blinkendes, weißes Licht auf einem schwarzen Signalschirm über einem gelben Licht und einem schwarz-weiß, schräg gestreiften rückstrahlenden Mastschild.

**Signal picture (EN):** *Light signal:* a **flashing white light** on a black signal screen over the black-and-white diagonally striped retro-reflective mast plate; **or** a flashing white light on the screen over a **single yellow light** and the striped mast plate. This is the single-light (Bü 100-style) rendering of Bü 1. Where the signal stands more than 5 % closer to the crossing than the braking distance, the white supplementary light at the left edge applies (AB 244 — this rule applies only to Bü 100 / Bü 101).

**Bedeutung (DE):** Der Bahnübergang darf befahren werden.

**Meaning (EN):** The level crossing may be passed — confirmed secured. Identical meaning to Bü 1.

**Maps to →** family `bahnuebergaenge` · variant `ueberwachungssignal` · aspect concept `xing-monitor-clear`. Panels: `lamps` — a white lamp with `canFlash: true`, optionally over one yellow lamp — **plus** the striped mast-plate `sign` (`kind: 'de-bue-mastschild'`). Repeater form (*Überwachungssignalwiederholer*) is marked by the white supplementary light or a white disc on the mast plate (AB 243).

---

### `Bü 2` — Rautentafel · *Diamond board — expect a monitoring signal*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Bü 2 |
| **German title** | Rautentafel |
| **English** | Diamond board — "Expect a monitoring signal" |
| **Form** | Formsignal |
| **DS 301 ref** | ESO (46c) |
| **DV 301 ref** | § 65 (1) |
| **Source** | SB-DBAG 2006 p.69 |

**Signalbild (DE):** *Formsignal:* Eine rechteckige schwarze Tafel mit vier auf den Spitzen übereinander stehenden weißen Rauten. Die Rautentafel kann bei Eisenbahnen des Bundes mit einem weißen, rückstrahlenden Rand versehen sein. Auf die Rautentafel können weitere Rautentafeln folgen, bei denen die Anzahl der Rauten in Fahrtrichtung abnimmt (in der Regel drei weitere; die letzte 100 m vor dem Überwachungssignal, die anderen je 75 m davor).

**Signal picture (EN):** *Form signal:* a rectangular black board bearing four white diamonds (lozenges), point-to-point one above the other. On federal railways it may carry a white retro-reflective border. Further diamond boards may follow, the number of diamonds **decreasing** in the direction of travel — usually three more, the last standing 100 m before the monitoring signal and the others at 75 m spacing.

**Bedeutung (DE):** Ein Überwachungssignal ist zu erwarten. Das Signal kennzeichnet den Anfang der Einschaltstrecke von Blinklichtern oder Lichtzeichen mit Überwachungssignal.

**Meaning (EN):** Expect a monitoring signal. The board marks the start of the switch-on section (*Einschaltstrecke*) of the flashing lights / light signals that have a monitoring signal. It stands at least twice as many metres before the monitoring signal as the permitted speed there in km/h. Where the monitoring signal serves several crossings, that number replaces the top black stripe as a black numeral (§ 65 (2)).

**Maps to →** family `bahnuebergaenge` · variant `warntafel` · aspect concept `xing-monitor-announce`. Panel: `sign` (static, no aspect state; `kind: 'de-bue2'` — black board, four white point-up diamonds; optional white reflective border). Announcement counterpart to Bü 1/So 15; DV 301 equivalent is So 15.

---

### `So 15` — Warntafel · *Warning board — observe the monitoring signal*

| Field | Value |
|-------|-------|
| **Signalbegriff** | So 15 |
| **German title** | Warntafel |
| **English** | Warning board — "Observe the monitoring signal" |
| **Form** | Formsignal |
| **DS 301 ref** | ESO (46c) |
| **DV 301 ref** | § 65 (1) |
| **Source** | SB-DBAG 2006 p.69 |

**Signalbild (DE):** *Formsignal:* Eine rechteckige, weiße rückstrahlende Tafel mit drei waagerechten, schwarzen Streifen.

**Signal picture (EN):** *Form signal:* a rectangular white retro-reflective board with **three horizontal black stripes**. (This is the DV 301 / former-DR announcement board, occupying the same role as Bü 2's diamond board.)

**Bedeutung (DE):** Überwachungssignal beachten. Der Triebfahrzeugführer hat am Standort des Signals »So 15« zu prüfen, ob das Signal »Bü 1« leuchtet. Das Signal »So 15« kennzeichnet gleichzeitig den Einschaltpunkt von Blinklichtern, wenn das Signal »So 14« nicht aufgestellt ist.

**Meaning (EN):** Observe the monitoring signal. At the So 15 board the driver must check whether Bü 1 is lit. So 15 also marks the switch-on point of the flashing lights when no So 14 (*Warnpfahl*) is provided. Positioning follows the same rule as Bü 2 (§ 65 (5)).

**Maps to →** family `bahnuebergaenge` · variant `warntafel` · aspect concept `xing-monitor-announce`. Panel: `sign` (static, no aspect state; `kind: 'de-so15'` — white board, three horizontal black stripes). DV 301 equivalent of Bü 2.

---

### `Bü 3` — Merktafel · *Marker board — switch-on point of remote-monitored crossings*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Bü 3 |
| **German title** | Merktafel |
| **English** | Marker board — "Switch-on point of remote-monitored flashing lights / light signals" |
| **Form** | Formsignal |
| **DS 301 ref** | AB 232a |
| **DV 301 ref** | § 66 (4) |
| **Source** | SB-DBAG 2006 p.70 |

**Signalbild (DE):** *Formsignal:* Eine schwarz-weiß waagerecht gestreifte, rückstrahlende Tafel. Die Merktafel kann vorübergehend auch nicht rückstrahlend sein.

**Signal picture (EN):** *Form signal:* a **horizontally black-and-white striped**, retro-reflective board. It may temporarily be non-reflective.

**Bedeutung (DE):** Kennzeichnung des Einschaltpunktes von Blinklichtern oder Lichtzeichen mit Fernüberwachung. Zusätzlich können Bü-Ankündetafeln und Bü-Kennzeichentafeln aufgestellt sein.

**Meaning (EN):** Marks the switch-on point of flashing lights or light signals that are **remotely monitored** (*mit Fernüberwachung*). Supplementary Bü-announcement boards (*Bü-Ankündetafel*) and Bü-identification boards (*Bü-Kennzeichentafel*) may be added (AB 232). The DV 301 equivalent for the switch-on point is the So 14 *Warnpfahl*.

**Maps to →** family `bahnuebergaenge` · variant `warntafel` · aspect concept `xing-switch-on`. Panel: `sign` (static, no aspect state; `kind: 'de-bue3'` — horizontally black-and-white striped board). Paired with So 14 (same switch-on-point function).

---

### `So 14` — Warnpfahl · *Warning post — switch-on point of flashing lights*

| Field | Value |
|-------|-------|
| **Signalbegriff** | So 14 |
| **German title** | Warnpfahl |
| **English** | Warning post — "Switch-on point of flashing lights" |
| **Form** | Formsignal |
| **DS 301 ref** | — |
| **DV 301 ref** | § 66 (1) |
| **Source** | SB-DBAG 2006 p.70 |

**Signalbild (DE):** *Formsignal:* Ein schwarz-weiß waagerecht gestreifter Pfahl.

**Signal picture (EN):** *Form signal:* a **horizontally black-and-white striped post** (*Pfahl*).

**Bedeutung (DE):** Kennzeichnung des Einschaltpunktes von Blinklichtern. *Zusatz:* Das Signal kennzeichnet auch den Einschaltpunkt von Lichtzeichen. Der Merkpfahl kennzeichnet den Anfang – der Merkpfahl der Gegenrichtung an demselben Gleis das Ende – der Schaltstrecke von Bahnübergangssicherungsanlagen.

**Meaning (EN):** Marks the switch-on point of the flashing lights (addendum: also of light signals). The post marks the **start** of the switching section (*Schaltstrecke*) of the crossing-protection equipment; the post for the opposite direction on the same track marks its **end**. Where the switching section is bounded by a So 15 board, no So 14 post is provided (§ 66 (3)).

**Maps to →** family `bahnuebergaenge` · variant `warntafel` · aspect concept `xing-switch-on`. Panel: `sign` (static, no aspect state; `kind: 'de-so14'` — horizontally black-and-white striped post). DV 301 counterpart of the Bü 3 marker board.

---

### `Bü 4` — Pfeiftafel · *Whistle board*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Bü 4 |
| **German title** | Pfeiftafel |
| **English** | Whistle board — "Sound the whistle" |
| **Form** | Formsignal |
| **DS 301 ref** | AB 235 |
| **DV 301 ref** | § 67 (1) |
| **Source** | SB-DBAG 2006 p.71 |

**Signalbild (DE):** *Formsignal:* Eine weiße rechteckige Tafel mit schwarzem Rand und einem schwarzen »P«, oder eine schwarze rechteckige Tafel mit einem weißen »P«. Das Signal ist rückstrahlend oder beleuchtet, wenn der Betrieb es erfordert.

**Signal picture (EN):** *Form signal:* a white rectangular board with a black border and a black **"P"**, or a black rectangular board with a white "P". Retro-reflective or illuminated where operation requires. Usually two boards stand before a crossing; before crossings of footpaths and of private ways without public traffic, only one (§ 67 (2)).

**Bedeutung (DE):** Etwa 3 Sekunden lang pfeifen.

**Meaning (EN):** Sound the whistle for about 3 seconds. Where trains regularly stop between the whistle board and the crossing, the board is repeated beyond the stopping place; the board before the stopping place then carries a white plate with two vertical black stripes and applies only to trains that do **not** stop (§ 67 (3)).

**Maps to →** family `bahnuebergaenge` · variant `warntafel` · aspect concept `whistle`. Panel: `sign` (static, no aspect state; `kind: 'de-bue4'` — rectangular board bearing a "P", black-on-white or white-on-black). No lamps.

---

### `Pf 2` — Pfeiftafel vor Bahnübergängen · *Whistle board before level crossings (double)*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Pf 2 |
| **German title** | Pfeiftafel vor Bahnübergängen |
| **English** | Whistle board before level crossings — "Whistle twice" |
| **Form** | Formsignal |
| **DS 301 ref** | — |
| **DV 301 ref** | § 67 (4)–(11) |
| **Source** | SB-DBAG 2006 p.71 |

**Signalbild (DE):** *Formsignal:* Zwei weiße rechteckige Tafeln mit schwarzem Rand und einem schwarzen »P« senkrecht übereinander. Das Signal wird neu nicht mehr aufgestellt.

**Signal picture (EN):** *Form signal:* **two** white rectangular boards with a black border and a black "P", one vertically above the other. The signal is **no longer newly installed** (§ 67 (5)) — existing examples remain valid.

**Bedeutung (DE):** Zweimal pfeifen! Vom Signal ab ist 3 Sekunden lang und kurz vor dem Bahnübergang erneut zu pfeifen.

**Meaning (EN):** Whistle twice on approach to a level crossing that has no technical protection. From the board, whistle for 3 seconds and again shortly before the crossing; in clear conditions with a free view both ways and no people or vehicles approaching dangerously, the second whistle may be omitted (§ 67 (8)). Pf 2 stands at five times as many metres as the VzG speed in km/h (min. 100 m); where a Lf 4 speed restriction applies it is mounted on the Lf 4 mast (§ 67 (6)).

**Maps to →** family `bahnuebergaenge` · variant `warntafel` · aspect concept `whistle`. Panel: `sign` (static, no aspect state; `kind: 'de-pf2'` — two "P" boards stacked vertically). Shares the `whistle` concept with Bü 4. No lamps.

---

### `Bü 5` — Läutetafel · *Ring board*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Bü 5 |
| **German title** | Läutetafel |
| **English** | Ring board — "Ring the bell" |
| **Form** | Formsignal |
| **DS 301 ref** | AB 238 |
| **DV 301 ref** | § 68 (1) |
| **Source** | SB-DBAG 2006 p.72 |

**Signalbild (DE):** *Formsignal:* Eine weiße rechteckige Tafel mit schwarzem Rand und einem schwarzen »L«. Das Signal ist durch die Zuordnungstafel gekennzeichnet, wenn es aufgrund seines Standortes zwischen zwei Gleisen unzutreffend auch für das Nachbargleis gültig sein würde.

**Signal picture (EN):** *Form signal:* a white rectangular board with a black border and a black **"L"** (*Läuten* = to ring). It is marked by the assignment plate (*Zuordnungstafel*) where, on account of its position between two tracks, it would otherwise wrongly be taken to apply to the neighbouring track. Where trains regularly stop before the crossing, the board before the stopping place carries a white plate with two vertical black stripes and applies only to non-stopping trains (§ 68 (3)).

**Bedeutung (DE):** Es ist zu läuten. Von dem Signal ab ist zu läuten, bis die Spitze des Zuges den Bahnübergang überquert hat.

**Meaning (EN):** Ring the bell. From the board the bell must be rung until the head of the train has crossed the level crossing. The board may stand before crossings without general motor-vehicle traffic (§ 68 (2)).

**Maps to →** family `bahnuebergaenge` · variant `warntafel` · aspect concept `ring-bell`. Panel: `sign` (static, no aspect state; `kind: 'de-bue5'` — white board with a black "L"). No lamps.

---

### `Zs 9` — Bahnübergangstafel (Bü-Tafel) · *Level-crossing board (cross-reference)*

**Zs 9** (*Bahnübergangstafel*, § 13) — a triangular white board with a red border and a black gate symbol — permits passing a stop-showing or failed colour-light main signal and then requires "Halt before the level crossing! Continue once secured". Because it belongs to the *Zusatzsignale*, it is documented in full in **[06-zusatzsignale-zs.md](06-zusatzsignale-zs.md)** and is not duplicated here.
