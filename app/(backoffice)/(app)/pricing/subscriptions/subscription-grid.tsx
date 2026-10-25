"use client"

import { useState } from "react"
import { Check, Pencil, Star } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import {
  type PricingConfig,
  togglePricingStatus,
  updatePricing,
} from "@/actions/admin/pricing.action"
import { formatPrice, getDurationLabel } from "@/lib/pricing-utils"
import { PricingEditModal } from "../pricing-edit-modal"

type SubscriptionGridProps = {
  tier: "silver" | "gold" | "elite"
  label: string
  description: string
  pricing: PricingConfig[]
  color: "slate" | "amber" | "purple"
}

const colorClasses = {
  slate: {
    bg: "bg-slate-100",
    border: "border-slate-200",
    text: "text-slate-700",
    badge: "bg-slate-200 text-slate-700",
  },
  amber: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
    badge: "bg-amber-200 text-amber-700",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-700",
    badge: "bg-purple-200 text-purple-700",
  },
}

export function SubscriptionGrid({
  tier,
  label,
  description,
  pricing,
  color,
}: SubscriptionGridProps) {
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
                  Populaire
                </Badge>
              </div>
            )}

            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">
                    {getDurationLabel(item.duration_months ?? 1)}
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
                  {item.duration_months && item.duration_months > 1 && (
                    <span className="text-sm text-muted-foreground">
                      ({formatPrice(Math.round(item.price / item.duration_months))}/mois)
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

              <ul className="space-y-2 text-sm">
                {(item.features as string[])?.slice(0, 4).map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className={`h-4 w-4 ${colors.text} shrink-0 mt-0.5`} />
                    <span>{feature}</span>
                  </li>
                ))}
                {(item.features as string[])?.length > 4 && (
                  <li className="text-muted-foreground text-xs">
                    +{(item.features as string[]).length - 4} autres fonctionnalités
                  </li>
                )}
              </ul>

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
