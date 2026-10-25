import { useId } from 'react'
import { WHY_TIA } from '@/content/site'
import { cn } from '@/lib/utils'
import { Photo } from './photo'

const GRID_CELL = 48

const PIN_LAYOUT = [
  { left: '22%', top: '30%', delay: 0, pulse: 'bg-tia-violet-400' },
  { left: '64%', top: '22%', delay: 0.6, pulse: 'bg-tia-coral-300' },
  { left: '42%', top: '62%', delay: 1.2, pulse: 'bg-tia-violet-300' },
  { left: '80%', top: '64%', delay: 1.8, pulse: 'bg-tia-coral-100' },
]

export function NearbyMap() {
  const patternId = useId()

  return (
    <div aria-hidden="true" className="absolute inset-x-0 top-0 bottom-24">
      <svg className="absolute inset-x-0 top-0 h-[calc(100%+96px)] w-full scale-[1.3] -rotate-8 text-tia-plum-50/8">
        <defs>
          <pattern id={patternId} width={GRID_CELL} height={GRID_CELL} patternUnits="userSpaceOnUse">
            <path d={`M0 1H${GRID_CELL}M1 0V${GRID_CELL}`} stroke="currentColor" strokeWidth={2} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
      <span className="absolute top-[42%] left-[48%] z-3 size-4 rounded-full bg-tia-violet-400 ring-6 ring-tia-violet-400/30" />
      {WHY_TIA.nearbyPins.map((pin, index) => {
        const layout = PIN_LAYOUT[index]
        const delay = { animationDelay: `${layout.delay}s` }

        return (
          <span
            key={pin.photo}
            className="absolute z-3 -mt-6.5 -ml-6.5 size-13 animate-tia-drop transition-[scale] duration-600 ease-tia-spring group-hover:scale-[1.12]"
            style={{ left: layout.left, top: layout.top, ...delay }}
          >
            <span className={cn('absolute -inset-2.5 animate-tia-pulse rounded-full opacity-50', layout.pulse)} style={delay} />
            <Photo id={pin.photo} sizes="52px" className="rounded-full border-3 border-tia-plum-50" />
            {pin.label && (
              <em className="absolute top-3 left-14.5 rounded-full bg-tia-plum-50/92 px-2.5 py-1 text-[12px] font-bold whitespace-nowrap text-tia-plum-800 not-italic">
                {pin.label}
              </em>
            )}
          </span>
        )
      })}
    </div>
  )
}
