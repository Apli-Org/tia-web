import type { ReactNode } from 'react'

type LegalContactProps = {
  label: string
  children: ReactNode
}

export function LegalContact({ label, children }: LegalContactProps) {
  return (
    <div className="flex flex-col gap-1 rounded-[20px] bg-tia-plum-100 p-6 @max-[640px]:p-5">
      <p className="text-[14px]/[20px] font-semibold text-tia-plum-500">{label}</p>
      <p className="text-[20px]/[28px] font-bold text-tia-plum-800">{children}</p>
    </div>
  )
}
