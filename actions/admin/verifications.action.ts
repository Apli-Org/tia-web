"use server"

import { requireAdminAction } from "@/lib/auth/admin-guard"
import { createAdminClient } from "@/lib/supabase/admin"
import { revalidatePath } from "next/cache"
import type {
  VerificationRequest,
  VerificationFilter,
  PaginatedVerifications,
} from "./moderation-types"

export async function getVerificationStats() {
  await requireAdminAction("view_reports", "view_verifications")

  const supabase = createAdminClient()

  const [pendingResult, approvedResult, rejectedResult] = await Promise.all([
    supabase
      .from("verification_requests")
      .select("id", { count: "exact", head: true })
      .eq("status", "pending"),
    supabase
      .from("verification_requests")
      .select("id", { count: "exact", head: true })
      .eq("status", "approved"),
    supabase
      .from("verification_requests")
      .select("id", { count: "exact", head: true })
      .eq("status", "rejected"),
  ])

  return {
    pending: pendingResult.count ?? 0,
    approved: approvedResult.count ?? 0,
    rejected: rejectedResult.count ?? 0,
    total: (pendingResult.count ?? 0) + (approvedResult.count ?? 0) + (rejectedResult.count ?? 0),
  }
}

export async function getVerificationRequests(
  page: number = 1,
  pageSize: number = 20,
  filters: VerificationFilter = {}
): Promise<PaginatedVerifications> {
  await requireAdminAction("view_reports", "view_verifications")

  const supabase = createAdminClient()
  const offset = (page - 1) * pageSize

  let query = supabase
    .from("verification_requests")
    .select(
      `
      *,
      user:user_id(id, firstName, email, profilePhoto),
      reviewer:reviewed_by(full_name)
    `,
      { count: "exact" }
    )

  if (filters.status && filters.status !== "all") {
    query = query.eq("status", filters.status)
  }

  const sortBy = filters.sortBy || "submitted_at"
  const sortOrder = filters.sortOrder || "desc"
  query = query.order(sortBy, { ascending: sortOrder === "asc", nullsFirst: false })
  query = query.range(offset, offset + pageSize - 1)

  const { data, count, error } = await query

  if (error) {
    console.error("Error fetching verification requests:", error)
    throw new Error("Erreur lors de la récupération des demandes")
  }

  const total = count ?? 0

  return {
    requests: (data as unknown as VerificationRequest[]) ?? [],
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  }
}

export async function getVerificationById(id: string): Promise<VerificationRequest | null> {
  await requireAdminAction("view_reports", "view_verifications")

  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from("verification_requests")
    .select(
      `
      *,
      user:user_id(id, firstName, email, profilePhoto),
      reviewer:reviewed_by(full_name)
    `
    )
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching verification:", error)
    return null
  }

  return data as unknown as VerificationRequest
}

export async function approveVerification(id: string) {
  const currentAdmin = await requireAdminAction("moderate_content")

  const supabase = createAdminClient()

  const { data: verification, error: fetchError } = await supabase
    .from("verification_requests")
    .select("user_id")
    .eq("id", id)
    .single()

  if (fetchError || !verification) {
    throw new Error("Demande non trouvée")
  }

  const { error: updateError } = await supabase
    .from("verification_requests")
    .update({
      status: "approved",
      reviewed_by: currentAdmin.id,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", id)

  if (updateError) {
    console.error("Error approving verification:", updateError)
    throw new Error("Erreur lors de l'approbation")
  }

  if (verification.user_id) {
    await supabase
      .from("users")
      .update({ is_verified: true })
      .eq("id", verification.user_id)
  }

  await supabase.from("admin_activity_logs").insert({
    admin_id: currentAdmin.id,
    action: "verification_approved",
    details: { verification_id: id, user_id: verification.user_id },
  })

  revalidatePath("/moderation")
  revalidatePath("/moderation/verifications")
  return { success: true }
}

export async function rejectVerification(id: string, reason: string) {
  const currentAdmin = await requireAdminAction("moderate_content")

  const supabase = createAdminClient()

  const { data: verification, error: fetchError } = await supabase
    .from("verification_requests")
    .select("user_id")
    .eq("id", id)
    .single()

  if (fetchError || !verification) {
    throw new Error("Demande non trouvée")
  }

  const { error: updateError } = await supabase
    .from("verification_requests")
    .update({
      status: "rejected",
      rejection_reason: reason,
      reviewed_by: currentAdmin.id,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", id)

  if (updateError) {
    console.error("Error rejecting verification:", updateError)
    throw new Error("Erreur lors du rejet")
  }

  await supabase.from("admin_activity_logs").insert({
    admin_id: currentAdmin.id,
    action: "verification_rejected",
    details: { verification_id: id, user_id: verification.user_id, reason },
  })

  revalidatePath("/moderation")
  revalidatePath("/moderation/verifications")
  return { success: true }
}
