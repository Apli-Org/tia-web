export const PROMO_TIERS = ['silver', 'gold', 'elite'] as const

export type PromoTier = (typeof PROMO_TIERS)[number]

export type TierDiscounts = Partial<Record<PromoTier, number>>

export const MIN_DISCOUNT_PERCENT = 1
export const MAX_DISCOUNT_PERCENT = 100

export function isDiscountPercent(value: number): boolean {
  return Number.isInteger(value) && value >= MIN_DISCOUNT_PERCENT && value <= MAX_DISCOUNT_PERCENT
}

function isPromoTier(value: string): value is PromoTier {
  return PROMO_TIERS.some((tier) => tier === value)
}

export function isValidTierDiscounts(value: unknown): value is TierDiscounts {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return false
  const entries = Object.entries(value)
  return (
    entries.length > 0 &&
    entries.every(([tier, percent]) => isPromoTier(tier) && typeof percent === 'number' && isDiscountPercent(percent))
  )
}
