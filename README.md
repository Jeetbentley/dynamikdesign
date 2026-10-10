# Dynamik Design Lab — website

Marketing site for Dynamik Design Lab, a concept-to-prototype studio in Pune. Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion.

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

## Where content lives

| What | File |
|---|---|
| Contact details (email, phone, WhatsApp, address, hours, socials) | `src/config/site.ts` |
| Services mega menu, Products menu, footer links | `src/data/navigation.ts` |
| Service pages (Design, Engineering, Embedded, Build), build processes, turnaround, file formats | `src/data/services.ts` |
| Industry pages | `src/data/industries.ts` |
| Approach stages, entry points, ways to engage, FAQ, contact form options | `src/data/approach.ts` |
| Work / case studies | `src/data/work.ts` |
| Testimonials (section hidden while empty) | `src/data/testimonials.ts` |
| Image manifest | `src/data/images.ts` (+ `CREDITS.md`) |
| Blog posts | `src/data/blog.ts` |

Values marked `TODO` in these files still need confirming. In spec tables they render as "to be confirmed".

## Adding a work project

1. Create a folder for its images: `public/work/<slug>/`, e.g. `public/work/ev-dashboard/cover.jpg`, `public/work/ev-dashboard/01.jpg`.
2. Add one object to the `work` array in `src/data/work.ts`:

```ts
{
  slug: 'ev-dashboard',                 // URL: /work/ev-dashboard
  title: 'Connected EV Dashboard',
  client: 'Confidential',               // or the client's name
  industry: 'automotive',               // 'automotive' | 'industrial-interior'
  tags: ['design', 'engineering', 'phygital'], // any of: design, engineering, build, phygital
  summary: 'One or two sentences shown at the top of the case study.',
  coverImage: '/work/ev-dashboard/cover.jpg',
  gallery: [
    { src: '/work/ev-dashboard/01.jpg', caption: 'Digital modeling review' },
  ],
  challenge: 'What problem the client brought.',
  approach: 'How we tackled it.',
  outcome: 'What was delivered and what it achieved.',
  nda: true,       // shows "Process shown, client confidential" on the case study
  featured: true,  // eligible for the homepage Selected Work grid
}
```

That's it: the card, filters (industry and tags), case study page and related projects all come from this object.

The six current entries are placeholders (`placeholder: true`). They render a "Case study coming soon" card and page. Replace or delete them as real projects are added.

## Images

Every image comes from a named slot in `src/data/images.ts`. Until its file exists in `/public`, a slot renders a themed placeholder block. To fill one, follow the steps in `CREDITS.md`. Use free-license (Unsplash or Pexels), subject-relevant images only, downloaded and served locally.

## Redirects

Defined in `next.config.js` (301):

- `/services/fdm-printing`, `/services/sla-printing` → `/services/build#additive`
- `/services/product-design` → `/services/design#industrial-design`
- `/process` → `/approach`
- `/materials` → `/services/build` (the page file is kept but unlinked)
