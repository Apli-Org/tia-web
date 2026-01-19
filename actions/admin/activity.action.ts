"use server"

import { createAdminClient } from "@/lib/supabase/admin"

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

export async function getUserActivityStats(): Promise<UserActivityStats> {
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
    supabase.from("subscriptions").select("id", { count: "exact", head: true }).eq("status", "active"),
    supabase.from("subscriptions").select("id", { count: "exact", head: true }).eq("status", "active").gte("created_at", todayStart),
    supabase.from("subscriptions").select("id", { count: "exact", head: true }).eq("status", "active").gte("created_at", weekStart),
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
        let query = supabase
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

        if (dateFilters.from) query = query.gte("created_at", dateFilters.from)
        if (dateFilters.to) query = query.lte("created_at", dateFilters.to)
        if (filters.search) query = query.ilike("user.firstName", `%${filters.search}%`)

        const { data } = await query

        if (data) {
          for (const sub of data) {
            const user = sub.user as unknown as { firstName: string } | null
            const userName = user?.firstName ?? "Utilisateur"

            if (filters.search && !userName.toLowerCase().includes(filters.search.toLowerCase())) {
              continue
            }

            const currentTier = sub.tier
            const tierName = translateTier(currentTier)

            // Check for upgrade
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
                if (previousTier !== currentTier && isTierUpgrade(previousTier, currentTier)) {
                  isUpgrade = true
                  previousTierName = translateTier(previousTier)
                }
              }
            }

            activities.push({
              id: sub.id,
              user_id: sub.user_id ?? "",
              user_name: userName,
              type: isUpgrade ? "upgrade" : "subscription",
              action: isUpgrade ? `Upgrade ${previousTierName} → ${tierName}` : `Abonnement ${tierName}`,
              details: `${sub.amount_paid?.toLocaleString("fr-FR")} MGA`,
              amount: sub.amount_paid,
              status: "Complete",
              created_at: sub.created_at ?? "",
            })
          }
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
            status,
            created_at,
            user_id,
            user:user_id(firstName)
          `)
          .eq("status", "completed")
          .neq("product_type", "subscription")
          .order("created_at", { ascending: false })

        if (dateFilters.from) query = query.gte("created_at", dateFilters.from)
        if (dateFilters.to) query = query.lte("created_at", dateFilters.to)

        const { data } = await query

        if (data) {
          for (const purchase of data) {
            const user = purchase.user as unknown as { firstName: string } | null
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
              details: `${purchase.quantity}x - ${purchase.price_paid?.toLocaleString("fr-FR")} MGA`,
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
