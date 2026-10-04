'use client'

import { useEffect, useState } from 'react'

interface Props {
  text: string
  label?: string // accessible name, e.g. "Copy email address"
  tone?: 'light' | 'dark'
  compact?: boolean // icon only, for tight spaces like the footer
}

async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Fallback for browsers or contexts without the async clipboard API
    const el = document.createElement('textarea')
    el.value = text
    el.setAttribute('readonly', '')
    el.style.position = 'fixed'
    el.style.opacity = '0'
    document.body.appendChild(el)
    el.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(el)
    return ok
  }
}

export default function CopyButton({ text, label = 'Copy', tone = 'light', compact = false }: Props) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(t)
  }, [copied])

  const colors =
    tone === 'dark'
      ? 'border-white/15 text-white/60 hover:text-white hover:border-red'
      : 'border-border text-text-muted hover:text-red hover:border-red'

  return (
    <button
      type="button"
      onClick={async () => setCopied(await copy(text))}
      aria-label={copied ? 'Copied' : label}
      title={copied ? 'Copied' : label}
      className={`inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border ${compact ? 'h-7 w-7' : 'px-2.5 py-1'} text-[11px] font-medium uppercase tracking-[0.08em] transition-colors ${colors} ${
        copied ? '!text-red !border-red' : ''
      }`}
    >
      {copied ? (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect x="9" y="9" width="12" height="12" rx="2" />
          <path d="M5 15V5a2 2 0 012-2h10" strokeLinecap="round" />
        </svg>
      )}
      <span aria-live="polite" className={compact ? 'sr-only' : ''}>
        {copied ? 'Copied' : 'Copy'}
      </span>
    </button>
  )
}
