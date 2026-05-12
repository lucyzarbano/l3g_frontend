import type { PlaceAdmin, RoomAdmin } from '../types'
import { createApiCrudRepository } from './apiCrudRepository'

export const roomsRepository = createApiCrudRepository<RoomAdmin>('/admin/rooms')
export const placesRepository = createApiCrudRepository<PlaceAdmin>('/admin/places')
