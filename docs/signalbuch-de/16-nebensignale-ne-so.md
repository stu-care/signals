# Nebensignale (Ne) und Sonstige Signale (So) — Auxiliary & other signals

*Nebensignale* ("auxiliary signals") and the miscellaneous *Sonstige Signale* are, almost without exception, static lineside boards (*Formsignale*) that do not change aspect. They mark where a train must stop, announce that a main or distant signal is coming, flag that a signal stands in an unusual position, or monitor a trailable point (*Rückfallweiche*). Because they carry no changing indication, nearly all of them render in the app as a `sign` panel — a fixed board with a `de-…` kind — rather than as lamps. The two exceptions are the request-stop *Haltetafel* variant (a **blinking** white "H") and the *Überwachungssignal* So 18 (white monitoring lights).

This chapter also covers the DR *Sonstige Signale* used for direct-current S-Bahn (So 1), for trailable points (So 17, So 18), for beacon-announced main signals (So 19), and the branch-line cross board (So 106). Reference styles follow the book: DS 301 = `ESO (n)` / `AB n`; DV 301 = `§ n (m)`. Most Nebensignale carry only DV `§` references plus DS `AB` implementing provisions — the left ESO column is frequently blank, so `—` is used where DS 301 gives no begriff.

---

### `Ne 1` — Trapeztafel · *Trapezoid board (stop board)*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Ne 1 |
| **German title** | Trapeztafel |
| **English** | Trapezoid board — stop board |
| **Form** | Formsignal |
| **DS 301 ref** | AB 201–203 |
| **DV 301 ref** | § 52 (1)–(4) |
| **Source** | SB-DBAG 2006 p.59 |

**Signalbild (DE):** *Formsignal:* Eine weiße Trapeztafel mit schwarzem Rand an einem schwarz und weiß schräg gestreiften Pfahl.

**Signal picture (EN):** *Form signal:* a white trapezoid board with a black border, mounted on a post striped diagonally black and white.

**Bedeutung (DE):** Kennzeichnung der Stelle, wo bestimmte Züge vor einer Betriebsstelle zu halten haben.

**Meaning (EN):** Marks the place where certain trains must stop before an operating point (station). The stop board replaces an entry signal where none exists.

- **Siting notes** — DV § 52 (2) / AB 201: the board stands only on branch lines (*Nebenbahnen*). At federal railways it stands before stations without entry signals; on *Zugleitbetrieb* lines it may also stand before other train-running points. At non-federal railways (*NE*) the operations manager decides its position. AB 203 / § 52 (4): where sighting is poor it is made retro-reflective, or lit in darkness.

**Maps to →** family `nebensignale` · variant `nebensignaltafel` · aspect concept `stop-board`. Panel: `sign` (static, no aspect state; `kind: 'de-trapeztafel'` — white trapezoid, black border, on a diagonally striped post). No lamps.

---

### `Ne 2` — Vorsignaltafel · *Distant-signal marker board*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Ne 2 |
| **German title** | Vorsignaltafel |
| **English** | Distant-signal marker board |
| **Form** | Formsignal |
| **DS 301 ref** | ESO (46a), AB 204–207a |
| **DV 301 ref** | § 53 (1)–(13) |
| **Source** | SB-DBAG 2006 pp.59–61 |

**Signalbild (DE):** *Formsignal:* Eine schwarzgeränderte, weiße Rechtecktafel mit zwei übereinander stehenden schwarzen Winkeln, die sich mit der Spitze berühren. Als Kennzeichnung des Standortes eines dreibegriffigen Formvorsignals kann über der Vorsignaltafel eine dreieckige, schwarzgeränderte, weiße Tafel mit einem schwarzem Punkt angebracht sein.

**Signal picture (EN):** *Form signal:* a black-bordered white rectangular board bearing two black chevrons, one above the other, meeting tip-to-tip. Where it marks the location of a three-aspect form distant signal, a triangular black-bordered white plate with a single black dot may be fitted above it.

**Bedeutung (DE):** Kennzeichnung des Standortes eines Vorsignals.

**Meaning (EN):** Marks the location of a distant signal (*Vorsignal*).

- **Siting notes** — AB 204 / § 53 (3): normally stands immediately in front of a distant signal; it is *not* placed at a colour-light distant on a colour-light main signal, at a main signal that also has distant function, or at a distant repeater. ESO (46a) / § 53 (5): the board may also stand alone — (a) in place of a distant signal, to mark the line's braking distance ahead of a main signal, light shunting signal or trapezoid board, or (b) as a pointer to a distant that is not to the right of or over the track. AB 207 / § 53 (9): if the distance to the associated signal is more than 5 % shorter than the line braking distance, the board carries an inverted white triangle (black border) on its top edge. § 53 (12): light distants may instead be marked with a *Vorsignalmastschild* — a yellow triangle pointing downward, retro-reflective.

