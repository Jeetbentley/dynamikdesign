// Single source for contact details used by the footer, contact page and WhatsApp button.
// Every value marked TODO must be confirmed before launch.

export const site = {
  name: 'Dynamik Design Lab',
  tagline: 'Concept to Prototype, one team.',
  email: 'hello@dynamikdesignlab.com', // TODO: confirm inbox
  phoneDisplay: '+91 00000 00000', // TODO: real phone number
  phoneHref: 'tel:+910000000000', // TODO: real phone number
  whatsappHref: 'https://wa.me/910000000000', // TODO: real WhatsApp number
  address: ['Dynamik Design Lab', 'Pune, Maharashtra', 'India'], // TODO: full studio address if public
  hours: ['Mon – Sat', '10:00 – 19:00 IST'], // TODO: confirm studio hours
  social: {
    linkedin: 'https://linkedin.com', // TODO: company LinkedIn URL
    instagram: 'https://instagram.com', // TODO: company Instagram URL
  },
}

export const isTodo = (value: string) => value.includes('TODO')
