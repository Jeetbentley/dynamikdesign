import type { Industry } from './work'

export interface IndustryPage {
  slug: string
  industry: Industry
  href: string
  name: string
  shortName: string
  metaDescription: string
  headline: string
  subline: string
  heroSlot: string
  cardSlot: string
  cardBody: string
  capabilities: { title: string; body: string }[]
  prototypes: { type: string; examples: string }[]
  services: { title: string; body: string; href: string }[]
  phygital: { body: string; points: string[]; slot: string }
}

export const INDUSTRIES: IndustryPage[] = [
  {
    slug: 'automotive-mobility',
    industry: 'automotive',
    href: '/industries/automotive-mobility',
    name: 'Automotive & Mobility',
    shortName: 'Automotive',
    metaDescription: 'Styling, CAS surfacing, interior components, HMI and connected systems prototyping for OEMs, EV startups and mobility brands.',
    headline: 'Design and prototyping for what moves.',
    subline: 'From styling and CAS surfacing to working HMI and connected systems, for OEMs, EV startups and mobility brands.',
    heroSlot: 'industry-automotive-hero',
    cardSlot: 'home-industry-automotive',
    cardBody: 'Styling, surfacing, interior components, HMI and connected systems for OEMs, EV startups and mobility brands.',
    capabilities: [
      { title: 'Exterior & interior styling', body: 'Concept styling from sketches to surfaced design.' },
      { title: 'CAS & Class-A surfacing', body: 'Concept and production-quality surfaces.' },
      { title: 'Accessories & aftermarket parts', body: 'Designed, engineered and prototyped to fit.' },
      { title: 'Interior trim & switchgear', body: 'Trim, controls and tactile components.' },
      { title: 'Lighting concepts', body: 'Lamp and ambient lighting concepts and prototypes.' },
      { title: 'HMI, cluster & voice interfaces', body: 'Displays, controls and voice interaction.' },
      { title: 'CAN & telemetry prototyping', body: 'Vehicle data, connectivity and test units.' },
    ],
    prototypes: [
      { type: 'Looks-like', examples: 'Styling and appearance models, interior bucks, CMF studies.' },
      { type: 'Works-like', examples: 'Switchgear rigs, HMI demonstrators, CAN/telemetry test units.' },
      { type: 'Looks-like + Works-like', examples: 'Functional accessory and interior component prototypes.' },
    ],
    services: [
      { title: 'Automotive Design', body: 'CAS & Class-A surfacing, styling.', href: '/services/design#automotive-design' },
      { title: 'Visualization & Renders', body: 'Reviews, CMF variants, presentations.', href: '/services/design#visualization' },
      { title: 'Phygital Systems', body: 'HMI, voice, dashboards and the electronics behind them.', href: '/services/engineering#phygital' },
      { title: 'FRP & Composites', body: 'Panels, bucks and styling models.', href: '/services/build#composites' },
      { title: 'Finishing & CMF', body: 'Presentation-quality finish.', href: '/services/build#finishing' },
    ],
    phygital: {
      body: 'Adding intelligence to a vehicle product means it can show, sense and respond. Add it where it matters, or leave it out.',
      points: ['Connected dashboards', 'Voice assistants', 'Rider and driver HMI', 'Telemetry'],
      slot: 'industry-automotive-phygital',
    },
  },
  {
    slug: 'industrial-interior',
    industry: 'industrial-interior',
    href: '/industries/industrial-interior',
    name: 'Industrial & Interior Products',
    shortName: 'Industrial & Interior',
    metaDescription: 'Lighting, home devices, appliances, fixtures and enclosures — designed for manufacture and prototyped to be experienced.',
    headline: 'Products for the spaces people live and work in.',
    subline: 'Lighting, home devices, appliances and fixtures, designed for manufacture and built to be experienced.',
    heroSlot: 'industry-industrial-hero',
    cardSlot: 'home-industry-industrial',
    cardBody: 'Lighting, home devices, appliances, fixtures and enclosures, designed for manufacture.',
    capabilities: [
      { title: 'Product ideation & industrial design', body: 'From brief to form, ergonomics and CMF.' },
      { title: 'Lighting design & prototyping', body: 'Luminaires, diffusers and light behaviour.' },
      { title: 'Home devices & appliances', body: 'Everyday products, designed to be made.' },
      { title: 'Enclosures & housings', body: 'Housings engineered around the electronics.' },
      { title: 'Fixtures & decor products', body: 'Objects for interiors, from concept to sample.' },
      { title: 'CMF & finishing', body: 'Colour, material and finish to production intent.' },
    ],
    prototypes: [
      { type: 'Looks-like', examples: 'Appearance models for retail, investors and photography.' },
      { type: 'Works-like', examples: 'Mechanism, thermal and electronics proof-of-concept.' },
      { type: 'Looks-like + Works-like', examples: 'Pre-production prototypes for design reviews.' },
    ],
    services: [
      { title: 'Industrial Design', body: 'Form, ergonomics and CMF.', href: '/services/design#industrial-design' },
      { title: 'CAD & DFM', body: 'Engineering CAD, ready to make.', href: '/services/design#cad-dfm' },
      { title: 'Mechanical Design', body: 'Mechanisms, thermal and assembly.', href: '/services/engineering#mechanical' },
      { title: 'Additive Manufacturing', body: 'Appearance and functional parts.', href: '/services/build#additive' },
      { title: 'Silicone Molding & Casting', body: 'Short runs with production-like surfaces.', href: '/services/build#molding' },
    ],
    phygital: {
      body: 'Adding intelligence to a home or interior product lets it respond to people and connect to their world. Add it where it matters, or leave it out.',
      points: ['Smart lighting', 'Voice and gesture control', 'App-connected home products'],
      slot: 'industry-industrial-phygital',
    },
  },
]

export const getIndustry = (slug: string) => INDUSTRIES.find((i) => i.slug === slug)
