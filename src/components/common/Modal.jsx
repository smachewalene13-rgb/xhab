import { useEffect, useId, useRef } from 'react'
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll'
import { CloseIcon } from './Icons'

/** Shared dark dialog: Esc + backdrop click close it, focus moves inside, background scroll locks. */
export default function Modal({ title, onClose, children, dismissible = true }) {
  const titleId = useId()
  const panelRef = useRef(null)
  useLockBodyScroll()

  useEffect(() => {
    const previouslyFocused = document.activeElement
    panelRef.current?.focus()
    const onKey = (e) => { if (e.key === 'Escape' && dismissible) onClose() }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      previouslyFocused?.focus?.()
    }
  }, [onClose, dismissible])

  return (
    <div
      className="animate-fade-in fixed inset-0 z-50 bg-black/90 overflow-y-auto p-4 flex"
      onMouseDown={(e) => { if (e.target === e.currentTarget && dismissible) onClose() }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="animate-pop-in relative m-auto w-full max-w-md bg-panel border border-line rounded-2xl p-6 outline-none"
      >
        {dismissible && (
          <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 p-1 text-gray-400 hover:text-white">
            <CloseIcon className="text-xl" />
          </button>
        )}
        <h2 id={titleId} className="sr-only">{title}</h2>
        {children}
      </div>
    </div>
  )
}
