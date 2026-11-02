"use server"

import { unstable_cache } from "next/cache"
import type { PostgrestError } from "@supabase/supabase-js"
import { requireAdminAction } from "@/lib/auth/admin-guard"
import { createAdminClient } from "@/lib/supabase/admin"
import { isInReunion } from "@/lib/territories"

const STORE_PAYMENT_METHODS = ["apple_iap", "google_iap"]
const NOT_STORE_PAYMENT = `payment_method.is.null,payment_method.not.in.(${STORE_PAYMENT_METHODS.join(",")})`
const CENTS_PER_UNIT = 100
const SLOW_DATA_REVALIDATE_SECONDS = 300
const TIERS = ["base", "silver", "gold", "elite"] as const

type AdminClient = ReturnType<typeof createAdminClient>

type StorePurchaseRow = {
  price_paid: number | null
  user: { latitude: number | null; longitude: number | null } | null
}

type CountResult = { count: number | null; error: PostgrestError | null }
type RowsResult<T> = { data: T[] | null; error: PostgrestError | null }

export type KpiValue = {
  total: number | null
  trend?: { direction: "up" | "down"; change: number }
}

export type DashboardKPIs = {
  activeUsers: KpiValue
  matchesToday: KpiValue
  monthlyRevenue: KpiValue
  reunionMonthlyRevenue: KpiValue
  pendingReports: KpiValue
}

export type TierCounts = Record<(typeof TIERS)[number], number>

export type GrowthData = {
  month: string
  users: number
  matches: number
}

export type RecentActivity = {
  id: string
  user: string
  action: string
  target: string
  status: string
  time: string
  created_at: string
}

export async function getDashboardKPIs(): Promise<DashboardKPIs> {
  await requireAdminAction("view_dashboard")

  const supabase = createAdminClient()

  // Use UTC dates to avoid timezone issues
  const now = new Date()
  const year = now.getUTCFullYear()
  const month = now.getUTCMonth()
  const day = now.getUTCDate()

  const startOfToday = new Date(Date.UTC(year, month, day, 0, 0, 0))
  const startOfYesterday = new Date(Date.UTC(year, month, day - 1, 0, 0, 0))
  const startOfMonth = new Date(Date.UTC(year, month, 1, 0, 0, 0))
  const startOfLastMonth = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0))

  const [
    activeUsersResult,
    lastMonthUsersResult,
    matchesTodayResult,
    matchesYesterdayResult,
    monthlySubRevenueResult,
    lastMonthSubRevenueResult,
    monthlyMicroRevenueResult,
    lastMonthMicroRevenueResult,
    reunionMonthlyRevenue,
    reunionLastMonthRevenue,
    pendingReportsResult,
  ] = await Promise.all([
    supabase
      .from("users")
      .select("id", { count: "exact", head: true })
      .not("birthdate", "is", null)
      .not("gender", "is", null),
    supabase
      .from("users")
      .select("id", { count: "exact", head: true })
      .not("birthdate", "is", null)
      .not("gender", "is", null)
      .lt("created_at", startOfMonth.toISOString()),
    supabase
      .from("matches")
      .select("id", { count: "exact", head: true })
      .gte("created_at", startOfToday.toISOString()),
    supabase
      .from("matches")
      .select("id", { count: "exact", head: true })
      .gte("created_at", startOfYesterday.toISOString())
      .lt("created_at", startOfToday.toISOString()),
    // Subscription revenue this month
    supabase
      .from("subscriptions")
      .select("amount_paid")
      .or(NOT_STORE_PAYMENT)
      .gte("created_at", startOfMonth.toISOString()),
    // Subscription revenue last month
    supabase
      .from("subscriptions")
      .select("amount_paid")
      .or(NOT_STORE_PAYMENT)
      .gte("created_at", startOfLastMonth.toISOString())
      .lt("created_at", startOfMonth.toISOString()),
    // Micro-purchases revenue this month (excluding subscriptions)
    supabase
      .from("micro_purchases")
      .select("price_paid")
      .eq("status", "completed")
      .neq("product_type", "subscription")
      .or(NOT_STORE_PAYMENT)
      .gte("created_at", startOfMonth.toISOString()),
    // Micro-purchases revenue last month (excluding subscriptions)
    supabase
      .from("micro_purchases")
      .select("price_paid")
      .eq("status", "completed")
      .neq("product_type", "subscription")
      .or(NOT_STORE_PAYMENT)
      .gte("created_at", startOfLastMonth.toISOString())
      .lt("created_at", startOfMonth.toISOString()),
    getReunionStoreRevenue(supabase, startOfMonth),
    getReunionStoreRevenue(supabase, startOfLastMonth, startOfMonth),
    supabase
      .from("reported_content")
      .select("id", { count: "exact", head: true })
      .eq("status", "pending"),
  ])

  const monthlyRevenue = addAvailable(
    sumRows(monthlySubRevenueResult, (s) => s.amount_paid, "monthly subscription revenue"),
    sumRows(monthlyMicroRevenueResult, (m) => m.price_paid, "monthly micro-purchase revenue")
  )
  const lastMonthRevenue = addAvailable(
    sumRows(lastMonthSubRevenueResult, (s) => s.amount_paid, "last month subscription revenue"),
    sumRows(lastMonthMicroRevenueResult, (m) => m.price_paid, "last month micro-purchase revenue")
  )

  return {
    activeUsers: toKpi(
      readCount(activeUsersResult, "members"),
      readCount(lastMonthUsersResult, "members last month")
    ),
    matchesToday: toKpi(
      readCount(matchesTodayResult, "matches today"),
      readCount(matchesYesterdayResult, "matches yesterday")
    ),
    monthlyRevenue: toKpi(monthlyRevenue, lastMonthRevenue),
    reunionMonthlyRevenue: toKpi(reunionMonthlyRevenue, reunionLastMonthRevenue),
    pendingReports: { total: readCount(pendingReportsResult, "pending reports") },
  }
}

