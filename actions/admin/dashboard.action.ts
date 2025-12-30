"use server"

import { createAdminClient } from "@/lib/supabase/admin"

export type DashboardKPIs = {
  activeUsers: {
    total: number
    change: number
    trend: "up" | "down"
  }
  matchesToday: {
    total: number
    change: number
    trend: "up" | "down"
  }
  monthlyRevenue: {
    total: number
    change: number
    trend: "up" | "down"
  }
  pendingReports: {
    total: number
  }
}

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
    pendingReportsResult,
  ] = await Promise.all([
    supabase
      .from("users")
      .select("id", { count: "exact", head: true })
      .eq("is_active", true),
    supabase
      .from("users")
      .select("id", { count: "exact", head: true })
      .eq("is_active", true)
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
      .gte("created_at", startOfMonth.toISOString()),
    // Subscription revenue last month
    supabase
      .from("subscriptions")
      .select("amount_paid")
      .gte("created_at", startOfLastMonth.toISOString())
      .lt("created_at", startOfMonth.toISOString()),
    // Micro-purchases revenue this month
    supabase
      .from("micro_purchases")
      .select("price_paid")
      .eq("status", "completed")
      .gte("created_at", startOfMonth.toISOString()),
    // Micro-purchases revenue last month
    supabase
      .from("micro_purchases")
      .select("price_paid")
      .eq("status", "completed")
      .gte("created_at", startOfLastMonth.toISOString())
      .lt("created_at", startOfMonth.toISOString()),
    supabase
      .from("reported_content")
      .select("id", { count: "exact", head: true })
      .eq("status", "pending"),
  ])

  const activeUsers = activeUsersResult.count ?? 0
  const lastMonthUsers = lastMonthUsersResult.count ?? 0
  const userChange = lastMonthUsers > 0
    ? Math.round(((activeUsers - lastMonthUsers) / lastMonthUsers) * 100)
    : 0

  const matchesToday = matchesTodayResult.count ?? 0
  const matchesYesterday = matchesYesterdayResult.count ?? 0
  const matchChange = matchesYesterday > 0
    ? Math.round(((matchesToday - matchesYesterday) / matchesYesterday) * 100)
    : 0

  // Total revenue = subscriptions + micro-purchases
  const monthlySubRevenue = monthlySubRevenueResult.data?.reduce((sum, s) => sum + (s.amount_paid || 0), 0) ?? 0
  const monthlyMicroRevenue = monthlyMicroRevenueResult.data?.reduce((sum, m) => sum + (m.price_paid || 0), 0) ?? 0
  const monthlyRevenue = monthlySubRevenue + monthlyMicroRevenue

  const lastMonthSubRevenue = lastMonthSubRevenueResult.data?.reduce((sum, s) => sum + (s.amount_paid || 0), 0) ?? 0
  const lastMonthMicroRevenue = lastMonthMicroRevenueResult.data?.reduce((sum, m) => sum + (m.price_paid || 0), 0) ?? 0
  const lastMonthRevenue = lastMonthSubRevenue + lastMonthMicroRevenue

  const revenueChange = lastMonthRevenue > 0
    ? Math.round(((monthlyRevenue - lastMonthRevenue) / lastMonthRevenue) * 100)
    : 0

  const pendingReports = pendingReportsResult.count ?? 0

  return {
    activeUsers: {
      total: activeUsers,
      change: Math.abs(userChange),
      trend: userChange >= 0 ? "up" : "down",
    },
    matchesToday: {
      total: matchesToday,
      change: Math.abs(matchChange),
      trend: matchChange >= 0 ? "up" : "down",
    },
    monthlyRevenue: {
      total: monthlyRevenue,
      change: Math.abs(revenueChange),
      trend: revenueChange >= 0 ? "up" : "down",
    },
    pendingReports: {
      total: pendingReports,
    },
  }
}

export async function getGrowthData(): Promise<GrowthData[]> {
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
      // Cumulative users up to end of month
      supabase
        .from("users")
        .select("id", { count: "exact", head: true })
        .lte("created_at", endOfMonth.toISOString()),
      // Matches created in this month
      supabase
        .from("matches")
        .select("id", { count: "exact", head: true })
        .gte("created_at", startOfMonth.toISOString())
        .lt("created_at", new Date(Date.UTC(targetYear, targetMonth + 1, 1, 0, 0, 0)).toISOString()),
    ])

    months.push({
      month: monthName,
      users: usersResult.count ?? 0,
      matches: matchesResult.count ?? 0,
    })
  }

  return months
}

export async function getRecentActivity(): Promise<RecentActivity[]> {
  const supabase = createAdminClient()

  const activities: RecentActivity[] = []

  const [reportsResult, subscriptionsResult, usersResult] = await Promise.all([
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
      activities.push({
        id: sub.id,
        user: user?.firstName ?? "Utilisateur",
        action: "Abonnement Premium",
        target: `Plan ${sub.tier?.toUpperCase()}`,
        status: "Complété",
        time: getRelativeTime(sub.created_at),
        created_at: sub.created_at ?? "",
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

export async function getTierDistribution() {
  const supabase = createAdminClient()

  const { data } = await supabase
    .from("users")
    .select("current_tier")
    .eq("is_active", true)

  const distribution = {
    base: 0,
    silver: 0,
    gold: 0,
    elite: 0,
  }

  if (data) {
    for (const user of data) {
      const tier = user.current_tier as keyof typeof distribution
      if (tier in distribution) {
        distribution[tier]++
      }
    }
  }

  return distribution
}
