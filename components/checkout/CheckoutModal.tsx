'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { X, Copy, Check, ExternalLink, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { formatVND, PRODUCTS } from '@/lib/products'
import { trackPurchase, trackInitiateCheckout } from '@/lib/fbq'
import { getCookie } from '@/lib/cookies'

// ── Types ─────────────────────────────────────────────────────────────────────
interface OrderData {
  orderCode: string
  amount:    number
  qrUrl:     string
  product:   { name: string; price: number }
  bank:      { code: string; account: string; name: string }
}

interface Props {
  productId: string
  open:      boolean
  onClose:   () => void
  prefillEmail?: string
  prefillName?:  string
}

type Step = 'form' | 'qr' | 'paid' | 'error'

// ── Copy button ───────────────────────────────────────────────────────────────
function CopyBtn({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)
  function copy() {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={copy} className="p-1.5 rounded-lg hover:bg-[#F6F0E4] transition-colors text-[#3D6B4A]">
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
    </button>
  )
}

// ── Main Modal ────────────────────────────────────────────────────────────────
export default function CheckoutModal({ productId, open, onClose, prefillEmail = '', prefillName = '' }: Props) {
  const router                = useRouter()
  const [step, setStep]       = useState<Step>('form')
  const [name, setName]       = useState(prefillName)
  const [email, setEmail]     = useState(prefillEmail)
  const [loading, setLoading] = useState(false)
  const [err, setErr]         = useState('')
  const [order, setOrder]     = useState<OrderData | null>(null)

  // Reset khi mở lại
  useEffect(() => {
    if (open) { setStep('form'); setErr(''); setOrder(null) }
  }, [open])

  // Redirect + track Purchase khi thanh toán xong
  useEffect(() => {
    if (step !== 'paid') return
    const product = PRODUCTS[productId]
    if (product) {
      trackPurchase(product.price)
      setTimeout(() => router.push(product.successUrl), 1500)
    }
  }, [step, productId, router])

  // Poll trạng thái đơn hàng mỗi 5s
  const pollStatus = useCallback(async (code: string) => {
    let attempts = 0
    const MAX = 72 // 6 phút
    const id = setInterval(async () => {
      attempts++
      try {
        const res  = await fetch(`/api/orders/status?code=${code}`)
        const data = await res.json()
        if (data.status === 'completed') {
          clearInterval(id)
          setStep('paid')
        }
      } catch { /* ignore */ }
      if (attempts >= MAX) clearInterval(id)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) { setErr('Bạn điền tên và email để mình tạo đơn nha.'); return }
    setLoading(true); setErr('')
    try {
      const refCode = getCookie('dh_ref')
      const res  = await fetch('/api/orders/create', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ productId, name: name.trim(), email: email.trim(), refCode }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Lỗi tạo đơn')
      setOrder(data)
      setStep('qr')
      trackInitiateCheckout(data.amount)
      pollStatus(data.orderCode)
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : 'Có lỗi rồi, thử lại giúp mình nha.')
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  const TELEGRAM = process.env.NEXT_PUBLIC_SUPPORT_TELEGRAM ?? 'https://t.me/kenthoang'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#DDD8CB] px-6 py-4 flex items-center justify-between rounded-t-3xl z-10">
          <h2 className="font-bold text-[#0D2B1A] text-base">
            {step === 'paid' ? 'Thanh toán thành công 🎉' : 'Hoàn tất đơn hàng'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-[#F6F0E4] rounded-xl transition-colors">
            <X className="w-5 h-5 text-[#7A8C7E]" />
          </button>
        </div>

        <div className="p-6 space-y-5">

          {/* ── STEP: FORM ── */}
          {step === 'form' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-[#EAF5EF] border border-[#2D7A4F]/20 rounded-2xl p-4 text-sm text-[#3D6B4A] leading-relaxed">
                Điền tên + email, mình tạo mã đơn riêng cho bạn. Sau khi chuyển khoản đúng mã,
                hệ thống tự kích hoạt trong 1–2 phút.
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-[#3D6B4A] mb-1.5">Tên của bạn</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Mình gọi bạn là..."
                    className="w-full h-11 px-4 rounded-xl border border-[#DDD8CB] bg-[#FAF7F2] text-[#0D2B1A] placeholder:text-[#7A8C7E] focus:outline-none focus:border-[#3D6B4A] focus:ring-2 focus:ring-[#3D6B4A]/20 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#3D6B4A] mb-1.5">Email nhận khoá học</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="email@cuaban.com"
                    className="w-full h-11 px-4 rounded-xl border border-[#DDD8CB] bg-[#FAF7F2] text-[#0D2B1A] placeholder:text-[#7A8C7E] focus:outline-none focus:border-[#3D6B4A] focus:ring-2 focus:ring-[#3D6B4A]/20 transition-all text-sm"
                  />
                </div>
              </div>

              {err && (
                <div className="flex gap-2 items-start text-sm text-[#DC2626] bg-[#FEF2F2] border border-[#DC2626]/20 rounded-xl px-3 py-2.5">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  {err}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-[#C0390E] hover:bg-[#A0300B] text-white font-bold rounded-xl transition-all disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Đang tạo đơn...</>
                  : 'Tạo Mã Thanh Toán'
                }
              </button>
            </form>
          )}

          {/* ── STEP: QR ── */}
          {step === 'qr' && order && (
            <div className="space-y-4">
              {/* Product + amount */}
              <div className="bg-[#FAF7F2] border border-[#DDD8CB] rounded-2xl p-4 flex justify-between items-start">
                <div>
                  <p className="text-xs text-[#7A8C7E] mb-0.5">{order.product.name}</p>
                  <p className="font-bold text-[#0D2B1A] text-xl">{formatVND(order.amount)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#7A8C7E] mb-0.5">Mã đơn hàng</p>
                  <div className="flex items-center gap-1">
                    <p className="font-mono font-bold text-[#0D2B1A] text-sm">{order.orderCode}</p>
                    <CopyBtn value={order.orderCode} />
                  </div>
                </div>
              </div>

              {/* QR image */}
              <div className="flex flex-col items-center gap-3">
                <div className="bg-white border-2 border-[#DDD8CB] rounded-2xl p-3 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={order.qrUrl}
                    alt="QR thanh toán"
                    width={220}
                    height={220}
                    className="rounded-xl"
                  />
                </div>
                <p className="text-xs text-[#7A8C7E] text-center">
                  Quét bằng app ngân hàng bất kỳ — số tiền và mã đã điền sẵn
                </p>
              </div>

              {/* Bank info */}
              <div className="bg-[#FAF7F2] border border-[#DDD8CB] rounded-2xl p-4 space-y-2.5 text-sm">
                {[
                  { label: 'Ngân hàng', value: order.bank.code },
                  { label: 'Số tài khoản', value: order.bank.account },
                  { label: 'Chủ tài khoản', value: order.bank.name },
                  { label: 'Số tiền', value: formatVND(order.amount) },
                  { label: 'Nội dung CK', value: order.orderCode, copy: true, highlight: true },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-[#7A8C7E]">{row.label}</span>
                    <div className={`flex items-center gap-1 ${row.highlight ? 'font-bold text-[#C0390E]' : 'font-semibold text-[#0D2B1A]'}`}>
                      <span className="font-mono text-sm">{row.value}</span>
                      {row.copy && <CopyBtn value={row.value} />}
                    </div>
                  </div>
                ))}
              </div>

              {/* Polling indicator */}
              <div className="flex items-center gap-2 text-sm text-[#3D6B4A] bg-[#EAF5EF] border border-[#2D7A4F]/20 rounded-xl px-4 py-3">
                <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
                <span>Đang chờ xác nhận thanh toán... tự động kích hoạt sau 1–2 phút.</span>
              </div>

              {/* Support */}
              <p className="text-center text-xs text-[#7A8C7E]">
                Chuyển xong chưa thấy kích hoạt?{' '}
                <a href={TELEGRAM} target="_blank" rel="noopener noreferrer"
                   className="text-[#3D6B4A] underline font-medium inline-flex items-center gap-0.5">
                  Nhắn @kenthoang <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            </div>
          )}

          {/* ── STEP: PAID ── */}
          {step === 'paid' && (
            <div className="text-center space-y-4 py-4">
              <div className="w-16 h-16 bg-[#EAF5EF] rounded-2xl flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-[#2D7A4F]" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-[#0D2B1A] text-lg">Nhận được tiền rồi ^^</p>
                <p className="text-[#3D6B4A] text-sm leading-relaxed">
                  Mình vừa gửi email kích hoạt khoá học về <strong>{email}</strong>.
                  Kiểm tra inbox (và thư mục spam) nha.
                </p>
              </div>
              <div className="bg-[#FAF7F2] border border-[#DDD8CB] rounded-xl p-4 text-sm text-[#7A8C7E]">
                Câu hỏi gì nhắn mình qua{' '}
                <a href={TELEGRAM} target="_blank" rel="noopener noreferrer"
                   className="text-[#3D6B4A] underline font-medium">
                  @kenthoang
                </a>{' '}
                nha.
              </div>
              <button onClick={onClose}
                className="w-full h-11 bg-[#0D2B1A] hover:bg-[#1a4a2e] text-white font-semibold rounded-xl transition-colors text-sm">
                Đóng
              </button>
            </div>
          )}

          {/* ── STEP: ERROR ── */}
          {step === 'error' && (
            <div className="text-center space-y-4 py-4">
              <AlertCircle className="w-12 h-12 text-[#DC2626] mx-auto" />
              <p className="text-[#0D2B1A] font-semibold">Có lỗi rồi...</p>
              <p className="text-sm text-[#7A8C7E]">
                Nhắn mình qua{' '}
                <a href={TELEGRAM} className="text-[#3D6B4A] underline">@kenthoang</a>{' '}
                để được hỗ trợ nha.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
