import { Suspense } from "react"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, Ticket } from "lucide-react"

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
import { checkAdminAction } from "@/actions/admin/roles.action"
import { getSupportStats, getAssignableAdmins, type TicketFilters } from "@/actions/admin/support"
import { TicketsTable } from "./tickets-table"
import { TicketsFilters } from "./tickets-filters"
import { Pagination } from "./pagination"
import { RefreshButton } from "@/components/backoffice/refresh-button"

type SearchParams = Promise<{
  page?: string
  status?: string
  priority?: string
  category?: string
  assigned_to?: string
  search?: string
}>

async function TicketsStats() {
  const stats = await getSupportStats()

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">En attente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.pending}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">En cours</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.inProgress}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Résolus</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.resolved}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Non assignés</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.unassigned}</div>
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
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              <Skeleton className="h-6 w-16" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default async function TicketsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const admin = await getCurrentAdmin()
  if (!admin) {
    redirect("/login")
  }

  const canViewTickets = await checkAdminAction(admin.id, "view_tickets")
  if (!canViewTickets) {
    redirect("/dashboard")
  }

  const canManageTickets = await checkAdminAction(admin.id, "manage_tickets")
  const params = await searchParams
  const page = parseInt(params.page || "1", 10)

  const filters: TicketFilters = {
    status: (params.status as TicketFilters["status"]) || undefined,
    priority: (params.priority as TicketFilters["priority"]) || undefined,
    category: (params.category as TicketFilters["category"]) || undefined,
    assigned_to: params.assigned_to || undefined,
    search: params.search || undefined,
  }

  const admins = await getAssignableAdmins()

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/support">Support</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Tickets</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <RefreshButton />
      </header>

      <main className="flex-1 p-6">
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Link href="/support">
                <Button variant="ghost" size="sm" className="-ml-2">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Retour
                </Button>
              </Link>
            </div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Ticket className="h-8 w-8" />
              Tickets
            </h1>
            <p className="text-muted-foreground">
              Liste de tous les tickets de support
            </p>
          </div>

          <Suspense fallback={<StatsSkeleton />}>
            <TicketsStats />
          </Suspense>

          <TicketsFilters filters={filters} admins={admins} />

          <Suspense fallback={<TableSkeleton />}>
            <TicketsTable
              page={page}
              filters={filters}
              canManage={canManageTickets}
              currentAdminId={admin.id}
            />
          </Suspense>

          <Suspense fallback={<Skeleton className="h-10 w-full" />}>
            <Pagination page={page} filters={filters} />
          </Suspense>
        </div>
      </main>
    </>
  )
}
