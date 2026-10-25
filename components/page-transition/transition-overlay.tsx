import type { AnimationEvent, CSSProperties } from 'react'
import { TIA_HEART_PATH, TIA_HEART_SHADE_PATH } from '@/components/home/icon'
import { cn } from '@/lib/utils'

export const HEARTBEAT_ANIMATION = 'tia-heart-boom'
export const WIPE_OUT_ANIMATION = 'tia-wipe-out'

export type WipeOrigin = {
  x: string
  y: string
}

type WipeStyle = CSSProperties & Record<`--${string}`, string>

type TransitionOverlayProps = {
  origin: WipeOrigin
  isRevealing: boolean
  onAnimationIteration: (event: AnimationEvent<HTMLDivElement>) => void
  onAnimationEnd: (event: AnimationEvent<HTMLDivElement>) => void
}

export function TransitionOverlay({ origin, isRevealing, onAnimationIteration, onAnimationEnd }: TransitionOverlayProps) {
  const style: WipeStyle = { '--tia-wipe-x': origin.x, '--tia-wipe-y': origin.y }

  return (
    <div
      aria-hidden="true"
      style={style}
      onAnimationIteration={onAnimationIteration}
      onAnimationEnd={onAnimationEnd}
      className={cn(
        'fixed inset-0 z-100 flex items-center justify-center bg-tia-violet-500',
        isRevealing ? 'animate-tia-wipe-out' : 'animate-tia-wipe-in',
      )}
    >
      <div
        className={cn(
          'relative flex size-28 items-center justify-center',
          isRevealing ? 'animate-tia-heart-out' : 'animate-tia-heart-pop',
        )}
      >
        {!isRevealing && (
          <span className="absolute inset-0 animate-tia-heart-echo rounded-full border-2 border-tia-plum-50/60" />
        )}
        <svg viewBox="0 0 172 157" className="h-24 w-26 animate-tia-heart-boom">
          <path d={TIA_HEART_PATH} className="fill-tia-plum-50" />
          <path d={TIA_HEART_SHADE_PATH} className="fill-tia-plum-800" fillOpacity={0.18} />
        </svg>
      </div>
    </div>
  )
}
