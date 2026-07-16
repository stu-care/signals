# Fahrleitungssignale (El) — Overhead-line signals

Overhead-line signals (*Fahrleitungssignale*) govern the electric traction unit's use of the contact system. They mark overhead-line protection sections (*Schutzstrecken*), interruptions and de-energised or faulty sections, and the end of the overhead line; they order the main switch off and on again and the pantograph down and up. All are static form boards: a blue square standing on its point (diamond), edged white-and-black, carrying a white symbol.

**Intro — ESO (41) / § 15 (1)–(2):** *Die Fahrleitungssignale kennzeichnen Fahrleitungs-Schutzstrecken, Fahrleitungs-Unterbrechungen, gestörte Fahrleitungs-Abschnitte und das Ende der Fahrleitung.* — "The overhead-line signals mark contact-line protection sections, contact-line interruptions, faulty contact-line sections and the end of the contact line." *Zusatz:* they also mark switched-off (de-energised) sections. They consist of a blue square board standing on its point, edged in white and black, bearing white signal symbols (§ 15 (2)), and apply to electric operation with overhead line or conductor rail (AB 155 / § 15 (2a)). At a junction, an arrow above the signal may show for which direction it applies (AB 156 / § 15 (3)). Signals **El 1v**, **El 1** and **El 2** are fixed in place (AB 156a / § 16 (1)) and, at protection sections, are illuminated in darkness (§ 16 (2)); a temporary switch-off is marked by a variable **El 1** / **El 2** (AB 157).

**System change (*Systemwechsel*):** near a change of traction system the signal may be supplemented by a blue diamond plate bearing either a white sine curve (start of an **AC** system, *Wechselstromsystem-Anfang*, optionally with a voltage figure above it) or two horizontal white stripes (start of a **DC** system, *Gleichstromsystem-Anfang*). The traction unit may only switch on / re-raise its pantographs again after the system change (AB 162 / § 16 (8); AB 173a / § 17 (12)).

---

### `El 1v` — Signal El 1 erwarten · *Expect signal El 1*

| Field | Value |
|-------|-------|
| **Signalbegriff** | El 1v |
| **German title** | Signal El 1 erwarten |
| **English** | Expect signal El 1 |
| **Form** | Formsignal |
| **DS 301 ref** | AB 158a |
| **DV 301 ref** | § 16 (2a)–(2c) |
| **Source** | SB-DBAG 2006 p.53 |

**Signalbild (DE):** *Formsignal:* Zwei weiße auf der Schmalseite stehende Rechtecke waagerecht nebeneinander. Auf einer auf der Spitze stehenden, weiß und schwarz umrandeten blauen quadratischen Tafel.

**Signal picture (EN):** *Form signal:* two white rectangles stood on their short (narrow) side, side by side horizontally, on a blue square board standing on its point and edged white-and-black.

**Bedeutung (DE):** Signal »El 1« erwarten. Das Signal wird bei einfachen örtlichen Verhältnissen nicht gezeigt und steht in der Regel im halben Bremswegabstand der Strecke vor dem Signal »El 1«. Es ist beleuchtet oder rückstrahlend.

**Meaning (EN):** Expect signal **El 1** (announces the switch-off signal). It is omitted where local conditions are simple and normally stands at half the line's braking distance ahead of **El 1**. It is illuminated or retro-reflective.

**Maps to →** family `fahrleitungssignale` · variant `formsignal` · aspect concept `power-off-announce`. Panel: `sign` (static, no aspect state; `kind: 'de-el1v'` — two upright white rectangles on a **blue** diamond ground, white/black edge). No lamps (a night lamp only illuminates the same static board).

---

### `El 1` — Ausschaltsignal · *Switch-off signal*

| Field | Value |
|-------|-------|
| **Signalbegriff** | El 1 |
| **German title** | Ausschaltsignal — Ausschalten des Hauptschalters vom Tfz |
| **English** | Switch-off signal — switch off the traction unit's main switch |
| **Form** | Formsignal |
| **DS 301 ref** | AB 159, AB 160 |
| **DV 301 ref** | § 16 (3)–(4a) |
| **Source** | SB-DBAG 2006 p.53 |

