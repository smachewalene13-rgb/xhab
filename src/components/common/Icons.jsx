const base = { width: '1em', height: '1em', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }

export const CheckIcon = (p) => <svg {...base} {...p}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
export const CloseIcon = (p) => <svg {...base} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>
export const UploadIcon = (p) => <svg {...base} {...p}><path d="M12 16V4m0 0L7 9m5-5l5 5M4 20h16" /></svg>
export const HeartIcon = (p) => <svg {...base} {...p}><path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z" /></svg>
export const ShareIcon = (p) => <svg {...base} {...p}><path d="M4 12v7h16v-7M12 3v13m0-13L8 7m4-4l4 4" /></svg>
export const BellIcon = (p) => <svg {...base} {...p}><path d="M6 9a6 6 0 1112 0c0 6 2 7 2 7H4s2-1 2-7zM10 20a2 2 0 004 0" /></svg>
export const LockIcon = (p) => <svg {...base} {...p}><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 018 0v3" /></svg>
export const CopyIcon = (p) => <svg {...base} {...p}><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V6a2 2 0 012-2h9" /></svg>
export const ClockIcon = (p) => <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
export const PlayIcon = (p) => <svg {...base} fill="currentColor" stroke="none" {...p}><path d="M8 5.5v13a1 1 0 001.5.86l11-6.5a1 1 0 000-1.72l-11-6.5A1 1 0 008 5.5z" /></svg>
export const TelegramIcon = (p) => <svg {...base} fill="currentColor" stroke="none" {...p}><path d="M21.5 4.3L2.9 11.5c-1.3.5-1.2 1.2-.2 1.5l4.7 1.5 1.8 5.6c.2.6.4.8.9.8.5 0 .7-.2 1-.5l2.3-2.2 4.7 3.5c.9.5 1.5.2 1.7-.8L22.9 5.7c.3-1.3-.5-1.8-1.4-1.4zM8.6 13.9l9.5-6c.5-.3.9-.1.5.2l-7.8 7-.3 3.3-1.9-4.5z" /></svg>
export const Spinner = ({ className = '' }) => (
  <svg className={`animate-spin ${className}`} width="1em" height="1em" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity=".25" strokeWidth="3" />
    <path d="M21 12a9 9 0 00-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
)
