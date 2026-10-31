"use client"

import { memo, useCallback, useEffect, useRef } from "react"
import { animate } from "framer-motion"
import { cn } from "@/lib/utils"

const GLOW_GRADIENT = `radial-gradient(circle, var(--color-tia-violet-500) 10%, transparent 20%),
  radial-gradient(circle at 40% 40%, var(--color-tia-sunset) 5%, transparent 15%),
  radial-gradient(circle at 60% 60%, var(--color-tia-orchid) 10%, transparent 20%),
  radial-gradient(circle at 40% 60%, var(--color-tia-violet-300) 10%, transparent 20%),
  repeating-conic-gradient(
    from 236.84deg at 50% 50%,
    var(--color-tia-violet-500) 0%,
    var(--color-tia-sunset) calc(25% / 5),
    var(--color-tia-orchid) calc(50% / 5),
    var(--color-tia-violet-300) calc(75% / 5),
    var(--color-tia-violet-500) calc(100% / 5)
  )`

const GLOW_EASE = [0.16, 1, 0.3, 1] as const

type GlowingEffectProps = {
  blur?: number
  inactiveZone?: number
  proximity?: number
  spread?: number
  className?: string
  disabled?: boolean
  movementDuration?: number
  borderWidth?: number
}

/**
 * Aceternity UI glowing border: a conic gradient that follows the pointer
 * around the edge of the closest positioned parent.
 */
export const GlowingEffect = memo(function GlowingEffect({
  blur = 0,
  inactiveZone = 0.7,
  proximity = 0,
  spread = 20,
  className,
  movementDuration = 2,
  borderWidth = 1,
  disabled = false,
}: GlowingEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lastPosition = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef(0)

  const handleMove = useCallback(
    (event?: { x: number; y: number }) => {
      cancelAnimationFrame(animationFrameRef.current)

      animationFrameRef.current = requestAnimationFrame(() => {
        const element = containerRef.current
        if (!element) return

        const { left, top, width, height } = element.getBoundingClientRect()
        const mouseX = event?.x ?? lastPosition.current.x
        const mouseY = event?.y ?? lastPosition.current.y
        if (event) lastPosition.current = { x: mouseX, y: mouseY }

        const centerX = left + width * 0.5
        const centerY = top + height * 0.5
        const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone
        if (Math.hypot(mouseX - centerX, mouseY - centerY) < inactiveRadius) {
          element.style.setProperty("--active", "0")
          return
        }

        const isActive =
          mouseX > left - proximity &&
          mouseX < left + width + proximity &&
          mouseY > top - proximity &&
          mouseY < top + height + proximity
        element.style.setProperty("--active", isActive ? "1" : "0")
        if (!isActive) return

        const currentAngle = parseFloat(element.style.getPropertyValue("--start")) || 0
        const targetAngle = (180 * Math.atan2(mouseY - centerY, mouseX - centerX)) / Math.PI + 90
        const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180

        animate(currentAngle, currentAngle + angleDiff, {
          duration: movementDuration,
          ease: GLOW_EASE,
          onUpdate: (value) => element.style.setProperty("--start", String(value)),
        })
      })
    },
    [inactiveZone, proximity, movementDuration]
  )

  useEffect(() => {
    if (disabled) return

    const handleScroll = () => handleMove()
    const handlePointerMove = (event: PointerEvent) => handleMove(event)

    window.addEventListener("scroll", handleScroll, { passive: true })
    document.body.addEventListener("pointermove", handlePointerMove, { passive: true })

    return () => {
      cancelAnimationFrame(animationFrameRef.current)
      window.removeEventListener("scroll", handleScroll)
      document.body.removeEventListener("pointermove", handlePointerMove)
    }
  }, [handleMove, disabled])

  if (disabled) return null

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={
        {
          "--blur": `${blur}px`,
          "--spread": spread,
          "--start": "0",
          "--active": "0",
          "--glowing-border-width": `${borderWidth}px`,
          "--gradient": GLOW_GRADIENT,
        } as React.CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit]",
        blur > 0 && "blur-(--blur)",
        className
      )}
    >
      <div
        className={cn(
          "rounded-[inherit]",
          "after:absolute after:inset-[calc(-1*var(--glowing-border-width))] after:rounded-[inherit] after:content-['']",
          "after:[border:var(--glowing-border-width)_solid_transparent]",
          "after:[background:var(--gradient)] after:[background-attachment:fixed]",
          "after:opacity-(--active) after:transition-opacity after:duration-300",
          "after:[mask-clip:padding-box,border-box] after:[mask-composite:intersect]",
          "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]"
        )}
      />
    </div>
  )
})
