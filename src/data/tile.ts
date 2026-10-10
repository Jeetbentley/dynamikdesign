// Tile specs and FAQ. Any value still containing a [PLACEHOLDER] is hidden on the page
// and appears automatically once the real value is filled in here.

export const hasPlaceholder = (text: string) => /\[[^\]]*\]/.test(text)

export const TILE_SPECS = [
  { k: 'Display', v: '64 RGB pixels, 8 × 8, frosted diffuser' },
  { k: 'Modes', v: 'Clock, lamp, canvas' },
  { k: 'Connectivity', v: '2.4 GHz WiFi, works offline' },
  { k: 'Control', v: 'Phone browser, Android app, Alexa, Home Assistant' },
  { k: 'Power', v: 'USB-C, 5 V [CONFIRM ADAPTER RATING]' }, // TODO
  { k: 'Size', v: '[W × H × D] mm, [WEIGHT] g' }, // TODO
  { k: 'In the box', v: 'Tile, USB-C cable, quick start card [CONFIRM]' }, // TODO
  { k: 'Made in', v: 'Pune, India' },
]

export const TILE_FAQS = [
  { q: 'Does Tile need internet?', a: 'No. On home WiFi it sets its own time. Without WiFi, your phone connects to Tile directly and sends it the time.' },
  { q: 'Does it work with iPhone?', a: 'Yes, through Safari. The Tile app is Android-only for now.' },
  { q: 'How do I reset it?', a: 'Plug it in and unplug it within 5 seconds, twice. Plug it in a third time and it starts fresh.' },
  { q: "What's the warranty?", a: '[WARRANTY]' }, // TODO
]

export const visibleSpecs = TILE_SPECS.filter((s) => !hasPlaceholder(s.k + s.v))
export const visibleFaqs = TILE_FAQS.filter((f) => !hasPlaceholder(f.q + f.a))

// Night photo block. Hidden until this file exists in /public (checked at build time).
export const TILE_PHOTO = {
  slot: 'tile-desk-night',
  file: '/images/tile/desk-night.jpg',
  alt: 'Tile on a desk at night beside a laptop, clock glowing, room lit only by the screens',
}
