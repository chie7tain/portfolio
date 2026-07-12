import { useQuery } from '@tanstack/react-query'
import { fetchArticles } from '../api'
import ArticleCard from '../components/ArticleCard'
import ArticleCardSkeleton from '../components/ArticleCardSkeleton'

export default function ArticlesPage() {
  const { data: articles, isLoading, isError } = useQuery({
    queryKey: ['articles'],
    queryFn: fetchArticles,
  })

  return (
    <div className="max-w-6xl mx-auto px-6 pt-14 pb-24 relative z-10">
      <header className="border-b-2 border-ink pb-8 mb-4">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-vermilion">
          § 03 — Writing
        </span>
        <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-[-0.02em] text-ink leading-[0.95] mt-4">
          Articles
        </h1>
        <p className="mt-5 max-w-xl text-ink-soft leading-relaxed">
          Thoughts on engineering, system design, and the craft of building
          software that lasts.
        </p>
      </header>

      {isError && (
        <p className="py-8 font-mono text-sm text-vermilion">
          Something went wrong loading articles.
        </p>
      )}
      {!isLoading && !isError && articles?.length === 0 && (
        <p className="py-8 font-mono text-sm text-faded uppercase tracking-wider">
          No articles yet.
        </p>
      )}

      <div className="flex flex-col">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <ArticleCardSkeleton key={i} />)
          : articles?.map((a) => <ArticleCard key={a.id} article={a} />)}
      </div>
    </div>
  )
}
