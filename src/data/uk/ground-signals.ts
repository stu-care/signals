import type { SignalFamily } from '../types'

/*
 * Ground position-light (GPL) shunt signal, drawn as dots on a free canvas.
 * Two red dots side by side = stop; two white dots rising from bottom-right up
 * to the top-left = proceed (the upper white offset up and to the left of the
 * bottom-left lamp). The lower white shares a position with the left-hand red.
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
      panels: [
        {
          type: 'lamps',
          id: 'gpl',
          w: 90,
          h: 84,
          lamps: [
            { id: 'red-left', x: 44, y: 64, r: 10, color: 'red', label: 'Red (left)' },
            { id: 'red-right', x: 72, y: 64, r: 10, color: 'red', label: 'Red (right)' },
            { id: 'white-lower', x: 44, y: 64, r: 10, color: 'white', label: 'White (lower)' },
            { id: 'white-upper', x: 18, y: 40, r: 10, color: 'white', label: 'White (upper left)' },
          ],
        },
      ],
      aspects: [
        {
          id: 'danger',
          name: 'Two red (horizontal)',
          meaning: 'Stop',
          concept: 'gpl-danger',
          lamps: { 'red-left': 'on', 'red-right': 'on' },
          whatItMeans: 'Two red lights side by side. Stop — you must not pass this ground signal.',
          whatYouDo: 'Stop and wait for the signal to clear to the white proceed position.',
          lookAlikes:
            'Two horizontal reds mean stop. Two whites climbing up to the left mean proceed. Do not confuse a GPL with a main position-light subsidiary under a colour-light signal.',
          controls: 'Stop the train.',
          related: ['gpl-proceed'],
        },
        {
          id: 'proceed',
          name: 'Two white (45°)',
          meaning: 'Proceed (shunt)',
          concept: 'gpl-proceed',
          lamps: { 'white-lower': 'on', 'white-upper': 'on' },
          whatItMeans:
            'Two white lights at 45°, rising to the left. You may proceed, but be ready to stop short of any train, vehicle or obstruction ahead — this is a low-speed shunting move.',
          whatYouDo: 'Move forward slowly and under full control, prepared to stop short of anything in the way.',
          controls: 'Take power gently and keep the speed low.',
          related: ['gpl-danger'],
        },
      ],
    },
  ],
}
