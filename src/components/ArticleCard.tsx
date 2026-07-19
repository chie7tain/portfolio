import { Link } from 'react-router-dom'
import { readingTime } from '../utils/readingTime'
import type { Article } from '@shared/types'

export default function ArticleCard({ article }: { article: Article }) {
  const date = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  const year = article.publishedAt
    ? new Date(article.publishedAt).getFullYear()
    : null

  return (
    <Link
      to={`/articles/${article.id}`}
      aria-label={article.title}
      className="group grid grid-cols-[3rem_1fr_auto] md:grid-cols-[4rem_1fr_auto] items-baseline gap-4 md:gap-8 py-6 px-3 -mx-3 border-b border-hairline transition-colors duration-300 hover:bg-paper-deep"
    >
      <span
        aria-hidden="true"
        className="font-mono text-xs tabular-nums text-faded self-start pt-1.5"
      >
        {year ?? '—'}
      </span>

      <div className="min-w-0">
        <h3 className="font-display text-2xl md:text-[1.7rem] font-medium leading-snug text-ink group-hover:text-vermilion transition-colors">
          {article.title}
        </h3>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.68rem] uppercase tracking-[0.15em] text-faded">
          {date && <time dateTime={article.publishedAt ?? undefined}>{date}</time>}
          {date && <span aria-hidden="true">·</span>}
          <span>{readingTime(article.body)} min read</span>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="self-start pt-2 text-vermilion opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
      >
        →
      </span>
    </Link>
  )
}
