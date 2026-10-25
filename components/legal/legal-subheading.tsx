import type { ReactNode } from 'react'

type LegalSubheadingProps = {
  children: ReactNode
}

export function LegalSubheading({ children }: LegalSubheadingProps) {
  return (
    <h3 className="mt-2 text-[20px]/[28px] font-bold text-tia-plum-800 @max-[640px]:text-[18px]/[26px]">{children}</h3>
  )
}
