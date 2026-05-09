import { Navigate, Outlet } from 'react-router-dom'

export default function RouteGuard() {
  const key = sessionStorage.getItem('apiKey')
  if (!key) return <Navigate to="/admin/login" replace />
  return <Outlet />
}
