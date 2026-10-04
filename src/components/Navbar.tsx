'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import Logo from './Logo'

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

const MENUS: Menu[] = [
  {
    label: 'Services',
    href: '/services',
    items: [
      { label: 'All Services', href: '/services', description: 'Overview of what we do' },
      { label: 'FDM 3D Printing', href: '/services/fdm-printing', description: 'Large-format functional parts' },
      { label: 'SLA 3D Printing', href: '/services/sla-printing', description: 'High-detail resin prints' },
      { label: 'Product Design', href: '/services/product-design', description: 'Industrial design, CAD & DFM' },
      { label: 'Embedded & IoT', href: '/services/embedded', description: 'PCBs, firmware, sensors' },
    ],
  },
  {
    label: 'Products',
    href: '/products',
    items: [
      { label: 'Tile', href: '/products/tile', description: '64-pixel desk clock, lamp & canvas' },
    ],
  },
]

const NAV_HEIGHT = 68
// Pages that get the dark navbar that hides on scroll-down and returns on scroll-up.
const DARK_ROUTES = ['/products/tile']

function Dropdown({ menu, active, dark }: { menu: Menu; active: boolean; dark: boolean }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => setOpen(false), [pathname])

  const triggerColor = dark
    ? active ? 'text-[#F0641E]' : 'text-[#EDEDEF] hover:text-[#F0641E]'
    : active ? 'text-red' : 'text-text-primary hover:text-red'

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 font-medium py-2 transition-colors ${triggerColor} ${
          dark ? 'text-[13px] uppercase tracking-[0.14em]' : 'text-[15px]'
        }`}
      >
        {menu.label}
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
          {MENUS.map((menu) => (
            <Dropdown
              key={menu.label}
              menu={menu}
              dark={dark}
              active={pathname.startsWith(menu.href)}
            />
          ))}
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
              {MENUS.map((menu) => (
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
