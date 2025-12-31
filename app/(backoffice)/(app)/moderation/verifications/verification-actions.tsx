"use client"

import { useState, useTransition } from "react"
import Image from "next/image"
import { MoreHorizontal, Eye, CheckCircle, XCircle, Loader2 } from "lucide-react"

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
import { approveVerification, rejectVerification } from "@/actions/admin/verifications.action"
import type { VerificationRequest } from "@/actions/admin/moderation-types"

type Props = {
  request: VerificationRequest
  canModerate: boolean
}

export function VerificationActions({ request, canModerate }: Props) {
  const [isPending, startTransition] = useTransition()
  const [showDetail, setShowDetail] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [rejectReason, setRejectReason] = useState("")

  const handleApprove = () => {
    startTransition(async () => {
      try {
        await approveVerification(request.id)
      } catch (error) {
        console.error("Error approving:", error)
      }
    })
  }

  const handleReject = () => {
    if (!rejectReason.trim()) return

    startTransition(async () => {
      try {
        await rejectVerification(request.id, rejectReason)
        setShowRejectDialog(false)
        setRejectReason("")
      } catch (error) {
        console.error("Error rejecting:", error)
      }
    })
  }

  const isPending_status = request.status === "pending"

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

          {canModerate && isPending_status && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleApprove}
                className="text-green-600"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Approuver
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setShowRejectDialog(true)}
                className="text-red-600"
              >
                <XCircle className="mr-2 h-4 w-4" />
                Rejeter
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showDetail} onOpenChange={setShowDetail}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Détails de la demande</DialogTitle>
            <DialogDescription>
              Demande de {request.user?.firstName || "l'utilisateur"} ({request.user?.email})
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div>
              <Label className="text-sm font-medium">Photo CIN</Label>
              <div className="relative h-64 w-full mt-2 rounded-lg border overflow-hidden bg-muted">
                <Image
                  src={request.cin_photo_url}
                  alt="CIN"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>

            {request.selfie_photo_url && (
              <div>
                <Label className="text-sm font-medium">Photo Selfie</Label>
                <div className="relative h-64 w-full mt-2 rounded-lg border overflow-hidden bg-muted">
                  <Image
                    src={request.selfie_photo_url}
                    alt="Selfie"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </div>
            )}

            {request.rejection_reason && (
              <div>
                <Label className="text-sm font-medium text-red-600">Raison du rejet</Label>
                <p className="mt-1 text-sm">{request.rejection_reason}</p>
              </div>
            )}

            {request.reviewer && (
              <div>
                <Label className="text-sm font-medium">Examiné par</Label>
                <p className="mt-1 text-sm">{request.reviewer.full_name}</p>
              </div>
            )}
          </div>

          {canModerate && isPending_status && (
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="outline"
                onClick={() => setShowRejectDialog(true)}
                className="text-red-600"
              >
                <XCircle className="mr-2 h-4 w-4" />
                Rejeter
              </Button>
              <Button onClick={handleApprove} disabled={isPending}>
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <CheckCircle className="mr-2 h-4 w-4" />
                )}
                Approuver
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rejeter la demande</DialogTitle>
            <DialogDescription>
              Indiquez la raison du rejet. Cette information sera visible par l&apos;utilisateur.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="reason">Raison du rejet</Label>
              <Textarea
                id="reason"
                placeholder="Ex: Photo floue, CIN expiré, informations illisibles..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={isPending || !rejectReason.trim()}
            >
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <XCircle className="mr-2 h-4 w-4" />
              )}
              Rejeter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
