import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function SubscriptionsLoading() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {/* Header Skeleton */}
      <header className="flex h-16 shrink-0 items-center gap-2">
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-4 w-px mx-2" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-32" />
      </header>

      {/* Stats Cards Skeleton */}
      <div className="grid gap-4 md:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-20 mb-1" />
              <Skeleton className="h-3 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters Skeleton */}
      <div className="flex flex-wrap items-center gap-4">
        <Skeleton className="h-10 flex-1 min-w-[200px]" />
        <Skeleton className="h-10 w-[140px]" />
        <Skeleton className="h-10 w-[140px]" />
      </div>

      {/* Table Skeleton */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-4 w-24" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Table Header */}
            <div className="grid grid-cols-7 gap-4 pb-2 border-b">
              {[...Array(7)].map((_, i) => (
                <Skeleton key={i} className="h-4" />
              ))}
            </div>
            {/* Table Rows */}
            {[...Array(10)].map((_, i) => (
              <div key={i} className="grid grid-cols-7 gap-4 items-center py-3">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-14 rounded-full" />
                <Skeleton className="h-8 w-8 rounded" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
