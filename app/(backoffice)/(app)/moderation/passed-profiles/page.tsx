import { Suspense } from "react"
import { redirect } from "next/navigation"
import { Timer, Users, Trash2, Clock } from "lucide-react"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { getCurrentAdmin } from "@/actions/admin/auth.action"
import { getCronSettings, getPassedProfilesStats } from "@/actions/admin/cron.action"
import { CronConfigForm } from "./cron-config-form"
import { RefreshButton } from "@/components/backoffice/refresh-button"

async function CronStats({ adminId }: { adminId: string }) {
  const [settings, stats] = await Promise.all([
    getCronSettings(),
    getPassedProfilesStats(),
  ])

  return (
    <>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profils passés</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPassed}</div>
            <p className="text-xs text-muted-foreground">profils à traiter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">A réinitialiser</CardTitle>
            <Trash2 className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.toBeReset}</div>
            <p className="text-xs text-muted-foreground">profils en attente</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Période</CardTitle>
            <Clock className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.resetDays}</div>
            <p className="text-xs text-muted-foreground">jours</p>
          </CardContent>
        </Card>
      </div>

      <CronConfigForm settings={settings} stats={stats} adminId={adminId} />
    </>
  )
}

function CronStatsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-12" />
            <Skeleton className="h-3 w-28 mt-1" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default async function CronPage() {
  const admin = await getCurrentAdmin()
  if (!admin) {
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
              <BreadcrumbLink href="/moderation">Modération</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Profils passés</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <RefreshButton />
      </header>

      <main className="flex-1 p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <Timer className="h-8 w-8" />
                Profils passés
              </h1>
              <p className="text-muted-foreground">
                Réinitialisation automatique des profils passés par les utilisateurs
              </p>
            </div>
          </div>

          <Suspense fallback={<CronStatsSkeleton />}>
            <CronStats adminId={admin.id} />
          </Suspense>
        </div>
      </main>
    </>
  )
}
