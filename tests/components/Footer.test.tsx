import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Footer from '../../src/components/Footer'

function renderFooter() {
  return render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>,
  )
}

// ── Behavior 21 ──────────────────────────────────────────────────────────────
it('renders GitHub icon link', () => {
  renderFooter()
  expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument()
})

// ── Behavior 22 ──────────────────────────────────────────────────────────────
it('renders LinkedIn icon link', () => {
  renderFooter()
  expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument()
})

// ── Behavior 23 ──────────────────────────────────────────────────────────────
it('renders Twitter/X icon link', () => {
  renderFooter()
  expect(screen.getByRole('link', { name: /twitter/i })).toBeInTheDocument()
})
