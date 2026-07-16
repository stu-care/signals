# Signalbuch (SB) DS/DV 301 — DBAG 2006

A structured, English-translated reference derived from **_Die Signale der Deutschen Bahn AG — Signalbuch (SB) DS/DV 301_**, valid from **10 December 2006** (Bekanntgabe 6).

This folder converts the scanned signalbook into a Markdown data structure that (a) keeps every original German title, (b) provides an English translation, (c) preserves the original section references so a figure can be found again in the source scan, and (d) maps each signal onto the app's own data model in [`src/data/types.ts`](../../src/data/types.ts).

> **Source scan:** `SB-DBAG_2006_unlocked.pdf` (75 pp.) — © BahnStatistik.de. Page numbers cited in each entry (`SB-DBAG 2006 p.N`) are the **printed** page numbers, which match the PDF page numbers 1:1. Use them to pull the original figure/photo when you need the artwork.

---

## How the source is organised (and why there are two reference columns)

The 2006 book is a **merger of two former rulebooks**, printed side by side:

| Column | Rulebook | Applies to the former… | Reference style |
|--------|----------|------------------------|-----------------|
| **Left** | **DS 301** | Deutsche Bundesbahn (DB, West) | `ESO (n)` and `AB n` (Ausführungsbestimmungen) |
| **Right** | **DV 301** | Deutsche Reichsbahn (DR, East) | `§ n (m)` (paragraph/subsection) |

Identical rules run full-width; where the two rulebooks differ, DS 301 is on the left and DV 301 on the right. Both remain independently valid in their own territories. **We retain both reference styles** on every signal so you can trace back to whichever column a detail came from. Passages marked **Zusatz** ("addendum") are DB AG additions.

`ESO` = *Eisenbahn-Signalordnung* (the federal signalling regulation the whole book implements). `AB` = *Ausführungsbestimmung* (implementing provision). "(bleibt frei)" = "left blank/reserved".

---

## File index

| File | Chapter (DE) | Chapter (EN) | Signals |
|------|--------------|--------------|---------|
| [00-allgemeines.md](00-allgemeines.md) | Allgemeines / Mastschilder | General provisions, mast plates, invalidity cross | ESO scope, definitions, Mastschilder, So 20, Ungültigkeitskreuz |
| [01-hauptsignale-hp.md](01-hauptsignale-hp.md) | Hauptsignale (Hp) | Main signals | Hp 0, Hp 1, Hp 2 |
| [02-vorsignale-vr.md](02-vorsignale-vr.md) | Vorsignale (Vr) | Distant signals | Vr 0, Vr 1, Vr 2, Vr 1/2 |
| [03-kombinationssignale-ks.md](03-kombinationssignale-ks.md) | Kombinationssignale (Ks) | Combination signals | Ks 1, Ks 2 (+ Hp 0) |
| [04-lichthaupt-lichtvorsignale-hl.md](04-lichthaupt-lichtvorsignale-hl.md) | Lichthaupt- und Lichtvorsignale (Hl) | Colour-light main & distant (former DR) | Hl 1–Hl 13 |
| [05-haupt-vorsignalverbindungen-sv.md](05-haupt-vorsignalverbindungen-sv.md) | Haupt- und Vorsignalverbindungen (Sv) | Combined main+distant (S-Bahn) | Sv 0–Sv 6 |
| [06-zusatzsignale-zs.md](06-zusatzsignale-zs.md) | Zusatzsignale (Zs) | Supplementary signals | Zs 1, 2, 2v, 3, 3v, 6, 7, 8, 10, 12, 13, 103, 9 |
| [07-schiebedienstsignale-ts.md](07-schiebedienstsignale-ts.md) | Signale für Schiebelok. u. Sperrfahrten (Ts) | Banking-loco & blocking-run signals | Ts 1, Ts 2, Ts 3 |
| [08-langsamfahrsignale-lf.md](08-langsamfahrsignale-lf.md) | Langsamfahrsignale (Lf) | Slow-speed signals | Lf 1, 1/2, 2, 3, 4, 5, 6, 7 |
| [09-schutzsignale-sh.md](09-schutzsignale-sh.md) | Schutzsignale (Sh) / (Gsp) | Protection signals | Sh 0, 1, 2, 3, 5; Gsp 2; Ra 12 |
| [10-rangiersignale-ra.md](10-rangiersignale-ra.md) | Signale für den Rangierdienst (Ra) | Shunting signals | Ra 1–13 |
| [11-weichensignale-wn.md](11-weichensignale-wn.md) | Weichensignale (Wn) | Point (switch) indicators | Wn 1–Wn 6 |
| [12-signale-fuer-zugpersonal-zp.md](12-signale-fuer-zugpersonal-zp.md) | Signale für das Zugpersonal (Zp) | Train-crew signals | Zp 1–Zp 12 |
| [13-fahrleitungssignale-el.md](13-fahrleitungssignale-el.md) | Fahrleitungssignale (El) | Overhead-line signals | El 1v, 1, 2, 3, 4, 5, 6 |
| [14-signale-an-zuegen-und-fahrzeugen-zg-fz.md](14-signale-an-zuegen-und-fahrzeugen-zg-fz.md) | Signale an Zügen / Fahrzeugen (Zg/Fz) | Signals on trains & vehicles | Zg 1, Zg 2, Fz 1, Fz 2 |
| [15-rottenwarnsignale-ro.md](15-rottenwarnsignale-ro.md) | Rottenwarnsignale (Ro) | Track-gang warning signals | Ro 1–Ro 4 |
| [16-nebensignale-ne-so.md](16-nebensignale-ne-so.md) | Nebensignale (Ne) / Sonstige (So) | Auxiliary & other signals | Ne 1–7, So 1, So 17–19, So 106 |
| [17-signale-fuer-bahnuebergaenge-bue.md](17-signale-fuer-bahnuebergaenge-bue.md) | Signale für Bahnübergänge (Bü) | Level-crossing signals | Bü 0/1/100/101, 2, 3, 4, 5; Pf 2; So 14/15 |
| [18-orientierungszeichen.md](18-orientierungszeichen.md) | Orientierungszeichen | Orientation markers (not ESO signals) | Zugfunk, LZB, hektometer, tunnel, etc. |

