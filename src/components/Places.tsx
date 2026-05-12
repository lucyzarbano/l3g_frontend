import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMountain, faWater, faLocationDot, faChurch } from '@fortawesome/free-solid-svg-icons';
import { useCallback } from 'react';
import { places } from '../data/places';
import { useAsyncFallback } from '../hooks/useAsyncFallback';
import { contentApi } from '../services/contentApi';
import AnimatedTitle from './common/AnimatedTitle';
import { truncate } from '../utils/text';

export default function Places(){
    const loadPlaces = useCallback(() => contentApi.listPlaces(), [])
    const { data } = useAsyncFallback(places, loadPlaces)


    return(
         <div className="place-container">
            <div className="place-header">
                <AnimatedTitle>Luoghi da vedere</AnimatedTitle>
                
                <h3 className="place-subtitle">Scopri i luoghi da visitare nei pressi del nostro B&B</h3>
            </div>
            <div className="card-container">
          
            {data.slice(1).map((place, index) => (
                <div key={index} className="card">
                    <figure>
                        <img src={place.img} alt={place.alt} />
                        <figcaption>
                          <h3>{place.title}</h3>
                          <span>{place.detailsTitle}</span>
                        </figcaption>
                    </figure>
                    <div className="card-details">
                        <h2>{place.detailsTitle}</h2>
                        <p>{truncate(place.description)}</p>
                        <div className="card-info">
                            {place.info.map((item, j) => (
                                <div key={j} className="info-item">
                                    <FontAwesomeIcon icon={item.icon} />
                                    <span>{item.description}</span>
                                </div>
                            ))}
                            {/*<button className="btn-detail">Vedi Dettagli</button>*/}
                            
                        </div>
                    </div>
                </div>
            ))}
            </div>
            <div className="btn-wrapped-center">
              <button className="btn btn__large btn__inverse"> Vedi tutti i luoghi </button>
            </div>
         </div>
    )
}




export function PlaceOLD() {
  return (
    <div className="place-container">
      <div className="place-header">
        <h1 className="place-title">LUOGHI DA VEDERE</h1>
        <h3 className="place-subtitle">Scopri i luoghi da visitare nei pressi del nostro B&B</h3>
      </div>
      <div className="card-container">
        
        <div className="card">
          <figure>
            <img src="src/assets/img/01_ETNA.jpg" alt="Etna" />
            <figcaption>
              <span className="date">12 Febbraio 2025</span>
              <h3>Scopri l'Etna</h3>
            </figcaption>
          </figure>
          <div className="card-details">
            <h2>Titolo Card</h2>
            <p>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum </p>
            <div className="card-info">
               <div className="info-item">
                    <FontAwesomeIcon icon={faLocationDot} />
                    <span className="text">5 km dal B&B</span>
                </div>
                <div className="info-item">
                    <FontAwesomeIcon icon={faMountain} />
                    <span className="text">Montagna</span>
                </div>
                <button className="btn-detail">Vedi dettaglio</button>
            </div>
          </div>
        </div>

        <div className="card">
          <figure>
            <img src="src/assets/img/02_LAGO_LENTINI.jpg" alt="Valle dei Templi" />
            <figcaption>
              <span className="date">18 Febbraio 2025</span>
              <h3>Valle dei Templi</h3>
            </figcaption>
          </figure>
          <div className="card-details">
            <h2>Titolo Card</h2>
            <p>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum </p>
            <div className="card-info">
               <div className="info-item">
                    <FontAwesomeIcon icon={faLocationDot} />
                    <span className="text">5 km dal B&B</span>
                </div>
                <div className="info-item">
                    <FontAwesomeIcon icon={faWater} />
                    <span className="text">Lago</span>
                </div>
                <button className="btn-detail">Vedi dettaglio</button>
            </div>
          </div>
        </div>
        <div className="card">
          <figure>
            <img src="src/assets/img/03_CHIESA_MADRE.jpg" alt="Chiesa Madre Lentini" />
            <figcaption>
              <span className="date">28 Febbraio 2025</span>
              <h3>Le Spiagge Siciliane</h3>
            </figcaption>
          </figure>
          <div className="card-details">
            <h2>Titolo Card</h2>
            <p>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum </p>
            <div className="card-info">
               <div className="info-item">
                    <FontAwesomeIcon icon={faLocationDot} />
                    <span className="text">5 km dal B&B</span>
                </div>
                <div className="info-item">
                   <FontAwesomeIcon icon={faChurch} />
                    <span className="text">Chiesa</span>
                </div>
                <button className="btn-detail">Vedi dettaglio</button>
            </div>
          </div>
         
        </div>

      </div>
    </div>
  );
}