**Signalbild (DE):** *Formsignal:* Ein zerlegtes, weißes »U«. Auf einer auf der Spitze stehenden, weiß und schwarz umrandeten blauen quadratischen Tafel.

**Signal picture (EN):** *Form signal:* a broken (split-apart) white "U", on a blue diamond board edged white-and-black.

**Bedeutung (DE):** Ausschalten des Hauptschalters vom Triebfahrzeug. Das Signal bedeutet, dass das Ausschalten am Signal beendet sein muss. Das Signal »El 1« kann mit einem Signal »El 2« am gleichen Standort vereinigt sein — das Signal »El 2« befindet sich dann über dem Signal »El 1«. In diesem Fall muss das Triebfahrzeug spätestens am Standort des Signals ausgeschaltet sein und darf nach der Vorbeifahrt und Wiederkehr der Fahrleitungsspannung wieder eingeschaltet werden.

**Meaning (EN):** Switch off the traction unit's main switch (*Hauptschalter*). The switching-off must be completed by the time the signal is reached. **El 1** may be combined with an **El 2** at the same location — **El 2** then sits above **El 1**; in that case the unit must be switched off by the signal's location at the latest and may be switched on again after passing it and once the contact-line voltage has returned. Where combined, both are illuminated in darkness.

**Maps to →** family `fahrleitungssignale` · variant `formsignal` · aspect concept `power-off`. Panel: `sign` (static, no aspect state; `kind: 'de-el1'` — broken white "U" on a **blue** diamond ground). No lamps. Coin concept id `power-off`.

---

### `El 2` — Einschaltsignal · *Switch-on signal*

| Field | Value |
|-------|-------|
| **Signalbegriff** | El 2 |
| **German title** | Einschaltsignal — Einschalten erlaubt |
| **English** | Switch-on signal — switching on permitted |
| **Form** | Formsignal |
| **DS 301 ref** | AB 161, AB 162 |
| **DV 301 ref** | § 16 (5)–(8) |
| **Source** | SB-DBAG 2006 p.54 |

**Signalbild (DE):** *Formsignal:* Ein geschlossenes, weißes »U«. Auf einer auf der Spitze stehenden, weiß und schwarz umrandeten blauen quadratischen Tafel.

**Signal picture (EN):** *Form signal:* a closed white "U", on a blue diamond board edged white-and-black.

**Bedeutung (DE):** Einschalten erlaubt. Das Signal bedeutet, dass das Triebfahrzeug nach Vorbeifahrt am Signal eingeschaltet werden darf. Im Bereich von Systemwechseln kann das Signal mit einer blauen quadratischen Tafel ergänzt sein, auf der sich eine weiße Sinuskurve (Wechselstromsystem-Anfang) oder zwei waagerechte weiße Streifen (Gleichstromsystem-Anfang) befinden; über der Sinuskurve kann eine Zahl (Spannung) gezeigt werden. Das Triebfahrzeug darf erst nach dem Systemwechsel wieder eingeschaltet werden.

**Meaning (EN):** Switching on permitted — the traction unit may be switched on after passing the signal. In a system-change area the board may be supplemented with a blue diamond plate bearing a white sine curve (start of an AC system) or two horizontal white stripes (start of a DC system), with a voltage figure optionally shown above the curve; the unit may only be switched on again after the system change.

**Maps to →** family `fahrleitungssignale` · variant `formsignal` · aspect concept `power-on`. Panel: `sign` (static, no aspect state; `kind: 'de-el2'` — closed white "U" on a **blue** diamond ground). Optional system-change supplementary plate → separate `sign` (`kind: 'de-el-systemwechsel'`). No lamps. Coin concept id `power-on`.

---

### `El 3` — »Bügel ab«-Ankündesignal · *Pantograph-down announce signal*

| Field | Value |
|-------|-------|
| **Signalbegriff** | El 3 |
| **German title** | »Bügel ab«-Ankündesignal — Signal »Bügel ab« erwarten |
| **English** | "Pantograph down" announce signal — expect signal "Pantograph down" |
| **Form** | Formsignal |
| **DS 301 ref** | AB 163, AB 166, AB 167 |
| **DV 301 ref** | § 17 (1)–(4) |
| **Source** | SB-DBAG 2006 p.54 |

