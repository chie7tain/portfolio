import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Markdown from 'react-markdown'
import { fetchArticle } from '../api'
import type { Article } from '@shared/types'

function readingTime(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

export default function ArticlePage() {
  const { id } = useParams<{ id: string }>()
  const [article, setArticle] = useState<Article | null>(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!id) return
    fetchArticle(id)
      .then(setArticle)
      .catch(() => setNotFound(true))
  }, [id])

  if (notFound) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center relative z-10">
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-faded">
          Article not found.
        </p>
        <Link
          to="/articles"
          className="inline-block mt-6 font-mono text-xs uppercase tracking-[0.15em] text-vermilion hover:underline underline-offset-4"
        >
          ← Back to articles
        </Link>
      </div>
    )
  }

  if (!article) return null

  const date = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <article className="max-w-3xl mx-auto px-6 pt-10 pb-24 relative z-10">
      <Link
        to="/articles"
        className="inline-block mb-10 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-faded hover:text-vermilion transition-colors"
      >
        ← Writing
      </Link>

      <header className="border-b border-hairline pb-8 mb-10">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-vermilion mb-5">
          {date && <time className="text-faded">{date}</time>}
          {date && <span aria-hidden="true" className="text-hairline">·</span>}
          <span className="text-faded">{readingTime(article.body)} min read</span>
        </div>
        <h1 className="font-display text-4xl md:text-6xl font-semibold tracking-[-0.02em] text-ink leading-[1.02]">
          {article.title}
        </h1>
      </header>

      <div className="prose prose-editorial prose-lg max-w-none">
        <Markdown>{article.body}</Markdown>
      </div>
    </article>
  )
}
