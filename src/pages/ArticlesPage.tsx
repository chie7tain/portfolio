import ContentFeed from '../components/ContentFeed'
import { fetchArticles } from '../api'
import ArticleCard from '../components/ArticleCard'
import ArticleCardSkeleton from '../components/ArticleCardSkeleton'

export default function ArticlesPage() {
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

      <ContentFeed
        queryKey={['articles']}
        queryFn={fetchArticles}
        renderItem={(a) => <ArticleCard key={a.id} article={a} />}
        Skeleton={ArticleCardSkeleton}
        skeletonCount={4}
        layout="stack"
        errorLabel="Something went wrong loading articles."
        emptyLabel="No articles yet."
      />
    </div>
  )
}
