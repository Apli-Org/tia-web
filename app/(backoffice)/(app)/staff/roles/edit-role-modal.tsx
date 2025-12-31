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
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  updateRole,
  getActionsByCategory,
  getRoleWithActions,
  type AdminRole,
  type AdminAction,
} from "@/actions/admin/roles.action"

type EditRoleModalProps = {
  role: AdminRole
  adminId: string
  open: boolean
  onClose: () => void
}

export function EditRoleModal({ role, adminId, open, onClose }: EditRoleModalProps) {
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actionsByCategory, setActionsByCategory] = useState<Record<string, AdminAction[]>>({})

  const [name, setName] = useState(role.name)
  const [description, setDescription] = useState(role.description || "")
  const [selectedActions, setSelectedActions] = useState<string[]>([])

  useEffect(() => {
    if (open) {
      setLoadingData(true)
      setName(role.name)
      setDescription(role.description || "")

      Promise.all([
        getActionsByCategory(),
        getRoleWithActions(role.id),
      ]).then(([categories, roleData]) => {
        setActionsByCategory(categories)
        if (roleData?.actions) {
          setSelectedActions(roleData.actions.map((a) => a.id))
        }
        setLoadingData(false)
      })
    }
  }, [open, role])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setLoading(true)
    setError(null)

    const result = await updateRole(
      role.id,
      {
        name: name.trim(),
        description: description.trim() || undefined,
        actionIds: selectedActions,
      },
      adminId
    )

    setLoading(false)

    if (result.success) {
      onClose()
    } else {
      setError(result.error || "Une erreur est survenue")
    }
  }

  const toggleAction = (actionId: string) => {
    setSelectedActions((prev) =>
      prev.includes(actionId)
        ? prev.filter((id) => id !== actionId)
        : [...prev, actionId]
    )
  }

  const toggleCategory = (category: string, actions: AdminAction[]) => {
    const categoryActionIds = actions.map((a) => a.id)
    const allSelected = categoryActionIds.every((id) => selectedActions.includes(id))

    if (allSelected) {
      setSelectedActions((prev) => prev.filter((id) => !categoryActionIds.includes(id)))
    } else {
      setSelectedActions((prev) => [...new Set([...prev, ...categoryActionIds])])
    }
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl flex flex-col max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Modifier le rôle</DialogTitle>
          <DialogDescription>
            Modifiez les informations et les permissions du rôle &quot;{role.name}&quot;
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
              {error}
            </div>
          )}

          {loadingData ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <div className="space-y-4 py-4 overflow-y-auto flex-1 min-h-0">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-code">Code</Label>
                  <Input
                    id="edit-code"
                    value={role.code}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground">
                    Le code ne peut pas être modifié
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Nom</Label>
                  <Input
                    id="edit-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="ex: Gestionnaire de contenu"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description du rôle..."
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label>Permissions ({selectedActions.length} sélectionnées)</Label>
                <div className="space-y-4 border rounded-lg p-4">
                  {Object.entries(actionsByCategory).map(([category, actions]) => {
                    const allSelected = actions.every((a) => selectedActions.includes(a.id))
                    const someSelected = actions.some((a) => selectedActions.includes(a.id))

                    return (
                      <div key={category} className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id={`edit-cat-${category}`}
                            checked={allSelected}
                            onCheckedChange={() => toggleCategory(category, actions)}
                            className={someSelected && !allSelected ? "opacity-50" : ""}
                          />
                          <Label htmlFor={`edit-cat-${category}`} className="font-semibold cursor-pointer">
                            {category}
                          </Label>
                        </div>
                        <div className="ml-6 space-y-1">
                          {actions.map((action) => (
                            <div key={action.id} className="flex items-center gap-2">
                              <Checkbox
                                id={`edit-${action.id}`}
                                checked={selectedActions.includes(action.id)}
                                onCheckedChange={() => toggleAction(action.id)}
                              />
                              <Label htmlFor={`edit-${action.id}`} className="text-sm font-normal cursor-pointer">
                                {action.name}
                                {action.description && (
                                  <span className="text-muted-foreground ml-1">
                                    - {action.description}
                                  </span>
                                )}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={loading || loadingData || !name.trim()}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Enregistrer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
