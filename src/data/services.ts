import type { WorkTag } from './work'

export type Sourcing = 'In-house' | 'Partner'

export interface Capability {
  id?: string // anchor on the service page
  extraAnchors?: string[] // older anchors that should still land here
  n: string
  title: string
  body: string
  points?: string[]
  sourcing?: Sourcing
  link?: { label: string; href: string }
  deliverables?: string
}

export interface ServicePage {
  slug: 'design' | 'engineering' | 'embedded' | 'build'
  href: string
  metaTitle: string
  metaDescription: string
  eyebrow: string
  title: string
  heroSlot: string
  intro: string[]
  whyUs: string[]
  capabilitiesTitle: string
  capabilities: Capability[]
  capabilitySlot: string
  specsTitle: string
  specs: { param: string; value: string }[]
  tagsLabel: string
  tags: string[]
  workTag: WorkTag
  card: { n: string; title: string; description: string; slot: string }
}

// Build toolkit. Sourcing values are TODO — confirm which processes are in-house vs partner.
export const BUILD_PROCESSES: { id: string; title: string; body: string; sourcing: Sourcing }[] = [
  { id: 'additive', title: 'Additive Manufacturing', body: 'Large-format and high-resolution printing for functional, appearance and flexible-grade parts.', sourcing: 'In-house' }, // TODO confirm
  { id: 'molding', title: 'Silicone Molding & Casting', body: 'Short-run cast parts with production-like surfaces, soft-touch and rigid.', sourcing: 'Partner' }, // TODO confirm
  { id: 'composites', title: 'FRP & Composites', body: 'Large, light and stiff parts — panels, shells, bucks and styling models.', sourcing: 'Partner' }, // TODO confirm
  { id: 'machining', title: 'CNC & Laser Cutting', body: 'Precision machined and cut parts in engineering plastics, metals and sheet.', sourcing: 'Partner' }, // TODO confirm
  { id: 'finishing', title: 'Finishing & CMF', body: 'Sanding, priming, paint and texture to production-representative appearance.', sourcing: 'In-house' }, // TODO confirm
  { id: 'electronics', title: 'Electronics Assembly', body: 'PCB assembly, wiring and integration into the prototype housing.', sourcing: 'In-house' }, // TODO confirm
]

export const TURNAROUND = [
  { tier: 'Standard', time: '5 – 7 working days', note: '—' },
  { tier: 'Express', time: '2 – 3 working days', note: '+20%' },
  { tier: 'Urgent', time: '24 – 48 hours', note: 'Call us' },
]

export const FILE_FORMATS = ['STEP', 'IGES', 'STL', 'OBJ', '3MF', 'Native 3D model files']
export const FILE_FORMATS_NOTE = 'STEP, IGES, STL, OBJ, 3MF, and native files from major 3D modeling software.'

const processCapability = (id: string, n: string, points: string[], extraAnchors?: string[]): Capability => {
  const p = BUILD_PROCESSES.find((x) => x.id === id)!
  return { id, n, title: p.title, body: p.body, points, sourcing: p.sourcing, extraAnchors }
}

