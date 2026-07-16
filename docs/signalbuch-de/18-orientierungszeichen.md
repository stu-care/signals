# Orientierungszeichen — Orientation markers

Orientation markers (*Orientierungszeichen* — signs, boards, indicators and plates) are the lineside notices that supplement an operational instruction, or mark the place at which such an instruction is to be carried out. They are gathered at the very back of the signalbook precisely because they sit outside it: they are **not signals in the sense of the ESO**, and they give no instruction of their own. They exist as an aid to the people working the railway — chiefly drivers — and most of them originate in other operating or technical rulebooks rather than in the signalbook itself.

**Intro (opening paragraph, p.73):** *Orientierungszeichen (z.B. Zeichen, Schilder, Anzeiger, Tafeln) ergänzen einen betrieblichen Handlungsauftrag oder kennzeichnen eine Stelle, an der ein solcher Auftrag auszuführen ist. Die Orientierungszeichen geben selbst keinen Handlungsauftrag und sie sind auch keine Signale im Sinne der ESO. Sie sollen eine Hilfe für die Anwender, vor allem Triebfahrzeugführer, sein.* — "Orientation markers (e.g. signs, plates, indicators, boards) supplement an operational instruction, or mark a place at which such an instruction is to be carried out. The orientation markers themselves give no instruction and are also not signals within the meaning of the ESO. They are intended as an aid for those working the railway, above all train drivers." The markers shown here as a rule have their origin in other operating or technical rulebooks; the full regulation and further development of the rules bound up with them rests with the business units responsible for the rulebook concerned. No validity information (start or end of application) is given for orientation markers. The depictions that follow are explanatory or descriptive in character; they do not replace the standard drawings, and their inclusion here does not in itself establish any need to use the markers.

> **Reference-only.** Nothing in this file is an interactive aspect. Every marker is a fixed informational plate or indicator with no aspect state and no on/off signalling meaning, so in the app data model each would be rendered as a **static board** (panel `sign`), never as a live signal head. There are no DS 301 / DV 301 signal references because these are not ESO signals; the `—` in those rows is deliberate. All entries map to family `orientierungszeichen` and, where a cross-country concept is wanted at all, concept `orientation`.

---

### `Zugfunktafel` — Zugfunktafel · *Cab-radio channel board*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Zugfunktafel (no ESO begriff) |
| **German title** | Zugfunktafel |
| **English** | Cab-radio channel board |
| **Form** | Orientierungszeichen (Tafel) |
| **DS 301 ref** | — |
| **DV 301 ref** | — |
| **Source** | SB-DBAG 2006 p.73 |

**Signalbild (DE):** Eine weiße, schwarzumrandete, rechteckige Tafel mit Telefonhörer und einer ZF-Kanalkennzeichnung.

**Signal picture (EN):** A white, black-bordered rectangular board bearing a telephone-handset symbol and a cab-radio channel designation.

**Bedeutung (DE):** Zugfunkgerät (ZF) auf angegebenen Kanal einstellen.

**Meaning (EN):** Set the cab-radio set (ZF) to the channel shown.

**Maps to →** family `orientierungszeichen` · panel `sign` (kind `de-zugfunktafel`), static white/black plate with handset glyph and channel number. No aspect state. Concept `orientation`.

---

### `»ICE«-Zeichen` — »ICE«-Zeichen · *ICE marker (OHL protection section)*

| Field | Value |
|-------|-------|
| **Signalbegriff** | »ICE«-Zeichen (no ESO begriff) |
| **German title** | »ICE«-Zeichen |
| **English** | ICE marker for overhead-line protection section |
| **Form** | Orientierungszeichen (Zeichen) |
| **DS 301 ref** | — |
| **DV 301 ref** | — |
| **Source** | SB-DBAG 2006 p.73 |

**Signalbild (DE):** Ein auf der Spitze stehendes weißes, schwarzumrandetes Quadrat mit einem schwarzen Schriftzug »ICE«. Sie steht rechts vom Gleis.

**Signal picture (EN):** A white, black-bordered square standing on its point, bearing the black lettering "ICE". It stands to the right of the track.

**Bedeutung (DE):** Das Zeichen ist so aufgestellt, dass ein am Schluss des Zuges laufendes Triebfahrzeug die Fahrleitungsschutzstrecke durchfahren hat.

**Meaning (EN):** The marker is positioned so that a traction unit running at the rear of the train has cleared the overhead-line protection section (dead section) by the time it reaches the marker.

