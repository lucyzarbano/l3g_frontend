import { Link } from "react-router-dom";
import { useCallback } from "react";
import { rooms } from "../data/rooms";
import { useAsyncFallback } from "../hooks/useAsyncFallback";
import { contentApi } from "../services/contentApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGem, faStar as faStarSolid, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";

function renderStars(rating: number) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<FontAwesomeIcon key={i} icon={faStarSolid} className="star filled" />);
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      stars.push(<FontAwesomeIcon key={i} icon={faStarHalfAlt} className="star half" />);
    } else {
      stars.push(<FontAwesomeIcon key={i} icon={faStarSolid} className="star empty" />);
    }
  }

  return stars;
}

function getBadgeClassName(badge: string) {
  return `camera-card__badge camera-card__badge--${badge.toLowerCase().replace(/\s+/g, "-")}`;
}

export default function Rooms() {
  const loadRooms = useCallback(() => contentApi.listRooms(), []);
  const { data } = useAsyncFallback(rooms, loadRooms);
  const visibleRooms = data.filter((room) => room.visibleInHome);

  return (
    <div className="camere-grid">
      {visibleRooms.map((room) => (
        <article className="camera-card" key={room.id}>
          <Link to={`/room/${room.id}`} className="camera-card__image" aria-label={`Vedi ${room.title}`}>
            <img src={room.image.src} alt={room.image.alt} />
            {room.badges[0] && <span className={getBadgeClassName(room.badges[0])}>{room.badges[0]}</span>}
          </Link>

          <div className="camera-card__content">
            <div className="camera-card__heading">
              <span className="camera-card__gem">
                <FontAwesomeIcon icon={faGem} />
              </span>
              <h3>{room.title}</h3>
            </div>

            <div className="camera-card__rating" aria-label={`Valutazione ${room.rate} su 5`}>
              {renderStars(room.rate)}
              <span>{room.rate}/5</span>
            </div>

            <p>{room.short_description}</p>

            <ul className="camera-card__services">
              {room.services_base.slice(0, 3).map((service) => (
                <li key={service.description}>
                  <FontAwesomeIcon icon={service.icon} />
                  <span>{service.description}</span>
                </li>
              ))}
            </ul>

            <Link to={`/room/${room.id}`} className="btn btn-inverse">
              Vedi la camera
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
