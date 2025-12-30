"use client"

import { useState, useTransition } from "react"
import {
  MoreHorizontal,
  Eye,
  Ban,
  Unlock,
  Trash2,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { banUser, unbanUser, deleteUser, type UserListItem } from "@/actions/admin/users.action"
import { UserDetailModal } from "./user-detail-modal"

type UserActionsProps = {
  user: UserListItem
  canModify: boolean
}

export function UserActions({ user, canModify }: UserActionsProps) {
  const [isPending, startTransition] = useTransition()
  const [showDetail, setShowDetail] = useState(false)
  const [showBanDialog, setShowBanDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [banDuration, setBanDuration] = useState("7")
  const [banReason, setBanReason] = useState("")

  const isBanned = user.banned_until && new Date(user.banned_until) > new Date()

  const handleBan = () => {
    startTransition(async () => {
      await banUser(user.id, parseInt(banDuration), banReason)
      setShowBanDialog(false)
      setBanReason("")
    })
  }

  const handleUnban = () => {
    startTransition(async () => {
      await unbanUser(user.id)
    })
  }

  const handleDelete = () => {
    startTransition(async () => {
      await deleteUser(user.id)
      setShowDeleteDialog(false)
    })
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setShowDetail(true)}>
            <Eye className="mr-2 h-4 w-4" />
            Voir détails
          </DropdownMenuItem>
          {canModify && (
            <>
              <DropdownMenuSeparator />
              {isBanned ? (
                <DropdownMenuItem
                  onClick={handleUnban}
                  disabled={isPending}
                  className="text-green-600"
                >
                  <Unlock className="mr-2 h-4 w-4" />
                  Débannir
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={() => setShowBanDialog(true)}
                  className="text-amber-600"
                >
                  <Ban className="mr-2 h-4 w-4" />
                  Bannir
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onClick={() => setShowDeleteDialog(true)}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Supprimer
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* User Detail Modal */}
      <UserDetailModal
        userId={user.id}
        open={showDetail}
        onOpenChange={setShowDetail}
      />

      {/* Ban Dialog */}
      <Dialog open={showBanDialog} onOpenChange={setShowBanDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bannir l&apos;utilisateur</DialogTitle>
            <DialogDescription>
              Bannir {user.firstName || user.email} de la plateforme
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Durée du bannissement</Label>
              <Select value={banDuration} onValueChange={setBanDuration}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 jour</SelectItem>
                  <SelectItem value="3">3 jours</SelectItem>
                  <SelectItem value="7">7 jours</SelectItem>
                  <SelectItem value="14">14 jours</SelectItem>
                  <SelectItem value="30">30 jours</SelectItem>
                  <SelectItem value="365">1 an</SelectItem>
                  <SelectItem value="3650">Permanent (10 ans)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Raison</Label>
              <Input
                placeholder="Raison du bannissement..."
                value={banReason}
                onChange={(e) => setBanReason(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBanDialog(false)}>
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={handleBan}
              disabled={isPending || !banReason}
            >
              {isPending ? "Bannissement..." : "Confirmer le bannissement"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer l&apos;utilisateur</DialogTitle>
            <DialogDescription>
              Cette action programmera la suppression du compte de{" "}
              {user.firstName || user.email} dans 30 jours. L&apos;utilisateur
              sera immédiatement désactivé.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
              {isPending ? "Suppression..." : "Confirmer la suppression"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
