import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"
import { Clock, CheckCircle, Trash2, AlertTriangle, Ban, User } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getReportsByType } from "@/actions/admin/reports.action"
import { getReasonLabel } from "@/actions/admin/moderation-types"
import type { ReportStatus, ReportReason } from "@/actions/admin/moderation-types"
import { ReportActions } from "../_components/report-actions"
import { ReportsPagination } from "../_components/reports-pagination"

type Props = {
  page: number
  status?: ReportStatus | "all"
  reason?: ReportReason | "all"
  canModerate: boolean
}

function getStatusBadge(status: ReportStatus) {
  switch (status) {
    case "pending":
      return (
        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-200">
          <Clock className="h-3 w-3 mr-1" />
          En attente
        </Badge>
      )
    case "reviewing":
      return (
        <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-200">
          En cours
        </Badge>
      )
    case "approved":
      return (
        <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200">
          <CheckCircle className="h-3 w-3 mr-1" />
          Faux signalement
        </Badge>
      )
    case "removed":
      return (
        <Badge variant="outline" className="bg-orange-500/10 text-orange-600 border-orange-200">
          <Trash2 className="h-3 w-3 mr-1" />
          Supprimé
        </Badge>
      )
    case "user_warned":
      return (
        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-200">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Averti
        </Badge>
      )
    case "user_banned":
      return (
        <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-200">
          <Ban className="h-3 w-3 mr-1" />
          Banni
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

function getInitials(name: string | null | undefined): string {
  if (!name) return "?"
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export async function ProfilesTable({ page, status, reason, canModerate }: Props) {
  const filters = {
    status: status && status !== "all" ? status : undefined,
    reason: reason && reason !== "all" ? reason : undefined,
  }

  const { reports, total, totalPages } = await getReportsByType("profile", page, 20, filters)

  if (reports.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <User className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Aucun profil signalé trouvé</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Profils signalés
          <span className="text-muted-foreground font-normal ml-2">
            ({total.toLocaleString("fr-FR")})
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={report.reported_user?.profilePhoto || undefined} />
                <AvatarFallback>
                  {getInitials(report.reported_user?.firstName)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">
                    {report.reported_user?.firstName || "Inconnu"}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {getReasonLabel(report.reason)}
                  </Badge>
                  {getStatusBadge(report.status)}
                </div>

                <p className="text-sm text-muted-foreground truncate mb-2">
                  {report.reported_user?.email}
                </p>

                {report.details && (
                  <p className="text-sm text-muted-foreground bg-muted/50 rounded p-2 mb-2">
                    {report.details}
                  </p>
                )}

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>
                    Signalé par {report.reporter?.firstName || "Anonyme"}
                  </span>
                  <span>
                    {report.created_at
                      ? formatDistanceToNow(new Date(report.created_at), {
                          addSuffix: true,
                          locale: fr,
                        })
                      : "date inconnue"}
                  </span>
                </div>
              </div>

              <ReportActions report={report} canModerate={canModerate} />
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <ReportsPagination
            basePath="/moderation/profiles"
            page={page}
            totalPages={totalPages}
            status={status}
            reason={reason}
          />
        )}
      </CardContent>
    </Card>
  )
}