**Signalbild (DE):** *Formsignal:* Zwei in der Höhe gegeneinander versetzte weiße Streifen. Auf einer auf der Spitze stehenden, weiß und schwarz umrandeten blauen quadratischen Tafel.

**Signal picture (EN):** *Form signal:* two white stripes offset against each other in height (vertically staggered), on a blue diamond board edged white-and-black.

**Bedeutung (DE):** Signal »Bügel ab« erwarten. Das Signal kündigt ein »Bügel ab«-Signal (»El 4«) an und befindet sich in der Regel im halben Abstand des Bremswegs der Strecke vor dem »Bügel ab«-Signal. Die Signale »El 3«, »El 4« und »El 5« sind nicht ortsfest; bei Dunkelheit beleuchtet (bei einfachen Verhältnissen kann darauf verzichtet werden). Wenn Züge hinter dem Signal »El 3« beginnen oder ihre Fahrt fortsetzen, ist ein zweites Signal »El 3« aufgestellt.

**Meaning (EN):** Expect the "Pantograph down" signal — announces an **El 4** and normally stands at half the line's braking distance ahead of it. Signals **El 3**, **El 4** and **El 5** are **not** fixed in place; they are illuminated in darkness (may be dispensed with where conditions are simple). Where trains start or resume beyond **El 3**, a second **El 3** is provided (its location published in the *La*).

**Maps to →** family `fahrleitungssignale` · variant `formsignal` · aspect concept `pantograph-down-announce`. Panel: `sign` (static, no aspect state; `kind: 'de-el3'` — two height-offset white stripes on a **blue** diamond ground). No lamps. Coin concept id `pantograph-down-announce`.

---

### `El 4` — »Bügel ab«-Signal · *Pantograph-down signal*

| Field | Value |
|-------|-------|
| **Signalbegriff** | El 4 |
| **German title** | »Bügel ab«-Signal — Bügel ab! |
| **English** | "Pantograph down" signal — "Pantograph down!" |
| **Form** | Formsignal |
| **DS 301 ref** | AB 168, AB 169, AB 170 |
| **DV 301 ref** | § 17 (5)–(7) |
| **Source** | SB-DBAG 2006 p.55 |

**Signalbild (DE):** *Formsignal:* Ein waagerechter weißer Streifen. Auf einer auf der Spitze stehenden, weiß und schwarz umrandeten blauen quadratischen Tafel.

**Signal picture (EN):** *Form signal:* a horizontal white stripe, on a blue diamond board edged white-and-black.

**Bedeutung (DE):** Bügel ab! Das Signal kennzeichnet den Beginn eines Gleisabschnitts, der nur mit gesenkten Stromabnehmern befahren werden darf. Am Signal müssen die Stromabnehmer völlig gesenkt sein. Das Signal befindet sich 30 m vor dem mit gesenkten Stromabnehmern zu befahrenden Fahrleitungsabschnitt.

**Meaning (EN):** "Pantograph down!" — marks the start of a track section that may only be run through with lowered pantographs; by the signal the pantographs must be fully lowered. It stands 30 m before the section to be traversed with lowered pantographs.

**Maps to →** family `fahrleitungssignale` · variant `formsignal` · aspect concept `pantograph-down`. Panel: `sign` (static, no aspect state; `kind: 'de-el4'` — horizontal white stripe on a **blue** diamond ground). No lamps. Coin concept id `pantograph-down`.

---

### `El 5` — »Bügel an«-Signal · *Pantograph-up signal*

| Field | Value |
|-------|-------|
| **Signalbegriff** | El 5 |
| **German title** | »Bügel an«-Signal — Bügel an! |
| **English** | "Pantograph up" signal — "Pantograph up!" |
| **Form** | Formsignal |
| **DS 301 ref** | AB 171, AB 172, AB 173, AB 173a |
| **DV 301 ref** | § 17 (8)–(12) |
| **Source** | SB-DBAG 2006 p.55 |

