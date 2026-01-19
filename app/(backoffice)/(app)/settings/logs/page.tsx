import { Suspense } from "react"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, Activity } from "lucide-react"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { getCurrentAdmin } from "@/actions/admin/auth.action"
import {
  getActivityStats,
  getAdminsForFilter,
  getDistinctActions,
  type ActivityFilters,
} from "@/actions/admin/settings"
import { LogsTable } from "./logs-table"
import { LogsFilters } from "./logs-filters"
import { Pagination } from "./pagination"
import { RefreshButton } from "@/components/backoffice/refresh-button"

type SearchParams = Promise<{
  page?: string
  admin_id?: string
  action?: string
  dateFrom?: string
  dateTo?: string
  search?: string
}>

async function LogsStats() {
  const stats = await getActivityStats()

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Aujourd&apos;hui</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.todayCount}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Cette semaine</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.weekCount}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Action fréquente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold truncate">
            {stats.topActions[0]?.action || "-"}
          </div>
        </CardContent>
      </Card>
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

export default async function LogsPage({
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

  const filters: ActivityFilters = {
    admin_id: params.admin_id || undefined,
    action: params.action || undefined,
    dateFrom: params.dateFrom || undefined,
    dateTo: params.dateTo || undefined,
    search: params.search || undefined,
  }

  const [admins, actions] = await Promise.all([
    getAdminsForFilter(),
    getDistinctActions(),
  ])

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/settings">Paramètres</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Journal d&apos;activité</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <RefreshButton />
      </header>

      <main className="flex-1 p-6">
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Link href="/settings">
                <Button variant="ghost" size="sm" className="-ml-2">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Retour
                </Button>
              </Link>
            </div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Activity className="h-8 w-8" />
              Journal d&apos;activité
            </h1>
            <p className="text-muted-foreground">
              Historique des actions administratives
            </p>
          </div>

          <Suspense fallback={<StatsSkeleton />}>
            <LogsStats />
          </Suspense>

          <LogsFilters filters={filters} admins={admins} actions={actions} />

          <Suspense fallback={<TableSkeleton />}>
            <LogsTable page={page} filters={filters} />
          </Suspense>

          <Suspense fallback={<Skeleton className="h-10 w-full" />}>
            <Pagination page={page} filters={filters} />
          </Suspense>
        </div>
      </main>
    </>
  )
}
