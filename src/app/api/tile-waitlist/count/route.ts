import { NextResponse } from 'next/server'
import { tileLaunch } from '@/data/tile-launch'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const TTL_MS = 60 * 1000
let cached: { count: number; at: number } | null = null

// Real signup count from the Apps Script. Only used when showSpotsCounter is on.
export async function GET() {
  if (!tileLaunch.showSpotsCounter) return NextResponse.json({ error: 'Not available' }, { status: 404 })

  if (cached && Date.now() - cached.at < TTL_MS) return NextResponse.json({ count: cached.count })

  const { WAITLIST_WEBHOOK_URL, WAITLIST_SECRET } = process.env
  if (!WAITLIST_WEBHOOK_URL || !WAITLIST_SECRET) return NextResponse.json({ error: 'Not configured' }, { status: 503 })

  try {
    const url = new URL(WAITLIST_WEBHOOK_URL)
    url.searchParams.set('secret', WAITLIST_SECRET)
    const res = await fetch(url, { redirect: 'follow', cache: 'no-store', signal: AbortSignal.timeout(10000) })
    const data = await res.json()
    if (!data.ok || typeof data.count !== 'number') throw new Error(data.error || 'bad response')
    cached = { count: data.count, at: Date.now() }
    return NextResponse.json({ count: data.count })
  } catch (err) {
    console.error('[tile-waitlist] count failed:', err)
    return NextResponse.json({ error: 'Unavailable' }, { status: 502 })
  }
}
