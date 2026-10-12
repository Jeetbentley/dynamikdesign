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

// Context photos ("In the room"). Each slot appears once its file exists in /public/products/tile/ (checked at build
// time); the section stays hidden until at least one does. Files are blue-chin photos: context-living.webp etc.
// An optional purple-chin version (context-living-purple.webp) is shown instead while Purple is picked on the page.
// Update `alt` to describe the actual photo when you add it.
export type ContextSlot = 'living' | 'lamp' | 'clock' | 'focus' | 'night'
export const TILE_CONTEXT_PHOTOS: { slot: ContextSlot; caption: string; alt: string }[] = [
  { slot: 'living', caption: 'Clock · Living room', alt: 'Tile on a coffee table in a living room, showing the time in pixel digits' },
  { slot: 'lamp', caption: 'Lamp · Warm evening', alt: 'Tile glowing warm as a lamp on a wooden desk in the evening' },
  { slot: 'clock', caption: 'Clock · After dark', alt: 'Tile showing the time on a desk lit by a warm table lamp' },
  { slot: 'focus', caption: 'Focus timer · At the desk', alt: 'Tile running the focus timer on a desk next to a laptop' },
  { slot: 'night', caption: 'Clock · Late at night', alt: 'Tile on a desk at night, the clock glowing softly in a dark room' },
]
export const contextFile = (slot: ContextSlot, purple = false) => `/products/tile/context-${slot}${purple ? '-purple' : ''}.webp`
