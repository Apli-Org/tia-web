"use client"

import { useState, useEffect } from "react"
import { Eye, MousePointerClick, Users, TrendingUp, Loader2 } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAdvertisementStats } from "@/actions/admin/advertisements.action"
import type { AdvertisementWithStats, AdStats } from "@/lib/types/advertisements.types"

type AdStatsModalProps = {
  isOpen: boolean
  onClose: () => void
  ad: AdvertisementWithStats
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function AdStatsModal({ isOpen, onClose, ad }: AdStatsModalProps) {
  const [stats, setStats] = useState<AdStats | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setLoading(true)
      getAdvertisementStats(ad.id)
        .then((data) => setStats(data))
        .catch(console.error)
        .finally(() => setLoading(false))
    }
  }, [isOpen, ad.id])

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Statistiques: {ad.title}</DialogTitle>
          <DialogDescription>
            Performances et métriques détaillées de cette publicité
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : stats ? (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Eye className="h-4 w-4 text-blue-600" />
                    Impressions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.total_impressions.toLocaleString("fr-FR")}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {stats.unique_impressions} uniques
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <MousePointerClick className="h-4 w-4 text-green-600" />
                    Clics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.total_clicks.toLocaleString("fr-FR")}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {stats.unique_clicks} uniques
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-purple-600" />
                    CTR
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.ctr.toFixed(2)}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Taux de clics
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Users className="h-4 w-4 text-amber-600" />
                    Utilisateurs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {ad.unique_users.toLocaleString("fr-FR")}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Ont cliqué
                  </p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="clicks" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="clicks">Derniers clics</TabsTrigger>
                <TabsTrigger value="referrers">Top sources</TabsTrigger>
                <TabsTrigger value="daily">Par jour</TabsTrigger>
              </TabsList>

              <TabsContent value="clicks" className="space-y-4">
                {stats.recent_clicks.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Aucun clic enregistré
                  </div>
                ) : (
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {stats.recent_clicks.map((click) => (
                      <div
                        key={click.id}
                        className="flex items-center justify-between p-3 rounded-lg border"
                      >
                        <div>
                          <p className="font-medium">
                            {click.user?.full_name || click.user?.email || "Visiteur anonyme"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(click.created_at)}
                          </p>
                        </div>
                        {click.referrer && (
                          <Badge variant="outline" className="text-xs truncate max-w-32">
                            {new URL(click.referrer).hostname}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="referrers" className="space-y-4">
                {stats.top_referrers.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Aucune source de trafic enregistrée
                  </div>
                ) : (
                  <div className="space-y-2">
                    {stats.top_referrers.map((ref, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg border"
                      >
                        <span className="text-sm truncate max-w-80">
                          {ref.referrer}
                        </span>
                        <Badge variant="secondary">
                          {ref.count} clic{ref.count > 1 ? "s" : ""}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="daily" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Eye className="h-4 w-4" /> Impressions par jour
                    </h4>
                    {stats.impressions_by_day.length === 0 ? (
                      <p className="text-sm text-muted-foreground">Aucune donnée</p>
                    ) : (
                      <div className="space-y-1 max-h-48 overflow-y-auto">
                        {stats.impressions_by_day.slice(-7).reverse().map((day) => (
                          <div key={day.date} className="flex justify-between text-sm">
                            <span>{new Date(day.date).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })}</span>
                            <span className="font-medium">{day.count}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <MousePointerClick className="h-4 w-4" /> Clics par jour
                    </h4>
                    {stats.clicks_by_day.length === 0 ? (
                      <p className="text-sm text-muted-foreground">Aucune donnée</p>
                    ) : (
                      <div className="space-y-1 max-h-48 overflow-y-auto">
                        {stats.clicks_by_day.slice(-7).reverse().map((day) => (
                          <div key={day.date} className="flex justify-between text-sm">
                            <span>{new Date(day.date).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })}</span>
                            <span className="font-medium">{day.count}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            Impossible de charger les statistiques
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
