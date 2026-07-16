# Hauptsignale (Hp) — Main signals

Main signals (*Hauptsignale*) are the primary movement-authority signals of the German network. They stand as entry, exit, intermediate, block and cover signals, and tell a train whether the track section immediately beyond may be entered — and, where relevant, at what speed. They exist both as semaphore *Formsignale* (one or two arms as the day indication, with matching lights at night) and as colour-light *Lichtsignale* (one or two lights serving as both day and night indication).

**Intro — ESO (10) / § 3 (1):** *Hauptsignale zeigen an, ob der anschließende Gleisabschnitt befahren werden darf.* — "Main signals indicate whether the following track section may be entered." The signal **Hp 0** applies to both train and shunting movements; **Hp 1** and **Hp 2** apply only to train movements. *Zusatz:* if a main signal still shows a proceed aspect as a shunting movement approaches, the movement must stop and wait for **Hp 0**; at a doubtful or extinguished signal a shunting movement behaves as at a stop signal, and before passing a main signal it must await the signalman's consent.

Per ESO (11) / § 3 (1a): the signals are either *Formsignale*, showing one or two arms as the day indication and an equal number of lights at night, or *Lichtsignale* with one or two lights serving as both day and night indication.

---

### `Hp 0` — Halt · *Stop*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Hp 0 |
| **German title** | Halt |
| **English** | Stop |
| **Form** | Formsignal + Lichtsignal |
| **DS 301 ref** | AB 10a, AB 11a |
| **DV 301 ref** | § 3 (2), (3), (4) |
| **Source** | SB-DBAG 2006 p.7 |

**Signalbild (DE):** *Formsignal:* Ein weißer, rotumrandeter Signalflügel – bei zweiflügligen Signalen der obere Flügel – zeigt waagerecht nach rechts. *Bei Dunkelheit und Lichtsignal:* Ein rotes Licht – bei Lichtsignalen auch zwei rote Lichter waagerecht nebeneinander.

**Signal picture (EN):** *Semaphore:* a white, red-bordered arm — on two-arm signals the upper arm — points horizontally to the right. *In darkness and as a colour-light signal:* one red light — on colour-light signals also two red lights horizontally side by side.

**Bedeutung (DE):** Das Signal Hp 0 wird gezeigt am Hauptsignal oder am Sperrsignal. Das Signal gilt für Zug- und Rangierfahrten. Wird am Signal Hp 0 das Signal Sh 1 bzw. Ra 12 gezeigt, so ist das Haltegebot für Rangierfahrten aufgehoben. Am Hauptsignal mit zwei roten Lichtern erlischt beim Aufleuchten des Signals Sh 1 ein rotes Licht.

**Meaning (EN):** Stop. Shown at a main signal or at a blocking signal (*Sperrsignal*), and applying to both train and shunting movements. If **Sh 1** (or **Ra 12**) is displayed at an Hp 0 signal, the stop command is lifted for shunting movements; at a main signal showing two red lights, one red light is extinguished when Sh 1 lights up.

> **Cross-reference:** Hp 0 as a pure colour-light aspect — a single red light — is also shown on p.13 (in the context of the combination/blocking signals). This is the same "Halt" aspect rendered on a modern light head.

**Maps to →** family `hauptsignale` · variant `formhauptsignal` + `lichthauptsignal` · aspect concept `danger`. Panels: `arm` (kind `stop`; one arm, or the upper arm of a two-arm head, horizontal) and/or `lamps` (one or two red lamps). Lamp colours: `red`.

---

### `Hp 1` — Fahrt · *Proceed*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Hp 1 |
| **German title** | Fahrt |
| **English** | Proceed |
| **Form** | Formsignal + Lichtsignal |
| **DS 301 ref** | AB 12 |
| **DV 301 ref** | § 3 (5), (6) |
| **Source** | SB-DBAG 2006 p.7 |

**Signalbild (DE):** *Formsignal:* Ein weißer, rotumrandeter Signalflügel – bei zweiflügligen Signalen der obere Flügel – zeigt schräg nach rechts aufwärts. *Bei Dunkelheit und Lichtsignal:* Ein grünes Licht.

**Signal picture (EN):** *Semaphore:* a white, red-bordered arm — on two-arm signals the upper arm — points diagonally upward to the right. *In darkness and as a colour-light signal:* one green light.

**Bedeutung (DE):** Das Signal erlaubt die Fahrt mit der im Fahrplan zugelassenen Geschwindigkeit, sofern sie nicht durch andere Signale oder besondere Anordnungen eingeschränkt ist.

**Meaning (EN):** The signal permits travel at the speed allowed in the timetable, unless restricted by other signals or special instructions. Applies to train movements only.

**Maps to →** family `hauptsignale` · variant `formhauptsignal` + `lichthauptsignal` · aspect concept `clear`. Panels: `arm` (kind `stop`; one arm, or the upper arm of a two-arm head, inclined up-right) and/or `lamps` (one green lamp). Lamp colours: `green`.

---

### `Hp 2` — Langsamfahrt · *Proceed at slow speed*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Hp 2 |
| **German title** | Langsamfahrt |
| **English** | Proceed at slow speed (40 km/h) |
| **Form** | Formsignal + Lichtsignal |
| **DS 301 ref** | AB 13 |
| **DV 301 ref** | § 3 (7)–(9) |
| **Source** | SB-DBAG 2006 p.8 |

**Signalbild (DE):** *Formsignal:* Zwei weiße, rotumrandete Signalflügel zeigen schräg nach rechts aufwärts. *Bei Dunkelheit und Lichtsignal:* Ein grünes und senkrecht darunter ein gelbes Licht.

**Signal picture (EN):** *Semaphore:* two white, red-bordered arms point diagonally upward to the right. *In darkness and as a colour-light signal:* one green light and, vertically below it, one yellow light.

**Bedeutung (DE):** Das Signal schreibt eine Geschwindigkeitsbeschränkung auf 40 km/h vor, wenn nicht eine abweichende Geschwindigkeit durch Signal »Zs 3« angezeigt wird. Die Geschwindigkeitsbeschränkung gilt vom Hauptsignal ab für den anschließenden Weichenbereich. Der Infrastrukturunternehmer kann andere abweichende Geschwindigkeiten bekannt geben.

**Meaning (EN):** The signal prescribes a speed restriction to 40 km/h, unless a differing speed is shown by signal **Zs 3**. The restriction applies from the main signal onward through the following pointwork (*Weichenbereich*). The infrastructure manager may publish other differing speeds (in the timetable or in the La).

**Maps to →** family `hauptsignale` · variant `formhauptsignal` + `lichthauptsignal` · aspect concept `slow-clear`. Panels: `arm` (kind `stop`; two arms inclined up-right) and/or `lamps` (green over yellow, vertical). Lamp colours: `green`, `yellow`.