export const SERVICES: Record<ServicePage['slug'], ServicePage> = {
  design: {
    slug: 'design',
    href: '/services/design',
    metaTitle: 'Design — Dynamik Design Lab',
    metaDescription: 'Ideation, industrial and automotive design, digital modeling and visualization — from first idea to manufacturable form.',
    eyebrow: '01 — DESIGN',
    title: 'Design',
    heroSlot: 'design-hero',
    intro: [
      'Good prototypes start with good design. We take an idea, a brief or a rough sketch and develop it into a form that looks right, works for its user and can actually be made.',
      'Our team covers both industrial and automotive design — from concept sketches and CMF through to industrial and automotive-grade digital models — with manufacturing in mind from the first line.',
      'Because the same team engineers and builds, every design decision is checked against how the part will be made.',
    ],
    whyUs: [
      'Industrial and automotive design under one roof',
      'Design developed with manufacturing in mind from day one',
      'Renders and reviews at every stage, so decisions are easy',
      'A direct path from final digital model to a physical prototype',
    ],
    capabilitiesTitle: 'From idea to manufacturable form',
    capabilities: [
      { id: 'ideation', n: '01', title: 'Ideation & Concept Generation', body: 'Research, problem framing and multiple concept directions, so the right idea is chosen before detail work begins.', points: ['User and context research', 'Concept sketches', 'Mood boards and direction reviews'] },
      { id: 'industrial-design', n: '02', title: 'Industrial Design', body: 'Form, ergonomics and CMF for products people live and work with — lighting, devices, appliances and fixtures.', points: ['Form development', 'Ergonomics', 'CMF direction'] },
      { id: 'automotive-design', n: '03', title: 'Automotive Design', body: 'Styling and form development for vehicles and mobility products — exterior and interior concepts, accessories, trim, lighting and switchgear forms.', points: ['Exterior & interior concepts', 'Accessories & trim', 'Lighting & switchgear forms'] },
      {
        id: 'digital-modeling',
        extraAnchors: ['cad-dfm'],
        n: '04',
        title: 'Digital Modeling',
        body: 'We turn sketches and concepts into precise, industrial and automotive-grade digital models: accurate, parametric and built for what comes next. Every model is developed with manufacturability in mind, with a DFM review built in, so it moves straight into prototyping, tooling discussions or supplier handoff without rework.',
        points: [
          'Concept-to-production-intent 3D modeling',
          'Parametric part and assembly modeling',
          'Design for Manufacturing (DFM) review',
          'Reverse modeling from sketches, references or existing parts',
          '2D engineering drawings and documentation',
          'Neutral exchange files (STEP, IGES, STL) for suppliers and fabrication',
        ],
        deliverables: '3D models, neutral exchange files, 2D drawings, renders',
      },
      { id: 'visualization', n: '05', title: 'Visualization & Renders', body: 'Photoreal renders and visual studies for design reviews, investors and marketing.', points: ['Studio and lifestyle renders', 'CMF variants', 'Presentation boards'] },
    ],
    capabilitySlot: 'design-capabilities',
    specsTitle: 'What you get',
    specs: [
      { param: 'Tools', value: 'Design and modeling workstations for industrial and automotive-grade work' },
      { param: 'Deliverables', value: 'Concept boards, 3D models, neutral exchange files, 2D drawings, renders' },
      { param: 'Engagement', value: 'Concept Sprint or as part of a Prototype Build' },
      { param: 'Typical duration', value: 'TODO' },
    ],
    tagsLabel: 'Capabilities',
    tags: ['Ideation', 'Industrial Design', 'Automotive Design', 'Digital Modeling', 'DFM', 'CMF', 'Renders'],
    workTag: 'design',
    card: { n: '01', title: 'Design', description: 'Ideation, industrial and automotive design, digital modeling, renders.', slot: 'services-card-design' },
  },

  engineering: {
    slug: 'engineering',
    href: '/services/engineering',
    metaTitle: 'Engineering — Dynamik Design Lab',
    metaDescription: 'Mechanical engineering, embedded systems & PCB, firmware and phygital interfaces — so prototypes work like the product.',
    eyebrow: '02 — ENGINEERING',
    title: 'Engineering',
    heroSlot: 'engineering-hero',
    intro: [
      'A prototype that only looks right answers half the question. Our engineering team makes it work — mechanisms, electronics, firmware and the interfaces people touch.',
      'Mechanical and electronic engineering happen side by side, so the housing, the board and the code fit together the first time.',
      'Add intelligence to any product, or leave it out.',
    ],
    whyUs: [
      'Mechanical, electronics and firmware in one team',
      'Engineered for manufacture, not just for the demo',
      'Phygital interfaces that feel like finished products',
      'Built and tested in-house alongside the physical prototype',
    ],
    capabilitiesTitle: 'From concept to working product',
    capabilities: [
      { id: 'mechanical', n: '01', title: 'Mechanical Design', body: 'Mechanisms, structures, thermal paths and assemblies designed to be built and serviced.', points: ['Mechanism design', 'Tolerance and fit', 'Assembly design'] },
      {
        id: 'phygital',
        extraAnchors: ['embedded', 'firmware'],
        n: '02',
        title: 'Phygital — Embedded, Firmware & Interfaces',
        body: 'The digital layer of a physical product, built end to end: the electronics, the firmware that runs them, and the interfaces people touch.',
        points: [
          'Embedded systems & custom PCBs',
          'Firmware, communication stacks & OTA updates',
          'Wi-Fi, BLE and cellular connectivity',
          'Displays, touch, voice, companion apps and dashboards',
        ],
        link: { label: 'Embedded deep-dive', href: '/services/embedded' },
      },
    ],
    capabilitySlot: 'engineering-capabilities',
    specsTitle: 'What you get',
    specs: [
      { param: 'Disciplines', value: 'Mechanical design; phygital — embedded, firmware, interfaces' },
      { param: 'Connectivity', value: 'Wi-Fi, BLE, cellular' },
      { param: 'Deliverables', value: 'Engineered 3D models, PCB, firmware, test notes' },
      { param: 'Typical duration', value: 'TODO' },
    ],
    tagsLabel: 'Capabilities',
    tags: ['Mechanical Design', 'DFM', 'Phygital', 'Embedded Systems', 'PCB Design', 'Firmware', 'IoT', 'HMI', 'Voice Interfaces'],
    workTag: 'engineering',
    card: { n: '02', title: 'Engineering', description: 'Mechanical design and phygital systems — embedded, firmware and interfaces.', slot: 'services-card-engineering' },
  },

  embedded: {
    slug: 'embedded',
    href: '/services/embedded',
    metaTitle: 'Embedded Systems & PCB — Dynamik Design Lab',
    metaDescription: 'Custom PCBs, firmware, sensor integration and connected interfaces — embedded engineering that turns prototypes into working products.',
    eyebrow: 'ENGINEERING — EMBEDDED SYSTEMS',
    title: 'Embedded Systems & PCB',
    heroSlot: 'embedded-hero',
    intro: [
      'Products that sense, respond and connect need more than a housing. We design the electronics, write the firmware and integrate everything with the physical prototype in one workflow.',
      'Our default platform is the ESP32 — proven, well supported and well suited to connected products. We select other platforms where the product needs them.',
      'This is the engineering behind our phygital work: adding intelligence to any product, or leaving it out.',
    ],
    whyUs: [
      'Schematic, PCB, firmware and enclosure under one roof',
      'Connectivity across Wi-Fi, BLE and cellular',
      'Working prototypes, not just dev-board demos',
      'Integrated and tested with the physical product',
    ],
    capabilitiesTitle: 'From concept to working board',
    capabilities: [
      { n: '01', title: 'Architecture', body: 'Choose the right microcontroller, sensors, connectivity and power architecture for the use case.' },
      { n: '02', title: 'Schematic & PCB', body: 'Schematic capture and board layout sized to the enclosure and signal requirements.' },
      { n: '03', title: 'Fabrication & assembly', body: 'Boards fabricated with trusted partners and assembled in-house for prototype quantities.' },
      { n: '04', title: 'Firmware', body: 'Device firmware, state machines, communication stacks and OTA updates.' },
      { n: '05', title: 'Integration', body: 'Fit the electronics into the prototype, route cables, and validate fit and serviceability.' },
      { n: '06', title: 'Bring-up & test', body: 'Bench validation, power profiling and connectivity range testing.' },
    ],
    capabilitySlot: 'embedded-capabilities',
    specsTitle: 'Platforms & Tools',
    specs: [
      { param: 'Primary platform', value: 'ESP32' },
      { param: 'Other MCU platforms', value: 'TODO' },
      { param: 'Connectivity', value: 'Wi-Fi, BLE, cellular' },
      { param: 'PCB design tools', value: 'TODO' },
      { param: 'Assembly', value: 'In-house for prototypes; partner assembly for runs' },
      { param: 'Typical duration', value: 'TODO' },
    ],
    tagsLabel: 'Platforms & Tools',
    tags: ['ESP32', 'Custom PCB', 'Sensor Integration', 'Firmware', 'Wi-Fi', 'BLE', 'OTA Updates'],
    workTag: 'engineering',
    card: { n: '04', title: 'Embedded Systems', description: 'Custom PCBs, firmware and connected interfaces.', slot: 'services-card-embedded' },
  },

  build: {
    slug: 'build',
    href: '/services/build',
    metaTitle: 'Build — Dynamik Design Lab',
    metaDescription: 'Prototypes built with the right process per part: additive manufacturing, silicone molding, FRP & composites, CNC & laser, finishing & CMF.',
    eyebrow: '03 — BUILD',
    title: 'Build',
    heroSlot: 'build-hero',
    intro: [
      'We build every part with the process that suits it. Additive manufacturing is one tool among many — alongside silicone molding, composites, machining and finishing.',
      'Industrial-grade engineering materials, selected for strength, heat, finish and application.',
      'In-house where speed matters, trusted partners where scale does. One point of contact either way.',
    ],
    whyUs: [
      'The right process for each part, not one machine for everything',
      'Production-representative materials for validation and design reviews',
      'Finishing to presentation quality',
      'DFM review and quality check on every job',
    ],
    capabilitiesTitle: 'The build toolkit',
    capabilities: [
      processCapability('additive', '01', ['Large-format additive manufacturing up to 520 × 520 × 600 mm', 'High-resolution resin printing for appearance models', 'Functional, appearance and flexible-grade materials matched to each part'], ['fdm', 'sla']),
      processCapability('molding', '02', ['Short-run cast parts', 'Rigid and soft-touch grades', 'Production-like surfaces']),
      processCapability('composites', '03', ['Large panels and shells', 'Styling models and bucks', 'Lightweight, stiff structures']),
      processCapability('machining', '04', ['CNC machined parts', 'Laser-cut sheet and panels', 'Tight-tolerance features']),
      processCapability('finishing', '05', ['Sanding, priming and paint', 'Texture and CMF studies', 'Presentation-quality finish']),
    ],
    capabilitySlot: 'build-capabilities',
    specsTitle: 'Specifications',
    specs: [
      { param: 'Large-format build volume', value: 'Up to 520 × 520 × 600 mm' },
      { param: 'Layer resolution', value: '0.1 – 0.4 mm large-format; sub-0.05 mm high-resolution' },
      { param: 'Tolerances', value: '±0.3 mm typical on large-format additive parts' },
      { param: 'Materials', value: 'Industrial-grade engineering materials, selected per application' },
      { param: 'Turnaround', value: 'Standard 5 – 7 working days; express and urgent available' },
    ],
    tagsLabel: 'Processes',
    tags: ['Additive Manufacturing', 'Silicone Molding', 'Composite Layup', 'CNC', 'Laser Cutting', 'CMF Finishing'],
    workTag: 'build',
    card: { n: '03', title: 'Build', description: 'Additive, molding, composites, machining and finishing.', slot: 'services-card-build' },
  },
}

export const SERVICE_ORDER: ServicePage['slug'][] = ['design', 'engineering', 'build', 'embedded']
