import type { SafetySystem } from '../types'

/*
 * UK safety systems. Game-first spine; "Real-world note" only where TSW diverges.
 * Cross-linked from aspect pages via the safetyInteraction field.
 */
export const ukSafetySystems: SafetySystem[] = [
  {
    id: 'aws',
    abbr: 'AWS',
    name: 'Automatic Warning System',
    blurb:
      'The "sunflower". Gives you an in-cab audible and visual warning of the aspect you are approaching.',
    whatItIs:
      'AWS uses a magnet in the track a short distance before a signal. As you pass it, the system tells you whether the signal is showing a green (clear) or any more restrictive aspect (caution or danger), so you get a warning even before you can see the signal.',
    driverExperience:
      'At a clear (green) signal you hear a bell/chime and see no change. At any other aspect you hear a horn and must cancel it; the in-cab indicator then shows the black-and-yellow "sunflower" until the next AWS magnet, reminding you that you acknowledged a warning.',
    howYouInteract:
      'When the horn sounds, cancel (acknowledge) it promptly. If you do not, the brakes apply automatically. Cancelling only silences the warning — you must still act on the actual aspect ahead.',
    aspectInteraction:
      'Green → bell/clear, no action. Single yellow, double yellow, red, and most other restrictive aspects → horn you must acknowledge. AWS does not know the exact aspect, only "clear" versus "caution/danger".',
    controls:
      'AWS reset/acknowledge — default keyboard binding is Q (bindings are user-configurable and differ on console; check your control setup).',
    edgeBehaviour:
      'If you acknowledge but do nothing, you keep moving toward the restriction — AWS is a reminder, not a stop system. Stopping you if you ignore a red is the job of TPWS.',
  },
  {
    id: 'tpws',
    abbr: 'TPWS',
    name: 'Train Protection & Warning System',
    blurb:
      'Applies the brakes automatically if you pass a red, or approach one too fast to stop.',
    whatItIs:
      'TPWS adds automatic braking at higher-risk signals and speed restrictions. It uses pairs of loops in the track: a Train Stop Sub-system (TSS) at the signal, and Overspeed Sensors (OSS) on the approach.',
    driverExperience:
      'You normally never notice TPWS — it only acts if something has gone wrong. If it triggers, it makes a full brake application and you get a TPWS indication in the cab that must be acknowledged, after which there is a mandatory delay before you can move.',
    howYouInteract:
      'Drive so TPWS never intervenes: obey cautions, brake in good time, and stop at reds. If it does trip, you follow the reset procedure (acknowledge, wait the enforced delay, then proceed only with authority).',
    aspectInteraction:
      'At a red signal the TSS trips the brakes if you pass it (a SPAD). On the approach, the OSS trips the brakes if you are travelling too fast to stop at the red. It also protects some speed restrictions and buffer stops.',
    controls:
      'TPWS acknowledge/reset — bindings vary; it usually shares the AWS acknowledge control plus a brake-release sequence. Check your control setup.',
    realWorldNote:
      'The enforced post-trip delay and reporting requirements are safety-critical in reality. In-game the trip and delay are modelled, but there are no real consequences.',
  },
  {
    id: 'dra',
    abbr: 'DRA',
    name: "Driver's Reminder Appliance",
    blurb:
      'A manual reminder you set when held at a red, so you do not start away against it.',
    whatItIs:
      'The DRA is a simple switch in the cab. When you are stopped at a red signal, you set it as a reminder. With it set, power is inhibited so the train will not take power.',
    driverExperience:
      'You set the DRA (a prominent button/switch, often illuminated) when you stop at a red. When the signal clears, you cancel the DRA before taking power to move off.',
    howYouInteract:
      'Set it when stopping at a red; cancel it only when you have a proceed aspect and are ready to move. It is a discipline aid against the classic mistake of starting away against a red.',
    aspectInteraction:
      'Purely a driver reminder — it does not read signals. It complements AWS/TPWS by guarding the stand-at-red case that those systems handle differently.',
    controls:
      'Set/cancel DRA — default keyboard binding is often the same DRA control key; check your control setup. Remember to cancel it before trying to move.',
  },
  {
    id: 'ertms',
    abbr: 'ERTMS/ETCS',
    name: 'ERTMS / ETCS Level 2 (in-cab)',
    blurb:
      'In-cab signalling with no lineside aspects — the movement authority appears on the driver’s display.',
    whatItIs:
      'On ERTMS Level 2 lines (such as the Cambrian in TSW) there are no colour-light signals to read. Your authority to move, target speeds, and braking curves are shown on the in-cab Driver Machine Interface (DMI).',
    driverExperience:
      'You drive to the DMI: it shows your permitted speed, the next target, and how far you can go. There is nothing to "sight" at the lineside beyond marker boards.',
    howYouInteract:
      'Follow the DMI speed and distance information and respond to its warnings. Because there are no lineside aspects, this reference focuses elsewhere for now.',
    aspectInteraction:
      'Not applicable — there are no lineside aspects to identify. This page is a stub; a full ERTMS/DMI guide is planned for a later release.',
    realWorldNote:
      'ERTMS is a live, expanding system on the real network. This entry is intentionally brief in v1 because the site’s focus is identifying lineside aspects.',
  },
]
