import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function LandingLoading() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {/* Header Skeleton */}
      <header className="flex h-16 shrink-0 items-center gap-2">
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-4 w-px mx-2" />
        <Skeleton className="h-4 w-32" />
      </header>

      {/* Tabs Skeleton */}
      <div className="flex gap-2 border-b pb-2">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-28" />
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-20" />
      </div>

      {/* Content Cards Skeleton */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-36" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-24 w-full" />
            </div>
            <Skeleton className="h-10 w-32" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-28" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full rounded-lg" />
          </CardContent>
        </Card>
      </div>

      {/* Features List Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="p-4 border rounded-lg space-y-2">
                <Skeleton className="h-10 w-10 rounded" />
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
