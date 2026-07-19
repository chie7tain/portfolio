export default function MediaCardSkeleton() {
  return (
    <div className="border border-hairline bg-paper">
      <div className="aspect-video bg-ink/10 animate-pulse" />
      <div className="p-4 border-t border-hairline space-y-2">
        <div className="h-2.5 bg-ink/10 animate-pulse rounded w-1/4" />
        <div className="h-4 bg-ink/10 animate-pulse rounded w-2/3" />
      </div>
    </div>
  )
}
