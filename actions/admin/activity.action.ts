"use server"

import type { PostgrestError } from "@supabase/supabase-js"

import { requireAdminAction } from "@/lib/auth/admin-guard"
import { createAdminClient } from "@/lib/supabase/admin"
import { formatPaidAmount } from "@/lib/pricing-utils"

const PAGE_ROWS = 1000

type MemberWithCoordinates = { firstName: string; latitude: number | null; longitude: number | null }

type SubscriptionActivityRow = {
  id: string
  tier: string | null
  status: string | null
  created_at: string | null
  amount_paid: number | null
  currency: string | null
  payment_method: string | null
  user_id: string | null
  user: MemberWithCoordinates | null
}

type TierHistoryRow = { id: string; user_id: string; tier: string | null; created_at: string | null }

type TierHistory = Map<string, TierHistoryRow[]>

export type ActivityType =
  | "subscription"
  | "upgrade"
  | "purchase"
  | "registration"
  | "report"

export type UserActivity = {
  id: string
  user_id: string
  user_name: string
  type: ActivityType
  action: string
  details: string
  amount: number | null
  status: string
  created_at: string
}

export type UserActivityFilters = {
  type?: string
  dateFrom?: string
  dateTo?: string
  search?: string
}

export type UserActivityStats = {
  total: number
  todayCount: number
  weekCount: number
  byType: { type: string; count: number }[]
}

