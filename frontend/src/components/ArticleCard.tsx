import { Link } from 'react-router-dom'
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
      className="group flex items-start gap-6 py-5 border-b border-white/10 border-l-2 border-l-transparent hover:border-l-main-red hover:pl-3 pl-0 transition-all duration-200"
    >
      {year && (
        <span
          aria-hidden="true"
          className="shrink-0 text-4xl font-black text-white/10 group-hover:text-white/20 transition-colors leading-none tabular-nums w-16 text-right hidden sm:block"
        >
          {year}
        </span>
      )}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-main-white leading-snug">{article.title}</h3>
        {date && (
          <time className="text-sm text-main-white/50 mt-1 block">{date}</time>
        )}
      </div>
      <span
        aria-hidden="true"
        className="shrink-0 text-main-red opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-0.5"
      >
        →
      </span>
    </Link>
  )
}
