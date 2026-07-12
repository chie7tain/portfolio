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
import Reveal from "../components/Reveal";

const techStack = ["Node.js", "React", "TypeScript", "PostgreSQL", "Docker"];

const skills = [
  "API Design",
  "Node.js / Express",
  "React / TypeScript",
  "PostgreSQL",
  "Docker / CI·CD",
  "System Design",
];

const heroSocials = [
  { label: "GitHub profile", href: "https://github.com/chie7tain", Icon: FaGithub },
  {
    label: "LinkedIn profile",
    href: "https://linkedin.com/in/ifeanyi-okwuobi",
    Icon: FaLinkedin,
  },
  { label: "Twitter profile", href: "https://twitter.com/chie7tain", Icon: FaXTwitter },
];

/** Section masthead — kicker number + title, with an index link on the right. */
function SectionHead({
  index,
  eyebrow,
  title,
  to,
  linkLabel,
}: {
  index: string;
  eyebrow: string;
  title: string;
  to: string;
  linkLabel: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4 border-b-2 border-ink pb-4 mb-2">
      <div>
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.25em] text-vermilion">
          § {index} — {eyebrow}
        </span>
        <h2 className="font-display text-3xl md:text-[2.6rem] font-semibold tracking-tight text-ink leading-none mt-2">
          {title}
        </h2>
      </div>
      <Link
        to={to}
        aria-label={linkLabel}
        className="shrink-0 font-mono text-[0.68rem] uppercase tracking-[0.15em] text-ink hover:text-vermilion transition-colors pb-1"
      >
        {linkLabel} →
      </Link>
    </div>
  );
}

export default function HomePage() {
  const {
    data: allProjects,
    isLoading: loadingProjects,
    isError: errorProjects,
  } = useQuery({ queryKey: ["projects"], queryFn: fetchProjects });
  const {
    data: allArticles,
    isLoading: loadingArticles,
    isError: errorArticles,
  } = useQuery({ queryKey: ["articles"], queryFn: fetchArticles });
  const {
    data: allMedia,
    isLoading: loadingMedia,
    isError: errorMedia,
  } = useQuery({ queryKey: ["media"], queryFn: fetchMedia });

  const projects = allProjects?.slice(0, 3);
  const articles = allArticles?.slice(0, 3);
  const media = allMedia?.slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-6 relative z-10">
      {/* ── Cover ─────────────────────────────────────────────────────────── */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="reveal is-visible" style={{ animationDelay: "0ms" }}>
          <div className="flex items-center gap-2.5 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vermilion opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-vermilion" />
            </span>
            <span className="font-mono text-[0.68rem] font-medium text-faded uppercase tracking-[0.3em]">
              Open to work
            </span>
          </div>
        </div>

        {/* Byline — the name lives here as its own line */}
        <div
          className="reveal is-visible flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-6"
          style={{ animationDelay: "80ms" }}
        >
          <span className="font-display text-lg font-medium text-ink">
            Ifeanyi Okwuobi
          </span>
          <span aria-hidden="true" className="text-hairline">
            /
          </span>
          <span className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-faded">
            Full-stack engineer · Lagos, NG
          </span>
        </div>

        {/* Statement headline */}
        <h1
          className="reveal is-visible font-display font-semibold tracking-[-0.02em] text-ink leading-[0.92] text-[3.25rem] sm:text-7xl md:text-[6rem]"
          style={{ animationDelay: "160ms" }}
        >
          I build the systems
          <br />
          <span className="italic text-vermilion">behind the screen.</span>
        </h1>

        {/* Deck */}
        <p
          className="reveal is-visible mt-8 max-w-2xl text-lg md:text-xl text-ink-soft leading-relaxed"
          style={{ animationDelay: "240ms" }}
        >
          A full-stack software engineer building{" "}
          <span className="text-ink font-medium">scalable, data-driven</span>{" "}
          applications and web platforms — from database schema to real-time
          event pipelines.
        </p>

        {/* Tech + socials */}
        <div
          className="reveal is-visible mt-10 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10"
          style={{ animationDelay: "320ms" }}
        >
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {techStack.map((tech) => (
              <li
                key={tech}
                className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-faded"
              >
                {tech}
              </li>
            ))}
          </ul>
          <span className="hidden sm:block w-px h-5 bg-hairline" aria-hidden="true" />
          <div className="flex items-center gap-5">
            {heroSocials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-ink/50 hover:text-vermilion transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ─────────────────────────────────────────────────────────── */}
      <Reveal as="section" className="py-14 border-t-2 border-ink">
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.25em] text-vermilion">
          § 01 — About
        </span>
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10 md:gap-16 items-start mt-6">
          <p className="dropcap font-display text-xl md:text-2xl leading-relaxed text-ink-soft">
            I&apos;m a full-stack engineer focused on backend systems, APIs, and
            developer tooling. I&apos;ve shipped production software across
            fintech, SaaS, and media — from database schema design to real-time
            event pipelines. I care about clean architecture and code that
            doesn&apos;t need a legend to read.
          </p>
          <ul className="border-t border-hairline">
            {skills.map((skill, i) => (
              <li
                key={skill}
                className="flex items-baseline gap-4 py-3 border-b border-hairline"
              >
                <span className="font-mono text-[0.7rem] text-vermilion tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-ink font-medium">{skill}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* ── Selected Work ─────────────────────────────────────────────────── */}
      <Reveal as="section" className="py-14 border-t border-hairline">
        <SectionHead
          index="02"
          eyebrow="Work"
          title="Selected Projects"
          to="/projects"
          linkLabel="See all projects"
        />
        <div className="flex flex-col">
          {loadingProjects ? (
            Array.from({ length: 3 }).map((_, i) => <ProjectCardSkeleton key={i} />)
          ) : errorProjects ? (
            <p className="py-8 font-mono text-sm text-vermilion">
              Something went wrong loading projects.
            </p>
          ) : (
            projects?.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)
          )}
        </div>
      </Reveal>

      {/* ── Selected Writing ──────────────────────────────────────────────── */}
      <Reveal as="section" className="py-14 border-t border-hairline">
        <SectionHead
          index="03"
          eyebrow="Writing"
          title="Selected Articles"
          to="/articles"
          linkLabel="See all articles"
        />
        <div className="flex flex-col">
          {loadingArticles ? (
            Array.from({ length: 3 }).map((_, i) => <ArticleCardSkeleton key={i} />)
          ) : errorArticles ? (
            <p className="py-8 font-mono text-sm text-vermilion">
              Something went wrong loading articles.
            </p>
          ) : (
            articles?.map((a) => <ArticleCard key={a.id} article={a} />)
          )}
        </div>
      </Reveal>

      {/* ── Selected Media ────────────────────────────────────────────────── */}
      <Reveal as="section" className="py-14 border-t border-hairline">
        <SectionHead
          index="04"
          eyebrow="Media"
          title="Selected Media"
          to="/media"
          linkLabel="See all media"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {loadingMedia ? (
            Array.from({ length: 3 }).map((_, i) => <MediaCardSkeleton key={i} />)
          ) : errorMedia ? (
            <p className="col-span-3 py-8 font-mono text-sm text-vermilion">
              Something went wrong loading media.
            </p>
          ) : (
            media?.map((m) => <MediaCard key={m.id} item={m} />)
          )}
        </div>
      </Reveal>
    </div>
  );
}
