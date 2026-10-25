import type { ReactNode } from 'react'

type BentoGridProps = {
  children: ReactNode
}

export function BentoGrid({ children }: BentoGridProps) {
  return (
    <div className="mx-auto grid max-w-[1240px] auto-rows-[340px] grid-cols-4 gap-5 perspective-[1400px] @max-[1080px]:grid-cols-2 @max-[640px]:auto-rows-[minmax(340px,auto)] @max-[640px]:grid-cols-1">
      {children}
    </div>
  )
}
