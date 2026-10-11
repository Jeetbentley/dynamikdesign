import LegalPage, { A, Email, H2, List } from '@/components/LegalPage'
import { legal, waHref } from '@/data/legal'
import { inr } from '@/data/tile-launch'

export const metadata = {
  title: 'Returns, Refunds & Cancellation — Dynamik Design Lab',
  description: `${legal.returnWindowDays}-day returns, free cancellation before dispatch, and how refunds work for orders from ${legal.businessName}.`,
}

export default function RefundPolicyPage() {
  return (
    <LegalPage title="Returns, Refunds & Cancellation">
      <H2>Cancellation</H2>
      <p>
        You can cancel your order free of charge, with a full refund, at any time before it is dispatched. Once it has been
        dispatched, please use the return process below.
      </p>

      <H2>Return window</H2>
      <p>You can return a product within {legal.returnWindowDays} days of delivery, for any reason.</p>

      <H2>Return condition</H2>
      <p>
        It&apos;s fine to switch the product on to try it. To be accepted, the unit must be undamaged and come back with all
        its accessories, the quick start card and the original box.
      </p>

      <H2>How to request a return</H2>
      <p>
        Email <Email /> or message us on <A href={waHref(legal.phone)}>WhatsApp ({legal.phone})</A> with your order ID. We
        arrange a reverse pickup where it&apos;s serviceable. Otherwise, we share a return address with you.
      </p>

      <H2>Change of mind</H2>
      <p>
        If you return a product because you changed your mind, you pay the return shipping: the actual reverse-pickup cost,
        which we tell you before the return is confirmed.
        {legal.codAvailable && <> The cash-on-delivery fee of {inr(legal.codFee)} is non-refundable.</>}
      </p>

      <H2>Damaged, defective or wrong item</H2>
      <p>
        Report it within {legal.damageReportHours} hours of delivery, with photos or an unboxing video. We will replace the
        product or refund you in full, and we pay all shipping.
      </p>

      <H2>Inspection</H2>
      <p>We inspect returned products within {legal.inspectionWorkingDays} working days of receiving them.</p>

      <H2>Refund timing</H2>
      <List>
        <li>
          Prepaid orders: refunded to the original payment method within {legal.prepaidRefundWorkingDays} working days after
          inspection.
        </li>
        {legal.codAvailable && (
          <li>
            Cash-on-delivery orders: refunded by UPI or bank transfer within {legal.codRefundWorkingDays} working days after
            inspection.
          </li>
        )}
      </List>

      <H2>Not eligible for return</H2>
      <List>
        <li>Returns requested more than {legal.returnWindowDays} days after delivery.</li>
        <li>Units with physical or liquid damage.</li>
        <li>Units that have been opened up or tampered with.</li>
        <li>Units with missing parts or accessories.</li>
      </List>
      <p>
        This doesn&apos;t affect manufacturing defects, which are covered by our <A href="/warranty">warranty</A>.
      </p>
    </LegalPage>
  )
}
