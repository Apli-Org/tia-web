"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { UsersFilter } from "@/actions/admin/users.action"

type PaginationProps = {
  page: number
  totalPages: number
  filters: UsersFilter
}

export function Pagination({ page, totalPages, filters }: PaginationProps) {
  const router = useRouter()
  const [loadingDirection, setLoadingDirection] = useState<"prev" | "next" | null>(null)

  // Reset loading state when page changes
  useEffect(() => {
    setLoadingDirection(null)
  }, [page])

  const buildPageUrl = (p: number) => {
    const params = new URLSearchParams()
    params.set("page", p.toString())
    if (filters.search) params.set("search", filters.search)
    if (filters.tier) params.set("tier", filters.tier)
    if (filters.status) params.set("status", filters.status)
    if (filters.verified) params.set("verified", filters.verified)
    if (filters.gender) params.set("gender", filters.gender)
    return `/users?${params.toString()}`
  }

  const handleNavigation = (direction: "prev" | "next") => {
    const newPage = direction === "prev" ? page - 1 : page + 1
    setLoadingDirection(direction)
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" })
    router.push(buildPageUrl(newPage))
  }

  return (
    <div className="flex items-center justify-between mt-4">
      <div className="text-sm text-muted-foreground">
        Page {page} sur {totalPages}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={page <= 1 || loadingDirection !== null}
          onClick={() => handleNavigation("prev")}
        >
          {loadingDirection === "prev" ? (
            <Loader2 className="h-4 w-4 mr-1 animate-spin" />
          ) : (
            <ChevronLeft className="h-4 w-4 mr-1" />
          )}
          Précédent
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={page >= totalPages || loadingDirection !== null}
          onClick={() => handleNavigation("next")}
        >
          Suivant
          {loadingDirection === "next" ? (
            <Loader2 className="h-4 w-4 ml-1 animate-spin" />
          ) : (
            <ChevronRight className="h-4 w-4 ml-1" />
          )}
        </Button>
      </div>
    </div>
  )
}
