export interface EntryPoint {
  label: string
  body: string
  stage: string // anchor on /approach
}

export interface Stage {
  id: string
  n: string
  title: string
  summary: string
  description: string
  activities: string[]
  deliverables: string[]
  imageSlot: string
}

export interface Engagement {
  slug: string // used as /contact?service=<slug>
  title: string
  body: string
}

export const ENTRY_POINTS: EntryPoint[] = [
  { label: 'I have an idea', body: 'A problem, a brief or a hunch. We start with research and concept directions.', stage: 'ideate' },
  { label: 'I have sketches', body: 'We turn sketches into digital models and renders ready for review.', stage: 'design' },
  { label: 'I have a 3D model', body: 'We engineer, refine and build it.', stage: 'build' },
  { label: 'I need it working', body: 'We add electronics, firmware and interfaces, then validate it.', stage: 'engineer' },
]

export const STAGES: Stage[] = [
  {
    id: 'ideate',
    n: '01',
    title: 'Ideate',
    summary: 'Frame the problem and explore directions.',
    description: 'We start by understanding the user, the context and the constraints, then generate concept directions worth taking forward.',
    activities: ['Research', 'Problem framing', 'Concept generation', 'Mood boards'],
    deliverables: ['Concept directions'],
    imageSlot: 'approach-ideate',
  },
  {
    id: 'design',
    n: '02',
    title: 'Design',
    summary: 'Sketching, digital modeling and visualization.',
    description: 'Sketching, digital modeling and visualization — the chosen direction becomes precise, industrial and automotive-grade digital models, with renders for review at every step.',
    activities: ['Sketching', 'Digital modeling', 'Visualization'],
    deliverables: ['Digital models, drawings and renders'],
    imageSlot: 'approach-design',
  },
  {
    id: 'engineer',
    n: '03',
    title: 'Engineer',
    summary: 'Make it manufacturable and make it work.',
    description: 'Mechanical design, DFM, electronics, firmware and interfaces are developed together so the prototype behaves like the product.',
    activities: ['Mechanical design', 'DFM', 'Electronics', 'Firmware', 'Interfaces'],
    deliverables: ['Engineered design', 'PCB', 'Firmware'],
    imageSlot: 'approach-engineer',
  },
  {
    id: 'build',
    n: '04',
    title: 'Build',
    summary: 'Prototype each part with the right process.',
    description: 'Every part is built with the process that suits it — additive, molding, composites, machining and finishing — and assembled into one prototype.',
    activities: ['Process selection per part', 'Fabrication', 'Finishing', 'Assembly'],
    deliverables: ['Physical prototype'],
    imageSlot: 'approach-build',
  },
  {
    id: 'validate',
    n: '05',
    title: 'Validate & Handoff',
    summary: 'Test, refine and hand over.',
    description: 'We test the prototype, iterate where needed and package everything your team or manufacturer needs to take it forward.',
    activities: ['Testing', 'Iteration', 'Drawings', 'BOM', 'Vendor connects'],
    deliverables: ['Handoff package'],
    imageSlot: 'approach-validate',
  },
]

export const ENGAGEMENTS: Engagement[] = [
  { slug: 'concept-sprint', title: 'Concept Sprint', body: 'A short, focused engagement to go from brief to concept directions and renders.' },
  { slug: 'prototype-build', title: 'Prototype Build', body: 'Design, engineering and fabrication of a working, presentable prototype.' },
  { slug: 'phygital-integration', title: 'Phygital Integration', body: 'Add electronics, connectivity and an interface to an existing product.' },
  { slug: 'fabrication-only', title: 'Fabrication Only', body: 'Already have a final 3D model? Files in, parts out — with a DFM review and quality check.' },
]

export const CONTACT_SERVICES = [
  ...ENGAGEMENTS.map((e) => ({ value: e.slug, label: e.title })),
  { value: 'not-sure', label: 'Not sure yet' },
]

export const FAQ = [
  {
    q: "What's the minimum order quantity?",
    a: 'There is no minimum. We are happy to make a single part — most of our work is one-off prototypes or small batches.',
  },
  {
    q: 'Do you offer post-processing, painting, or finishing?',
    a: 'Yes. Sanding, drilling, threading, priming and paint finishing, plus CMF studies. Finishing is broken out as a separate line item on the quote.',
  },
  {
    q: 'Can you make flexible or soft-touch parts?',
    a: 'Yes. We use flexible-grade materials and silicone casting for gaskets, grips, seals and wearables. Tell us about the application and we will recommend the right process.',
  },
  {
    q: 'What tolerances do you hold?',
    a: '±0.3 mm is typical on large-format additive parts, with tighter tolerances on high-resolution and machined parts. We discuss critical dimensions during the quote.',
  },
  {
    q: 'Do you sign NDAs?',
    a: 'Yes. Send us yours or we can provide a standard mutual NDA. This is routine for us — most of our clients have unreleased products.',
  },
  {
    q: 'Can I visit your studio in Pune?',
    a: 'Absolutely. Email or WhatsApp ahead so we can make sure someone is in to walk you through the studio.',
  },
  {
    q: 'Do you ship across India?',
    a: 'Yes — pan-India courier, or pickup from our Pune studio. International shipping on request.',
  },
  {
    q: 'What happens if my part fails quality check?',
    a: 'We remake it. You are not charged for parts that fail our internal QC.',
  },
  {
    q: "Can you help if I don't have a 3D model?",
    a: 'Yes — describe the idea or send a sketch. We can start at ideation or design and take it all the way to a prototype.',
  },
  {
    q: 'Do you offer design consultation before building?',
    a: 'A DFM review is included with every quote. Deeper design work — concepts, digital modeling, drawings — is part of a Concept Sprint or Prototype Build.',
  },
]
