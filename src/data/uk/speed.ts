import type { SignalFamily, SignSpec } from '../types'

/*
 * Speed indications. These are static lineside signs, not aspects — each has a
 * single "appearance". They tell you the maximum permitted speed for a stretch
 * of line (permanent) or a temporary/emergency restriction.
 */

function signGeometry(sign: SignSpec) {
  return {
    viewBox: { w: 180, h: 150 },
    backplates: [],
    lamps: [],
    sign,
  }
}

export const speedFamily: SignalFamily = {
  id: 'speed-indications',
  name: 'Speed boards',
  blurb: 'Reflective boards giving the permitted speed — permanent limits and temporary restrictions.',
  intro:
    'Speed boards tell you the maximum speed for the line ahead. Permanent Speed Restriction (PSR) boards mark a lasting limit; Temporary and Emergency Speed Restriction (TSR/ESR) boards mark a limit imposed for engineering work or a fault, warned in advance and later cancelled. Speeds are in miles per hour.',
  variants: [
    {
      id: 'psr',
      name: 'Permissible speed indicator (PSR)',
      shortName: 'PSR',
      blurb: 'White reflective board with black figures — the permanent line-speed limit.',
      geometry: signGeometry({
        id: 'psr',
        kind: 'psr',
        x: 42,
        y: 38,
        w: 96,
        h: 74,
        primary: '40',
        label: 'Permissible speed indicator showing 40',
      }),
      aspects: [
        {
          id: 'psr',
          name: 'Permissible speed',
          meaning: 'Maximum permitted speed',
          concept: 'psr',
          lamps: {},
          whatItMeans:
            'The figure is the maximum speed (mph) permitted from this board onwards, until the next speed board. Here, 40 mph.',
          whatYouDo:
            'Be at or below the shown speed by the time the front of your train reaches the board.',
          lookAlikes:
            'A single white board with black figures is a permanent limit. Two figures stacked is a differential board; a board with an AWS magnet warns of a temporary restriction.',
          controls: 'Brake in good time so you are at the limit by the board.',
          realWorldNote:
            'Some PSR boards are preceded by a warning indicator with an AWS magnet where the reduction is large. The game models the boards; the exact warning arrangements vary by route.',
          related: ['psr-diff'],
        },
      ],
    },
    {
      id: 'psr-differential',
      name: 'Differential speed board',
      shortName: 'Differential',
      blurb: 'Two figures: a higher limit for some trains, a lower one for others.',
      geometry: signGeometry({
        id: 'psr-diff',
        kind: 'psr-diff',
        x: 46,
        y: 30,
        w: 88,
        h: 92,
        primary: '60',
        secondary: '90',
        label: 'Differential speed board showing 60 over 90',
      }),
      aspects: [
        {
          id: 'psr-diff',
          name: 'Differential speed',
          meaning: 'Two limits by train type',
          concept: 'psr-diff',
          lamps: {},
          whatItMeans:
            'Two limits apply depending on the type of train. The figure BELOW the line is the higher speed and applies to passenger trains, parcels and light locomotives; the figure ABOVE the line is the lower speed and applies to other traffic such as freight. Here, 90 mph for passenger trains or 60 mph for freight.',
          whatYouDo:
            'Obey the figure that applies to the train you are driving. If you are unsure which applies, use the lower (slower) speed.',
          controls: 'Brake to the applicable limit by the board.',
          realWorldNote:
            'Which figure applies is set by the train’s classification and route rules. In Train Sim World, follow the limit indicated for your service.',
          related: ['psr'],
        },
      ],
    },
    {
      id: 'tsr-warning',
      name: 'TSR warning indicator',
      shortName: 'TSR warning',
      blurb: 'Warns that a temporary speed restriction is coming — usually with an AWS magnet.',
      geometry: signGeometry({
        id: 'tsr-warn',
        kind: 'tsr-warn',
        x: 42,
        y: 40,
        w: 96,
        h: 70,
        label: 'Temporary speed restriction warning indicator',
      }),
      aspects: [
        {
          id: 'tsr-warn',
          name: 'TSR warning',
          meaning: 'Restriction ahead — be ready to slow',
          concept: 'tsr-warn',
          lamps: {},
          whatItMeans:
            'A temporary speed restriction is coming up. The warning board is fitted with an AWS magnet that gives you an in-cab warning, so you know to slow before the speed indicator.',
          whatYouDo:
            'Begin braking so you are at the temporary limit by the commencement (speed) board.',
          safetyInteraction:
            'The AWS magnet at the warning board sounds the horn — acknowledge it, then brake for the restriction.',
          controls: 'Acknowledge AWS (default: Q) and brake for the restriction.',
          realWorldNote:
            'Exact warning-board designs and distances are set by the engineering instructions for each restriction; this is a representative depiction.',
          related: ['tsr-commence', 'tsr-terminate'],
        },
      ],
    },
    {
      id: 'tsr-commencement',
      name: 'TSR speed indicator',
      shortName: 'TSR speed',
      blurb: 'The temporary speed itself — reduce to this figure by the board.',
      geometry: signGeometry({
        id: 'tsr-commence',
        kind: 'tsr-commence',
        x: 46,
        y: 40,
        w: 88,
        h: 70,
        primary: '20',
        label: 'Temporary speed restriction indicator showing 20',
      }),
      aspects: [
        {
          id: 'tsr-commence',
          name: 'TSR speed',
          meaning: 'Temporary maximum speed',
          concept: 'tsr-commence',
          lamps: {},
          whatItMeans:
            'The temporary maximum speed (mph) begins here and applies until the termination board. Here, 20 mph.',
          whatYouDo: 'Be at or below this speed by the board, and hold it until the restriction ends.',
          controls: 'Hold the temporary limit until you pass the termination board.',
          related: ['tsr-warn', 'tsr-terminate'],
        },
      ],
    },
    {
      id: 'tsr-termination',
      name: 'TSR termination indicator',
      shortName: 'TSR ends',
      blurb: 'Marks the end of a temporary restriction — resume line speed once clear.',
      geometry: signGeometry({
        id: 'tsr-terminate',
        kind: 'tsr-terminate',
        x: 42,
        y: 40,
        w: 96,
        h: 70,
        label: 'Temporary speed restriction termination indicator',
      }),
      aspects: [
        {
          id: 'tsr-terminate',
          name: 'TSR ends',
          meaning: 'Restriction ends',
          concept: 'tsr-terminate',
          lamps: {},
          whatItMeans:
            'The temporary restriction ends here. Once the whole of your train has passed this board, you may return to the permanent line speed.',
          whatYouDo:
            'Wait until your entire train is clear of the restriction, then accelerate back to line speed.',
          controls: 'Power up to line speed once the rear of the train has passed.',
          related: ['tsr-warn', 'tsr-commence'],
        },
      ],
    },
  ],
}