**Maps to →** family `nebensignale` · variant `nebensignaltafel` · aspect concept `distant-marker`. Panel: `sign` (static, no aspect state; **existing kind `de-vorsignaltafel` fits** — white rectangle, two black tip-to-tip chevrons). No lamps.

---

### `Ne 3` — Vorsignalbaken · *Distant-signal beacons*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Ne 3 |
| **German title** | Vorsignalbaken |
| **English** | Distant-signal beacons |
| **Form** | Formsignal |
| **DS 301 ref** | AB 208–213 |
| **DV 301 ref** | § 54 (1)–(8) |
| **Source** | SB-DBAG 2006 pp.61–62 |

**Signalbild (DE):** *Formsignal:* Mehrere aufeinanderfolgende viereckige, weiße Tafeln mit einem oder mehreren nach rechts ansteigenden schwarzen Streifen, deren Anzahl in der Fahrtrichtung abnimmt. Bei Dunkelheit und unsichtigem Wetter können zusätzlich rückstrahlende weiße Streifen erscheinen, deren Anzahl und Anordnung den der schwarzen Streifen entspricht.

**Signal picture (EN):** *Form signal:* several successive square white boards bearing one or more black stripes rising to the right, the number of stripes decreasing in the direction of travel. In darkness and poor visibility additional retro-reflective white stripes may appear, matching the number and arrangement of the black ones.

**Bedeutung (DE):** Ein Vorsignal ist zu erwarten.

**Meaning (EN):** A distant signal is to be expected.

- **Siting notes** — AB 210 / § 54 (5): normally three beacons (exceptionally fewer, or up to five) stand before the distant; the last one in the direction of travel is **100 m** before the distant, the others at **75 m** spacing. AB 209 / § 54 (4): as a rule only on main lines. AB 208a / § 54 (3): may also announce a stand-alone *Vorsignaltafel*. AB 213 / § 54 (8): if the distant stands closer than the line braking distance, the first beacon carries an inverted white triangle (black border) on its top edge (may be omitted until further notice).

**Maps to →** family `nebensignale` · variant `nebensignaltafel` · aspect concept `distant-beacon`. Panel: `sign` (static, no aspect state; `kind: 'de-vorsignalbake'` — white board with 1–3 up-right rising black stripes; render the set of three at 100 m + 75 m + 75 m). No lamps.

---

### `Ne 4` — Schachbrettafel · *Chequerboard*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Ne 4 |
| **German title** | Schachbrettafel |
| **English** | Chequerboard |
| **Form** | Formsignal |
| **DS 301 ref** | AB 214–217 |
| **DV 301 ref** | § 55 (1)–(4) |
| **Source** | SB-DBAG 2006 p.62 |

**Signalbild (DE):** *Formsignal:* Eine viereckige, schachbrettartige, schwarz und weiß gemusterte Tafel.

**Signal picture (EN):** *Form signal:* a square board patterned in a black-and-white chequerboard.

**Bedeutung (DE):** Das Hauptsignal steht, abweichend von der Regel, an einem anderen Standort.

**Meaning (EN):** The main signal stands, contrary to the rule, at another (unusual) position.

- **Siting notes** — AB 215 / § 55 (3): normally on through main tracks, level with the main signal; not placed where further main signals at the same level would make the assignment ambiguous. A board immediately right of the track points to a main signal that is either immediately left, more than 10 m to the right, or one track further right; a board immediately left points to a main signal immediately to the right (and, in engineering states, one track further right). It may also point to a shunting signal for wrong-direction movements.

**Maps to →** family `nebensignale` · variant `nebensignaltafel` · aspect concept `signal-relocated`. Panel: `sign` (static, no aspect state; `kind: 'de-schachbrettafel'` — black/white chequerboard). No lamps.

---

### `Ne 5` — Haltetafel · *Stop board (head-of-train stopping place)*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Ne 5 |
| **German title** | Haltetafel |
| **English** | Stop board — head-of-train stopping place |
| **Form** | Formsignal |
| **DS 301 ref** | AB 218–220a |
| **DV 301 ref** | § 56 (1)–(5) |
| **Source** | SB-DBAG 2006 p.62 |

