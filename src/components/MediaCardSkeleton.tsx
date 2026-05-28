export default function MediaCardSkeleton() {
  return (
    <div className="bg-white/5 rounded-xl overflow-hidden border border-white/5">
      <div className="aspect-video bg-white/10 animate-pulse" />
      <div className="p-4 space-y-2">
        <div className="h-3 bg-white/10 animate-pulse rounded w-1/4" />
        <div className="h-4 bg-white/10 animate-pulse rounded w-2/3" />
      </div>
    </div>
  )
}
