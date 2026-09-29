import Logo from '../common/Logo'
import { ClockIcon } from '../common/Icons'
import { useAuth } from '../../context/AuthContext'
import { useUI } from '../../context/UIContext'

export default function Header() {
  const { isLoggedIn, user, signOut, subscription } = useAuth()
  const { openModal } = useUI()
  const pending = subscription?.status === 'pending'

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-black border-b border-line">
      <div className="mx-auto max-w-3xl px-4 py-3 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <button onClick={signOut} className="border border-white/80 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-white/10 transition"
              title={user?.phone}>
              Logout
            </button>
          ) : (
            <button onClick={() => openModal('login')} className="border border-white/80 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-white/10 transition">
              Login
            </button>
          )}
          {pending ? (
            <span className="flex items-center gap-1.5 bg-card border border-line text-gray-300 px-3 py-1.5 rounded-full text-sm">
              <ClockIcon className="text-brand" /> Pending
            </span>
          ) : (
            <button onClick={() => openModal('pricing')} className="bg-brand hover:bg-brand-dark px-4 py-1.5 rounded-full text-sm font-medium transition">
              Subscribe
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
