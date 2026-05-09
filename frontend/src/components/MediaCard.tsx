import type { MediaItem } from '@shared/types'

export default function MediaCard({ item }: { item: MediaItem }) {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={item.title}
      className="group block bg-white/5 rounded-xl overflow-hidden border border-white/5 hover:border-main-red/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-main-red/10 transition-all duration-300"
    >
      <div className="aspect-video bg-main-blue/30 overflow-hidden relative">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-main-black/60 border border-white/20 flex items-center justify-center group-hover:bg-main-red/80 group-hover:border-main-red transition-all duration-300">
            <span
              aria-hidden="true"
              className="block w-0 h-0 ml-1"
              style={{
                borderTop: '7px solid transparent',
                borderBottom: '7px solid transparent',
                borderLeft: '12px solid #f0f0f0',
              }}
            />
          </div>
        </div>
      </div>
      <div className="p-4">
        <span className="text-xs font-medium uppercase tracking-wider text-main-red">
          {item.type}
        </span>
        <h3 className="font-semibold text-main-white mt-1">{item.title}</h3>
      </div>
    </a>
  )
}
