import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, HttpResponse } from 'msw'
import { server } from '../handlers'
import MediaPage from '../../src/pages/MediaPage'

function renderPage() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <MediaPage />
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

// ── Behavior 19 ──────────────────────────────────────────────────────────────
it('renders media cards with title, thumbnail, and type badge', async () => {
  renderPage()
  await waitFor(() => {
    expect(screen.getByText('Dev Podcast Ep1')).toBeInTheDocument()
    expect(screen.getByText('Tech Talk Video')).toBeInTheDocument()
    expect(screen.getByText('podcast')).toBeInTheDocument()
    expect(screen.getByText('video')).toBeInTheDocument()
  })
})

// ── Behavior 20 ──────────────────────────────────────────────────────────────
it('shows empty state when no media exist', async () => {
  server.use(http.get('http://localhost:3000/media', () => HttpResponse.json([])))
  renderPage()
  await waitFor(() => {
    expect(screen.getByText(/no media/i)).toBeInTheDocument()
  })
})
