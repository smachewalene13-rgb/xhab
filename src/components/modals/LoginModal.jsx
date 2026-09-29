import { useState } from 'react'
import Modal from '../common/Modal'
import { Spinner } from '../common/Icons'
import { login, register } from '../../api'
import { useAuth } from '../../context/AuthContext'
import { useUI } from '../../context/UIContext'

export default function LoginModal() {
  const { closeModal, showToast } = useUI()
  const { signIn } = useAuth()
  const [mode, setMode] = useState('login') // 'login' | 'signup'
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const isSignup = mode === 'signup'

  const switchMode = (next) => { setMode(next); setError(''); setConfirm('') }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (isSignup && password !== confirm) { setError('Passwords do not match.'); return }
    setBusy(true)
    try {
      const result = await (isSignup ? register : login)({ phone, password })
      signIn(result)
      closeModal()
      showToast(isSignup ? 'Account created. Welcome!' : 'Welcome back', 'success')
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  const field = 'w-full bg-black border border-line rounded-lg px-3 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand'
  const tab = (active) =>
    `flex-1 py-2 text-sm font-semibold rounded-md transition ${active ? 'bg-brand text-white' : 'text-gray-400 hover:text-white'}`

  return (
    <Modal title={isSignup ? 'Sign up' : 'Login'} onClose={closeModal}>
      <div role="tablist" className="flex gap-1 bg-black border border-line rounded-lg p-1 mb-6 mt-2">
        <button type="button" role="tab" aria-selected={!isSignup} className={tab(!isSignup)} onClick={() => switchMode('login')}>Login</button>
        <button type="button" role="tab" aria-selected={isSignup} className={tab(isSignup)} onClick={() => switchMode('signup')}>Sign up</button>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block text-sm text-gray-300">
          Phone number
          <input className={`${field} mt-1`} type="tel" inputMode="tel" autoComplete="tel" placeholder="09XXXXXXXX"
            value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </label>
        <label className="block text-sm text-gray-300">
          Password
          <input className={`${field} mt-1`} type="password" autoComplete={isSignup ? 'new-password' : 'current-password'} placeholder="••••••"
            value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        {isSignup && (
          <label className="block text-sm text-gray-300">
            Confirm password
            <input className={`${field} mt-1`} type="password" autoComplete="new-password" placeholder="••••••"
              value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
          </label>
        )}

        {error && <p role="alert" className="text-sm text-brand">{error}</p>}

        <button type="submit" disabled={busy}
          className="w-full flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark disabled:opacity-60 py-3 rounded-lg font-bold transition">
          {busy && <Spinner />} {busy ? 'Please wait…' : isSignup ? 'Create account' : 'Login'}
        </button>
        <p className="text-xs text-gray-500 text-center">Demo: accounts are saved in this browser only.</p>
      </form>
    </Modal>
  )
}
