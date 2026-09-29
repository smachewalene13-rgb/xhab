import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { STORAGE_KEYS } from '../config/app'
import { load, save } from '../utils/storage'
import { useAuth } from './AuthContext'
import { useUI } from './UIContext'

const LikesContext = createContext(null)

/**
 * Likes are stored per account in localStorage: { [userId]: [videoId, ...] }.
 * You must be logged in to like. Later, replace toggleLike's body with
 * POST/DELETE /videos/:id/like and load the list from GET /me/likes.
 */
export function LikesProvider({ children }) {
  const { user, isLoggedIn } = useAuth()
  const { openModal, showToast } = useUI()
  const [all, setAll] = useState(() => load(STORAGE_KEYS.likes, {}))

  const liked = useMemo(() => new Set(user ? all[user.id] ?? [] : []), [all, user])
  const isLiked = useCallback((id) => liked.has(id), [liked])

  const toggleLike = useCallback((id) => {
    if (!isLoggedIn) {
      showToast('Log in to like videos')
      openModal('login')
      return
    }
    const mine = new Set(all[user.id] ?? [])
    if (mine.has(id)) mine.delete(id); else mine.add(id)
    const next = { ...all, [user.id]: [...mine] }
    setAll(next)
    save(STORAGE_KEYS.likes, next)
  }, [all, isLoggedIn, user, openModal, showToast])

  const value = useMemo(() => ({ isLiked, toggleLike }), [isLiked, toggleLike])
  return <LikesContext.Provider value={value}>{children}</LikesContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLikes() {
  const ctx = useContext(LikesContext)
  if (!ctx) throw new Error('useLikes must be used inside <LikesProvider>')
  return ctx
}
