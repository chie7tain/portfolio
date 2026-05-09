import { render, screen } from '@testing-library/react'
import Footer from '../../src/components/Footer'

// ── Behavior 21 ──────────────────────────────────────────────────────────────
it('renders GitHub icon link', () => {
  render(<Footer />)
  expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument()
})

// ── Behavior 22 ──────────────────────────────────────────────────────────────
it('renders LinkedIn icon link', () => {
  render(<Footer />)
  expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument()
})

// ── Behavior 23 ──────────────────────────────────────────────────────────────
it('renders Twitter/X icon link', () => {
  render(<Footer />)
  expect(screen.getByRole('link', { name: /twitter/i })).toBeInTheDocument()
})
