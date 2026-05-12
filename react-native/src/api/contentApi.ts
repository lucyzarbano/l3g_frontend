import { apiGet } from './client'
import type { About, Place, Room } from '../types/content'

export const contentApi = {
  getAbout: () => apiGet<About>('/about'),
  listRooms: () => apiGet<Room[]>('/rooms'),
  listPlaces: () => apiGet<Place[]>('/places'),
}
