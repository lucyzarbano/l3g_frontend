import { Navigate, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import AdminLayout from './layout/AdminLayout'
import DashboardPage from './pages/DashboardPage'
import GalleryPage from './pages/GalleryPage'
import RoomsPage from './pages/RoomsPage'
import PlacesAdminPage from './pages/PlacesAdminPage'
import AboutAdminPage from './pages/AboutAdminPage'
import LoginPage from './pages/LoginPage'
import { AUTH_EXPIRED_EVENT, isAuthenticated } from './services/authService'

function ProtectedAdminLayout() {
  const [authenticated, setAuthenticated] = useState(isAuthenticated)

  useEffect(() => {
    const handleAuthExpired = () => setAuthenticated(false)
    window.addEventListener(AUTH_EXPIRED_EVENT, handleAuthExpired)
    return () => window.removeEventListener(AUTH_EXPIRED_EVENT, handleAuthExpired)
  }, [])

  if (!authenticated) {
    return <Navigate to="/admin/login" replace state={{ from: window.location.pathname }} />
  }

  return <AdminLayout onLogout={() => setAuthenticated(false)} />
}

export default function AdminApp() {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route element={<ProtectedAdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="camere" element={<RoomsPage />} />
        <Route path="chi-siamo" element={<AboutAdminPage />} />
        <Route path="luoghi-da-vedere" element={<PlacesAdminPage />} />
        <Route path="galleria" element={<GalleryPage />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
  )
}
