import ServiceDetail from '@/components/ServiceDetail'

export const metadata = {
  title: 'FDM 3D Printing — Dynamik Design Lab',
  description:
    'Large-format FDM 3D printing in Pune. Up to 520 × 520 × 600mm in PLA, PETG, ABS, ASA, TPU. ₹22/gram, 48-hour turnaround.',
}

export default function FdmPage() {
  return (
    <ServiceDetail
      eyebrow="01 — FDM 3D PRINTING"
      title="FDM 3D Printing"
      hero="https://picsum.photos/seed/fdm-hero/2400/1400"
      intro={[
        'Fused Deposition Modeling is the workhorse of functional prototyping. Strong, cost-effective, and ready in a day or two — for enclosures, jigs, brackets, concept models, and one-off production parts.',
        'Our Elegoo Neptune 4 MAX gives us a 520 × 520 × 600mm build envelope, which means many parts that other shops would split into pieces, we print whole.',
        'We print in PLA, PETG, ABS, ASA, and TPU. Pricing is transparent at ₹22/gram with a clear post-processing line item — no surprises on the invoice.',
      ]}
      whyUs={[
        'Large-format build volume — most parts in a single piece',
        'Material range from rigid PLA to flexible TPU',
        '48-hour turnaround on standard jobs',
        'DFM feedback included with every quote',
      ]}
      capabilities={[
        {
          n: '01',
          title: 'File review & DFM',
          body: 'We check wall thickness, overhangs, hole sizes, and orientation. You get notes back before printing.',
        },
        {
          n: '02',
          title: 'Material selection',
          body: 'PLA, PETG, ABS, ASA, or TPU based on your part’s stress, temperature, and finish requirements.',
        },
        {
          n: '03',
          title: 'Print',
          body: 'Tuned print profiles per material and per geometry. Calibrated weekly. Layer heights from 0.1 to 0.4mm.',
        },
        {
          n: '04',
          title: 'Post-processing',
          body: 'Support removal, light sanding, drilling, threading, vapor smoothing (ABS), or paint-ready prep.',
        },
        {
          n: '05',
          title: 'QC',
          body: 'Caliper-checked against your CAD. Photos sent before dispatch.',
        },
      ]}
      capabilityImage="https://picsum.photos/seed/fdm-capabilities/1200/1500"
      specs={[
        { param: 'Build Volume', value: '520 × 520 × 600 mm' },
        { param: 'Layer Height', value: '0.1 – 0.4 mm' },
        { param: 'Tolerances', value: '±0.3 mm typical' },
        { param: 'Materials', value: 'PLA, PETG, ABS, ASA, TPU' },
        { param: 'Surface Finish', value: 'As-printed, sanded, vapor-smoothed (ABS)' },
        { param: 'Pricing', value: '₹22 / gram + ₹2 / gram post-processing' },
        { param: 'Standard Turnaround', value: '48 – 72 hours' },
      ]}
      materials={['PLA', 'PETG', 'ABS', 'ASA', 'TPU 95A', 'PLA+ Wood', 'Carbon Fiber Nylon']}
      category="FDM"
    />
  )
}
