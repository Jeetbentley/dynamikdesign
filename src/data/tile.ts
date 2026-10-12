import { legal } from './legal'

// Tile specs and FAQ. Any value still containing a [PLACEHOLDER] is hidden on the page
// and appears automatically once the real value is filled in here.

export const hasPlaceholder = (text: string) => /\[[^\]]*\]/.test(text)

export const TILE_SPECS = [
  { k: 'Display', v: '64 RGB pixels, 8 × 8, frosted diffuser' },
  { k: 'Modes', v: 'Clock, focus, lamp, canvas' },
  { k: 'Connectivity', v: '2.4 GHz WiFi + Bluetooth LE (for setup), works offline' },
  { k: 'Control', v: 'Phone/PC browser, Android app, Alexa' },
  { k: 'Power', v: 'USB-C, 5 V [CONFIRM ADAPTER RATING]' }, // TODO
  { k: 'Size', v: '[W × H × D] mm, [WEIGHT] g' }, // TODO
  { k: 'In the box', v: 'Tile, USB-C cable, quick start card [CONFIRM]' }, // TODO
  { k: 'Body', v: 'PETG' },
  { k: 'Colours', v: 'Orange with blue or purple chin' },
  { k: 'Finish', v: 'Matte' },
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

// Context photos ("In the room"). Each appears once its file exists in /public/products/tile/ (checked at build
// time); the section stays hidden until at least one does. Blue-chin photos are shown first.
// Captions use "focus timer" wording only.
export const TILE_CONTEXT_PHOTOS: { file: string; chin: 'blue' | 'purple'; caption: string; alt: string }[] = [
  {
    file: '/products/tile/context-desk-night-blue.webp',
    chin: 'blue',
    caption: 'After dark · At the desk',
    alt: 'Tile with a blue chin on a wooden desk at night, its screen glowing pink beside a desk lamp, laptop and phone',
  },
  {
    file: '/products/tile/context-focus-desk-purple.webp',
    chin: 'purple',
    caption: 'Focus timer · Ready',
    alt: 'Tile with a purple chin on a dark wooden desk, showing the focus hourglass in warm light, a keyboard and mug behind',
  },
  {
    file: '/products/tile/context-focus-shelf-purple.webp',
    chin: 'purple',
    caption: 'Focus timer · On the shelf',
    alt: 'Tile with a purple chin on a shelf lit in orange, showing the focus hourglass in coral beside a plant and headphones',
  },
]
