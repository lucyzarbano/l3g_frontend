import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const logoUrl = 'https://www.bb-letregemme.it/sites/all/themes/theme775/logo.png'
const links = [
  { to: '/', label: 'Home' },
  { to: '/camere', label: 'Camere' },
  { to: '/places', label: 'Luoghi' },
  { to: '/galleria', label: 'Galleria' },
]

export default function MyNavbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <nav className="main-navbar" aria-label="Navigazione principale" onKeyDown={(event) => {
      if (event.key === 'Escape') setOpen(false)
    }}>
      <div className="main-navbar__inner">
        <Link to="/" className="main-navbar__logo" aria-label="Le Tre Gemme — Home" onClick={() => setOpen(false)}>
          <img src={logoUrl} alt="" />
          <span className="main-navbar__brand">Le Tre Gemme<small>B&B · Lentini</small></span>
        </Link>
        <button type="button" className="main-navbar__toggle" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>
          <span>{open ? 'Chiudi' : 'Menu'}</span>
          <span aria-hidden="true">{open ? '×' : '☰'}</span>
        </button>
        <ul id="main-navigation" className={`main-navbar__links${open ? ' is-open' : ''}`}>
          {links.map(({ to, label }) => (
            <li key={to}><NavLink to={to} end={to === '/'} onClick={() => setOpen(false)}>{label}</NavLink></li>
          ))}
          <li><NavLink to="/contatti" className="main-navbar__contact" onClick={() => setOpen(false)}>Contattaci</NavLink></li>
        </ul>
      </div>
    </nav>
  )
}
