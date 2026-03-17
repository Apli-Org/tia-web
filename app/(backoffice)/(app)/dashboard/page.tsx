import { Suspense } from "react"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
  Users,
  Heart,
  DollarSign,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
} from "lucide-react"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { getCurrentAdmin } from "@/actions/admin/auth.action"
import { checkAdminAction } from "@/actions/admin/roles.action"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  getDashboardKPIs,
  getGrowthData,
  getRecentActivity,
} from "@/actions/admin/dashboard.action"
import { DashboardCharts } from "./dashboard-charts"
import { RefreshButton } from "@/components/backoffice/refresh-button"

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M"
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k"
  }
  return num.toLocaleString("fr-FR")
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount) + " MGA"
}

function getStatusBadge(status: string) {
  switch (status) {
    case "En attente":
      return <Badge variant="outline" className="text-amber-600 border-amber-600">{status}</Badge>
    case "En cours":
      return <Badge variant="outline" className="text-blue-600 border-blue-600">{status}</Badge>
    case "Complété":
    case "Vérifié":
      return <Badge variant="outline" className="text-green-600 border-green-600">{status}</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

async function KPICards() {
  const kpis = await getDashboardKPIs()

  const kpiData = [
    {
      title: "Total Utilisateurs",
      value: kpis.activeUsers.total.toLocaleString("fr-FR"),
      change: `${kpis.activeUsers.trend === "up" ? "+" : "-"}${kpis.activeUsers.change}%`,
      trend: kpis.activeUsers.trend,
      description: "vs mois dernier",
      icon: Users,
    },
    {
      title: "Matchs du jour",
      value: formatNumber(kpis.matchesToday.total),
      change: `${kpis.matchesToday.trend === "up" ? "+" : "-"}${kpis.matchesToday.change}%`,
      trend: kpis.matchesToday.trend,
      description: "vs hier",
      icon: Heart,
    },
    {
      title: "Revenus du mois",
      value: formatCurrency(kpis.monthlyRevenue.total),
      change: `${kpis.monthlyRevenue.trend === "up" ? "+" : "-"}${kpis.monthlyRevenue.change}%`,
      trend: kpis.monthlyRevenue.trend,
      description: "vs mois dernier",
      icon: DollarSign,
    },
    {
      title: "Signalements",
      value: kpis.pendingReports.total.toString(),
      change: "",
      trend: kpis.pendingReports.total > 10 ? "down" as const : "up" as const,
      description: "en attente",
      icon: AlertTriangle,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {kpiData.map((kpi) => (
        <Card key={kpi.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {kpi.title}
            </CardTitle>
            <kpi.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpi.value}</div>
            <div className="flex items-center gap-2 mt-1">
              {kpi.change && (
                <Badge
                  variant={kpi.trend === "up" ? "default" : "secondary"}
                  className={
                    kpi.trend === "up"
                      ? "bg-green-100 text-green-700 hover:bg-green-100"
                      : "bg-red-100 text-red-700 hover:bg-red-100"
                  }
                >
                  {kpi.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {kpi.change}
                </Badge>
              )}
              <span className="text-xs text-muted-foreground">
                {kpi.description}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function KPICardsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-20 mb-2" />
            <Skeleton className="h-4 w-32" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

async function GrowthChart() {
  const data = await getGrowthData()
  return <DashboardCharts data={data} />
}

function GrowthChartSkeleton() {
  return (
    <Card className="md:col-span-4">
      <CardHeader>
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-36 mt-2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[300px] w-full" />
      </CardContent>
    </Card>
  )
}

async function RecentActivityTable() {
  const activities = await getRecentActivity()

  return (
    <Card className="md:col-span-3">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Activité récente</CardTitle>
          <CardDescription>
            Les dernières actions sur la plateforme
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/activity">
            Voir tout
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Aucune activité récente
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell className="font-medium">
                    {activity.user}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm">{activity.action}</span>
                      <span className="text-xs text-muted-foreground">
                        {activity.time}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(activity.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}

function RecentActivitySkeleton() {
  return (
    <Card className="md:col-span-3">
      <CardHeader>
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-48 mt-2" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-6 w-16" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default async function DashboardPage() {
  const admin = await getCurrentAdmin()
  if (!admin) {
    redirect("/login")
  }

  const canViewDashboard = await checkAdminAction(admin.id, "view_dashboard")
  if (!canViewDashboard) {
    redirect("/login")
  }

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <RefreshButton />
      </header>

      <main className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Vue d&apos;ensemble de la plateforme TIA
            </p>
          </div>
          <Button asChild>
            <Link href="https://bo.vanilla-pay.net/pro/login" target="_blank" rel="noopener noreferrer">
              <ArrowUpRight className="mr-2 h-4 w-4" />
              Voir les rapports
            </Link>
          </Button>
        </div>

        <Suspense fallback={<KPICardsSkeleton />}>
          <KPICards />
        </Suspense>

        <div className="grid gap-4 md:grid-cols-7">
          <Suspense fallback={<GrowthChartSkeleton />}>
            <GrowthChart />
          </Suspense>

          <Suspense fallback={<RecentActivitySkeleton />}>
            <RecentActivityTable />
          </Suspense>
        </div>
      </main>
    </>
  )
}
