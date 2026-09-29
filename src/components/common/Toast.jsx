import { useUI } from '../../context/UIContext'
import { CheckIcon, ClockIcon } from './Icons'

export default function Toast() {
  const { toast } = useUI()
  if (!toast) return null
  const Icon = toast.tone === 'success' ? CheckIcon : ClockIcon
  return (
    <div role="status" aria-live="polite" className="fixed top-16 inset-x-0 z-[60] flex justify-center px-4 pointer-events-none">
      <div className="animate-pop-in flex items-center gap-2 bg-card border border-line rounded-full px-4 py-2 text-sm shadow-xl">
        <Icon className={toast.tone === 'success' ? 'text-green-500' : 'text-brand'} />
        {toast.message}
      </div>
    </div>
  )
}
