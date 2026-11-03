import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

const currentYear = new Date().getFullYear()

const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'Camere', to: '/camere' },
  { label: 'Galleria', to: '/galleria' },
  { label: 'Luoghi da vedere', to: '/places' },
  { label: 'Contatti', to: '/contatti' },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-col footer-brand">
            <span className="footer-eyebrow">B&B a Lentini</span>
            <h2>Le Tre Gemme</h2>
            <p>Ospitalità, camere curate e il piacere di vivere la Sicilia con calma.</p>
            <Link className="footer-cta" to="/contatti">
              Chiedi disponibilità
            </Link>
            <a
              className="footer-reviews"
              href="https://www.booking.com/hotel/it/b-amp-b-le-tre-gemme.it.html#tab-reviews"
              target="_blank"
              rel="noopener noreferrer"
            >
              Leggi le recensioni su Booking.com <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="footer-col footer-nav" role="navigation" aria-label="Navigazione footer">
            <h2>Esplora</h2>
            <ul>
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col footer-contact">
            <h2>Contatti</h2>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Via%20Conte%20Alaimo%20162%2F166%2096016%20Lentini%20SR"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faLocationDot} />
              <span>Via Conte Alaimo, 162/166, 96016 Lentini (SR)</span>
            </a>

            <a href="tel:+393200666325">
              <FontAwesomeIcon icon={faPhone} />
              <span>320 066 6325</span>
            </a>

            <a href="mailto:lucia.zarbano@gmail.com">
              <FontAwesomeIcon icon={faEnvelope} />
              <span>lucia.zarbano@gmail.com</span>
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Le Tre Gemme B&B. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  )
}
