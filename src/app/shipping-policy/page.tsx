import LegalPage, { H2 } from '@/components/LegalPage'
import { legal } from '@/data/legal'
import { inr } from '@/data/tile-launch'

export const metadata = {
  title: 'Shipping & Delivery — Dynamik Design Lab',
  description: `${legal.freeShipping ? 'Free shipping across India. ' : ''}Dispatch times, delivery, tracking and cash on delivery for orders from ${legal.businessName}.`,
}

export default function ShippingPolicyPage() {
  return (
    <LegalPage title="Shipping & Delivery">
      <H2>Where we ship</H2>
      <p>
        {legal.freeShipping ? 'Shipping is free across India. ' : ''}We ship within India only and don&apos;t offer
        international shipping yet.
      </p>

      <H2>Dispatch</H2>
      <p>
        Orders are dispatched within {legal.dispatchWorkingDays} working days of order confirmation, from our fulfilment
        centre in {legal.dispatchCity}, through our courier partners.
      </p>

      <H2>Delivery time</H2>
      <p>
        Delivery typically takes {legal.deliveryWorkingDays} working days after dispatch, depending on your location. Remote
        areas may take longer.
      </p>

      <H2>Tracking</H2>
      <p>Once your order is dispatched, we send you a tracking link by email and WhatsApp.</p>

      {legal.codAvailable && (
        <>
          <H2>Cash on delivery</H2>
          <p>
            Cash on delivery is available on serviceable pin codes for a fee of {inr(legal.codFee)}. If your pin code
            isn&apos;t serviceable, this is shown at checkout.
          </p>
        </>
      )}

      <H2>Address accuracy and failed delivery</H2>
      <p>
        Please give an accurate address and phone number. If a prepaid order is refused or can&apos;t be delivered, we refund
        it minus the forward and return shipping costs.
        {legal.codAvailable && <> Repeatedly refusing cash-on-delivery orders may make COD unavailable for future orders.</>}
      </p>

      <H2>Damaged package</H2>
      <p>
        If the parcel is visibly damaged, please don&apos;t accept it. If you notice damage after accepting it, report it
        within {legal.damageReportHours} hours of delivery, with photos.
      </p>
    </LegalPage>
  )
}
