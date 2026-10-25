import { Suspense } from "react"
import { redirect } from "next/navigation"
import {
  Megaphone,
  CheckCircle,
  Eye,
  MousePointerClick,
} from "lucide-react"

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
import { getAdvertisementDashboardStats } from "@/actions/admin/advertisements.action"
import { getCurrentAdmin } from "@/actions/admin/auth.action"
import { checkAdminAction } from "@/lib/auth/admin-guard"
import { AdsTable } from "./ads-table"
import { AdsFilters } from "./ads-filters"
import { CreateAdButton } from "./create-ad-button"
import { RefreshButton } from "@/components/backoffice/refresh-button"

type SearchParams = Promise<{
  page?: string
  search?: string
  status?: string
}>

async function AdStats() {
  const stats = await getAdvertisementDashboardStats()

  const statCards = [
    {
      title: "Total Publicités",
      value: stats.total_ads,
      icon: Megaphone,
      color: "text-blue-600",
    },
    {
      title: "Publicités Actives",
      value: stats.active_ads,
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Impressions",
      value: stats.total_impressions,
      icon: Eye,
      color: "text-purple-600",
    },
    {
      title: "Clics",
      value: stats.total_clicks,
      icon: MousePointerClick,
      color: "text-amber-600",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {statCards.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stat.value.toLocaleString("fr-FR")}
            </div>
            {stat.title === "Clics" && stats.overall_ctr > 0 && (
              <p className="text-xs text-muted-foreground">
                CTR: {stats.overall_ctr.toFixed(2)}%
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function AdStatsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-16" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function AdsTableSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-48" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-16 w-24 rounded" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default async function AdvertisementsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const admin = await getCurrentAdmin()
  if (!admin) {
    redirect("/login")
  }

  const canViewAds = await checkAdminAction(admin.id, "view_advertisements")
  if (!canViewAds) {
    redirect("/dashboard")
  }

  const canManageAds = await checkAdminAction(admin.id, "manage_advertisements")

  const params = await searchParams
  const page = parseInt(params.page || "1")
  const filters = {
    search: params.search,
    status: params.status as "all" | "active" | "inactive" | undefined,
  }

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Publicités</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <RefreshButton />
      </header>

      <main className="flex-1 p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Gestion des Publicités</h1>
              <p className="text-muted-foreground">
                Créez et gérez les publicités et leurs statistiques
              </p>
            </div>
            {canManageAds && <CreateAdButton />}
          </div>

          <Suspense fallback={<AdStatsSkeleton />}>
            <AdStats />
          </Suspense>
        </div>

        <div className="sticky top-0 z-10 bg-background py-4 -mx-6 px-6 border-b mb-6 mt-6">
          <AdsFilters filters={filters} />
        </div>

        <Suspense fallback={<AdsTableSkeleton />}>
          <AdsTable page={page} filters={filters} canManage={canManageAds} />
        </Suspense>
      </main>
    </>
  )
}
