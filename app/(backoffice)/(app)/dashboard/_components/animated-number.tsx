"use client"

import { useEffect, useRef } from "react"
import { animate, useReducedMotion } from "framer-motion"
import { formatNumber, type NumberFormat } from "@/lib/number-format"

const COUNT_DURATION = 1.4
const COUNT_EASE = [0.22, 1, 0.36, 1] as const

type AnimatedNumberProps = {
  value: number
  format?: NumberFormat
  delay?: number
  className?: string
}

export function AnimatedNumber({ value, format = "integer", delay = 0, className }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const previousValue = useRef(0)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const from = previousValue.current
    const isFirstCount = from === 0
    previousValue.current = value

    if (shouldReduceMotion) {
      element.textContent = formatNumber(value, format)
      return
    }

    const controls = animate(from, value, {
      duration: COUNT_DURATION,
      delay: isFirstCount ? delay : 0,
      ease: COUNT_EASE,
      onUpdate: (current) => {
        element.textContent = formatNumber(current, format)
      },
    })
    return () => controls.stop()
  }, [value, format, delay, shouldReduceMotion])

  return (
    <span ref={ref} className={className} aria-label={formatNumber(value, format)}>
      {formatNumber(0, format)}
    </span>
  )
}
