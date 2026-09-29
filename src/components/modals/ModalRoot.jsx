import { useUI } from '../../context/UIContext'
import LoginModal from './LoginModal'
import PricingModal from './PricingModal'
import PaymentModal from './PaymentModal'

const MODALS = { login: LoginModal, pricing: PricingModal, payment: PaymentModal }

/** Renders whichever modal UIContext says is open. Add new modals to MODALS. */
export default function ModalRoot() {
  const { modal } = useUI()
  const Active = MODALS[modal.name]
  // key resets modal state each time a different modal / plan opens
  return Active ? <Active key={`${modal.name}:${modal.payload?.planId ?? ''}`} /> : null
}
