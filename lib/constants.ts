export const APP_NAME = 'TIA'
export const APP_DESCRIPTION = 'Rencontrez l\'âme sœur grâce à l\'IA'

export const SUBSCRIPTION_TIERS = {
  BASE: 'base',
  SILVER: 'silver',
  GOLD: 'gold',
  ELITE: 'elite',
} as const

export const TIER_PRICES = {
  [SUBSCRIPTION_TIERS.BASE]: 0,
  [SUBSCRIPTION_TIERS.SILVER]: 4.99,
  [SUBSCRIPTION_TIERS.GOLD]: 9.99,
  [SUBSCRIPTION_TIERS.ELITE]: 19.99,
} as const

export const TIER_COLORS = {
  [SUBSCRIPTION_TIERS.BASE]: 'bg-gray-500',
  [SUBSCRIPTION_TIERS.SILVER]: 'bg-slate-400',
  [SUBSCRIPTION_TIERS.GOLD]: 'bg-amber-400',
  [SUBSCRIPTION_TIERS.ELITE]: 'bg-purple-500',
} as const

export const ADMIN_ROLES = {
  SUPER_ADMIN: 'super_admin',
  MODERATOR: 'moderator',
  SUPPORT: 'support',
} as const
