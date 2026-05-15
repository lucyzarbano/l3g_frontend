import {
  faCity,
  faClock,
  faLocationDot,
  faSink,
  faSquareParking,
  faTag,
  faTemperatureArrowDown,
  faTv,
  faWater,
  faWifi,
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import type { AboutProps } from '../data/about'
import type { Place } from '../data/places'
import type { RoomProps, RoomServiceBase } from '../data/rooms'
import { resolveContentImage } from './assetUrls'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api'

interface ApiImage {
  src: string
  alt: string
}

interface ApiService {
  description: string
  icon_key: string
}

interface ApiRoom {
  id: string
  title: string
  description: string
  short_description: string
  cover_image: ApiImage
  link: string
  rate: number
  price_base?: number | null
  capacity?: number | null
  visible_in_home: boolean
  reverse_layout: boolean
  active: boolean
  images: ApiImage[]
  services_base: ApiService[]
  services_additional: ApiService[]
  badges: string[]
}

interface ApiPlaceInfo {
  icon_key: string
  title: string
  type: string
  description: string
}

interface ApiPlace {
  id: string
  title: string
  details_title: string
  description: string
  cover_image: ApiImage
  event_date?: string | null
  address?: string | null
  distance_km?: number | null
  category?: string | null
  active: boolean
  images: ApiImage[]
  info: ApiPlaceInfo[]
}

interface ApiAboutImage {
  src: string
  alt: string
  class_name?: string | null
}

interface ApiAbout {
  id: string
  eyebrow: string
  title: string
  description: string[]
  images: ApiAboutImage[]
}

const icons: Record<string, IconDefinition> = {
  faCity,
  faClock,
  faLocationDot,
  faSink,
  faSquareParking,
  faTag,
  faTemperatureArrowDown,
  faTv,
  faWater,
  faWifi,
}

const iconFromKey = (iconKey: string) => icons[iconKey] ?? faTag

async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`)

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`)
  }

  return response.json() as Promise<T>
}

const mapService = (service: ApiService): RoomServiceBase => ({
  description: service.description,
  icon: iconFromKey(service.icon_key),
})

const mapImage = (image: ApiImage): ApiImage => ({
  src: resolveContentImage(image.src),
  alt: image.alt,
})

const mapRoom = (room: ApiRoom): RoomProps => ({
  id: room.id,
  image: mapImage(room.cover_image),
  images: (room.images.length > 0 ? room.images : [room.cover_image]).map(mapImage),
  title: room.title,
  description: room.description,
  short_description: room.short_description,
  visibleInHome: room.visible_in_home,
  link: room.link,
  reverse: room.reverse_layout,
  services_base: room.services_base.map(mapService),
  services_additional: room.services_additional.map(mapService),
  badges: room.badges,
  rate: Number(room.rate),
})

const mapPlace = (place: ApiPlace): Place => ({
  img: resolveContentImage(place.cover_image.src),
  alt: place.cover_image.alt,
  date: place.event_date ?? '',
  title: place.title,
  detailsTitle: place.details_title,
  description: place.description,
  images: (place.images.length > 0 ? place.images : [place.cover_image]).map(mapImage),
  info: place.info.map((item) => ({
    icon: iconFromKey(item.icon_key),
    title: item.title,
    type: item.type,
    description: item.description,
  })),
})

const mapAbout = (about: ApiAbout): AboutProps => ({
  title: about.title,
  eyebrow: about.eyebrow,
  description: about.description,
  images: about.images.map((image) => ({
    src: resolveContentImage(image.src),
    alt: image.alt,
    class_name: image.class_name ?? '',
  })),
})

export const contentApi = {
  async listRooms(): Promise<RoomProps[]> {
    const rooms = await apiGet<ApiRoom[]>('/rooms')
    return rooms.map(mapRoom)
  },

  async getRoom(roomId: string): Promise<RoomProps | undefined> {
    const room = await apiGet<ApiRoom>(`/rooms/${roomId}`)
    return mapRoom(room)
  },

  async listPlaces(): Promise<Place[]> {
    const places = await apiGet<ApiPlace[]>('/places')
    return places.map(mapPlace)
  },

  async getAbout(): Promise<AboutProps> {
    const about = await apiGet<ApiAbout>('/about')
    return mapAbout(about)
  },
}
