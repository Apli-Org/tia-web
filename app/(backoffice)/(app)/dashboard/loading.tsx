import { Skeleton } from "@/components/ui/skeleton"
import { ChartTileSkeleton, KpiTilesSkeleton, ListTileSkeleton } from "./_components/dashboard-skeletons"

export default function DashboardLoading() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-tia-plum-200/70 px-4">
        <Skeleton className="size-7 rounded-xl bg-tia-plum-200" />
        <Skeleton className="mx-2 h-4 w-px bg-tia-plum-200" />
        <Skeleton className="h-4 w-24 bg-tia-plum-200" />
      </header>
      <div className="flex-1 p-3 sm:p-4 lg:p-6">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          <Skeleton className="min-h-[320px] rounded-[28px] bg-tia-plum-200 sm:col-span-2 lg:row-span-2" />
          <KpiTilesSkeleton />
          <ChartTileSkeleton className="sm:col-span-2 lg:col-span-3" />
          <ListTileSkeleton className="sm:col-span-2 lg:col-span-1" />
          <ListTileSkeleton className="sm:col-span-2" />
          <ListTileSkeleton className="sm:col-span-2" />
        </div>
      </div>
    </>
  )
}
