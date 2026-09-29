import { useAuth } from '../context/AuthContext'
import { useUI } from '../context/UIContext'

/** Shared "user pressed play" rule used by the home page and the videos page. */
export function usePlayback() {
  const { subscription, hasActiveSubscription } = useAuth()
  const { openModal, showToast } = useUI()

  return () => {
    if (hasActiveSubscription) return showToast('Playback starts here once the backend is connected.')
    if (subscription?.status === 'pending') return showToast('Your payment is being verified. Hang tight.')
    openModal('pricing')
  }
}