**Signalbild (DE):** *Formsignal:* Ein senkrechter weißer Streifen. Auf einer auf der Spitze stehenden, weiß und schwarz umrandeten blauen quadratischen Tafel.

**Signal picture (EN):** *Form signal:* a vertical white stripe, on a blue diamond board edged white-and-black.

**Bedeutung (DE):** Bügel an! Das Signal kennzeichnet das Ende eines Gleisabschnitts, der mit gesenkten Stromabnehmern befahren werden muss. Es bedeutet, dass die gesenkten Stromabnehmer vom Signal ab wieder angelegt werden dürfen; der Tf darf mit dem Anlegen erst beginnen, wenn das Tfz am Signal vorbeigefahren ist. Das Signal befindet sich 30 m hinter dem betreffenden Fahrleitungsabschnitt. Im Bereich von Systemwechseln kann das Signal mit der Tafel gem. § 16 Abs. 8 ergänzt sein; in diesem Fall dürfen die Stromabnehmer nur bei Tfz des entsprechenden Stromsystems wieder angelegt werden.

**Meaning (EN):** "Pantograph up!" — marks the end of a section that must be run through with lowered pantographs. The lowered pantographs may be re-raised from the signal onward, but the driver may only begin raising them once the traction unit has passed the signal. It stands 30 m beyond the relevant section. In a system-change area it may carry the supplementary plate per § 16 (8); the pantographs may then only be re-raised on traction units of the corresponding system.

**Maps to →** family `fahrleitungssignale` · variant `formsignal` · aspect concept `pantograph-up`. Panel: `sign` (static, no aspect state; `kind: 'de-el5'` — vertical white stripe on a **blue** diamond ground). Optional system-change supplementary plate → separate `sign`. No lamps. Coin concept id `pantograph-up`.

---

### `El 6` — Halt für Fahrzeuge mit angehobenen Stromabnehmern · *Stop for vehicles with raised pantographs*

| Field | Value |
|-------|-------|
| **Signalbegriff** | El 6 |
| **German title** | Halt für Fahrzeuge mit angehobenen Stromabnehmern |
| **English** | Stop for vehicles with raised pantographs |
| **Form** | Formsignal |
| **DS 301 ref** | AB 174, AB 176, AB 177 |
| **DV 301 ref** | § 18 (1)–(4) |
| **Source** | SB-DBAG 2006 p.55 |

**Signalbild (DE):** *Formsignal:* Ein auf der Spitze stehender, quadratischer, weißer Rahmen mit innenliegendem weißen Quadrat. Auf einer auf der Spitze stehenden, weiß und schwarz umrandeten blauen quadratischen Tafel.

**Signal picture (EN):** *Form signal:* a square white frame standing on its point (diamond) with an inner white square, on a blue diamond board edged white-and-black.

**Bedeutung (DE):** Das Signal zeigt an, dass Fahrten darüber hinaus für Triebfahrzeuge mit gehobenen Stromabnehmern verboten sind. Der Eisenbahninfrastrukturunternehmer darf das Vorbeileiten der Spitze eines Triebfahrzeugs mit gehobenem Stromabnehmer am Signal »El 6« zulassen; der Eisenbahnverkehrsunternehmer regelt die Bedingungen. Das Signal ist rückstrahlend oder beleuchtet, wenn der Betrieb es erfordert. (AB 175 bleibt frei.)

**Meaning (EN):** Movements beyond this point are forbidden for traction units with raised pantographs. The infrastructure manager may permit the head of a traction unit to pass **El 6** with a raised pantograph; the railway undertaking sets the conditions. The signal is retro-reflective or illuminated where operation requires it. (AB 175 remains reserved / *bleibt frei*.)

**Maps to →** family `fahrleitungssignale` · variant `formsignal` · aspect concept `no-raised-pantograph`. Panel: `sign` (static, no aspect state; `kind: 'de-el6'` — white diamond frame enclosing an inner white square, on a **blue** diamond ground). No lamps. Coin concept id `no-raised-pantograph`.
