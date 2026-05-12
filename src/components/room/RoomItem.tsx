import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faCoffee, faLocationDot, faSquareParking, faWifi } from "@fortawesome/free-solid-svg-icons";


interface PropsRoomItem{
    src: string;
    alt: string;

}


export default function RoomItem({src, alt} : PropsRoomItem){
    return (
    <div className="room_list_wrapper">
        <div className="rooms_list__item">
            
            <div className="rooms_list__item--image">
                <img src={src} alt={alt} />

                <div className="rooms_list__item--overlay">
                    <ul>    
                        <li><FontAwesomeIcon icon={faCoffee} /><span>Caffe tutte le mattine</span></li>
                        <li><FontAwesomeIcon icon={faWifi} /><span>WiFi gratuito</span></li>
                        <li><FontAwesomeIcon icon={faSquareParking} /> <span>Parcheggio Gratis</span></li>
                        <li><FontAwesomeIcon icon={faBed} /> <span>Climatizzatore no limit</span></li>
                        <li><FontAwesomeIcon icon={faLocationDot} /> <span>Posizione Strategica</span></li>
                    </ul>
                       
                </div>
                
            </div>
           

            <div className="rooms_list__item_details">
                <h3 className="t-center">Camera XXX</h3>
                <div className="separator"></div>
                
                <div className="rooms_list__item_details--description">lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam sed culpa, recusandae mollitia dolorum eum quis labore, nisi iste perferendis nam? Libero praesentium enim ut neque omnis amet provident dolorem?</div>
            </div>

        </div>
    </div>
)
}
