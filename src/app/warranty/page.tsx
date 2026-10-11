import LegalPage, { A, Email, H2, List } from '@/components/LegalPage'
import { legal, waHref } from '@/data/legal'

export const metadata = {
  title: 'Warranty — Dynamik Design Lab',
  description: `${legal.warrantyMonths}-month warranty against manufacturing defects on products from ${legal.businessName}: what's covered and how to claim.`,
}

export default function WarrantyPage() {
  return (
    <LegalPage title="Warranty">
      <H2>Coverage</H2>
      <p>
        Our products carry a {legal.warrantyMonths}-month warranty from the date of delivery against manufacturing defects in
        materials and workmanship. The warranty is for the original purchaser and needs the order ID or invoice.
      </p>

      <H2>What we do</H2>
      <p>
        We repair or replace the product, or refund it if neither is possible. We cover shipping for valid claims. A replaced
        unit carries the remainder of the original warranty.
      </p>

      <H2>How to claim</H2>
      <p>
        Email <Email /> or message us on <A href={waHref(legal.phone)}>WhatsApp ({legal.phone})</A> with your order ID, a
        description of the problem and a short video showing it.
      </p>

      <H2>What isn&apos;t covered</H2>
      <List>
        <li>Physical damage, liquid damage, opening the unit, or repairs by anyone other than us.</li>
        <li>Damage from a faulty or non-standard USB power adapter, or from power surges.</li>
        <li>Modified or third-party firmware, or other tampering.</li>
        <li>Normal wear of the finish.</li>
        <li>Use outside the product&apos;s intended purpose.</li>
      </List>

      <H2>Your statutory rights</H2>
      <p>This warranty is in addition to your rights under consumer law and doesn&apos;t affect them.</p>
    </LegalPage>
  )
}
