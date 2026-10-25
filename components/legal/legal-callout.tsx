import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type LegalCalloutTone = 'info' | 'alert'

const TONE_CLASSES: Record<LegalCalloutTone, string> = {
  info: 'bg-tia-violet-100 text-tia-violet-800',
  alert: 'bg-tia-coral-50 text-tia-coral-700',
}

type LegalCalloutProps = {
  tone?: LegalCalloutTone
  children: ReactNode
}

export function LegalCallout({ tone = 'info', children }: LegalCalloutProps) {
  return (
    <div className={cn('flex flex-col gap-3 rounded-[20px] p-6 @max-[640px]:p-5', TONE_CLASSES[tone])}>{children}</div>
  )
}
