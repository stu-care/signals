# Signale an Zügen und einzelnen Fahrzeugen (Zg / Fz) — Signals on trains & individual vehicles

Train and vehicle signals (*Signale an Zügen und einzelnen Fahrzeugen*) are the lights and boards carried **on the rolling stock itself**, not on the lineside. They mark where a train begins and ends (head and tail signals), identify a locomotive working in the shunting service, and warn that a stabled vehicle is occupied by staff. Unlike the lineside signals in earlier chapters, most of these have no separate day symbol (*Tageszeichen*) — the night symbol (*Nachtzeichen*) of white or red lights is simply carried by day and night alike.

**Intro — ESO (43) / § 45 (1):** *Die Signale kennzeichnen Züge und auf die freie Strecke übergehende Nebenfahrzeuge mit Kraftantrieb.* — "The signals identify trains and power-driven auxiliary vehicles (*Nebenfahrzeuge*) that pass out onto the open line." Signals on individual vehicles (ESO (44) / § 47 (1)) additionally identify **(a)** shunting locomotives and **(b)** vehicles whose occupation requires special precautions.

---

### `Zg 1` — Spitzensignal · *Head signal*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Zg 1 |
| **German title** | Spitzensignal |
| **English** | Head signal — marking of the front of the train |
| **Form** | Fahrzeugsignal (Lichter) |
| **DS 301 ref** | ESO (43), AB 178–180 |
| **DV 301 ref** | § 45 (2)–(5) |
| **Source** | SB-DBAG 2006 p.56 |

**Signalbild (DE):** *Kennzeichnung der Zugspitze.* **Tageszeichen:** Kein besonderes Signal. **Nachtzeichen:** a) Vorn am ersten Fahrzeug, wenn dieses ein Tfz oder Steuerwagen ist, drei weiße Lichter in Form eines »A« (Dreilicht-Spitzensignal). b) Vorn am ersten Fahrzeug, wenn dieses nicht ein Tfz oder Steuerwagen ist, zwei weiße Lichter in gleicher Höhe. Bei nachgeschobenen Zügen trägt auch das Schiebetriebfahrzeug das Spitzensignal, sofern es nicht mit dem Zug gekuppelt ist. Die Nachtzeichen sind auch am Tage zu führen. Nebenfahrzeuge, an denen wegen ihrer niedrigen Bauart das obere Licht des Signals »Zg 1a« nicht angebracht werden kann, führen das Signal »Zg 1b«.

**Signal picture (EN):** Marking of the front of the train. **Day symbol:** no special signal. **Night symbol:** a) at the front of the first vehicle, when that vehicle is a traction unit (*Tfz*) or a driving-trailer/cab car (*Steuerwagen*), three white lights arranged in the shape of an "A" (three-light head signal, *Dreilicht-Spitzensignal*) — this is variant **Zg 1a**; b) at the front of the first vehicle, when it is **not** a traction unit or cab car, two white lights at the same height. With banked trains the banking locomotive also carries the head signal, unless it is coupled to the train. The night symbols are to be carried by day as well. Auxiliary vehicles whose low build means the upper light of **Zg 1a** cannot be fitted carry signal **Zg 1b** (the two lower lights only).

**Bedeutung (DE):** Kennzeichnung der Zugspitze — der Zug beginnt hier; das Spitzensignal weist die Front des Zuges bzw. der auf die freie Strecke übergehenden Fahrzeuge aus.

**Meaning (EN):** Marks the head of the train — the train (or a power-driven auxiliary vehicle running onto the open line) begins here. The three-light "A" (Zg 1a) is the normal head marking on a traction unit or cab car; two level white lights (Zg 1b) are used otherwise.

**Maps to →** family `signale-an-zuegen-fahrzeugen` · variant `spitzensignal` (sub-variants `zg1a` three-light "A", `zg1b` two level lights) · aspect concept `head-lights`. Panel: `lamps` — three white `LampSlot`s in an "A" (two low, one high-centre) for Zg 1a; two white lamps level for Zg 1b. Lamp colour: `white`. Vehicle-mounted, always shown (no dark state).

---

### `Zg 2` — Schlusssignal · *Tail signal*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Zg 2 |
| **German title** | Schlusssignal |
| **English** | Tail signal — marking of the rear of the train |
| **Form** | Fahrzeugsignal (Tafeln / Lichter) |
| **DS 301 ref** | ESO (43), ESO (43a), AB 181–186 |
| **DV 301 ref** | § 45 (2), § 46 (2)–(6) |
| **Source** | SB-DBAG 2006 p.56 |

**Signalbild (DE):** *Kennzeichnung des Zugschlusses.* **Tageszeichen:** Am letzten Fahrzeug eine rot-weiße oder eine rot-gelbe Tafel oder zwei rot-weiße oder rot-gelbe Tafeln oder das Nachtzeichen des Signals. **Nachtzeichen:** Am letzten Fahrzeug ein rotes Licht oder zwei rote Lichter oder eine rückstrahlende Tafel des Tageszeichens oder zwei rückstrahlende Tafeln des Tageszeichens. Das Nachtzeichen mit rotem Licht darf blinken.

**Signal picture (EN):** Marking of the rear of the train. **Day symbol:** on the last vehicle a red-and-white or a red-and-yellow board, or two such boards, or the night symbol of the signal. **Night symbol:** on the last vehicle one red light or two red lights, or one (or two) retro-reflective board(s) of the day symbol. The night symbol with a red light may flash. The tail signal need only be visible from behind; where two symbols are used they must stand at the same height and (Zusatz) must always be two identical symbols.

