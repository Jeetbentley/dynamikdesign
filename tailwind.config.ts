import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          white: '#FFFFFF',
          light: '#F5F5F5',
          dark: '#1A1A1A',
        },
        text: {
          primary: '#1A1A1A',
          body: '#4A4A4A',
          muted: '#8A8A8A',
        },
        red: {
          DEFAULT: '#E63328',
          hover: '#C02020',
        },
        border: {
          DEFAULT: '#E8E8E8',
        },
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        display: ['72px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        h1: ['56px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        h2: ['40px', { lineHeight: '1.25', letterSpacing: '0', fontWeight: '700' }],
        h3: ['24px', { lineHeight: '1.35', letterSpacing: '0', fontWeight: '600' }],
        eyebrow: ['12px', { lineHeight: '1', letterSpacing: '0.15em', fontWeight: '500' }],
        body: ['17px', { lineHeight: '1.7', letterSpacing: '0', fontWeight: '400' }],
        'body-sm': ['15px', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],
        caption: ['13px', { lineHeight: '1.4', letterSpacing: '0.05em', fontWeight: '500' }],
      },
      maxWidth: {
        container: '1280px',
        text: '760px',
      },
      spacing: {
        section: '100px',
        'section-m': '60px',
      },
      transitionTimingFunction: {
        'studio': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}

export default config