**Signalbild (DE):** *Formsignal:* Eine hochstehende schwarze Rechteckscheibe mit weißem »H«, oder eine hochstehende weiße Rechteckscheibe mit schwarzem Rand und schwarzem »H«. — *Zusatz (AB 220a / § 56 (5)):* Durch eine hochstehende, schwarze Rechteckscheibe mit weiß blinkendem »H« kann die Anforderung eines Bedarfshalts angezeigt werden.

**Signal picture (EN):** *Form signal:* an upright black rectangular board with a white "H", or an upright white rectangular board with a black border and a black "H". A variant with an upright black board bearing a **white blinking "H"** can signal the request for a request-stop (*Bedarfshalt*).

**Bedeutung (DE):** Kennzeichnung des Halteplatzes der Zugspitze bei planmäßig haltenden Zügen.

**Meaning (EN):** Marks the stopping place of the head of the train for scheduled stops.

- **Siting notes** — AB 219 / § 56 (3): passenger trains with a booked stop halt at the board; if it stands beyond the platform, the train stops so its first coach does not overrun the platform. Boards may be supplemented by additional plates giving train lengths, so the stop is matched to the length. At stations without an exit signal, halting trains (including freight) stop at the board, but passenger trains stop at the platform even if no board is there.

**Maps to →** family `nebensignale` · variant `nebensignaltafel` · aspect concept `stop-place`. Panel: `sign` (static; `kind: 'de-haltetafel'` — "H" on an upright board). The **request-stop variant** is a distinct blinking presentation — note `canFlash` (white "H" blinking) rather than a static kind. No coloured lamps.

---

### `Ne 6` — Haltepunkttafel · *Halt-announce board*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Ne 6 |
| **German title** | Haltepunkttafel |
| **English** | Halt-announce board |
| **Form** | Formsignal |
| **DS 301 ref** | AB 221–222 |
| **DV 301 ref** | § 57 (1)–(3) |
| **Source** | SB-DBAG 2006 p.63 |

**Signalbild (DE):** *Formsignal:* Eine schräg zum Gleis gestellte waagerechte, weiße Tafel mit drei schwarzen Schrägstreifen.

**Signal picture (EN):** *Form signal:* a horizontal white board set at an angle to the track, bearing three black diagonal stripes.

**Bedeutung (DE):** Ein Haltepunkt ist zu erwarten.

**Meaning (EN):** A halt (*Haltepunkt*) is to be expected.

- **Siting notes** — AB 221 / § 57 (2): announces halts or stopping places that are hard to see because of local conditions. AB 222 / § 57 (3): on main lines it stands at the line braking distance; on branch lines 150 m before the platform. The board is retro-reflective (older non-reflective boards may remain temporarily but are no longer newly installed).

**Maps to →** family `nebensignale` · variant `nebensignaltafel` · aspect concept `halt-announce`. Panel: `sign` (static, no aspect state; `kind: 'de-haltepunkttafel'` — white board, three black diagonal stripes). No lamps.

---

### `Ne 7` — Schneepflugtafel · *Snowplough board*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Ne 7 (Ne 7a / Ne 7b) |
| **German title** | Schneepflugtafel |
| **English** | Snowplough board |
| **Form** | Formsignal |
| **DS 301 ref** | AB 223–224 |
| **DV 301 ref** | § 58 (1)–(4) |
| **Source** | SB-DBAG 2006 p.63 |

**Signalbild (DE):** *Formsignal:* **a) Pflugschar heben** — eine weiße Pfeilspitze mit schwarzem Rand zeigt senkrecht nach oben (bzw. eine gelbe Pfeilspitze mit schwarzem Rand nach oben). **b) Pflugschar senken** — eine weiße Pfeilspitze mit schwarzem Rand zeigt senkrecht nach unten (bzw. eine gelbe Pfeilspitze mit schwarzem Rand nach unten).

**Signal picture (EN):** *Form signal:* **a) raise the share** — a white (or yellow) arrowhead with a black border pointing vertically **up**. **b) lower the share** — a white (or yellow) arrowhead with a black border pointing vertically **down**.

**Bedeutung (DE):** a) Pflugschar heben. b) Pflugschar senken.

**Meaning (EN):** a) Raise the snowplough share. b) Lower the snowplough share.

- **Siting notes** — AB 223 / § 58 (3): applies only to snowploughs with movable shares. AB 224 / § 58 (4): on single track, "Ne 7b" may stand immediately left of the track when carried on the opposite-direction signal's mast; erecting "Ne 7b" may be omitted where the end of the section is already shown by the opposite direction's "Ne 7a".

