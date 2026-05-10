import { useEffect, useState } from 'react'
import { fetchProjects } from '../api'
import type { Project } from '@shared/types'
import ProjectCard from '../components/ProjectCard'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[] | null>(null)

  useEffect(() => {
    fetchProjects().then(setProjects).catch(() => setProjects([]))
  }, [])

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-main-red mb-3">Work</p>
      <h1 className="text-4xl font-black mb-2">Projects</h1>
      <p className="text-main-white/50 mb-4 max-w-lg text-sm">
        Production software, open-source tools, and side experiments.
      </p>
      <div className="w-12 h-1 bg-main-red mb-10" />
      {projects !== null && projects.length === 0 && (
        <p className="text-main-white/60">No projects yet.</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(projects ?? []).map((p) => <ProjectCard key={p.id} project={p} />)}
      </div>
    </div>
  )
}
