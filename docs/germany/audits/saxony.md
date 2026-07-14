# Saxony route audit

Status: **in progress**  
Last reviewed: **14 July 2026**

This audit covers the first route group selected for detailed research:

- Bahnstrecke Leipzig–Dresden
- Nahverkehr Dresden (Dresden–Riesa)
- Tharandter Rampe (Dresden–Chemnitz)
- Rapid Transit

The purpose of this stage is not to document every real German signal that could exist. It is to establish which systems and player-relevant behaviours are demonstrably represented in Train Sim World.

## Confirmed findings

### Bahnstrecke Leipzig–Dresden

Dovetail describes this as a 160 km expansion of Dresden–Riesa, adding the Riesa–Leipzig extension, the Dresden–Coswig line and Friedrichstadt yard.

The following are confirmed by first-party Dovetail material:

| Item | Status | Player relevance |
|---|---|---|
| Hl lineside signalling | Confirmed in the Dresden area | Players must recognise the former Deutsche Reichsbahn aspect system. |
| Ks lineside signalling | Confirmed in the Dresden area | Players must recognise modern combination signals and the change of visual language from Hl. |
| PZB | Confirmed | Included German rolling stock supports PZB; exact infrastructure coverage still needs mapping. |
| LZB | Confirmed | ICE services use LZB on the western part of the route. |
| Sifa | Confirmed | Present on included rolling stock. |
| GNT | Confirmed as an ICE-T feature | Available on the BR 411, although Dovetail says it is less relevant here than on Frankfurt–Fulda. |
| Temporary speed restriction signs | Confirmed TSW 6 feature | These can appear when Random Events are enabled. |
| Signal delays | Confirmed TSW 6 feature | Random Events can create unexpectedly restrictive aspects. |

This makes Leipzig–Dresden a particularly useful reference route because a player can encounter both Hl and Ks signalling, conventional PZB supervision, an LZB section, shunting and freight activity, and dynamically introduced restrictions.

## What is not yet confirmed

The official sources currently establish system presence but not a complete asset or aspect inventory. The following still require direct visual or in-game observation:

- the exact geographical boundary between Hl and Ks
- every Hl aspect displayed in timetable or scenario operation
- every Ks aspect displayed in timetable or scenario operation
- Zs indicators and the values actually represented
- Sh and Ra indications used in yards and depot movements
- LZB start, end and transition boards
- PZB magnet placement and speed-check arrangements
- temporary speed restriction board sequence used by Random Events
- differences between the original Dresden–Riesa route and its TSW 6 expansion

## Route relationships

Dovetail states that owners of Leipzig–Dresden receive the earlier Dresden–Riesa add-on entitlement. This proves the product relationship, but it does **not** by itself prove that every signal asset or implementation detail is identical between the two route versions. Those versions remain separate audit targets.

Tharandter Rampe and Rapid Transit are still awaiting adequate primary evidence. They are retained in this audit group because they can add BR 612 and BR 1442 traffic to Leipzig–Dresden and because both may expose additional East German or S-Bahn signalling cases.

## Sources

1. Dovetail Games, *Bahnstrecke Leipzig - Dresden Gameplay Guide*, updated 13 March 2026.  
   <https://support.dovetailgames.com/hc/en-us/articles/29546830934418-Bahnstrecke-Leipzig-Dresden-Gameplay-Guide>
2. Dovetail Games, *Train Sim World 6 – New Horizons to Leipzig*.  
   <https://live.dovetailgames.com/live/train-sim-world/articles/article/train-sim-world-6-leipzig-dresden>

## Next observation pass

The next pass should record signal assemblies rather than only systems. For each observed signal, capture:

1. route and location
2. running direction and track
3. physical signal family
4. illuminated aspect
5. subsidiary indicators
6. nearby boards and magnets
7. required player action
8. game mode and service
9. screenshot or video timestamp
10. confidence and any apparent discrepancy
