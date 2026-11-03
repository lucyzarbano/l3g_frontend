import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWifi, faCoffee, faSnowflake, faSquareParking, faLocationDot } from '@fortawesome/free-solid-svg-icons'


const services = [
  {
    icon: faCoffee,
    title: 'Colazione genuina',
    description: 'Prodotti freschi e sapori locali per iniziare la giornata.',
  },
  {
    icon: faWifi,
    title: 'Wi-Fi gratuito',
    description: 'Connessione inclusa in tutta la struttura.',
  },
  {
    icon: faSquareParking,
    title: 'Parcheggio privato',
    description: 'Uno spazio riservato per arrivare senza pensieri.',
  },
  {
    icon: faSnowflake,
    title: 'Camere climatizzate',
    description: 'Il comfort della temperatura giusta, in ogni stagione.',
  },
  {
    icon: faLocationDot,
    title: 'Posizione strategica',
    description: 'Un punto di partenza per scoprire Lentini e i dintorni.',
  },
]

export default function Servizi() {
  return (
    <section className="servizi-section">
      <div className="servizi-content">
        <div className="servizi-column"></div>
        <div className="servizi-column second-column">
          <span className="servizi-eyebrow">Il piacere di sentirsi a proprio agio</span>
          <h2>I nostri servizi</h2>

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
