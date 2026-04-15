'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import Logo from './Logo'

const NAV = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Materials', href: '/materials' },
  { label: 'Process', href: '/process' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
]

const SERVICE_DROPDOWN = [
  { label: 'FDM 3D Printing', href: '/services/fdm-printing' },
  { label: 'SLA 3D Printing', href: '/services/sla-printing' },
  { label: 'Product Design', href: '/services/product-design' },
  { label: 'Embedded & IoT', href: '/services/embedded' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
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

        <nav className="hidden lg:flex items-center gap-8">
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link
              href="/services"
              className="text-[14px] font-medium text-text-primary hover:text-red transition-colors py-2"
            >
              Services
            </Link>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                >
                  <div className="bg-white border border-border rounded-md shadow-sm py-2 min-w-[220px]">
                    {SERVICE_DROPDOWN.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="block px-4 py-2 text-[14px] text-text-body hover:text-red hover:bg-bg-light transition-colors"
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {NAV.filter((n) => n.label !== 'Services').map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[14px] font-medium transition-colors ${
                pathname === item.href
                  ? 'text-red'
                  : 'text-text-primary hover:text-red'
              }`}
            >
              {item.label}
            </Link>
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
            className="fixed inset-0 z-50 bg-white lg:hidden"
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
            <nav className="container-x flex flex-col py-10 gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[32px] font-semibold text-text-primary py-3 border-b border-border hover:text-red transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/contact" className="btn-red mt-8 self-start">
                Get in Touch
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
