import { BRAND } from '../../config/app'
import { useAuth } from '../../context/AuthContext'

export default function Footer() {
  const { resetDemo, subscription, isLoggedIn } = useAuth()
  return (
    <footer className="mt-12 text-center text-gray-500 text-sm">
      <p>{BRAND.tagline}</p>
      <p>{BRAND.subTagline}</p>
      <p className="mt-4">{BRAND.copyright}</p>
      {(subscription || isLoggedIn) && (
        <button onClick={resetDemo} className="mt-3 text-xs text-gray-600 underline underline-offset-2 hover:text-gray-400">
          Reset demo
        </button>
      )}
    </footer>
  )
}
