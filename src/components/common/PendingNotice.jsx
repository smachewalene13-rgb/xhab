import { ClockIcon } from './Icons'
import { useAuth } from '../../context/AuthContext'

/** Banner shown after a receipt was submitted and before approval. */
export default function PendingNotice() {
  const { subscription } = useAuth()
  if (subscription?.status !== 'pending') return null
  return (
    <div role="status" className="flex items-start gap-3 bg-card border border-line rounded-xl p-3 mb-5 text-sm">
      <ClockIcon className="text-brand text-lg mt-0.5 shrink-0" />
      <p className="text-gray-300">
        <span className="font-semibold text-white">Payment under review.</span>{' '}
        We'll unlock your {subscription.planId} plan as soon as the receipt is verified.
      </p>
    </div>
  )
}
