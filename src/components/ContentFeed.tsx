import { useQuery, type QueryKey } from '@tanstack/react-query'
import type { ComponentType, ReactNode } from 'react'

export type ContentFeedLayout = 'stack' | 'grid'

export interface ContentFeedProps<T> {
  /** react-query cache key. Keep it stable so pages sharing a feed share one cache entry. */
  queryKey: QueryKey
  /** Fetches the full list; `limit` is applied after fetching, not in the key. */
  queryFn: () => Promise<T[]>
  /** Render one record. Include the React `key` on the returned element. */
  renderItem: (item: T, index: number) => ReactNode
  /** Placeholder shown while loading — one per `skeletonCount`. */
  Skeleton: ComponentType
  skeletonCount: number
  layout: ContentFeedLayout
  /** Message shown when the fetch fails. */
  errorLabel: string
  /** Message shown when the fetch succeeds but is empty. Omit to render nothing when empty. */
  emptyLabel?: string
  /** Cap the number of items rendered (e.g. a home-page teaser). */
  limit?: number
  /** Extra classes appended to the layout container. */
  className?: string
}

const layoutClasses: Record<ContentFeedLayout, string> = {
  stack: 'flex flex-col',
  grid: 'grid grid-cols-1 md:grid-cols-3 gap-6',
}

/**
 * A Content Feed: fetches items of a single content type and renders the
 * loading / error / empty / list tri-state. Pages supply their own header and
 * wrap a ContentFeed for the body.
 */
export default function ContentFeed<T>({
  queryKey,
  queryFn,
  renderItem,
  Skeleton,
  skeletonCount,
  layout,
  errorLabel,
  emptyLabel,
  limit,
  className,
}: ContentFeedProps<T>) {
  const { data, isLoading, isError } = useQuery({ queryKey, queryFn })
  const items = limit != null ? data?.slice(0, limit) : data

  const containerClass = className
    ? `${layoutClasses[layout]} ${className}`
    : layoutClasses[layout]

  return (
    <>
      {isError && (
        <p className="py-8 font-mono text-sm text-vermilion">{errorLabel}</p>
      )}
      {!isLoading && !isError && items?.length === 0 && emptyLabel && (
        <p className="py-8 font-mono text-sm text-faded uppercase tracking-wider">
          {emptyLabel}
        </p>
      )}

      <div className={containerClass}>
        {isLoading
          ? Array.from({ length: skeletonCount }).map((_, i) => <Skeleton key={i} />)
          : items?.map((item, i) => renderItem(item, i))}
      </div>
    </>
  )
}
