// Pricing utility functions (non-server actions)

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
    tia_heart: { label: 'TIA Heart', icon: '💜', color: 'bg-pink-100 text-pink-700' },
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
