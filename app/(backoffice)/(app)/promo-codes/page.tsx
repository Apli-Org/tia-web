import { Suspense } from "react"
import { redirect } from "next/navigation"
import {
  Ticket,
  CheckCircle,
  TrendingUp,
  Percent,
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
import { getPromoCodeStats } from "@/actions/admin/promo-codes.action"
import { getCurrentAdmin } from "@/actions/admin/auth.action"
import { checkAdminAction } from "@/lib/auth/admin-guard"
import { formatPrice } from "@/lib/pricing-utils"
import { PromoCodesTable } from "./promo-codes-table"
import { PromoCodesFilters } from "./promo-codes-filters"
import { CreatePromoCodeButton } from "./create-promo-code-button"
import { RefreshButton } from "@/components/backoffice/refresh-button"

type SearchParams = Promise<{
  page?: string
  search?: string
  status?: string
}>

async function PromoCodeStats() {
  const stats = await getPromoCodeStats()

  const statCards = [
    {
      title: "Total Codes",
      value: stats.totalCodes,
      icon: Ticket,
      color: "text-blue-600",
    },
    {
      title: "Codes Actifs",
      value: stats.activeCodes,
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Utilisations",
      value: stats.totalUsages,
      icon: TrendingUp,
      color: "text-purple-600",
    },
    {
      title: "Réductions Données",
      value: formatPrice(stats.totalDiscountGiven),
      icon: Percent,
      color: "text-amber-600",
      isFormatted: true,
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
              {stat.isFormatted ? stat.value : (stat.value as number).toLocaleString("fr-FR")}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function PromoCodeStatsSkeleton() {
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

function PromoCodesTableSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-48" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-20" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default async function PromoCodesPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const admin = await getCurrentAdmin()
  if (!admin) {
    redirect("/login")
  }

  const canManagePromoCodes = await checkAdminAction(admin.id, "manage_promo_codes")
  if (!canManagePromoCodes) {
    redirect("/dashboard")
  }

  const params = await searchParams
  const page = parseInt(params.page || "1")
  const filters = {
    search: params.search,
    status: params.status as "all" | "active" | "inactive" | "expired" | undefined,
  }

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Codes Promo</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <RefreshButton />
      </header>

      <main className="flex-1 p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Gestion des Codes Promo</h1>
              <p className="text-muted-foreground">
                Créez et gérez les codes promotionnels pour vos utilisateurs
              </p>
            </div>
            <CreatePromoCodeButton />
          </div>

          <Suspense fallback={<PromoCodeStatsSkeleton />}>
            <PromoCodeStats />
          </Suspense>
        </div>

        {/* Sticky filters */}
        <div className="sticky top-0 z-10 bg-background py-4 -mx-6 px-6 border-b mb-6 mt-6">
          <PromoCodesFilters filters={filters} />
        </div>

        <Suspense fallback={<PromoCodesTableSkeleton />}>
          <PromoCodesTable page={page} filters={filters} />
        </Suspense>
      </main>
    </>
  )
}
