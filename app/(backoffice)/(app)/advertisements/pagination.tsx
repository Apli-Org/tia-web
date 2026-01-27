"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"

type PaginationProps = {
  page: number
  totalPages: number
}

export function Pagination({ page, totalPages }: PaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loadingDirection, setLoadingDirection] = useState<"prev" | "next" | null>(null)

  useEffect(() => {
    setLoadingDirection(null)
  }, [page])

  const buildPageUrl = (p: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", p.toString())
    return `/advertisements?${params.toString()}`
  }

  const handleNavigation = (direction: "prev" | "next") => {
    const newPage = direction === "prev" ? page - 1 : page + 1
    setLoadingDirection(direction)
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
