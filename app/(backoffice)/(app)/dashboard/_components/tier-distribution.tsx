"use client"

import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import { AnimatedNumber } from "./animated-number"
import { DashboardTile } from "./dashboard-tile"

const BAR_DURATION = 1.1
const BAR_EASE = [0.22, 1, 0.36, 1] as const
const BAR_DELAY = 0.4
const BAR_STAGGER = 0.08

export type TierCounts = Record<"base" | "silver" | "gold" | "elite", number>

const TIERS: { key: keyof TierCounts; label: string; color: string }[] = [
  { key: "base", label: "Gratuit", color: "bg-tia-plum-300" },
  { key: "silver", label: "Silver", color: "bg-tia-violet-300" },
  { key: "gold", label: "Gold", color: "bg-tia-sunset" },
  { key: "elite", label: "Elite", color: "bg-tia-violet-500" },
]

type TierDistributionProps = {
  counts: TierCounts
  delayStep: number
  className?: string
}

function getShare(count: number, total: number): number {
  return total === 0 ? 0 : Math.round((count / total) * 1000) / 10
}

export function TierDistribution({ counts, delayStep, className }: TierDistributionProps) {
  const shouldReduceMotion = useReducedMotion()
  const total = TIERS.reduce((sum, tier) => sum + counts[tier.key], 0)
  const premium = total - counts.base

  return (
    <DashboardTile title="Offres" description="Membres actifs par niveau" delayStep={delayStep} className={className}>
      <div className="flex items-end justify-between gap-3">
        <div>
          <AnimatedNumber value={premium} className="block text-[32px]/[38px] font-bold tracking-[-.03em] tabular-nums" />
          <p className="text-[12px] text-tia-plum-500">membres premium</p>
        </div>
        <span className="inline-flex h-7 items-center rounded-full bg-tia-violet-100 px-3 text-[12px] font-bold text-tia-violet-700">
          {getShare(premium, total)}%
        </span>
      </div>

      <div className="mt-5 flex h-3 gap-1 overflow-hidden rounded-full bg-tia-plum-100">
        {TIERS.map((tier, index) => (
          <motion.span
            key={tier.key}
            className={cn("h-full rounded-full", tier.color)}
            initial={{ width: shouldReduceMotion ? `${getShare(counts[tier.key], total)}%` : 0 }}
            animate={{ width: `${getShare(counts[tier.key], total)}%` }}
            transition={{ duration: BAR_DURATION, ease: BAR_EASE, delay: BAR_DELAY + index * BAR_STAGGER }}
          />
        ))}
      </div>

      <ul className="mt-5 flex flex-col gap-1">
        {TIERS.map((tier) => (
          <li
            key={tier.key}
            className="flex items-center gap-3 rounded-xl px-2 py-1.5 text-[13px] transition-colors hover:bg-tia-plum-100"
          >
            <span className={cn("size-2.5 rounded-full", tier.color)} />
            <span className="font-semibold text-tia-plum-700">{tier.label}</span>
            <span className="ml-auto font-bold text-tia-plum-800 tabular-nums">
              {counts[tier.key].toLocaleString("fr-FR")}
            </span>
            <span className="w-12 text-right text-tia-plum-500 tabular-nums">{getShare(counts[tier.key], total)}%</span>
          </li>
        ))}
      </ul>
    </DashboardTile>
  )
}
