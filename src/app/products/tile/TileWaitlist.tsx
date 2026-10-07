'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import WhatsAppIcon from '@/components/WhatsAppIcon'
import { inr, salesOpenLine, shareText, tileLaunch } from '@/data/tile-launch'
import { waitlistSchema, type WaitlistInput } from '@/data/tile-waitlist-schema'

type Status = 'idle' | 'submitting' | 'success' | 'duplicate' | 'error'

const ORANGE = '#F0641E'
const label = 'block font-mono text-[11px] uppercase tracking-[0.14em] text-[#85858D]'
const input =
  'w-full border-0 border-b border-[#34343A] bg-transparent px-0 pb-3 pt-3 text-[17px] text-[#EDEDEF] placeholder:text-[#55555C] outline-none transition-colors focus:border-[#F0641E] focus:ring-0'
const errorText = 'mt-2 text-[13px] text-[#FF7A3D]'

function referrer() {
  const ref = new URLSearchParams(window.location.search).get('ref')
  const from = document.referrer && !document.referrer.startsWith(window.location.origin) ? document.referrer : ''
  if (ref) return `ref=${ref}${from ? ` | ${from}` : ''}`.slice(0, 300)
  return (from || 'direct').slice(0, 300)
}

function ShareButtons() {
  const text = encodeURIComponent(shareText)
  const linkClass =
    'inline-flex min-h-11 items-center gap-2.5 rounded-full border border-[#34343A] px-5 text-[13px] font-semibold uppercase tracking-[0.1em] !text-[#EDEDEF] transition-colors hover:border-[#EDEDEF]'
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-3">
      <a href={`https://wa.me/?text=${text}`} target="_blank" rel="noopener noreferrer" className={linkClass}>
        <WhatsAppIcon size={20} />
        Share on WhatsApp
      </a>
      <a href={`https://www.linkedin.com/feed/?shareActive=true&text=${text}`} target="_blank" rel="noopener noreferrer" className={linkClass}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
        </svg>
        Share on LinkedIn
      </a>
    </div>
  )
}

function SpotsCounter() {
  const [count, setCount] = useState<number | null>(null)
  useEffect(() => {
    if (!tileLaunch.showSpotsCounter) return
    fetch('/api/tile-waitlist/count')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => typeof d?.count === 'number' && setCount(d.count))
      .catch(() => {})
  }, [])
  if (count === null) return null // only ever shows the real count
  const claimed = Math.min(count, tileLaunch.foundersBatchSize)
  return (
    <p className="relative mb-8 font-mono text-[12px] uppercase tracking-[0.12em] text-[#F0641E]">
      {claimed} of {tileLaunch.foundersBatchSize} founder spots claimed
    </p>
  )
}

