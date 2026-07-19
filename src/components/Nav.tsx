import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

const links = [
  { label: 'Projects', to: '/projects' },
  { label: 'Articles', to: '/articles' },
  { label: 'Media', to: '/media' },
  { label: 'Contact', to: '/contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-sm border-b border-ink">
      {/* masthead rule */}
      <div className="h-1 bg-vermilion" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="group flex flex-col leading-none">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-faded mb-1">
            Portfolio № 01
          </span>
          <span className="font-display text-2xl md:text-[1.7rem] font-semibold tracking-tight text-ink group-hover:text-vermilion transition-colors">
            Ifeanyi Okwuobi
          </span>
        </Link>

        <div className="flex items-center gap-5 md:gap-8">
          <nav
            id="primary-nav"
            role="navigation"
            data-open={String(open)}
            className={[
              'md:flex md:items-center md:gap-9 md:static md:bg-transparent md:border-none md:py-0 md:px-0',
              open
                ? 'flex flex-col absolute inset-x-0 top-[84px] bg-paper border-b border-ink px-6 py-6 gap-6 z-40'
                : 'hidden',
            ].join(' ')}
          >
            {links.map(({ label, to }) => {
              const active = pathname === to || pathname.startsWith(`${to}/`)
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  className={[
                    'font-mono text-xs uppercase tracking-[0.18em] transition-colors relative pb-1 md:text-[0.72rem]',
                    active ? 'text-vermilion' : 'text-ink/70 hover:text-ink',
                  ].join(' ')}
                >
                  <span
                    aria-hidden="true"
                    className={[
                      'mr-2 text-vermilion transition-opacity',
                      active ? 'opacity-100' : 'opacity-0',
                    ].join(' ')}
                  >
                    §
                  </span>
                  {label}
                  <span
                    aria-hidden="true"
                    className={[
                      'absolute left-0 -bottom-0.5 h-px bg-vermilion transition-all duration-300',
                      active ? 'w-full' : 'w-0',
                    ].join(' ')}
                  />
                </Link>
              )
            })}
          </nav>

          <ThemeToggle />

          <button
            aria-label="menu"
            aria-expanded={open}
            aria-controls="primary-nav"
            onClick={() => setOpen((o) => !o)}
            className="md:hidden flex flex-col gap-1.5 p-2"
          >
            <span className={['block w-6 h-0.5 bg-ink transition-transform duration-200', open ? 'rotate-45 translate-y-2' : ''].join(' ')} />
            <span className={['block w-6 h-0.5 bg-ink transition-opacity duration-200', open ? 'opacity-0' : ''].join(' ')} />
            <span className={['block w-6 h-0.5 bg-ink transition-transform duration-200', open ? '-rotate-45 -translate-y-2' : ''].join(' ')} />
          </button>
        </div>
      </div>
    </header>
  )
}
