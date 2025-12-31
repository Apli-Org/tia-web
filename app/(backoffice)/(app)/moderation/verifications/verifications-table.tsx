import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"
import { Clock, CheckCircle, XCircle } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getVerificationRequests } from "@/actions/admin/verifications.action"
import type { VerificationStatus } from "@/actions/admin/moderation-types"
import { VerificationActions } from "./verification-actions"
import { Pagination } from "./pagination"

type Props = {
  page: number
  status?: VerificationStatus | "all"
  canModerate: boolean
}

function getStatusBadge(status: VerificationStatus) {
  switch (status) {
    case "pending":
      return (
        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-200">
          <Clock className="h-3 w-3 mr-1" />
          En attente
        </Badge>
      )
    case "approved":
      return (
        <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200">
          <CheckCircle className="h-3 w-3 mr-1" />
          Approuvée
        </Badge>
      )
    case "rejected":
      return (
        <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-200">
          <XCircle className="h-3 w-3 mr-1" />
          Rejetée
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

export async function VerificationsTable({ page, status, canModerate }: Props) {
  const filters = {
    status: status && status !== "all" ? status : undefined,
  }

  const { requests, total, totalPages } = await getVerificationRequests(page, 20, filters)

  if (requests.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground">Aucune demande de vérification trouvée</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Demandes de vérification
          <span className="text-muted-foreground font-normal ml-2">
            ({total.toLocaleString("fr-FR")})
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {requests.map((request) => (
            <div
              key={request.id}
              className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={request.user?.profilePhoto || undefined} />
                <AvatarFallback>
                  {getInitials(request.user?.firstName)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium truncate">
                    {request.user?.firstName || "Utilisateur inconnu"}
                  </span>
                  {getStatusBadge(request.status)}
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {request.user?.email}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Soumis{" "}
                  {request.submitted_at
                    ? formatDistanceToNow(new Date(request.submitted_at), {
                        addSuffix: true,
                        locale: fr,
                      })
                    : "date inconnue"}
                </p>
                {request.rejection_reason && (
                  <p className="text-xs text-red-600 mt-1">
                    Raison du rejet : {request.rejection_reason}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <div className="relative h-16 w-24 rounded border overflow-hidden">
                  <Image
                    src={request.cin_photo_url}
                    alt="CIN"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                {request.selfie_photo_url && (
                  <div className="relative h-16 w-16 rounded border overflow-hidden">
                    <Image
                      src={request.selfie_photo_url}
                      alt="Selfie"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                )}
              </div>

              <VerificationActions
                request={request}
                canModerate={canModerate}
              />
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            status={status}
          />
        )}
      </CardContent>
    </Card>
  )
}
