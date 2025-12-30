"use server"

import { createAdminClient } from "@/lib/supabase/admin"
import { revalidatePath } from "next/cache"
import { getCurrentAdmin } from "./auth.action"
import { hasPermission, type AdminRole } from "@/lib/staff-utils"

export type UserListItem = {
  id: string
  email: string
  firstName: string | null
  gender: string | null
  birthdate: string | null
  location: string | null
  profilePhoto: string | null
  is_active: boolean
  is_verified: boolean
  isPremium: boolean
  current_tier: string | null
  created_at: string
  banned_until: string | null
}

export type UsersFilter = {
  search?: string
  tier?: string
  status?: "all" | "active" | "inactive" | "banned"
  verified?: "all" | "verified" | "unverified"
  gender?: string
  sortBy?: "created_at" | "firstName" | "email"
  sortOrder?: "asc" | "desc"
}

export type PaginatedUsers = {
  users: UserListItem[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export async function getUsers(
  page: number = 1,
  pageSize: number = 20,
  filters: UsersFilter = {}
): Promise<PaginatedUsers> {
  const supabase = createAdminClient()

  const offset = (page - 1) * pageSize

  let query = supabase
    .from("users")
    .select(
      `
      id,
      email,
      firstName,
      gender,
      birthdate,
      location,
      profilePhoto,
      is_active,
      is_verified,
      isPremium,
      current_tier,
      created_at,
      banned_until
    `,
      { count: "exact" }
    )

  // Apply filters
  if (filters.search) {
    query = query.or(
      `firstName.ilike.%${filters.search}%,email.ilike.%${filters.search}%`
    )
  }

  if (filters.tier && filters.tier !== "all") {
    query = query.eq("current_tier", filters.tier)
  }

  if (filters.status === "active") {
    query = query.eq("is_active", true).is("banned_until", null)
  } else if (filters.status === "inactive") {
    query = query.eq("is_active", false)
  } else if (filters.status === "banned") {
    query = query.not("banned_until", "is", null)
  }

  if (filters.verified === "verified") {
    query = query.eq("is_verified", true)
  } else if (filters.verified === "unverified") {
    query = query.eq("is_verified", false)
  }

  if (filters.gender && filters.gender !== "all") {
    query = query.eq("gender", filters.gender)
  }

  // Apply sorting
  const sortBy = filters.sortBy || "created_at"
  const sortOrder = filters.sortOrder || "desc"
  query = query.order(sortBy, { ascending: sortOrder === "asc" })

  // Apply pagination
  query = query.range(offset, offset + pageSize - 1)

  const { data, count, error } = await query

  if (error) {
    console.error("Error fetching users:", error)
    throw new Error("Erreur lors de la récupération des utilisateurs")
  }

  const total = count ?? 0

  return {
    users: (data as UserListItem[]) ?? [],
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  }
}

export async function getUserById(userId: string) {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from("users")
    .select(
      `
      *,
      subscription:subscriptions!subscriptions_user_id_fkey(
        id,
        tier,
        status,
        start_date,
        end_date,
        amount_paid
      )
    `
    )
    .eq("id", userId)
    .single()

  if (error) {
    console.error("Error fetching user:", error)
    throw new Error("Utilisateur non trouvé")
  }

  return data
}

export async function banUser(userId: string, durationDays: number, reason: string) {
  // Permission check - only admin and super_admin can ban users
  const currentAdmin = await getCurrentAdmin()
  if (!currentAdmin || !hasPermission(currentAdmin.role as AdminRole, "admin")) {
    throw new Error("Permission refusée")
  }

  const supabase = createAdminClient()

  const bannedUntil = new Date()
  bannedUntil.setDate(bannedUntil.getDate() + durationDays)

  const { error } = await supabase
    .from("users")
    .update({
      banned_until: bannedUntil.toISOString(),
      is_active: false,
    })
    .eq("id", userId)

  if (error) {
    console.error("Error banning user:", error)
    throw new Error("Erreur lors du bannissement")
  }

  // Log the action
  await supabase.from("admin_activity_logs").insert({
    action: "user_banned",
    entity_type: "user",
    entity_id: userId,
    details: { duration_days: durationDays, reason },
  })

  revalidatePath("/users")
  return { success: true }
}

export async function unbanUser(userId: string) {
  // Permission check - only admin and super_admin can unban users
  const currentAdmin = await getCurrentAdmin()
  if (!currentAdmin || !hasPermission(currentAdmin.role as AdminRole, "admin")) {
    throw new Error("Permission refusée")
  }

  const supabase = createAdminClient()

  const { error } = await supabase
    .from("users")
    .update({
      banned_until: null,
      is_active: true,
    })
    .eq("id", userId)

  if (error) {
    console.error("Error unbanning user:", error)
    throw new Error("Erreur lors du débannissement")
  }

  // Log the action
  await supabase.from("admin_activity_logs").insert({
    action: "user_unbanned",
    entity_type: "user",
    entity_id: userId,
  })

  revalidatePath("/users")
  return { success: true }
}

export async function deleteUser(userId: string) {
  // Permission check - only admin and super_admin can delete users
  const currentAdmin = await getCurrentAdmin()
  if (!currentAdmin || !hasPermission(currentAdmin.role as AdminRole, "admin")) {
    throw new Error("Permission refusée")
  }

  const supabase = createAdminClient()

  // Soft delete - mark as inactive and schedule deletion
  const { error } = await supabase
    .from("users")
    .update({
      is_active: false,
      scheduled_deletion_date: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      ).toISOString(), // 30 days
    })
    .eq("id", userId)

  if (error) {
    console.error("Error deleting user:", error)
    throw new Error("Erreur lors de la suppression")
  }

  // Log the action
  await supabase.from("admin_activity_logs").insert({
    action: "user_deleted",
    entity_type: "user",
    entity_id: userId,
  })

  revalidatePath("/users")
  return { success: true }
}

export async function getUserStats() {
  const supabase = createAdminClient()

  const [totalResult, activeResult, premiumResult, bannedResult] = await Promise.all([
    supabase.from("users").select("id", { count: "exact", head: true }),
    supabase.from("users").select("id", { count: "exact", head: true }).eq("is_active", true),
    supabase.from("users").select("id", { count: "exact", head: true }).eq("isPremium", true),
    supabase.from("users").select("id", { count: "exact", head: true }).not("banned_until", "is", null),
  ])

  return {
    total: totalResult.count ?? 0,
    active: activeResult.count ?? 0,
    premium: premiumResult.count ?? 0,
    banned: bannedResult.count ?? 0,
  }
}

export async function exportUsersCSV(filters: UsersFilter = {}) {
  const supabase = createAdminClient()

  let query = supabase
    .from("users")
    .select(
      `
      id,
      email,
      firstName,
      gender,
      birthdate,
      location,
      is_active,
      is_verified,
      isPremium,
      current_tier,
      created_at,
      banned_until
    `
    )

  // Apply same filters as getUsers
  if (filters.search) {
    query = query.or(
      `firstName.ilike.%${filters.search}%,email.ilike.%${filters.search}%`
    )
  }

  if (filters.tier && filters.tier !== "all") {
    query = query.eq("current_tier", filters.tier)
  }

  if (filters.status === "active") {
    query = query.eq("is_active", true).is("banned_until", null)
  } else if (filters.status === "inactive") {
    query = query.eq("is_active", false)
  } else if (filters.status === "banned") {
    query = query.not("banned_until", "is", null)
  }

  query = query.order("created_at", { ascending: false })

  const { data, error } = await query

  if (error) {
    console.error("Error exporting users:", error)
    throw new Error("Erreur lors de l'export")
  }

  // Convert to CSV
  const headers = [
    "ID",
    "Email",
    "Prénom",
    "Genre",
    "Date de naissance",
    "Localisation",
    "Actif",
    "Vérifié",
    "Premium",
    "Tier",
    "Date d'inscription",
    "Banni jusqu'au",
  ]

  const rows = (data ?? []).map((user) => [
    user.id,
    user.email,
    user.firstName ?? "",
    user.gender ?? "",
    user.birthdate ?? "",
    user.location ?? "",
    user.is_active ? "Oui" : "Non",
    user.is_verified ? "Oui" : "Non",
    user.isPremium ? "Oui" : "Non",
    user.current_tier ?? "base",
    new Date(user.created_at).toLocaleDateString("fr-FR"),
    user.banned_until ? new Date(user.banned_until).toLocaleDateString("fr-FR") : "",
  ])

  const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n")

  return csv
}
