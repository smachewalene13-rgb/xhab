import { useUI } from '../context/UIContext'
import { copyText } from '../utils/clipboard'

/** Returns a share() function: native share sheet on phones, copy-link fallback elsewhere. */
export function useShare(title = 'Wowhabesha') {
  const { showToast } = useUI()
  return async () => {
    try {
      if (navigator.share) await navigator.share({ title, url: window.location.href })
      else if (await copyText(window.location.href)) showToast('Link copied', 'success')
    } catch { /* user cancelled the share sheet */ }
  }
}
