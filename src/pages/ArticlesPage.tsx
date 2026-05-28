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
    <div className="max-w-5xl mx-auto px-6 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-main-red mb-3">Writing</p>
      <h1 className="text-4xl font-black mb-2">Articles</h1>
      <p className="text-main-white/50 mb-4 max-w-lg text-sm">
        Thoughts on engineering, system design, and the craft of building software.
      </p>
      <div className="w-12 h-1 bg-main-red mb-10" />
      {isError && (
        <p className="text-red-400 text-sm mb-6">Failed to load articles.</p>
      )}
      {!isLoading && !isError && articles?.length === 0 && (
        <p className="text-main-white/60">No articles yet.</p>
      )}
      <div className="flex flex-col">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <ArticleCardSkeleton key={i} />)
          : articles?.map((a) => <ArticleCard key={a.id} article={a} />)}
      </div>
    </div>
  )
}
