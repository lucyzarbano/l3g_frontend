import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faLocationDot, faClock, faTag } from '@fortawesome/free-solid-svg-icons';


export interface ImageProps {
  src: string;
  alt: string;
}

export interface Place {
  img: string;
  alt: string;
  date: string;
  title: string;
  detailsTitle: string;
  description: string;
  images: ImageProps[];
  info: { icon: IconDefinition; title: string; type: string; description: string;}[]
}

export const places: Place[] = [
  {
    img: "src/assets/img/01_CHIESA_MADRE.jpg",
    alt: "Valle dei templi",
    date: "18 Febbraio 2025",
    title: "Valle dei Templi",
    detailsTitle: "Area archeologica di Agrigento",
    description: "Uno dei luoghi archeologici piu celebri della Sicilia, perfetto per una giornata tra storia, templi dorici e paesaggi aperti.",
    images: [
      {
        src: "src/assets/img/01_VALLE_DEI_TEMPLI.jpg",
        alt: "chiesa madre"
      },
      {
        src: "src/assets/img/02_VALLE_DEI_TEMPLI.jpg",
        alt: "chiesa madre"
      }
    ],
    info: [
      { icon: faLocationDot, title: "Distanza dal B&B", type: "Chiesa", description: "5 km / 10 min a piedi" },
      { icon: faTag, title: "Tipo di Luogo", type: "Lago", description: "6 km / 12 min in auto" },
      { icon: faClock, title: "Percorrenza", type: "2 ore in auto", description: "15 km / 30 min in auto" },
    ]
  },
  {
    img: "src/assets/img/01_ETNA.jpg",
    alt: "Etna",
    date: "12 Febbraio 2025",
    title: "Scopri l'Etna",
    detailsTitle: "Etna",
    description: "L'Etna e un vulcano attivo e una delle mete piu suggestive della Sicilia orientale. Tra crateri, boschi, grotte e panorami lavici, offre scenari sempre diversi e perfetti per una giornata di esplorazione.",
    images: [
      {
        src: "src/assets/img/01_ETNA.jpg",
        alt: "chiesa madre"
      },
      {
        src: "src/assets/img/02_ETNA.jpg",
        alt: "chiesa madre"
      }
    ],
    info: [
      { icon: faLocationDot, title: "Distanza dal B&B", type: "Chiesa", description: "5 km / 10 min a piedi" },
      { icon: faTag, title: "Tipo di Luogo", type: "Lago", description: "6 km / 12 min in auto" },
      { icon: faClock, title: "Percorrenza", type: "2 ore in auto", description: "15 km / 30 min in auto" },
    ]
  },
  {
    img: "src/assets/img/01_LAGO_LENTINI.jpg",
    alt: "Lago di Lentini",
    date: "18 Febbraio 2025",
    title: "Lago di Lentini",
    detailsTitle: "Lago di Lentini",
    description: "Il lago di Lentini, conosciuto anche come Biviere, e un'oasi naturalistica ideale per chi ama paesaggi tranquilli, birdwatching e scorci aperti a pochi minuti dalla citta.",
     images: [
      {
        src: "src/assets/img/01_LAGO_LENTINI.jpg",
        alt: "chiesa madre"
      },
      {
        src: "src/assets/img/02_LAGO_LENTINI.jpg",
        alt: "chiesa madre"
      }
    ],
    info: [
      { icon: faLocationDot, title: "Distanza dal B&B", type: "Chiesa", description: "5 km / 10 min a piedi" },
      { icon: faTag, title: "Tipo di Luogo", type: "Lago", description: "6 km / 12 min in auto" },
      { icon: faClock, title: "Percorrenza", type: "2 ore in auto", description: "15 km / 30 min in auto" },
    ]
  },
  {
    img: "src/assets/img/01_CHIESA_MADRE.jpg",
    alt: "Chiesa Madre di Lentini",
    date: "18 Febbraio 2025",
    title: "Chiesa Madre",
    detailsTitle: "Chiesa di sant'Alfio",
    description: "Edificata tra il 1700 e il 1750 in stile barocco, la Chiesa Madre e uno dei luoghi simbolo del centro storico di Lentini.",
    images: [
      {
        src: "src/assets/img/01_CHIESA_MADRE.jpg",
        alt: "chiesa madre"
      },
      {
        src: "src/assets/img/02_CHIESA_MADRE.jpg",
        alt: "chiesa madre"
      }
    ],
    info: [
      { icon: faLocationDot, title: "Distanza dal B&B", type: "Chiesa", description: "5 km / 10 min a piedi" },
      { icon: faTag, title: "Tipo di Luogo", type: "Lago", description: "6 km / 12 min in auto" },
      { icon: faClock, title: "Percorrenza", type: "2 ore in auto", description: "15 km / 30 min in auto" },
    ]
  }
];
