import type { LampsPanel, SignalFamily } from '../types'

/*
 * UK colour-light Multiple Aspect Signalling (MAS), drawn as dots.
 * Column order (top -> bottom): 4-aspect yellow · green · yellow · red;
 * 3-aspect green · yellow · red; 2-aspect green · red. Red is always lowest.
 * The junction feather and theatre indicator are separate panels below the head.
 */

const R = 11
const SP = 28 // centre-to-centre spacing

function head(ids: Array<[string, 'red' | 'yellow' | 'green', string]>): LampsPanel {
  return {
    type: 'lamps',
    id: 'head',
    w: 30,
    h: (ids.length - 1) * SP + R * 2 + 8,
    lamps: ids.map(([id, color, label], i) => ({
      id,
      color,
      x: 15,
      y: R + 4 + i * SP,
      r: R,
      label,
    })),
  }
}

export const colourLightFamily: SignalFamily = {
  id: 'colour-light',
  name: 'Colour-light signals',
  blurb:
    'The standard modern signal: coloured lamps (red, yellow, double yellow, green).',
  intro:
    'Colour-light Multiple Aspect Signalling (MAS) is what you will see on most modern main lines in Train Sim World. A signal shows one aspect at a time using coloured lamps. The number of lamps (two, three or four) sets how many messages it can give — and how much warning you get before a red.',
  variants: [
    {
      id: 'colour-light-4',
      name: '4-aspect colour light',
      shortName: '4-aspect',
      blurb:
        'Four lamps: red, single yellow, double yellow, green. Two signals of warning before a red.',
      panels: [
        head([
          ['yellow-upper', 'yellow', 'Upper yellow'],
          ['green', 'green', 'Green'],
          ['yellow-main', 'yellow', 'Yellow'],
          ['red', 'red', 'Red'],
        ]),
        { type: 'feather', id: 'feather', dir: 'ul', r: 5, label: 'Junction indicator (feather)' },
        { type: 'glyph', id: 'theatre', size: 24, label: 'Theatre route indicator' },
      ],
      aspects: [
        {
          id: 'green',
          name: 'Green',
          meaning: 'Clear',
          concept: 'clear',
          lamps: { green: 'on' },
          whatItMeans:
            'The line ahead is clear for at least the next three signals. You may run at the maximum permitted line speed.',
          whatYouDo:
            'Proceed normally at line speed. Keep looking ahead — the next signal could be showing anything.',
          sequenceNote:
            'Sits at the top of the sequence: green → double yellow → single yellow → red.',
          safetyInteraction:
            'AWS gives a bell (or a short in-cab chime) at a green — no acknowledgement needed. Any other aspect gives a horn you must cancel.',
          controls:
            'Nothing to do for the aspect itself. If AWS sounds a warning at the next signal, acknowledge it (default keyboard binding: Q).',
          related: ['prelim-caution'],
        },
        {
          id: 'double-yellow',
          name: 'Double yellow',
          meaning: 'Preliminary caution',
          concept: 'prelim-caution',
          lamps: { 'yellow-upper': 'on', 'yellow-main': 'on' },
          whatItMeans:
            'Be prepared to find the next signal showing a single yellow. The signal after next may be at red — you have two signals of warning.',
          whatYouDo:
            'Begin easing off. You do not need to brake hard yet, but plan your speed so a single yellow at the next signal is comfortable to obey.',
          sequenceNote:
            'Only a 4-aspect signal can show this. It is the extra warning step a 3-aspect signal cannot give.',
          safetyInteraction:
            'Triggers an AWS caution warning (horn) at the AWS magnet — cancel it, or the brakes apply.',
          lookAlikes:
            'Two yellows are the top and third lamps, separated by the green. Do not confuse with a single yellow (one lamp, lower middle).',
          controls: 'Acknowledge the AWS horn as you pass the magnet (default: Q). Ease off and set up a light brake.',
          related: ['clear', 'caution'],
        },
        {
          id: 'single-yellow',
          name: 'Single yellow',
          meaning: 'Caution',
          concept: 'caution',
          lamps: { 'yellow-main': 'on' },
          whatItMeans:
            'Be prepared to stop at the next signal. The next signal is showing, or is expected to be showing, a red.',
          whatYouDo:
            'Brake so you can stop at the next signal. Approach it under control and ready to stop.',
          sequenceNote: 'The last warning before a red on both 3- and 4-aspect signals.',
          safetyInteraction:
            'Triggers an AWS caution warning (horn) — cancel it. On the approach to a red, TPWS may also be arming to stop you if you are too fast or pass the red.',
          lookAlikes:
            'One yellow lamp, lower middle. If two yellows are lit it is a double yellow (preliminary caution), a less urgent message.',
          controls: 'Acknowledge AWS (default: Q) and brake for the next signal.',
          related: ['prelim-caution', 'danger'],
        },
        {
          id: 'red',
          name: 'Red',
          meaning: 'Danger — stop',
          concept: 'danger',
          lamps: { red: 'on' },
          whatItMeans:
            'Stop. You must not pass this signal at danger without authority. The line ahead may be occupied, set against you, or unsafe.',
          whatYouDo: 'Stop at the signal (at the stop line, before the signal). Wait for it to clear, or for instructions.',
          sequenceNote: 'The bottom of the sequence — the signal every warning aspect is counting down to.',
          safetyInteraction:
            'Protected by TPWS: a train-stop sub-system (TSS) at the signal applies the brakes if you pass it at danger (a SPAD), and overspeed sensors (OSS) on the approach catch you if you are too fast to stop.',
          lookAlikes:
            'A single red lamp at the bottom. A red with a small pair of white lights below it is a red with a position-light subsidiary — a different message.',
          controls:
            'Stop the train. Passing a red is a SPAD; if TPWS trips you must follow the reset/report procedure before moving.',
          realWorldNote:
            'On the real railway, passing a signal at danger is a serious safety event with a formal procedure. In-game it is a scored/failure event but has no real consequences.',
          related: ['caution'],
        },
        {
          id: 'flashing-double-yellow',
          name: 'Flashing double yellow',
          meaning: 'Preliminary caution — diverging junction ahead',
          concept: 'flashing-prelim-caution',
          lamps: { 'yellow-upper': 'flash', 'yellow-main': 'flash' },
          whatItMeans:
            'A diverging (turnout) route is set ahead and you are being routed over it. The flashing double yellow warns you early so you can start slowing for the divergence.',
          whatYouDo:
            'Start reducing speed for the diverging route. Expect a flashing single yellow at the next signal, then a junction indicator (feather) showing your route.',
          sequenceNote:
            'Used on high-speed junctions: flashing double yellow → flashing single yellow → single yellow with a lit feather.',
          safetyInteraction: 'Still gives an AWS caution warning — cancel it.',
          lookAlikes:
            'The lamps flash (about once a second). Steady double yellow is the ordinary preliminary caution with no junction implied.',
          controls: 'Acknowledge AWS (default: Q) and begin braking for the turnout speed.',
          related: ['prelim-caution', 'flashing-caution'],
        },
        {
          id: 'flashing-single-yellow',
          name: 'Flashing single yellow',
          meaning: 'Caution — diverging junction next',
          concept: 'flashing-caution',
          lamps: { 'yellow-main': 'flash' },
          whatItMeans:
            'You are approaching the junction signal for a diverging route. The next signal will show a steady single yellow with a junction indicator (feather) for your route.',
          whatYouDo:
            'Continue slowing for the diverging route. Read the feather at the next signal to confirm which way you are going.',
          sequenceNote: 'Follows a flashing double yellow on high-speed junction approaches.',
          safetyInteraction: 'Gives an AWS caution warning — cancel it.',
          lookAlikes: 'The single yellow flashes. A steady single yellow means an ordinary caution with no diverging route implied here.',
          controls: 'Acknowledge AWS (default: Q); be ready to read the junction indicator ahead.',
          related: ['flashing-prelim-caution', 'caution'],
        },
      ],
    },
    {
      id: 'colour-light-3',
      name: '3-aspect colour light',
      shortName: '3-aspect',
      blurb: 'Three lamps: red, single yellow, green. One signal of warning before a red.',
      panels: [
        head([
          ['green', 'green', 'Green'],
          ['yellow', 'yellow', 'Yellow'],
          ['red', 'red', 'Red'],
        ]),
        { type: 'feather', id: 'feather', dir: 'ul', r: 5, label: 'Junction indicator (feather)' },
      ],
      aspects: [
        {
          id: 'green',
          name: 'Green',
          meaning: 'Clear',
          concept: 'clear',
          lamps: { green: 'on' },
          whatItMeans: 'The line ahead is clear. Proceed at line speed.',
          whatYouDo: 'Proceed normally, watching the next signal.',
          sequenceNote:
            'On a 3-aspect signal the sequence is shorter: green → single yellow → red. There is no double-yellow warning step.',
          safetyInteraction: 'AWS gives a bell/clear indication at green.',
          controls: 'Nothing for the aspect itself.',
          related: ['caution'],
        },
        {
          id: 'single-yellow',
          name: 'Single yellow',
          meaning: 'Caution',
          concept: 'caution',
          lamps: { yellow: 'on' },
          whatItMeans: 'Be prepared to stop at the next signal.',
          whatYouDo: 'Brake so you can stop at the next signal.',
          sequenceNote: 'Your only warning of a red ahead on a 3-aspect line, so treat it seriously.',
          safetyInteraction: 'AWS caution warning (horn) — cancel it.',
          controls: 'Acknowledge AWS (default: Q) and brake for the next signal.',
          related: ['clear', 'danger'],
        },
        {
          id: 'red',
          name: 'Red',
          meaning: 'Danger — stop',
          concept: 'danger',
          lamps: { red: 'on' },
          whatItMeans: 'Stop. Do not pass without authority.',
          whatYouDo: 'Stop at the signal and wait.',
          safetyInteraction: 'Protected by TPWS (TSS at the signal, OSS on the approach).',
          controls: 'Stop the train.',
          related: ['caution'],
        },
      ],
    },
    {
      id: 'colour-light-2',
      name: '2-aspect colour light',
      shortName: '2-aspect',
      blurb: 'Two lamps. A stop signal shows red or green; a distant shows yellow or green.',
      panels: [
        head([
          ['green', 'green', 'Green'],
          ['red', 'red', 'Red'],
        ]),
      ],
      aspects: [
        {
          id: 'green',
          name: 'Green',
          meaning: 'Clear',
          concept: 'clear',
          lamps: { green: 'on' },
          whatItMeans: 'Clear — proceed.',
          whatYouDo: 'Proceed at line speed.',
          related: ['danger'],
        },
        {
          id: 'red',
          name: 'Red',
          meaning: 'Danger — stop',
          concept: 'danger',
          lamps: { red: 'on' },
          whatItMeans: 'Stop. Do not pass without authority.',
          whatYouDo: 'Stop at the signal.',
          safetyInteraction: 'Protected by TPWS.',
          controls: 'Stop the train.',
          realWorldNote:
            'A 2-aspect signal can be a stop signal (red/green) or a distant (yellow/green) that only ever cautions — it can never show red. Which one you are looking at depends on the layout; the game models both.',
          related: ['clear'],
        },
      ],
    },
  ],
}
