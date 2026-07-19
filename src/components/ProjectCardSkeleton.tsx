export default function ProjectCardSkeleton() {
  return (
    <div className="grid grid-cols-[2.5rem_1fr_auto] md:grid-cols-[4rem_1fr_auto] items-center gap-4 md:gap-8 py-6 md:py-7 px-3 border-b border-hairline">
      <div className="h-4 w-6 bg-ink/10 animate-pulse rounded-sm" />
      <div className="space-y-2.5">
        <div className="h-6 bg-ink/10 animate-pulse rounded w-2/3" />
        <div className="h-3 bg-ink/10 animate-pulse rounded w-1/2" />
      </div>
      <div className="hidden md:block w-24 h-16 bg-ink/10 animate-pulse" />
    </div>
  )
}
