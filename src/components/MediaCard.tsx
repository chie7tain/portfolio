import type { MediaItem } from '@shared/types'

export default function MediaCard({ item }: { item: MediaItem }) {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={item.title}
      className="group block border border-hairline bg-paper hover:border-ink transition-colors duration-300"
    >
      <div className="aspect-video overflow-hidden bg-paper-deep relative">
        <img
          src={item.thumbnail}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover grayscale-[0.35] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-500"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="w-12 h-12 rounded-full bg-paper/80 border border-ink/30 backdrop-blur-sm flex items-center justify-center group-hover:bg-vermilion group-hover:border-vermilion transition-all duration-300">
            <span
              aria-hidden="true"
              className="block w-0 h-0 ml-1"
              style={{
                borderTop: '6px solid transparent',
                borderBottom: '6px solid transparent',
                borderLeft: '10px solid currentColor',
                color: 'var(--color-ink)',
              }}
            />
          </span>
        </div>
      </div>
      <div className="p-4 border-t border-hairline">
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-vermilion">
          {item.type}
        </span>
        <h3 className="font-display text-lg font-medium leading-snug text-ink mt-1.5 group-hover:text-vermilion transition-colors">
          {item.title}
        </h3>
      </div>
    </a>
  )
}
