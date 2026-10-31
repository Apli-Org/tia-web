import { Suspense } from "react"
import { redirect } from "next/navigation"
import { AlertTriangle, Heart, Users, Wallet } from "lucide-react"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { LiveRefresh } from "@/components/backoffice/live-refresh"
import { getCurrentAdmin } from "@/actions/admin/auth.action"
import { checkAdminAction } from "@/lib/auth/admin-guard"
import { roleLabels } from "@/lib/staff-utils"
import {
  getDashboardKPIs,
  getGrowthData,
  getRecentActivity,
  getTierDistribution,
} from "@/actions/admin/dashboard.action"
import { ChartTileSkeleton, KpiTilesSkeleton, ListTileSkeleton } from "./_components/dashboard-skeletons"
import { GrowthChart } from "./_components/growth-chart"
import { KpiTile, type KpiTileStyle } from "./_components/kpi-tile"
import { QuickAccess } from "./_components/quick-access"
import { RecentActivity } from "./_components/recent-activity"
import { TierDistribution } from "./_components/tier-distribution"
import { WelcomeTile } from "./_components/welcome-tile"

const ROLE_LABELS: Record<string, string> = roleLabels
const REPORTS_ALERT_THRESHOLD = 10
const FALLBACK_FIRST_NAME = "l'équipe"

const KPI_STYLES: Record<"users" | "matches" | "revenue" | "reports", KpiTileStyle> = {
  users: { tone: "light", chip: "bg-tia-violet-100 text-tia-violet-600" },
  matches: { tone: "light", chip: "bg-tia-coral-50 text-tia-coral-600" },
  revenue: { tone: "ink", chip: "bg-tia-plum-50/12 text-tia-violet-200" },
  reports: { tone: "light", chip: "bg-tia-coral-100 text-tia-coral-700" },
}

const GRID_SPANS = {
  welcome: "sm:col-span-2 lg:row-span-2",
  chart: "sm:col-span-2 lg:col-span-3",
  tiers: "sm:col-span-2 lg:col-span-1",
  activity: "sm:col-span-2",
  quickAccess: "sm:col-span-2",
}

async function KpiTiles() {
  const kpis = await getDashboardKPIs()

  return (
    <>
      <KpiTile
        label="Membres"
        value={kpis.activeUsers.total}
        caption="vs mois dernier"
        icon={Users}
        tileStyle={KPI_STYLES.users}
        trend={{ direction: kpis.activeUsers.trend, change: kpis.activeUsers.change }}
        delayStep={1}
      />
      <KpiTile
        label="Matchs du jour"
        value={kpis.matchesToday.total}
        format="compact"
        caption="vs hier"
        icon={Heart}
        tileStyle={KPI_STYLES.matches}
        trend={{ direction: kpis.matchesToday.trend, change: kpis.matchesToday.change }}
        delayStep={2}
      />
      <KpiTile
        label="Revenus du mois"
        value={kpis.monthlyRevenue.total}
        format="price"
        caption="vs mois dernier"
        icon={Wallet}
        tileStyle={KPI_STYLES.revenue}
        trend={{ direction: kpis.monthlyRevenue.trend, change: kpis.monthlyRevenue.change }}
        delayStep={3}
      />
      <KpiTile
        label="Signalements"
        value={kpis.pendingReports.total}
        caption="en attente de modération"
        icon={AlertTriangle}
        tileStyle={KPI_STYLES.reports}
        href="/moderation"
        isUrgent={kpis.pendingReports.total > REPORTS_ALERT_THRESHOLD}
        delayStep={4}
      />
    </>
  )
}

async function GrowthTile() {
  const data = await getGrowthData()
  return <GrowthChart data={data} delayStep={5} className={GRID_SPANS.chart} />
}

async function TiersTile() {
  const counts = await getTierDistribution()
  return <TierDistribution counts={counts} delayStep={6} className={GRID_SPANS.tiers} />
}

async function ActivityTile() {
  const activities = await getRecentActivity()
  return <RecentActivity activities={activities} delayStep={7} className={GRID_SPANS.activity} />
}

export default async function DashboardPage() {
  const admin = await getCurrentAdmin()
  if (!admin) {
    redirect("/login")
  }

  const canViewDashboard = await checkAdminAction(admin.id, "view_dashboard")
  if (!canViewDashboard) {
    redirect("/login")
  }

  const firstName = admin.full_name?.split(" ")[0] || FALLBACK_FIRST_NAME

  return (
    <>
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b border-tia-plum-200/70 bg-background/80 px-4 backdrop-blur-md">
        <SidebarTrigger className="-ml-1 rounded-xl" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="font-bold">Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <LiveRefresh className="ml-auto" />
      </header>

      <main className="flex-1 p-3 sm:p-4 lg:p-6">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          <WelcomeTile
            firstName={firstName}
            roleLabel={ROLE_LABELS[admin.role] ?? admin.role}
            className={GRID_SPANS.welcome}
          />

          <Suspense fallback={<KpiTilesSkeleton />}>
            <KpiTiles />
          </Suspense>

          <Suspense fallback={<ChartTileSkeleton className={GRID_SPANS.chart} />}>
            <GrowthTile />
          </Suspense>

          <Suspense fallback={<ListTileSkeleton className={GRID_SPANS.tiers} />}>
            <TiersTile />
          </Suspense>

          <Suspense fallback={<ListTileSkeleton className={GRID_SPANS.activity} />}>
            <ActivityTile />
          </Suspense>

          <QuickAccess actions={admin.actions} delayStep={8} className={GRID_SPANS.quickAccess} />
        </div>
      </main>
    </>
  )
}
