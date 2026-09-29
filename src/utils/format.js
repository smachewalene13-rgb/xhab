export const formatPrice = (amount, currency = 'ETB') =>
  `${currency} ${Number(amount).toLocaleString('en-US')}`

export const formatBytes = (bytes) => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}
