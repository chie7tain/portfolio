import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { http, HttpResponse } from 'msw'
import { server } from '../handlers'
import ArticlePage from '../../src/pages/ArticlePage'

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/articles/:id" element={<ArticlePage />} />
      </Routes>
    </MemoryRouter>,
  )
}

// ── Behavior 16 ──────────────────────────────────────────────────────────────
it('renders article title and published date', async () => {
  renderAt('/articles/a1')
  await waitFor(() => {
    expect(screen.getByText('First Article')).toBeInTheDocument()
    expect(screen.getByText('March 1, 2025')).toBeInTheDocument()
  })
})

// ── Behavior 17 ──────────────────────────────────────────────────────────────
it('renders article body as HTML from Markdown', async () => {
  renderAt('/articles/a1')
  await waitFor(() => {
    expect(screen.getByRole('heading', { name: /hello/i })).toBeInTheDocument()
    expect(screen.getByText('Content.')).toBeInTheDocument()
  })
})

// ── Behavior 18 ──────────────────────────────────────────────────────────────
it('shows not found message for unknown article ID', async () => {
  server.use(
    http.get('http://localhost:3000/articles/:id', () =>
      HttpResponse.json({ error: 'Not found' }, { status: 404 }),
    ),
  )
  renderAt('/articles/unknown')
  await waitFor(() => {
    expect(screen.getByText(/article not found/i)).toBeInTheDocument()
  })
})
