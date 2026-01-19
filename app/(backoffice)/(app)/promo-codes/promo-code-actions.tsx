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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  togglePromoCodeStatus,
  deletePromoCode,
  getPromoCodeUsages,
  type PromoCode,
  type PromoCodeUsage,
} from "@/actions/admin/promo-codes.action"
import { PromoCodeModal } from "./promo-code-modal"
import { formatPrice } from "@/lib/pricing-utils"
import { toast } from "sonner"

type PromoCodeActionsProps = {
  promoCode: PromoCode
  adminId: string
}

export function PromoCodeActions({ promoCode, adminId }: PromoCodeActionsProps) {
  const [isPending, startTransition] = useTransition()
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showUsagesDialog, setShowUsagesDialog] = useState(false)
  const [usages, setUsages] = useState<PromoCodeUsage[]>([])
  const [loadingUsages, setLoadingUsages] = useState(false)

  const handleToggleStatus = () => {
    startTransition(async () => {
      const result = await togglePromoCodeStatus(
        promoCode.id,
        !promoCode.is_active,
        adminId
      )

      if (result.success) {
        toast.success(
          promoCode.is_active
            ? "Code promo désactivé"
            : "Code promo activé"
        )
      } else {
        toast.error(result.error || "Une erreur est survenue")
      }
    })
  }

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deletePromoCode(promoCode.id, adminId)

      if (result.success) {
        toast.success("Code promo supprimé")
        setShowDeleteDialog(false)
      } else {
        toast.error(result.error || "Une erreur est survenue")
      }
    })
  }

  const handleViewUsages = async () => {
    setShowUsagesDialog(true)
    setLoadingUsages(true)
    try {
      const data = await getPromoCodeUsages(promoCode.id)
      setUsages(data)
    } catch {
      toast.error("Erreur lors du chargement des utilisations")
    } finally {
      setLoadingUsages(false)
    }
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
          <DropdownMenuItem onClick={() => setShowEditModal(true)}>
            <Pencil className="h-4 w-4 mr-2" />
            Modifier
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleViewUsages}>
            <BarChart3 className="h-4 w-4 mr-2" />
            Voir les utilisations ({promoCode.current_uses})
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleToggleStatus}>
            {promoCode.is_active ? (
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
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit Modal */}
      <PromoCodeModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        adminId={adminId}
        promoCode={promoCode}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer le code promo ?</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer le code{" "}
              <span className="font-mono font-bold">{promoCode.code}</span> ?
              {promoCode.current_uses > 0 && (
                <span className="block mt-2 text-amber-600">
                  Ce code a été utilisé {promoCode.current_uses} fois et sera
                  désactivé au lieu d&apos;être supprimé.
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

      {/* Usages Dialog */}
      <Dialog open={showUsagesDialog} onOpenChange={setShowUsagesDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              Utilisations de {promoCode.code}
            </DialogTitle>
            <DialogDescription>
              {promoCode.current_uses} utilisation(s) sur{" "}
              {promoCode.max_uses ?? "illimité"}
            </DialogDescription>
          </DialogHeader>

          <div className="max-h-80 overflow-y-auto">
            {loadingUsages ? (
              <div className="text-center py-8 text-muted-foreground">
                Chargement...
              </div>
            ) : usages.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Aucune utilisation pour ce code
              </div>
            ) : (
              <div className="space-y-3">
                {usages.map((usage) => (
                  <div
                    key={usage.id}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div>
                      <p className="font-medium">
                        {usage.user?.firstName || usage.user?.email || "Utilisateur"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(usage.created_at).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">
                        -{formatPrice(usage.discount_amount)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        sur {formatPrice(usage.original_amount)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
