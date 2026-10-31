"use client"

import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

const GRADIENT_FIRST =
  "radial-gradient(68.54% 68.72% at 55.02% 31.46%, color-mix(in oklab, var(--color-tia-violet-300) 26%, transparent) 0, color-mix(in oklab, var(--color-tia-violet-500) 8%, transparent) 50%, transparent 80%)"
const GRADIENT_SECOND =
  "radial-gradient(50% 50% at 50% 50%, color-mix(in oklab, var(--color-tia-orchid) 20%, transparent) 0, color-mix(in oklab, var(--color-tia-orchid) 6%, transparent) 80%, transparent 100%)"
const GRADIENT_THIRD =
  "radial-gradient(50% 50% at 50% 50%, color-mix(in oklab, var(--color-tia-sunset) 14%, transparent) 0, color-mix(in oklab, var(--color-tia-sunset) 4%, transparent) 80%, transparent 100%)"

const FADE_IN = { duration: 1.5 }

type Side = "left" | "right"

const BEAMS: Record<Side, { rotate: number; origin: string; anchor: string; offsets: [string, string] }> = {
  left: { rotate: -45, origin: "origin-top-left", anchor: "left-0", offsets: ["5%, -50%", "-180%, -70%"] },
  right: { rotate: 45, origin: "origin-top-right", anchor: "right-0", offsets: ["-5%, -50%", "180%, -70%"] },
}

type SpotlightProps = {
  translateY?: number
  width?: number
  height?: number
  smallWidth?: number
  duration?: number
  xOffset?: number
  className?: string
}

/**
 * Aceternity UI spotlight: two pairs of soft beams sweeping from the top
 * corners, tinted with the Tia violet, orchid and sunset.
 */
export function Spotlight({
  translateY = -350,
  width = 560,
  height = 1380,
  smallWidth = 240,
  duration = 7,
  xOffset = 100,
  className,
}: SpotlightProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={FADE_IN}
      className={cn("pointer-events-none absolute inset-0 size-full", className)}
    >
      {(Object.keys(BEAMS) as Side[]).map((side) => {
        const beam = BEAMS[side]
        const sway = side === "left" ? xOffset : -xOffset
        return (
          <motion.div
            key={side}
            animate={shouldReduceMotion ? undefined : { x: [0, sway, 0] }}
            transition={{ duration, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className={cn("pointer-events-none absolute top-0 h-screen w-screen", beam.anchor)}
          >
            <div
              style={{
                transform: `translateY(${translateY}px) rotate(${beam.rotate}deg)`,
                background: GRADIENT_FIRST,
                width,
                height,
              }}
              className={cn("absolute top-0", beam.anchor)}
            />
            <div
              style={{
                transform: `rotate(${beam.rotate}deg) translate(${beam.offsets[0]})`,
                background: GRADIENT_SECOND,
                width: smallWidth,
                height,
              }}
              className={cn("absolute top-0", beam.anchor, beam.origin)}
            />
            <div
              style={{
                transform: `rotate(${beam.rotate}deg) translate(${beam.offsets[1]})`,
                background: GRADIENT_THIRD,
                width: smallWidth,
                height,
              }}
              className={cn("absolute top-0", beam.anchor, beam.origin)}
            />
          </motion.div>
        )
      })}
    </motion.div>
  )
}
