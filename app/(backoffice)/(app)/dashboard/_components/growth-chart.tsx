"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import type { GrowthData } from "@/actions/admin/dashboard.action"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { DashboardTile } from "./dashboard-tile"

const ANIMATION_DURATION_MS = 1400

const chartConfig = {
  users: { label: "Inscriptions", color: "var(--chart-1)" },
  matches: { label: "Matchs", color: "var(--chart-2)" },
} satisfies ChartConfig

const SERIES = [
  { key: "users", dot: "bg-tia-violet-500" },
  { key: "matches", dot: "bg-tia-coral-500" },
] as const

type GrowthChartProps = {
  data: GrowthData[]
  delayStep: number
  className?: string
}

export function GrowthChart({ data, delayStep, className }: GrowthChartProps) {
  return (
    <DashboardTile
      title="Croissance"
      description="Inscriptions et matchs sur les 6 derniers mois"
      delayStep={delayStep}
      className={className}
      action={
        <ul className="flex flex-wrap justify-end gap-1.5">
          {SERIES.map((series) => (
            <li
              key={series.key}
              className="inline-flex h-7 items-center gap-1.5 rounded-full bg-tia-plum-100 px-3 text-[12px] font-semibold text-tia-plum-700"
            >
              <span className={`size-2 rounded-full ${series.dot}`} />
              {chartConfig[series.key].label}
            </li>
          ))}
        </ul>
      }
    >
      <ChartContainer config={chartConfig} className="h-[280px] w-full">
        <AreaChart data={data} margin={{ top: 10, right: 8, left: 8, bottom: 0 }}>
          <defs>
            {SERIES.map((series) => (
              <linearGradient key={series.key} id={`fill-${series.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={`var(--color-${series.key})`} stopOpacity={0.35} />
                <stop offset="95%" stopColor={`var(--color-${series.key})`} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid vertical={false} strokeDasharray="4 6" className="stroke-tia-plum-200" />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            className="text-[12px] font-semibold"
          />
          <ChartTooltip cursor={{ className: "stroke-tia-violet-300", strokeDasharray: "4 4" }} content={<ChartTooltipContent indicator="dot" />} />
          {SERIES.map((series) => (
            <Area
              key={series.key}
              type="natural"
              dataKey={series.key}
              stroke={`var(--color-${series.key})`}
              strokeWidth={2.5}
              fill={`url(#fill-${series.key})`}
              activeDot={{ r: 5, strokeWidth: 3, className: "stroke-tia-plum-50" }}
              animationDuration={ANIMATION_DURATION_MS}
              animationEasing="ease-out"
            />
          ))}
        </AreaChart>
      </ChartContainer>
    </DashboardTile>
  )
}
