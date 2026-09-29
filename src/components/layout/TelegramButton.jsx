import { SUPPORT } from '../../config/app'
import { TelegramIcon } from '../common/Icons'

export default function TelegramButton() {
  return (
    <a href={SUPPORT.telegramUrl} target="_blank" rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-30 bg-[#2aabee] hover:bg-[#229ed9] text-white pl-3 pr-4 py-2.5 rounded-full flex items-center gap-2 shadow-lg font-medium text-sm transition">
      <TelegramIcon className="text-xl" /> {SUPPORT.telegramLabel}
    </a>
  )
}
