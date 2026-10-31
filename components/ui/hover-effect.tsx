"use client"

import { useId, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const HIGHLIGHT_FADE_IN = { duration: 0.15 }
const HIGHLIGHT_FADE_OUT = { duration: 0.15, delay: 0.2 }

export type HoverEffectItem = {
  title: string
  description: string
  href: string
  icon: LucideIcon
}

type HoverEffectProps = {
  items: HoverEffectItem[]
  className?: string
}

/**
 * Aceternity UI card hover effect: a highlight that slides from card to card
 * under the pointer.
 */
export function HoverEffect({ items, className }: HoverEffectProps) {
  const layoutId = useId()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2", className)} onMouseLeave={() => setHoveredIndex(null)}>
      {items.map((item, index) => (
        <Link
          key={item.href}
          href={item.href}
          className="group relative block p-1"
          onMouseEnter={() => setHoveredIndex(index)}
          onFocus={() => setHoveredIndex(index)}
        >
          <AnimatePresence>
            {hoveredIndex === index && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 block rounded-[20px] bg-tia-violet-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: HIGHLIGHT_FADE_IN }}
                exit={{ opacity: 0, transition: HIGHLIGHT_FADE_OUT }}
              />
            )}
          </AnimatePresence>
          <div className="relative z-1 flex h-full items-start gap-3 rounded-2xl p-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-tia-plum-100 text-tia-violet-600 transition-[background-color,color,scale] duration-500 ease-tia-spring group-hover:scale-110 group-hover:bg-tia-violet-500 group-hover:text-tia-plum-50">
              <item.icon className="size-4" />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="truncate text-[14px] font-bold text-tia-plum-800">{item.title}</span>
              <span className="truncate text-[12px] text-tia-plum-500">{item.description}</span>
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
