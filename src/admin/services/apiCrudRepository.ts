import type { CrudRepository } from './mockCrudRepository'
import { getAuthHeaders, notifyAuthExpired } from './authService'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
      ...options?.headers,
    },
    ...options,
  })

  if (response.status === 401) {
    notifyAuthExpired()
  }

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

export function createApiCrudRepository<T extends { id: string }>(resourcePath: string): CrudRepository<T> {
  return {
    list: () => request<T[]>(resourcePath),
    create: (payload) => request<T>(resourcePath, { method: 'POST', body: JSON.stringify(payload) }),
    update: (id, payload) => request<T>(`${resourcePath}/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
    remove: (id) => request<void>(`${resourcePath}/${id}`, { method: 'DELETE' }),
  }
}
