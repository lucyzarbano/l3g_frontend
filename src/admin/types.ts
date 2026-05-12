export interface RoomAdmin {
  id: string
  nome: string
  descrizione: string
  prezzoBase: number
  capienza: number
  immagineCopertina: string
  servizi: string[]
  attiva: boolean
}

export interface PlaceAdmin {
  id: string
  nome: string
  descrizione: string
  indirizzo: string
  distanzaKm: number
  immagine: string
  categoria: string
  attivo: boolean
}

export interface AboutImageAdmin {
  src: string
  alt: string
  className?: string
}

export interface AboutAdmin {
  id: string
  eyebrow: string
  title: string
  paragraphs: string[]
  images: AboutImageAdmin[]
}
