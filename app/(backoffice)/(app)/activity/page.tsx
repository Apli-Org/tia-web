import { Suspense } from "react"
import { redirect } from "next/navigation"
import { Activity, TrendingUp, Users, ShoppingCart, Flag } from "lucide-react"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { getCurrentAdmin } from "@/actions/admin/auth.action"
import {
  getUserActivityStats,
  getActivityTypes,
  type UserActivityFilters,
} from "@/actions/admin/activity.action"
import { ActivityTable } from "./activity-table"
import { ActivityFilters } from "./activity-filters"
import { Pagination } from "./pagination"
import { RefreshButton } from "@/components/backoffice/refresh-button"

type SearchParams = Promise<{
  page?: string
  type?: string
  dateFrom?: string
  dateTo?: string
  search?: string
}>

async function ActivityStats() {
  const stats = await getUserActivityStats()

  const statCards = [
    {
      title: "Total",
      value: stats.total.toLocaleString("fr-FR"),
      icon: Activity,
    },
    {
      title: "Aujourd'hui",
      value: stats.todayCount.toLocaleString("fr-FR"),
      icon: TrendingUp,
    },
    {
      title: "Cette semaine",
      value: stats.weekCount.toLocaleString("fr-FR"),
      icon: Users,
    },
    {
      title: "Type principal",
      value: stats.byType[0]?.type ?? "-",
      icon: ShoppingCart,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {statCards.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function StatsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-20" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-12" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function TableSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-32" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-3 w-1/3" />
              </div>
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default async function ActivityPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const admin = await getCurrentAdmin()
  if (!admin) {
    redirect("/login")
  }

  const params = await searchParams
  const page = parseInt(params.page || "1", 10)

  const filters: UserActivityFilters = {
    type: params.type || undefined,
    dateFrom: params.dateFrom || undefined,
    dateTo: params.dateTo || undefined,
    search: params.search || undefined,
  }

  const activityTypes = await getActivityTypes()

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Activite</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <RefreshButton />
      </header>

      <main className="flex-1 p-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Activity className="h-8 w-8" />
              Activite
            </h1>
            <p className="text-muted-foreground">
              Historique de toutes les activites utilisateurs
            </p>
          </div>

          <Suspense fallback={<StatsSkeleton />}>
            <ActivityStats />
          </Suspense>

          <ActivityFilters filters={filters} activityTypes={activityTypes} />

          <Suspense fallback={<TableSkeleton />}>
            <ActivityTable page={page} filters={filters} />
          </Suspense>

          <Suspense fallback={<Skeleton className="h-10 w-full" />}>
            <Pagination page={page} filters={filters} />
          </Suspense>
        </div>
      </main>
    </>
  )
}
