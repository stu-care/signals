import type { SignalFamily } from '../types'

/*
 * Ground position-light (GPL) shunt signal. A small, ground-mounted signal used
 * for shunting moves. Two red lights side by side = stop; two white lights at
 * 45° (lower-left to upper-right) = proceed.
 *
 * The lower-left red and lower-left white share a lens position, so the renderer
 * draws all off-lenses first and lit lenses on top (see SignalRenderer).
 */
export const groundSignalFamily: SignalFamily = {
  id: 'ground-position-light',
  name: 'Ground position-light signals',
  blurb: 'Small ground signals for shunting: two reds = stop, two whites at 45° = proceed.',
  intro:
    'A ground position-light signal (GPL) controls shunting and low-speed movements. It sits at ground level and shows its message by the position and colour of two lit lights: horizontal red for stop, or a 45° pair of white lights for proceed. You meet these in yards, sidings and around station throats in Train Sim World.',
  variants: [
    {
      id: 'gpl',
      name: 'Ground position-light signal',
      shortName: 'GPL',
      blurb: 'Two red = stop; two white at 45° = proceed for shunting.',
      geometry: {
        viewBox: { w: 200, h: 200 },
        post: { x: 95, width: 10, top: 168, bottom: 200 },
        backplates: [{ x: 52, y: 70, w: 96, h: 96, radius: 16 }],
        lamps: [
          { id: 'red-left', x: 80, y: 132, r: 15, colour: 'red', label: 'Red (left)' },
          { id: 'red-right', x: 120, y: 132, r: 15, colour: 'red', label: 'Red (right)' },
          { id: 'white-left', x: 80, y: 132, r: 15, colour: 'white', label: 'White (lower left)' },
          { id: 'white-upper', x: 120, y: 92, r: 15, colour: 'white', label: 'White (upper right)' },
        ],
      },
      aspects: [
        {
          id: 'danger',
          name: 'Two red (horizontal)',
          meaning: 'Stop',
          concept: 'gpl-danger',
          lamps: { 'red-left': 'steady', 'red-right': 'steady' },
          whatItMeans:
            'Two red lights side by side. Stop — you must not pass this ground signal.',
          whatYouDo: 'Stop and wait for the signal to clear to the white proceed position.',
          lookAlikes:
            'Two horizontal reds mean stop. Two whites climbing to the right mean proceed. Do not confuse a GPL with a main position-light subsidiary under a colour-light signal.',
          controls: 'Stop the train.',
          related: ['gpl-proceed'],
        },
        {
          id: 'proceed',
          name: 'Two white (45°)',
          meaning: 'Proceed (shunt)',
          concept: 'gpl-proceed',
          lamps: { 'white-left': 'steady', 'white-upper': 'steady' },
          whatItMeans:
            'Two white lights at 45°. You may proceed, but be ready to stop short of any train, vehicle or obstruction ahead — this is a low-speed shunting move.',
          whatYouDo:
            'Move forward slowly and under full control, prepared to stop short of anything in the way.',
          controls: 'Take power gently and keep the speed low.',
          related: ['gpl-danger'],
        },
      ],
    },
  ],
}
