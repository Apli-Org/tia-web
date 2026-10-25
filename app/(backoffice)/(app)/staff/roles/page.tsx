import { Suspense } from "react"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Shield, ShieldCheck, ShieldPlus, Key, ChevronLeft } from "lucide-react"

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
import { getRolesStats } from "@/actions/admin/roles.action"
import { checkAdminAction } from "@/lib/auth/admin-guard"
import { RolesTable } from "./roles-table"
import { CreateRoleButton } from "./create-role-button"
import { RefreshButton } from "@/components/backoffice/refresh-button"

async function RolesStats() {
  const stats = await getRolesStats()

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Rôles</CardTitle>
          <Shield className="h-4 w-4 text-slate-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <p className="text-xs text-muted-foreground">rôles configurés</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Rôles Système</CardTitle>
          <ShieldCheck className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.system}</div>
          <p className="text-xs text-muted-foreground">non supprimables</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Rôles Custom</CardTitle>
          <ShieldPlus className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.custom}</div>
          <p className="text-xs text-muted-foreground">créés par admin</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Actions</CardTitle>
          <Key className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalActions}</div>
          <p className="text-xs text-muted-foreground">permissions disponibles</p>
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
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-12" />
            <Skeleton className="h-3 w-20 mt-1" />
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
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-32" />
              </div>
              <Skeleton className="h-6 w-20" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default async function RolesPage() {
  const admin = await getCurrentAdmin()
  if (!admin) {
    redirect("/login")
  }

  const canManageRoles = await checkAdminAction(admin.id, "manage_roles")
  if (!canManageRoles) {
    redirect("/dashboard")
  }

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/staff">Personnel</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Gestion des Rôles</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <RefreshButton />
      </header>

      <main className="flex-1 p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Link href="/staff">
              <Button variant="ghost" size="sm" className="-ml-2">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Retour
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Gestion des Rôles</h1>
              <p className="text-muted-foreground">
                Créez et gérez les rôles et leurs permissions
              </p>
            </div>
            <CreateRoleButton />
          </div>

          <Suspense fallback={<StatsSkeleton />}>
            <RolesStats />
          </Suspense>

          <Suspense fallback={<TableSkeleton />}>
            <RolesTable />
          </Suspense>
        </div>
      </main>
    </>
  )
}