**Maps to →** family `orientierungszeichen` · panel `sign` (kind `de-ice-zeichen`), static point-standing white/black square with "ICE" glyph. No aspect state. Concept `orientation`.

---

### `Kennzeichnung der Stelle zur Sicherung an Bahnübergängen` — *Level-crossing securing-point marker*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Kennzeichnung der Stelle zur Sicherung an Bahnübergängen (no ESO begriff) |
| **German title** | Kennzeichnung der Stelle zur Sicherung an Bahnübergängen |
| **English** | Marking of the point for securing level crossings |
| **Form** | Orientierungszeichen (Tafel) |
| **DS 301 ref** | — |
| **DV 301 ref** | — |
| **Source** | SB-DBAG 2006 p.73 |

**Signalbild (DE):** Eine quadratische, weiße, schwarzumrandete Tafel mit schwarzen Schriftzügen.

**Signal picture (EN):** A square, white, black-bordered board with black lettering.

**Bedeutung (DE):** Kennzeichnet die Stelle, an der ein Bahnübergang zu sichern ist.

**Meaning (EN):** Marks the place at which a level crossing is to be secured (by the traincrew / operating staff).

**Maps to →** family `orientierungszeichen` · panel `sign` (kind `de-bue-sicherungsstelle`), static square white/black plate. No aspect state. Concept `orientation`.

---

### `Schild »Automatik HET« / »HET« / »Automatik-ET« / »ET«` — *Crossing switch-on / auxiliary-switch-on plates*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Schild »Automatik HET«, »HET«, »Automatik-ET«, »ET« (no ESO begriff) |
| **German title** | Schild »Automatik HET« / »HET« / »Automatik-ET« / »ET« |
| **English** | Plates "Automatik HET" / "HET" / "Automatik-ET" / "ET" (level-crossing switch-on / auxiliary switch-on) |
| **Form** | Orientierungszeichen (Schilder) |
| **DS 301 ref** | — |
| **DV 301 ref** | — |
| **Source** | SB-DBAG 2006 p.73 |

**Signalbild (DE):** Vier zusammengehörige Schilder mit schwarzem Schriftzug (»Automatik HET«, »HET«, »Automatik-ET«, »ET«).

**Signal picture (EN):** A related group of four lettered plates: "Automatik HET", "HET", "Automatik-ET", "ET". (*ET* = *Einschaltung* / switch-on of the crossing-protection equipment; *HET* = *Hilfseinschaltung* / auxiliary or emergency switch-on.)

**Bedeutung (DE):**
- **Schild »Automatik HET«** — Das Schild befindet sich an der Zugeinwirkungsstelle für die automatische Hilfseinschaltung von Bahnübergangssicherungsanlagen.
- **Schild »HET«** — Das Schild befindet sich an der Bedienstelle für die Hilfseinschaltung von Bahnübergangssicherungsanlagen.
- **Schild »Automatik-ET«** — Das Schild befindet sich an der Zugeinwirkungsstelle für die automatische Einschaltung von Bahnübergangssicherungsanlagen.
- **Schild »ET«** — Das Schild befindet sich an der Bedienstelle für die Einschaltung von Bahnübergangssicherungsanlagen.

**Meaning (EN):**
- **"Automatik HET"** — at the train-actuation point for the **automatic auxiliary switch-on** of level-crossing protection equipment.
- **"HET"** — at the operating point (control) for the **auxiliary switch-on** of level-crossing protection equipment.
- **"Automatik-ET"** — at the train-actuation point for the **automatic switch-on** of level-crossing protection equipment.
- **"ET"** — at the operating point (control) for the **switch-on** of level-crossing protection equipment.

**Maps to →** family `orientierungszeichen` · panel `sign` (kinds `de-automatik-het`, `de-het`, `de-automatik-et`, `de-et`), one static lettered plate per variant. No aspect state. Concept `orientation`.

---

### `Fahrtanzeiger` — Fahrtanzeiger · *Departure-authority indicator*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Fahrtanzeiger (no ESO begriff) |
| **German title** | Fahrtanzeiger |
| **English** | Departure-authority indicator |
| **Form** | Orientierungszeichen (Lichtanzeiger) |
| **DS 301 ref** | — |
| **DV 301 ref** | — |
| **Source** | SB-DBAG 2006 p.73 |

**Signalbild (DE):** Der Fahrtanzeiger hat folgendes Aussehen:
a) Ein von links nach rechts steigender, weißer Lichtstreifen. Die Zustimmung gilt in Blickrichtung.
b) Drei von rechts nach links steigende, weiße Lichtpunkte. Die Zustimmung gilt entgegen der Blickrichtung. Bei bestehenden Anlagen kann statt der Lichtpunkte ein senkrechter Lichtstreifen gegeben sein.

