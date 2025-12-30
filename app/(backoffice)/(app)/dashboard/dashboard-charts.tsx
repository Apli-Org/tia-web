"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  users: {
    label: "Utilisateurs",
    color: "var(--primary)",
  },
  matches: {
    label: "Matchs",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

type GrowthData = {
  month: string
  users: number
  matches: number
}

type DashboardChartsProps = {
  data: GrowthData[]
}

export function DashboardCharts({ data }: DashboardChartsProps) {
  return (
    <Card className="md:col-span-4">
      <CardHeader>
        <CardTitle>Croissance des utilisateurs</CardTitle>
        <CardDescription>
          Évolution sur les 6 derniers mois
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              type="monotone"
              dataKey="users"
              stackId="1"
              stroke="var(--color-users)"
              fill="var(--color-users)"
              fillOpacity={0.2}
            />
            <Area
              type="monotone"
              dataKey="matches"
              stackId="2"
              stroke="var(--color-matches)"
              fill="var(--color-matches)"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
