// Selected work. To add a project: add one object below and put its images in
// /public/work/<slug>/ (see README → "Adding a work project").

export type Industry = 'automotive' | 'industrial-interior'
export type WorkTag = 'design' | 'engineering' | 'build' | 'phygital'

export interface WorkProject {
  slug: string
  title: string
  client: string // use "Confidential" when the client can't be named
  industry: Industry
  tags: WorkTag[]
  summary: string
  coverImage: string // e.g. '/work/<slug>/cover.jpg'
  gallery: { src: string; caption: string }[]
  challenge: string
  approach: string
  outcome: string
  nda: boolean // true → case study shows "Process shown, client confidential"
  featured: boolean // true → eligible for the homepage Selected Work grid
  placeholder?: boolean // true → renders as "Case study coming soon"; remove when the real content is in
}

export const INDUSTRY_LABEL: Record<Industry, string> = {
  automotive: 'Automotive & Mobility',
  'industrial-interior': 'Industrial & Interior',
}

export const TAG_LABEL: Record<WorkTag, string> = {
  design: 'Design',
  engineering: 'Engineering',
  build: 'Build',
  phygital: 'Phygital',
}

const placeholder = (
  n: number,
  industry: Industry,
  tags: WorkTag[],
  nda = false,
): WorkProject => ({
  slug: `project-${n}`,
  title: 'Project Title — Coming Soon',
  client: 'Confidential',
  industry,
  tags,
  summary: 'TODO',
  coverImage: `/work/project-${n}/cover.jpg`,
  gallery: [],
  challenge: 'TODO',
  approach: 'TODO',
  outcome: 'TODO',
  nda,
  featured: true,
  placeholder: true,
})

export const work: WorkProject[] = [
  placeholder(1, 'automotive', ['design', 'build']),
  placeholder(2, 'industrial-interior', ['design', 'engineering', 'phygital']),
  placeholder(3, 'automotive', ['engineering', 'phygital'], true),
  placeholder(4, 'industrial-interior', ['design', 'build']),
  placeholder(5, 'automotive', ['design']),
  placeholder(6, 'industrial-interior', ['engineering', 'build'], true),
]

export const getWork = (slug: string) => work.find((w) => w.slug === slug)

export const workFilterKeys = (w: WorkProject): string[] => [w.industry, ...w.tags]