**Signal picture (EN):** The departure indicator appears in one of two forms:
a) A white light strip rising from left to right — the authority applies in the direction of view.
b) Three white light spots rising from right to left — the authority applies against the direction of view. On existing installations a vertical light strip may be shown instead of the light spots.

**Bedeutung (DE):** Der Fahrtanzeiger dient der Unterrichtung der Zugaufsicht darüber, dass der Fahrdienstleiter die Zustimmung zur Abfahrt des Zuges gegeben hat.

**Meaning (EN):** The departure indicator informs the platform/train supervisor (*Zugaufsicht*) that the signaller (*Fahrdienstleiter*) has given consent for the train to depart.

**Maps to →** family `orientierungszeichen` · panel `sign` (kind `de-fahrtanzeiger`), depicting the two static forms (form a: left-to-right rising strip; form b: three right-to-left rising spots / vertical strip). Although realised with white lights, it is a fixed indicator with no signalled aspect, so rendered as a static board. Concept `orientation`.

---

### `Hinweistafel auf Zp 9-Bedienstelle` — *Zp 9 operating-point notice board*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Hinweistafel auf Zp 9-Bedienstelle (no ESO begriff) |
| **German title** | Hinweistafel auf Zp 9-Bedienstelle |
| **English** | Notice board indicating the Zp 9 operating point |
| **Form** | Orientierungszeichen (Tafel) |
| **DS 301 ref** | — |
| **DV 301 ref** | — |
| **Source** | SB-DBAG 2006 p.74 |

**Signalbild (DE):** Eine Tafel, die auf die Bedienstelle des Lichtsignals »Zp 9« hinweist.

**Signal picture (EN):** A board that points to the operating point of the "Zp 9" light signal.

**Bedeutung (DE):** Das Zeichen weist auf die Stelle, an der die Bedieneinrichtung für das Lichtsignal »Zp 9« aufgestellt oder angebracht ist.

**Meaning (EN):** The marker indicates the place at which the control device for the "Zp 9" (Abfahren / departure) light signal is installed or fitted.

**Maps to →** family `orientierungszeichen` · panel `sign` (kind `de-hinweis-zp9`), static notice board. No aspect state. Concept `orientation`.

---

### `LZB-Bereichskennzeichen` — LZB-Bereichskennzeichen · *LZB area marker*

| Field | Value |
|-------|-------|
| **Signalbegriff** | LZB-Bereichskennzeichen (no ESO begriff) |
| **German title** | LZB-Bereichskennzeichen |
| **English** | LZB area marker |
| **Form** | Orientierungszeichen (Tafel) |
| **DS 301 ref** | — |
| **DV 301 ref** | — |
| **Source** | SB-DBAG 2006 p.74 |

**Signalbild (DE):** Eine schwarzumrandete, weiße Tafel mit schwarzem »LZB«.

**Signal picture (EN):** A black-bordered white board bearing a black "LZB".

**Bedeutung (DE):** LZB-Bereichskennzeichen kennzeichnen den Anfang einer LZB-Strecke und den Übergang zwischen zwei Linienleiterschleifenbereichen unterschiedlicher Bereichskennungen – Bereichskennungswechsel (BKW).

**Meaning (EN):** LZB area markers mark the start of an LZB (continuous cab-signalling) route and the transition between two cable-loop areas with different area identifiers — an area-identifier change (*Bereichskennungswechsel*, BKW).

**Maps to →** family `orientierungszeichen` · panel `sign` (kind `de-lzb-bereich`), static white/black "LZB" plate. No aspect state. Concept `orientation`.

---

### `LZB-Blockkennzeichen` — LZB-Blockkennzeichen · *LZB block marker*

| Field | Value |
|-------|-------|
| **Signalbegriff** | LZB-Blockkennzeichen (no ESO begriff) |
| **German title** | LZB-Blockkennzeichen |
| **English** | LZB block marker |
| **Form** | Orientierungszeichen (Tafel) |
| **DS 301 ref** | — |
| **DV 301 ref** | — |
| **Source** | SB-DBAG 2006 p.74 |

**Signalbild (DE):** Ein weißes Quadrat mit schwarzem Rand und Kreis sowie mit einer schwarzen innenliegenden Kennzahl.

**Signal picture (EN):** A white square with a black border and a black circle, with a black identifying number inside it.

