export default function ArticleCardSkeleton() {
  return (
    <div className="flex items-start gap-6 py-5 border-b border-white/10 pl-0">
      <div className="shrink-0 w-16 h-10 bg-white/10 animate-pulse rounded hidden sm:block" />
      <div className="flex-1 min-w-0 space-y-2">
        <div className="h-4 bg-white/10 animate-pulse rounded w-3/4" />
        <div className="h-3 bg-white/10 animate-pulse rounded w-1/4" />
      </div>
    </div>
  )
}
