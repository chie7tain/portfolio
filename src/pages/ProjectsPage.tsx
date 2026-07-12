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
    <div className="max-w-6xl mx-auto px-6 pt-14 pb-24 relative z-10">
      <header className="border-b-2 border-ink pb-8 mb-4">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-vermilion">
          § 02 — Work
        </span>
        <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-[-0.02em] text-ink leading-[0.95] mt-4">
          Projects
        </h1>
        <p className="mt-5 max-w-xl text-ink-soft leading-relaxed">
          Production software, open-source tools, and side experiments — the
          things I&apos;ve built and shipped.
        </p>
      </header>

      {isError && (
        <p className="py-8 font-mono text-sm text-vermilion">
          Something went wrong loading projects.
        </p>
      )}
      {!isLoading && !isError && projects?.length === 0 && (
        <p className="py-8 font-mono text-sm text-faded uppercase tracking-wider">
          No projects yet.
        </p>
      )}

      <div className="flex flex-col">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <ProjectCardSkeleton key={i} />)
          : projects?.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
      </div>
    </div>
  );
}