**Bedeutung (DE):** LZB-Blockkennzeichen sind an den LZB-Blockstellen aufgestellt, die nicht durch den Standort des Hauptsignals gekennzeichnet sind. Sie markieren die Stelle, an der ein LZB-geführter Zug bei LZB-Halt nach einer Betriebsbremsung zum Halten kommt.

**Meaning (EN):** LZB block markers are placed at the LZB block points that are not marked by the location of a main signal. They mark the place at which an LZB-controlled train comes to a stand, after a service braking, at an LZB stop.

**Maps to →** family `orientierungszeichen` · panel `sign` (kind `de-lzb-block`), static white square with circle and number. No aspect state. Concept `orientation`.

---

### `Hektometerzeichen` — Hektometerzeichen · *Hectometre / kilometre marker*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Hektometerzeichen (no ESO begriff) |
| **German title** | Hektometerzeichen |
| **English** | Hectometre (kilometre) marker |
| **Form** | Orientierungszeichen (Tafel) |
| **DS 301 ref** | — |
| **DV 301 ref** | — |
| **Source** | SB-DBAG 2006 p.74 |

**Signalbild (DE):** Eine weiße Tafel mit zwei großen, schwarzen Zahlen übereinander, wobei die untere nur einstellig ist. Die obere Zahl gibt den Kilometer an, die untere den Hektometer.

**Signal picture (EN):** A white board with two large black numbers one above the other, the lower being single-digit. The upper number gives the kilometre, the lower the hectometre (hundred-metre mark).

**Bedeutung (DE):** Kennzeichnung der Streckenkilometrierung.

**Meaning (EN):** Marks the route mileage (chainage) of the line.

**Maps to →** family `orientierungszeichen` · panel `sign` (kind `de-hektometer`), static white plate with stacked km/hm figures. No aspect state. Concept `orientation`.

---

### `NBÜ-Kennzeichen` — NBÜ-Kennzeichen · *Emergency-brake-override section marker*

| Field | Value |
|-------|-------|
| **Signalbegriff** | NBÜ-Kennzeichen (no ESO begriff) |
| **German title** | NBÜ-Kennzeichen |
| **English** | Emergency-brake-override (NBÜ) section marker |
| **Form** | Orientierungszeichen (Tafel) |
| **DS 301 ref** | — |
| **DV 301 ref** | — |
| **Source** | SB-DBAG 2006 p.74 |

**Signalbild (DE):** Das Hektometerzeichen ist am oberen und unteren Rand durch einen orangefarbenen waagerechten Streifen ergänzt.

**Signal picture (EN):** A hectometre marker supplemented along its top and bottom edges by a horizontal orange stripe.

**Bedeutung (DE):** Diese Tafeln kennzeichnen einen Gleisabschnitt, der bei eingeschalteter Notbremsüberbrückung (NBÜ) den Personenzug trotz betätigter Notbremse weiterfahren zu lassen und erst an einem geeigneten Ort zum Stehen zu bringen.

**Meaning (EN):** These boards mark a track section in which, with the emergency-brake override (*Notbremsüberbrückung*, NBÜ) switched on, a passenger train is allowed to continue running despite an operated emergency brake and is brought to a stand only at a suitable place (e.g. beyond a tunnel).

**Maps to →** family `orientierungszeichen` · panel `sign` (kind `de-nbue`), static hectometre-style plate with orange edge stripes. No aspect state. Concept `orientation`.

---

### `Bezeichnungstafel für Tunnel` — Bezeichnungstafel für Tunnel · *Tunnel name board*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Bezeichnungstafel für Tunnel (no ESO begriff) |
| **German title** | Bezeichnungstafel für Tunnel |
| **English** | Tunnel name board |
| **Form** | Orientierungszeichen (Rechteckscheibe) |
| **DS 301 ref** | — |
| **DV 301 ref** | — |
| **Source** | SB-DBAG 2006 p.74 |

**Signalbild (DE):** Die örtliche Tunnelbezeichnung besteht aus dem Namen des Tunnels ohne das Wort oder Wortteil »Tunnel«, dem Tunnelsymbol und der Längenangabe in Metern auf einer weißen, schwarzumrandeten Rechteckscheibe.

**Signal picture (EN):** The local tunnel designation consists of the name of the tunnel — without the word or word-part "Tunnel" — the tunnel symbol, and the length in metres, on a white, black-bordered rectangular board.

**Bedeutung (DE):** Tunnel sind am Portal durch Anbringung des Tunnelnamens gekennzeichnet. Bei Tunnel unter 500 m kann auf die Kennzeichnung verzichtet sein.

