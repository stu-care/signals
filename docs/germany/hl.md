# Hl signalling

Hl is a combined main and distant signalling system formerly standard on the Deutsche Reichsbahn network. It remains relevant to Train Sim World because Dovetail confirms Hl and Ks coexist in the Dresden area of Bahnstrecke Leipzig–Dresden.

## The quick way to read an Hl signal

Read it as two messages:

1. **Lower part: speed from this signal**
   - no lower speed indication: line speed
   - lower yellow: 40 km/h
   - lower yellow plus yellow strip: 60 km/h
   - lower yellow plus green strip: 100 km/h
2. **Upper part: speed expected at the next main signal**
   - steady green: line speed
   - flashing green: 100 km/h
   - flashing yellow: 40 or 60 km/h
   - steady yellow: stop

This produces the numbered family Hl 1 through Hl 12b. Hp 0 is the stop aspect, formerly called Hl 13.

## Player guidance

A restrictive lower indication applies from the signal and must be reached by it. The upper indication is advance information for the next main signal. A steady upper yellow therefore means prepare to stop, while a flashing upper yellow warns of either 40 or 60 km/h (the exact value is shown at the next signal).

PZB actions remain conditional on the associated simulated magnet. The site must not infer magnet activation solely from the visible aspect.

## Current implementation

The repository now contains:

- a machine-readable matrix for all 17 Hl displays;
- reusable current-speed and next-speed encoding;
- a recognition-grade large Hl signal head;
- starter SVGs for Hl 1 and Hl 10;
- empty route-evidence arrays awaiting direct TSW observations.

## Evidence status

The system logic and aspect meanings are high confidence and cross-reference DB InfraGO Ril 301.0103 through the cited technical source. Exact TSW head geometry, lamp omissions, mast plates, routes and aspect occurrence require direct visual evidence.

Publicly searchable material located in this pass confirmed route-level Hl presence but did not provide stable, timestamped evidence suitable for claiming individual Dresden signal assemblies. Those claims remain deliberately unfilled rather than inferred.
