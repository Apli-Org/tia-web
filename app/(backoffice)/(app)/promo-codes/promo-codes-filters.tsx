"use client"

import { useRouter, usePathname } from "next/navigation"
import { useState, useTransition } from "react"
import { Search, X } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type PromoCodesFiltersProps = {
  filters: {
    search?: string
    status?: "all" | "active" | "inactive" | "expired"
  }
}

export function PromoCodesFilters({ filters }: PromoCodesFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const [search, setSearch] = useState(filters.search || "")

  const updateFilters = (newFilters: Record<string, string | undefined>) => {
    const params = new URLSearchParams()

    // Keep existing filters
    if (filters.search) params.set("search", filters.search)
    if (filters.status && filters.status !== "all") params.set("status", filters.status)

    // Apply new filters
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value !== "all") {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })

    // Reset to page 1
    params.delete("page")

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`)
    })
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateFilters({ search: search || undefined })
  }

  const clearFilters = () => {
    setSearch("")
    startTransition(() => {
      router.push(pathname)
    })
  }

  const hasFilters = filters.search || (filters.status && filters.status !== "all")

  return (
    <div className="flex flex-wrap gap-4 items-center">
      <form onSubmit={handleSearchSubmit} className="flex gap-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 w-64"
          />
        </div>
        <Button type="submit" variant="secondary" disabled={isPending}>
          Rechercher
        </Button>
      </form>

      <Select
        value={filters.status || "all"}
        onValueChange={(value) => updateFilters({ status: value })}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Statut" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous</SelectItem>
          <SelectItem value="active">Actifs</SelectItem>
          <SelectItem value="inactive">Inactifs</SelectItem>
          <SelectItem value="expired">Expirés</SelectItem>
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          disabled={isPending}
        >
          <X className="h-4 w-4 mr-1" />
          Effacer les filtres
        </Button>
      )}
    </div>
  )
}
