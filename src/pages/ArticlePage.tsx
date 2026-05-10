import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Markdown from 'react-markdown'
import { fetchArticle } from '../api'
import type { Article } from '@shared/types'

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
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="text-main-white/60">Article not found.</p>
      </div>
    )
  }

  if (!article) return null

  const date = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : null

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-black mb-2">{article.title}</h1>
      {date && <time className="text-sm text-main-white/50">{date}</time>}
      <div className="w-12 h-1 bg-main-red my-8" />
      <div className="prose prose-invert max-w-none">
        <Markdown>{article.body}</Markdown>
      </div>
    </article>
  )
}
