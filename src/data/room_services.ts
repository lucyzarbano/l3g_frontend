import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faWater, faLocationDot, faTemperatureArrowDown, faTv, faWifi, faCity, faSink, faSquareParking } from '@fortawesome/free-solid-svg-icons';

export interface RoomServiceBase {
    description: string;
    icon: IconDefinition;
}

export const room_services_base: Record<string, RoomServiceBase[]> =
{
    ambra: [
        {
            icon: faWifi,
            description: "Wifi Gratis"
        },
        {
            icon: faCity,
            description: "Vista della città"
        },
        {
            icon: faTemperatureArrowDown,
            description: "Aria Condizionata"
        },
        {
            icon: faLocationDot,
            description: "Balcone"
        },
        {
            icon: faTv,
            description: "Tv a schermo piatto"
        },
        {
            icon: faSink,
            description: "Bagno Privato"
        }
    ]

}

export const room_services_additional: Record<string, RoomServiceBase[]> = {
    ambra: [
        {
            icon: faSquareParking,
            description: "Parcheggio Privato"
        },
        {
            icon: faWater,
            description: "5 km dal B&B"
        },
        {
            icon: faTemperatureArrowDown,
            description: "Climatizzatore"
        }

    ]
}