---

## Per-signal template

Every signal is one `###` section, laid out identically:

```markdown
### `Hp 2` — Langsamfahrt · *Slow speed*

| Field | Value |
|-------|-------|
| **Signalbegriff** | Hp 2 |
| **German title** | Langsamfahrt |
| **English** | Proceed at slow speed |
| **Form** | Formsignal + Lichtsignal |
| **DS 301 ref** | AB 13 |
| **DV 301 ref** | § 3 (7)–(9) |
| **Source** | SB-DBAG 2006 p.8 |

**Signalbild (DE):** *…verbatim German description…*

**Signal picture (EN):** *…English translation…*

**Bedeutung (DE):** *…German meaning…*

**Meaning (EN):** *…English meaning…*

**Maps to →** family `hauptsignale` · variant `formhauptsignal` + `lichthauptsignal` · aspect concept `slow-clear`. Panels: `arm` (kind `stop`, two arms) and/or `lamps` (green + yellow vertical). Lamp colours: `green`, `yellow`.
```

- Keep the German **verbatim** (typos in the scan are silently corrected only where the meaning is unambiguous).
- If a field is not stated in the source, write `—`.
- Where DS 301 and DV 301 give the signal different begriffe (e.g. `Zs 6` / `Zs 7`), note both.

---

## Mapping to the app data model (`src/data/types.ts`)

The goal of the **Maps to →** line is to say, in the app's own vocabulary, how this signal would be built. Use these correspondences:

### Families & variants
- A **chapter** (Hp, Vr, Ks, …) → a `SignalFamily` (`families/*.json`). Suggested family `id`s are given per file (kebab-case, e.g. `hauptsignale`, `vorsignale`).
- A **Formsignal vs Lichtsignal** rendering of the same signal → two `SignalVariant`s (e.g. `formhauptsignal`, `lichthauptsignal`), because the panels differ.
- Individual signal *begriffe* that share a head (Hp 0/1/2) are usually **aspects of one variant**, not separate variants.

### Panels (`Panel` union)
| Source signal form | Panel type | Notes |
|--------------------|-----------|-------|
| Colour-light head (Hp, Ks, Hl, Sv lights) | `lamps` / `lamps-ref` | one `LampSlot` per lamp; `color` + `x/y/r` |
| Semaphore arm (Formsignal Flügel) | `arm`, kind `stop` | Hp form arms; two-arm Hp 2 = two arms |
| Distant disc/arm (Formvorsignal) | `arm`, kind `distant` | Vr yellow disc + flap |
| Two white lights on a diagonal (Sh 1, Ra 12, Wn 1 light) | `poslight` | `dir: 'ur'` |
| Speed figure / lettered indicator (Zs 3, Zs 3v, Zs 2) | `glyph` | `tone: 'yellow'` for the *v* (announce) variants |
| Lineside board / plate (Lf, Ne, So, Bü boards, El boards) | `sign` | static, **no aspect state**; `kind: 'de-…'` |
| Route/junction feathers | `feather` / `junction` | rare in DE; most DE route info is a `glyph` |

`LampColour` values available: `red · amber · yellow · green · white · lunar · blue`. German signals use **red, green, yellow, white** almost exclusively; overhead-line/orientation boards are **blue/white** plates (render as `sign`, not lamps).

### Aspect `concept` ids (cross-country links)
Reuse an existing shared concept id where the **meaning** genuinely matches, so a German aspect cross-links to the UK equivalent. Existing ids in the app: `danger · clear · caution · prelim-caution · flashing-caution · flashing-prelim-caution · dark`. Apply as:

| Concept id | Use for |
|-----------|---------|
| `danger` | Hp 0, Hl 13, Sh 0, Sv 0-with-Hp0 — "Halt" |
| `clear` | Hp 1, Ks 1, Hl 1, Sv 1 — "Fahrt" at line speed |
| `caution` | Vr 0, Ks 2, Hl 10 — "Halt erwarten" (expect stop) |
| `dark` | Kennlicht / switched-off signal (weißes Licht) |

Where there is **no** UK equivalent, coin a clear, consistent kebab-case id and reuse it across files. Recommended coined ids: `slow-clear` (Hp 2 — proceed 40 km/h), `expect-clear` (Vr 1), `expect-slow` (Vr 2), `substitute` (Zs 1 Ersatzsignal), `proceed-on-sight` (Zs 7 Vorsichtsignal), `wrong-line` (Zs 6/Zs 8), `shunting-permitted` (Sh 1 / Ra 12), `shunting-stop` (Ra 5). Keep them stable so future work can wire real cross-links.

---

*Generated from the source scan; translations are provided for study/reference and are not an official DB translation.*
