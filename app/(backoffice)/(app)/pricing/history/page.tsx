import { Suspense } from "react"
import { redirect } from "next/navigation"
import Link from "next/link"
import { History, ChevronLeft, ArrowUp, ArrowDown, Plus, Power, Trash2 } from "lucide-react"

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
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { getAllPricingHistory } from "@/actions/admin/pricing.action"
import { getCurrentAdmin } from "@/actions/admin/auth.action"
import { checkAdminAction } from "@/actions/admin/roles.action"
import { formatPrice } from "@/lib/pricing-utils"

type SearchParams = Promise<{
  page?: string
}>

function getActionBadge(action: string) {
  switch (action) {
    case "created":
      return (
        <Badge className="bg-green-100 text-green-700">
          <Plus className="h-3 w-3 mr-1" />
          Créé
        </Badge>
      )
    case "updated":
      return (
        <Badge className="bg-blue-100 text-blue-700">
          <ArrowUp className="h-3 w-3 mr-1" />
          Modifié
        </Badge>
      )
    case "activated":
      return (
        <Badge className="bg-emerald-100 text-emerald-700">
          <Power className="h-3 w-3 mr-1" />
          Activé
        </Badge>
      )
    case "deactivated":
      return (
        <Badge className="bg-orange-100 text-orange-700">
          <Power className="h-3 w-3 mr-1" />
          Désactivé
        </Badge>
      )
    case "deleted":
      return (
        <Badge className="bg-red-100 text-red-700">
          <Trash2 className="h-3 w-3 mr-1" />
          Supprimé
        </Badge>
      )
    default:
      return <Badge variant="secondary">{action}</Badge>
  }
}

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(dateString))
}

async function HistoryContent({ page }: { page: number }) {
  const { history, total } = await getAllPricingHistory(page, 20)
  const totalPages = Math.ceil(total / 20)

  if (history.length === 0) {
    return (
      <Card>
        <CardContent className="py-10 text-center text-muted-foreground">
          Aucune modification de prix pour le moment
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {total} modification{total > 1 ? "s" : ""} enregistrée{total > 1 ? "s" : ""}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {history.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 p-4 rounded-lg border bg-card"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    {getActionBadge(item.action)}
                    <span className="font-medium">
                      {(item as unknown as { pricing?: { name: string } }).pricing?.name ?? "Produit supprimé"}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ({(item as unknown as { pricing?: { product_code: string } }).pricing?.product_code})
                    </span>
                  </div>

                  {item.action === "updated" &&
                    item.previous_price !== null &&
                    item.new_price !== null &&
                    item.previous_price !== item.new_price && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">Prix:</span>
                        <span className="line-through text-muted-foreground">
                          {formatPrice(item.previous_price)}
                        </span>
                        {item.new_price > item.previous_price ? (
                          <ArrowUp className="h-4 w-4 text-red-500" />
                        ) : (
                          <ArrowDown className="h-4 w-4 text-green-500" />
                        )}
                        <span className="font-medium">{formatPrice(item.new_price)}</span>
                        <span
                          className={`text-xs ${
                            item.new_price > item.previous_price
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          (
                          {item.new_price > item.previous_price ? "+" : ""}
                          {Math.round(
                            ((item.new_price - item.previous_price) / item.previous_price) *
                              100
                          )}
                          %)
                        </span>
                      </div>
                    )}

                  {item.change_reason && (
                    <p className="text-sm text-muted-foreground">
                      Raison: {item.change_reason}
                    </p>
                  )}

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>
                      Par {item.admin?.full_name ?? item.admin?.email ?? "Système"}
                    </span>
                    <span>•</span>
                    <span>{formatDate(item.created_at)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Page {page} sur {totalPages}
          </p>
          <div className="flex gap-2">
            {page > 1 && (
              <Link href={`/pricing/history?page=${page - 1}`}>
                <Button variant="outline" size="sm">
                  Précédent
                </Button>
              </Link>
            )}
            {page < totalPages && (
              <Link href={`/pricing/history?page=${page + 1}`}>
                <Button variant="outline" size="sm">
                  Suivant
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function HistorySkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-48" />
      </CardHeader>
      <CardContent className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-start gap-4 p-4 rounded-lg border">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-32" />
              </div>
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-3 w-40" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default async function PricingHistoryPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const admin = await getCurrentAdmin()
  if (!admin) {
    redirect("/login")
  }

  const canViewPricing = await checkAdminAction(admin.id, "view_pricing")
  if (!canViewPricing) {
    redirect("/dashboard")
  }

  const params = await searchParams
  const page = parseInt(params.page ?? "1")

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
              <BreadcrumbPage>Historique</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
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
                <History className="h-8 w-8 text-slate-600" />
                Historique des Prix
              </h1>
              <p className="text-muted-foreground">
                Consultez toutes les modifications de tarifs
              </p>
            </div>
          </div>

          <Suspense fallback={<HistorySkeleton />}>
            <HistoryContent page={page} />
          </Suspense>
        </div>
      </main>
    </>
  )
}
