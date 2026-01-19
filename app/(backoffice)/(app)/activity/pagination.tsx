"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getAllUserActivities, type UserActivityFilters } from "@/actions/admin/activity.action"

type PaginationProps = {
  page: number
  filters: UserActivityFilters
}

export function Pagination({ page, filters }: PaginationProps) {
  const router = useRouter()
  const [totalPages, setTotalPages] = useState(1)
  const [loadingDirection, setLoadingDirection] = useState<"prev" | "next" | null>(null)

  useEffect(() => {
    getAllUserActivities(page, 20, filters).then((result) => {
      setTotalPages(result.totalPages)
    })
  }, [page, filters])

  const buildPageUrl = (p: number) => {
    const params = new URLSearchParams()
    params.set("page", p.toString())
    if (filters.type) params.set("type", filters.type)
    if (filters.dateFrom) params.set("dateFrom", filters.dateFrom)
    if (filters.dateTo) params.set("dateTo", filters.dateTo)
    if (filters.search) params.set("search", filters.search)
    return `/activity?${params.toString()}`
  }

  const handleNavigation = (direction: "prev" | "next") => {
    const newPage = direction === "prev" ? page - 1 : page + 1
    setLoadingDirection(direction)
    window.scrollTo({ top: 0, behavior: "smooth" })
    router.push(buildPageUrl(newPage))
  }

  if (totalPages <= 1) {
    return null
  }

  return (
    <div className="flex items-center justify-between">
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
          Precedent
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
