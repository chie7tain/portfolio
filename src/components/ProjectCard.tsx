import type { Project } from '@shared/types'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={project.title}
      className="group block bg-white/5 rounded-xl overflow-hidden border border-white/5 hover:border-main-red/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-main-red/10 transition-all duration-300"
    >
      <div className="aspect-video bg-main-blue/30 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-main-white">{project.title}</h3>
          {project.description && (
            <p className="text-sm text-main-white/60 mt-1">{project.description}</p>
          )}
        </div>
        <span
          aria-hidden="true"
          className="shrink-0 text-main-red opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 mt-0.5 text-lg"
        >
          ↗
        </span>
      </div>
    </a>
  )
}
