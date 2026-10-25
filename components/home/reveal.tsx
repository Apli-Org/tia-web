'use client'

import { domAnimation, LazyMotion, m, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { SPRING_TRANSITION } from './motion'

const FADE_DURATION = 0.4
const VIEWPORT = { once: true, amount: 0.12 } as const

const ELEMENTS = {
  article: m.article,
  div: m.div,
  li: m.li,
}

type RevealProps = {
  as?: keyof typeof ELEMENTS
  delay?: number
  offsetY?: number
  initialScale?: number
  className?: string
  children: ReactNode
}

export function Reveal({
  as = 'div',
  delay = 0,
  offsetY = 28,
  initialScale = 1,
  className,
  children,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion()
  const Element = ELEMENTS[as]
  const transition = shouldReduceMotion
    ? { duration: FADE_DURATION, delay, y: { duration: 0 }, scale: { duration: 0 } }
    : { ...SPRING_TRANSITION, delay }

  return (
    <LazyMotion features={domAnimation}>
      <Element
        className={className}
        initial={{ opacity: 0, y: offsetY, scale: initialScale }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={VIEWPORT}
        transition={transition}
      >
        {children}
      </Element>
    </LazyMotion>
  )
}
