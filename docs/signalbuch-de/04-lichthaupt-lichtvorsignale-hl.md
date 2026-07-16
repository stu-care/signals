# Lichthaupt- und Lichtvorsignale (Hl) — Colour-light main & distant signals (former DR)

The **Hl** system is the speed-signalling scheme of the former Deutsche Reichsbahn (DR, East). Unlike the DB Hp/Vr pairing — where a distant signal (Vr) and a main signal (Hp) are separate heads — a single Hl head combines main **and** distant information in one picture. A driver therefore reads, at one glance, both the speed permitted *at* this signal and the speed to expect *at the next* signal. Because so much is packed into one head, the family has many aspects (Hl 1 through Hl 13, with a/b sub-forms). All Hl signals are colour-light *Lichtsignale*; there is no semaphore form.

**Intro — § 5 (1)–(4):** Lichthaupt- und Lichtvorsignale consist of lamps that are lit by day and in darkness, mounted on a signal screen (*Signalschirm*); their identification by mast plates follows § 1 Abs. 11. The way information is encoded:

- **One-light signal (§ 5 (2)):** a signal showing a *single* light says whether the timetable speed may be **kept** (one **green steady** light) or must be **reduced** so that the pre-announced speed is not exceeded at the next signal (a **green or yellow flashing** light, or a **yellow steady** light).
- **Two-light signal (§ 5 (3)):** the **lower** light gives the speed **not to be exceeded AT the signal** (and, where pointwork follows, from the signal on through that *Weichenbereich*); the **upper** light gives the speed **not to be exceeded at the NEXT signal**.
- **Lichtstreifen (light-strip):** a yellow- or green-glowing strip may be associated with the **lower yellow light** to refine the speed it encodes. **No strip → 40 km/h**, a **yellow strip → 60 km/h**, a **green strip → 100 km/h** at the signal. (The strip is what distinguishes the otherwise identical 40 / 60 / 100 lower-light aspects — most obviously the 60-vs-40 pairs Hl 3a/3b, 6a/6b, 9a/9b, 12a/12b.)
- **Reading the upper light:** green steady = line speed at the next signal; green flashing = 100 km/h next; yellow flashing = 40/60 km/h next; yellow steady = "Halt" expected at the next signal.
- **Lichtvorsignale (§ 5 (4)):** an Hl head used as a *pure distant* signal is marked by the *Vorsignaltafel* (Ne 2) and can show only **Hl 1**, **Hl 4**, **Hl 7** or **Hl 10** — the four single-light pictures.

> Throughout this chapter, DS 301 has no counterpart (the Hl system is former-Reichsbahn only), so the **DS 301 ref** field is `—` and every reference is a DV 301 `§ 5 (m)` anchor.

---

### `Hl 1` — Fahrt mit Höchstgeschwindigkeit · *Proceed at line speed*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Hl 1 |
| **German title** | Fahrt mit Höchstgeschwindigkeit |
| **English** | Proceed at maximum (line) speed |
| **Form** | Lichtsignal |
| **DS 301 ref** | — |
| **DV 301 ref** | § 5 (6) |
| **Source** | SB-DBAG 2006 p.14 |

**Signalbild (DE):** *Ein grünes Licht.*

**Signal picture (EN):** One green steady light.

**Bedeutung (DE):** Fahrt mit der im Fahrplan zugelassenen Höchstgeschwindigkeit; am nächsten Signal ist keine Ermäßigung vorangezeigt. Kann auch am Lichtvorsignal erscheinen.

**Meaning (EN):** Proceed at the maximum speed allowed in the timetable; no reduction is announced for the next signal. This is one of the four pictures that may also appear on an Hl distant signal.

**Maps to →** family `lichthaupt-lichtvorsignale` · variant `hl` · aspect concept `clear`. Panels: `lamps` — a single green steady lamp. Representative layout: one lamp centred on the head; no Lichtstreifen. Lamp colours: `green`.

---

### `Hl 2` — Fahrt mit 100 km/h, dann mit Höchstgeschwindigkeit · *100 km/h, then line speed*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Hl 2 |
| **German title** | Fahrt mit 100 km/h, dann mit Höchstgeschwindigkeit |
| **English** | Proceed at 100 km/h, then at line speed |
| **Form** | Lichtsignal |
| **DS 301 ref** | — |
| **DV 301 ref** | § 5 (7) |
| **Source** | SB-DBAG 2006 p.14 |

