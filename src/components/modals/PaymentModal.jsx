import { useEffect, useMemo, useState } from 'react'
import Modal from '../common/Modal'
import { CheckIcon, CopyIcon, Spinner, UploadIcon } from '../common/Icons'
import { PAYMENT, PLANS } from '../../config/app'
import { submitReceipt } from '../../api'
import { useAuth } from '../../context/AuthContext'
import { useUI } from '../../context/UIContext'
import { copyText } from '../../utils/clipboard'
import { formatBytes, formatPrice } from '../../utils/format'

export default function PaymentModal() {
  const { modal, closeModal, openModal } = useUI()
  const { setSubscription } = useAuth()
  const plan = useMemo(() => PLANS.find((p) => p.id === modal.payload?.planId) ?? PLANS[0], [modal.payload])

  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [status, setStatus] = useState('idle') // idle | submitting | success
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  // Object URL for the receipt thumbnail
  useEffect(() => {
    if (!file) { setPreview(null); return }
    const url = URL.createObjectURL(file)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  const onPick = (e) => {
    const picked = e.target.files?.[0]
    setError('')
    if (!picked) return
    if (!PAYMENT.acceptedTypes.includes(picked.type)) {
      setFile(null); setError('Please upload a screenshot (JPG, PNG or WebP).'); return
    }
    if (picked.size > PAYMENT.maxReceiptSizeMB * 1024 * 1024) {
      setFile(null); setError(`File is too large. Maximum size is ${PAYMENT.maxReceiptSizeMB} MB.`); return
    }
    setFile(picked)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!file) { setError('Please upload your payment receipt first.'); return }
    setError('')
    setStatus('submitting')
    try {
      const result = await submitReceipt({ planId: plan.id, file })
      setSubscription({ status: result.status, planId: plan.id, submittedAt: result.submittedAt })
      setStatus('success')
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
      setStatus('idle')
    }
  }

  const onCopy = async () => {
    if (await copyText(PAYMENT.accountNumber)) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    }
  }

  if (status === 'success') {
    return (
      <Modal title="Payment submitted" onClose={closeModal}>
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-green-500/15 text-green-500 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path className="animate-draw-check" d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
          </div>
          <p className="text-2xl font-bold mb-2" aria-hidden="true">Receipt submitted</p>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
            Thank you! We received your {plan.name.toLowerCase()} plan receipt and will verify it shortly.
            You'll get access as soon as it's approved.
          </p>
          <button onClick={closeModal} className="mt-7 w-full bg-brand hover:bg-brand-dark py-3 rounded-lg font-bold transition">
            Done
          </button>
        </div>
      </Modal>
    )
  }

  const busy = status === 'submitting'

  return (
    <Modal title="Complete your payment" onClose={closeModal} dismissible={!busy}>
      <p className="text-2xl font-bold text-center mb-1" aria-hidden="true">Complete Your Payment</p>
      <p className="text-brand text-center font-semibold">Plan: {plan.name}</p>
      <p className="text-gray-400 text-center text-sm mb-1">{formatPrice(plan.price, PAYMENT.currency)}</p>
      <button onClick={() => openModal('pricing')} disabled={busy}
        className="block mx-auto text-xs text-gray-500 underline underline-offset-2 mb-6 hover:text-gray-300">
        Change plan
      </button>

      <form onSubmit={onSubmit} className="bg-card rounded-xl p-4 mb-5 border border-line">
        <h3 className="font-bold mb-4 flex items-center gap-2"><UploadIcon className="text-brand" /> Upload Payment Receipt</h3>

        <label className={`relative block border-2 border-dashed rounded-xl p-6 text-center mb-4 cursor-pointer transition
          ${file ? 'border-green-600' : 'border-gray-600 hover:border-brand'}`}>
          <input type="file" accept={PAYMENT.acceptedTypes.join(',')} onChange={onPick} disabled={busy}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" aria-label="Upload payment receipt" />
          {preview ? (
            <div className="flex items-center gap-3 text-left">
              <img src={preview} alt="Receipt preview" className="w-14 h-14 rounded-md object-cover border border-line" />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-200 truncate">{file.name}</p>
                <p className="text-xs text-gray-500">{formatBytes(file.size)} · tap to replace</p>
              </div>
            </div>
          ) : (
            <>
              <UploadIcon className="text-4xl text-gray-500 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-300">Click to upload receipt</p>
              <p className="text-xs text-gray-500 mt-1">JPG, PNG or WebP · up to {PAYMENT.maxReceiptSizeMB} MB</p>
            </>
          )}
        </label>

        {error && <p role="alert" className="text-sm text-brand mb-3">{error}</p>}

        <button type="submit" disabled={busy}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-bold bg-brand-dark hover:bg-brand disabled:opacity-60 transition">
          {busy && <Spinner />} {busy ? 'Submitting…' : 'Submit Receipt'}
        </button>
      </form>

      <div className="bg-card rounded-xl p-4 border border-line">
        <h3 className="font-bold mb-2">የአከፋፈል ሁኔታ</h3>
        <p className="text-gray-400 mb-4 leading-relaxed text-xs">
          የመረጡትን የክፍያ መጠን ከታች ባለው አካውንት በማስገባት ደረሰኙን Screenshot አድርገው Upload በማድረግ Submit Receipt የሚለውን ይጫኑ
        </p>

        <div className="bg-black rounded-lg p-3 flex justify-between items-center mb-3 border border-line">
          <div>
            <p className="text-xs text-gray-500">{PAYMENT.method}:</p>
            <p className="font-mono text-lg">{PAYMENT.accountNumber}</p>
          </div>
          <button type="button" onClick={onCopy}
            className="flex items-center gap-1.5 bg-brand hover:bg-brand-dark px-3 py-2 rounded text-xs font-semibold transition">
            {copied ? <><CheckIcon /> Copied</> : <><CopyIcon /> Copy</>}
          </button>
        </div>

        <div className="bg-black rounded-lg p-3 border border-line">
          <p className="text-xs text-gray-500">Name:</p>
          <p className="text-brand font-semibold">{PAYMENT.accountName}</p>
        </div>
      </div>
    </Modal>
  )
}
