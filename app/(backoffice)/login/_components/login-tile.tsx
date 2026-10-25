import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

const ENTRANCE_STEP_MS = 90

export type LoginTileStyle = {
  tile: string
  kicker: string
  description?: string
  delayStep: number
}

type LoginTileProps = {
  kicker: string
  title: string
  description?: string
  tileStyle: LoginTileStyle
  children?: ReactNode
}

export function LoginTile({ kicker, title, description, tileStyle, children }: LoginTileProps) {
  return (
    <article
      className={cn(
        "group relative isolate flex animate-tia-rise flex-col justify-end overflow-hidden rounded-[28px] p-5 ring-1 ring-tia-plum-800/6 sm:p-6",
        tileStyle.tile
      )}
      style={{ animationDelay: `${tileStyle.delayStep * ENTRANCE_STEP_MS}ms` }}
    >
      {children}
      <div className="relative z-3 flex flex-col items-start gap-1">
        <span
          className={cn(
            "mb-1.5 inline-flex h-6.5 items-center rounded-full px-3 text-[12px] font-bold tracking-[.04em]",
            tileStyle.kicker
          )}
        >
          {kicker}
        </span>
        <h2 className="text-[19px]/[24px] font-bold tracking-[-.01em] sm:text-[22px]/[28px]">{title}</h2>
        {description && (
          <p className={cn("max-w-[320px] text-[14px]/[20px]", tileStyle.description)}>{description}</p>
        )}
      </div>
    </article>
  )
}
