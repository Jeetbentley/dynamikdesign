import { ENGAGEMENTS } from './approach'
import { INDUSTRIES } from './industries'

export interface NavLink {
  label: string
  href: string
}

export interface MegaColumn {
  title: string
  href?: string
  links: NavLink[]
}

export const SERVICES_MENU = {
  label: 'Services',
  href: '/services',
  banner: {
    text: 'Concept to Prototype, one team.',
    link: { label: 'See our approach', href: '/approach' },
  },
  columns: [
    {
      title: 'Design',
      href: '/services/design',
      links: [
        { label: 'Ideation & Concept', href: '/services/design#ideation' },
        { label: 'Industrial Design', href: '/services/design#industrial-design' },
        { label: 'Automotive Design', href: '/services/design#automotive-design' },
        { label: 'Digital Modeling', href: '/services/design#digital-modeling' },
        { label: 'Visualization & Renders', href: '/services/design#visualization' },
      ],
    },
    {
      title: 'Engineer',
      href: '/services/engineering',
      links: [
        { label: 'Mechanical Design', href: '/services/engineering#mechanical' },
        { label: 'Phygital — Embedded, Firmware & Interfaces', href: '/services/engineering#phygital' },
      ],
    },
    {
      title: 'Build',
      href: '/services/build',
      links: [
        { label: 'Additive Manufacturing', href: '/services/build#additive' },
        { label: 'Silicone Molding & Casting', href: '/services/build#molding' },
        { label: 'FRP & Composites', href: '/services/build#composites' },
        { label: 'CNC & Laser Cutting', href: '/services/build#machining' },
        { label: 'Finishing & CMF', href: '/services/build#finishing' },
        { label: 'Fabrication Only', href: '/services/build#fabrication-only' },
      ],
    },
    {
      title: 'Industries',
      links: INDUSTRIES.map((i) => ({ label: i.name, href: i.href })),
    },
  ] as MegaColumn[],
  engage: {
    title: 'Engage',
    links: ENGAGEMENTS.map((e) => ({ label: e.title, href: `/contact?service=${e.slug}` })),
    cta: { label: 'Start a Project', href: '/contact' },
  },
}

export const PRODUCTS_MENU = {
  label: 'Products',
  href: '/products',
  items: [{ label: 'Tile', href: '/products/tile', description: '64-pixel desk clock, lamp & canvas' }],
}

export const FOOTER_EXPLORE: NavLink[] = [
  { label: 'Work', href: '/work' },
  { label: 'Approach', href: '/approach' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
]

export const FOOTER_SERVICES: NavLink[] = [
  { label: 'Design', href: '/services/design' },
  { label: 'Engineering', href: '/services/engineering' },
  { label: 'Build', href: '/services/build' },
  { label: 'Industries', href: '/services#industries' },
]
