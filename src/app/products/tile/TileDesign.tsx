'use client'

import { useEffect, useRef, useState, type RefObject } from 'react'
import TileDevice, { CHINS, ChinSwatches, DEVICE_ASPECT, SHAPE, type Chin } from './TileDevice'
import { devicePixels } from './devicePixels'
import type { Cells } from './tileSim'
import { body, card, eyebrow, h3, mono } from './tileStyles'

// Pixel-to-product reveal: 8 × 8 → 16 × 16 → 32 × 32 → the full device, in steps (never a smooth blur).
const STAGES = [8, 16, 32] as const
const FULL: number = STAGES.length
const STEP_MS = 180 // each stage shows for at least this long, so the steps read even on a fast scroll

function useReveal(ref: RefObject<HTMLElement>) {
  // Server render and no-JS: the full device. On mount, sections still below the fold start blocky.
  const [stage, setStage] = useState<number>(FULL)
  const target = useRef<number>(FULL)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || el.getBoundingClientRect().top < window.innerHeight * 0.6) return // already in view: no animation
    setStage(0)
    target.current = 0
    let raf = 0
    let timer: ReturnType<typeof setTimeout> | undefined
    let current = 0
    const advance = () => {
      timer = undefined
      if (current < target.current) {
        current += 1
        setStage(current)
        if (current < target.current) timer = setTimeout(advance, STEP_MS)
      }
    }
    const measure = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const p = (window.innerHeight - r.top) / (window.innerHeight * 0.85) // 0 as it enters, 1 when well in view
      const t = p < 0.3 ? 0 : p < 0.5 ? 1 : p < 0.7 ? 2 : FULL
      if (t > target.current) target.current = t // forward only: once sharp, it stays sharp
      if (!timer && current < target.current) timer = setTimeout(advance, current === 0 ? 0 : STEP_MS)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure)
    }
    // Listen to scroll only while the section is near the viewport.
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()
      } else window.removeEventListener('scroll', onScroll)
    })
    io.observe(el)
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
      clearTimeout(timer)
    }
  }, [ref])
  return stage
}

function PixelCanvas({ n, chin, cells }: { n: number; chin: Chin; cells: Cells }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const ctx = ref.current?.getContext('2d')
    if (!ctx) return
    const img = ctx.createImageData(n, n)
    img.data.set(devicePixels(n, CHINS[chin].color, cells))
    ctx.putImageData(img, 0, 0)
  }, [n, chin, cells])
  return (
    <canvas
      ref={ref}
      width={n}
      height={n}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      style={{ imageRendering: 'pixelated' }}
    />
  )
}

// Original 8 × 8 icons, drawn in code. Letters pick a colour; '.' is an unlit pixel.
const ICONS: Record<string, string[]> = {
  clock: ['..####..', '.#....#.', '#..a...#', '#..a...#', '#..aaa.#', '#......#', '.#....#.', '..####..'],
  object: ['.oooooo.', '.o....o.', '.o....o.', '.o....o.', '.oooooo.', '.cccccc.', '.cccccc.', '........'],
  // Focus hourglass: the firmware's FOCUS_IDLE_ICON, row by row (leftmost bit = column 0)
  hourglass: ['........', '.######.', '..#..#..', '...##...', '...##...', '..#..#..', '.######.', '........'],
}

function PixelIcon({ rows, colors, label }: { rows: string[]; colors: Record<string, string>; label: string }) {
  return (
    <div role="img" aria-label={label} className="grid w-[88px] grid-cols-8 gap-[2px] rounded-[10px] bg-[#0F0F11] p-[6px]">
      {rows.join('').split('').map((ch, i) => (
        <span
          key={i}
          className="aspect-square rounded-[2px]"
          style={ch === '.' ? { background: '#1C1D22' } : { background: colors[ch], boxShadow: `0 0 6px ${colors[ch]}66` }}
        />
      ))}
    </div>
  )
}

const LINES = ['Retro on the outside.', 'Modern where it matters.']

