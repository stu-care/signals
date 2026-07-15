import type { SignalGeometry, SignalFamily } from '../types'

/*
 * Semaphore signals. Identification is by the ARM by day and the coloured
 * spectacle light by night. Most GB semaphores are UPPER QUADRANT: the arm sits
 * horizontal for the most restrictive indication and is raised ~45deg for clear.
 */

function semaphoreGeometry(armId: string, kind: 'stop' | 'distant', label: string): SignalGeometry {
  return {
    viewBox: { w: 240, h: 300 },
    post: { x: 150, width: 12, top: 24, bottom: 300 },
    backplates: [],
    lamps: [],
    arms: [{ id: armId, pivotX: 156, pivotY: 100, length: 84, thickness: 18, kind, label }],
  }
}

export const semaphoreFamily: SignalFamily = {
  id: 'semaphore',
  name: 'Semaphore signals',
  blurb:
    'Mechanical arms. A red stop arm, or a yellow fishtail distant arm — read the arm by day, the light by night.',
  intro:
    'Semaphore signals are the older mechanical type you meet on absolute-block routes in Train Sim World. A moving arm gives the indication: a red square-ended arm is a stop signal; a yellow fishtail arm is a distant. By day you read the arm position; by night a coloured light behind the arm’s spectacle glass shows the same message. Almost all GB semaphores are upper-quadrant — the arm rises to clear.',
  variants: [
    {
      id: 'semaphore-stop',
      name: 'Stop signal (home)',
      shortName: 'Stop arm',
      blurb: 'Red arm with a white stripe. Tells you whether you may pass this signal.',
      geometry: semaphoreGeometry('home', 'stop', 'Stop arm'),
      aspects: [
        {
          id: 'danger',
          name: 'On (danger)',
          meaning: 'Danger — stop',
          concept: 'danger',
          lamps: {},
          arms: { home: 'danger' },
          whatItMeans:
            'The arm is horizontal (“on”). You must stop at this signal — the section ahead is not clear for you.',
          whatYouDo: 'Stop at the signal and wait for it to clear.',
          safetyInteraction:
            'A stop signal itself is not AWS-fitted — on GB lines AWS is provided only at distant signals, so your on-approach warning comes from the distant for this box, not the stop signal. Higher-risk or junction stop signals may carry TPWS, but many older ones rely on you reading the arm by day and the light by night.',
          controls: 'Stop the train. There is nothing to acknowledge on the signal itself.',
          lookAlikes:
            'A horizontal red arm is danger. A raised red arm is clear. At night, a red light is danger; green is clear.',
          related: ['clear'],
        },
        {
          id: 'clear',
          name: 'Off (clear)',
          meaning: 'Clear — proceed',
          concept: 'clear',
          lamps: {},
          arms: { home: 'clear' },
          whatItMeans:
            'The arm is raised to about 45° (“off”). You may pass the signal and proceed. At night the light shows green.',
          whatYouDo: 'Proceed, obeying the line speed and watching the distant/next signal.',
          controls: 'Proceed normally.',
          realWorldNote:
            'Upper-quadrant signals raise the arm to clear; a minority of older lower-quadrant signals instead lower the arm to clear. The game may model either depending on the route.',
          related: ['danger'],
        },
      ],
    },
    {
      id: 'semaphore-distant',
      name: 'Distant signal',
      shortName: 'Distant arm',
      blurb:
        'Yellow fishtail arm with a black chevron. Warns you about the stop signals ahead.',
      geometry: semaphoreGeometry('distant', 'distant', 'Distant arm'),
      aspects: [
        {
          id: 'caution',
          name: 'On (caution)',
          meaning: 'Caution',
          concept: 'caution',
          lamps: {},
          arms: { distant: 'danger' },
          whatItMeans:
            'The yellow arm is horizontal (“on”). Be prepared to stop: at least one stop signal ahead is at danger. At night the light shows yellow.',
          whatYouDo:
            'Control your speed so you can stop at the first stop signal, which may be at danger.',
          safetyInteraction:
            'A distant at caution is exactly the kind of aspect AWS warns you about — expect the AWS horn and acknowledge it.',
          controls: 'Acknowledge AWS if it sounds (default: Q) and brake for the stop signals ahead.',
          lookAlikes:
            'A distant arm has a fishtail (notched) end and a black chevron; a stop arm is square-ended with a white stripe. A distant can never tell you to stop — only to be ready to.',
          related: ['clear', 'danger'],
        },
        {
          id: 'clear',
          name: 'Off (clear)',
          meaning: 'Clear',
          concept: 'clear',
          lamps: {},
          arms: { distant: 'clear' },
          whatItMeans:
            'The yellow arm is raised (“off”). All the stop signals in the section ahead are clear — you can expect a good run. At night the light shows green.',
          whatYouDo: 'Proceed at line speed.',
          controls: 'Proceed normally.',
          related: ['caution'],
        },
      ],
    },
  ],
}
