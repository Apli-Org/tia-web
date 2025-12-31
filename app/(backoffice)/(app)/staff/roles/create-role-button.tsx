"use client"

import { useState, useEffect } from "react"
import { Plus, Loader2 } from "lucide-react"

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
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { createRole, getActionsByCategory, type AdminAction } from "@/actions/admin/roles.action"

type CreateRoleButtonProps = {
  adminId: string
}

export function CreateRoleButton({ adminId }: CreateRoleButtonProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [actionsByCategory, setActionsByCategory] = useState<Record<string, AdminAction[]>>({})
  const [loadingActions, setLoadingActions] = useState(true)

  const [code, setCode] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [selectedActions, setSelectedActions] = useState<string[]>([])

  useEffect(() => {
    if (open) {
      setLoadingActions(true)
      getActionsByCategory().then((data) => {
        setActionsByCategory(data)
        setLoadingActions(false)
      })
    }
  }, [open])

  const resetForm = () => {
    setCode("")
    setName("")
    setDescription("")
    setSelectedActions([])
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!code.trim() || !name.trim()) return

    setLoading(true)
    setError(null)

    const result = await createRole(
      {
        code: code.trim().toLowerCase().replace(/\s+/g, "_"),
        name: name.trim(),
        description: description.trim() || undefined,
        actionIds: selectedActions,
      },
      adminId
    )

    setLoading(false)

    if (result.success) {
      resetForm()
      setOpen(false)
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
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) resetForm() }}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau rôle
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl flex flex-col max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Créer un nouveau rôle</DialogTitle>
          <DialogDescription>
            Définissez un nom et sélectionnez les permissions pour ce rôle
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-4 py-4 overflow-y-auto flex-1 min-h-0">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code">Code</Label>
                <Input
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="ex: content_manager"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Identifiant unique (sans espaces)
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Nom</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ex: Gestionnaire de contenu"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description du rôle..."
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label>Permissions ({selectedActions.length} sélectionnées)</Label>
              {loadingActions ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : (
                <div className="space-y-4 border rounded-lg p-4">
                  {Object.entries(actionsByCategory).map(([category, actions]) => {
                    const allSelected = actions.every((a) => selectedActions.includes(a.id))
                    const someSelected = actions.some((a) => selectedActions.includes(a.id))

                    return (
                      <div key={category} className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id={`cat-${category}`}
                            checked={allSelected}
                            onCheckedChange={() => toggleCategory(category, actions)}
                            className={someSelected && !allSelected ? "opacity-50" : ""}
                          />
                          <Label htmlFor={`cat-${category}`} className="font-semibold cursor-pointer">
                            {category}
                          </Label>
                        </div>
                        <div className="ml-6 space-y-1">
                          {actions.map((action) => (
                            <div key={action.id} className="flex items-center gap-2">
                              <Checkbox
                                id={action.id}
                                checked={selectedActions.includes(action.id)}
                                onCheckedChange={() => toggleAction(action.id)}
                              />
                              <Label htmlFor={action.id} className="text-sm font-normal cursor-pointer">
                                {action.name}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={loading || !code.trim() || !name.trim()}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Créer le rôle
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
