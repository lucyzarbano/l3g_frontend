import aboutImageOne from '../assets/img/chi-siamo_1.jpg'
import aboutImageTwo from '../assets/img/chi-siamo_2.jpg'

export interface AboutProps {
  title: string
  eyebrow: string
  description: string[]
  images: { src: string; alt: string; class_name: string }[]
}

export const AboutInfo: AboutProps = {
  title: 'Chi Siamo',
  eyebrow: 'Nel cuore di Lentini',
  description: [
    'Il B&B Le Tre Gemme si trova in via Conte Alaimo, nel centro storico di Lentini, in provincia di Siracusa.',
    "A pochi passi dalla struttura puoi riscoprire la bellezza, la cultura e la storia del paese, dalla chiesa di San Francesco di Paola alla chiesa madre di Sant'Alfio, preziosa testimonianza del barocco siciliano.",
    "Lentini e una base ideale per visitare la Sicilia orientale: il mare dista 10 km, Catania 25 km, Siracusa 45 km, mentre Etna, Noto e Taormina sono facilmente raggiungibili per una giornata speciale.",
    'Le Tre Gemme offre un soggiorno confortevole in un ambiente ospitale, curato e accogliente.',
  ],
  images: [
    { src: aboutImageOne, alt: 'Dettaglio accogliente del B&B Le Tre Gemme', class_name: 'img_1' },
    { src: aboutImageTwo, alt: 'Ambiente luminoso del B&B Le Tre Gemme', class_name: 'img_2' },
  ],
}
