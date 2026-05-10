import { useEffect, useState } from 'react'
import { fetchMedia } from '../api'
import type { MediaItem } from '@shared/types'
import MediaCard from '../components/MediaCard'

export default function MediaPage() {
  const [media, setMedia] = useState<MediaItem[] | null>(null)

  useEffect(() => {
    fetchMedia().then(setMedia).catch(() => setMedia([]))
  }, [])

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-main-red mb-3">Media</p>
      <h1 className="text-4xl font-black mb-2">Media</h1>
      <p className="text-main-white/50 mb-4 max-w-lg text-sm">
        Podcasts, conference talks, and videos where I've shared ideas publicly.
      </p>
      <div className="w-12 h-1 bg-main-red mb-10" />
      {media !== null && media.length === 0 && (
        <p className="text-main-white/60">No media yet.</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(media ?? []).map((m) => <MediaCard key={m.id} item={m} />)}
      </div>
    </div>
  )
}
