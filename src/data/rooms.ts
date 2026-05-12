import {
    faCity,
    faLocationDot,
    faSink,
    faSquareParking,
    faTemperatureArrowDown,
    faTv,
    faWater,
    faWifi,
    type IconDefinition
} from "@fortawesome/free-solid-svg-icons";

export interface RoomServiceBase {
    description: string;
    icon: IconDefinition;
}

export interface RoomProps {
    id: string;
    image: { src: string, alt: string };
    images?: { src: string, alt: string }[];
    title: string;
    description: string;
    short_description: string;
    visibleInHome: boolean;
    link: string;
    reverse: boolean;
    services_base: RoomServiceBase[];
    services_additional: RoomServiceBase[];
    badges: string[];
    rate: number;
}

export const rooms: RoomProps[] = [
    {
        id: "ambra",
        image: { src: "/src/assets/img/camera_ambra.png", alt: "Camera Ambra" },
        title: "Camera Ambra",
        description: "La Camera Ambra prende il nome dall'omonima pietra. La stanza e dotata di letto matrimoniale con la possibilita di aggiungere ulteriori posti letto. E' provvista di un comodo bagno in camera, l'ambiente e totalmente climatizzato e dotato di riscaldamenti.",
        short_description: "Spaziosa e accogliente, ideale per chi cerca comfort e tranquillita.",
        visibleInHome: true,
        link: "/room/ambra",
        reverse: true,
        services_base: [
            { icon: faWifi, description: "Wifi Gratis" },
            { icon: faCity, description: "Vista della citta" },
            { icon: faTemperatureArrowDown, description: "Aria Condizionata" },
            { icon: faLocationDot, description: "Balcone" },
            { icon: faTv, description: "Tv a schermo piatto" },
            { icon: faSink, description: "Bagno Privato" }
        ],
        services_additional: [
            { icon: faSquareParking, description: "Parcheggio Privato" },
            { icon: faWater, description: "5 km dal B&B" },
            { icon: faTemperatureArrowDown, description: "Climatizzatore" }
        ],
        badges: ["Piu comoda"],
        rate: 5
    },
    {
        id: "topazio",
        image: { src: "/src/assets/img/camera_topazio.png", alt: "Camera Topazio" },
        title: "Camera Topazio",
        description: "La Camera Topazio prende il nome dall'omonima pietra. La stanza e dotata di letto matrimoniale con la possibilita di aggiungere ulteriori posti letto. E' provvista di un comodo bagno in camera, l'ambiente e totalmente climatizzato e dotato di riscaldamenti.",
        short_description: "Confortevole e luminosa, pensata per un soggiorno pratico e rilassante.",
        visibleInHome: true,
        link: "/room/topazio",
        reverse: false,
        services_base: [
            { icon: faWifi, description: "Wifi Gratis" },
            { icon: faCity, description: "Vista della citta" },
            { icon: faTemperatureArrowDown, description: "Aria Condizionata" },
            { icon: faLocationDot, description: "Balcone" },
            { icon: faTv, description: "Tv a schermo piatto" },
            { icon: faSink, description: "Bagno Privato" }
        ],
        services_additional: [
            { icon: faSquareParking, description: "Parcheggio Privato" },
            { icon: faWater, description: "5 km dal B&B" },
            { icon: faTemperatureArrowDown, description: "Climatizzatore" }
        ],
        badges: ["Piu venduta"],
        rate: 4.5
    },
    {
        id: "zaffiro",
        image: { src: "/src/assets/img/camera_zaffiro.jpeg", alt: "Camera Zaffiro" },
        title: "Camera Zaffiro",
        description: "La Camera Zaffiro prende il nome dall'omonima pietra. La stanza e dotata di letto matrimoniale con la possibilita di aggiungere ulteriori posti letto. E' provvista di un comodo bagno in camera, l'ambiente e totalmente climatizzato e dotato di riscaldamenti.",
        short_description: "Raccolta e piacevole, con affaccio sulla citta e un'atmosfera rilassata.",
        visibleInHome: true,
        link: "/room/zaffiro",
        reverse: true,
        services_base: [
            { icon: faWifi, description: "Wifi Gratis" },
            { icon: faCity, description: "Vista della citta" },
            { icon: faTemperatureArrowDown, description: "Aria Condizionata" },
            { icon: faLocationDot, description: "Balcone" }
        ],
        services_additional: [
            { icon: faSquareParking, description: "Parcheggio Privato" },
            { icon: faWater, description: "5 km dal B&B" },
            { icon: faTemperatureArrowDown, description: "Climatizzatore" }
        ],
        badges: ["Piu consigliata"],
        rate: 3
    }
];
