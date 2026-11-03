import aboutImageOne from '../assets/img/optimized/chi-siamo_1.jpg'
import aboutImageTwo from '../assets/img/optimized/chi-siamo_2.jpg'

export interface AboutProps {
  title: string
  eyebrow: string
  description: string[]
  images: { src: string; alt: string; class_name: string }[]
}

export const AboutInfo: AboutProps = {
  title: 'Il tuo soggiorno nel cuore di Lentini',
  eyebrow: 'Benvenuti alle Tre Gemme',
  description: [
    'Nel centro storico di Lentini, in via Conte Alaimo, Le Tre Gemme ti accoglie in ambienti curati, dove ritrovare la calma dopo una giornata alla scoperta della Sicilia.',
    'Tra una passeggiata per le vie del centro e una nuova meta da esplorare, il nostro B&B è il punto da cui partire e a cui tornare per sentirti a tuo agio.',
  ],
  images: [
    { src: aboutImageOne, alt: 'Dettaglio accogliente del B&B Le Tre Gemme', class_name: 'img_1' },
    { src: aboutImageTwo, alt: 'Ambiente luminoso del B&B Le Tre Gemme', class_name: 'img_2' },
  ],
}
