export type VerificationStatus = "pending" | "approved" | "rejected"
export type ReportStatus = "pending" | "reviewing" | "approved" | "removed" | "user_warned" | "user_banned"
export type ContentType = "profile" | "photo" | "message" | "bio"
export type ReportReason = "nudity" | "harassment" | "fake" | "spam" | "violence" | "hate_speech" | "minor" | "other"

export type VerificationRequest = {
  id: string
  user_id: string | null
  cin_photo_url: string
  selfie_photo_url: string | null
  status: VerificationStatus
  rejection_reason: string | null
  submitted_at: string | null
  reviewed_at: string | null
  reviewed_by: string | null
  user?: {
    id: string
    firstName: string | null
    email: string
    profilePhoto: string | null
  }
  reviewer?: {
    full_name: string | null
  }
}

export type ReportedContent = {
  id: string
  reporter_id: string | null
  reported_user_id: string | null
  content_type: ContentType
  content_id: string
  content_url: string | null
  reason: ReportReason
  details: string | null
  status: ReportStatus
  admin_notes: string | null
  created_at: string | null
  reviewed_at: string | null
  reviewed_by: string | null
  reporter?: {
    id: string
    firstName: string | null
    email: string
  }
  reported_user?: {
    id: string
    firstName: string | null
    email: string
    profilePhoto: string | null
  }
  reviewer?: {
    full_name: string | null
  }
}

export type VerificationFilter = {
  status?: VerificationStatus | "all"
  sortBy?: "submitted_at" | "reviewed_at"
  sortOrder?: "asc" | "desc"
}

export type ReportFilter = {
  status?: ReportStatus | "all"
  reason?: ReportReason | "all"
  contentType?: ContentType | "all"
  sortBy?: "created_at" | "reviewed_at"
  sortOrder?: "asc" | "desc"
}

export type PaginatedVerifications = {
  requests: VerificationRequest[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export type PaginatedReports = {
  reports: ReportedContent[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export type ModerationStats = {
  pendingVerifications: number
  pendingPhotos: number
  pendingMessages: number
  pendingProfiles: number
  reviewedToday: number
}

export type ReviewAction = "approve" | "remove" | "warn" | "ban"

const reasonLabels: Record<ReportReason, string> = {
  nudity: "Nudité",
  harassment: "Harcèlement",
  fake: "Faux profil",
  spam: "Spam",
  violence: "Violence",
  hate_speech: "Discours haineux",
  minor: "Mineur",
  other: "Autre",
}

const statusLabels: Record<ReportStatus, string> = {
  pending: "En attente",
  reviewing: "En cours",
  approved: "Approuvé",
  removed: "Supprimé",
  user_warned: "Averti",
  user_banned: "Banni",
}

const verificationStatusLabels: Record<VerificationStatus, string> = {
  pending: "En attente",
  approved: "Approuvé",
  rejected: "Rejeté",
}

export function getReasonLabel(reason: ReportReason): string {
  return reasonLabels[reason] || reason
}

export function getStatusLabel(status: ReportStatus): string {
  return statusLabels[status] || status
}

export function getVerificationStatusLabel(status: VerificationStatus): string {
  return verificationStatusLabels[status] || status
}
