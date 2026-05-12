import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PublicPageHeader from '../components/common/PublicPageHeader'
import ContactForm from '../components/ContactForm'

const contactItems = [
  {
    title: 'Indirizzo',
    text: 'Via Conte Alaimo 3, Lentini (SR)',
    href: 'https://www.google.com/maps/search/?api=1&query=via%20Conte%20Alaimo%203%20Lentini%20SR',
    icon: faLocationDot,
    external: true,
  },
  {
    title: 'Telefono',
    text: '67676767676',
    href: 'tel:+3967676767676',
    icon: faPhone,
  },
  {
    title: 'Email',
    text: 'lucia.zarbano@gmail.com',
    href: 'mailto:lucia.zarbano@gmail.com',
    icon: faEnvelope,
  },
]

export default function Contatti() {
  return (
    <main className="page contact-page">
      <PublicPageHeader
        eyebrow="Siamo qui per aiutarti"
        title="Contattaci"
        intro="Scrivici per disponibilita, informazioni sulle camere o consigli per organizzare il tuo soggiorno a Lentini."
      />

      <section className="contact-panel">
        <div className="contact-info-card">
          <span className="contact-info-card__label">Le Tre Gemme B&B</span>
          <h2>Parliamo del tuo prossimo soggiorno</h2>
          <p>
            Ti risponderemo con tutte le informazioni utili per scegliere la camera piu adatta e vivere la Sicilia con calma.
          </p>

          <ul className="contact-list">
            {contactItems.map((item) => (
              <li key={item.title}>
                <a href={item.href} target={item.external ? '_blank' : undefined} rel={item.external ? 'noreferrer' : undefined}>
                  <FontAwesomeIcon icon={item.icon} />
                  <span>
                    <strong>{item.title}</strong>
                    {item.text}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="contact-form-card">
          <h2>Invia un messaggio</h2>
          <p>Compila il modulo e ti ricontatteremo il prima possibile.</p>
          <ContactForm />
        </div>
      </section>
    </main>
  )
}
