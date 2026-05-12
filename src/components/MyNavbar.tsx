import { Link } from 'react-router-dom'

const logoUrl = 'https://www.bb-letregemme.it/sites/all/themes/theme775/logo.png'

export default function MyNavbar() {
  return (
    <nav className="main-navbar">
      <Link to="/" className="main-navbar__logo" aria-label="Le Tre Gemme home">
        <img src={logoUrl} alt="B&B Le Tre Gemme" />
      </Link>
      <h2>Le 3 Gemme</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/camere">Camere</Link></li>
        <li><Link to="/places">Luoghi</Link></li>
        <li><Link to="/galleria">Galleria</Link></li>
        <li><Link to="/contatti">Contatti</Link></li>
      </ul>
    </nav>
  )
}
