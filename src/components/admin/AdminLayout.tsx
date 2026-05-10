import { NavLink, Outlet, useNavigate } from 'react-router-dom'

const navLinks = [
  { to: '/admin/projects', label: 'Projects' },
  { to: '/admin/articles', label: 'Articles' },
  { to: '/admin/media', label: 'Media' },
]

export default function AdminLayout() {
  const navigate = useNavigate()

  function logout() {
    sessionStorage.removeItem('apiKey')
    navigate('/admin/login')
  }

  return (
    <div className="flex min-h-screen bg-main-black text-main-white">
      <aside className="hidden md:flex flex-col w-52 shrink-0 border-r border-white/10 px-4 py-8">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-main-red mb-8">Admin</span>
        <nav className="flex flex-col gap-1 flex-1">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                [
                  'px-3 py-2 rounded text-sm font-medium transition-colors',
                  isActive ? 'bg-main-red text-main-white' : 'text-main-white/70 hover:text-main-white hover:bg-white/5',
                ].join(' ')
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={logout}
          className="mt-auto px-3 py-2 rounded text-sm font-medium text-main-white/50 hover:text-main-white hover:bg-white/5 text-left transition-colors"
        >
          Logout
        </button>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-10 flex items-center gap-2 bg-main-black border-b border-white/10 px-4 py-3">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-main-red mr-2">Admin</span>
        {navLinks.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              [
                'px-3 py-1 rounded text-sm font-medium transition-colors',
                isActive ? 'bg-main-red text-main-white' : 'text-main-white/70 hover:text-main-white',
              ].join(' ')
            }
          >
            {label}
          </NavLink>
        ))}
        <button
          onClick={logout}
          className="ml-auto text-sm text-main-white/50 hover:text-main-white transition-colors"
        >
          Logout
        </button>
      </div>

      <main className="flex-1 px-6 py-8 md:py-8 pt-16 md:pt-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
