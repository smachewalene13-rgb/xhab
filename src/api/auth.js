import { STORAGE_KEYS, USE_MOCK_API } from '../config/app'
import { request, ApiError } from './client'
import { delay } from './mock'
import { load, save } from '../utils/storage'

// ---- mock-only helpers: accounts live in localStorage (demo only, never do this in production) ----
const digits = (phone) => phone.replace(/\D/g, '')
const uid = () => crypto.randomUUID?.() ?? `id_${Date.now()}_${Math.random().toString(36).slice(2)}`
const getUsers = () => load(STORAGE_KEYS.users, [])
const session = (u) => ({ token: uid(), user: { id: u.id, phone: u.phone } })

/**
 * POST /auth/register  { phone, password } -> { token, user }
 * Mock: saves the account in localStorage, then signs the person in.
 */
export async function register({ phone, password }) {
  if (!USE_MOCK_API) return request('/auth/register', { method: 'POST', body: { phone, password } })

  await delay(800)
  const clean = digits(phone)
  if (clean.length < 9) throw new ApiError('Enter a valid phone number (at least 9 digits).', 400)
  if (password.length < 4) throw new ApiError('Password must be at least 4 characters.', 400)

  const users = getUsers()
  if (users.some((u) => u.phone === clean)) throw new ApiError('This phone number is already registered. Please log in.', 409)

  const user = { id: uid(), phone: clean, password }
  save(STORAGE_KEYS.users, [...users, user])
  return session(user)
}

/**
 * POST /auth/login  { phone, password } -> { token, user }
 * Mock: checks against accounts saved by register().
 */
export async function login({ phone, password }) {
  if (!USE_MOCK_API) return request('/auth/login', { method: 'POST', body: { phone, password } })

  await delay(800)
  const user = getUsers().find((u) => u.phone === digits(phone))
  if (!user) throw new ApiError('No account found for this phone number. Please sign up first.', 404)
  if (user.password !== password) throw new ApiError('Wrong password. Please try again.', 401)
  return session(user)
}
