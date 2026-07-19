import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ContentFeed, { type ContentFeedProps } from '../../src/components/ContentFeed'

type Item = { id: string; title: string }

function Skeleton() {
  return <div data-testid="skeleton" />
}

const items: Item[] = [
  { id: '1', title: 'Alpha' },
  { id: '2', title: 'Beta' },
]

function renderFeed(overrides: Partial<ContentFeedProps<Item>> = {}) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  const props: ContentFeedProps<Item> = {
    queryKey: ['content-feed-test'],
    queryFn: async () => items,
    renderItem: (item, index) => (
      <div key={item.id} data-testid="item">
        {index}:{item.title}
      </div>
    ),
    Skeleton,
    skeletonCount: 3,
    layout: 'stack',
    errorLabel: 'Something went wrong loading the feed.',
    ...overrides,
  }
  return render(
    <QueryClientProvider client={queryClient}>
      <ContentFeed {...props} />
    </QueryClientProvider>,
  )
}

it('renders an item per fetched record via renderItem, with its index', async () => {
  renderFeed()
  await waitFor(() => {
    expect(screen.getByText('0:Alpha')).toBeInTheDocument()
    expect(screen.getByText('1:Beta')).toBeInTheDocument()
  })
})

it('renders skeletonCount skeletons while loading', () => {
  renderFeed({ queryFn: () => new Promise<Item[]>(() => {}), skeletonCount: 4 })
  expect(screen.getAllByTestId('skeleton')).toHaveLength(4)
})

it('shows the error label when the fetch fails', async () => {
  renderFeed({
    queryFn: async () => {
      throw new Error('boom')
    },
    errorLabel: 'Feed failed to load.',
  })
  await waitFor(() => {
    expect(screen.getByText('Feed failed to load.')).toBeInTheDocument()
  })
})

it('shows the empty label when the fetch succeeds but is empty', async () => {
  renderFeed({ queryFn: async () => [], emptyLabel: 'Nothing here yet.' })
  await waitFor(() => {
    expect(screen.getByText('Nothing here yet.')).toBeInTheDocument()
  })
})

it('renders nothing extra when empty and no empty label is given', async () => {
  renderFeed({ queryFn: async () => [] })
  await waitFor(() => {
    expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument()
  })
  expect(screen.queryByTestId('item')).not.toBeInTheDocument()
  expect(screen.queryByText(/nothing here/i)).not.toBeInTheDocument()
})

it('caps rendered items at limit', async () => {
  renderFeed({
    queryFn: async () => [
      { id: '1', title: 'Alpha' },
      { id: '2', title: 'Beta' },
      { id: '3', title: 'Gamma' },
    ],
    limit: 2,
  })
  await waitFor(() => {
    expect(screen.getByText('0:Alpha')).toBeInTheDocument()
  })
  expect(screen.getByText('1:Beta')).toBeInTheDocument()
  expect(screen.queryByText('2:Gamma')).not.toBeInTheDocument()
})
