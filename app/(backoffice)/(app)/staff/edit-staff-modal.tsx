"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  type StaffMember,
  updateStaffMember,
} from "@/actions/admin/staff.action"
import { getAllRoles, type AdminRole } from "@/actions/admin/roles.action"

type EditStaffModalProps = {
  member: StaffMember
  open: boolean
  onClose: () => void
  adminId: string
  isSelf?: boolean
}

export function EditStaffModal({ member, open, onClose, adminId, isSelf }: EditStaffModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [roles, setRoles] = useState<AdminRole[]>([])

  const [fullName, setFullName] = useState(member.full_name ?? "")
  const [roleId, setRoleId] = useState<string>(member.role_id ?? "")

  useEffect(() => {
    async function fetchRoles() {
      const fetchedRoles = await getAllRoles()
      setRoles(fetchedRoles)
    }
    fetchRoles()
  }, [])

  useEffect(() => {
    setFullName(member.full_name ?? "")
    setRoleId(member.role_id ?? "")
  }, [member])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const result = await updateStaffMember(
      member.id,
      { full_name: fullName, role_id: roleId },
      adminId
    )

    if (result.success) {
      onClose()
    } else {
      setError(result.error ?? "Une erreur est survenue")
    }

    setIsLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Modifier le membre</DialogTitle>
            <DialogDescription>{member.email}</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
                {error}
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="fullName">Nom complet</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jean Dupont"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="role">Rôle</Label>
              <Select
                value={roleId}
                onValueChange={setRoleId}
                disabled={isSelf}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un rôle" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {isSelf && (
                <p className="text-xs text-muted-foreground">
                  Vous ne pouvez pas modifier votre propre rôle
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Enregistrer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
