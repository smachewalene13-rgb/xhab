import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const UIContext = createContext(null)

/**
 * Controls which modal is open and the toast.
 * Modal names: 'login' | 'pricing' | 'payment'
 */
export function UIProvider({ children }) {
  const [modal, setModal] = useState({ name: null, payload: null })
  const [toast, setToast] = useState(null)

  const openModal = useCallback((name, payload = null) => setModal({ name, payload }), [])
  const closeModal = useCallback(() => setModal({ name: null, payload: null }), [])

  const showToast = useCallback((message, tone = 'info') => {
    const id = Date.now()
    setToast({ id, message, tone })
    setTimeout(() => setToast((t) => (t?.id === id ? null : t)), 3500)
  }, [])

  const value = useMemo(
    () => ({ modal, openModal, closeModal, toast, showToast }),
    [modal, openModal, closeModal, toast, showToast],
  )
  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUI() {
  const ctx = useContext(UIContext)
  if (!ctx) throw new Error('useUI must be used inside <UIProvider>')
  return ctx
}
