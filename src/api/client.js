import { API_BASE_URL } from '../config/app'

/**
 * Thin fetch wrapper used ONLY when USE_MOCK_API is false.
 * Handles JSON, FormData (file uploads) and a shared error shape.
 */
export class ApiError extends Error {
  constructor(message, status, data) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

export async function request(path, { method = 'GET', body, headers = {} } = {}) {
  const isForm = typeof FormData !== 'undefined' && body instanceof FormData
  const token = localStorage.getItem('wowhabesha.token')

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      ...(isForm || body === undefined ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body === undefined ? undefined : isForm ? body : JSON.stringify(body),
  })

  const data = await res.json().catch(() => null)
  if (!res.ok) throw new ApiError(data?.message || `Request failed (${res.status})`, res.status, data)
  return data
}
