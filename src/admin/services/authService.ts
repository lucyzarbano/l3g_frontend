const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api'
const TOKEN_KEY = 'admin_access_token'
export const AUTH_EXPIRED_EVENT = 'admin-auth-expired'

interface LoginResponse {
  access_token: string
  token_type: string
  expires_in: number
}

export interface LoginCredentials {
  username: string
  password: string
}

export async function login(credentials: LoginCredentials): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })

  if (!response.ok) {
    throw new Error('Credenziali non valide')
  }

  const data = (await response.json()) as LoginResponse
  localStorage.setItem(TOKEN_KEY, data.access_token)
}

export function logout(): void {
  localStorage.removeItem(TOKEN_KEY)
}

export function getAccessToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function isAuthenticated(): boolean {
  return getAccessToken() !== null
}

export function getAuthHeaders(): HeadersInit {
  const token = getAccessToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export function notifyAuthExpired(): void {
  logout()
  window.dispatchEvent(new Event(AUTH_EXPIRED_EVENT))
}