function readCount(result: CountResult, label: string): number | null {
  if (result.error) {
    console.error(`Dashboard query failed: ${label}`, result.error)
    return null
  }
  return result.count ?? 0
}

function sumRows<T>(result: RowsResult<T>, pick: (row: T) => number | null, label: string): number | null {
  if (result.error) {
    console.error(`Dashboard query failed: ${label}`, result.error)
    return null
  }
  return (result.data ?? []).reduce((sum, row) => sum + (pick(row) ?? 0), 0)
}

function addAvailable(first: number | null, second: number | null): number | null {
  return first === null || second === null ? null : first + second
}

function toKpi(current: number | null, previous: number | null): KpiValue {
  if (current === null || previous === null) return { total: current }

  const change = getChangePercent(current, previous)
  return { total: current, trend: { direction: change >= 0 ? "up" : "down", change: Math.abs(change) } }
}

/**
 * Store revenue in euros paid by members located in La Réunion. Store
 * payments carry no region, so the member's current coordinates decide it.
 */
async function getReunionStoreRevenue(supabase: AdminClient, from: Date, to?: Date): Promise<number | null> {
  let query = supabase
    .from("micro_purchases")
    .select("price_paid, user:user_id(latitude, longitude)")
    .eq("status", "completed")
    .in("payment_method", STORE_PAYMENT_METHODS)
    .gte("created_at", from.toISOString())

  if (to) query = query.lt("created_at", to.toISOString())

  const { data, error } = await query.returns<StorePurchaseRow[]>()
  if (error) {
    console.error("Dashboard query failed: La Réunion store revenue", error)
    return null
  }

  const cents = (data ?? [])
    .filter((purchase) => isInReunion(purchase.user?.latitude ?? null, purchase.user?.longitude ?? null))
    .reduce((sum, purchase) => sum + (purchase.price_paid ?? 0), 0)

  return cents / CENTS_PER_UNIT
}

function getChangePercent(current: number, previous: number): number {
  return previous > 0 ? Math.round(((current - previous) / previous) * 100) : 0
}

export async function getGrowthData(): Promise<GrowthData[] | null> {
  await requireAdminAction("view_dashboard")

  try {
    return await getCachedGrowthData()
  } catch (error) {
    console.error("Dashboard query failed: growth", error)
    return null
  }
}

const getCachedGrowthData = unstable_cache(fetchGrowthData, ["dashboard-growth"], {
  revalidate: SLOW_DATA_REVALIDATE_SECONDS,
})