**Signalbild (DE):** *Ein gelbes Licht mit einem grünen Lichtstreifen, darüber ein grünes Licht.*

**Signal picture (EN):** One yellow steady light with a green light-strip; above it, one green steady light.

**Bedeutung (DE):** Am Signal gilt 100 km/h (unteres gelbes Licht mit grünem Lichtstreifen); am nächsten Signal ist Höchstgeschwindigkeit vorangezeigt (oberes grünes Standlicht).

**Meaning (EN):** At the signal, 100 km/h applies (lower yellow light + green strip); line speed is announced for the next signal (upper green steady light).

**Maps to →** family `lichthaupt-lichtvorsignale` · variant `hl` · aspect concept `speed-100-then-clear`. Panels: `lamps` — lower yellow steady + green Lichtstreifen (an extra lamp), upper green steady. Layout: two main lamps stacked vertically, with the strip lamp beside the lower one. Lamp colours: `yellow`, `green`.

---

### `Hl 3a` — Fahrt mit 40 km/h, dann mit Höchstgeschwindigkeit · *40 km/h, then line speed*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Hl 3a |
| **German title** | Fahrt mit 40 km/h, dann mit Höchstgeschwindigkeit |
| **English** | Proceed at 40 km/h, then at line speed |
| **Form** | Lichtsignal |
| **DS 301 ref** | — |
| **DV 301 ref** | § 5 (8) |
| **Source** | SB-DBAG 2006 p.14 |

**Signalbild (DE):** *Ein gelbes Licht, darüber ein grünes Licht.*

**Signal picture (EN):** One yellow steady light; above it, one green steady light. (No Lichtstreifen — the bare lower yellow light means 40 km/h.)

**Bedeutung (DE):** Am Signal gilt 40 km/h (unteres gelbes Licht ohne Lichtstreifen); am nächsten Signal ist Höchstgeschwindigkeit vorangezeigt.

**Meaning (EN):** At the signal, 40 km/h applies (lower yellow light, no strip); line speed is announced for the next signal.

**Maps to →** family `lichthaupt-lichtvorsignale` · variant `hl` · aspect concept `speed-40-then-clear`. Panels: `lamps` — lower yellow steady (no strip), upper green steady. Lamp colours: `yellow`, `green`.

---

### `Hl 3b` — Fahrt mit 60 km/h, dann mit Höchstgeschwindigkeit · *60 km/h, then line speed*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Hl 3b |
| **German title** | Fahrt mit 60 km/h, dann mit Höchstgeschwindigkeit |
| **English** | Proceed at 60 km/h, then at line speed |
| **Form** | Lichtsignal |
| **DS 301 ref** | — |
| **DV 301 ref** | § 5 (9) |
| **Source** | SB-DBAG 2006 p.15 |

**Signalbild (DE):** *Ein gelbes Licht mit einem gelben Lichtstreifen, darüber ein grünes Licht.*

**Signal picture (EN):** One yellow steady light with a yellow light-strip; above it, one green steady light. (Yellow strip → 60 km/h — this is the 60-km/h counterpart of Hl 3a.)

**Bedeutung (DE):** Am Signal gilt 60 km/h (unteres gelbes Licht mit gelbem Lichtstreifen); am nächsten Signal ist Höchstgeschwindigkeit vorangezeigt.

**Meaning (EN):** At the signal, 60 km/h applies (lower yellow light + yellow strip); line speed is announced for the next signal.

**Maps to →** family `lichthaupt-lichtvorsignale` · variant `hl` · aspect concept `speed-60-then-clear`. Panels: `lamps` — lower yellow steady + yellow Lichtstreifen, upper green steady. Lamp colours: `yellow`, `green`.

---

### `Hl 4` — Höchstgeschwindigkeit auf 100 km/h ermäßigen · *Reduce to 100 km/h*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Hl 4 |
| **German title** | Höchstgeschwindigkeit auf 100 km/h ermäßigen |
| **English** | Reduce from line speed to 100 km/h |
| **Form** | Lichtsignal |
| **DS 301 ref** | — |
| **DV 301 ref** | § 5 (10) |
| **Source** | SB-DBAG 2006 p.15 |

