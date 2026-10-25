import { Suspense } from "react"
import { redirect } from "next/navigation"
import Link from "next/link"
import { IdCard, Clock, CheckCircle, XCircle, ChevronLeft } from "lucide-react"

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
import { checkAdminAction } from "@/lib/auth/admin-guard"
import { getVerificationStats } from "@/actions/admin/verifications.action"
import { VerificationsTable } from "./verifications-table"
import { VerificationsFilters } from "./verifications-filters"
import { RefreshButton } from "@/components/backoffice/refresh-button"

type SearchParams = Promise<{
  status?: string
  page?: string
}>

async function VerificationStats() {
  const stats = await getVerificationStats()

  const cards = [
    {
      title: "En attente",
      value: stats.pending,
      icon: Clock,
      iconColor: "text-yellow-600",
    },
    {
      title: "Approuvées",
      value: stats.approved,
      icon: CheckCircle,
      iconColor: "text-green-600",
    },
    {
      title: "Rejetées",
      value: stats.rejected,
      icon: XCircle,
      iconColor: "text-red-600",
    },
    {
      title: "Total",
      value: stats.total,
      icon: IdCard,
      iconColor: "text-blue-600",
    },
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
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
              <Skeleton className="h-16 w-16 rounded" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-8 w-24" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default async function VerificationsPage({
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
  const status = params.status as "pending" | "approved" | "rejected" | "all" | undefined

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
              <BreadcrumbPage>Vérifications CIN</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <RefreshButton />
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
              <IdCard className="h-8 w-8" />
              Vérifications d&apos;identité
            </h1>
            <p className="text-muted-foreground">
              Examinez les demandes de vérification CIN des utilisateurs
            </p>
          </div>

          <Suspense fallback={<StatsSkeleton />}>
            <VerificationStats />
          </Suspense>

          <VerificationsFilters status={status} />

          <Suspense fallback={<TableSkeleton />}>
            <VerificationsTable
              page={page}
              status={status}
              canModerate={canModerate}
            />
          </Suspense>
        </div>
      </main>
    </>
  )
}
