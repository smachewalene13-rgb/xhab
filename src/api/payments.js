import { USE_MOCK_API } from '../config/app'
import { request } from './client'
import { delay, fakeId } from './mock'

/**
 * POST /payments/receipts  (multipart/form-data)
 *   planId:  'monthly' | 'yearly'
 *   receipt: image file
 * -> { id, status: 'pending', planId, submittedAt }
 *
 * Admin later verifies the receipt and flips status to 'approved'.
 */
export async function submitReceipt({ planId, file }) {
  if (USE_MOCK_API) {
    await delay(1500)
    return { id: fakeId('rcpt'), status: 'pending', planId, fileName: file.name, submittedAt: new Date().toISOString() }
  }
  const form = new FormData()
  form.append('planId', planId)
  form.append('receipt', file)
  return request('/payments/receipts', { method: 'POST', body: form })
}
