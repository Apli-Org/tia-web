"use client"

import { useState, useTransition } from "react"
import Image from "next/image"
import {
  MoreHorizontal,
  Eye,
  CheckCircle,
  Trash2,
  AlertTriangle,
  Ban,
  Loader2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { reviewReport } from "@/actions/admin/reports.action"
import { getReasonLabel } from "@/actions/admin/moderation-types"
import type { ReportedContent, ReviewAction } from "@/actions/admin/moderation-types"

type Props = {
  report: ReportedContent
  canModerate: boolean
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

export function ReportActions({ report, canModerate }: Props) {
  const [isPending, startTransition] = useTransition()
  const [showDetail, setShowDetail] = useState(false)
  const [showActionDialog, setShowActionDialog] = useState(false)
  const [selectedAction, setSelectedAction] = useState<ReviewAction>("approve")
  const [adminNotes, setAdminNotes] = useState("")
  const [banDays, setBanDays] = useState("7")

  const handleAction = (action: ReviewAction) => {
    setSelectedAction(action)
    setShowActionDialog(true)
  }

  const handleSubmitAction = () => {
    startTransition(async () => {
      try {
        await reviewReport(
          report.id,
          selectedAction,
          adminNotes || undefined,
          selectedAction === "ban" ? parseInt(banDays) : undefined
        )
        setShowActionDialog(false)
        setAdminNotes("")
      } catch (error) {
        console.error("Error reviewing report:", error)
      }
    })
  }

  const isPendingStatus = report.status === "pending" || report.status === "reviewing"

  const getActionLabel = (action: ReviewAction) => {
    switch (action) {
      case "approve":
        return "Marquer comme faux signalement"
      case "remove":
        return "Supprimer le contenu"
      case "warn":
        return "Avertir l'utilisateur"
      case "ban":
        return "Bannir l'utilisateur"
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" disabled={isPending}>
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <MoreHorizontal className="h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setShowDetail(true)}>
            <Eye className="mr-2 h-4 w-4" />
            Voir les détails
          </DropdownMenuItem>

          {canModerate && isPendingStatus && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleAction("approve")}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Faux signalement
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleAction("remove")}
                className="text-orange-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Supprimer contenu
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleAction("warn")}
                className="text-yellow-600"
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                Avertir utilisateur
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleAction("ban")}
                className="text-red-600"
              >
                <Ban className="mr-2 h-4 w-4" />
                Bannir utilisateur
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showDetail} onOpenChange={setShowDetail}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Détails du signalement</DialogTitle>
            <DialogDescription>
              Signalement de type {report.content_type} pour{" "}
              <Badge variant="outline">{getReasonLabel(report.reason)}</Badge>
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <Label className="text-sm font-medium">Utilisateur signalé</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={report.reported_user?.profilePhoto || undefined} />
                    <AvatarFallback>
                      {getInitials(report.reported_user?.firstName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{report.reported_user?.firstName || "Inconnu"}</p>
                    <p className="text-sm text-muted-foreground">
                      {report.reported_user?.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <Label className="text-sm font-medium">Signalé par</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {getInitials(report.reporter?.firstName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{report.reporter?.firstName || "Inconnu"}</p>
                    <p className="text-sm text-muted-foreground">
                      {report.reporter?.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {report.content_url && report.content_type === "photo" && (
              <div>
                <Label className="text-sm font-medium">Contenu signalé</Label>
                <div className="relative h-64 w-full mt-2 rounded-lg border overflow-hidden bg-muted">
                  <Image
                    src={report.content_url}
                    alt="Contenu signalé"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </div>
            )}

            {report.details && (
              <div>
                <Label className="text-sm font-medium">Détails du signalement</Label>
                <p className="mt-1 text-sm bg-muted p-3 rounded">{report.details}</p>
              </div>
            )}

            {report.admin_notes && (
              <div>
                <Label className="text-sm font-medium">Notes admin</Label>
                <p className="mt-1 text-sm">{report.admin_notes}</p>
              </div>
            )}

            {report.reviewer && (
              <div>
                <Label className="text-sm font-medium">Traité par</Label>
                <p className="mt-1 text-sm">{report.reviewer.full_name}</p>
              </div>
            )}
          </div>

          {canModerate && isPendingStatus && (
            <DialogFooter className="flex-wrap gap-2">
              <Button variant="outline" onClick={() => handleAction("approve")}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Faux signalement
              </Button>
              <Button
                variant="outline"
                onClick={() => handleAction("remove")}
                className="text-orange-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Supprimer
              </Button>
              <Button
                variant="outline"
                onClick={() => handleAction("warn")}
                className="text-yellow-600"
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                Avertir
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleAction("ban")}
              >
                <Ban className="mr-2 h-4 w-4" />
                Bannir
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showActionDialog} onOpenChange={setShowActionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{getActionLabel(selectedAction)}</DialogTitle>
            <DialogDescription>
              Cette action sera enregistrée dans le journal d&apos;audit.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {selectedAction === "ban" && (
              <div className="grid gap-2">
                <Label htmlFor="banDays">Durée du bannissement</Label>
                <Select value={banDays} onValueChange={setBanDays}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 jour</SelectItem>
                    <SelectItem value="3">3 jours</SelectItem>
                    <SelectItem value="7">7 jours</SelectItem>
                    <SelectItem value="14">14 jours</SelectItem>
                    <SelectItem value="30">30 jours</SelectItem>
                    <SelectItem value="90">90 jours</SelectItem>
                    <SelectItem value="365">1 an</SelectItem>
                    <SelectItem value="3650">Permanent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="notes">Notes (optionnel)</Label>
              <Textarea
                id="notes"
                placeholder="Ajoutez des notes internes..."
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowActionDialog(false)}>
              Annuler
            </Button>
            <Button
              variant={selectedAction === "ban" ? "destructive" : "default"}
              onClick={handleSubmitAction}
              disabled={isPending}
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