**Signalbild (DE):** *Ein grünes Blinklicht.*

**Signal picture (EN):** One green flashing light.

**Bedeutung (DE):** Ein-Licht-Signal: die Geschwindigkeit ist so zu ermäßigen, dass am nächsten Signal 100 km/h nicht überschritten werden. Kann auch am Lichtvorsignal erscheinen.

**Meaning (EN):** Single-light signal: reduce speed so that 100 km/h is not exceeded at the next signal. One of the four pictures that may appear on an Hl distant signal.

**Maps to →** family `lichthaupt-lichtvorsignale` · variant `hl` · aspect concept `reduce-to-100`. Panels: `lamps` — a single green lamp with `canFlash: true`. Lamp colours: `green`.

---

### `Hl 5` — Fahrt mit 100 km/h · *Proceed at 100 km/h*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Hl 5 |
| **German title** | Fahrt mit 100 km/h |
| **English** | Proceed at 100 km/h |
| **Form** | Lichtsignal |
| **DS 301 ref** | — |
| **DV 301 ref** | § 5 (11) |
| **Source** | SB-DBAG 2006 p.15 |

**Signalbild (DE):** *Ein gelbes Licht mit grünem Lichtstreifen, darüber ein grünes Blinklicht.*

**Signal picture (EN):** One yellow steady light with a green light-strip; above it, one green flashing light.

**Bedeutung (DE):** Am Signal gilt 100 km/h (unteres gelbes Licht mit grünem Lichtstreifen); am nächsten Signal ist wiederum 100 km/h vorangezeigt (oberes grünes Blinklicht).

**Meaning (EN):** At the signal, 100 km/h applies (lower yellow light + green strip); 100 km/h is again announced for the next signal (upper green flashing light).

**Maps to →** family `lichthaupt-lichtvorsignale` · variant `hl` · aspect concept `speed-100`. Panels: `lamps` — lower yellow steady + green Lichtstreifen, upper green lamp with `canFlash: true`. Lamp colours: `yellow`, `green`.

---

### `Hl 6a` — Fahrt mit 40 km/h, dann mit 100 km/h · *40 km/h, then 100 km/h*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Hl 6a |
| **German title** | Fahrt mit 40 km/h, dann mit 100 km/h |
| **English** | Proceed at 40 km/h, then at 100 km/h |
| **Form** | Lichtsignal |
| **DS 301 ref** | — |
| **DV 301 ref** | § 5 (12) |
| **Source** | SB-DBAG 2006 p.15 |

**Signalbild (DE):** *Ein gelbes Licht, darüber ein grünes Blinklicht.*

**Signal picture (EN):** One yellow steady light (no strip → 40 km/h); above it, one green flashing light.

**Bedeutung (DE):** Am Signal gilt 40 km/h; am nächsten Signal ist 100 km/h vorangezeigt (oberes grünes Blinklicht).

**Meaning (EN):** At the signal, 40 km/h applies; 100 km/h is announced for the next signal (upper green flashing light).

**Maps to →** family `lichthaupt-lichtvorsignale` · variant `hl` · aspect concept `speed-40-then-100`. Panels: `lamps` — lower yellow steady (no strip), upper green lamp with `canFlash: true`. Lamp colours: `yellow`, `green`.

---

### `Hl 6b` — Fahrt mit 60 km/h, dann mit 100 km/h · *60 km/h, then 100 km/h*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Hl 6b |
| **German title** | Fahrt mit 60 km/h, dann mit 100 km/h |
| **English** | Proceed at 60 km/h, then at 100 km/h |
| **Form** | Lichtsignal |
| **DS 301 ref** | — |
| **DV 301 ref** | § 5 (13) |
| **Source** | SB-DBAG 2006 p.15 |

**Signalbild (DE):** *Ein gelbes Licht mit gelben Lichtstreifen, darüber ein grünes Blinklicht.*

**Signal picture (EN):** One yellow steady light with a yellow light-strip (→ 60 km/h); above it, one green flashing light.

