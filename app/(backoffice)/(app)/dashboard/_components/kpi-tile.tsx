import Link from "next/link"
import { ArrowUpRight, TrendingDown, TrendingUp, type LucideIcon } from "lucide-react"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import type { NumberFormat } from "@/lib/number-format"
import { cn } from "@/lib/utils"
import { AnimatedNumber } from "./animated-number"

const ENTRANCE_STEP_MS = 80
const COUNT_DELAY_STEP = 0.08

export type KpiTileTone = "light" | "ink"

export type KpiTileStyle = {
  tone: KpiTileTone
  chip: string
}

export type KpiTrend = {
  direction: "up" | "down"
  change: number
}

export type KpiDetail = {
  label: string
  value: string
  trend?: KpiTrend
}

type KpiTileProps = {
  label: string
  value: number
  format?: NumberFormat
  caption: string
  icon: LucideIcon
  tileStyle: KpiTileStyle
  trend?: KpiTrend
  detail?: KpiDetail
  href?: string
  isUrgent?: boolean
  delayStep: number
}

const TONES: Record<
  KpiTileTone,
  { tile: string; label: string; caption: string; divider: string; up: string; down: string }
> = {
  light: {
    tile: "bg-card text-tia-plum-800",
    label: "text-tia-plum-600",
    caption: "text-tia-plum-500",
    divider: "border-tia-plum-200",
    up: "bg-tia-violet-100 text-tia-violet-700",
    down: "bg-tia-coral-50 text-tia-coral-700",
  },
  ink: {
    tile: "bg-tia-violet-900 text-tia-plum-50",
    label: "text-tia-violet-200",
    caption: "text-tia-plum-50/70",
    divider: "border-tia-plum-50/15",
    up: "bg-tia-plum-50/12 text-tia-violet-200",
    down: "bg-tia-coral-500/20 text-tia-coral-100",
  },
}

export function KpiTile({
  label,
  value,
  format,
  caption,
  icon: Icon,
  tileStyle,
  trend,
  detail,
  href,
  isUrgent = false,
  delayStep,
}: KpiTileProps) {
  const tone = TONES[tileStyle.tone]
  const TrendIcon = trend?.direction === "down" ? TrendingDown : TrendingUp

  return (
    <article
      className={cn(
        "group relative isolate flex min-h-[180px] animate-tia-rise flex-col rounded-[28px] p-5 ring-1 ring-tia-plum-800/6 [transition:translate_.7s_var(--ease-tia-spring),box-shadow_.5s_cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px] hover:shadow-tia-plum-800/30 motion-reduce:animate-none sm:p-6",
        tone.tile
      )}
      style={{ animationDelay: `${delayStep * ENTRANCE_STEP_MS}ms` }}
    >
      <GlowingEffect spread={40} proximity={64} inactiveZone={0.01} borderWidth={2} />
      <div className="relative flex items-start justify-between gap-3">
        <span
          className={cn(
            "relative flex size-11 items-center justify-center rounded-2xl transition-transform duration-700 ease-tia-spring group-hover:scale-110 group-hover:-rotate-6",
            tileStyle.chip
          )}
        >
          {isUrgent && (
            <span className="absolute inset-0 animate-tia-pulse rounded-2xl bg-tia-coral-400/60 motion-reduce:animate-none" />
          )}
          <Icon className="relative size-5" />
        </span>
        {trend && (
          <span
            className={cn(
              "inline-flex h-7 items-center gap-1 rounded-full px-2.5 text-[12px] font-bold",
              trend.direction === "up" ? tone.up : tone.down
            )}
          >
            <TrendIcon className="size-3.5" />
            {trend.direction === "up" ? "+" : "-"}
            {trend.change}%
          </span>
        )}
        {href && (
          <Link
            href={href}
            aria-label={`Ouvrir ${label}`}
            className="flex size-8 items-center justify-center rounded-full bg-tia-plum-100 text-tia-plum-700 transition-[background-color,color,rotate] duration-500 ease-tia-spring hover:rotate-45 hover:bg-tia-violet-500 hover:text-tia-plum-50"
          >
            <ArrowUpRight className="size-4" />
          </Link>
        )}
      </div>
      <div className="relative mt-auto pt-6">
        <p className={cn("text-[13px] font-semibold", tone.label)}>{label}</p>
        <AnimatedNumber
          value={value}
          format={format}
          delay={delayStep * COUNT_DELAY_STEP}
          className="mt-1 block text-[32px]/[38px] font-bold tracking-[-.03em] tabular-nums"
        />
        <p className={cn("mt-1 text-[12px]", tone.caption)}>{caption}</p>
        {detail && (
          <div className={cn("mt-3 flex items-center justify-between gap-2 border-t pt-3", tone.divider)}>
            <span className={cn("text-[12px] font-semibold", tone.label)}>{detail.label}</span>
            <span className="flex items-center gap-2">
              <span className="text-[15px] font-bold tabular-nums">{detail.value}</span>
              {detail.trend && (
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[11px] font-bold",
                    detail.trend.direction === "up" ? tone.up : tone.down
                  )}
                >
                  {detail.trend.direction === "up" ? "+" : "-"}
                  {detail.trend.change}%
                </span>
              )}
            </span>
          </div>
        )}
      </div>
    </article>
  )
}
