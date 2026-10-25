import type { ReactNode } from 'react'

type LegalSectionProps = {
  id?: string
  title: string
  children: ReactNode
}

export function LegalSection({ id, title, children }: LegalSectionProps) {
  return (
    <section id={id} className="flex scroll-mt-28 flex-col gap-4 border-t border-tia-plum-200 pt-10">
      <h2 className="mb-1 text-[28px]/[34px] font-bold tracking-[-.015em] text-balance text-tia-plum-800 @max-[640px]:text-[22px]/[28px]">
        {title}
      </h2>
      {children}
    </section>
  )
}
