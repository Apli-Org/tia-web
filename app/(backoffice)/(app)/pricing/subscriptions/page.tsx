import { Suspense } from "react"
import { redirect } from "next/navigation"
import Link from "next/link"
import { CreditCard, ChevronLeft } from "lucide-react"

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
import { Skeleton } from "@/components/ui/skeleton"
import { getSubscriptionPricing, getTestMode } from "@/actions/admin/pricing.action"
import { getCurrentAdmin } from "@/actions/admin/auth.action"
import { checkAdminAction } from "@/actions/admin/roles.action"
import { SubscriptionGrid } from "./subscription-grid"
import { TestModeToggle } from "./test-mode-toggle"
import { TestModeBanner } from "./test-mode-banner"
import { RefreshButton } from "@/components/backoffice/refresh-button"

async function SubscriptionsContent() {
  const pricing = await getSubscriptionPricing()

  // Group by tier
  const silverPricing = pricing.filter((p) => p.tier === "silver")
  const goldPricing = pricing.filter((p) => p.tier === "gold")
  const elitePricing = pricing.filter((p) => p.tier === "elite")

  return (
    <div className="space-y-8">
      <SubscriptionGrid
        tier="silver"
        label="Silver"
        description="Pour ceux qui veulent plus de choix"
        pricing={silverPricing}
        color="slate"
      />

      <SubscriptionGrid
        tier="gold"
        label="Gold"
        description="L'expérience premium complète"
        pricing={goldPricing}
        color="amber"
      />

      <SubscriptionGrid
        tier="elite"
        label="Elite"
        description="Le meilleur de Tia, sans compromis"
        pricing={elitePricing}
        color="purple"
      />
    </div>
  )
}

function SubscriptionsSkeleton() {
  return (
    <div className="space-y-8">
      {[1, 2, 3].map((tier) => (
        <div key={tier} className="space-y-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded" />
            <Skeleton className="h-6 w-24" />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64 rounded-lg" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default async function SubscriptionsPage() {
  const admin = await getCurrentAdmin()
  if (!admin) {
    redirect("/login")
  }

  const canViewPricing = await checkAdminAction(admin.id, "view_pricing")
  if (!canViewPricing) {
    redirect("/dashboard")
  }

  const testModeEnabled = await getTestMode()

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/pricing">Gestion des Prix</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Abonnements</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <RefreshButton />
      </header>

      <main className="flex-1 p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Link href="/pricing">
                  <Button variant="ghost" size="sm" className="-ml-2">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Retour
                  </Button>
                </Link>
              </div>
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                <CreditCard className="h-8 w-8 text-blue-600" />
                Abonnements
              </h1>
              <p className="text-muted-foreground">
                Configurez les prix des abonnements Silver, Gold et Elite
              </p>
            </div>
            <TestModeToggle initialEnabled={testModeEnabled} adminId={admin.id} />
          </div>

          <TestModeBanner enabled={testModeEnabled} />

          <Suspense fallback={<SubscriptionsSkeleton />}>
            <SubscriptionsContent />
          </Suspense>
        </div>
      </main>
    </>
  )
}
