"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { ReportStatus, ReportReason } from "@/actions/admin/moderation-types"

type Props = {
  basePath: string
  page: number
  totalPages: number
  status?: ReportStatus | "all"
  reason?: ReportReason | "all"
}

export function ReportsPagination({ basePath, page, totalPages, status, reason }: Props) {
  const router = useRouter()
  const [loadingDirection, setLoadingDirection] = useState<"prev" | "next" | null>(null)

  useEffect(() => {
    setLoadingDirection(null)
  }, [page])

  const buildPageUrl = (p: number) => {
    const params = new URLSearchParams()
    params.set("page", p.toString())
    if (status && status !== "all") params.set("status", status)
    if (reason && reason !== "all") params.set("reason", reason)
    return `${basePath}?${params.toString()}`
  }

  const handleNavigation = (direction: "prev" | "next") => {
    const newPage = direction === "prev" ? page - 1 : page + 1
    setLoadingDirection(direction)
    window.scrollTo({ top: 0, behavior: "smooth" })
    router.push(buildPageUrl(newPage))
  }

  return (
    <div className="flex items-center justify-between mt-6 pt-4 border-t">
      <p className="text-sm text-muted-foreground">
        Page {page} sur {totalPages}
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleNavigation("prev")}
          disabled={page <= 1 || loadingDirection !== null}
        >
          {loadingDirection === "prev" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
          Précédent
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleNavigation("next")}
          disabled={page >= totalPages || loadingDirection !== null}
        >
          Suivant
          {loadingDirection === "next" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  )
}
