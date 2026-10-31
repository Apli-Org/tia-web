"use client"

import { usePathname } from "next/navigation"

type PageTransitionProps = {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  return (
    <div
      key={pathname}
      className="flex flex-1 flex-col animate-in fade-in-0 slide-in-from-bottom-2 duration-500 ease-out motion-reduce:animate-none"
    >
      {children}
    </div>
  )
}
