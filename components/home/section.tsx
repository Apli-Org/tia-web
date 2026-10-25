import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type SectionTone = 'canvas' | 'tint' | 'ink'

const TONE_CLASSES: Record<SectionTone, string> = {
  canvas: '',
  tint: 'bg-tia-plum-100',
  ink: 'bg-tia-plum-900 text-tia-plum-50',
}

type SectionProps = {
  id?: string
  tone?: SectionTone
  className?: string
  children: ReactNode
}

export function Section({ id, tone = 'canvas', className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn('relative px-12 py-30 @max-[640px]:px-5 @max-[640px]:py-20', TONE_CLASSES[tone], className)}
    >
      {children}
    </section>
  )
}
