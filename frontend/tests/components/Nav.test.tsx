import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Nav from '../../src/components/Nav'

function renderNav() {
  return render(
    <MemoryRouter>
      <Nav />
    </MemoryRouter>,
  )
}

// ── Behavior 1 ───────────────────────────────────────────────────────────────
it('renders Projects, Articles, and Media nav links', () => {
  renderNav()
  expect(screen.getByRole('link', { name: /projects/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /articles/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /media/i })).toBeInTheDocument()
})

// ── Behavior 2 ───────────────────────────────────────────────────────────────
it('shows burger button on mobile viewport', () => {
  window.innerWidth = 375
  window.dispatchEvent(new Event('resize'))
  renderNav()
  expect(screen.getByRole('button', { name: /menu/i })).toBeInTheDocument()
})

// ── Behavior 3 ───────────────────────────────────────────────────────────────
it('burger button toggles nav links', async () => {
  const user = userEvent.setup()
  renderNav()
  const burger = screen.getByRole('button', { name: /menu/i })
  const nav = screen.getByRole('navigation')

  // Links start hidden on mobile
  expect(nav).toHaveAttribute('data-open', 'false')

  await user.click(burger)
  expect(nav).toHaveAttribute('data-open', 'true')

  await user.click(burger)
  expect(nav).toHaveAttribute('data-open', 'false')
})