**Maps to →** family `nebensignale` · variant `nebensignaltafel` · aspect concept `snowplough`. Panel: `sign` (static, no aspect state; `kind: 'de-schneepflugtafel'` — black-bordered arrowhead, up for 7a / down for 7b; white or yellow fill). No lamps.

---

### `So 1` — Endtafel · *End board (end of driving-on-sight)*

| Field | Value |
|-------|-------|
| **Signalbegriff** | So 1 |
| **German title** | Endtafel |
| **English** | End board |
| **Form** | Formsignal |
| **DS 301 ref** | — |
| **DV 301 ref** | § 59 (1)–(4) |
| **Source** | SB-DBAG 2006 p.64 |

**Signalbild (DE):** *Formsignal:* Eine viereckige rote Tafel mit liegendem weißen Kreuz. Das Signal ist rückstrahlend.

**Signal picture (EN):** *Form signal:* a square red board with a white diagonal (saltire) cross. The board is retro-reflective.

**Bedeutung (DE):** Fahren auf Sicht beenden.

**Meaning (EN):** End driving on sight (*Fahren auf Sicht beenden*). The board lifts the order to drive on sight that was given by a red mast-plate at a colour-light main signal.

- **Siting notes** — § 59 (2): stands immediately right of the associated track (immediately left for wrong-direction movements), beside or over the track. § 59 (4): where set up during engineering states, this is announced in the *La*. **Footnote ¹:** applies only within the area of the **Berlin direct-current S-Bahn**. Footnote ²: the board may, until further notice, also be non-reflective.

**Maps to →** family `nebensignale` · variant `nebensignaltafel` · aspect concept `sighting-end`. Panel: `sign` (static, no aspect state; `kind: 'de-endtafel'` — red board, white saltire cross). No lamps.

---

### `So 17` — Ankündigungsbake · *Announce beacon (for a Rückfallweiche monitor)*

| Field | Value |
|-------|-------|
| **Signalbegriff** | So 17 |
| **German title** | Ankündigungsbake |
| **English** | Announce beacon (trailable-point monitor) |
| **Form** | Formsignal |
| **DS 301 ref** | — |
| **DV 301 ref** | § 60 (1)–(3) |
| **Source** | SB-DBAG 2006 p.64 |

**Signalbild (DE):** *Formsignal:* Eine rechteckige orangefarbene Tafel mit zwei waagerechten weißen Streifen.

**Signal picture (EN):** *Form signal:* a rectangular orange board with two horizontal white stripes.

**Bedeutung (DE):** Überwachungssignal einer Rückfallweiche (Signal So 18) beachten.

**Meaning (EN):** Observe the monitoring signal (So 18) of a trailable point (*Rückfallweiche*).

- **Siting notes** — § 60 (2): at the So 17 board the driver must check whether So 18 shows two white lights / two round white discs (see So 18). § 60 (3): the beacon stands at the actually required braking distance plus twice as many metres as the VzG line speed in km/h, before the tip of the trailable point, immediately right of the track. Not lit in darkness; no So 17 is provided for trailable points in secondary (siding) tracks.

**Maps to →** family `nebensignale` · variant `nebensignaltafel` · aspect concept `main-beacon` (announce type). Panel: `sign` (static, no aspect state; `kind: 'de-ankuendigungsbake'` — orange board, two horizontal white stripes). No lamps.

---

### `So 18` — Überwachungssignal einer Rückfallweiche · *Trailable-point monitoring signal*

| Field | Value |
|-------|-------|
| **Signalbegriff** | So 18 (So 18a / So 18b) |
| **German title** | Überwachungssignal einer Rückfallweiche |
| **English** | Trailable-point monitoring signal |
| **Form** | Form- oder Lichtsignal |
| **DS 301 ref** | — |
| **DV 301 ref** | § 60 (4)–(9) |
| **Source** | SB-DBAG 2006 pp.64–65 |

**Signalbild (DE):** **So 18a** — Zwei weiße Lichter bzw. Scheiben waagerecht nebeneinander. **So 18b** — Ein weißes Licht bzw. Scheibe. Das Mastschild ist orangefarben und weiß gestreift. Bei mechanischen Überwachungssignalen sind anstelle der Lichter eine bzw. zwei rückstrahlende runde weiße Scheiben vorhanden.

**Signal picture (EN):** **So 18a** — two white lights (or discs) side by side, horizontal. **So 18b** — one white light (or disc). The mast-plate is orange with white stripes. On mechanical monitoring signals, one or two retro-reflective round white discs replace the lights.

