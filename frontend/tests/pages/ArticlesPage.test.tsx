import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { http, HttpResponse } from 'msw'
import { server } from '../handlers'
import ArticlesPage from '../../src/pages/ArticlesPage'

function renderPage() {
  return render(
    <MemoryRouter>
      <ArticlesPage />
    </MemoryRouter>,
  )
}

// ── Behavior 14 ──────────────────────────────────────────────────────────────
it('renders article cards with title and formatted date', async () => {
  renderPage()
  await waitFor(() => {
    expect(screen.getByText('First Article')).toBeInTheDocument()
    expect(screen.getByText('Second Article')).toBeInTheDocument()
    expect(screen.getByText('March 1, 2025')).toBeInTheDocument()
  })
})

// ── Behavior 15 ──────────────────────────────────────────────────────────────
it('shows empty state when no articles exist', async () => {
  server.use(http.get('http://localhost:3000/articles', () => HttpResponse.json([])))
  renderPage()
  await waitFor(() => {
    expect(screen.getByText(/no articles/i)).toBeInTheDocument()
  })
})
