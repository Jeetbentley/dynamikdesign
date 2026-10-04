'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
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

function Dropdown({ menu, active }: { menu: Menu; active: boolean }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => setOpen(false), [pathname])

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
        className={`flex items-center gap-1.5 text-[15px] font-medium py-2 transition-colors ${
          active ? 'text-red' : 'text-text-primary hover:text-red'
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
            <div className="bg-white border border-border rounded-md shadow-sm py-2 min-w-[280px]">
              {menu.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group block px-5 py-3 hover:bg-bg-light transition-colors"
                >
                  <span className="block text-[14px] font-semibold text-text-primary group-hover:text-red transition-colors">
                    {item.label}
                  </span>
                  {item.description && (
                    <span className="block text-[13px] text-text-muted mt-0.5">
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
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow ${
        scrolled ? 'border-b border-border' : ''
      }`}
    >
      <div className="container-x flex items-center justify-between h-[68px]">
        <Logo />

        <nav aria-label="Main" className="hidden lg:flex items-center gap-10">
          {MENUS.map((menu) => (
            <Dropdown
              key={menu.label}
              menu={menu}
              active={pathname.startsWith(menu.href)}
            />
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link href="/contact" className="btn-red">
            Get in Touch
          </Link>
        </div>

        <button
          aria-label="Open menu"
          className="lg:hidden flex flex-col gap-[5px] p-2 -mr-2"
          onClick={() => setOpen(true)}
        >
          <span className="block w-6 h-[2px] bg-text-primary" />
          <span className="block w-6 h-[2px] bg-text-primary" />
          <span className="block w-6 h-[2px] bg-text-primary" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-white lg:hidden overflow-y-auto"
          >
            <div className="container-x flex items-center justify-between h-[68px] border-b border-border">
              <Logo />
              <button
                aria-label="Close menu"
                className="p-2 -mr-2 text-text-primary"
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
                  <div className="eyebrow text-text-muted mb-4">{menu.label}</div>
                  {menu.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block text-[26px] font-semibold text-text-primary py-3 border-b border-border hover:text-red transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}
              <Link href="/contact" className="btn-red">
                Get in Touch
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
