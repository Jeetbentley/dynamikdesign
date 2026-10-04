// Single source for contact details used by the footer, contact page and WhatsApp button.
// Every value marked TODO must be confirmed before launch.

export const site = {
  name: 'Dynamik Design Lab',
  tagline: 'Concept to Prototype, one team.',
  email: 'lab.dynamikdesign@gmail.com',
  phoneDisplay: '+91 81800 13679',
  phoneHref: 'tel:+918180013679',
  whatsappHref: 'https://wa.me/918180013679',
  address: ['Dynamik Design Lab', 'Pune, Maharashtra', 'India'], // TODO: full studio address if public
  hours: ['Mon – Sat', '10:00 – 19:00 IST'], // TODO: confirm studio hours
  social: {
    linkedin: 'https://www.linkedin.com/company/dynamik-design-lab/',
    instagram: 'https://www.instagram.com/dynamik_designlab/',
    instagramHandle: '@dynamik_designlab',
  },
}

export const isTodo = (value: string) => value.includes('TODO')