export default function TileWaitlist({ device }: { device: ReactNode }) {
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm<WaitlistInput>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: { colour: tileLaunch.colours.length === 1 ? tileLaunch.colours[0] : '', mode: '', website: '' },
  })

  const submit = async (values: WaitlistInput) => {
    setStatus('submitting')
    try {
      const res = await fetch('/api/tile-waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, referrer: referrer() }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.ok) {
        setStatus(data.duplicate ? 'duplicate' : 'success')
        return
      }
      if (data.fields) {
        Object.entries(data.fields as Record<string, string[]>).forEach(([k, v]) =>
          setError(k as keyof WaitlistInput, { message: v[0] }),
        )
      }
      setMessage(data.error || 'Something went wrong. Please try again.')
      setStatus('error')
    } catch {
      setMessage('We could not reach the server. Check your connection and try again.')
      setStatus('error')
    }
  }

  const done = status === 'success' || status === 'duplicate'

  return (
    <section id="waitlist" aria-labelledby="waitlist-h" className="relative scroll-mt-[132px] overflow-hidden border-t border-[#1E1E22] px-6 pb-[120px] pt-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[30%] h-[420px] w-[900px] -translate-x-1/2"
        style={{ background: 'radial-gradient(ellipse at center, rgba(240,100,30,0.18), transparent 65%)' }}
      />
      <div className="relative mx-auto max-w-[640px] text-center">
        <div className="mx-auto mb-10 w-full max-w-[180px]">{device}</div>
        <SpotsCounter />
        <h2 id="waitlist-h" className="mb-5 text-[clamp(44px,7.5vw,96px)] font-bold uppercase leading-[0.92] tracking-[-0.04em]">
          Be one of the first {tileLaunch.foundersBatchSize}.
        </h2>
        <p className="mx-auto max-w-[46ch] text-[17px] lowercase leading-[1.6] text-[#A3A3AB]">
          Founders get Tile at {inr(tileLaunch.foundersPrice)} instead of {inr(tileLaunch.regularPrice)}, first place in the shipping queue,
          and a say in what Tile does next. {salesOpenLine}
        </p>
      </div>

      <div className="relative mx-auto mt-14 max-w-[640px]">
        {done ? (
          <div role="status" className="rounded-[28px] border border-[#1E1E22] bg-[#141416] p-8 text-center sm:p-12">
            <span className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full" style={{ background: ORANGE }} aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0B0B0C" strokeWidth="2.6">
                <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <p className="text-[24px] font-bold uppercase leading-tight tracking-[-0.01em]">
              {status === 'duplicate' ? "You're already on the list." : "You're in."}
            </p>
            <p className="mx-auto mt-3 max-w-[40ch] text-[17px] lowercase leading-[1.6] text-[#A3A3AB]">
              We&apos;ll message you before anyone else when sales open.
            </p>
            <p className="mt-8 font-mono text-[12px] uppercase tracking-[0.12em] text-[#85858D]">Tell a friend</p>
            <ShareButtons />
          </div>
        ) : (
          <form onSubmit={handleSubmit(submit)} noValidate className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
            <div>
              <label htmlFor="wl-name" className={label}>Name</label>
              <input id="wl-name" autoComplete="name" className={input} placeholder="Your name" {...register('name')} />
              {errors.name && <p className={errorText}>{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="wl-email" className={label}>Email</label>
              <input id="wl-email" type="email" autoComplete="email" className={input} placeholder="you@example.com" {...register('email')} />
              {errors.email && <p className={errorText}>{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="wl-whatsapp" className={label}>WhatsApp number</label>
              <input id="wl-whatsapp" type="tel" inputMode="tel" autoComplete="tel" className={input} placeholder="+91 98765 43210" {...register('whatsapp')} />
              {errors.whatsapp && <p className={errorText}>{errors.whatsapp.message}</p>}
            </div>
            <div>
              <label htmlFor="wl-city" className={label}>City</label>
              <input id="wl-city" autoComplete="address-level2" className={input} placeholder="Pune" {...register('city')} />
              {errors.city && <p className={errorText}>{errors.city.message}</p>}
            </div>
            <div>
              <label htmlFor="wl-colour" className={label}>Colour</label>
              <select id="wl-colour" className={`${input} [&>option]:bg-[#141416]`} {...register('colour')}>
                {tileLaunch.colours.length > 1 && <option value="">Choose a colour</option>}
                {tileLaunch.colours.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errors.colour && <p className={errorText}>{errors.colour.message}</p>}
            </div>
            <div>
              <label htmlFor="wl-mode" className={label}>Which mode would you use most?</label>
              <select id="wl-mode" className={`${input} [&>option]:bg-[#141416]`} {...register('mode')}>
                <option value="">Choose a mode</option>
                {tileLaunch.modes.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              {errors.mode && <p className={errorText}>{errors.mode.message}</p>}
            </div>

            {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
            <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
              <label htmlFor="wl-website">Website</label>
              <input id="wl-website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
            </div>

            <div className="sm:col-span-2">
              <label className="flex cursor-pointer items-start gap-3 text-[15px] leading-[1.5] text-[#C9C9CF]">
                <input type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-[#F0641E]" {...register('consent')} />
                <span>Send me Tile launch updates by email and WhatsApp. Unsubscribe anytime.</span>
              </label>
              {errors.consent && <p className={errorText}>{errors.consent.message}</p>}
            </div>

            {status === 'error' && (
              <div role="alert" className="sm:col-span-2 rounded-2xl border border-[#5C260C] bg-[#1A0F0A] p-5">
                <p className="text-[15px] text-[#FFB08A]">{message}</p>
                <button
                  type="button"
                  onClick={() => submit(getValues())}
                  className="mt-3 font-mono text-[12px] uppercase tracking-[0.12em] text-[#EDEDEF] underline underline-offset-4 hover:text-[#F0641E]"
                >
                  Try again
                </button>
              </div>
            )}

            <div className="sm:col-span-2 flex flex-col items-center gap-4 pt-2">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="inline-flex min-h-[58px] items-center rounded-full px-11 text-[15px] font-semibold uppercase tracking-[0.1em] text-[#0B0B0C] transition-opacity disabled:opacity-60"
                style={{ background: ORANGE }}
              >
                {status === 'submitting' ? 'Joining…' : 'Join the Founders Batch'}
              </button>
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#55555C]">
                No payment now · {salesOpenLine.replace(/\.$/, '')}
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
