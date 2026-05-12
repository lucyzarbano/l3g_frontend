import {Routes, Route, useLocation} from 'react-router-dom'
import Camere from './pages/Camere'
import Contatti from './pages/Contatti'
import MyNavbar from './components/MyNavbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import GalleryPage from './pages/GalleryPage'
import RoomPage from './pages/RoomPage'
import PlacesPage from './pages/PlacesPage'
import AdminApp from './admin/AdminApp'




export default function App(){
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
     <div className="app">
      {!isAdminRoute && <MyNavbar />}
      <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/camere" element={<Camere />} />
          <Route path="/contatti" element={<Contatti />} />
          <Route path="/places" element={<PlacesPage />} />
          <Route path="/galleria" element={<GalleryPage />} />
          <Route path="/room/:roomId" element={<RoomPage />} />
          <Route path="/admin/*" element={<AdminApp />} />
        </Routes>
      </div>
      {!isAdminRoute && <Footer />}
      </div>
  )
}
