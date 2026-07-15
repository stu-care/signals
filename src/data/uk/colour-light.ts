import type { SignalFamily } from '../types'

/*
 * UK colour-light Multiple Aspect Signalling (MAS).
 *
 * Lamp column order matches real GB practice:
 *   4-aspect (top -> bottom): yellow (upper) · green · yellow (main) · red
 *   3-aspect (top -> bottom): green · yellow · red
 *   2-aspect (top -> bottom): green · red
 * Red is always lowest. On a 4-aspect head the two yellows are separated by the
 * green so a double yellow reads unambiguously.
 *
 * All coordinates below are plain editable numbers — tune by hand or with the
 * in-app calibration tool, then paste back here.
 */

export const colourLightFamily: SignalFamily = {
  id: 'colour-light',
  name: 'Colour-light signals',
  blurb:
    'The standard modern signal: coloured lamps (red, yellow, double yellow, green) on a black head.',
  intro:
    'Colour-light Multiple Aspect Signalling (MAS) is what you will see on most modern main lines in Train Sim World. A signal shows one aspect at a time using coloured lamps. The number of lamps on the head (two, three or four) sets how many distinct messages it can give — and, crucially, how much warning you get before a red.',
  variants: [
    {
      id: 'colour-light-4',
      name: '4-aspect colour light',
      shortName: '4-aspect',
      blurb:
        'Four lamps: red, single yellow, double yellow, green. Gives two signals of warning before a red.',
      geometry: {
        viewBox: { w: 220, h: 360 },
        post: { x: 94, width: 12, top: 250, bottom: 360 },
        backplates: [{ x: 68, y: 42, w: 64, h: 216, radius: 24 }],
        lamps: [
          { id: 'yellow-upper', x: 100, y: 70, r: 20, colour: 'yellow', label: 'Upper yellow', position: 'top' },
          { id: 'green', x: 100, y: 120, r: 20, colour: 'green', label: 'Green', position: 'upper middle' },
          { id: 'yellow-main', x: 100, y: 170, r: 20, colour: 'yellow', label: 'Yellow', position: 'lower middle' },
          { id: 'red', x: 100, y: 220, r: 20, colour: 'red', label: 'Red', position: 'bottom' },
        ],
        feathers: [
          {
            // GB junction indicators are numbered 1-3 to the left of straight-on
            // and 4-6 to the right. Position 1 is the upper-left indicator (a
            // left-hand divergence): it sits at the top-left shoulder of the head
            // and fans up and to the left (angle -135deg).
            id: 'position-1',
            originX: 66,
            originY: 54,
            angleDeg: -135,
            lampCount: 5,
            spacing: 14,
            r: 6,
            label: 'Junction indicator (position 1 — diverging left)',
          },
        ],
        theatre: { id: 'theatre', x: 74, y: 6, w: 52, h: 30, label: 'Theatre route indicator' },
      },
      aspects: [
        {
          id: 'green',
          name: 'Green',
          meaning: 'Clear',
          concept: 'clear',
          lamps: { green: 'steady' },
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
          lamps: { 'yellow-upper': 'steady', 'yellow-main': 'steady' },
          whatItMeans:
            'Be prepared to find the next signal showing a single yellow. In other words, the signal after next may be at red — you have two signals of warning.',
          whatYouDo:
            'Begin easing off. You do not need to brake hard yet, but plan your speed so that a single yellow at the next signal is comfortable to obey.',
          sequenceNote:
            'Only a 4-aspect signal can show this. It is the extra warning step a 3-aspect signal cannot give.',
          safetyInteraction:
            'Triggers an AWS caution warning (horn) at the AWS magnet — cancel it, or the brakes apply.',
          lookAlikes:
            'Two yellows are the top and third lamps, separated by the green. Do not confuse with a single yellow (one lamp, lower middle).',
          controls:
            'Acknowledge the AWS horn as you pass the magnet (default: Q). Ease the throttle and set up a light brake.',
          related: ['clear', 'caution'],
        },
        {
          id: 'single-yellow',
          name: 'Single yellow',
          meaning: 'Caution',
          concept: 'caution',
          lamps: { 'yellow-main': 'steady' },
          whatItMeans:
            'Be prepared to stop at the next signal. The next signal is showing, or is expected to be showing, a red.',
          whatYouDo:
            'Brake so you can stop at the next signal. Approach it under control and ready to stop.',
          sequenceNote:
            'The last warning before a red on both 3- and 4-aspect signals.',
          safetyInteraction:
            'Triggers an AWS caution warning (horn) — cancel it. On the approach to a red, TPWS may also be arming to stop you if you are too fast or pass the red.',
          lookAlikes:
            'One yellow lamp, lower middle. If two yellows are lit it is a double yellow (preliminary caution), which is a less urgent message.',
          controls: 'Acknowledge AWS (default: Q) and brake for the next signal.',
          related: ['prelim-caution', 'danger'],
        },
        {
          id: 'red',
          name: 'Red',
          meaning: 'Danger — stop',
          concept: 'danger',
          lamps: { red: 'steady' },
          whatItMeans:
            'Stop. You must not pass this signal at danger without authority. The line ahead may be occupied, set against you, or unsafe.',
          whatYouDo:
            'Stop at the signal (at the stop line, before the signal). Wait for it to clear, or for instructions.',
          sequenceNote: 'The bottom of the sequence — the signal every warning aspect is counting down to.',
          safetyInteraction:
            'Protected by TPWS: a train-stop sub-system (TSS) at the signal will apply the brakes if you pass it at danger (a SPAD), and overspeed sensors (OSS) on the approach catch you if you are too fast to stop.',
          lookAlikes:
            'A single red lamp at the bottom. A red with a small pair of white lights below it is a red with a position-light subsidiary — a different message (see subsidiary signals).',
          controls:
            'Stop the train. Passing a red is a SPAD; if TPWS trips, you will need to follow the reset/report procedure before moving.',
          realWorldNote:
            'On the real railway, passing a signal at danger is a serious safety event with a formal procedure. In-game it is a scored/failure event but has no real consequences.',
          related: ['caution'],
        },
        {
          id: 'flashing-double-yellow',
          name: 'Flashing double yellow',
          meaning: 'Preliminary caution — diverging junction ahead',
          concept: 'flashing-prelim-caution',
          lamps: { 'yellow-upper': 'flashing', 'yellow-main': 'flashing' },
          whatItMeans:
            'A diverging (turnout) route is set ahead and you are being routed over it. The flashing double yellow warns you early so you can start slowing for the divergence.',
          whatYouDo:
            'Start reducing speed for the diverging route. Expect a flashing single yellow at the next signal, then a junction indicator (feather) showing your route.',
          sequenceNote:
            'Used on high-speed junctions: flashing double yellow → flashing single yellow → single yellow with a lit feather.',
          safetyInteraction: 'Still gives an AWS caution warning — cancel it.',
          lookAlikes:
            'The lamps flash (roughly once a second). Steady double yellow is the ordinary preliminary caution with no junction implied.',
          controls: 'Acknowledge AWS (default: Q) and begin braking for the turnout speed.',
          related: ['prelim-caution', 'flashing-caution'],
        },
        {
          id: 'flashing-single-yellow',
          name: 'Flashing single yellow',
          meaning: 'Caution — diverging junction next',
          concept: 'flashing-caution',
          lamps: { 'yellow-main': 'flashing' },
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
      geometry: {
        viewBox: { w: 220, h: 310 },
        post: { x: 94, width: 12, top: 200, bottom: 310 },
        backplates: [{ x: 68, y: 42, w: 64, h: 166, radius: 24 }],
        lamps: [
          { id: 'green', x: 100, y: 70, r: 20, colour: 'green', label: 'Green', position: 'top' },
          { id: 'yellow', x: 100, y: 120, r: 20, colour: 'yellow', label: 'Yellow', position: 'middle' },
          { id: 'red', x: 100, y: 170, r: 20, colour: 'red', label: 'Red', position: 'bottom' },
        ],
        feathers: [
          {
            id: 'position-1',
            originX: 66,
            originY: 54,
            angleDeg: -135,
            lampCount: 5,
            spacing: 14,
            r: 6,
            label: 'Junction indicator (position 1 — diverging left)',
          },
        ],
      },
      aspects: [
        {
          id: 'green',
          name: 'Green',
          meaning: 'Clear',
          concept: 'clear',
          lamps: { green: 'steady' },
          whatItMeans: 'The line ahead is clear. Proceed at line speed.',
          whatYouDo: 'Proceed normally, watching the next signal.',
          sequenceNote: 'On a 3-aspect signal the sequence is shorter: green → single yellow → red. There is no double-yellow warning step.',
          safetyInteraction: 'AWS gives a bell/clear indication at green.',
          controls: 'Nothing for the aspect itself.',
          related: ['caution'],
        },
        {
          id: 'single-yellow',
          name: 'Single yellow',
          meaning: 'Caution',
          concept: 'caution',
          lamps: { yellow: 'steady' },
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
          lamps: { red: 'steady' },
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
      geometry: {
        viewBox: { w: 220, h: 260 },
        post: { x: 94, width: 12, top: 150, bottom: 260 },
        backplates: [{ x: 68, y: 42, w: 64, h: 116, radius: 24 }],
        lamps: [
          { id: 'green', x: 100, y: 70, r: 20, colour: 'green', label: 'Green', position: 'top' },
          { id: 'red', x: 100, y: 120, r: 20, colour: 'red', label: 'Red', position: 'bottom' },
        ],
      },
      aspects: [
        {
          id: 'green',
          name: 'Green',
          meaning: 'Clear',
          concept: 'clear',
          lamps: { green: 'steady' },
          whatItMeans: 'Clear — proceed.',
          whatYouDo: 'Proceed at line speed.',
          related: ['danger'],
        },
        {
          id: 'red',
          name: 'Red',
          meaning: 'Danger — stop',
          concept: 'danger',
          lamps: { red: 'steady' },
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
