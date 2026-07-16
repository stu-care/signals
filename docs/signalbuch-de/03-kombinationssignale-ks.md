# Kombinationssignale (Ks) — Combination signals

> DBAG Signalbuch (SB) DS/DV 301, 2006 — chapter **Kombinationssignale (Ks)**. Source pages: SB-DBAG 2006 pp.12–13.

Combination signals are the modern single-light main/distant signals of the DB AG network. A Ks signal shows the movement authority with **one** signal light and can act as a main signal, a distant signal, or a combined main-and-distant signal on one head. This chapter also carries the colour-light form of **Hp 0** (Halt) as displayed on a Ks or block/shunting signal.

**Intro — ESO (19a) / § 5a (1).** *Kombinationssignale sind Lichtsignale, die die Fahraufträge mit einem Signallicht anzeigen. Die Signale können die Funktion eines Hauptsignals, Vorsignals oder Haupt- und Vorsignals haben.*

Combination signals are colour-light signals that convey the movement authority (Fahrauftrag) with a single signal light. A Ks signal can serve the function of a main signal, a distant signal, or a combined main-and-distant signal.

---

### `Ks 1` — Fahrt · *Proceed*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Ks 1 |
| **German title** | Fahrt |
| **English** | Proceed |
| **Form** | Lichtsignal |
| **DS 301 ref** | ESO (19e) |
| **DV 301 ref** | § 5a (4)–(6) |
| **Source** | SB-DBAG 2006 p.13 |

**Signalbild (DE):** *Ein grünes Licht bzw. ein grünes Blinklicht. Das Signal zeigt grünes Blinklicht, wenn an diesem Signal eine Geschwindigkeitsanzeige mittels »Zs 3v« gezeigt wird.*

**Signal picture (EN):** *A green light, or a flashing green light. The signal shows flashing green when a speed indication is displayed at this signal by means of "Zs 3v".*

**Bedeutung (DE):** *Das Signal erlaubt die Anwendung der im Fahrplan zugelassenen Geschwindigkeit.*

**Meaning (EN):** *The signal permits running at the speed allowed by the timetable.* Steady green = proceed; flashing green = proceed and expect the speed announced by the accompanying Zs 3v distant speed indicator.

**Maps to →** family `kombinationssignale` · variant `ks` · aspect concept `clear`. Panel: `lamps` (single `green`; `canFlash: true` on the green slot). Lamp colour: `green`.

---

### `Ks 2` — Halt erwarten · *Expect stop*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Ks 2 |
| **German title** | Halt erwarten |
| **English** | Expect stop |
| **Form** | Lichtsignal |
| **DS 301 ref** | ESO (19f) |
| **DV 301 ref** | § 5a (7) |
| **Source** | SB-DBAG 2006 p.13 |

**Signalbild (DE):** *Ein gelbes Licht.*

**Signal picture (EN):** *A yellow light.*

**Bedeutung (DE):** *Das Signal erlaubt die Vorbeifahrt und kündigt "Halt" an.*

**Meaning (EN):** *The signal permits passing and announces "Halt" (stop) at the next main signal.*

**Maps to →** family `kombinationssignale` · variant `ks` · aspect concept `caution`. Panel: `lamps` (single `yellow`). Lamp colour: `yellow`.

---

### `Hp 0` — Halt · *Stop* (colour-light form)

| Field | Value |
|-------|-------|
| **Signalbegriff** | Hp 0 |
| **German title** | Halt |
| **English** | Stop |
| **Form** | Lichtsignal |
| **DS 301 ref** | AB 10a, AB 11a |
| **DV 301 ref** | § 3 (2)–(4) |
| **Source** | SB-DBAG 2006 p.13 |

**Signalbild (DE):** *Ein rotes Licht.*

**Signal picture (EN):** *A red light.*

**Bedeutung (DE):** *Das Signal Hp 0 wird gezeigt am Hauptsignal oder am Sperrsignal. Wird am Signal Hp 0 das Signal Sh 1 bzw. Ra 12 gezeigt, so ist das Haltegebot für Rangierfahrten aufgehoben.*

**Meaning (EN):** *Signal Hp 0 is shown at a main signal or at a shunting/blocking signal (Sperrsignal). If signal Sh 1 (or Ra 12) is displayed at signal Hp 0, the stop order is lifted for shunting movements.*

**Maps to →** family `kombinationssignale` · variant `ks` · aspect concept `danger`. Panel: `lamps` (single `red`). Lamp colour: `red`.

---

### Mastschild — yellow downward triangle (distant-function mast plate)

| Field | Value |
|-------|-------|
| **Signalbegriff** | Mastschild (gelbes Dreieck) |
| **German title** | Mastschild für Ks-Hauptsignal mit Vorsignalfunktion |
| **English** | Mast plate for a Ks main signal that also has distant function |
| **Form** | Mastschild (sign) |
| **DS 301 ref** | ESO (19b) |
| **DV 301 ref** | § 5a (1a) |
| **Source** | SB-DBAG 2006 p.12 |

**Signalbild (DE):** *Ks-Hauptsignale, die mit weiß-rot-weißem Mastschild gekennzeichnet sind und zugleich Vorsignalfunktion besitzen, sind zusätzlich mit folgendem Mastschild gekennzeichnet: Ein mit der Spitze nach unten weisendes gelbes Dreieck. Das Mastschild ist rückstrahlend. Das dreieckige gelbe Mastschild ist grundsätzlich unter dem weiß-rot-weißen Mastschild angeordnet.*

**Signal picture (EN):** *Ks main signals that carry a white-red-white mast plate and at the same time have a distant-signal function are additionally marked with the following mast plate: a yellow triangle pointing downwards. The mast plate is retroreflective. The triangular yellow mast plate is, as a rule, placed below the white-red-white mast plate.*

**Bedeutung (DE):** *Kennzeichnet ein Ks-Hauptsignal, das zugleich Vorsignalfunktion besitzt.*

**Meaning (EN):** *Marks a Ks main signal that additionally carries a distant-signal function (i.e. combined main + distant on one head).*

**Maps to →** family `kombinationssignale` · variant `ks` · panel `sign` (`kind: 'de-mastschild-vorsignalfunktion'`), static, no aspect state.

---

### Zusatzlicht — white additional light (verkürzter Bremsweg / repeater)

- **ESO (19c) / § 5a (2):** *Kombinationssignale mit Vorsignalfunktion, die in einem um mehr als 5 % verkürztem Bremswegabstand vor dem zugehörigen Signal stehen, zeigen bei Signal »Ks 1« mit »Zs 3v« und bei Signal »Ks 2« ein weißes Zusatzlicht über dem Signallicht.*
  Combination signals with a distant function that stand at more than 5 % less than the required braking distance ahead of the associated signal show a **white additional light above** the signal light — at signal "Ks 1" combined with "Zs 3v", and at signal "Ks 2".
- **ESO (19d) / § 5a (3):** *Vorsignalwiederholer zeigen bei Signal »Ks 1« mit »Zs 3v« und bei Signal »Ks 2« ein weißes Zusatzlicht unter dem Signallicht.*
  Distant-signal repeaters (Vorsignalwiederholer) show a **white additional light below** the signal light — at "Ks 1" with "Zs 3v", and at "Ks 2".

**Maps to →** an extra `white` lamp slot on the `ks` variant (above the main light for the shortened-braking-distance case; below it for a repeater), shown together with the Ks 1/Ks 2 aspect.
