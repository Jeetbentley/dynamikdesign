import Link from 'next/link'
import Logo from './Logo'

const EXPLORE = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Process', href: '/process' },
  { label: 'Materials', href: '/materials' },
]

const SERVICES = [
  { label: 'FDM Printing', href: '/services/fdm-printing' },
  { label: 'SLA Printing', href: '/services/sla-printing' },
  { label: 'Product Design', href: '/services/product-design' },
  { label: 'Embedded & IoT', href: '/services/embedded' },
]

function SocialIcon({ children, label, href }: { children: React.ReactNode; label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-red hover:bg-red transition-colors"
    >
      {children}
    </a>
  )
}

export default function Footer() {
  return (
    <footer className="bg-bg-dark text-white">
      <div className="container-x pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div>
            <h4 className="text-[11px] font-medium tracking-[0.18em] uppercase text-white/45 mb-5">
              Explore
            </h4>
            <ul className="space-y-3">
              {EXPLORE.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[15px] text-white/85 hover:text-red transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-medium tracking-[0.18em] uppercase text-white/45 mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {SERVICES.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[15px] text-white/85 hover:text-red transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-medium tracking-[0.18em] uppercase text-white/45 mb-5">
              Address
            </h4>
            <p className="text-[15px] text-white/85 leading-relaxed">
              Dynamik Design Lab
              <br />
              Pune, Maharashtra
              <br />
              India
            </p>
          </div>

          <div>
            <h4 className="text-[11px] font-medium tracking-[0.18em] uppercase text-white/45 mb-5">
              Contact
            </h4>
            <ul className="space-y-3 mb-6">
              <li>
                <a
                  href="mailto:hello@dynamikdesignlab.com"
                  className="text-[15px] text-white/85 hover:text-red transition-colors"
                >
                  hello@dynamikdesignlab.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+910000000000"
                  className="text-[15px] text-white/85 hover:text-red transition-colors"
                >
                  +91 00000 00000
                </a>
              </li>
            </ul>
            <div className="flex gap-3">
              <SocialIcon label="LinkedIn" href="https://linkedin.com">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                </svg>
              </SocialIcon>
              <SocialIcon label="Instagram" href="https://instagram.com">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </SocialIcon>
              <SocialIcon label="WhatsApp" href="https://wa.me/910000000000">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9s-.5-.1-.7.2-.8.9-1 1.1-.4.2-.6.1c-.9-.4-1.7-.9-2.4-1.6-.6-.6-1.1-1.3-1.5-2.1-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.2-.4.1-.2 0-.3 0-.5s-.7-1.6-.9-2.2-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.9.9-1.4 2.2-1.3 3.5.2 1.5.7 2.9 1.6 4.1 1.7 2.3 4 4.1 6.6 5 .7.3 1.2.4 1.6.5.7.2 1.3.2 1.8.1.6-.1 1.7-.7 2-1.4.2-.4.2-.9.1-1.4-.1-.2-.3-.3-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.7.5 3.4 1.3 4.9L2 22l5.3-1.4c1.4.8 3 1.1 4.6 1.2 5.5 0 10-4.5 10-10 0-2.7-1-5.2-2.9-7.1S14.7 2 12 2zm0 18.2c-1.4 0-2.9-.4-4.1-1.1l-.3-.2-3.1.8.8-3-.2-.3c-2.4-3.9-1.1-9.1 2.9-11.5s9.1-1.1 11.5 2.9 1.1 9.1-2.9 11.5c-1.3.8-2.8 1.2-4.3 1.2z" />
                </svg>
              </SocialIcon>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Logo light />
          </div>
          <div className="flex items-center gap-6 text-[13px] text-white/55">
            <span>© Dynamik Design Lab 2025</span>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
