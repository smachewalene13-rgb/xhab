import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { STORAGE_KEYS } from '../config/app'
import { load, save, remove } from '../utils/storage'

const AuthContext = createContext(null)

/**
 * Holds the session and the subscription state.
 * Everything is persisted in localStorage for the demo; when a real backend
 * exists, hydrate these two values from GET /me instead.
 */
export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => load(STORAGE_KEYS.session))
  // subscription: null | { status: 'pending' | 'approved', planId, submittedAt }
  const [subscription, setSubscriptionState] = useState(() => load(STORAGE_KEYS.subscription))

  const signIn = useCallback(({ token, user }) => {
    const next = { token, user }
    setSession(next)
    save(STORAGE_KEYS.session, next)
    if (token) localStorage.setItem('wowhabesha.token', token)
  }, [])

  const signOut = useCallback(() => {
    setSession(null)
    remove(STORAGE_KEYS.session)
    localStorage.removeItem('wowhabesha.token')
  }, [])

  const setSubscription = useCallback((sub) => {
    setSubscriptionState(sub)
    save(STORAGE_KEYS.subscription, sub)
  }, [])

  /** Demo helper: wipe everything so testers can run the flow again. */
  const resetDemo = useCallback(() => {
    setSession(null)
    setSubscriptionState(null)
    remove(STORAGE_KEYS.session)
    remove(STORAGE_KEYS.subscription)
    localStorage.removeItem('wowhabesha.token')
  }, [])

  const value = useMemo(
    () => ({
      user: session?.user ?? null,
      isLoggedIn: Boolean(session),
      subscription,
      hasActiveSubscription: subscription?.status === 'approved',
      signIn,
      signOut,
      setSubscription,
      resetDemo,
    }),
    [session, subscription, signIn, signOut, setSubscription, resetDemo],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
