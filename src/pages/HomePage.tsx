import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { fetchProjects, fetchArticles, fetchMedia } from "../api";
import ProjectCard from "../components/ProjectCard";
import ArticleCard from "../components/ArticleCard";
import MediaCard from "../components/MediaCard";
import ProjectCardSkeleton from "../components/ProjectCardSkeleton";
import ArticleCardSkeleton from "../components/ArticleCardSkeleton";
import MediaCardSkeleton from "../components/MediaCardSkeleton";

const techStack = ["Node.js", "React", "TypeScript", "PostgreSQL", "Docker"];

const heroSocials = [
  {
    label: "GitHub profile",
    href: "https://github.com/chie7tain",
    Icon: FaGithub,
  },
  {
    label: "LinkedIn profile",
    href: "https://linkedin.com/in/ifeanyi-okwuobi",
    Icon: FaLinkedin,
  },
  {
    label: "Twitter profile",
    href: "https://twitter.com/chie7tain",
    Icon: FaXTwitter,
  },
];

export default function HomePage() {
  const { data: allProjects, isLoading: loadingProjects, isError: errorProjects } = useQuery({ queryKey: ['projects'], queryFn: fetchProjects })
  const { data: allArticles, isLoading: loadingArticles, isError: errorArticles } = useQuery({ queryKey: ['articles'], queryFn: fetchArticles })
  const { data: allMedia, isLoading: loadingMedia, isError: errorMedia } = useQuery({ queryKey: ['media'], queryFn: fetchMedia })

  const projects = allProjects?.slice(0, 3)
  const articles = allArticles?.slice(0, 3)
  const media = allMedia?.slice(0, 3)

  return (
    <div className="max-w-5xl mx-auto px-6">
      {/* Hero */}
      <section
        className="py-24 md:py-36 relative"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 0% 0%, rgba(190,49,68,0.08) 0%, transparent 70%)",
        }}
      >
        <div className="flex items-center gap-2 mb-6">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
          </span>
          <span className="text-xs font-medium text-main-white/60 uppercase tracking-widest">
            Open to work
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-4">
          Ifeanyi Okwuobi
        </h1>

        <p className="text-sm text-main-white/40 mb-5 tracking-wide">
          Lagos, Nigeria · Remote
        </p>

        <p className="text-lg md:text-xl text-main-white/70 max-w-xl mb-8">
          Full-stack software engineer. I build scalable, data-driven
          applications and web platforms.
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs font-medium px-3 py-1.5 rounded-full border border-white/10 text-main-white/60 bg-white/5"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-5">
          {heroSocials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-main-white/40 hover:text-main-white transition-colors"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="py-12 border-t border-white/5 -mx-6 px-6" style={{ background: 'rgba(190,49,68,0.05)' }}>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-main-red mb-4">
          About
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <p className="text-main-white/70 leading-relaxed">
            I'm a full-stack engineer focused on backend systems, APIs, and
            developer tooling. I've shipped production software across fintech,
            SaaS, and media from database schema design to real-time event
            pipelines. I care about clean architecture and code that doesn't
            need a legend to read.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              "API Design",
              "Node.js / Express",
              "React / TypeScript",
              "PostgreSQL",
              "Docker / CI/CD",
              "System Design",
            ].map((skill) => (
              <div
                key={skill}
                className="flex items-center gap-2 text-sm text-main-white/70"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-main-red shrink-0" />
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Featured Projects */}
      <section className="py-12 border-t border-white/5">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-main-red mb-1">
              Work
            </p>
            <h2 className="text-2xl font-bold">Selected Projects</h2>
          </div>
          <Link
            to="/projects"
            aria-label="See all projects"
            className="text-sm text-main-red hover:underline"
          >
            See all projects →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loadingProjects
            ? Array.from({ length: 3 }).map((_, i) => <ProjectCardSkeleton key={i} />)
            : errorProjects
            ? <p className="text-red-400 text-sm col-span-3">Failed to load projects.</p>
            : projects?.map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-12 border-t border-white/5 -mx-6 px-6" style={{ background: 'rgba(190,49,68,0.05)' }}>
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-main-red mb-1">
              Writing
            </p>
            <h2 className="text-2xl font-bold">Selected Articles</h2>
          </div>
          <Link
            to="/articles"
            aria-label="See all articles"
            className="text-sm text-main-red hover:underline"
          >
            See all articles →
          </Link>
        </div>
        <div className="flex flex-col">
          {loadingArticles
            ? Array.from({ length: 3 }).map((_, i) => <ArticleCardSkeleton key={i} />)
            : errorArticles
            ? <p className="text-red-400 text-sm">Failed to load articles.</p>
            : articles?.map((a) => <ArticleCard key={a.id} article={a} />)}
        </div>
      </section>

      {/* Featured Media */}
      <section className="py-12 border-t border-white/5">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-main-red mb-1">
              Media
            </p>
            <h2 className="text-2xl font-bold">Selected Media</h2>
          </div>
          <Link
            to="/media"
            aria-label="See all media"
            className="text-sm text-main-red hover:underline"
          >
            See all media →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loadingMedia
            ? Array.from({ length: 3 }).map((_, i) => <MediaCardSkeleton key={i} />)
            : errorMedia
            ? <p className="text-red-400 text-sm col-span-3">Failed to load media.</p>
            : media?.map((m) => <MediaCard key={m.id} item={m} />)}
        </div>
      </section>
    </div>
  );
}
