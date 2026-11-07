"use client"

import { useState, useTransition, useEffect } from "react"
import { Shuffle } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import {
  createPromoCode,
  updatePromoCode,
  type PromoCode,
} from "@/actions/admin/promo-codes.action"
import {
  isDiscountPercent,
  PROMO_TIERS,
  type PromoTier,
  type TierDiscounts,
} from "@/actions/admin/promo-codes-types"
import { getTierInfo } from "@/lib/pricing-utils"

import { toast } from "sonner"

// Generate a random promo code (client-side function)
function generatePromoCode(length = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

type TierPercents = Record<PromoTier, string>

const EMPTY_TIER_PERCENTS: TierPercents = { silver: "", gold: "", elite: "" }

function toTierPercents(tierDiscounts: TierDiscounts | null): TierPercents {
  return {
    silver: tierDiscounts?.silver?.toString() ?? "",
    gold: tierDiscounts?.gold?.toString() ?? "",
    elite: tierDiscounts?.elite?.toString() ?? "",
  }
}

/** Resolves the percentage of each targeted tier, falling back on the general discount; null when a value is invalid. */
function buildTierDiscounts(
  targetedTiers: PromoTier[],
  tierPercents: TierPercents,
  defaultPercent: number
): TierDiscounts | null {
  if (targetedTiers.length === 0) return null

  const discounts: TierDiscounts = {}
  for (const tier of targetedTiers) {
    const percent = tierPercents[tier] ? parseInt(tierPercents[tier]) : defaultPercent
    if (!isDiscountPercent(percent)) return null
    discounts[tier] = percent
  }
  return discounts
}

type PromoCodeModalProps = {
  isOpen: boolean
  onClose: () => void
  promoCode?: PromoCode | null
}

export function PromoCodeModal({
  isOpen,
  onClose,
  promoCode,
}: PromoCodeModalProps) {
  const [isPending, startTransition] = useTransition()
  const isEditing = !!promoCode

  // Form state
  const [code, setCode] = useState("")
  const [discountPercent, setDiscountPercent] = useState("")
  const [validFrom, setValidFrom] = useState("")
  const [validUntil, setValidUntil] = useState("")
  const [maxUses, setMaxUses] = useState("")
  const [minAmount, setMinAmount] = useState("")
  const [description, setDescription] = useState("")
  const [isActive, setIsActive] = useState(true)
  const [isTierTargeted, setIsTierTargeted] = useState(false)
  const [targetedTiers, setTargetedTiers] = useState<PromoTier[]>([])
  const [tierPercents, setTierPercents] = useState<TierPercents>(EMPTY_TIER_PERCENTS)

  // Reset form when modal opens/closes or promo code changes
  useEffect(() => {
    if (isOpen) {
      if (promoCode) {
        setCode(promoCode.code)
        setDiscountPercent(promoCode.discount_percent.toString())
        setValidFrom(promoCode.valid_from ? promoCode.valid_from.slice(0, 10) : "")
        setValidUntil(promoCode.valid_until ? promoCode.valid_until.slice(0, 10) : "")
        setMaxUses(promoCode.max_uses?.toString() || "")
        setMinAmount(promoCode.min_amount?.toString() || "")
        setDescription(promoCode.description || "")
        setIsActive(promoCode.is_active)
        setIsTierTargeted(promoCode.tier_discounts !== null)
        setTargetedTiers(PROMO_TIERS.filter((tier) => promoCode.tier_discounts?.[tier] !== undefined))
        setTierPercents(toTierPercents(promoCode.tier_discounts))
      } else {
        // Reset for new code
        setCode("")
        setDiscountPercent("")
        setValidFrom("")
        setValidUntil("")
        setMaxUses("")
        setMinAmount("")
        setDescription("")
        setIsActive(true)
        setIsTierTargeted(false)
        setTargetedTiers([])
        setTierPercents(EMPTY_TIER_PERCENTS)
      }
    }
  }, [isOpen, promoCode])

  const handleGenerateCode = () => {
    setCode(generatePromoCode(8))
  }

  const toggleTier = (tier: PromoTier, checked: boolean) => {
    setTargetedTiers((tiers) =>
      checked ? [...tiers, tier] : tiers.filter((value) => value !== tier)
    )
  }

  const changeTierPercent = (tier: PromoTier, value: string) => {
    setTierPercents((percents) => ({ ...percents, [tier]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    const discount = parseInt(discountPercent)
    if (isNaN(discount) || discount < 1 || discount > 100) {
      toast.error("La réduction doit être entre 1 et 100%")
      return
    }

    if (!code.trim()) {
      toast.error("Le code promo est requis")
      return
    }

    const tierDiscounts = isTierTargeted
      ? buildTierDiscounts(targetedTiers, tierPercents, discount)
      : null
    if (isTierTargeted && !tierDiscounts) {
      toast.error("Cochez au moins un abonnement, avec une réduction entre 1 et 100%")
      return
    }

    const data = {
      code: code.trim().toUpperCase(),
      discount_percent: discount,
      valid_from: validFrom ? new Date(validFrom).toISOString() : null,
      valid_until: validUntil ? new Date(validUntil).toISOString() : null,
      max_uses: maxUses ? parseInt(maxUses) : null,
      min_amount: minAmount ? parseInt(minAmount) : null,
      description: description.trim() || null,
      is_active: isActive,
      applicable_products: null,
      tier_discounts: tierDiscounts,
    }

    startTransition(async () => {
      try {
        let result
        if (isEditing && promoCode) {
          result = await updatePromoCode(promoCode.id, data)
        } else {
          result = await createPromoCode(data)
        }

        if (result.success) {
          toast.success(
            isEditing
              ? "Code promo mis à jour avec succès"
              : "Code promo créé avec succès"
          )
          onClose()
        } else {
          toast.error(result.error || "Une erreur est survenue")
        }
      } catch {
        toast.error("Une erreur est survenue")
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Modifier le code promo" : "Créer un code promo"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Modifiez les informations du code promo"
              : "Créez un nouveau code promotionnel pour vos utilisateurs"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code">Code promo *</Label>
            <div className="flex gap-2">
              <Input
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="PROMO2024"
                className="font-mono uppercase"
                required
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleGenerateCode}
                title="Générer un code aléatoire"
              >
                <Shuffle className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="discount">Réduction (%) *</Label>
            <Input
              id="discount"
              type="number"
              min="1"
              max="100"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(e.target.value)}
              placeholder="20"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="validFrom">Valide du</Label>
              <Input
                id="validFrom"
                type="date"
                value={validFrom}
                onChange={(e) => setValidFrom(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="validUntil">Valide jusqu&apos;au</Label>
              <Input
                id="validUntil"
                type="date"
                value={validUntil}
                onChange={(e) => setValidUntil(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maxUses">Nombre max d&apos;utilisations</Label>
              <Input
                id="maxUses"
                type="number"
                min="1"
                value={maxUses}
                onChange={(e) => setMaxUses(e.target.value)}
                placeholder="Illimité"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minAmount">Montant minimum (Ar)</Label>
              <Input
                id="minAmount"
                type="number"
                min="0"
                value={minAmount}
                onChange={(e) => setMinAmount(e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          <div className="space-y-3 rounded-lg border p-3">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <Label htmlFor="tierTargeted">Limiter à certains abonnements</Label>
                <p className="text-xs text-muted-foreground">
                  Le code ne vaut que pour les abonnements cochés, chacun avec sa réduction.
                  Les consommables sont exclus.
                </p>
              </div>
              <Switch
                id="tierTargeted"
                checked={isTierTargeted}
                onCheckedChange={setIsTierTargeted}
              />
            </div>

            {isTierTargeted && (
              <div className="space-y-2">
                {PROMO_TIERS.map((tier) => {
                  const isSelected = targetedTiers.includes(tier)
                  const label = getTierInfo(tier).label
                  return (
                    <div key={tier} className="flex items-center gap-3">
                      <Checkbox
                        id={`tier-${tier}`}
                        checked={isSelected}
                        onCheckedChange={(checked) => toggleTier(tier, checked === true)}
                      />
                      <Label htmlFor={`tier-${tier}`} className="w-16">
                        {label}
                      </Label>
                      <Input
                        type="number"
                        min="1"
                        max="100"
                        value={tierPercents[tier]}
                        onChange={(e) => changeTierPercent(tier, e.target.value)}
                        disabled={!isSelected}
                        placeholder={discountPercent || "%"}
                        aria-label={`Réduction ${label} (%)`}
                        className="w-24"
                      />
                      <span className="text-sm text-muted-foreground">%</span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description du code promo (optionnel)"
              rows={2}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="isActive">Code actif</Label>
            <Switch
              id="isActive"
              checked={isActive}
              onCheckedChange={setIsActive}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending
                ? "Enregistrement..."
                : isEditing
                  ? "Mettre à jour"
                  : "Créer le code"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