async function fetchGrowthData(): Promise<GrowthData[]> {
  const supabase = createAdminClient()

  const months: GrowthData[] = []
  const now = new Date()
  const year = now.getUTCFullYear()
  const month = now.getUTCMonth()

  // French month names
  const monthNames = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"]

  for (let i = 5; i >= 0; i--) {
    // Calculate month offset
    let targetMonth = month - i
    let targetYear = year
    while (targetMonth < 0) {
      targetMonth += 12
      targetYear--
    }

    const startOfMonth = new Date(Date.UTC(targetYear, targetMonth, 1, 0, 0, 0))
    const endOfMonth = new Date(Date.UTC(targetYear, targetMonth + 1, 0, 23, 59, 59, 999))

    const monthName = monthNames[targetMonth]

    const [usersResult, matchesResult] = await Promise.all([
      // Cumulative users up to end of month (only completed registrations)
      supabase
        .from("users")
        .select("id", { count: "exact", head: true })
        .not("birthdate", "is", null)
        .not("gender", "is", null)
        .lte("created_at", endOfMonth.toISOString()),
      // Matches created in this month
      supabase
        .from("matches")
        .select("id", { count: "exact", head: true })
        .gte("created_at", startOfMonth.toISOString())
        .lt("created_at", new Date(Date.UTC(targetYear, targetMonth + 1, 1, 0, 0, 0)).toISOString()),
    ])

    if (usersResult.error) throw usersResult.error
    if (matchesResult.error) throw matchesResult.error

    months.push({
      month: monthName,
      users: usersResult.count ?? 0,
      matches: matchesResult.count ?? 0,
    })
  }

  return months
}

export async function getRecentActivity(): Promise<RecentActivity[]> {
  await requireAdminAction("view_dashboard")

  const supabase = createAdminClient()

  const activities: RecentActivity[] = []

  const [reportsResult, subscriptionsResult, usersResult, microPurchasesResult] = await Promise.all([
    supabase
      .from("reported_content")
      .select(`
        id,
        reason,
        status,
        created_at,
        reporter:reporter_id(firstName)
      `)
      .order("created_at", { ascending: false })
      .limit(3),
    supabase
      .from("subscriptions")
      .select(`
        id,
        tier,
        status,
        created_at,
        amount_paid,
        user_id,
        user:user_id(firstName)
      `)
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(3),
    supabase
      .from("users")
      .select("id, firstName, created_at")
      .order("created_at", { ascending: false })
      .limit(3),
    supabase
      .from("micro_purchases")
      .select(`
        id,
        product_type,
        product_name,
        quantity,
        price_paid,
        status,
        created_at,
        user:user_id(firstName)
      `)
      .eq("status", "completed")
      .neq("product_type", "subscription")
      .order("created_at", { ascending: false })
      .limit(3),
  ])

  if (reportsResult.data) {
    for (const report of reportsResult.data) {
      const reporter = report.reporter as unknown as { firstName: string } | null
      activities.push({
        id: report.id,
        user: reporter?.firstName ?? "Anonyme",
        action: "Signalement",
        target: translateReason(report.reason),
        status: translateStatus(report.status),
        time: getRelativeTime(report.created_at),
        created_at: report.created_at,
      })
    }
  }

  if (subscriptionsResult.data) {
    for (const sub of subscriptionsResult.data) {
      const user = sub.user as unknown as { firstName: string } | null
      const currentTier = sub.tier
      const tierName = translateTier(currentTier)

      // Check if this is an upgrade by looking for previous subscriptions
      let isUpgrade = false
      let previousTierName = ""

      if (sub.user_id) {
        const { data: previousSubs } = await supabase
          .from("subscriptions")
          .select("tier, created_at")
          .eq("user_id", sub.user_id)
          .neq("id", sub.id)
          .order("created_at", { ascending: false })
          .limit(1)

        if (previousSubs && previousSubs.length > 0) {
          const previousTier = previousSubs[0].tier
          // Check if current tier is higher than previous
          if (previousTier !== currentTier && isTierUpgrade(previousTier, currentTier)) {
            isUpgrade = true
            previousTierName = translateTier(previousTier)
          }
        }
      }

      activities.push({
        id: sub.id,
        user: user?.firstName ?? "Utilisateur",
        action: isUpgrade
          ? `Upgrade ${previousTierName} → ${tierName}`
          : `Abonnement ${tierName}`,
        target: `${sub.amount_paid?.toLocaleString("fr-FR")} MGA`,
        status: "Complété",
        time: getRelativeTime(sub.created_at),
        created_at: sub.created_at ?? "",
      })
    }
  }

  if (microPurchasesResult.data) {
    for (const purchase of microPurchasesResult.data) {
      const user = purchase.user as unknown as { firstName: string } | null
      const consumableName = translateConsumable(purchase.product_type)
      activities.push({
        id: purchase.id,
        user: user?.firstName ?? "Utilisateur",
        action: `Achat ${consumableName}`,
        target: `${purchase.quantity}x - ${purchase.price_paid?.toLocaleString("fr-FR")} MGA`,
        status: "Complété",
        time: getRelativeTime(purchase.created_at),
        created_at: purchase.created_at ?? "",
      })
    }
  }

  if (usersResult.data) {
    for (const user of usersResult.data) {
      activities.push({
        id: user.id,
        user: user.firstName ?? "Nouveau",
        action: "Inscription",
        target: "Nouveau compte",
        status: "Vérifié",
        time: getRelativeTime(user.created_at),
        created_at: user.created_at,
      })
    }
  }

  return activities
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5)
}

