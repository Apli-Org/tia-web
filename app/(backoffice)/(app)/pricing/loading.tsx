import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function PricingLoading() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {/* Header Skeleton */}
      <header className="flex h-16 shrink-0 items-center gap-2">
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-4 w-px mx-2" />
        <Skeleton className="h-4 w-28" />
      </header>

      {/* Stats Cards Skeleton */}
      <div className="grid gap-4 md:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pricing Tiers Skeleton */}
      <div className="grid gap-6 md:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="relative">
            <CardHeader>
              <Skeleton className="h-6 w-24 mb-2" />
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-4 w-20" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {[...Array(5)].map((_, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Options Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="p-4 border rounded-lg space-y-2">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
