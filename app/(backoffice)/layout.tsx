import { raleway } from "@/components/home/fonts"
import { cn } from "@/lib/utils"

export default function BackOfficeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      data-surface="backoffice"
      className={cn(raleway.variable, "min-h-screen bg-background font-tia antialiased lining-nums")}
    >
      {children}
    </div>
  )
}
