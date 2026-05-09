import { useEffect, useState } from 'react'
import { fetchArticles } from '../api'
import type { Article } from '@shared/types'
import ArticleCard from '../components/ArticleCard'

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[] | null>(null)

  useEffect(() => {
    fetchArticles().then(setArticles).catch(() => setArticles([]))
  }, [])

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-main-red mb-3">Writing</p>
      <h1 className="text-4xl font-black mb-2">Articles</h1>
      <p className="text-main-white/50 mb-4 max-w-lg text-sm">
        Thoughts on engineering, system design, and the craft of building software.
      </p>
      <div className="w-12 h-1 bg-main-red mb-10" />
      {articles !== null && articles.length === 0 && (
        <p className="text-main-white/60">No articles yet.</p>
      )}
      <div className="flex flex-col">
        {(articles ?? []).map((a) => <ArticleCard key={a.id} article={a} />)}
      </div>
    </div>
  )
}
