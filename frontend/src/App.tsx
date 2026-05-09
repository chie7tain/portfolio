import { Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import ArticlesPage from './pages/ArticlesPage'
import ArticlePage from './pages/ArticlePage'
import MediaPage from './pages/MediaPage'
import RouteGuard from './components/admin/RouteGuard'
import AdminLayout from './components/admin/AdminLayout'
import LoginPage from './pages/admin/LoginPage'
import ProjectsAdminPage from './pages/admin/ProjectsAdminPage'
import ArticlesAdminPage from './pages/admin/ArticlesAdminPage'
import MediaAdminPage from './pages/admin/MediaAdminPage'

function AppShell() {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith('/admin')

  return (
    <div className="min-h-screen flex flex-col bg-main-black text-main-white font-sans">
      {!isAdmin && <Nav />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:id" element={<ArticlePage />} />
          <Route path="/media" element={<MediaPage />} />

          <Route path="/admin/login" element={<LoginPage />} />

          <Route path="/admin" element={<RouteGuard />}>
            <Route element={<AdminLayout />}>
              <Route path="projects" element={<ProjectsAdminPage />} />
              <Route path="articles" element={<ArticlesAdminPage />} />
              <Route path="media" element={<MediaAdminPage />} />
            </Route>
          </Route>
        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </div>
  )
}

export default function App() {
  return <AppShell />
}