export default function TileDesign({ chin, onChin, cells }: { chin: Chin; onChin: (c: Chin) => void; cells: Cells }) {
  const sectionRef = useRef<HTMLElement>(null)
  const stage = useReveal(sectionRef)
  const sharp = stage >= FULL

  const pillars = [
    {
      title: 'Retro presentation',
      text: '64 soft pixels and chunky digits. The charm of early digital displays, made for today.',
      icon: <PixelIcon rows={ICONS.clock} colors={{ '#': '#EF9F27', a: '#5DCAA5' }} label="Pixel clock face" />,
    },
    {
      title: 'Minimal object',
      text: 'A two-tone matte body, a frosted screen and one touch surface. No buttons, nothing extra.',
      icon: <PixelIcon rows={ICONS.object} colors={{ o: SHAPE.orangeColor, c: CHINS[chin].color }} label="Two-tone rectangle" />,
      extra: (
        <div className="mt-5 -ml-2">
          <ChinSwatches value={chin} onChange={onChin} />
        </div>
      ),
    },
    {
      title: 'Calm productivity',
      text: 'A focus timer, quiet reminders and a night mode you set yourself. Help without the noise.',
      icon: <PixelIcon rows={ICONS.hourglass} colors={{ '#': '#FF9A1F' }} label="Focus hourglass" />,
    },
  ]

  return (
    <section ref={sectionRef} id="design" aria-labelledby="design-h" className="scroll-mt-[132px] border-t border-[#1E1E22] px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-[1240px]">
        <p className={eyebrow}>/ 01 Design</p>

        {/* Reveal: the device box has a fixed aspect ratio, so nothing moves as the stages change */}
        <div className="flex flex-col items-center gap-12 md:flex-row md:gap-16">
          <div className="w-full max-w-[360px] flex-none md:w-[360px]">
            <div className="relative w-full" style={{ aspectRatio: String(DEVICE_ASPECT) }}>
              <div style={{ visibility: sharp ? 'visible' : 'hidden' }}>
                <TileDevice cells={cells} chin={chin} glow={12} />
              </div>
              {!sharp && <PixelCanvas n={STAGES[stage]} chin={chin} cells={cells} />}
            </div>
          </div>
          <h2 id="design-h" className="m-0 flex flex-col gap-3 text-center text-[clamp(34px,5vw,64px)] font-bold uppercase leading-[0.98] tracking-[-0.03em] md:text-left">
            {LINES.map((line, i) => {
              const shown = stage >= FULL - 1 + i
              return (
                <span
                  key={line}
                  className="block motion-safe:transition-[opacity,transform] motion-safe:duration-500"
                  style={{ opacity: shown ? 1 : 0, transform: shown ? 'none' : 'translateY(12px)', color: i === 0 ? '#EDEDEF' : '#F0641E' }}
                >
                  {line}
                </span>
              )
            })}
          </h2>
        </div>

        {/* Three pillars */}
        <div className="mt-20 grid gap-4 md:grid-cols-3">
          {pillars.map((p) => (
            <article key={p.title} className={card}>
              {p.icon}
              <h3 className={`mb-3 mt-7 !text-[24px] ${h3}`}>{p.title}</h3>
              <p className={`m-0 max-w-[36ch] ${body}`}>{p.text}</p>
              {p.extra}
            </article>
          ))}
        </div>

        {/* Stat strip */}
        <dl className="mt-16 grid grid-cols-3 border-y border-[#1E1E22]">
          {[
            ['0', 'notifications'],
            ['0', 'accounts'],
            ['64', 'pixels'],
          ].map(([n, label], i) => (
            <div key={label} className={`flex flex-col-reverse items-center gap-2 px-2 py-8 text-center sm:py-10 ${i > 0 ? 'border-l border-[#1E1E22]' : ''}`}>
              <dt className={mono}>{label}</dt>
              <dd className="m-0 font-mono text-[clamp(40px,7vw,88px)] font-medium leading-none tracking-[-0.04em] text-[#EDEDEF]">{n}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
