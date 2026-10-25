import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type MarqueeProps = {
  duration: number
  copies?: number
  isReversed?: boolean
  isPausedOnHover?: boolean
  className?: string
  groupClassName?: string
  children: ReactNode
}

/**
 * Infinite Moving Cards, adapted from Aceternity UI: the content is rendered
 * `copies` times (an even number) and the track slides by half its width, so
 * the loop is seamless. Every copy but the first is hidden from assistive tech.
 */
export function Marquee({
  duration,
  copies = 2,
  isReversed = false,
  isPausedOnHover = false,
  className,
  groupClassName,
  children,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        'flex w-max animate-tia-marquee',
        isReversed && '[animation-direction:reverse]',
        isPausedOnHover && 'hover:[animation-play-state:paused]',
        className,
      )}
      style={{ animationDuration: `${duration}s` }}
    >
      {Array.from({ length: copies }, (_, copy) => (
        <div key={copy} aria-hidden={copy > 0 || undefined} className={cn('flex shrink-0 items-center', groupClassName)}>
          {children}
        </div>
      ))}
    </div>
  )
}
