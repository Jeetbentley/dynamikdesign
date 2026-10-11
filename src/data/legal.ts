// Seller and policy details — the single source for every legal page, the contact page's
// business details and the Tile page's seller information. Change values here only.

export const legal = {
  businessName: 'Dynamik Design Lab',
  entity: 'a sole proprietorship of Jeetendra Kumar',
  proprietor: 'Jeetendra Kumar',
  gstin: '10IMCPK4649R1ZJ',
  registeredAddress:
    'House No. 89, Virendra Prasad Kirana Store / Nath Niwas, Mahatma Gandhi Path, Kurji Balupar, Patna 800010, Bihar, India',
  dispatchCity: 'Patna, Bihar',
  studioCity: 'Pune, Maharashtra',
  email: 'hello@dynamikdesignlab.in',
  phone: '+91 81800 13679',
  grievanceOfficer: {
    name: 'Jeetendra Kumar',
    designation: 'Proprietor & Grievance Officer',
    email: 'hello@dynamikdesignlab.in',
    phone: '+91 81800 13679',
  },
  supportHours: 'Mon–Sat, 10:00–19:00 IST',
  returnWindowDays: 7,
  warrantyMonths: 12,
  dispatchWorkingDays: 3,
  codAvailable: true,
  codFee: 79,
  freeShipping: true,
  jurisdiction: 'Patna, Bihar',
  effectiveDate: '11 October 2026',
  // Timelines quoted in the policies
  damageReportHours: 48, // report damaged / defective / wrong items, or a damaged parcel
  inspectionWorkingDays: 2, // after a return reaches us
  prepaidRefundWorkingDays: '5–7', // after inspection, to the original payment method
  codRefundWorkingDays: 7, // after inspection, by UPI or bank transfer
  deliveryWorkingDays: '2–7', // after dispatch
  grievanceAckHours: 48,
}

// "+91 81800 13679" → "tel:+918180013679"
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`
// WhatsApp link for the same number
export const waHref = (phone: string) => `https://wa.me/${phone.replace(/\D/g, '')}`

// "12 months" → "1-year" for short labels; falls back to months
export const warrantyLabel =
  legal.warrantyMonths % 12 === 0 ? `${legal.warrantyMonths / 12}-year` : `${legal.warrantyMonths}-month`

export const POLICY_LINKS = [
  { href: '/terms', label: 'Terms' },
  { href: '/refund-policy', label: 'Returns & Refunds' },
  { href: '/shipping-policy', label: 'Shipping' },
  { href: '/warranty', label: 'Warranty' },
  { href: '/privacy', label: 'Privacy Policy' },
]