**Bedeutung (DE):** Am Signal gilt 60 km/h (unteres gelbes Licht mit gelbem Lichtstreifen); am nächsten Signal ist 100 km/h vorangezeigt.

**Meaning (EN):** At the signal, 60 km/h applies (lower yellow light + yellow strip); 100 km/h is announced for the next signal.

**Maps to →** family `lichthaupt-lichtvorsignale` · variant `hl` · aspect concept `speed-60-then-100`. Panels: `lamps` — lower yellow steady + yellow Lichtstreifen, upper green lamp with `canFlash: true`. Lamp colours: `yellow`, `green`.

---

### `Hl 7` — Höchstgeschwindigkeit auf 40 km/h (60 km/h) ermäßigen · *Reduce to 40/60 km/h*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Hl 7 |
| **German title** | Höchstgeschwindigkeit auf 40 km/h (60 km/h) ermäßigen |
| **English** | Reduce from line speed to 40 km/h (60 km/h) |
| **Form** | Lichtsignal |
| **DS 301 ref** | — |
| **DV 301 ref** | § 5 (14) |
| **Source** | SB-DBAG 2006 p.16 |

**Signalbild (DE):** *Ein gelbes Blinklicht.*

**Signal picture (EN):** One yellow flashing light.

**Bedeutung (DE):** Ein-Licht-Signal: die Geschwindigkeit ist so zu ermäßigen, dass am nächsten Signal 40 km/h (60 km/h) nicht überschritten werden. Kann auch am Lichtvorsignal erscheinen.

**Meaning (EN):** Single-light signal: reduce speed so that 40 km/h (60 km/h) is not exceeded at the next signal. One of the four pictures that may appear on an Hl distant signal.

**Maps to →** family `lichthaupt-lichtvorsignale` · variant `hl` · aspect concept `reduce-to-40-60`. Panels: `lamps` — a single yellow lamp with `canFlash: true`. Lamp colours: `yellow`.

---

### `Hl 8` — Geschwindigkeit 100 km/h auf 40 km/h (60 km/h) ermäßigen · *100 km/h now, reduce to 40/60 km/h*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Hl 8 |
| **German title** | Geschwindigkeit 100 km/h auf 40 km/h (60 km/h) ermäßigen |
| **English** | 100 km/h at the signal, reduce to 40 km/h (60 km/h) at the next |
| **Form** | Lichtsignal |
| **DS 301 ref** | — |
| **DV 301 ref** | § 5 (15) |
| **Source** | SB-DBAG 2006 p.16 |

**Signalbild (DE):** *Ein gelbes Licht mit grünen Lichtstreifen, darüber ein gelbes Blinklicht.*

**Signal picture (EN):** One yellow steady light with a green light-strip (→ 100 km/h at the signal); above it, one yellow flashing light.

**Bedeutung (DE):** Am Signal gilt 100 km/h (unteres gelbes Licht mit grünem Lichtstreifen); die Geschwindigkeit ist so zu ermäßigen, dass am nächsten Signal 40 km/h (60 km/h) nicht überschritten werden (oberes gelbes Blinklicht).

**Meaning (EN):** At the signal, 100 km/h applies (lower yellow light + green strip); reduce so that 40 km/h (60 km/h) is not exceeded at the next signal (upper yellow flashing light).

**Maps to →** family `lichthaupt-lichtvorsignale` · variant `hl` · aspect concept `speed-100-reduce-to-40-60`. Panels: `lamps` — lower yellow steady + green Lichtstreifen, upper yellow lamp with `canFlash: true`. Lamp colours: `yellow`, `green`.

---

### `Hl 9a` — Fahrt mit 40 km/h, dann mit 40 km/h (60 km/h) · *40 km/h, then 40/60 km/h*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Hl 9a |
| **German title** | Fahrt mit 40 km/h, dann mit 40 km/h (60 km/h) |
| **English** | Proceed at 40 km/h, then at 40 km/h (60 km/h) |
| **Form** | Lichtsignal |
| **DS 301 ref** | — |
| **DV 301 ref** | § 5 (16) |
| **Source** | SB-DBAG 2006 p.16 |

**Signalbild (DE):** *Ein gelbes Licht, darüber ein gelbes Blinklicht.*