function translateReason(reason: string): string {
  const translations: Record<string, string> = {
    nudity: "Nudité",
    harassment: "Harcèlement",
    fake: "Faux profil",
    spam: "Spam",
    violence: "Violence",
    hate_speech: "Discours haineux",
    minor: "Mineur",
    other: "Autre",
  }
  return translations[reason] ?? reason
}

function translateStatus(status: string): string {
  const translations: Record<string, string> = {
    pending: "En attente",
    reviewing: "En cours",
    approved: "Approuvé",
    removed: "Supprimé",
    user_warned: "Avertissement",
    user_banned: "Banni",
  }
  return translations[status] ?? status
}

function translateTier(tier: string | null): string {
  const translations: Record<string, string> = {
    silver: "Silver",
    gold: "Gold",
    elite: "Elite",
  }
  return translations[tier ?? ""] ?? "Premium"
}

function isTierUpgrade(previousTier: string | null, currentTier: string | null): boolean {
  const tierOrder: Record<string, number> = {
    base: 0,
    silver: 1,
    gold: 2,
    elite: 3,
  }
  const prevLevel = tierOrder[previousTier ?? "base"] ?? 0
  const currLevel = tierOrder[currentTier ?? "base"] ?? 0
  return currLevel > prevLevel
}

function translateConsumable(type: string): string {
  const translations: Record<string, string> = {
    tia_heart: "TIA Hearts",
    boost: "Boost",
    reveal_like: "Révélation",
  }
  return translations[type] ?? type
}

function getRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return "À l'instant"
  if (diffMins < 60) return `Il y a ${diffMins} min`
  if (diffHours < 24) return `Il y a ${diffHours}h`
  if (diffDays < 7) return `Il y a ${diffDays}j`
  return date.toLocaleDateString("fr-FR")
}

export async function getTierDistribution(): Promise<TierCounts | null> {
  await requireAdminAction("view_dashboard")

  try {
    return await getCachedTierDistribution()
  } catch (error) {
    console.error("Dashboard query failed: tier distribution", error)
    return null
  }
}

const getCachedTierDistribution = unstable_cache(fetchTierDistribution, ["dashboard-tiers"], {
  revalidate: SLOW_DATA_REVALIDATE_SECONDS,
})

async function fetchTierDistribution(): Promise<TierCounts> {
  const supabase = createAdminClient()

  const results = await Promise.all(
    TIERS.map((tier) =>
      supabase
        .from("users")
        .select("id", { count: "exact", head: true })
        .eq("is_active", true)
        .eq("current_tier", tier)
        .not("birthdate", "is", null)
        .not("gender", "is", null)
    )
  )

  const failed = results.find((result) => result.error)
  if (failed?.error) throw failed.error

  const [base, silver, gold, elite] = results.map((result) => result.count ?? 0)
  return { base, silver, gold, elite }
}
