import Link from 'next/link'
import type { ReactNode } from 'react'

type LegalLinkProps = {
  href: string
  children: ReactNode
}

export function LegalLink({ href, children }: LegalLinkProps) {
  return (
    <Link
      href={href}
      className="font-semibold text-tia-violet-500 underline decoration-tia-violet-500/30 underline-offset-4 transition-colors duration-200 hover:decoration-tia-violet-500"
    >
      {children}
    </Link>
  )
}
