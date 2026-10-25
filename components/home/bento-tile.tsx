import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Reveal } from './reveal'

const ENTRANCE_STEP = 0.09

export type BentoTileStyle = {
  tile: string
  kicker: string
  description: string
  text?: string
  delayStep: number
}

type BentoTileProps = {
  kicker: string
  title: string
  description: string
  tileStyle: BentoTileStyle
  children: ReactNode
}

export function BentoTile({ kicker, title, description, tileStyle, children }: BentoTileProps) {
  return (
    <Reveal
      as="article"
      delay={tileStyle.delayStep * ENTRANCE_STEP}
      offsetY={48}
      initialScale={0.92}
      className={cn(
        'group relative isolate flex flex-col justify-end overflow-hidden rounded-[32px] p-7 ring-1 ring-tia-plum-800/6 [transition:translate_.7s_var(--ease-tia-spring),box-shadow_.5s_cubic-bezier(.22,1,.36,1)] hover:-translate-y-2 hover:shadow-[0_20px_40px_-16px_black] hover:shadow-tia-plum-800/25 hover:ring-2 @max-[640px]:hover:translate-y-0',
        tileStyle.tile,
      )}
    >
      {children}
      <div
        className={cn(
          'relative z-3 flex flex-col items-start gap-1.5 transition-transform duration-600 ease-tia-spring group-hover:-translate-y-1',
          tileStyle.text,
        )}
      >
        <span
          className={cn(
            'mb-1.5 inline-flex h-6.5 items-center rounded-full px-3 text-[12px] font-bold tracking-[.04em]',
            tileStyle.kicker,
          )}
        >
          {kicker}
        </span>
        <h3 className="text-[24px]/[30px] font-bold tracking-[-.01em]">{title}</h3>
        <p className={cn('max-w-[340px] text-[15px]/[22px]', tileStyle.description)}>{description}</p>
      </div>
    </Reveal>
  )
}
