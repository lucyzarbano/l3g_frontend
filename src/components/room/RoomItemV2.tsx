import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { Button } from "antd";
import type { RoomServiceBase } from "../../data/rooms";
import { Link } from "react-router-dom";


interface PropsRoomItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  description: string;
  reverse: boolean;
  services: RoomServiceBase[];
  badges?: string[];
  rate: number;
}


export default function RoomItemV2({ id, src, alt, title, description, reverse, services, badges, rate }: PropsRoomItem) {
  return (
    <div className={`room-item ${reverse ? "reverse" : ""}`}>
      <div className="room-item__text">
        <h2>{title}</h2>
        <div className="room-item__rating">
          {renderStars(rate)} {/* esempio di rating 4.5 */}
          <span className="rating-number">{rate}/5</span>
        </div>
        <div className="separator"></div>
        <div className="room-item__text--description">
          <p>{description}</p>
        </div>

        <ul>
          {services.map((service) => (
            <li key={service.description}><FontAwesomeIcon icon={service.icon} /><span>{service.description}</span></li>
          ))}
        </ul>
        <Link to={`/room/${id}`}>
          <Button type="text" className="btn__inverse">
            Vedi Camera
          </Button>
        </Link>
      </div>
      <div className="room-item__image">
        <img src={src} alt={alt} />
        {badges?.map((badge, index) => (
          <span key={index} className={`badge badge--${badge.toLowerCase().replace(/\s+/g, '-')}`}>
            {badge}
          </span>
        ))}
      </div>
    </div>
  );
}
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
