"use client"

import { useState } from "react"
import { UserPlus, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { createStaffMember, type AdminRole } from "@/actions/admin/staff.action"

type CreateStaffButtonProps = {
  adminId: string
}

export function CreateStaffButton({ adminId }: CreateStaffButtonProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [role, setRole] = useState<AdminRole>("moderator")

  const resetForm = () => {
    setEmail("")
    setPassword("")
    setFullName("")
    setRole("moderator")
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const result = await createStaffMember(
      { email, password, full_name: fullName, role },
      adminId
    )

    if (result.success) {
      resetForm()
      setOpen(false)
    } else {
      setError(result.error ?? "Une erreur est survenue")
    }

    setIsLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) resetForm() }}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Nouveau membre
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Nouveau membre du personnel</DialogTitle>
            <DialogDescription>
              Créez un nouveau compte pour un membre de l&apos;équipe
            </DialogDescription>
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
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jean@tia.app"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                minLength={8}
                required
              />
              <p className="text-xs text-muted-foreground">
                Minimum 8 caractères
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="role">Rôle</Label>
              <Select value={role} onValueChange={(v) => setRole(v as AdminRole)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="super_admin">Super Admin</SelectItem>
                  <SelectItem value="admin">Administrateur</SelectItem>
                  <SelectItem value="moderator">Modérateur</SelectItem>
                  <SelectItem value="support">Support</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Créer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
