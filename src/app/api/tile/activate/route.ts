// Tile warranty activation. Called by the Tile itself on first setup:
//   POST /api/tile/activate  {"serial":"DDLTL-2610-B-0001","mac":"aa:bb:cc:dd:ee:ff","fw":"1.6.1"}
// Validates the body, forwards it to the warranty sheet (TILE_WARRANTY_API, Google Apps Script) and returns
// its JSON unchanged. No auth, no cookies, nothing stored, nothing personal logged.

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const SERIAL = /^DDLTL-\d{4}-[A-Z]-\d{4}$/i
const NO_STORE = { 'Cache-Control': 'no-store' }

const reply = (status: number, body: unknown) => Response.json(body, { status, headers: NO_STORE })
const badRequest = () => reply(400, { ok: false, error: 'bad_request' })
const upstreamFailed = () => reply(502, { ok: false, error: 'upstream' })

// 12 hex digits, with any separators (aa:bb:cc:dd:ee:ff, AA-BB-..., aabb.ccdd.eeff, aabbccddeeff)
const isMac = (v: string) => {
  const hex = v.replace(/[^0-9a-f]/gi, '')
  return hex.length === 12 && /^[0-9a-f:.\-\s]+$/i.test(v)
}

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return badRequest()
  }
  const { serial, mac, fw } = (body ?? {}) as Record<string, unknown>
  if (typeof serial !== 'string' || !SERIAL.test(serial.trim())) return badRequest()
  if (typeof mac !== 'string' || !isMac(mac.trim())) return badRequest()
  if (typeof fw !== 'string' || fw.length === 0 || fw.length > 16) return badRequest()

  const api = process.env.TILE_WARRANTY_API
  if (!api) return upstreamFailed()

  try {
    const res = await fetch(api, {
      method: 'POST',
      // text/plain keeps Apps Script happy (no CORS preflight); the body is still JSON
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'activate', serial: serial.trim().toUpperCase(), mac: mac.trim(), fw }),
      redirect: 'follow', // Apps Script answers with a 302 to googleusercontent.com
      signal: AbortSignal.timeout(10000),
      cache: 'no-store',
    })
    if (!res.ok) return upstreamFailed()
    const data: unknown = await res.json()
    if (!data || typeof data !== 'object') return upstreamFailed()
    return reply(200, data)
  } catch (err) {
    console.error('[tile-activate] upstream failed:', err instanceof Error ? err.name : 'error')
    return upstreamFailed()
  }
}
