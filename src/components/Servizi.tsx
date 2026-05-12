import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWifi, faCoffee, faBed, faSquareParking, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import AnimatedTitle from './common/AnimatedTitle'

const services = [
  {
    icon: faCoffee,
    title: 'Colazione genuina',
    description: 'Ogni mattina prodotti freschi e sapori locali per iniziare la giornata con calma.',
  },
  {
    icon: faWifi,
    title: 'Wi-Fi gratuito',
    description: 'Connessione inclusa in tutta la struttura, comoda per lavoro, studio o relax.',
  },
  {
    icon: faSquareParking,
    title: 'Parcheggio privato',
    description: 'Uno spazio riservato per arrivare e muoversi senza pensieri.',
  },
  {
    icon: faBed,
    title: 'Camere climatizzate',
    description: 'Ambienti curati, freschi e confortevoli in ogni stagione.',
  },
  {
    icon: faLocationDot,
    title: 'Posizione strategica',
    description: 'A pochi minuti dai principali luoghi da visitare tra Lentini e dintorni.',
  },
]

export default function Servizi() {
  return (
    <section className="servizi-section">
      <div className="servizi-content">
        <div className="servizi-column"></div>
        <div className="servizi-column second-column">
          <AnimatedTitle>I nostri servizi</AnimatedTitle>

          <ul className="servizi-list">
            {services.map((service) => (
              <li key={service.title}>
                <span className="servizi-list__icon">
                  <FontAwesomeIcon icon={service.icon} />
                </span>
                <span className="servizi-list__text">
                  <strong>{service.title}</strong>
                  {service.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
