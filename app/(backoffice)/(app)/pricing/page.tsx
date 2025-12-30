import { Suspense } from "react"
import Link from "next/link"
import {
  CreditCard,
  Sparkles,
  TrendingUp,
  Package,
  History,
  ArrowRight,
} from "lucide-react"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { getPricingStats } from "@/actions/admin/pricing.action"
import { formatPrice } from "@/lib/pricing-utils"

async function PricingStats() {
  const stats = await getPricingStats()

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Abonnements du mois</CardTitle>
          <CreditCard className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalSubscriptions}</div>
          <p className="text-xs text-muted-foreground">
            {formatPrice(stats.subscriptionRevenue)} de revenus
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Achats du mois</CardTitle>
          <Sparkles className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalMicroPurchases}</div>
          <p className="text-xs text-muted-foreground">
            {formatPrice(stats.consumableRevenue)} de revenus
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Revenus du mois</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatPrice(stats.subscriptionRevenue + stats.consumableRevenue)}</div>
          <p className="text-xs text-muted-foreground">
            abo + microtransactions
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Catalogue</CardTitle>
          <Package className="h-4 w-4 text-slate-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeProducts}/{stats.totalProducts}</div>
          <p className="text-xs text-muted-foreground">
            produits actifs
          </p>
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
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-3 w-32 mt-1" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function PricingPage() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Gestion des Prix</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <main className="flex-1 p-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestion des Prix</h1>
            <p className="text-muted-foreground">
              Configurez les tarifs des abonnements et microtransactions
            </p>
          </div>

          <Suspense fallback={<StatsSkeleton />}>
            <PricingStats />
          </Suspense>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="hover:border-blue-500/50 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                  </div>
                  <CardTitle>Abonnements</CardTitle>
                </div>
                <CardDescription>
                  Gérez les prix des abonnements Silver, Gold et Elite
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/pricing/subscriptions">
                  <Button className="w-full">
                    Gérer les abonnements
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:border-purple-500/50 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-purple-100">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                  </div>
                  <CardTitle>Microtransactions</CardTitle>
                </div>
                <CardDescription>
                  Gérez les prix des TIA Hearts, Boosts et Révélations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/pricing/consumables">
                  <Button variant="outline" className="w-full">
                    Gérer les microtransactions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:border-slate-500/50 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-slate-100">
                    <History className="h-5 w-5 text-slate-600" />
                  </div>
                  <CardTitle>Historique</CardTitle>
                </div>
                <CardDescription>
                  Consultez l&apos;historique des modifications de prix
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/pricing/history">
                  <Button variant="outline" className="w-full">
                    Voir l&apos;historique
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  )
}