**Signal picture (EN):** One yellow steady light (no strip → 40 km/h); above it, one yellow flashing light.

**Bedeutung (DE):** Am Signal gilt 40 km/h; am nächsten Signal sind 40 km/h (60 km/h) vorangezeigt (oberes gelbes Blinklicht).

**Meaning (EN):** At the signal, 40 km/h applies; 40 km/h (60 km/h) is announced for the next signal (upper yellow flashing light).

**Maps to →** family `lichthaupt-lichtvorsignale` · variant `hl` · aspect concept `speed-40-then-40-60`. Panels: `lamps` — lower yellow steady (no strip), upper yellow lamp with `canFlash: true`. Lamp colours: `yellow`.

---

### `Hl 9b` — Fahrt mit 60 km/h, dann mit 40 km/h (60 km/h) · *60 km/h, then 40/60 km/h*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Hl 9b |
| **German title** | Fahrt mit 60 km/h, dann mit 40 km/h (60 km/h) |
| **English** | Proceed at 60 km/h, then at 40 km/h (60 km/h) |
| **Form** | Lichtsignal |
| **DS 301 ref** | — |
| **DV 301 ref** | § 5 (17) |
| **Source** | SB-DBAG 2006 p.16 |

**Signalbild (DE):** *Ein gelbes Licht mit gelben Lichtstreifen, darüber ein gelbes Blinklicht.*

**Signal picture (EN):** One yellow steady light with a yellow light-strip (→ 60 km/h); above it, one yellow flashing light.

**Bedeutung (DE):** Am Signal gilt 60 km/h (unteres gelbes Licht mit gelbem Lichtstreifen); am nächsten Signal sind 40 km/h (60 km/h) vorangezeigt.

**Meaning (EN):** At the signal, 60 km/h applies (lower yellow light + yellow strip); 40 km/h (60 km/h) is announced for the next signal.

**Maps to →** family `lichthaupt-lichtvorsignale` · variant `hl` · aspect concept `speed-60-then-40-60`. Panels: `lamps` — lower yellow steady + yellow Lichtstreifen, upper yellow lamp with `canFlash: true`. Lamp colours: `yellow`.

---

### `Hl 10` — "Halt" erwarten · *Expect stop*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Hl 10 |
| **German title** | "Halt" erwarten |
| **English** | Expect stop at the next signal |
| **Form** | Lichtsignal |
| **DS 301 ref** | — |
| **DV 301 ref** | § 5 (18) |
| **Source** | SB-DBAG 2006 p.16 |

**Signalbild (DE):** *Ein gelbes Licht.*

**Signal picture (EN):** One yellow steady light.

**Bedeutung (DE):** Ein-Licht-Signal: am nächsten Signal ist "Halt" (Hl 13) zu erwarten. Kann auch am Lichtvorsignal erscheinen.

**Meaning (EN):** Single-light signal: expect "Halt" (Hl 13) at the next signal — the Hl equivalent of a caution/distant "expect stop". One of the four pictures that may appear on an Hl distant signal.

**Maps to →** family `lichthaupt-lichtvorsignale` · variant `hl` · aspect concept `caution`. Panels: `lamps` — a single yellow steady lamp (contrast with Hl 7, which is the *flashing* yellow). Lamp colours: `yellow`.

---

### `Hl 11` — Geschwindigkeit 100 km/h ermäßigen, "Halt" erwarten · *100 km/h, expect stop*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Hl 11 |
| **German title** | Geschwindigkeit 100 km/h ermäßigen, "Halt" erwarten |
| **English** | 100 km/h at the signal, expect stop at the next |
| **Form** | Lichtsignal |
| **DS 301 ref** | — |
| **DV 301 ref** | § 5 (19) |
| **Source** | SB-DBAG 2006 p.17 |

**Signalbild (DE):** *Ein gelbes Licht mit grünen Lichtstreifen, darüber ein gelbes Licht.*

**Signal picture (EN):** One yellow steady light with a green light-strip (→ 100 km/h at the signal); above it, one yellow steady light.

**Bedeutung (DE):** Am Signal gilt 100 km/h (unteres gelbes Licht mit grünem Lichtstreifen); am nächsten Signal ist "Halt" zu erwarten (oberes gelbes Standlicht).

