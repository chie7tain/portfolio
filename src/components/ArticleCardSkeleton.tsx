export default function ArticleCardSkeleton() {
  return (
    <div className="grid grid-cols-[3rem_1fr_auto] md:grid-cols-[4rem_1fr_auto] items-baseline gap-4 md:gap-8 py-6 px-3 border-b border-hairline">
      <div className="h-4 w-8 bg-ink/10 animate-pulse rounded-sm" />
      <div className="space-y-2.5">
        <div className="h-6 bg-ink/10 animate-pulse rounded w-3/4" />
        <div className="h-3 bg-ink/10 animate-pulse rounded w-1/3" />
      </div>
      <div className="h-4 w-4 bg-ink/10 animate-pulse rounded-sm" />
    </div>
  )
}
