'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import Logo from './Logo'
import { PRODUCTS_MENU, SERVICES_MENU } from '@/data/navigation'

interface MenuItem {
  label: string
  href: string
  description?: string
}

interface Menu {
  label: string
  href: string
  items: MenuItem[]
}

const NAV_HEIGHT = 68
// Pages that get the dark navbar that hides on scroll-down and returns on scroll-up.
const DARK_ROUTES = ['/products/tile']

const triggerClass = (dark: boolean, active: boolean) =>
  `flex items-center gap-1.5 font-medium py-2 transition-colors ${
    dark
      ? `text-[13px] uppercase tracking-[0.14em] ${active ? 'text-[#F0641E]' : 'text-[#EDEDEF] hover:text-[#F0641E]'}`
      : `text-[15px] ${active ? 'text-red' : 'text-text-primary hover:text-red'}`
  }`

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      aria-hidden="true"
      className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    >
      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Dropdown({ menu, active, dark }: { menu: Menu; active: boolean; dark: boolean }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => setOpen(false), [pathname])

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
        className={triggerClass(dark, active)}
      >
        {menu.label}
        <Chevron open={open} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
          >
            <div
              className={`rounded-md py-2 min-w-[280px] border ${
                dark ? 'bg-[#141416] border-[#26262B] shadow-2xl' : 'bg-white border-border shadow-sm'
              }`}
            >
              {menu.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group block px-5 py-3 transition-colors ${
                    dark ? 'hover:bg-white/[0.04]' : 'hover:bg-bg-light'
                  }`}
                >
                  <span
                    className={`block text-[14px] font-semibold transition-colors ${
                      dark
                        ? 'text-[#EDEDEF] group-hover:text-[#F0641E] uppercase tracking-[0.08em]'
                        : 'text-text-primary group-hover:text-red'
                    }`}
                  >
                    {item.label}
                  </span>
                  {item.description && (
                    <span
                      className={`block text-[13px] mt-0.5 ${
                        dark ? 'text-[#85858D] lowercase' : 'text-text-muted'
                      }`}
                    >
                      {item.description}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function MegaMenu({ active, dark }: { active: boolean; dark: boolean }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const wrapRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const m = SERVICES_MENU

  useEffect(() => setOpen(false), [pathname])

  const c = dark
    ? {
        panel: 'bg-[#0B0B0C] border-[#1E1E22] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]',
        divider: 'border-[#1E1E22]',
        banner: 'text-[#EDEDEF] uppercase tracking-[0.04em]',
        bannerLink: 'text-[#F0641E] hover:text-[#EDEDEF]',
        heading: 'text-[#85858D] hover:text-[#F0641E]',
        link: 'text-[#C9C9CF] hover:text-[#F0641E]',
        card: 'bg-[#141416] border border-[#1E1E22]',
        cta: 'inline-flex items-center gap-2 rounded border border-white/25 px-[18px] py-2.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-white hover:text-[#0B0B0C]',
      }
    : {
        panel: 'bg-white border-border shadow-[0_30px_60px_-30px_rgba(26,26,26,0.25)]',
        divider: 'border-border',
        banner: 'text-text-primary',
        bannerLink: 'text-red hover:text-red-hover',
        heading: 'text-text-muted hover:text-red',
        link: 'text-text-body hover:text-red',
        card: 'bg-bg-light',
        cta: 'btn-red',
      }

  const close = () => setOpen(false)

  return (
    <div
      ref={wrapRef}
      className="flex h-[68px] items-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={close}
      onKeyDown={(e) => {
        if (e.key === 'Escape' && open) {
          close()
          buttonRef.current?.focus()
        }
      }}
      onBlur={(e) => {
        if (!wrapRef.current?.contains(e.relatedTarget as Node | null)) close()
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="services-mega-menu"
        onClick={() => setOpen((o) => !o)}
        className={triggerClass(dark, active)}
      >
        {m.label}
        <Chevron open={open} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id="services-mega-menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className={`absolute left-0 right-0 top-full border-y ${c.panel}`}
          >
            <div className="container-x py-8">
              <div className={`flex items-center justify-between gap-6 border-b pb-6 ${c.divider}`}>
                <p className={`text-[18px] font-semibold ${c.banner}`}>{m.banner.text}</p>
                <Link
                  href={m.banner.link.href}
                  onClick={close}
                  className={`inline-flex items-center gap-2 text-[14px] font-semibold transition-colors ${c.bannerLink}`}
                >
                  {m.banner.link.label} <span aria-hidden="true">→</span>
                </Link>
              </div>
              <div className="mt-7 grid grid-cols-[repeat(4,minmax(0,1fr))_1.15fr] gap-8">
                {m.columns.map((col) => (
                  <div key={col.title}>
                    {col.href ? (
                      <Link href={col.href} onClick={close} className={`eyebrow transition-colors ${c.heading}`}>
                        {col.title}
                      </Link>
                    ) : (
                      <span className={`eyebrow ${c.heading}`}>{col.title}</span>
                    )}
                    <ul className="mt-4 space-y-2.5">
                      {col.links.map((l) => (
                        <li key={l.href}>
                          <Link href={l.href} onClick={close} className={`text-[14px] leading-snug transition-colors ${c.link}`}>
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className={`rounded-md p-6 ${c.card}`}>
                  <span className={`eyebrow ${c.heading}`}>{m.engage.title}</span>
                  <ul className="mt-4 space-y-2.5">
                    {m.engage.links.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} onClick={close} className={`text-[14px] transition-colors ${c.link}`}>
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link href={m.engage.cta.href} onClick={close} className={`mt-6 ${c.cta}`}>
                    {m.engage.cta.label} <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function MobileServices({ dark }: { dark: boolean }) {
  const [open, setOpen] = useState(false)
  const [section, setSection] = useState<string | null>(null)
  const m = SERVICES_MENU
  const sections = [
    ...m.columns.map((col) => ({ title: col.title, links: col.href ? [{ label: `All ${col.title}`, href: col.href }, ...col.links] : col.links })),
    { title: m.engage.title, links: [...m.engage.links, m.engage.cta] },
  ]
  const border = dark ? 'border-[#1E1E22]' : 'border-border'
  const top = dark
    ? 'text-[22px] uppercase tracking-[0.04em] text-[#EDEDEF]'
    : 'text-[26px] text-text-primary'
  const sub = dark ? 'text-[15px] uppercase tracking-[0.08em] text-[#EDEDEF]' : 'text-[18px] text-text-primary'
  const link = dark ? 'text-[#A3A3AB] hover:text-[#F0641E]' : 'text-text-body hover:text-red'

  return (
    <div className="mb-10">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-services"
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center justify-between border-b py-3 text-left font-semibold ${border} ${top}`}
      >
        {m.label}
        <Chevron open={open} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="mobile-services"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className={`border-b py-4 ${border}`}>
              <p className={`text-[13px] ${dark ? 'text-[#85858D]' : 'text-text-muted'}`}>{m.banner.text}</p>
              <Link
                href={m.banner.link.href}
                className={`mt-1 inline-flex items-center gap-2 text-[15px] font-semibold ${dark ? 'text-[#F0641E]' : 'text-red'}`}
              >
                {m.banner.link.label} <span aria-hidden="true">→</span>
              </Link>
            </div>
            {sections.map((sec) => {
              const isOpen = section === sec.title
              const id = `mobile-services-${sec.title.toLowerCase()}`
              return (
                <div key={sec.title} className={`border-b ${border}`}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={id}
                    onClick={() => setSection(isOpen ? null : sec.title)}
                    className={`flex w-full items-center justify-between py-3.5 pl-4 text-left font-medium ${sub}`}
                  >
                    {sec.title}
                    <Chevron open={isOpen} />
                  </button>
                  {isOpen && (
                    <ul id={id} className="space-y-3 pb-4 pl-8">
                      {sec.links.map((l) => (
                        <li key={l.href}>
                          <Link href={l.href} className={`text-[15px] transition-colors ${link}`}>
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const lastY = useRef(0)
  const pathname = usePathname()
  const dark = DARK_ROUTES.some((r) => pathname.startsWith(r))

  useEffect(() => {
    lastY.current = window.scrollY
    setHidden(false)
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 8)
      if (dark) {
        const delta = y - lastY.current
        if (y <= NAV_HEIGHT) setHidden(false)
        else if (delta > 4) setHidden(true)
        else if (delta < -4) setHidden(false)
      }
      lastY.current = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [dark])

  // Lets sticky bars below the navbar (e.g. the Tile bar) follow it up and down.
  useEffect(() => {
    const offset = dark && hidden && !open ? 0 : NAV_HEIGHT
    document.documentElement.style.setProperty('--site-nav-offset', `${offset}px`)
  }, [dark, hidden, open])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const isHidden = dark && hidden && !open

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[transform,background-color,border-color] duration-300 ease-studio border-b ${
        dark
          ? 'bg-[#0B0B0C] border-[#1E1E22]'
          : `bg-white ${scrolled ? 'border-border' : 'border-transparent'}`
      } ${isHidden ? '-translate-y-full' : ''}`}
    >
      <div className="container-x flex items-center justify-between h-[68px]">
        <Logo light={dark} />

        <nav aria-label="Main" className="hidden lg:flex items-center gap-10">
          <MegaMenu
            dark={dark}
            active={['/services', '/industries', '/approach'].some((r) => pathname.startsWith(r))}
          />
          <Dropdown menu={PRODUCTS_MENU} dark={dark} active={pathname.startsWith(PRODUCTS_MENU.href)} />
        </nav>

        <div className="hidden lg:block">
          {dark ? (
            <Link
              href="/contact"
              className="inline-flex items-center rounded border border-white/25 px-[22px] py-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-white hover:text-[#0B0B0C]"
            >
              Get in Touch
            </Link>
          ) : (
            <Link href="/contact" className="btn-red">
              Get in Touch
            </Link>
          )}
        </div>

        <button
          aria-label="Open menu"
          className="lg:hidden flex flex-col gap-[5px] p-2 -mr-2"
          onClick={() => setOpen(true)}
        >
          {[0, 1, 2].map((i) => (
            <span key={i} className={`block w-6 h-[2px] ${dark ? 'bg-white' : 'bg-text-primary'}`} />
          ))}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={`fixed inset-0 z-50 lg:hidden overflow-y-auto ${dark ? 'bg-[#0B0B0C]' : 'bg-white'}`}
          >
            <div
              className={`container-x flex items-center justify-between h-[68px] border-b ${
                dark ? 'border-[#1E1E22]' : 'border-border'
              }`}
            >
              <Logo light={dark} />
              <button
                aria-label="Close menu"
                className={`p-2 -mr-2 ${dark ? 'text-white' : 'text-text-primary'}`}
                onClick={() => setOpen(false)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 5L19 19M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <nav aria-label="Main" className="container-x py-10">
              <MobileServices dark={dark} />
              {[PRODUCTS_MENU].map((menu) => (
                <div key={menu.label} className="mb-10">
                  <div className={`eyebrow mb-4 ${dark ? 'text-[#85858D]' : 'text-text-muted'}`}>{menu.label}</div>
                  {menu.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block py-3 border-b font-semibold transition-colors ${
                        dark
                          ? 'text-[22px] uppercase tracking-[0.04em] text-[#EDEDEF] border-[#1E1E22] hover:text-[#F0641E]'
                          : 'text-[26px] text-text-primary border-border hover:text-red'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}
              {dark ? (
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded border border-white/25 px-[22px] py-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-white"
                >
                  Get in Touch
                </Link>
              ) : (
                <Link href="/contact" className="btn-red">
                  Get in Touch
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
