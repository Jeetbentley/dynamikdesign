import { z } from 'zod'
import { tileLaunch } from './tile-launch'

// Indian mobile: optional +91 / 91 / 0 prefix, then 10 digits starting 6–9 (spaces or dashes allowed).
const WHATSAPP_RE = /^(?:\+?91|0)?[6-9]\d{9}$/

export const normaliseWhatsapp = (raw: string) => {
  const digits = raw.replace(/[\s-]/g, '')
  if (!WHATSAPP_RE.test(digits)) return null
  return `+91${digits.slice(-10)}`
}

export const waitlistSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name').max(80, 'That name is too long'),
  email: z.string().trim().toLowerCase().email('Please enter a valid email').max(120),
  whatsapp: z
    .string()
    .trim()
    .refine((v) => normaliseWhatsapp(v) !== null, 'Enter a 10-digit Indian mobile number (+91 optional)'),
  city: z.string().trim().min(2, 'Please enter your city').max(60),
  colour: z.string().refine((v) => tileLaunch.colours.includes(v), 'Please choose a colour'),
  mode: z.string().refine((v) => tileLaunch.modes.includes(v), 'Please choose a mode'),
  consent: z.literal(true, { errorMap: () => ({ message: 'Please tick to get launch updates' }) }),
  website: z.string().max(0).optional(), // honeypot — must stay empty
  referrer: z.string().max(300).optional(),
})

export type WaitlistInput = z.infer<typeof waitlistSchema>
