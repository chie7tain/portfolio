import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { label: 'Projects', to: '/projects' },
  { label: 'Articles', to: '/articles' },
  { label: 'Media', to: '/media' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-50 bg-main-black/95 backdrop-blur border-b border-white/10">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="font-black text-lg tracking-tight text-main-white border-b-2 border-transparent hover:border-main-red transition-colors pb-0.5"
        >
          IO
        </Link>

        <nav
          role="navigation"
          data-open={String(open)}
          className={[
            'md:flex md:items-center md:gap-8 md:static md:bg-transparent md:border-none md:py-0 md:px-0',
            open
              ? 'flex flex-col absolute inset-x-0 top-16 bg-main-black border-b border-white/10 px-6 py-6 gap-6 z-40'
              : 'hidden',
          ].join(' ')}
        >
          {links.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={[
                'font-medium transition-colors border-b-2 pb-0.5 md:text-sm text-base',
                pathname === to
                  ? 'text-main-white border-main-red'
                  : 'text-main-white/70 border-transparent hover:text-main-white hover:border-main-red/50',
              ].join(' ')}
            >
              {label}
            </Link>
          ))}
        </nav>

        <button
          aria-label="menu"
          onClick={() => setOpen((o) => !o)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span className={['block w-6 h-0.5 bg-main-white transition-transform duration-200', open ? 'rotate-45 translate-y-2' : ''].join(' ')} />
          <span className={['block w-6 h-0.5 bg-main-white transition-opacity duration-200', open ? 'opacity-0' : ''].join(' ')} />
          <span className={['block w-6 h-0.5 bg-main-white transition-transform duration-200', open ? '-rotate-45 -translate-y-2' : ''].join(' ')} />
        </button>
      </div>
    </header>
  )
}