**Bedeutung (DE):** Kennzeichnung des Zugschlusses — der Zug endet hier; das Signal zeigt, dass der Zug vollständig ist.

**Meaning (EN):** Marks the tail of the train — the train ends here, confirming to staff that the train is complete. A single board or light may be carried by goods trains (not on the federal railways' lines), light-engine movements, the loco at the rear of a banked train, works trains, other trains where the infrastructure manager so decides, and auxiliary vehicles; the signal is fitted to the rear of the last vehicle, as far to the right as possible.

**Maps to →** family `signale-an-zuegen-fahrzeugen` · variant `schlusssignal` · aspect concept `tail-marker`. Panel: `sign` for the red-white / red-yellow board(s) (`kind: 'de-zg2-board'`), or `lamps` for the red-light night symbol (one or two `white`→ here `red` `LampSlot`s; may flash). Lamp colour: `red`. Vehicle-mounted.

---

### `Fz 1` — Rangierlokomotivsignal · *Shunting-locomotive signal*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Fz 1 |
| **German title** | Rangierlokomotivsignal |
| **English** | Shunting-locomotive marking |
| **Form** | Fahrzeugsignal (Lichter) |
| **DS 301 ref** | ESO (44), AB 187–187a |
| **DV 301 ref** | § 47 (2)–(4) |
| **Source** | SB-DBAG 2006 p.57 |

**Signalbild (DE):** *Kennzeichnung einer Lokomotive im Rangierdienst.* **Tageszeichen:** Kein besonderes Signal. **Nachtzeichen:** Vorn und hinten ein weißes Licht, in der Regel in Höhe der Puffer. Statt des vorderen Lichtes kann auch das Spitzensignal »Zg 1a« geführt werden; es muß geführt werden, wenn Bahnübergänge ohne techn. Sicherung oder ohne Sicherung durch Posten befahren werden. Wenn beim Rangieren Bahnübergänge ohne technische Sicherung oder ohne Sicherung durch Posten befahren werden müssen, wird das Signal »Zg 1« auch bei Tage geführt.

**Signal picture (EN):** Marking of a locomotive in the shunting service. **Day symbol:** no special signal. **Night symbol:** one white light at the front and one at the rear, as a rule at buffer height. Instead of the front light the head signal **Zg 1a** may be carried; it **must** be carried where level crossings without technical protection, or without protection by a look-out (*Posten*), are traversed. The signal is also carried by power-driven auxiliary vehicles. When shunting has to pass over such unprotected level crossings, signal **Zg 1** is carried by day as well.

**Bedeutung (DE):** Kennzeichnung einer Lokomotive im Rangierdienst — die Lokomotive fährt im Rangierdienst.

**Meaning (EN):** Marks a locomotive working in the shunting service — a white light front and rear identifies the loco as a shunting movement.

**Maps to →** family `signale-an-zuegen-fahrzeugen` · variant `rangierlokomotivsignal` · aspect concept `shunt-loco-marker`. Panel: `lamps` — one white `LampSlot` front and one rear (buffer height). Lamp colour: `white`. Vehicle-mounted.

---

### `Fz 2` — Gelbe Fahne · *Yellow flag*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Fz 2 |
| **German title** | Gelbe Fahne |
| **English** | Yellow flag — occupied stabled vehicle |
| **Form** | Fahrzeugsignal (Fahne / Tafel) |
| **DS 301 ref** | ESO (44), AB 188–189 |
| **DV 301 ref** | § 48 (1)–(3) |
| **Source** | SB-DBAG 2006 p.58 |

**Signalbild (DE):** *Kennzeichnung von Wagen, die während eines Stilllagers mit Personal besetzt sind. Das Signal wird geführt, solange sich die Wagen nicht im Zug befinden.* **Tageszeichen:** An jeder Langseite eine gelbe Fahne oder gelbe Tafel. **Nachtzeichen:** Das Tageszeichen, außerdem der Wagen nach außen erkennbar im Innern beleuchtet. Das Signal wird vom Personal angebracht.

**Signal picture (EN):** Marking of wagons/coaches that are occupied by staff while stabled (*während eines Stilllagers*). The signal is carried for as long as the vehicles are not in the train. **Day symbol:** on each long side a yellow flag or yellow board. **Night symbol:** the day symbol, and in addition the vehicle lit inside so as to be recognisable from outside. The signal is put up by the staff themselves.

**Bedeutung (DE):** Kennzeichnung von Wagen, die während eines Stilllagers mit Personal besetzt sind — besondere Vorsichtsmaßnahmen erforderlich.

**Meaning (EN):** Marks vehicles occupied by personnel while stabled — special precautions are required (the vehicles must not be moved or shunted against without care). Carried only while the vehicles are out of the train.

**Maps to →** family `signale-an-zuegen-fahrzeugen` · variant `gelbe-fahne` · aspect concept `occupied-vehicle`. Panel: `sign` — a yellow flag / yellow board on each long side (`kind: 'de-fz2'`); night symbol adds interior lighting. No aspect state. Vehicle-mounted.

> **Note:** ESO (45) *(bleibt frei)*. AB 190 to AB 198 remain reserved *(bleiben frei)*.

---

*Generated from the source scan; translations are provided for study/reference and are not an official DB translation.*
