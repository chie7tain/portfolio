import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { http, HttpResponse } from 'msw'
import { server, mockProjects, mockArticles, mockMedia } from '../handlers'
import HomePage from '../../src/pages/HomePage'

function renderPage() {
  return render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  )
}

// ── Behavior 4 ───────────────────────────────────────────────────────────────
it('renders hero with name and tagline', () => {
  renderPage()
  expect(screen.getByText('Ifeanyi Okwuobi')).toBeInTheDocument()
  expect(screen.getByText(/scalable, data-driven/i)).toBeInTheDocument()
})

// ── Behavior 5 ───────────────────────────────────────────────────────────────
it('fetches and renders top 3 project cards', async () => {
  renderPage()
  await waitFor(() => {
    expect(screen.getByText('Alpha')).toBeInTheDocument()
    expect(screen.getByText('Beta')).toBeInTheDocument()
    expect(screen.getByText('Gamma')).toBeInTheDocument()
  })
})

// ── Behavior 6 ───────────────────────────────────────────────────────────────
it('project card links to external URL in new tab', async () => {
  renderPage()
  const link = await screen.findByRole('link', { name: /alpha/i })
  expect(link).toHaveAttribute('href', 'https://alpha.com')
  expect(link).toHaveAttribute('target', '_blank')
})

// ── Behavior 7 ───────────────────────────────────────────────────────────────
it('projects "See all" links to /projects', () => {
  renderPage()
  const seeAll = screen.getByRole('link', { name: /see all projects/i })
  expect(seeAll).toHaveAttribute('href', '/projects')
})

// ── Behavior 8 ───────────────────────────────────────────────────────────────
it('fetches and renders top 3 article cards', async () => {
  renderPage()
  await waitFor(() => {
    expect(screen.getByText('First Article')).toBeInTheDocument()
    expect(screen.getByText('Second Article')).toBeInTheDocument()
  })
})

// ── Behavior 9 ───────────────────────────────────────────────────────────────
it('article card links to /articles/:id', async () => {
  renderPage()
  const link = await screen.findByRole('link', { name: /first article/i })
  expect(link).toHaveAttribute('href', '/articles/a1')
})

// ── Behavior 10 ──────────────────────────────────────────────────────────────
it('fetches and renders top 3 media cards', async () => {
  renderPage()
  await waitFor(() => {
    expect(screen.getByText('Dev Podcast Ep1')).toBeInTheDocument()
    expect(screen.getByText('Tech Talk Video')).toBeInTheDocument()
  })
})

// ── Behavior 11 ──────────────────────────────────────────────────────────────
it('shows error state when an API call fails', async () => {
  server.use(
    http.get('http://localhost:3000/projects', () => HttpResponse.json({}, { status: 500 })),
  )
  renderPage()
  await waitFor(() => {
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
  })
})
