import ServiceDetail from '@/components/ServiceDetail'

export const metadata = {
  title: 'SLA 3D Printing — Dynamik Design Lab',
  description:
    'High-resolution SLA resin 3D printing in Pune. 0.05mm layers in standard, tough, flexible, and clear resins.',
}

export default function SlaPage() {
  return (
    <ServiceDetail
      eyebrow="02 — SLA 3D PRINTING"
      title="SLA 3D Printing"
      hero="https://picsum.photos/seed/sla-hero/2400/1400"
      intro={[
        'Stereolithography prints with light, layer by layer, in liquid resin. The result is the kind of detail and surface finish that FDM cannot match — sub-0.05mm layers, glass-smooth surfaces, and crisp small features.',
        'We use SLA for presentation models, medical prototypes, jewelry masters, micro-mechanical parts, and anything that needs to look injection-molded.',
        'Our resin library covers standard, tough, flexible, clear, and high-temperature options.',
      ]}
      whyUs={[
        '50 micron layer resolution — invisible layer lines',
        'Library of resins: tough, flexible, clear, castable, high-temp',
        'Optional post-cure for full mechanical properties',
        'Sanded and primed finishing available',
      ]}
      capabilities={[
        {
          n: '01',
          title: 'Resin selection',
          body: 'Standard for visual models, tough for snap-fits, flexible for wearables, clear for optics.',
        },
        {
          n: '02',
          title: 'Orientation & supports',
          body: 'Critical for SLA — we orient every part to minimize support marks on visible surfaces.',
        },
        {
          n: '03',
          title: 'Print',
          body: 'Layer heights 25 – 100 microns. Most jobs run overnight.',
        },
        {
          n: '04',
          title: 'Wash & cure',
          body: 'IPA wash bath, then UV post-cure for full chemical and mechanical properties.',
        },
        {
          n: '05',
          title: 'Finishing',
          body: 'Sanding, priming, and clear-coat for a near-injection-molded surface.',
        },
      ]}
      capabilityImage="https://picsum.photos/seed/sla-capabilities/1200/1500"
      specs={[
        { param: 'Build Volume', value: '218 × 123 × 230 mm' },
        { param: 'Layer Height', value: '25 – 100 microns' },
        { param: 'Tolerances', value: '±0.1 mm typical' },
        { param: 'Resins', value: 'Standard, Tough, Flexible, Clear, High-Temp' },
        { param: 'Surface Finish', value: 'As-printed, sanded, painted' },
        { param: 'Pricing', value: '₹65 / gram + finishing' },
        { param: 'Standard Turnaround', value: '3 – 5 days' },
      ]}
      materials={[
        'Standard Grey',
        'Standard White',
        'Tough Resin',
        'Flexible Resin',
        'Clear Resin',
        'High-Temp Resin',
        'Castable Resin',
      ]}
      category="SLA"
    />
  )
}
