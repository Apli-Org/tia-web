import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  eyebrow: string
  title: string
  isLeftAligned?: boolean
  isOnDark?: boolean
  children?: ReactNode
}

export function SectionHeading({
  eyebrow,
  title,
  isLeftAligned = false,
  isOnDark = false,
  children,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3.5 @max-[640px]:mb-9',
        isLeftAligned ? 'items-start text-left' : 'mx-auto mb-14 max-w-[1200px] items-center text-center',
      )}
    >
      <p
        className={cn(
          'text-[14px]/[20px] font-bold tracking-[.12em] uppercase',
          isOnDark ? 'text-tia-violet-300' : 'text-tia-violet-500',
        )}
      >
        {eyebrow}
      </p>
      <h2 className="max-w-[900px] text-[clamp(36px,4.4cqi,60px)] leading-[1.08] font-bold tracking-[-.02em]">
        {title}
      </h2>
      {children}
    </div>
  )
}
