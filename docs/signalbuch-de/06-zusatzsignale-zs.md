# Zusatzsignale (Zs) — Supplementary signals

Supplementary signals (*Zusatzsignale*) add information to a movement authority that a main or distant signal cannot express on its own — a substitute "proceed" when the main signal is at stop or failed, a route or a speed to be taken through the pointwork ahead, a change to the wrong line, or the release of a restriction. Most are shown **at** a main or distant signal; a handful (route/speed announcers, the wrong-line indicator, the end-of-restriction arrow, the caution "V") may stand alone. They exist as colour-light *Lichtsignale*, as illuminated figures/letters, and as static plates (*Formsignale*/*Tafeln*).

**Intro — AB 36 / § 7 (1):** *Zusatzsignale gelten für Zugfahrten.* — "Supplementary signals apply to train movements" (but see signal **Zs 103**). Fixed supplementary signals are as a rule shown **at main and distant signals** (*Ortsfeste Zusatzsignale werden in der Regel an Haupt- und Vorsignalen gezeigt*). The signals **Zs 2 / Zs 4**, **Zs 2v**, **Zs 3**, **Zs 3v**, **Zs 6** and **Zs 10** and **Zs 7** may be shown standing alone (*können alleinstehend gezeigt werden*).

> **Two rulebooks, differing begriffe.** Several of these signals carry a different number in the former DR rulebook (DV 301): the *Richtungsanzeiger* is **Zs 2** in DS 301 but **Zs 4** in DV 301; the *Gegengleisanzeiger* is **Zs 6** (DS) / **Zs 7** (DV); the *Vorsichtsignal* is **Zs 7** (DS) / **Zs 11** (DV). Both begriffe are noted on each entry below.

---

### `Zs 1` — Ersatzsignal · *Substitute signal*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Zs 1 |
| **German title** | Ersatzsignal |
| **English** | Substitute signal |
| **Form** | Lichtsignal |
| **DS 301 ref** | ESO (21) (Auszug), AB 37 |
| **DV 301 ref** | § 7 (2), § 7 (3) |
| **Source** | SB-DBAG 2006 p.21 |

**Signalbild (DE):** An Form- und Lichthauptsignalen drei weiße Lichter in Form eines »A«. An Kombinationssignalen ein weißes Blinklicht.

**Signal picture (EN):** At semaphore and colour-light main signals, three white lights arranged in the shape of an "A". At combination signals (Ks), a single white **flashing** light.

**Bedeutung (DE):** Am Signal »Hp 0« oder am gestörten Hauptsignal ohne schriftlichen Befehl vorbeifahren. Das Ersatzsignal gilt auch, wenn es erlischt, bevor die Spitze des Zuges am Signal vorbeigefahren ist.

**Meaning (EN):** Pass the signal showing **Hp 0**, or a failed main signal, **without a written order**. The substitute signal remains in force even if it goes out before the head of the train has passed it.

**Maps to →** family `zusatzsignale` · variant `lichtsignal` · aspect concept `substitute`. Panel: `lamps` — three white lamps in an "A" arrangement; on a Ks head a single white lamp with `canFlash: true`. Lamp colours: `white`.

---

### `Zs 2` — Richtungsanzeiger · *Route-direction indicator*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Zs 2 (DV 301: Zs 4) |
| **German title** | Richtungsanzeiger |
| **English** | Route (direction) indicator |
| **Form** | Lichtsignal |
| **DS 301 ref** | AB 38 |
| **DV 301 ref** | § 10 (1), § 10 (3), § 10 (5) |
| **Source** | SB-DBAG 2006 p.21 |

**Signalbild (DE):** Ein weißleuchtender Buchstabe.

**Signal picture (EN):** A single white illuminated letter.

**Bedeutung (DE):** Die Fahrstraße führt in die angezeigte Richtung. Der Richtungsanzeiger gibt durch einen Kennbuchstaben an, für welche Fahrtrichtung oder für welches Streckengleis mehrerer nebeneinander verlaufenden Strecken das Hauptsignal auf Fahrt steht. Es wird auch angewendet, wenn dem Tf bei größeren Bahnhöfen die Einfahrt in einen bestimmten Bahnhofsteil (z.B. Rangier- oder Personenbahnhof) angezeigt werden soll. Der Infrastrukturunternehmer gibt die verwendeten Kennbuchstaben bekannt. *Zusatz:* Die verwendeten Buchstaben sind im Fahrplan enthalten. Außerdem können die verwendeten Buchstaben in den Örtlichen Richtlinien zur KoRil 408.01-09 enthalten sein.

**Meaning (EN):** The route leads in the indicated direction. By means of an identifying letter the indicator shows for which direction of travel — or for which of several parallel running lines — the main signal is at proceed. It is also used at larger stations to show the driver (*Tf*) entry into a particular part of the station (e.g. the marshalling yard or the passenger station). The infrastructure manager publishes the letters used. *Zusatz:* the letters used are given in the timetable, and may also appear in the local directives to KoRil 408.01-09.

> **Begriff difference:** DV 301 numbers this signal **Zs 4**.

**Maps to →** family `zusatzsignale` · variant `richtungsanzeiger` · concept `route-direction`. Panel: `glyph` (white illuminated letter, `tone: 'white'`).

---

### `Zs 2v` — Richtungsvoranzeiger · *Route-direction announcer*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Zs 2v |
| **German title** | Richtungsvoranzeiger |
| **English** | Route-direction announcer (expect route indicator) |
| **Form** | Lichtsignal |
| **DS 301 ref** | — |
| **DV 301 ref** | § 10 (4), § 10 (5) |
| **Source** | SB-DBAG 2006 p.21 |

**Signalbild (DE):** Ein gelbleuchtender Buchstabe.

**Signal picture (EN):** A single yellow illuminated letter.

**Bedeutung (DE):** Richtungsanzeiger Signal Zs 2 (DV 301: Signal Zs 4) erwarten. *§ 10 (5):* Der Richtungsanzeiger darf bis auf weiteres auch weißleuchtend sein.

**Meaning (EN):** Expect route-direction indicator **Zs 2** (DV 301: **Zs 4**). *§ 10 (5):* the announcer may, until further notice, also be shown white-illuminated.

**Maps to →** family `zusatzsignale` · variant `richtungsvoranzeiger` · concept `route-direction`. Panel: `glyph` (illuminated letter, `tone: 'yellow'` — the announce/advance variant).

---

### `Zs 3` — Geschwindigkeitsanzeiger · *Speed indicator*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Zs 3 |
| **German title** | Geschwindigkeitsanzeiger |
| **English** | Speed indicator |
| **Form** | Formsignal + Lichtsignal |
| **DS 301 ref** | AB 38a, AB 39, AB 40, AB 41 |
| **DV 301 ref** | § 9 (1), § 9 (2), § 9 (3), § 9 (4), § 9 (4a) |
| **Source** | SB-DBAG 2006 p.22 |

**Signalbild (DE):** *Formsignal:* Eine weiße Kennziffer auf dreieckiger schwarzer Tafel mit weißem Rand. Die Tafel steht in der Regel auf der Spitze; bei beschränkten Platzverhältnissen kann die Spitze nach oben zeigen. Das Formsignal an Lichthauptsignalen zeigt mit der Spitze nach oben. *Lichtsignal:* Eine weißleuchtende Kennziffer. Das Signal ist rückstrahlend oder bei Dunkelheit beleuchtet, es kann bis auf weiteres nicht rückstrahlend oder beleuchtet sein.

**Signal picture (EN):** *Form signal:* a white figure on a triangular black board with a white border. The board normally stands **point-down**; where space is restricted the point may face upward, and at colour-light main signals the form board points upward. *Colour-light:* a white illuminated figure. The signal is retroreflective or, in darkness, illuminated (until further notice it may be neither).

**Bedeutung (DE):** Die durch die Kennziffer bzw. Kennzahl angezeigte Geschwindigkeit darf vom Signal ab im anschließenden Weichenbereich nicht überschritten werden. Die gezeigte Kennziffer bedeutet, dass der zehnfache Wert in km/h als Fahrgeschwindigkeit zugelassen ist. Das Signal wird auch an Blocksignalen selbsttätiger Blockstellen (Sbk) angewendet, wenn das nächste Signal im verkürzten Bremswegabstand folgt; in diesem Fall gilt die angezeigte Geschwindigkeit bei Vorbeifahrt der Spitze des Zuges am Signal. Die Kennziffer 3 kann anzeigen, dass in Stumpfgleise eingefahren wird oder dass ein ausreichender Durchrutschweg fehlt. Die Kennziffern 1 und 2 können anzeigen, dass besonders früh zu halten oder in ein besetztes Gleis einzufahren ist.

**Meaning (EN):** The speed shown by the figure (or figures) must not be exceeded from the signal onward through the following pointwork (*Weichenbereich*). The figure means that **ten times** its value in km/h is the permitted running speed (e.g. "6" = 60 km/h). It is also used at the block signals of automatic block posts (*Sbk*) where the next signal follows at a shortened braking distance, in which case the shown speed applies as the head of the train passes the signal. The figure **3** can indicate entry into a stub track or that an adequate overlap is lacking; the figures **1** and **2** can indicate that a train must stop especially early or is entering an occupied track. Where a further **Zs 3** within the pointwork shows a different speed, that speed applies to the end of the pointwork; a restriction can also be lifted early by a stand-alone **Zs 3** (see AB 41 / § 9 (4a)).

**Maps to →** family `zusatzsignale` · variant `geschwindigkeitsanzeiger` · concept `speed-limit`. Panel: `glyph` (white figure on a downward-pointing black triangle, `tone: 'white'`); light form is the same figure illuminated white.

---

### `Zs 3v` — Geschwindigkeitsvoranzeiger · *Speed announcer*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Zs 3v |
| **German title** | Geschwindigkeitsvoranzeiger |
| **English** | Speed announcer (expect speed indicator) |
| **Form** | Formsignal + Lichtsignal |
| **DS 301 ref** | AB 42 bis AB 45 (bleiben frei) |
| **DV 301 ref** | § 9 (5), § 9 (6), § 9 (7) |
| **Source** | SB-DBAG 2006 p.22 |

**Signalbild (DE):** *Formsignal:* Eine gelbe Kennziffer auf dreieckiger schwarzer Tafel mit gelbem Rand. Das Formsignal ist rückstrahlend. *Lichtsignal:* Eine gelbleuchtende Kennziffer.

**Signal picture (EN):** *Form signal:* a yellow figure on a triangular black board with a yellow border; the form signal is retroreflective. *Colour-light:* a yellow illuminated figure.

**Bedeutung (DE):** Geschwindigkeitsanzeiger »Zs 3« zu erwarten. Die gezeigte Kennziffer bedeutet, dass der zehnfache Wert in km/h als Fahrgeschwindigkeit zugelassen ist.

**Meaning (EN):** Expect speed indicator **Zs 3**. The figure shown means that **ten times** its value in km/h is the permitted running speed.

**Maps to →** family `zusatzsignale` · variant `geschwindigkeitsvoranzeiger` · concept `speed-limit`. Panel: `glyph` (figure on a triangular black board, `tone: 'yellow'` — the announce/advance variant).

---

### `Zs 6` — Gegengleisanzeiger · *Wrong-line indicator*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Zs 6 (DV 301: Zs 7) |
| **German title** | Gegengleisanzeiger |
| **English** | Wrong-line indicator |
| **Form** | Formsignal + Lichtsignal |
| **DS 301 ref** | AB 46, AB 47 |
| **DV 301 ref** | § 12 (1), § 12 (2), § 12 (3) |
| **Source** | SB-DBAG 2006 p.23 |

**Signalbild (DE):** *Lichtsignal:* Ein weißer Lichtstreifen, dessen Enden nach oben und unten abgebogen sind. Die Enden können bis auf weiteres nicht abgewinkelt sein. *Formsignal:* Eine rechteckige, schwarze Scheibe mit schwarzem Rand und einem weißen von rechts nach links steigenden Streifen, dessen Enden senkrecht abgewinkelt sind. Das Formsignal ist rückstrahlend.

**Signal picture (EN):** *Colour-light:* a white strip of light whose ends are bent up and down (until further notice the ends may be un-angled). *Form signal:* a rectangular black disc with a black border and a white strip rising from right to left, its ends bent vertically; the form signal is retroreflective.

**Bedeutung (DE):** Der Fahrweg führt in das benachbarte durchgehende Hauptgleis. Der Gegengleisanzeiger zeigt an, dass auf zweigleisiger Strecke das Gleis entgegen gewöhnlicher Fahrtrichtung befahren werden darf. Der Auftrag gilt bis zum nächsten Bahnhof. Liegt davor eine Abzweig- oder Überleitstelle, gilt der Auftrag bis dahin. Wird das Signal vorübergehend angewendet, wird dies bei den Eisenbahnen des Bundes durch das Infrastrukturunternehmen bekannt gegeben; bei NE-Bahnen wird in einer betrieblichen Anweisung des Betriebsleiters darauf hingewiesen. *Zusatz:* Bei den Eisenbahnen des Bundes erfolgt die Bekanntgabe in der La.

**Meaning (EN):** The route leads onto the adjacent through main line. On a double-track line the indicator shows that the track may be run **against the normal direction of travel** (i.e. wrong line). The authority is valid to the next station; if a junction or crossover (*Abzweig- oder Überleitstelle*) lies before it, only as far as there. Temporary use is announced by the infrastructure manager (federal railways — in the La) or, on non-federal railways, by an operating instruction of the operations manager.

> **Begriff difference:** DV 301 numbers this signal **Zs 7**.

**Maps to →** family `zusatzsignale` · variant `gegengleisanzeiger` · concept `wrong-line`. Panel: `lamps` — a white bent light-strip (render as a shaped `sign`/`lamps` element); form variant is a `sign` (rectangular black disc with rising white strip). Lamp colours: `white`.

---

### `Zs 7` — Vorsichtsignal · *Caution (proceed on sight)*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Zs 7 (DV 301: Zs 11) |
| **German title** | Vorsichtsignal |
| **English** | Caution signal (proceed on sight) |
| **Form** | Lichtsignal |
| **DS 301 ref** | AB 47a |
| **DV 301 ref** | § 13a (1), § 13a (3), § 13a (4) |
| **Source** | SB-DBAG 2006 p.23 |

**Signalbild (DE):** Drei gelbe Lichter in Form eines »V« am Signalmast von Hauptsignalen.

**Signal picture (EN):** Three yellow lights arranged in the shape of a "V", on the mast of a main signal.

**Bedeutung (DE):** Am Signal »Hp 0« oder gestörten Lichthauptsignal ohne schriftlichen Befehl vorbeifahren. Weiterfahrt auf Sicht. (DV: Am "Halt" zeigenden oder gestörten Hauptsignal vorbeifahren. Weiterfahrt auf Sicht.) Der Auftrag, auf Sicht weiterzufahren, gilt bis zum nächsten Hauptsignal. Es gilt weiter, auch wenn es erlischt, bevor die Spitze des Zuges daran vorbeigefahren ist. *Zusatz:* Für das Verhalten nach der Vorbeifahrt sind — bei der S-Bahn Berlin die Ril 432 (SBS) und — bei der S-Bahn Hamburg die Örtlichen Richtlinien zur KoRil 408.01-09 zu beachten.

**Meaning (EN):** Pass the signal at **Hp 0** (or a failed colour-light main signal) **without a written order** and **proceed on sight** (*auf Sicht*). The order to run on sight is valid to the next main signal, and it remains in force even if it goes out before the head of the train has passed it. *Zusatz:* conduct after passing follows Ril 432 (SBS) on the Berlin S-Bahn and the local directives to KoRil 408.01-09 on the Hamburg S-Bahn.

> **Begriff difference:** DV 301 numbers this signal **Zs 11**.

**Maps to →** family `zusatzsignale` · variant `vorsichtsignal` · aspect concept `proceed-on-sight`. Panel: `lamps` — three yellow lamps in a "V" arrangement. Lamp colours: `yellow`.

---

### `Zs 8` — Gegengleisfahrt-Ersatzsignal · *Wrong-line substitute signal*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Zs 8 |
| **German title** | Gegengleisfahrt-Ersatzsignal |
| **English** | Wrong-line substitute signal |
| **Form** | Lichtsignal |
| **DS 301 ref** | AB 47b |
| **DV 301 ref** | § 12 (4), § 12 (7), § 12 (9) |
| **Source** | SB-DBAG 2006 p.24 |

**Signalbild (DE):** Drei blinkende weiße Lichter in Form eines »A«. (Als Lichtstreifenform:) Ein weißblinkender Lichtstreifen von rechts nach links steigend.

**Signal picture (EN):** Three **flashing** white lights in the shape of an "A". (In strip form:) a white **flashing** light-strip rising from right to left.

**Bedeutung (DE):** Am "Halt" zeigenden oder gestörten Hauptsignal vorbeifahren. Fahrweg führt in das Streckengleis entgegen der gewöhnlichen Fahrtrichtung. Das Signal »Zs 8« gibt den Auftrag, auf zweigleisiger Strecke das Gleis entgegen der gewöhnlichen Fahrtrichtung zu befahren. Der Auftrag gilt bis zum nächsten Bahnhof. Liegt davor eine Abzweig- oder Überleitstelle, gilt der Auftrag nur bis dahin. Das Signal gilt auch, bevor die Spitze des Zuges am Signal vorbeigefahren ist.

**Meaning (EN):** Pass the main signal showing "Halt" (or a failed main signal); the route leads onto the running line **against the normal direction of travel** (wrong line). Zs 8 gives the authority, on a double-track line, to run the track against the normal direction. The authority is valid to the next station; if a junction or crossover lies before it, only as far as there. The signal remains in force even before the head of the train has passed it.

**Maps to →** family `zusatzsignale` · variant `gegengleisfahrt-ersatzsignal` · aspect concept `wrong-line`. Panel: `lamps` — three white lamps in an "A" (or a shaped white strip), all `canFlash: true`. Lamp colours: `white`.

---

### `Zs 10` — Endesignal · *End-of-restriction signal*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Zs 10 |
| **German title** | Endesignal |
| **English** | End-of-(speed-)restriction signal |
| **Form** | Formsignal + Lichtsignal |
| **DS 301 ref** | AB 47c, AB 47e, AB 47f (AB 47d bleibt frei) |
| **DV 301 ref** | — |
| **Source** | SB-DBAG 2006 p.24 |

**Signalbild (DE):** *Formsignal:* Ein weißer Pfeil mit der Spitze nach oben zeigend, auf pfeilförmiger, schwarzer Tafel. Das Formsignal ist rückstrahlend. *Lichtsignal:* Ein weißleuchtender Pfeil mit der Spitze nach oben.

**Signal picture (EN):** *Form signal:* a white arrow pointing upward on an arrow-shaped black board; the form signal is retroreflective. *Colour-light:* a white illuminated upward arrow.

**Bedeutung (DE):** Ende der Geschwindigkeitsbeschränkung. Das Signal »Zs 10« gilt nur für Zugfahrten auf Hauptsignal und zeigt an, dass eine mit Signal »Hp 2« oder mit Signal »Zs 3« vorgeschriebene Geschwindigkeitsbeschränkung bereits vor dem Ende des anschließenden Weichenbereichs aufgehoben ist. Innerhalb eines anschließenden Weichenbereichs können mehrere Signale »Zs 10« für verschiedene Fahrwege aufgestellt sein.

**Meaning (EN):** End of the speed restriction. Zs 10 applies only to train movements running on a main-signal authority and shows that a restriction prescribed by **Hp 2** or **Zs 3** is lifted **before** the end of the following pointwork. Several Zs 10 signals for different routes may stand within one pointwork area.

**Maps to →** family `zusatzsignale` · variant `endesignal` · concept `end-of-restriction`. Panel: `sign` (`kind: 'de-endesignal'`) — white upward arrow on an arrow-shaped black board; the light form is the same arrow illuminated white.

---

### `Zs 12` — M-Tafel · *"M" board (verbal-order pass)*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Zs 12 |
| **German title** | M-Tafel |
| **English** | "M" board — pass on verbal order |
| **Form** | Formsignal |
| **DS 301 ref** | AB 47g |
| **DV 301 ref** | § 13b (1), § 13b (2) |
| **Source** | SB-DBAG 2006 p.24 |

**Signalbild (DE):** Eine weiße Tafel mit rotem Rand und rotem »M« in Schreibschrift.

**Signal picture (EN):** A white board with a red border and a red cursive "M".

**Bedeutung (DE):** Am "Halt" zeigenden oder gestörten Hauptsignal auf mündlichen oder fernmündlichen Auftrag vorbeifahren. Züge dürfen nach dem Halten am Halt zeigenden oder gestörten Hauptsignal auf mündlichen oder fernmündlichen Auftrag des Fahrdienstleiters vorbeifahren. Der Fahrdienstleiter darf zur Übermittlung seines Auftrages eine örtliche Aufsicht beauftragen.

**Meaning (EN):** Pass the main signal showing "Halt" (or a failed main signal) on a **verbal or telephoned order**. After stopping at such a signal, trains may pass on the signalman's (*Fahrdienstleiter*) verbal or telephoned order; the signalman may delegate a local supervisor to convey the order.

**Maps to →** family `zusatzsignale` · variant `m-tafel` · concept `pass-on-verbal-order`. Panel: `sign` (`kind: 'de-m-tafel'`) — white plate, red border, red cursive "M". Static, no aspect state.

---

### `Zs 13` — Stumpfgleis- und Frühhaltanzeiger · *Stub-track / early-stop indicator*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Zs 13 |
| **German title** | Stumpfgleis- und Frühhaltanzeiger |
| **English** | Stub-track and early-stop indicator |
| **Form** | Formsignal + Lichtsignal |
| **DS 301 ref** | AB 47h, AB 47i |
| **DV 301 ref** | § 11 (5), § 11 (6), § 11 (7) |
| **Source** | SB-DBAG 2006 p.25 |

**Signalbild (DE):** *Formsignal:* Ein um 90° nach links umgelegtes, gelbes, rückstrahlendes »T« auf einer rechteckigen schwarzen Scheibe. *Lichtsignal:* Ein um 90° nach links umgelegtes, gelbleuchtendes »T«.

**Signal picture (EN):** *Form signal:* a yellow, retroreflective "T" laid 90° to the left (i.e. on its side) on a rectangular black disc. *Colour-light:* the same sideways-left illuminated yellow "T".

**Bedeutung (DE):** Fahrt in ein Stumpfgleis oder in ein Gleis mit verkürztem Einfahrweg. Dieser Anzeiger erscheint am Hauptsignal für die Einfahrt eines Zuges in — ein Stumpfgleis (Stumpfgleise in Kopfbahnhöfen ausgenommen), — ein durch Signale abschnittsweise unterteiltes Gleis, wenn der Einfahrweg verkürzt ist, oder — ein anderes Gleis, wenn der Einfahrweg um mehr als 30 % kürzer als bei den übrigen Einfahrten ist. Das Signal wird nicht angewendet, wenn das Signal »Zs 3« gemäß AB 39 / § 9 (4) Sätze 3 und 4 gezeigt wird.

**Meaning (EN):** Movement into a stub track or into a track with a shortened entry route. The indicator appears at the main signal for a train entering: a stub track (except stub tracks in terminal stations); a track subdivided into sections by signals, where the entry route is shortened; or another track whose entry route is more than 30 % shorter than the other entries. It is **not** used where **Zs 3** is shown per AB 39 / § 9 (4) sentences 3 and 4.

**Maps to →** family `zusatzsignale` · variant `stumpfgleisanzeiger` · concept `stub-track`. Panel: `sign` (`kind: 'de-zs13'`) — sideways-left yellow "T" on a rectangular black disc; light form is the same "T" illuminated yellow.

---

### `Zs 103` — Rautentafel · *Diamond board*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Zs 103 |
| **German title** | Rautentafel |
| **English** | Diamond board |
| **Form** | Formsignal |
| **DS 301 ref** | — |
| **DV 301 ref** | § 70 (6), § 70 (7) |
| **Source** | SB-DBAG 2006 p.25 |

**Signalbild (DE):** Eine rechteckige schwarze Tafel mit weißen Rauten.

**Signal picture (EN):** A rectangular black board bearing white diamonds (lozenges).

**Bedeutung (DE):** Das Halt zeigende Hauptsignal gilt nicht für Rangierabteilungen. Die Rautentafel ist am Hauptsignal angebracht.

**Meaning (EN):** The main signal showing "Halt" does **not** apply to shunting movements (*Rangierabteilungen*). The diamond board is fixed at the main signal. (Note per AB 36 / § 7 (1): Zs 103 is the exception to the rule that supplementary signals apply to train movements.)

**Maps to →** family `zusatzsignale` · variant `rautentafel` · concept `shunting-exempt`. Panel: `sign` (`kind: 'de-rautentafel'`) — rectangular black plate with white diamonds. Static, no aspect state.

---

### `Zs 9` — Bahnübergangstafel (Bü-Tafel) · *Level-crossing board*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Zs 9 |
| **German title** | Bahnübergangstafel (Bü-Tafel) |
| **English** | Level-crossing board |
| **Form** | Formsignal |
| **DS 301 ref** | — |
| **DV 301 ref** | § 13 (1), § 13 (2), § 13 (3) |
| **Source** | SB-DBAG 2006 p.72 |

**Signalbild (DE):** Eine dreieckige, weiße Tafel mit rotem Rand und schwarzem Gatter.

**Signal picture (EN):** A triangular white board with a red border and a black gate symbol.

**Bedeutung (DE):** Nach dem zulässigen Vorbeifahren an dem Halt zeigendem oder gestörtem Lichthauptsignal: Halt vor dem Bahnübergang! – Weiterfahrt nach Sicherung. Die Bahnübergangstafel steht vor einem weiß-gelb-weiß-gelb-weißem, rotem oder weiß-schwarz-weiß-schwarz-weißem Mastschild gekennzeichneten Lichthauptsignal, das nur dann einen Fahrtbegriff zeigen kann, wenn der Bahnübergang technisch gesichert ist. Gilt die Bahnübergangstafel für mehrere Bahnübergänge, so ist die entsprechende Anzahl als schwarze Zahl im Signal »Zs 9« dargestellt; die genannten Verhaltensregeln gelten dann für jeden dieser Bahnübergänge.

**Meaning (EN):** After a permitted pass of a colour-light main signal showing "Halt" (or a failed one): **stop before the level crossing!** — proceed only once it is secured (*Weiterfahrt nach Sicherung*). The board stands ahead of a colour-light main signal identified by a white-yellow-white-yellow-white, a red, or a white-black-white-black-white mast plate — a signal that can show a proceed aspect only when the crossing is technically protected. If the board applies to **several** crossings, the corresponding count is shown as a black figure within Zs 9, and the rules then apply to each of those crossings.

**Maps to →** family `zusatzsignale` · variant `bahnuebergangstafel` · concept `stop-before-crossing`. Panel: `sign` (`kind: 'de-bue-tafel'`) — triangular white board, red border, black gate symbol (optionally overlaid with a black count figure). Static, no aspect state.
