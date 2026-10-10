// Real client testimonials only. The section is hidden while this list is empty.
// TODO: add approved quotes, e.g. { quote: '…', name: '…', role: 'Title, Company' }

export interface Testimonial {
  quote: string
  name: string
  role: string
}

export const testimonials: Testimonial[] = []
