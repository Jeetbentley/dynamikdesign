'use client'

import { motion, useInView, type HTMLMotionProps } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

interface Props extends HTMLMotionProps<'div'> {
  children: ReactNode
  delay?: number
  y?: number
  duration?: number
  className?: string
}

export default function FadeIn({
  children,
  delay = 0,
  y = 28,
  duration = 0.55,
  className,
  ...rest
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
