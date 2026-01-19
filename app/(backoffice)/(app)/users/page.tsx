import { Suspense } from "react"
import { redirect } from "next/navigation"
import {
  Users,
  UserCheck,
  Crown,
  Ban,
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
import { getUserStats } from "@/actions/admin/users.action"
import { getCurrentAdmin } from "@/actions/admin/auth.action"
import { checkAdminAction } from "@/actions/admin/roles.action"
import { UsersTable } from "./users-table"
import { UsersFilters } from "./users-filters"
import { RefreshButton } from "@/components/backoffice/refresh-button"

type SearchParams = Promise<{
  page?: string
  search?: string
  tier?: string
  status?: string
  verified?: string
  gender?: string
}>

async function UserStats() {
  const stats = await getUserStats()

  const statCards = [
    {
      title: "Total Utilisateurs",
      value: stats.total,
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Actifs",
      value: stats.active,
      icon: UserCheck,
      color: "text-green-600",
    },
    {
      title: "Premium",
      value: stats.premium,
      icon: Crown,
      color: "text-amber-600",
    },
    {
      title: "Bannis",
      value: stats.banned,
      icon: Ban,
      color: "text-red-600",
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
            <div className="text-2xl font-bold">{stat.value.toLocaleString("fr-FR")}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function UserStatsSkeleton() {
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

function UsersTableSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-48" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-20" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default async function UsersPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  // Check permission
  const admin = await getCurrentAdmin()
  if (!admin) {
    redirect("/login")
  }

  const canViewUsers = await checkAdminAction(admin.id, "view_users")
  if (!canViewUsers) {
    redirect("/dashboard")
  }

  // Check if user can modify (manage_users action)
  const canModify = await checkAdminAction(admin.id, "manage_users")

  const params = await searchParams
  const page = parseInt(params.page || "1")
  const filters = {
    search: params.search,
    tier: params.tier,
    status: params.status as "all" | "active" | "inactive" | "banned" | undefined,
    verified: params.verified as "all" | "verified" | "unverified" | undefined,
    gender: params.gender,
  }

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Utilisateurs</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <RefreshButton />
      </header>

      <main className="flex-1 p-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestion des Utilisateurs</h1>
            <p className="text-muted-foreground">
              Gérez les utilisateurs de la plateforme TIA
            </p>
          </div>

          <Suspense fallback={<UserStatsSkeleton />}>
            <UserStats />
          </Suspense>
        </div>

        {/* Sticky filters */}
        <div className="sticky top-0 z-10 bg-background py-4 -mx-6 px-6 border-b mb-6 mt-6">
          <UsersFilters filters={filters} />
        </div>

        <Suspense fallback={<UsersTableSkeleton />}>
          <UsersTable page={page} filters={filters} canModify={canModify} />
        </Suspense>
      </main>
    </>
  )
}
