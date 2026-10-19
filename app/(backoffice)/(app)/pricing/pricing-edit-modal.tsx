"use client"

import { useState } from "react"
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
import { Switch } from "@/components/ui/switch"
import { type PricingConfig } from "@/actions/admin/pricing.action"

type PricingEditModalProps = {
  pricing: PricingConfig
  open: boolean
  onClose: () => void
  onSave: (updates: Partial<PricingConfig>) => Promise<void>
}

export function PricingEditModal({
  pricing,
  open,
  onClose,
  onSave,
}: PricingEditModalProps) {
  const [price, setPrice] = useState(pricing.price.toString())
  const [originalPrice, setOriginalPrice] = useState(
    pricing.original_price?.toString() ?? ""
  )
  const [name, setName] = useState(pricing.name)
  const [description, setDescription] = useState(pricing.description ?? "")
  const [features, setFeatures] = useState(
    (pricing.features as string[])?.join("\n") ?? ""
  )
  const [isFeatured, setIsFeatured] = useState(pricing.is_featured)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await onSave({
        price: parseInt(price),
        original_price: originalPrice ? parseInt(originalPrice) : null,
        name,
        description: description || null,
        features: features.split("\n").filter(Boolean),
        is_featured: isFeatured,
      })
    } catch (error) {
      console.error("Error saving pricing:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const discountPercent =
    originalPrice && parseInt(originalPrice) > parseInt(price)
      ? Math.round((1 - parseInt(price) / parseInt(originalPrice)) * 100)
      : 0

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Modifier le tarif</DialogTitle>
            <DialogDescription>
              {pricing.product_code} - {pricing.name}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nom</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nom du tarif"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description courte"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="price">Prix actuel (Ar)</Label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="0"
                step="100"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="discount">Réduction (%)</Label>
                <Input
                  id="discount"
                  type="number"
                  value={discountPercent || ""}
                  onChange={(e) => {
                    const discount = parseInt(e.target.value) || 0
                    if (discount > 0 && discount < 100) {
                      const calculatedOriginal = Math.round(parseInt(price) / (1 - discount / 100))
                      setOriginalPrice(calculatedOriginal.toString())
                    } else if (discount === 0) {
                      setOriginalPrice("")
                    }
                  }}
                  placeholder="0"
                  min="0"
                  max="99"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="originalPrice">
                  Prix barré (Ar)
                  {discountPercent > 0 && (
                    <span className="ml-2 text-xs text-green-600 font-medium">
                      -{discountPercent}%
                    </span>
                  )}
                </Label>
                <Input
                  id="originalPrice"
                  type="number"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  placeholder="Optionnel"
                  min="0"
                  step="100"
                />
              </div>
            </div>

            {discountPercent > 0 && (
              <p className="text-sm text-muted-foreground">
                Affiché: <span className="line-through">{parseInt(originalPrice).toLocaleString()} Ar</span>{" "}
                <span className="font-medium text-foreground">{parseInt(price).toLocaleString()} Ar</span>{" "}
                <span className="text-green-600">(-{discountPercent}%)</span>
              </p>
            )}

            <div className="grid gap-2">
              <Label htmlFor="features">
                Fonctionnalités (une par ligne)
              </Label>
              <Textarea
                id="features"
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                placeholder="Likes illimités&#10;5 Tia Hearts/mois&#10;..."
                rows={5}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="featured" className="cursor-pointer">
                Mettre en avant (badge &quot;Populaire&quot;)
              </Label>
              <Switch
                id="featured"
                checked={isFeatured}
                onCheckedChange={setIsFeatured}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
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
