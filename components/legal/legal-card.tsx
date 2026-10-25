import type { ReactNode } from 'react'

type LegalCardProps = {
  children: ReactNode
}

export function LegalCard({ children }: LegalCardProps) {
  return <div className="flex flex-col gap-3 rounded-[20px] bg-tia-plum-100 p-6 @max-[640px]:p-5">{children}</div>
}
