export type RelatedContext = 'design' | 'build' | 'engineering' | 'embedded' | 'industry'

export interface BlogPost {
  slug: string
  title: string
  category: '3D Printing' | 'Product Design' | 'Embedded' | 'Tutorials' | 'Industry'
  date: string
  readTime: string
  excerpt: string
  imageSlot: string // see src/data/images.ts
  materialComparison?: boolean // never shown in "Related reads"
  relatedOn?: RelatedContext[] // pages whose "Related reads" may show this post
  body: string[]
}

export const posts: BlogPost[] = [
  {
    slug: 'choosing-petg-vs-abs',
    title: 'PETG vs ABS: Which one for your next prototype?',
    category: '3D Printing',
    date: 'Mar 14, 2025',
    readTime: '5 min read',
    excerpt:
      'Both are workhorses for functional prototyping. Here’s how we choose between them in our shop.',
    imageSlot: 'blog-choosing-petg-vs-abs',
    materialComparison: true,
    body: [
      'PETG and ABS are the two materials we reach for most often when a customer needs a functional prototype that has to actually do something — not just look the part.',
      'PETG prints more reliably, has better layer adhesion, and is more forgiving of imperfect cooling. We default to it for enclosures, brackets, and any part that does not need to live inside a hot car or chemical environment.',
      'ABS gets the call when heat resistance matters, when post-processing with acetone vapor smoothing is in play, or when the customer wants a finish closer to injection-molded plastic.',
      'A practical rule: start with PETG. Move to ABS only when you have a specific reason that PETG cannot serve.',
    ],
  },
  {
    slug: 'dfm-checklist-for-3d-printed-parts',
    title: 'A DFM checklist for 3D printed parts',
    category: 'Product Design',
    date: 'Mar 02, 2025',
    readTime: '7 min read',
    excerpt:
      'The dozen-or-so things we check before we put any customer file on the print bed.',
    imageSlot: 'blog-dfm-checklist-for-3d-printed-parts',
    relatedOn: ['design', 'build'],
    body: [
      'Most prints fail or look worse than they should because of decisions made in the 3D model, not because of the printer.',
      'Wall thickness, hole sizes, overhangs, and orientation account for the vast majority of issues. We have a short checklist we run every customer file through before quoting.',
      'Get these right and your part will print first time, look better, and cost less.',
    ],
  },
  {
    slug: 'esp32-prototyping-pipeline',
    title: 'Our ESP32 prototyping pipeline',
    category: 'Embedded',
    date: 'Feb 18, 2025',
    readTime: '6 min read',
    excerpt:
      'From breadboard to a custom PCB in under two weeks — here is how we do it.',
    imageSlot: 'blog-esp32-prototyping-pipeline',
    relatedOn: ['engineering', 'embedded'],
    body: [
      'For most IoT prototypes we keep the path short: validate the idea on a dev board, draft the schematic in KiCad, and iterate on the PCB once.',
      'Component selection is where most rookie projects burn time. We keep a curated BOM library so we can move faster.',
    ],
  },
  {
    slug: 'when-to-choose-sla-over-fdm',
    title: 'When SLA beats FDM (and when it does not)',
    category: '3D Printing',
    date: 'Feb 04, 2025',
    readTime: '4 min read',
    excerpt:
      'Resin is not always better. Here is the honest rundown of where each shines.',
    imageSlot: 'blog-when-to-choose-sla-over-fdm',
    materialComparison: true,
    body: [
      'SLA gives you detail FDM cannot match. FDM gives you size and material flexibility SLA cannot match.',
      'For presentation models, micro parts, and anything jewelry-adjacent, SLA wins on appearance every time.',
    ],
  },
  {
    slug: 'iterating-fast-with-print-friendly-cad',
    title: 'Iterating fast with print-friendly modeling habits',
    category: 'Tutorials',
    date: 'Jan 22, 2025',
    readTime: '8 min read',
    excerpt:
      'Six small modeling habits that will save you days across the lifetime of a project.',
    imageSlot: 'blog-iterating-fast-with-print-friendly-cad',
    relatedOn: ['design', 'build'],
    body: [
      'Modeling for print is a discipline. The good news is the habits are simple and once internalized they cost nothing.',
      'Use parametric features wherever possible, avoid sub-millimeter detail unless SLA, and orient your part deliberately in the 3D model.',
    ],
  },
  {
    slug: 'india-hardware-startup-landscape',
    title: 'Notes on India’s hardware startup landscape',
    category: 'Industry',
    date: 'Jan 09, 2025',
    readTime: '9 min read',
    excerpt:
      'Why the next decade of Indian product startups will look very different from the last.',
    imageSlot: 'blog-india-hardware-startup-landscape',
    relatedOn: ['design', 'build', 'engineering', 'embedded', 'industry'],
    body: [
      'Local supply chains, cheaper prototyping, and a generation of engineers who have built abroad are converging.',
      'We see it in the steady rise of customer enquiries from teams that would have gone to Shenzhen five years ago.',
    ],
  },
]

export const getPostBySlug = (slug: string) =>
  posts.find((p) => p.slug === slug)

export const relatedReads = (context: RelatedContext, n = 3) =>
  posts.filter((p) => !p.materialComparison && p.relatedOn?.includes(context)).slice(0, n)
