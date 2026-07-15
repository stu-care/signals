import type { SignalFamily } from '../types'

/*
 * Banner repeater. A black bar on a white disc that gives advance warning of a
 * signal you cannot yet see (round a curve, under a bridge, along a platform).
 * Horizontal bar = the signal ahead is at DANGER; bar inclined up to the right =
 * the signal ahead is "off" (showing a proceed aspect — which includes a single
 * yellow). A banner repeater is NOT itself a signal you obey — it only repeats
 * the one ahead.
 */
export const bannerRepeaterFamily: SignalFamily = {
  id: 'banner-repeater',
  name: 'Banner repeaters',
  blurb: 'A black bar on a white disc that pre-warns you of a signal you can’t see yet.',
  intro:
    'A banner repeater gives you an early read of a signal whose own sighting is poor — hidden by a curve, a bridge or a long platform. It repeats only whether that signal is “off” (clear) or not. You still obey the actual signal when you reach it; the banner just lets you plan ahead.',
  variants: [
    {
      id: 'banner',
      name: 'Banner repeater',
      shortName: 'Banner',
      blurb: 'Horizontal bar = be ready to stop; inclined bar = signal ahead is clear.',
      geometry: {
        viewBox: { w: 200, h: 220 },
        post: { x: 95, width: 10, top: 168, bottom: 220 },
        backplates: [],
        lamps: [],
        arms: [
          { id: 'banner', pivotX: 100, pivotY: 88, length: 64, thickness: 12, kind: 'banner', label: 'Banner bar' },
        ],
      },
      aspects: [
        {
          id: 'on',
          name: 'Horizontal bar',
          meaning: 'Signal ahead is at danger',
          concept: 'banner-on',
          lamps: {},
          arms: { banner: 'danger' },
          whatItMeans:
            'The bar is horizontal. The signal being repeated is at danger (“on”) — be prepared to find it not off. (A single yellow counts as a proceed aspect and would instead give the inclined bar.)',
          whatYouDo:
            'Control your speed so you can stop at the signal ahead, which is showing a red.',
          lookAlikes:
            'A banner repeater is a black bar on a white disc, not a coloured signal. It never authorises you to pass anything — obey the real signal it repeats.',
          controls: 'Be ready to brake for the signal ahead.',
          related: ['banner-off'],
        },
        {
          id: 'off',
          name: 'Inclined bar',
          meaning: 'Signal ahead is clear',
          concept: 'banner-off',
          lamps: {},
          arms: { banner: 'clear' },
          whatItMeans:
            'The bar is inclined up to the right. The signal being repeated is “off” — it is showing a proceed aspect (green, or a single/double yellow), so it is not at danger.',
          whatYouDo: 'Continue, but still read the actual signal when it comes into view.',
          controls: 'Proceed, watching for the signal ahead.',
          related: ['banner-on'],
        },
      ],
    },
  ],
}
