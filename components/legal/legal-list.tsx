import type { ReactNode } from 'react'

type LegalListProps = {
  children: ReactNode
}

export function LegalList({ children }: LegalListProps) {
  return <ul className="flex flex-col gap-2.5">{children}</ul>
}
