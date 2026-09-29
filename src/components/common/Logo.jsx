import { BRAND } from '../../config/app'

export default function Logo() {
  return (
    <a href="#/" className="flex items-baseline" aria-label={BRAND.name}>
      <span className="text-brand font-extrabold text-3xl leading-none">{BRAND.logoMark}</span>
      <span className="text-white font-bold text-xl tracking-tight">{BRAND.logoRest}</span>
    </a>
  )
}
