export interface Image {
  src: string
  alt: string
}

export interface Service {
  description: string
  icon_key: string
}

export interface Room {
  id: string
  title: string
  description: string
  short_description: string
  cover_image: Image
  link: string
  rate: number
  price_base?: number | null
  capacity?: number | null
  visible_in_home: boolean
  reverse_layout: boolean
  active: boolean
  images: Image[]
  services_base: Service[]
  services_additional: Service[]
  badges: string[]
}

export interface PlaceInfoItem {
  icon_key: string
  title: string
  type: string
  description: string
}

export interface Place {
  id: string
  title: string
  details_title: string
  description: string
  cover_image: Image
  event_date?: string | null
  address?: string | null
  distance_km?: number | null
  category?: string | null
  active: boolean
  images: Image[]
  info: PlaceInfoItem[]
}

export interface AboutImage {
  src: string
  alt: string
  class_name?: string | null
}

export interface About {
  id: string
  eyebrow: string
  title: string
  description: string[]
  images: AboutImage[]
}
