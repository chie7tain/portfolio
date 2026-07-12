import type { Project } from '@shared/types'

export default function ProjectCard({
  project,
  index = 0,
}: {
  project: Project
  index?: number
}) {
  const n = String(index + 1).padStart(2, '0')

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={project.title}
      className="group relative grid grid-cols-[2.5rem_1fr_auto] md:grid-cols-[4rem_1fr_auto] items-center gap-4 md:gap-8 py-6 md:py-7 px-3 -mx-3 border-b border-hairline transition-colors duration-300 hover:bg-paper-deep"
    >
      <span className="self-start pt-1.5 font-mono text-xs tabular-nums text-faded">
        <span
          aria-hidden="true"
          className="text-vermilion opacity-0 group-hover:opacity-100 transition-opacity"
        >
          ›
        </span>{' '}
        {n}
      </span>

      <div className="min-w-0">
        <h3 className="font-display text-2xl md:text-[1.75rem] font-medium leading-tight text-ink group-hover:text-vermilion transition-colors">
          {project.title}
        </h3>
        {project.description && (
          <p className="mt-1.5 max-w-xl text-sm text-faded line-clamp-2">
            {project.description}
          </p>
        )}
      </div>

      <div className="flex items-center gap-4 md:gap-6 shrink-0">
        <span className="hidden md:block w-24 h-16 overflow-hidden border border-hairline bg-paper-deep opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <img
            src={project.image}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
        </span>
        <span
          aria-hidden="true"
          className="text-vermilion text-xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
        >
          ↗
        </span>
      </div>
    </a>
  )
}
