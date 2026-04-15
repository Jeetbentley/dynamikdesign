export type Category = 'FDM' | 'SLA' | 'Design' | 'Embedded'
export type Industry = 'Automotive' | 'Medical' | 'Consumer' | 'Manufacturing' | 'Architecture'

export interface Project {
  slug: string
  title: string
  client: string
  category: Category[]
  industry: Industry
  technology: string
  material: string
  buildVolume?: string
  finish: string
  turnaround: string
  year: number
  heroHeadline: string
  image: string
  hero: string
  overview: string[]
  outcome: string[]
  gallery: { src: string; caption: string }[]
  quote?: { text: string; author: string; role: string }
}

const img = (seed: string, w = 1600, h = 900) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`

export const projects: Project[] = [
  {
    slug: 'ev-battery-enclosure',
    title: 'EV Battery Enclosure',
    client: 'Stealth EV Startup',
    category: ['FDM'],
    industry: 'Automotive',
    technology: 'FDM',
    material: 'PETG',
    buildVolume: '480 × 320 × 180mm',
    finish: 'As-printed, light sanding',
    turnaround: '4 days',
    year: 2024,
    heroHeadline: 'Built for precision',
    image: img('ev-battery-enclosure-card', 1200, 800),
    hero: img('ev-battery-enclosure-hero', 2000, 1200),
    overview: [
      'A Pune-based two-wheeler EV company needed a functional prototype enclosure to validate fitment, thermal venting, and sealing geometry before tooling.',
      'We received the STEP file on a Friday evening. By Monday the team had a printed enclosure on the bench, mounted to a real chassis, with all cable cut-outs and fastener bosses verified.',
      'Two iterations later — adjustments to rib geometry and venting placement — the design was validated for the next stage.',
    ],
    outcome: [
      'The PETG print held up to vibration testing and survived a full thermal cycle in the test rig.',
      'Two design iterations completed in nine days — a process that previously took three weeks of CNC machining.',
    ],
    gallery: [
      { src: img('ev-1', 1600, 1000), caption: 'CAD model — final iteration' },
      { src: img('ev-2', 1600, 1000), caption: 'On the print bed' },
      { src: img('ev-3', 1600, 1000), caption: 'Post-processing — light sanding' },
      { src: img('ev-4', 1600, 1000), caption: 'Final fitment check' },
    ],
    quote: {
      text: 'Dynamik turned our CAD file into a functional prototype in under 4 days. The DFM feedback alone saved us two costly revision cycles.',
      author: 'Aditya R.',
      role: 'Product Lead, EV Startup',
    },
  },
  {
    slug: 'medical-device-housing',
    title: 'Medical Device Housing',
    client: 'Bengaluru Medtech',
    category: ['SLA'],
    industry: 'Medical',
    technology: 'SLA',
    material: 'Tough Resin',
    buildVolume: '180 × 120 × 60mm',
    finish: 'Sanded + clear coat',
    turnaround: '5 days',
    year: 2024,
    heroHeadline: 'Surgical detail',
    image: img('medical-device-card', 1200, 800),
    hero: img('medical-device-hero', 2000, 1200),
    overview: [
      'A handheld diagnostic device required a presentation-grade housing for an investor demo and ergonomic study.',
      'SLA was chosen for the 0.05mm layer resolution — every fillet, button cut, and screen bezel needed to read clean under direct lighting.',
      'We finished the parts to a near-injection-molded surface quality with a matte clear coat.',
    ],
    outcome: [
      'The investor demo proceeded with a device that looked production-ready.',
      'Ergonomic feedback collected in this round directly informed the next CAD revision.',
    ],
    gallery: [
      { src: img('med-1', 1600, 1000), caption: 'Resin print, raw' },
      { src: img('med-2', 1600, 1000), caption: 'After sanding' },
      { src: img('med-3', 1600, 1000), caption: 'Final assembly' },
    ],
  },
  {
    slug: 'consumer-iot-hub',
    title: 'Consumer IoT Hub',
    client: 'Smart Home Brand',
    category: ['FDM', 'Embedded'],
    industry: 'Consumer',
    technology: 'FDM + Custom PCB',
    material: 'ABS',
    buildVolume: '160 × 160 × 40mm',
    finish: 'Vapor smoothed',
    turnaround: '8 days',
    year: 2024,
    heroHeadline: 'Hardware that works',
    image: img('iot-hub-card', 1200, 800),
    hero: img('iot-hub-hero', 2000, 1200),
    overview: [
      'A smart home brand needed a working hub prototype: enclosure, custom ESP32-based PCB, and firmware that responded to the companion app.',
      'We designed the PCB, sourced components, hand-assembled three units, and integrated them with the printed ABS enclosures.',
      'Vapor smoothing gave the ABS a near-injection-molded finish for the marketing photo shoot.',
    ],
    outcome: [
      'Three working units delivered for a CES-style product showcase.',
      'Firmware exposed a stable BLE + Wi-Fi service, ready for app integration.',
    ],
    gallery: [
      { src: img('iot-1', 1600, 1000), caption: 'Custom PCB — top side' },
      { src: img('iot-2', 1600, 1000), caption: 'Enclosure halves, pre-assembly' },
      { src: img('iot-3', 1600, 1000), caption: 'Final unit, vapor-smoothed' },
    ],
  },
  {
    slug: 'jig-fixture-set',
    title: 'Jig & Fixture Set',
    client: 'Pune Manufacturer',
    category: ['FDM'],
    industry: 'Manufacturing',
    technology: 'FDM',
    material: 'PLA',
    buildVolume: '320 × 220 × 90mm each',
    finish: 'As-printed',
    turnaround: '3 days',
    year: 2023,
    heroHeadline: 'Precision in volume',
    image: img('jig-card', 1200, 800),
    hero: img('jig-hero', 2000, 1200),
    overview: [
      'A local assembler needed twelve identical assembly jigs to hold a sheet-metal sub-assembly for spot welding.',
      'PLA at 40% infill provided the rigidity needed at a fraction of aluminium tooling cost. Twelve units in three days, ready for the line.',
    ],
    outcome: [
      'Line operators reduced cycle time by 18% with the new jigs.',
      'Total tooling cost: ~₹14,000 vs. ~₹85,000 quoted by a CNC shop.',
    ],
    gallery: [
      { src: img('jig-1', 1600, 1000), caption: 'CAD layout for nesting' },
      { src: img('jig-2', 1600, 1000), caption: 'Twelve units printed' },
      { src: img('jig-3', 1600, 1000), caption: 'In use on the line' },
    ],
  },
  {
    slug: 'architectural-scale-model',
    title: 'Architectural Scale Model',
    client: 'Mumbai Architecture Firm',
    category: ['SLA'],
    industry: 'Architecture',
    technology: 'SLA',
    material: 'Standard Resin',
    buildVolume: '300 × 220 × 80mm',
    finish: 'Primed white',
    turnaround: '6 days',
    year: 2024,
    heroHeadline: 'Concepts, in hand',
    image: img('arch-model-card', 1200, 800),
    hero: img('arch-model-hero', 2000, 1200),
    overview: [
      'A residential development concept required a clean white scale model for a client presentation.',
      'SLA captured the fine façade detail — louvers, balcony railings, mullions — that FDM would have lost.',
    ],
    outcome: [
      'Used in a successful client pitch.',
      'Three additional models commissioned for sister projects.',
    ],
    gallery: [
      { src: img('arch-1', 1600, 1000), caption: 'Concept render' },
      { src: img('arch-2', 1600, 1000), caption: 'Print build plate' },
      { src: img('arch-3', 1600, 1000), caption: 'Primed and presented' },
    ],
  },
  {
    slug: 'wearable-prototype',
    title: 'Wearable Prototype',
    client: 'Wellness Startup',
    category: ['SLA', 'Embedded'],
    industry: 'Consumer',
    technology: 'SLA + ESP32',
    material: 'Flexible Resin',
    buildVolume: '120 × 80 × 30mm',
    finish: 'Tumbled',
    turnaround: '7 days',
    year: 2024,
    heroHeadline: 'Soft on the skin',
    image: img('wearable-card', 1200, 800),
    hero: img('wearable-hero', 2000, 1200),
    overview: [
      'A wellness startup needed a wrist-worn prototype combining a flexible strap, a small ESP32-based sensor module, and a printed shell.',
      'We printed the strap in flexible resin (Shore 60A), built the PCB in-house, and integrated everything with magnetic charging contacts.',
    ],
    outcome: [
      'Five working units used for a two-week user trial.',
      'Sensor data streamed reliably over BLE to the companion app.',
    ],
    gallery: [
      { src: img('wear-1', 1600, 1000), caption: 'Flexible strap, freshly printed' },
      { src: img('wear-2', 1600, 1000), caption: 'Sensor module assembly' },
      { src: img('wear-3', 1600, 1000), caption: 'Worn unit' },
    ],
  },
]

export const getProjectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug)

export const getRelatedProjects = (slug: string, n = 3) => {
  const current = getProjectBySlug(slug)
  if (!current) return projects.slice(0, n)
  return projects
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const aShared = a.category.filter((c) => current.category.includes(c)).length
      const bShared = b.category.filter((c) => current.category.includes(c)).length
      return bShared - aShared
    })
    .slice(0, n)
}
