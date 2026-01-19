import { Suspense } from "react"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Settings, Activity, Shield, Clock } from "lucide-react"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { getCurrentAdmin } from "@/actions/admin/auth.action"
import { getActivityStats } from "@/actions/admin/settings"
import { RefreshButton } from "@/components/backoffice/refresh-button"

async function ActivitySummary() {
  const stats = await getActivityStats()

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Actions aujourd&apos;hui</CardTitle>
          <Clock className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.todayCount}</div>
          <p className="text-xs text-muted-foreground">activités enregistrées</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Cette semaine</CardTitle>
          <Activity className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.weekCount}</div>
          <p className="text-xs text-muted-foreground">activités enregistrées</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total historique</CardTitle>
          <Shield className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <p className="text-xs text-muted-foreground">entrées dans le journal</p>
        </CardContent>
      </Card>
    </div>
  )
}

function SummarySkeleton() {
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

const settingsLinks = [
  {
    title: "Journal d'activité",
    description: "Consultez l'historique complet des actions administratives",
    icon: Activity,
    href: "/settings/logs",
    color: "bg-blue-500/10 text-blue-600",
  },
]

export default async function SettingsPage() {
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
              <BreadcrumbPage>Paramètres</BreadcrumbPage>
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
                <Settings className="h-8 w-8" />
                Paramètres
              </h1>
              <p className="text-muted-foreground">
                Configuration et journal d&apos;activité du back office
              </p>
            </div>
          </div>

          <Suspense fallback={<SummarySkeleton />}>
            <ActivitySummary />
          </Suspense>

          <div className="grid gap-4 md:grid-cols-2">
            {settingsLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                  <CardHeader className="flex flex-row items-start gap-4">
                    <div className={`p-2 rounded-lg ${link.color}`}>
                      <link.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{link.title}</CardTitle>
                      <CardDescription>{link.description}</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
