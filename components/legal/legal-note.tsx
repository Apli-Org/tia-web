import type { ReactNode } from 'react'

type LegalNoteProps = {
  children: ReactNode
}

export function LegalNote({ children }: LegalNoteProps) {
  return <p className="text-[15px]/[24px] text-tia-plum-500 italic">{children}</p>
}
