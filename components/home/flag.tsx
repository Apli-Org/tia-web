import type { ReactNode } from 'react'
import type { FlagCode } from '@/content/countries'
import { cn } from '@/lib/utils'

const FLAGS: Record<FlagCode, ReactNode> = {
  mg: (
    <>
      <rect width="6" height="12" fill="#FBF8FE" />
      <rect x="6" width="12" height="6" fill="#DA452C" />
      <rect x="6" y="6" width="12" height="6" fill="#219761" />
    </>
  ),
  re: (
    <>
      <rect width="6" height="12" fill="#002395" />
      <rect x="6" width="6" height="12" fill="#FBF8FE" />
      <rect x="12" width="6" height="12" fill="#ED2939" />
    </>
  ),
  mu: (
    <>
      <rect width="18" height="3" fill="#EA2839" />
      <rect y="3" width="18" height="3" fill="#1A206D" />
      <rect y="6" width="18" height="3" fill="#FFD500" />
      <rect y="9" width="18" height="3" fill="#00A551" />
    </>
  ),
  za: (
    <>
      <rect width="18" height="12" fill="#FBF8FE" />
      <path d="M3 0H18V4H8.5Z" fill="#E03C31" />
      <path d="M3 12H18V8H8.5Z" fill="#001489" />
      <path d="M0 0H2L8 4.8H18V7.2H8L2 12H0Z" fill="#007749" />
      <path d="M0 1.5L5.6 6L0 10.5Z" fill="#FFB81C" />
      <path d="M0 2.6L4.2 6L0 9.4Z" fill="#1A0A28" />
    </>
  ),
}

type FlagProps = {
  code: FlagCode
  width: number
  height: number
  className?: string
}

export function Flag({ code, width, height, className }: FlagProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 12"
      aria-hidden="true"
      className={cn('flex-none rounded-[3px]', className)}
    >
      {FLAGS[code]}
    </svg>
  )
}
