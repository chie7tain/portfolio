import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { http, HttpResponse } from 'msw'
import { server } from '../handlers'
import ProjectsPage from '../../src/pages/ProjectsPage'

function renderPage() {
  return render(
    <MemoryRouter>
      <ProjectsPage />
    </MemoryRouter>,
  )
}

// ── Behavior 12 ──────────────────────────────────────────────────────────────
it('renders all project cards', async () => {
  renderPage()
  await waitFor(() => {
    expect(screen.getByText('Alpha')).toBeInTheDocument()
    expect(screen.getByText('Beta')).toBeInTheDocument()
    expect(screen.getByText('Gamma')).toBeInTheDocument()
  })
})

// ── Behavior 13 ──────────────────────────────────────────────────────────────
it('shows empty state when no projects exist', async () => {
  server.use(http.get('http://localhost:3000/projects', () => HttpResponse.json([])))
  renderPage()
  await waitFor(() => {
    expect(screen.getByText(/no projects/i)).toBeInTheDocument()
  })
})
