"use client"

import { useState } from "react"
import { Pencil, Star } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import {
  type PricingConfig,
  togglePricingStatus,
  updatePricing,
} from "@/actions/admin/pricing.action"
import { formatPrice } from "@/lib/pricing-utils"
import { PricingEditModal } from "../pricing-edit-modal"

type ConsumableGridProps = {
  type: "tia_heart" | "boost" | "reveal_like"
  label: string
  description: string
  icon: string
  pricing: PricingConfig[]
  color: "pink" | "yellow" | "blue"
}

const colorClasses = {
  pink: {
    bg: "bg-pink-50",
    border: "border-pink-200",
    text: "text-pink-700",
    badge: "bg-pink-100 text-pink-700",
  },
  yellow: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-700",
    badge: "bg-yellow-100 text-yellow-700",
  },
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    badge: "bg-blue-100 text-blue-700",
  },
}

export function ConsumableGrid({
  type,
  label,
  description,
  icon,
  pricing,
  color,
}: ConsumableGridProps) {
  const [editingPricing, setEditingPricing] = useState<PricingConfig | null>(null)
  const [togglingId, setTogglingId] = useState<string | null>(null)
  const colors = colorClasses[color]

  const handleToggleStatus = async (item: PricingConfig) => {
    setTogglingId(item.id)
    // TODO: Get actual admin ID from session
    await togglePricingStatus(item.id, !item.is_active)
    setTogglingId(null)
  }

  const handleSave = async (updates: Partial<PricingConfig>) => {
    if (!editingPricing) return
    // TODO: Get actual admin ID from session
    await updatePricing(editingPricing.id, updates)
    setEditingPricing(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <Badge className={colors.badge}>{label}</Badge>
        <span className="text-muted-foreground text-sm">{description}</span>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {pricing.map((item) => (
          <Card
            key={item.id}
            className={`relative ${!item.is_active ? "opacity-50" : ""} ${
              item.is_featured ? `${colors.border} border-2` : ""
            }`}
          >
            {item.is_featured && (
              <div className={`absolute -top-3 left-1/2 -translate-x-1/2`}>
                <Badge className={`${colors.badge} flex items-center gap-1`}>
                  <Star className="h-3 w-3" />
                  Meilleure offre
                </Badge>
              </div>
            )}

            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="text-xl">{icon}</span>
                    {item.quantity} {item.quantity === 1 ? label.slice(0, -1) : label}
                  </CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={item.is_active}
                    onCheckedChange={() => handleToggleStatus(item)}
                    disabled={togglingId === item.id}
                  />
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">{formatPrice(item.price)}</span>
                  {item.quantity && item.quantity > 1 && (
                    <span className="text-sm text-muted-foreground">
                      ({formatPrice(Math.round(item.price / item.quantity))}/unité)
                    </span>
                  )}
                </div>
                {item.original_price && item.original_price > item.price && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(item.original_price)}
                    </span>
                    <Badge variant="destructive" className="text-xs">
                      -{Math.round((1 - item.price / item.original_price) * 100)}%
                    </Badge>
                  </div>
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => setEditingPricing(item)}
              >
                <Pencil className="h-4 w-4 mr-2" />
                Modifier
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {editingPricing && (
        <PricingEditModal
          pricing={editingPricing}
          open={!!editingPricing}
          onClose={() => setEditingPricing(null)}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
