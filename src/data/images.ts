// Image manifest. Every image on the site comes from a slot listed here.
// To fill a slot: download a free-license image (Unsplash or Pexels) matching the search terms,
// save it at `file` under /public, then fill source, photographer and license (also in CREDITS.md).
// Until the file exists, the slot renders a themed placeholder block.
// Avoid: visible car/brand logos, close-up identifiable faces, stock clichés (handshakes, pointing at screens).

export interface ImageEntry {
  slot: string
  file: string // path under /public
  alt: string
  searchTerms: string[]
  source: string // TODO: image page URL
  photographer: string // TODO
  license: 'Unsplash License' | 'Pexels License' | 'TODO'
}

const todo = { source: 'TODO', photographer: 'TODO', license: 'TODO' as const }

const e = (slot: string, file: string, alt: string, searchTerms: string[]): ImageEntry => ({
  slot,
  file,
  alt,
  searchTerms,
  ...todo,
})

export const IMAGES: ImageEntry[] = [
  // Home
  e('home-hero', '/images/home/hero.jpg', 'Designer refining a clay model in a design studio', ['automotive clay model studio', 'car design clay modeling', 'product design studio sketching']),
  e('home-industry-automotive', '/images/home/industry-automotive.jpg', 'Vehicle interior dashboard detail', ['car interior dashboard detail', 'vehicle design studio', 'automotive interior design']),
  e('home-industry-industrial', '/images/home/industry-industrial.jpg', 'Designer pendant lamp in a calm interior', ['pendant lamp product design', 'minimal home device product', 'lighting design detail']),
  e('home-team', '/images/home/team.jpg', 'Design and engineering team working around a studio table', ['design team workshop table', 'engineers working prototype bench', 'industrial design team at work']),

  // Services overview
  e('services-hero', '/images/services/hero.jpg', 'Prototyping workshop with tools and parts on the bench', ['prototyping workshop bench', 'product design workshop', 'maker studio tools']),
  e('services-card-design', '/images/services/card-design.jpg', 'Industrial design sketches on paper', ['industrial design sketches', 'product sketching marker', 'design sketchbook']),
  e('services-card-engineering', '/images/services/card-engineering.jpg', 'Mechanical assembly model on a monitor', ['3D digital model on screen', 'product design workstation', 'engineering design computer']),
  e('services-card-build', '/images/services/card-build.jpg', '3D printer building a part', ['3d printer printing close up', 'additive manufacturing machine', 'prototype fabrication workshop']),
  e('services-card-embedded', '/images/services/card-embedded.jpg', 'Close-up of a printed circuit board', ['pcb close up', 'circuit board macro', 'electronics prototype board']),

  // Design
  e('design-hero', '/images/design/hero.jpg', 'Designer sketching product concepts', ['industrial designer sketching', 'product design sketch drawing', 'concept sketching studio']),
  e('design-capabilities', '/images/design/capabilities.jpg', '3D digital model on a design workstation', ['3D digital model on screen', 'product design workstation', 'product render workstation']),

  // Engineering
  e('engineering-hero', '/images/engineering/hero.jpg', 'Engineer working on an electronics prototype', ['electronics engineering bench', 'hardware prototype engineering', 'engineer soldering prototype']),
  e('engineering-capabilities', '/images/engineering/capabilities.jpg', 'Oscilloscope and test equipment on an electronics bench', ['oscilloscope electronics bench', 'electronics lab test equipment', 'hardware testing lab']),

  // Embedded
  e('embedded-hero', '/images/embedded/hero.jpg', 'Macro of a microcontroller board', ['microcontroller board macro', 'pcb electronics close up', 'embedded system board']),
  e('embedded-capabilities', '/images/embedded/capabilities.jpg', 'Soldering iron working on a circuit board', ['soldering circuit board close up', 'pcb soldering', 'electronics assembly hands']),

  // Build
  e('build-hero', '/images/build/hero.jpg', 'Large-format 3D printer in operation', ['3d printer in operation', 'large format 3d printing', 'additive manufacturing workshop']),
  e('build-capabilities', '/images/build/capabilities.jpg', 'Silicone mold and cast parts on a workbench', ['silicone mold casting', 'resin casting mold workshop', 'mold making prototype']),
  e('build-fabrication', '/images/build/fabrication.jpg', 'CNC machine cutting a part', ['cnc machining close up', 'cnc milling part', 'precision machining workshop']),

  // Industries
  e('industry-automotive-hero', '/images/industries/automotive-hero.jpg', 'Clay model of a vehicle in a design studio', ['car clay model design studio', 'automotive design studio', 'vehicle styling clay']),
  e('industry-automotive-phygital', '/images/industries/automotive-phygital.jpg', 'Digital instrument cluster and dashboard display', ['car dashboard display HMI', 'digital instrument cluster', 'vehicle infotainment screen']),
  e('industry-industrial-hero', '/images/industries/industrial-hero.jpg', 'Designer lighting product in a living space', ['designer lamp interior', 'lighting product design', 'home product minimal interior']),
  e('industry-industrial-phygital', '/images/industries/industrial-phygital.jpg', 'Smart home device on a shelf', ['smart home device', 'smart speaker minimal', 'connected home product']),

  // Approach
  e('approach-hero', '/images/approach/hero.jpg', 'Design studio wall with sketches and concept boards', ['design studio mood board wall', 'concept board sketches wall', 'design process workshop']),
  e('approach-ideate', '/images/approach/ideate.jpg', 'Concept sketches and mood boards spread on a table', ['product sketching table', 'mood board design', 'concept sketches']),
  e('approach-design', '/images/approach/design.jpg', 'Digital modeling on a design workstation', ['3D digital model on screen', 'product design workstation']),
  e('approach-engineer', '/images/approach/engineer.jpg', 'Electronics bench with a prototype board under test', ['electronics bench prototype', 'pcb testing oscilloscope', 'hardware engineering lab']),
  e('approach-build', '/images/approach/build.jpg', '3D printer printing a prototype part', ['3d printer printing part', 'prototype fabrication', 'additive manufacturing close up']),
  e('approach-validate', '/images/approach/validate.jpg', 'Calipers measuring a prototype part', ['calipers measuring part', 'quality inspection prototype', 'dimensional inspection']),

  // About
  e('about-hero', '/images/about/hero.jpg', 'Design and prototyping studio workspace', ['design studio workspace', 'prototyping studio interior', 'industrial design studio']),
  e('about-team', '/images/about/team.jpg', 'Team reviewing a prototype together at a workbench', ['team reviewing prototype', 'engineers workshop collaboration', 'design team workbench']),

  // Blog covers
  e('blog-choosing-petg-vs-abs', '/images/blog/choosing-petg-vs-abs.jpg', 'Printed prototype parts on a workbench', ['3d printed parts workbench', 'prototype parts close up']),
  e('blog-dfm-checklist-for-3d-printed-parts', '/images/blog/dfm-checklist.jpg', 'Engineering drawing with a part beside it', ['engineering drawing part', 'design for manufacturing review']),
  e('blog-esp32-prototyping-pipeline', '/images/blog/esp32-pipeline.jpg', 'Microcontroller development board on a desk', ['microcontroller development board', 'iot prototype board']),
  e('blog-when-to-choose-sla-over-fdm', '/images/blog/sla-vs-fdm.jpg', 'High-detail printed part in hand', ['high detail 3d print', 'resin printed part']),
  e('blog-iterating-fast-with-print-friendly-cad', '/images/blog/modeling-habits.jpg', '3D digital model on a laptop screen', ['3D model laptop', 'product design workstation']),
  e('blog-india-hardware-startup-landscape', '/images/blog/hardware-india.jpg', 'Hardware startup workshop bench', ['hardware startup workshop', 'electronics workbench startup']),
]

export const getImage = (slot: string) => IMAGES.find((i) => i.slot === slot)
