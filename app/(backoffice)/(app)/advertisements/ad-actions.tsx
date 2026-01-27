"use client"

import { useState, useTransition } from "react"
import {
  MoreHorizontal,
  Pencil,
  Power,
  PowerOff,
  Trash2,
  BarChart3,
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  toggleAdvertisementStatus,
  deleteAdvertisement,
} from "@/actions/admin/advertisements.action"
import type { AdvertisementWithStats } from "@/lib/types/advertisements.types"
import { AdModal } from "./ad-modal"
import { AdStatsModal } from "./ad-stats-modal"
import { toast } from "sonner"

type AdActionsProps = {
  ad: AdvertisementWithStats
  adminId: string
  canManage: boolean
}

export function AdActions({ ad, adminId, canManage }: AdActionsProps) {
  const [isPending, startTransition] = useTransition()
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showStatsModal, setShowStatsModal] = useState(false)

  const handleToggleStatus = () => {
    startTransition(async () => {
      const result = await toggleAdvertisementStatus(
        ad.id,
        !ad.is_active,
        adminId
      )

      if (result.success) {
        toast.success(
          ad.is_active
            ? "Publicité désactivée"
            : "Publicité activée"
        )
      } else {
        toast.error(result.error || "Une erreur est survenue")
      }
    })
  }

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteAdvertisement(ad.id, adminId)

      if (result.success) {
        toast.success("Publicité supprimée")
        setShowDeleteDialog(false)
      } else {
        toast.error(result.error || "Une erreur est survenue")
      }
    })
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" disabled={isPending}>
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setShowStatsModal(true)}>
            <BarChart3 className="h-4 w-4 mr-2" />
            Voir les statistiques
          </DropdownMenuItem>
          {canManage && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setShowEditModal(true)}>
                <Pencil className="h-4 w-4 mr-2" />
                Modifier
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleToggleStatus}>
                {ad.is_active ? (
                  <>
                    <PowerOff className="h-4 w-4 mr-2" />
                    Désactiver
                  </>
                ) : (
                  <>
                    <Power className="h-4 w-4 mr-2" />
                    Activer
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Supprimer
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit Modal */}
      {canManage && (
        <AdModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          adminId={adminId}
          ad={ad}
        />
      )}

      {/* Stats Modal */}
      <AdStatsModal
        isOpen={showStatsModal}
        onClose={() => setShowStatsModal(false)}
        ad={ad}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer la publicité ?</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer la publicité{" "}
              <span className="font-medium">&quot;{ad.title}&quot;</span> ?
              {(ad.clicks_count > 0 || ad.impressions_count > 0) && (
                <span className="block mt-2 text-amber-600">
                  Cette publicité a {ad.impressions_count} impressions et {ad.clicks_count} clics.
                  Elle sera désactivée au lieu d&apos;être supprimée.
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isPending ? "Suppression..." : "Supprimer"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
