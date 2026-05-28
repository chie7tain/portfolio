import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "../api";
import ProjectCard from "../components/ProjectCard";
import ProjectCardSkeleton from "../components/ProjectCardSkeleton";

export default function ProjectsPage() {
  const { data: projects, isLoading, isError } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-main-red mb-3">
        Work
      </p>
      <h1 className="text-4xl font-black mb-2">Projects</h1>
      <p className="text-main-white/50 mb-4 max-w-lg text-sm">
        Production software, open-source tools, and side experiments.
      </p>
      <div className="w-12 h-1 bg-main-red mb-10" />
      {isError && (
        <p className="text-red-400 text-sm mb-6">Failed to load projects.</p>
      )}
      {!isLoading && !isError && projects?.length === 0 && (
        <p className="text-main-white/60">No projects yet.</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))
          : projects?.map((p) => <ProjectCard key={p.id} project={p} />)}
      </div>
    </div>
  );
}
