import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

const ENTRANCE_STEP_MS = 80

type DashboardTileProps = {
  title?: string
  description?: string
  action?: ReactNode
  delayStep?: number
  className?: string
  children: ReactNode
}

export function DashboardTile({ title, description, action, delayStep = 0, className, children }: DashboardTileProps) {
  return (
    <section
      className={cn(
        "relative isolate flex animate-tia-rise flex-col rounded-[28px] bg-card p-5 ring-1 ring-tia-plum-800/6 motion-reduce:animate-none sm:p-6",
        className
      )}
      style={{ animationDelay: `${delayStep * ENTRANCE_STEP_MS}ms` }}
    >
      {(title || action) && (
        <header className="mb-5 flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            {title && <h2 className="text-[19px]/[24px] font-bold tracking-[-.01em] text-tia-plum-800">{title}</h2>}
            {description && <p className="text-[13px]/[18px] text-tia-plum-500">{description}</p>}
          </div>
          {action}
        </header>
      )}
      {children}
    </section>
  )
}
