"use client"

import { useState } from "react"
import { Loader2, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { type StaffMember, resetStaffPassword } from "@/actions/admin/staff.action"

type ResetPasswordModalProps = {
  member: StaffMember
  open: boolean
  onClose: () => void
  adminId: string
}

export function ResetPasswordModal({
  member,
  open,
  onClose,
  adminId,
}: ResetPasswordModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const resetForm = () => {
    setPassword("")
    setConfirmPassword("")
    setError(null)
    setSuccess(false)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      return
    }

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères")
      return
    }

    setIsLoading(true)

    const result = await resetStaffPassword(
      member.id,
      password,
      adminId
    )

    if (result.success) {
      setSuccess(true)
      setTimeout(() => {
        resetForm()
        onClose()
      }, 2000)
    } else {
      setError(result.error ?? "Une erreur est survenue")
    }

    setIsLoading(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) {
          resetForm()
          onClose()
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Réinitialiser le mot de passe</DialogTitle>
            <DialogDescription>
              Définir un nouveau mot de passe pour {member.full_name ?? member.email}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
                {error}
              </div>
            )}

            {success && (
              <div className="p-3 text-sm text-green-600 bg-green-50 rounded-md">
                Mot de passe réinitialisé avec succès !
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="password">Nouveau mot de passe</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  minLength={8}
                  required
                  disabled={success}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                minLength={8}
                required
                disabled={success}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                resetForm()
                onClose()
              }}
              disabled={isLoading}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading || success}>
              {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Réinitialiser
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
