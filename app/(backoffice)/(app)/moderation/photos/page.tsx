import { Suspense } from "react"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Image as ImageIcon, Clock, Trash2, AlertTriangle, Ban, ChevronLeft } from "lucide-react"

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { getCurrentAdmin } from "@/actions/admin/auth.action"
import { checkAdminAction } from "@/actions/admin/roles.action"
import { getReportStats } from "@/actions/admin/reports.action"
import { PhotosTable } from "./photos-table"
import { ReportsFilters } from "../_components/reports-filters"
import type { ReportStatus, ReportReason } from "@/actions/admin/moderation-types"

type SearchParams = Promise<{
  status?: string
  reason?: string
  page?: string
}>

async function PhotoStats() {
  const stats = await getReportStats("photo")

  const cards = [
    { title: "En attente", value: stats.pending, icon: Clock, iconColor: "text-yellow-600" },
    { title: "Supprimées", value: stats.removed, icon: Trash2, iconColor: "text-orange-600" },
    { title: "Avertis", value: stats.warned, icon: AlertTriangle, iconColor: "text-yellow-600" },
    { title: "Bannis", value: stats.banned, icon: Ban, iconColor: "text-red-600" },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className={`h-4 w-4 ${card.iconColor}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
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
            <Skeleton className="h-4 w-4" />
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
        <Skeleton className="h-6 w-48" />
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="border rounded-lg overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <div className="p-3 space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default async function PhotosPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const admin = await getCurrentAdmin()
  if (!admin) {
    redirect("/login")
  }

  const canViewReports = await checkAdminAction(admin.id, "view_reports")
  if (!canViewReports) {
    redirect("/dashboard")
  }

  const canModerate = await checkAdminAction(admin.id, "moderate_content")
  const params = await searchParams
  const page = parseInt(params.page || "1")
  const status = params.status as ReportStatus | "all" | undefined
  const reason = params.reason as ReportReason | "all" | undefined

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/moderation">Modération</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Photos signalées</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <main className="flex-1 p-6">
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Link href="/moderation">
                <Button variant="ghost" size="sm" className="-ml-2">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Retour
                </Button>
              </Link>
            </div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <ImageIcon className="h-8 w-8" />
              Photos signalées
            </h1>
            <p className="text-muted-foreground">
              Examinez les photos inappropriées signalées par les utilisateurs
            </p>
          </div>

          <Suspense fallback={<StatsSkeleton />}>
            <PhotoStats />
          </Suspense>

          <ReportsFilters
            basePath="/moderation/photos"
            status={status}
            reason={reason}
          />

          <Suspense fallback={<TableSkeleton />}>
            <PhotosTable
              page={page}
              status={status}
              reason={reason}
              canModerate={canModerate}
            />
          </Suspense>
        </div>
      </main>
    </>
  )
}
