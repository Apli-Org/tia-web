import { cn } from '@/lib/utils'
import { TIA_HEART_PATH, TIA_HEART_SHADE_PATH } from './icon'

const RING_DELAYS = [0, 0.8, 1.6]

const FLYING_HEARTS = [
  { delay: 0, className: 'left-[22%] text-tia-coral-100 [--fly-x:-30px] [--fly-rotate:-20deg]' },
  { delay: 0.7, className: 'left-[70%] text-tia-violet-200 [--fly-x:24px] [--fly-rotate:18deg]' },
  { delay: 1.4, className: 'left-[40%] text-tia-coral-400 [--fly-x:-12px] [--fly-rotate:-8deg]' },
  { delay: 2.1, className: 'left-[58%] text-tia-plum-50 [--fly-x:30px] [--fly-rotate:24deg]' },
  { delay: 2.8, className: 'left-[30%] text-tia-coral-300 [--fly-x:-26px] [--fly-rotate:-14deg]' },
  { delay: 3.5, className: 'left-[78%] text-tia-violet-300 [--fly-x:14px] [--fly-rotate:10deg]' },
]

export function HeartBurst() {
  return (
    <div
      aria-hidden="true"
      className="absolute top-[34%] left-1/2 z-3 size-30 -translate-1/2 transition-[scale] duration-700 ease-tia-spring group-hover:scale-[1.12] @max-[640px]:top-[38%]"
    >
      {RING_DELAYS.map((delay) => (
        <span
          key={delay}
          className="absolute inset-0 animate-tia-ring rounded-full border-2 border-tia-plum-50/60 opacity-0"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
      {FLYING_HEARTS.map((heart) => (
        <svg
          key={heart.delay}
          viewBox="0 0 172 157"
          className={cn('absolute bottom-2.5 h-[17px] w-[18px] animate-tia-fly opacity-0', heart.className)}
          style={{ animationDelay: `${heart.delay}s` }}
        >
          <path d={TIA_HEART_PATH} fill="currentColor" />
        </svg>
      ))}
      <svg viewBox="0 0 172 157" className="absolute inset-3.5 mt-1 h-21 w-23 animate-tia-beat">
        <path d={TIA_HEART_PATH} className="fill-tia-plum-50" />
        <path d={TIA_HEART_SHADE_PATH} className="fill-tia-plum-800" fillOpacity={0.18} />
      </svg>
    </div>
  )
}
