import { cn } from '@/lib/utils'
import { Marquee } from './marquee'

const ROW_DURATIONS = [26, 30]

const CHIP_TONES = [
  'bg-tia-plum-50 text-tia-violet-700',
  'bg-tia-coral-100 text-tia-coral-800',
  'bg-tia-violet-300 text-tia-violet-900',
  'bg-tia-violet-200 text-tia-violet-800',
]

type InterestsMarqueeProps = {
  rows: string[][]
}

export function InterestsMarquee({ rows }: InterestsMarqueeProps) {
  return (
    <div className="absolute inset-x-0 top-8 z-3 flex flex-col gap-3 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      {rows.map((row, rowIndex) => (
        <Marquee
          key={row[0]}
          duration={ROW_DURATIONS[rowIndex % ROW_DURATIONS.length]}
          isReversed={rowIndex % 2 === 1}
          groupClassName="gap-2.5 pr-2.5"
        >
          {row.map((interest, index) => (
            <span
              key={interest}
              className={cn(
                'rounded-full px-4.5 py-2.5 text-[15px] font-bold whitespace-nowrap transition-[rotate,scale] duration-500 ease-tia-spring hover:scale-[1.08] hover:-rotate-2',
                CHIP_TONES[index % CHIP_TONES.length],
              )}
            >
              {interest}
            </span>
          ))}
        </Marquee>
      ))}
    </div>
  )
}
