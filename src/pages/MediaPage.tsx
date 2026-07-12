import { useQuery } from '@tanstack/react-query'
import { fetchMedia } from '../api'
import MediaCard from '../components/MediaCard'
import MediaCardSkeleton from '../components/MediaCardSkeleton'

export default function MediaPage() {
  const { data: media, isLoading, isError } = useQuery({
    queryKey: ['media'],
    queryFn: fetchMedia,
  })

  return (
    <div className="max-w-6xl mx-auto px-6 pt-14 pb-24 relative z-10">
      <header className="border-b-2 border-ink pb-8 mb-10">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-vermilion">
          § 04 — Media
        </span>
        <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-[-0.02em] text-ink leading-[0.95] mt-4">
          Media
        </h1>
        <p className="mt-5 max-w-xl text-ink-soft leading-relaxed">
          Podcasts, conference talks, and videos where I&apos;ve shared ideas
          publicly.
        </p>
      </header>

      {isError && (
        <p className="py-8 font-mono text-sm text-vermilion">
          Something went wrong loading media.
        </p>
      )}
      {!isLoading && !isError && media?.length === 0 && (
        <p className="py-8 font-mono text-sm text-faded uppercase tracking-wider">
          No media yet.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <MediaCardSkeleton key={i} />)
          : media?.map((m) => <MediaCard key={m.id} item={m} />)}
      </div>
    </div>
  )
}
