'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const SERIAL = /^DDLTL-\d{4}-[A-Z]-\d{4}$/

// Works without JavaScript (a plain GET to /w?serial=…, which redirects); with JavaScript it validates first.
export default function SerialForm() {
  const router = useRouter()
  const [error, setError] = useState('')
  return (
    <form
      action="/w"
      method="get"
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        const value = String(new FormData(e.currentTarget).get('serial') ?? '').trim().toUpperCase()
        if (!SERIAL.test(value)) return setError('That doesn’t look right. It should be like DDLTL-2610-B-0001.')
        setError('')
        router.push(`/w/${value}`)
      }}
      className="mt-6"
    >
      <label htmlFor="serial" className="mb-2 block font-mono text-[12px] uppercase tracking-[0.12em] text-[#85858D]">
        Serial number
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="serial"
          name="serial"
          autoCapitalize="characters"
          autoComplete="off"
          spellCheck={false}
          placeholder="DDLTL-2610-B-0001"
          aria-invalid={!!error}
          aria-describedby={error ? 'serial-error' : undefined}
          className="min-h-[52px] w-full rounded-full border border-[#34343A] bg-[#0B0B0C] px-5 font-mono text-[16px] uppercase tracking-[0.06em] text-[#EDEDEF] placeholder:text-[#55555C] focus:border-[#FF6B1A] focus:outline-none sm:max-w-[320px]"
        />
        <button
          type="submit"
          className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#FF6B1A] px-8 text-[14px] font-semibold uppercase tracking-[0.1em] text-[#0B0B0C]"
        >
          Check warranty
        </button>
      </div>
      {error && (
        <p id="serial-error" role="alert" className="mt-3 text-[15px] text-[#FF8A4C]">
          {error}
        </p>
      )}
    </form>
  )
}
