'use client'

import { useState, useEffect, useCallback } from 'react'
import { Search, Loader2, ChevronLeft, ChevronRight } from 'lucide-react'

import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { getNewsletterSubscribers } from '@/actions/admin/newsletter.action'

type Subscriber = {
  id: string
  email: string
  prenom: string | null
  numero: string | null
  subscribed_at: string
}

type SendMode = 'all' | 'selection'

type SubscribersTableProps = {
  adminId: string
  subscriberCount: number
  selectedIds: string[]
  onSelectionChange: (ids: string[]) => void
  sendMode: SendMode
  onSendModeChange: (mode: SendMode) => void
}

const PAGE_SIZE = 20

export function SubscribersTable({
  adminId,
  subscriberCount,
  selectedIds,
  onSelectionChange,
  sendMode,
  onSendModeChange,
}: SubscribersTableProps) {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const fetchSubscribers = useCallback(async () => {
    setIsLoading(true)
    const result = await getNewsletterSubscribers(adminId, page, PAGE_SIZE, searchQuery || undefined)
    if (result.success) {
      setSubscribers(result.subscribers ?? [])
      setTotal(result.total ?? 0)
      setTotalPages(result.totalPages ?? 0)
    }
    setIsLoading(false)
  }, [adminId, page, searchQuery])

  useEffect(() => {
    if (sendMode === 'selection') {
      fetchSubscribers()
    }
  }, [fetchSubscribers, sendMode])

  const handleSearch = () => {
    setPage(1)
    setSearchQuery(search)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const pageIds = subscribers.map((s) => s.id)
  const allPageSelected = pageIds.length > 0 && pageIds.every((id) => selectedIds.includes(id))

  const handleSelectAllPage = () => {
    if (allPageSelected) {
      onSelectionChange(selectedIds.filter((id) => !pageIds.includes(id)))
    } else {
      const newIds = new Set(selectedIds)
      pageIds.forEach((id) => newIds.add(id))
      onSelectionChange(Array.from(newIds))
    }
  }

  const handleToggle = (id: string) => {
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter((sid) => sid !== id))
    } else {
      onSelectionChange([...selectedIds, id])
    }
  }

  const handleModeChange = (mode: SendMode) => {
    onSendModeChange(mode)
    if (mode === 'all') {
      onSelectionChange([])
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Destinataires</h3>

      {/* Mode toggle */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => handleModeChange('all')}
          className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
            sendMode === 'all'
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-background text-muted-foreground border-border hover:border-primary/50'
          }`}
        >
          Tous les abonnés ({subscriberCount})
        </button>
        <button
          type="button"
          onClick={() => handleModeChange('selection')}
          className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
            sendMode === 'selection'
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-background text-muted-foreground border-border hover:border-primary/50'
          }`}
        >
          Sélection{selectedIds.length > 0 ? ` (${selectedIds.length})` : ''}
        </button>
      </div>

      {/* Selection list */}
      {sendMode === 'selection' && (
        <div className="space-y-3">
          {/* Search + select all */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-9 h-9"
              />
            </div>
            <button
              type="button"
              onClick={handleSelectAllPage}
              className="text-sm text-primary hover:underline whitespace-nowrap"
            >
              {allPageSelected ? 'Tout désélectionner' : 'Tout sélectionner'}
            </button>
          </div>

          {/* Subscriber list */}
          {isLoading ? (
            <div className="flex justify-center py-6">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : subscribers.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">
              Aucun abonné trouvé
            </p>
          ) : (
            <div className="space-y-1 max-h-[320px] overflow-y-auto">
              {subscribers.map((subscriber) => (
                <label
                  key={subscriber.id}
                  className="flex items-center gap-3 py-2 px-2 rounded-md hover:bg-muted/50 cursor-pointer"
                >
                  <Checkbox
                    checked={selectedIds.includes(subscriber.id)}
                    onCheckedChange={() => handleToggle(subscriber.id)}
                  />
                  <span className="text-sm font-medium">{subscriber.email}</span>
                  {subscriber.prenom && (
                    <span className="text-sm text-muted-foreground">({subscriber.prenom})</span>
                  )}
                </label>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-muted-foreground">
                Page {page}/{totalPages} · {total} abonné{total > 1 ? 's' : ''}
              </span>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="h-7 px-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="h-7 px-2"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
