"use client"

type PageTransitionProps = {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  // Simplified: removed framer-motion animations that were causing
  // navigation delays (200ms entrance + 200ms exit = 400ms blocked)
  // Navigation feedback is now handled by NProgress bar
  return <>{children}</>
}