**Meaning (EN):** Tunnels are marked at the portal by fixing the tunnel name. For tunnels under 500 m the marking may be omitted.

**Maps to →** family `orientierungszeichen` · panel `sign` (kind `de-tunnel-bezeichnung`), static white/black rectangular board with name, tunnel symbol and length. No aspect state. Concept `orientation`.

---

### `Unbesetzte Fernsprecherstelle` — Unbesetzte Fernsprecherstelle · *Unattended telephone point ("F")*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Unbesetzte Fernsprecherstelle (no ESO begriff) |
| **German title** | Unbesetzte Fernsprecherstelle |
| **English** | Unattended telephone point |
| **Form** | Orientierungszeichen (Tafel) |
| **DS 301 ref** | — |
| **DV 301 ref** | — |
| **Source** | SB-DBAG 2006 p.75 |

**Signalbild (DE):** Ein schwarzer Buchstabe »F« auf rechteckiger, weißer Tafel. Sprechstellen im Tunnel können zusätzlich ein Hörersymbol tragen. Bis auf weiteres können auch folgende Kennzeichnungen vorkommen: »Fo«, »F-Sig« oder »Signalfernsprecher«.

**Signal picture (EN):** A black letter "F" on a rectangular white board. Telephone points in tunnels may additionally bear a handset symbol. Until further notice the markings "Fo", "F-Sig" or "Signalfernsprecher" may also occur.

**Bedeutung (DE):** Unbesetzte Fernsprechstellen sind durch einen schwarzen Buchstaben »F« auf rechteckiger, weißer Tafel gekennzeichnet.

**Meaning (EN):** Unattended telephone points are marked by a black letter "F" on a rectangular white board.

**Maps to →** family `orientierungszeichen` · panel `sign` (kind `de-fernsprecher-f`), static white/black "F" plate (optional handset symbol). No aspect state. Concept `orientation`.

---

### `Pfeil für Hinweis auf nächste Sprechstelle` — *Arrow indicating the nearest telephone point*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Pfeil für Hinweis auf nächste Sprechstelle (no ESO begriff) |
| **German title** | Pfeil für Hinweis auf nächste Sprechstelle |
| **English** | Arrow pointing to the nearest telephone point |
| **Form** | Orientierungszeichen (Pfeil) |
| **DS 301 ref** | — |
| **DV 301 ref** | — |
| **Source** | SB-DBAG 2006 p.75 |

**Signalbild (DE):** Ein Pfeil.

**Signal picture (EN):** An arrow.

**Bedeutung (DE):** Auf freier Strecke weist ein Pfeil auf die nächste Sprechstelle hin.

**Meaning (EN):** On the open line an arrow points towards the nearest telephone point.

**Maps to →** family `orientierungszeichen` · panel `sign` (kind `de-pfeil-sprechstelle`), static directional arrow plate. No aspect state. Concept `orientation`.

---

### `Schild »Elektrische Streckentrennung«` — *Overhead-line section-separation plates (Anfang / Ende)*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Schild »Elektrische Streckentrennung« (Anfang / Ende) (no ESO begriff) |
| **German title** | Schild »Elektrische Streckentrennung« |
| **English** | "Electrical section separation" plates (start / end) |
| **Form** | Orientierungszeichen (Schilder, Anfang + Ende) |
| **DS 301 ref** | — |
| **DV 301 ref** | — |
| **Source** | SB-DBAG 2006 p.75 |

**Signalbild (DE):** Zwei Schilder — »Anfang« und »Ende« — an zwei Oberleitungsmasten innerhalb der offenen Streckentrennung.

**Signal picture (EN):** Two plates — "Anfang" (start) and "Ende" (end) — mounted on two OHL masts within the open section separation.

**Bedeutung (DE):** Die Schilder befinden sich an zwei Oberleitungsmasten innerhalb der offenen Streckentrennung einer Speisebezirksgrenze des Oberleitungsnetzes und zeigen an, dass zwischen Anfang- und Ende-Kennzeichen nicht mit gehobenen Stromabnehmern angehalten werden darf.

**Meaning (EN):** The plates are fixed to two overhead-line masts within the open section separation at a feed-district boundary of the OHL network, and indicate that between the start ("Anfang") and end ("Ende") markers a train may not be stopped with raised pantographs.

**Maps to →** family `orientierungszeichen` · panel `sign` (kinds `de-streckentrennung-anfang`, `de-streckentrennung-ende`), a pair of static OHL-mast plates. No aspect state. Concept `orientation`.

---

*Generated from the source scan; translations are provided for study/reference and are not an official DB translation.*
