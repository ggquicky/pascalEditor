const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, '') ?? ''

function buildUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }
  if (!path.startsWith('/')) {
    return API_BASE_URL ? `${API_BASE_URL}/${path}` : `/${path}`
  }
  return API_BASE_URL ? `${API_BASE_URL}${path}` : path
}

export async function apiFetch(path: string, init?: RequestInit): Promise<Response> {
  return fetch(buildUrl(path), init)
}

export function apiUrl(path: string): string {
  return buildUrl(path)
}
