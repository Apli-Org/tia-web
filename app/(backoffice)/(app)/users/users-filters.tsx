"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState, useTransition } from "react"
import { Search, Download, X, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { exportUsersCSV, type UsersFilter } from "@/actions/admin/users.action"

type FiltersProps = {
  filters: UsersFilter
}

export function UsersFilters({ filters }: FiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [search, setSearch] = useState(filters.search || "")
  const [isExporting, setIsExporting] = useState(false)

  const updateFilters = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value && value !== "all") {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      params.delete("page") // Reset to page 1 when filtering
      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" })
      startTransition(() => {
        router.push(`/users?${params.toString()}`)
      })
    },
    [router, searchParams]
  )

  const handleSearch = useCallback(() => {
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" })
    updateFilters("search", search)
  }, [search, updateFilters])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const clearFilters = () => {
    setSearch("")
    window.scrollTo({ top: 0, behavior: "smooth" })
    startTransition(() => {
      router.push("/users")
    })
  }

  const handleExport = async () => {
    setIsExporting(true)
    try {
      const csv = await exportUsersCSV(filters)
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `utilisateurs_${new Date().toISOString().split("T")[0]}.csv`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Export error:", error)
    } finally {
      setIsExporting(false)
    }
  }

  const hasFilters =
    filters.search ||
    (filters.tier && filters.tier !== "all") ||
    (filters.status && filters.status !== "all") ||
    (filters.verified && filters.verified !== "all") ||
    (filters.gender && filters.gender !== "all")

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex flex-1 items-center gap-2 min-w-[250px]">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rechercher par nom ou email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-9"
            />
          </div>
          <Button onClick={handleSearch} disabled={isPending}>
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Rechercher"
            )}
          </Button>
        </div>

        <Select
          value={filters.tier || "all"}
          onValueChange={(value) => updateFilters("tier", value)}
          disabled={isPending}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Tier" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les tiers</SelectItem>
            <SelectItem value="base">Base</SelectItem>
            <SelectItem value="silver">Silver</SelectItem>
            <SelectItem value="gold">Gold</SelectItem>
            <SelectItem value="elite">Elite</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.status || "all"}
          onValueChange={(value) => updateFilters("status", value)}
          disabled={isPending}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="active">Actifs</SelectItem>
            <SelectItem value="inactive">Inactifs</SelectItem>
            <SelectItem value="banned">Bannis</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.verified || "all"}
          onValueChange={(value) => updateFilters("verified", value)}
          disabled={isPending}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Vérification" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="verified">Vérifiés</SelectItem>
            <SelectItem value="unverified">Non vérifiés</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.gender || "all"}
          onValueChange={(value) => updateFilters("gender", value)}
          disabled={isPending}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="homme">Homme</SelectItem>
            <SelectItem value="femme">Femme</SelectItem>
            <SelectItem value="autre">Autre</SelectItem>
          </SelectContent>
        </Select>

        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="mr-1 h-4 w-4" />
            Effacer
          </Button>
        )}

        <Button
          variant="outline"
          onClick={handleExport}
          disabled={isExporting}
          className="ml-auto"
        >
          <Download className="mr-2 h-4 w-4" />
          {isExporting ? "Export..." : "Exporter CSV"}
        </Button>
      </div>
    </div>
  )
}
