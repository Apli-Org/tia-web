"use server"

import { requireAdminAction } from "@/lib/auth/admin-guard"
import { createAdminClient } from "@/lib/supabase/admin"
import { revalidatePath } from "next/cache"
import type {
  ReportedContent,
  ReportFilter,
  PaginatedReports,
  ContentType,
  ModerationStats,
  ReviewAction,
  ReportStatus,
} from "./moderation-types"

export async function getModerationStats(): Promise<ModerationStats> {
  await requireAdminAction("view_reports")

  const supabase = createAdminClient()
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [
    pendingVerificationsResult,
    pendingPhotosResult,
    pendingMessagesResult,
    pendingProfilesResult,
    reviewedTodayResult,
  ] = await Promise.all([
    supabase
      .from("verification_requests")
      .select("id", { count: "exact", head: true })
      .eq("status", "pending"),
    supabase
      .from("reported_content")
      .select("id", { count: "exact", head: true })
      .eq("status", "pending")
      .eq("content_type", "photo"),
    supabase
      .from("reported_content")
      .select("id", { count: "exact", head: true })
      .eq("status", "pending")
      .eq("content_type", "message"),
    supabase
      .from("reported_content")
      .select("id", { count: "exact", head: true })
      .eq("status", "pending")
      .eq("content_type", "profile"),
    supabase
      .from("reported_content")
      .select("id", { count: "exact", head: true })
      .gte("reviewed_at", today.toISOString())
      .not("reviewed_at", "is", null),
  ])

  return {
    pendingVerifications: pendingVerificationsResult.count ?? 0,
    pendingPhotos: pendingPhotosResult.count ?? 0,
    pendingMessages: pendingMessagesResult.count ?? 0,
    pendingProfiles: pendingProfilesResult.count ?? 0,
    reviewedToday: reviewedTodayResult.count ?? 0,
  }
}

export async function getReportedContent(
  page: number = 1,
  pageSize: number = 20,
  filters: ReportFilter = {}
): Promise<PaginatedReports> {
  await requireAdminAction("view_reports")

  const supabase = createAdminClient()
  const offset = (page - 1) * pageSize

  let query = supabase
    .from("reported_content")
    .select(
      `
      *,
      reporter:reporter_id(id, firstName, email),
      reported_user:reported_user_id(id, firstName, email, profilePhoto),
      reviewer:reviewed_by(full_name)
    `,
      { count: "exact" }
    )

  if (filters.status && filters.status !== "all") {
    query = query.eq("status", filters.status)
  }

  if (filters.reason && filters.reason !== "all") {
    query = query.eq("reason", filters.reason)
  }

  if (filters.contentType && filters.contentType !== "all") {
    query = query.eq("content_type", filters.contentType)
  }

  const sortBy = filters.sortBy || "created_at"
  const sortOrder = filters.sortOrder || "desc"
  query = query.order(sortBy, { ascending: sortOrder === "asc", nullsFirst: false })
  query = query.range(offset, offset + pageSize - 1)

  const { data, count, error } = await query

  if (error) {
    console.error("Error fetching reports:", error)
    throw new Error("Erreur lors de la récupération des signalements")
  }

  const total = count ?? 0

  return {
    reports: (data as unknown as ReportedContent[]) ?? [],
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  }
}

export async function getReportsByType(
  contentType: ContentType,
  page: number = 1,
  pageSize: number = 20,
  filters: Omit<ReportFilter, "contentType"> = {}
): Promise<PaginatedReports> {
  return getReportedContent(page, pageSize, { ...filters, contentType })
}

export async function getReportById(id: string): Promise<ReportedContent | null> {
  await requireAdminAction("view_reports")

  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from("reported_content")
    .select(
      `
      *,
      reporter:reporter_id(id, firstName, email),
      reported_user:reported_user_id(id, firstName, email, profilePhoto),
      reviewer:reviewed_by(full_name)
    `
    )
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching report:", error)
    return null
  }

  return data as unknown as ReportedContent
}

export async function reviewReport(
  id: string,
  action: ReviewAction,
  notes?: string,
  banDays?: number
) {
  const currentAdmin = await requireAdminAction("moderate_content")

  const supabase = createAdminClient()

  const { data: report, error: fetchError } = await supabase
    .from("reported_content")
    .select("reported_user_id, content_type, content_id")
    .eq("id", id)
    .single()

  if (fetchError || !report) {
    throw new Error("Signalement non trouvé")
  }

  let newStatus: ReportStatus
  switch (action) {
    case "approve":
      newStatus = "approved"
      break
    case "remove":
      newStatus = "removed"
      break
    case "warn":
      newStatus = "user_warned"
      break
    case "ban":
      newStatus = "user_banned"
      break
    default:
      throw new Error("Action invalide")
  }

  const { error: updateError } = await supabase
    .from("reported_content")
    .update({
      status: newStatus,
      admin_notes: notes || null,
      reviewed_by: currentAdmin.id,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", id)

  if (updateError) {
    console.error("Error reviewing report:", updateError)
    throw new Error("Erreur lors de la modération")
  }

  if (action === "ban" && report.reported_user_id && banDays) {
    const bannedUntil = new Date()
    bannedUntil.setDate(bannedUntil.getDate() + banDays)

    await supabase
      .from("users")
      .update({
        banned_until: bannedUntil.toISOString(),
        is_active: false,
      })
      .eq("id", report.reported_user_id)
  }

  if (action === "remove" && report.content_type === "photo" && report.content_id) {
    await supabase
      .from("photos")
      .update({ is_active: false })
      .eq("id", report.content_id)
  }

  await supabase.from("admin_activity_logs").insert({
    admin_id: currentAdmin.id,
    action: `report_${action}`,
    details: {
      report_id: id,
      reported_user_id: report.reported_user_id,
      content_type: report.content_type,
      notes,
      ban_days: banDays,
    },
  })

  revalidatePath("/moderation")
  revalidatePath("/moderation/photos")
  revalidatePath("/moderation/messages")
  revalidatePath("/moderation/profiles")
  return { success: true }
}

export async function getReportStats(contentType?: ContentType) {
  await requireAdminAction("view_reports")

  const supabase = createAdminClient()

  const buildQuery = (status: ReportStatus) => {
    let query = supabase
      .from("reported_content")
      .select("id", { count: "exact", head: true })
      .eq("status", status)

    if (contentType) {
      query = query.eq("content_type", contentType)
    }

    return query
  }

  const [pendingResult, reviewingResult, removedResult, warnedResult, bannedResult] = await Promise.all([
    buildQuery("pending"),
    buildQuery("reviewing"),
    buildQuery("removed"),
    buildQuery("user_warned"),
    buildQuery("user_banned"),
  ])

  return {
    pending: pendingResult.count ?? 0,
    reviewing: reviewingResult.count ?? 0,
    removed: removedResult.count ?? 0,
    warned: warnedResult.count ?? 0,
    banned: bannedResult.count ?? 0,
    total:
      (pendingResult.count ?? 0) +
      (reviewingResult.count ?? 0) +
      (removedResult.count ?? 0) +
      (warnedResult.count ?? 0) +
      (bannedResult.count ?? 0),
  }
}
