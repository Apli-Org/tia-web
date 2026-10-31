import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

const KPI_COUNT = 4
const ROW_COUNT = 5

type SkeletonTileProps = {
  className?: string
}

export function KpiTilesSkeleton() {
  return Array.from({ length: KPI_COUNT }, (_, index) => (
    <div key={index} className="flex min-h-[180px] flex-col rounded-[28px] bg-card p-5 ring-1 ring-tia-plum-800/6 sm:p-6">
      <Skeleton className="size-11 rounded-2xl bg-tia-plum-100" />
      <Skeleton className="mt-auto h-4 w-24 bg-tia-plum-100" />
      <Skeleton className="mt-2 h-9 w-32 bg-tia-plum-100" />
    </div>
  ))
}

export function ChartTileSkeleton({ className }: SkeletonTileProps) {
  return (
    <div className={cn("rounded-[28px] bg-card p-5 ring-1 ring-tia-plum-800/6 sm:p-6", className)}>
      <Skeleton className="h-6 w-36 bg-tia-plum-100" />
      <Skeleton className="mt-2 h-4 w-56 bg-tia-plum-100" />
      <Skeleton className="mt-6 h-[280px] w-full rounded-2xl bg-tia-plum-100" />
    </div>
  )
}

export function ListTileSkeleton({ className }: SkeletonTileProps) {
  return (
    <div className={cn("rounded-[28px] bg-card p-5 ring-1 ring-tia-plum-800/6 sm:p-6", className)}>
      <Skeleton className="h-6 w-40 bg-tia-plum-100" />
      <Skeleton className="mt-2 h-4 w-52 bg-tia-plum-100" />
      <div className="mt-6 flex flex-col gap-4">
        {Array.from({ length: ROW_COUNT }, (_, index) => (
          <div key={index} className="flex items-center gap-3">
            <Skeleton className="size-10 rounded-2xl bg-tia-plum-100" />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-4 w-40 bg-tia-plum-100" />
              <Skeleton className="h-3 w-24 bg-tia-plum-100" />
            </div>
            <Skeleton className="h-6 w-16 rounded-full bg-tia-plum-100" />
          </div>
        ))}
      </div>
    </div>
  )
}
