import ServiceDetail from '@/components/ServiceDetail'

export const metadata = {
  title: 'Product Design — Dynamik Design Lab',
  description:
    'Industrial design, CAD, and DFM review. We design products with their production method in mind from day one.',
}

export default function ProductDesignPage() {
  return (
    <ServiceDetail
      eyebrow="03 — PRODUCT DESIGN"
      title="Product Design"
      hero="https://picsum.photos/seed/design-hero/2400/1400"
      intro={[
        'A prototype is only as good as the design behind it. Our industrial designers work in Fusion 360, SolidWorks, and Figma, with one foot always in the print room — so what we draw is what we can build.',
        'We start from a brief, a sketch, or a half-built CAD file. We hand back a manufacturable form, drawings, and a printed first article.',
        'Our background includes work with Matter Motor Works on EV product design, plus consumer electronics, medical devices, and industrial tools.',
      ]}
      whyUs={[
        'Designers who also run the print floor — every design is print-aware',
        'Concept sketches, full CAD, and engineering drawings under one roof',
        'DFM review built into the process, not bolted on at the end',
        'Direct path from final CAD to first physical prototype',
      ]}
      capabilities={[
        {
          n: '01',
          title: 'Discovery',
          body: 'A working session to map the problem, constraints, target user, and production method.',
        },
        {
          n: '02',
          title: 'Concept sketches',
          body: 'Two or three directions on paper, then a working session to pick one.',
        },
        {
          n: '03',
          title: 'CAD development',
          body: 'Parametric model in Fusion 360 or SolidWorks. Everything ready to revise quickly.',
        },
        {
          n: '04',
          title: 'DFM review',
          body: 'Wall thickness, draft angles, fastener bosses, assembly sequence — all checked against the chosen production method.',
        },
        {
          n: '05',
          title: 'Prototype',
          body: 'First physical article off our printers, in the right material, ready for review.',
        },
        {
          n: '06',
          title: 'Drawings & handoff',
          body: 'Engineering drawings, BOM, and STEP files ready for tooling or further iteration.',
        },
      ]}
      capabilityImage="https://picsum.photos/seed/design-capabilities/1200/1500"
      specs={[
        { param: 'Software', value: 'Fusion 360, SolidWorks, Figma, KeyShot' },
        { param: 'Deliverables', value: 'CAD (STEP), drawings (PDF), renders, prototype' },
        { param: 'Engagement Models', value: 'Fixed-scope project or hourly retainer' },
        { param: 'Typical Project', value: '2 – 8 weeks' },
        { param: 'Industries Served', value: 'EV, consumer electronics, medical, industrial tools' },
        { param: 'Pricing', value: 'On enquiry — we scope every project individually' },
      ]}
      materials={[
        'Industrial Design',
        'Mechanical CAD',
        'DFM Review',
        'Engineering Drawings',
        'Renders',
        'Reverse Engineering',
      ]}
      category="Design"
    />
  )
}