export type PaginatedActivities = {
  activities: UserActivity[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

const tierOrder: Record<string, number> = {
  base: 0,
  silver: 1,
  gold: 2,
  elite: 3,
}

function isTierUpgrade(previousTier: string | null, currentTier: string | null): boolean {
  const prevLevel = tierOrder[previousTier ?? "base"] ?? 0
  const currLevel = tierOrder[currentTier ?? "base"] ?? 0
  return currLevel > prevLevel
}

function translateTier(tier: string | null): string {
  const translations: Record<string, string> = {
    silver: "Silver",
    gold: "Gold",
    elite: "Elite",
  }
  return translations[tier ?? ""] ?? "Premium"
}

function translateSubscriptionStatus(status: string | null): string {
  const translations: Record<string, string> = {
    active: "Actif",
    cancelled: "Résilié",
    expired: "Expiré",
    paused: "En pause",
  }
  return translations[status ?? ""] ?? "Complete"
}

function translateConsumable(type: string): string {
  const translations: Record<string, string> = {
    tia_heart: "TIA Hearts",
    boost: "Boost",
    reveal_like: "Revelation",
  }
  return translations[type] ?? type
}

function translateReportReason(reason: string): string {
  const translations: Record<string, string> = {
    nudity: "Nudite",
    harassment: "Harcelement",
    fake: "Faux profil",
    spam: "Spam",
    violence: "Violence",
    hate_speech: "Discours haineux",
    minor: "Mineur",
    other: "Autre",
  }
  return translations[reason] ?? reason
}

function translateReportStatus(status: string): string {
  const translations: Record<string, string> = {
    pending: "En attente",
    reviewing: "En cours",
    approved: "Approuve",
    removed: "Supprime",
    user_warned: "Avertissement",
    user_banned: "Banni",
  }
  return translations[status] ?? status
}

/** Reads every row of a query, past the 1000 rows PostgREST returns at once. */
async function fetchAllRows<T>(
  fetchPage: (from: number, to: number) => PromiseLike<{ data: T[] | null; error: PostgrestError | null }>
): Promise<T[]> {
  const rows: T[] = []

  for (;;) {
    const { data, error } = await fetchPage(rows.length, rows.length + PAGE_ROWS - 1)
    if (error) throw error
    rows.push(...(data ?? []))
    if (!data || data.length < PAGE_ROWS) return rows
  }
}

/** Every subscription of every member, oldest first. */
async function getTierHistory(supabase: ReturnType<typeof createAdminClient>): Promise<TierHistory> {
  const rows = await fetchAllRows<TierHistoryRow>((from, to) =>
    supabase
      .from("subscriptions")
      .select("id, user_id, tier, created_at")
      .not("user_id", "is", null)
      .order("created_at")
      .order("id")
      .range(from, to)
      .returns<TierHistoryRow[]>()
  )

  const history: TierHistory = new Map()
  for (const row of rows) {
    history.set(row.user_id, [...(history.get(row.user_id) ?? []), row])
  }
  return history
}

/** Tier of the member's subscription just before this one, null for the first. */
function getPreviousTier(history: TierHistory, sub: SubscriptionActivityRow): string | null {
  const memberHistory = history.get(sub.user_id ?? "") ?? []
  const index = memberHistory.findIndex((row) => row.id === sub.id)
  return index > 0 ? memberHistory[index - 1].tier : null
}

export async function getUserActivityStats(): Promise<UserActivityStats> {
  await requireAdminAction("view_dashboard")

  const supabase = createAdminClient()

  const now = new Date()
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()
  const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()

  const [
    subsTotal,
    subsToday,
    subsWeek,
    purchasesTotal,
    purchasesToday,
    purchasesWeek,
    usersTotal,
    usersToday,
    usersWeek,
    reportsTotal,
    reportsToday,
    reportsWeek,
  ] = await Promise.all([
    supabase.from("subscriptions").select("id", { count: "exact", head: true }),
    supabase.from("subscriptions").select("id", { count: "exact", head: true }).gte("created_at", todayStart),
    supabase.from("subscriptions").select("id", { count: "exact", head: true }).gte("created_at", weekStart),
    supabase.from("micro_purchases").select("id", { count: "exact", head: true }).eq("status", "completed").neq("product_type", "subscription"),
    supabase.from("micro_purchases").select("id", { count: "exact", head: true }).eq("status", "completed").neq("product_type", "subscription").gte("created_at", todayStart),
    supabase.from("micro_purchases").select("id", { count: "exact", head: true }).eq("status", "completed").neq("product_type", "subscription").gte("created_at", weekStart),
    supabase.from("users").select("id", { count: "exact", head: true }),
    supabase.from("users").select("id", { count: "exact", head: true }).gte("created_at", todayStart),
    supabase.from("users").select("id", { count: "exact", head: true }).gte("created_at", weekStart),
    supabase.from("reported_content").select("id", { count: "exact", head: true }),
    supabase.from("reported_content").select("id", { count: "exact", head: true }).gte("created_at", todayStart),
    supabase.from("reported_content").select("id", { count: "exact", head: true }).gte("created_at", weekStart),
  ])

  const totalSubs = subsTotal.count ?? 0
  const totalPurchases = purchasesTotal.count ?? 0
  const totalUsers = usersTotal.count ?? 0
  const totalReports = reportsTotal.count ?? 0

  const todaySubs = subsToday.count ?? 0
  const todayPurchases = purchasesToday.count ?? 0
  const todayUsers = usersToday.count ?? 0
  const todayReports = reportsToday.count ?? 0

  const weekSubs = subsWeek.count ?? 0
  const weekPurchases = purchasesWeek.count ?? 0
  const weekUsers = usersWeek.count ?? 0
  const weekReports = reportsWeek.count ?? 0

  return {
    total: totalSubs + totalPurchases + totalUsers + totalReports,
    todayCount: todaySubs + todayPurchases + todayUsers + todayReports,
    weekCount: weekSubs + weekPurchases + weekUsers + weekReports,
    byType: [
      { type: "Abonnements", count: totalSubs },
      { type: "Achats", count: totalPurchases },
      { type: "Inscriptions", count: totalUsers },
      { type: "Signalements", count: totalReports },
    ],
  }
}

export async function getAllUserActivities(
  page: number = 1,
  pageSize: number = 20,
  filters: UserActivityFilters = {}
): Promise<PaginatedActivities> {
  await requireAdminAction("view_dashboard")

  const supabase = createAdminClient()
  const activities: UserActivity[] = []

  // Build date filters
  const dateFilters = {
    from: filters.dateFrom || undefined,
    to: filters.dateTo || undefined,
  }

  // Fetch all activity types based on filter
  const shouldFetchSubs = !filters.type || filters.type === "all" || filters.type === "subscription"
  const shouldFetchPurchases = !filters.type || filters.type === "all" || filters.type === "purchase"
  const shouldFetchUsers = !filters.type || filters.type === "all" || filters.type === "registration"
  const shouldFetchReports = !filters.type || filters.type === "all" || filters.type === "report"

  const promises: Promise<void>[] = []

  // Subscriptions
  if (shouldFetchSubs) {
    promises.push(
      (async () => {
        const [subscriptions, tierHistory] = await Promise.all([
          fetchAllRows<SubscriptionActivityRow>((from, to) => {
            let query = supabase
              .from("subscriptions")
              .select(`
                id,
                tier,
                status,
                created_at,
                amount_paid,
                currency,
                payment_method,
                user_id,
                user:user_id(firstName, latitude, longitude)
              `)
              .order("created_at", { ascending: false })
              .order("id")

            if (dateFilters.from) query = query.gte("created_at", dateFilters.from)
            if (dateFilters.to) query = query.lte("created_at", dateFilters.to)

            return query.range(from, to).returns<SubscriptionActivityRow[]>()
          }),
          getTierHistory(supabase),
        ])

        for (const sub of subscriptions) {
          const userName = sub.user?.firstName ?? "Utilisateur"

          if (filters.search && !userName.toLowerCase().includes(filters.search.toLowerCase())) {
            continue
          }

          const tierName = translateTier(sub.tier)
          const previousTier = getPreviousTier(tierHistory, sub)
          const isUpgrade = previousTier !== null && isTierUpgrade(previousTier, sub.tier)

          activities.push({
            id: sub.id,
            user_id: sub.user_id ?? "",
            user_name: userName,
            type: isUpgrade ? "upgrade" : "subscription",
            action: isUpgrade ? `Upgrade ${translateTier(previousTier)} → ${tierName}` : `Abonnement ${tierName}`,
            details: formatPaidAmount(sub.amount_paid, sub.payment_method, sub.currency, sub.user),
            amount: sub.amount_paid,
            status: translateSubscriptionStatus(sub.status),
            created_at: sub.created_at ?? "",
          })
        }
      })()
    )
  }

  // Micro purchases
  if (shouldFetchPurchases) {
    promises.push(
      (async () => {
        let query = supabase
          .from("micro_purchases")
          .select(`
            id,
            product_type,
            product_name,
            quantity,
            price_paid,
            currency,
            payment_method,
            status,
            created_at,
            user_id,
            user:user_id(firstName, latitude, longitude)
          `)
          .eq("status", "completed")
          .neq("product_type", "subscription")
          .order("created_at", { ascending: false })

        if (dateFilters.from) query = query.gte("created_at", dateFilters.from)
        if (dateFilters.to) query = query.lte("created_at", dateFilters.to)

        const { data } = await query

        if (data) {
          for (const purchase of data) {
            const user = purchase.user as unknown as MemberWithCoordinates | null
            const userName = user?.firstName ?? "Utilisateur"

            if (filters.search && !userName.toLowerCase().includes(filters.search.toLowerCase())) {
              continue
            }

            const consumableName = translateConsumable(purchase.product_type)

            activities.push({
              id: purchase.id,
              user_id: purchase.user_id ?? "",
              user_name: userName,
              type: "purchase",
              action: `Achat ${consumableName}`,
              details: `${purchase.quantity}x - ${formatPaidAmount(purchase.price_paid, purchase.payment_method, purchase.currency, user)}`,
              amount: purchase.price_paid,
              status: "Complete",
              created_at: purchase.created_at ?? "",
            })
          }
        }
      })()
    )
  }

  // User registrations
  if (shouldFetchUsers) {
    promises.push(
      (async () => {
        let query = supabase
          .from("users")
          .select("id, firstName, created_at")
          .order("created_at", { ascending: false })

        if (dateFilters.from) query = query.gte("created_at", dateFilters.from)
        if (dateFilters.to) query = query.lte("created_at", dateFilters.to)
        if (filters.search) query = query.ilike("firstName", `%${filters.search}%`)

        const { data } = await query

        if (data) {
          for (const user of data) {
            const userName = user.firstName ?? "Nouveau"

            if (filters.search && !userName.toLowerCase().includes(filters.search.toLowerCase())) {
              continue
            }

            activities.push({
              id: user.id,
              user_id: user.id,
              user_name: userName,
              type: "registration",
              action: "Inscription",
              details: "Nouveau compte",
              amount: null,
              status: "Verifie",
              created_at: user.created_at,
            })
          }
        }
      })()
    )
  }

  // Reports
  if (shouldFetchReports) {
    promises.push(
      (async () => {
        let query = supabase
          .from("reported_content")
          .select(`
            id,
            reason,
            status,
            created_at,
            reporter_id,
            reporter:reporter_id(firstName)
          `)
          .order("created_at", { ascending: false })

        if (dateFilters.from) query = query.gte("created_at", dateFilters.from)
        if (dateFilters.to) query = query.lte("created_at", dateFilters.to)

        const { data } = await query

        if (data) {
          for (const report of data) {
            const reporter = report.reporter as unknown as { firstName: string } | null
            const userName = reporter?.firstName ?? "Anonyme"

            if (filters.search && !userName.toLowerCase().includes(filters.search.toLowerCase())) {
              continue
            }

            activities.push({
              id: report.id,
              user_id: report.reporter_id ?? "",
              user_name: userName,
              type: "report",
              action: "Signalement",
              details: translateReportReason(report.reason),
              amount: null,
              status: translateReportStatus(report.status),
              created_at: report.created_at,
            })
          }
        }
      })()
    )
  }

  await Promise.all(promises)

  // Sort all activities by date
  activities.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  // Paginate
  const total = activities.length
  const startIndex = (page - 1) * pageSize
  const paginatedActivities = activities.slice(startIndex, startIndex + pageSize)

  return {
    activities: paginatedActivities,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  }
}

export async function getActivityTypes(): Promise<{ value: string; label: string }[]> {
  return [
    { value: "all", label: "Tous" },
    { value: "subscription", label: "Abonnements" },
    { value: "upgrade", label: "Upgrades" },
    { value: "purchase", label: "Achats" },
    { value: "registration", label: "Inscriptions" },
    { value: "report", label: "Signalements" },
  ]
}
