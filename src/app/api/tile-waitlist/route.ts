import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { site } from '@/config/site'
import { inr, salesOpenLine, tileLaunch, TILE_URL } from '@/data/tile-launch'
import { normaliseWhatsapp, waitlistSchema } from '@/data/tile-waitlist-schema'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// In-memory rate limit: 5 requests per IP per 10 minutes. Resets when a server instance restarts.
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) hits.clear()
  return recent.length > MAX_PER_WINDOW
}

const clientIp = (req: Request) =>
  req.headers.get('x-forwarded-for')?.split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown'

const fail = (status: number, error: string) => NextResponse.json({ ok: false, error }, { status })

async function sendEmails(entry: { name: string; email: string; whatsapp: string; city: string; colour: string; mode: string; referrer: string }) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) return // email is optional

  const port = Number(SMTP_PORT)
  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })
  const from = `Dynamik Design Lab <${site.email}>`

  const results = await Promise.allSettled([
    transport.sendMail({
      from,
      to: entry.email,
      replyTo: site.email,
      subject: "You're on the Tile Founders Batch list",
      text: [
        `Hi ${entry.name},`,
        '',
        `Thanks for joining the Tile Founders Batch. You're on the list for one of the first ${tileLaunch.foundersBatchSize} Tiles at ${inr(tileLaunch.foundersPrice)} (regular ${inr(tileLaunch.regularPrice)}).`,
        '',
        `${salesOpenLine} We'll message you by email and WhatsApp before anyone else.`,
        '',
        'To stop these updates, reply with "unsubscribe".',
        '',
        '— Dynamik Design Lab',
        TILE_URL,
      ].join('\n'),
    }),
    transport.sendMail({
      from,
      to: site.email,
      subject: `New Tile waitlist signup: ${entry.name}`,
      text: [
        `Name: ${entry.name}`,
        `Email: ${entry.email}`,
        `WhatsApp: ${entry.whatsapp}`,
        `City: ${entry.city}`,
        `Colour: ${entry.colour}`,
        `Mode: ${entry.mode}`,
        `Referrer: ${entry.referrer}`,
      ].join('\n'),
    }),
  ])
  results.forEach((r) => r.status === 'rejected' && console.error('[tile-waitlist] email failed:', r.reason))
}

export async function POST(req: Request) {
  if (rateLimited(clientIp(req))) return fail(429, 'Too many attempts. Please try again in a few minutes.')

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return fail(400, 'Invalid request.')
  }

  // Honeypot: real visitors never see or fill this field.
  if (typeof body.website === 'string' && body.website.trim() !== '') return fail(400, 'Invalid submission.')

  const parsed = waitlistSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Please check the highlighted fields.', fields: parsed.error.flatten().fieldErrors }, { status: 400 })
  }

  const { WAITLIST_WEBHOOK_URL, WAITLIST_SECRET } = process.env
  if (!WAITLIST_WEBHOOK_URL || !WAITLIST_SECRET) {
    console.error('[tile-waitlist] WAITLIST_WEBHOOK_URL or WAITLIST_SECRET is not set')
    return fail(503, 'The waitlist is not available right now. Please try again shortly.')
  }

  const d = parsed.data
  const entry = {
    name: d.name,
    email: d.email,
    whatsapp: normaliseWhatsapp(d.whatsapp)!,
    city: d.city,
    colour: d.colour,
    mode: d.mode,
    consent: true,
    referrer: (d.referrer || 'direct').slice(0, 300),
  }

  let result: { ok?: boolean; status?: string; error?: string }
  try {
    const res = await fetch(WAITLIST_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: WAITLIST_SECRET, ...entry }),
      redirect: 'follow', // Apps Script answers via a redirect
      cache: 'no-store',
      signal: AbortSignal.timeout(15000),
    })
    result = await res.json()
  } catch (err) {
    console.error('[tile-waitlist] webhook request failed:', err)
    return fail(502, 'We could not save your signup. Please try again.')
  }

  if (!result.ok) {
    console.error('[tile-waitlist] webhook rejected signup:', result.error)
    return fail(502, 'We could not save your signup. Please try again.')
  }

  const duplicate = result.status === 'duplicate'
  if (!duplicate) await sendEmails(entry)

  return NextResponse.json({ ok: true, duplicate })
}
