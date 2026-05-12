import type { AboutAdmin } from '../types'
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

  return response.json() as Promise<T>
}

export const aboutRepository = {
  get: () => request<AboutAdmin>('/admin/about'),
  update: (payload: AboutAdmin) =>
    request<AboutAdmin>('/admin/about', {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),
}
