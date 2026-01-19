import { Suspense } from "react"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Sparkles, ChevronLeft } from "lucide-react"

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
import { getConsumablePricing } from "@/actions/admin/pricing.action"
import { getCurrentAdmin } from "@/actions/admin/auth.action"
import { checkAdminAction } from "@/actions/admin/roles.action"
import { ConsumableGrid } from "./consumable-grid"
import { RefreshButton } from "@/components/backoffice/refresh-button"

async function ConsumablesContent() {
  const pricing = await getConsumablePricing()

  // Group by consumable type
  const tiaHearts = pricing.filter((p) => p.consumable_type === "tia_heart")
  const boosts = pricing.filter((p) => p.consumable_type === "boost")
  const revealLikes = pricing.filter((p) => p.consumable_type === "reveal_like")

  return (
    <div className="space-y-8">
      <ConsumableGrid
        type="tia_heart"
        label="TIA Hearts"
        description="Super Likes pour se démarquer"
        icon="💜"
        pricing={tiaHearts}
        color="pink"
      />

      <ConsumableGrid
        type="boost"
        label="Boosts"
        description="Apparaissez en tête du feed"
        icon="⚡"
        pricing={boosts}
        color="yellow"
      />

      <ConsumableGrid
        type="reveal_like"
        label="Révélations"
        description="Découvrez qui vous a liké"
        icon="👁️"
        pricing={revealLikes}
        color="blue"
      />
    </div>
  )
}

function ConsumablesSkeleton() {
  return (
    <div className="space-y-8">
      {[1, 2, 3].map((type) => (
        <div key={type} className="space-y-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded" />
            <Skeleton className="h-6 w-24" />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-48 rounded-lg" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default async function ConsumablesPage() {
  const admin = await getCurrentAdmin()
  if (!admin) {
    redirect("/login")
  }

  const canViewPricing = await checkAdminAction(admin.id, "view_pricing")
  if (!canViewPricing) {
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
              <BreadcrumbLink href="/pricing">Gestion des Prix</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Microtransactions</BreadcrumbPage>
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
                <Sparkles className="h-8 w-8 text-purple-600" />
                Microtransactions
              </h1>
              <p className="text-muted-foreground">
                Configurez les prix des TIA Hearts, Boosts et Révélations
              </p>
            </div>
          </div>

          <Suspense fallback={<ConsumablesSkeleton />}>
            <ConsumablesContent />
          </Suspense>
        </div>
      </main>
    </>
  )
}
