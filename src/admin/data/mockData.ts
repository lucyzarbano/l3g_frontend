import type { PlaceAdmin, RoomAdmin } from '../types'

export const initialRooms: RoomAdmin[] = [
  {
    id: 'ambra',
    nome: 'Camera Ambra',
    descrizione: 'Camera matrimoniale luminosa con bagno privato, balcone e climatizzazione.',
    prezzoBase: 88,
    capienza: 3,
    immagineCopertina: '/src/assets/img/camera_ambra.png',
    servizi: ['Wifi', 'Bagno privato', 'Balcone', 'Aria condizionata'],
    attiva: true,
  },
  {
    id: 'topazio',
    nome: 'Camera Topazio',
    descrizione: 'Camera accogliente pensata per soggiorni brevi e weekend in Sicilia.',
    prezzoBase: 82,
    capienza: 2,
    immagineCopertina: '/src/assets/img/camera_topazio.png',
    servizi: ['Wifi', 'TV', 'Bagno privato', 'Parcheggio'],
    attiva: true,
  },
  {
    id: 'zaffiro',
    nome: 'Camera Zaffiro',
    descrizione: 'Camera con vista sulla citta, ideale per coppie e viaggiatori singoli.',
    prezzoBase: 76,
    capienza: 2,
    immagineCopertina: '/src/assets/img/camera_zaffiro.jpeg',
    servizi: ['Wifi', 'Vista citta', 'Aria condizionata'],
    attiva: false,
  },
]

export const initialPlaces: PlaceAdmin[] = [
  {
    id: 'etna',
    nome: 'Etna',
    descrizione: 'Vulcano attivo con panorami, sentieri, boschi e percorsi guidati.',
    indirizzo: 'Parco dell Etna, Catania',
    distanzaKm: 55,
    immagine: '/src/assets/img/01_ETNA.jpg',
    categoria: 'Natura',
    attivo: true,
  },
  {
    id: 'lago-lentini',
    nome: 'Lago di Lentini',
    descrizione: 'Oasi naturalistica e bacino artificiale tra i piu grandi del territorio.',
    indirizzo: 'Contrada Biviere, Lentini',
    distanzaKm: 8,
    immagine: '/src/assets/img/01_LAGO_LENTINI.jpg',
    categoria: 'Natura',
    attivo: true,
  },
  {
    id: 'chiesa-madre',
    nome: 'Chiesa Madre',
    descrizione: 'Chiesa storica dedicata a Sant Alfio, nel cuore del centro cittadino.',
    indirizzo: 'Piazza Duomo, Lentini',
    distanzaKm: 1.2,
    immagine: '/src/assets/img/01_CHIESA_MADRE.jpg',
    categoria: 'Cultura',
    attivo: true,
  },
]