**Meaning (EN):** At the signal, 100 km/h applies (lower yellow light + green strip); expect "Halt" at the next signal (upper yellow steady light).

**Maps to →** family `lichthaupt-lichtvorsignale` · variant `hl` · aspect concept `expect-stop-from-100`. Panels: `lamps` — lower yellow steady + green Lichtstreifen, upper yellow steady (no flashing). Lamp colours: `yellow`, `green`.

---

### `Hl 12a` — Geschwindigkeit 40 km/h ermäßigen, "Halt" erwarten · *40 km/h, expect stop*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Hl 12a |
| **German title** | Geschwindigkeit 40 km/h ermäßigen, "Halt" erwarten |
| **English** | 40 km/h at the signal, expect stop at the next |
| **Form** | Lichtsignal |
| **DS 301 ref** | — |
| **DV 301 ref** | § 5 (20) |
| **Source** | SB-DBAG 2006 p.17 |

**Signalbild (DE):** *Zwei gelbe Lichter übereinander.*

**Signal picture (EN):** Two yellow steady lights, one above the other. (The bare lower yellow light — no strip — means 40 km/h; the upper yellow steady light means "expect stop".)

**Bedeutung (DE):** Am Signal gilt 40 km/h (unteres gelbes Licht ohne Lichtstreifen); am nächsten Signal ist "Halt" zu erwarten (oberes gelbes Standlicht).

**Meaning (EN):** At the signal, 40 km/h applies (lower yellow light, no strip); expect "Halt" at the next signal (upper yellow steady light).

**Maps to →** family `lichthaupt-lichtvorsignale` · variant `hl` · aspect concept `expect-stop-from-40`. Panels: `lamps` — lower yellow steady (no strip), upper yellow steady. Lamp colours: `yellow`.

---

### `Hl 12b` — Geschwindigkeit 60 km/h ermäßigen, "Halt" erwarten · *60 km/h, expect stop*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Hl 12b |
| **German title** | Geschwindigkeit 60 km/h ermäßigen, "Halt" erwarten |
| **English** | 60 km/h at the signal, expect stop at the next |
| **Form** | Lichtsignal |
| **DS 301 ref** | — |
| **DV 301 ref** | § 5 (21) |
| **Source** | SB-DBAG 2006 p.17 |

**Signalbild (DE):** *Ein gelbes Licht mit gelben Lichtstreifen, darüber ein gelbes Licht.*

**Signal picture (EN):** One yellow steady light with a yellow light-strip (→ 60 km/h); above it, one yellow steady light. (This is the 60-km/h counterpart of Hl 12a — the yellow strip is the only difference.)

**Bedeutung (DE):** Am Signal gilt 60 km/h (unteres gelbes Licht mit gelbem Lichtstreifen); am nächsten Signal ist "Halt" zu erwarten (oberes gelbes Standlicht).

**Meaning (EN):** At the signal, 60 km/h applies (lower yellow light + yellow strip); expect "Halt" at the next signal (upper yellow steady light).

**Maps to →** family `lichthaupt-lichtvorsignale` · variant `hl` · aspect concept `expect-stop-from-60`. Panels: `lamps` — lower yellow steady + yellow Lichtstreifen, upper yellow steady. Lamp colours: `yellow`.

---

### `Hl 13` — Halt! · *Stop*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Hl 13 |
| **German title** | Halt ! |
| **English** | Stop |
| **Form** | Lichtsignal |
| **DS 301 ref** | — |
| **DV 301 ref** | § 5 (22) |
| **Source** | SB-DBAG 2006 p.17 |

**Signalbild (DE):** *Ein rotes Licht.*

**Signal picture (EN):** One red steady light.

**Bedeutung (DE):** Halt! Der anschließende Gleisabschnitt darf nicht befahren werden.

**Meaning (EN):** Stop — the following track section may not be entered. This is the Hl "Halt" aspect, equivalent to Hp 0.

**Maps to →** family `lichthaupt-lichtvorsignale` · variant `hl` · aspect concept `danger`. Panels: `lamps` — a single red steady lamp. Lamp colours: `red`.
