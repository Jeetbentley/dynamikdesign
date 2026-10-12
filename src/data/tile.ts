import { legal } from './legal'

// Tile specs and FAQ. Any value still containing a [PLACEHOLDER] is hidden on the page
// and appears automatically once the real value is filled in here.

export const hasPlaceholder = (text: string) => /\[[^\]]*\]/.test(text)

export const TILE_SPECS = [
  { k: 'Display', v: '64 RGB pixels, 8 × 8, frosted diffuser' },
  { k: 'Modes', v: 'Clock, lamp, canvas, focus' },
  { k: 'Connectivity', v: '2.4 GHz WiFi + Bluetooth LE (for setup), works offline' },
  { k: 'Control', v: 'Phone/PC browser, Android app, Alexa' },
  { k: 'Power', v: 'USB-C, 5 V [CONFIRM ADAPTER RATING]' }, // TODO
  { k: 'Size', v: '[W × H × D] mm, [WEIGHT] g' }, // TODO
  { k: 'In the box', v: 'Tile, USB-C cable, quick start card [CONFIRM]' }, // TODO
  { k: 'Body', v: 'PETG, matte finish' },
  { k: 'Colours', v: 'Orange with purple or navy chin' },
  { k: 'Made in', v: 'India' },
]

export const TILE_FAQS: { q: string; a: string; link?: { href: string; label: string } }[] = [
  { q: 'Does Tile need internet?', a: 'No. On home WiFi it sets its own time. Without WiFi, your phone connects to Tile directly and sends it the time.' },
  { q: 'Does it work with iPhone?', a: 'Yes, through Safari. The Tile app is Android-only for now.' },
  { q: 'How do I reset it?', a: 'Plug it in and unplug it within 5 seconds, twice. Plug it in a third time and it starts fresh.' },
  {
    q: "What's the warranty?",
    a: `${legal.warrantyMonths} months from delivery against manufacturing defects.`,
    link: { href: '/warranty', label: 'See the full warranty.' },
  },
]

export const visibleSpecs = TILE_SPECS.filter((s) => !hasPlaceholder(s.k + s.v))
export const visibleFaqs = TILE_FAQS.filter((f) => !hasPlaceholder(f.q + f.a))

// Night photo block. Hidden until this file exists in /public (checked at build time).
export const TILE_PHOTO = {
  slot: 'tile-desk-night',
  file: '/images/tile/desk-night.jpg',
  alt: 'Tile on a desk at night beside a laptop, clock glowing, room lit only by the screens',
}
