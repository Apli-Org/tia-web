import Image from "next/image"
import { ImageIcon, Video } from "lucide-react"
import { getAdvertisements } from "@/actions/admin/advertisements.action"
import type { AdvertisementFilters } from "@/lib/types/advertisements.types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { AdActions } from "./ad-actions"
import { Pagination } from "./pagination"

type AdsTableProps = {
  page: number
  filters: {
    search?: string
    status?: "all" | "active" | "inactive"
  }
  canManage: boolean
}

function getStatusBadge(ad: { is_active: boolean }) {
  if (ad.is_active) {
    return (
      <Badge variant="secondary" className="bg-green-100 text-green-700">
        Active
      </Badge>
    )
  }

  return (
    <Badge variant="secondary" className="bg-red-100 text-red-700">
      Inactive
    </Badge>
  )
}

function formatDate(dateString: string | null): string {
  if (!dateString) return "-"
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export async function AdsTable({
  page,
  filters,
  canManage,
}: AdsTableProps) {
  const queryFilters: AdvertisementFilters = {
    page,
    limit: 10,
    search: filters.search,
    status: filters.status,
  }

  const { data: ads, total, totalPages } = await getAdvertisements(queryFilters)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Liste des Publicités ({total})</CardTitle>
      </CardHeader>
      <CardContent>
        {ads.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Aucune publicité trouvée
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-24">Média</TableHead>
                  <TableHead>Titre</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Période</TableHead>
                  <TableHead className="text-right">Impressions</TableHead>
                  <TableHead className="text-right">Clics</TableHead>
                  <TableHead className="text-right">CTR</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ads.map((ad) => (
                  <TableRow key={ad.id}>
                    <TableCell>
                      <div className="relative h-16 w-24 overflow-hidden rounded-md border bg-muted">
                        {ad.media_type === "video" && ad.video_url ? (
                          <video
                            src={ad.video_url}
                            className="w-full h-full object-cover"
                            muted
                          />
                        ) : ad.image_url ? (
                          <Image
                            src={ad.image_url}
                            alt={ad.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{ad.title}</span>
                        {ad.description && (
                          <span className="text-xs text-muted-foreground truncate max-w-48">
                            {ad.description}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="flex items-center gap-1 w-fit">
                        {ad.media_type === "video" ? (
                          <>
                            <Video className="h-3 w-3" />
                            Vidéo
                          </>
                        ) : (
                          <>
                            <ImageIcon className="h-3 w-3" />
                            Image
                          </>
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(ad)}</TableCell>
                    <TableCell>
                      <div className="flex flex-col text-sm">
                        <span>Du: {formatDate(ad.start_date)}</span>
                        <span>Au: {formatDate(ad.end_date)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-medium">
                        {ad.impressions_count.toLocaleString("fr-FR")}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-medium">
                        {ad.clicks_count.toLocaleString("fr-FR")}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline" className="font-mono">
                        {ad.ctr.toFixed(2)}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <AdActions
                        ad={ad}
                        canManage={canManage}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {totalPages > 1 && (
              <div className="mt-4">
                <Pagination page={page} totalPages={totalPages} />
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