**Bedeutung (DE):** **So 18a** — Die Rückfallweiche ist gegen die Spitze befahrbar. **So 18b** — Die Rückfallweiche ist gegen die Spitze nicht befahrbar, vor der Weiche anhalten!

**Meaning (EN):** **So 18a** — the trailable point may be run through against the tip (trailable). **So 18b** — the trailable point may **not** be run through against the tip: stop before the point!

- **Siting notes** — § 60 (5): So 18 stands beside or before the trailable point, immediately right of the track. § 60 (6): at So 18b the point may be passed only at walking pace after the trailability has been established on the spot (if necessary after unlocking the securing gear and test-throwing the point by hand). § 60 (7): if lights are extinguished, proceed as for § 60 (6). § 60 (8): where several trailable points follow one So 18, a black numeral on the mast-plate gives the count to which the rules apply. § 60 (9): faults per (6)/(7) are reported at once to the signaller / train controller.

**Maps to →** family `nebensignale` · variant `ueberwachungssignal` · aspect concepts `trailable-point-ok` (So 18a) / `trailable-point-stop` (So 18b). Panel: `lamps` / `poslight` with **white** slots — two white lights (18a) vs one white light (18b) — on an orange-and-white striped mast-plate. Mechanical version renders as `sign` (round white disc(s)). Lamp colour: `white`.

---

### `So 19` — Hauptsignalbaken · *Main-signal beacons*

| Field | Value |
|-------|-------|
| **Signalbegriff** | So 19 |
| **German title** | Hauptsignalbaken |
| **English** | Main-signal beacons |
| **Form** | Formsignal |
| **DS 301 ref** | — |
| **DV 301 ref** | § 61 (1)–(4) |
| **Source** | SB-DBAG 2006 p.65 |

**Signalbild (DE):** *Formsignal:* Drei aufeinanderfolgende, viereckige, orangefarbene Tafeln mit ein, zwei oder drei weißen Kreisflächen, deren Anzahl in Fahrtrichtung abnimmt; die Kreisflächen können rückstrahlend sein.

**Signal picture (EN):** *Form signal:* three successive square orange boards bearing one, two or three white discs, the number decreasing in the direction of travel; the discs may be retro-reflective.

**Bedeutung (DE):** Ein Hauptsignal ist zu erwarten.

**Meaning (EN):** A main signal is to be expected.

- **Siting notes** — § 61 (3): erected — chiefly on lines with automatic block — to announce entry and block signals. § 61 (4): three beacons stand immediately right of the track (left for wrong-direction movements on double track); the last beacon is **100 m** before the main signal, the others at **75 m** spacing.

**Maps to →** family `nebensignale` · variant `nebensignaltafel` · aspect concept `main-beacon`. Panel: `sign` (static, no aspect state; `kind: 'de-hauptsignalbake'` — orange board with 1–3 white discs; render the set of three at 100 m + 75 m + 75 m). No lamps.

---

### `So 106` — Kreuztafel · *Cross board*

| Field | Value |
|-------|-------|
| **Signalbegriff** | So 106 |
| **German title** | Kreuztafel |
| **English** | Cross board |
| **Form** | Formsignal |
| **DS 301 ref** | — |
| **DV 301 ref** | § 70a (1)–(3) |
| **Source** | SB-DBAG 2006 p.66 |

**Signalbild (DE):** *Formsignal:* Eine weiße Sechseckscheibe mit liegendem schwarzem Kreuz an einem schwarz und weiß schräg gestreiften Pfahl.

**Signal picture (EN):** *Form signal:* a white hexagonal board with a black diagonal (saltire) cross, mounted on a post striped diagonally black and white.

**Bedeutung (DE):** Bei fehlendem Vorsignal wird angezeigt, dass ein Hauptsignal zu erwarten ist.

**Meaning (EN):** Where no distant signal exists, it indicates that a main signal is to be expected.

- **Siting notes** — § 70a (2): used only on branch lines (*Nebenbahnen*). § 70a (3): stands at the braking distance laid down for the line, before the main signal, immediately right of the track.

**Maps to →** family `nebensignale` · variant `nebensignaltafel` · aspect concept `cross-board`. Panel: `sign` (static, no aspect state; `kind: 'de-kreuztafel'` — white hexagon, black saltire cross, on a diagonally striped post). No lamps.

---

*Generated from the source scan; translations are provided for study/reference and are not an official DB translation.*
