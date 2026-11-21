// Pricing utility functions (non-server actions)

import { STORE_TERRITORY_CURRENCY, storeTerritoryForCoordinates } from './territories'

export const STORE_PAYMENT_METHODS = ['apple_iap', 'google_iap']

/** PostgREST `or` filter keeping mobile money payments, the only ones stored in Ariary. */
export const NOT_STORE_PAYMENT = `payment_method.is.null,payment_method.not.in.(${STORE_PAYMENT_METHODS.join(',')})`

const CENTS_PER_UNIT = 100
const PENDING_STORE_AMOUNT = 'Montant en attente'

type Coordinates = { latitude: number | null; longitude: number | null }

// Format price for display
export function formatPrice(price: number, currency = 'MGA'): string {
  if (currency === 'MGA') {
    return new Intl.NumberFormat('fr-MG', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price) + ' Ar'
  }
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency,
  }).format(price)
}

export function isStorePayment(paymentMethod: string | null | undefined): boolean {
  return paymentMethod != null && STORE_PAYMENT_METHODS.includes(paymentMethod)
}

/**
 * Formats an amount as stored in subscriptions and micro_purchases: Ariary for
 * mobile money, cents of the store currency for App Store and Google Play.
 * A store payment is recorded at 0 until RevenueCat reports its price. Rows
 * older than the currency column carry none, so the member's territory decides it.
 */
export function formatPaidAmount(
  amount: number | null,
  paymentMethod: string | null | undefined,
  currency: string | null | undefined,
  coordinates: Coordinates | null
): string {
  if (amount === null) return '-'
  if (!isStorePayment(paymentMethod)) return formatPrice(amount)
  if (amount === 0) return PENDING_STORE_AMOUNT

  const units = amount / CENTS_PER_UNIT
  if (currency) return formatPrice(units, currency)

  const territory = storeTerritoryForCoordinates(coordinates?.latitude ?? null, coordinates?.longitude ?? null)
  if (territory) return formatPrice(units, STORE_TERRITORY_CURRENCY[territory])

  return `${new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(units)} (store)`
}

// Get tier display info
export function getTierInfo(tier: string): { label: string; color: string } {
  const tiers: Record<string, { label: string; color: string }> = {
    silver: { label: 'Silver', color: 'bg-slate-200 text-slate-700' },
    gold: { label: 'Gold', color: 'bg-amber-200 text-amber-700' },
    elite: { label: 'Elite', color: 'bg-purple-200 text-purple-700' },
  }
  return tiers[tier] ?? { label: tier, color: 'bg-gray-200 text-gray-700' }
}

// Get consumable type display info
export function getConsumableInfo(type: string): { label: string; icon: string; color: string } {
  const types: Record<string, { label: string; icon: string; color: string }> = {
    tia_heart: { label: 'Tia Heart', icon: '💜', color: 'bg-pink-100 text-pink-700' },
    boost: { label: 'Boost', icon: '⚡', color: 'bg-yellow-100 text-yellow-700' },
    reveal_like: { label: 'Révélation', icon: '👁️', color: 'bg-blue-100 text-blue-700' },
  }
  return types[type] ?? { label: type, icon: '📦', color: 'bg-gray-100 text-gray-700' }
}

// Get duration display
export function getDurationLabel(months: number): string {
  if (months === 1) return 'Mensuel'
  if (months === 3) return 'Trimestriel'
  if (months === 12) return 'Annuel'
  return `${months} mois`
}
