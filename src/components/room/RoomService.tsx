import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
    icon: IconDefinition;
    description: string;
}

export default function RoomService({icon, description}: Props) {
    return(
        <div className="room_service">
            <FontAwesomeIcon icon={icon} /> {description}
        </div>
    )
}