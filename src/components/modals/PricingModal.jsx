import Modal from '../common/Modal'
import { CheckIcon } from '../common/Icons'
import { PLANS } from '../../config/app'
import { useUI } from '../../context/UIContext'

export default function PricingModal() {
  const { closeModal, openModal } = useUI()

  return (
    <Modal title="Choose your plan" onClose={closeModal}>
      <p className="text-2xl font-bold text-center mb-2" aria-hidden="true">Choose Your Plan</p>
      <p className="text-gray-400 text-center text-sm mb-7">
        Flexible pricing for everyone. Select the perfect plan that fits your needs.
      </p>

      <div className="space-y-6">
        {PLANS.map((plan) => (
          <div key={plan.id}
            className={`relative rounded-xl p-5 bg-card border ${plan.popular ? 'border-brand' : 'border-gray-700'}`}>
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand text-xs px-4 py-1 rounded-full font-bold whitespace-nowrap">
                Most Popular
              </span>
            )}
            <h3 className="text-xl font-bold mb-2">{plan.nameAm}</h3>
            <div className="text-brand font-bold text-3xl">
              {plan.price.toLocaleString('en-US')}{' '}
              <span className="text-gray-400 text-sm font-normal">{plan.periodAm}</span>
            </div>
            {plan.badge && <p className="text-brand text-xs mt-1">{plan.badge}</p>}

            <ul className="text-gray-300 text-sm space-y-2 my-5">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2"><CheckIcon className="text-brand" /> {f}</li>
              ))}
            </ul>

            <button onClick={() => openModal('payment', { planId: plan.id })}
              className={`w-full py-2.5 rounded-lg font-bold transition ${
                plan.popular ? 'bg-brand hover:bg-brand-dark' : 'border border-gray-600 hover:bg-gray-800'
              }`}>
              Get Started
            </button>
          </div>
        ))}
      </div>
    </Modal>
  )
}
