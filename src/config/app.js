/**
 * Central place for everything the client may want to change.
 * No component should hard-code brand, prices or payment details.
 */

// true  -> every call in src/api/* is answered by src/api/mock.js
// false -> every call goes to VITE_API_BASE_URL via src/api/client.js
export const USE_MOCK_API = true

// Default for videos that don't set their own `blur` flag in src/data/mockData.js
export const BLUR_THUMBNAILS = true

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

export const BRAND = {
  name: 'Wowhabesha',
  logoMark: 'W',
  logoRest: 'owhabesha',
  tagline: 'Your premium destination for exclusive content.',
  subTagline: 'Stream anytime, anywhere.',
  copyright: `© ${new Date().getFullYear()} Wowhabesha. All rights reserved.`,
}

export const SUPPORT = {
  telegramUrl: 'https://t.me/wowhabesha_support', // sample
  telegramLabel: "We're here",
}

/** SAMPLE Telebirr account – replace with the client's real one. */
export const PAYMENT = {
  method: 'Telebirr',
  accountNumber: '0911000000',
  accountName: 'Wowhabesha Demo',
  currency: 'ETB',
  maxReceiptSizeMB: 5,
  acceptedTypes: ['image/jpeg', 'image/png', 'image/webp'],
}

/** Plans. `id` is what the backend will receive later. */
export const PLANS = [
  {
    id: 'monthly',
    name: 'Monthly',
    nameAm: 'ወርሃዊ',
    price: 990,
    periodAm: '/ ወር',
    features: ['HD Quality', 'Unlimited Access', 'Cancel Anytime'],
    popular: false,
  },
  {
    id: 'yearly',
    name: 'Yearly',
    nameAm: 'ዓመታዊ',
    price: 2990,
    periodAm: '/ ዓመት',
    badge: 'Save 63%',
    features: ['4K Ultra HD', 'Unlimited Access', 'Priority Support', 'No Ads'],
    popular: true,
  },
]

export const STORAGE_KEYS = {
  session: 'wowhabesha.session',
  subscription: 'wowhabesha.subscription',
  users: 'wowhabesha.users',
  likes: 'wowhabesha.likes',
}
