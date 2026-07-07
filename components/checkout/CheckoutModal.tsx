'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { X, Copy, Check, ExternalLink, Loader2, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react'
import { formatVND, PRODUCTS } from '@/lib/products'
import { trackPurchase, trackInitiateCheckout } from '@/lib/fbq'
import { getCookie } from '@/lib/cookies'
import { supabase } from '@/lib/supabase'

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

type Step = 'checking' | 'register' | 'register-success' | 'form' | 'qr' | 'paid' | 'error'

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
  const router = useRouter()

  // Checkout state
  const [step,    setStep]    = useState<Step>('checking')
  const [name,    setName]    = useState(prefillName)
  const [email,   setEmail]   = useState(prefillEmail)
  const [loading, setLoading] = useState(false)
  const [err,     setErr]     = useState('')
  const [order,   setOrder]   = useState<OrderData | null>(null)

  // Register state
  const [regName,     setRegName]     = useState('')
  const [regEmail,    setRegEmail]    = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [showPw,      setShowPw]      = useState(false)
  const [regLoading,  setRegLoading]  = useState(false)
  const [regErr,      setRegErr]      = useState('')
  const [regDoneEmail, setRegDoneEmail] = useState('')

  // Khi modal mở: check auth để quyết định step đầu tiên
  useEffect(() => {
    if (!open) return
    setErr(''); setOrder(null); setRegErr('')

    async function checkAuth() {
      setStep('checking')
      try {
        const { data: { user } } = await supabase!.auth.getUser()
        if (user) {
          // Đã đăng nhập → prefill từ user metadata
          setName(user.user_metadata?.name || prefillName)
          setEmail(user.email || prefillEmail)
        }
        // Guest checkout: KHÔNG bắt tạo tài khoản trước.
        // Khách điền tên + email là mua được ngay. Tài khoản khu học được
        // tạo tự động khi thanh toán thành công (webhook Sepay), kèm link
        // truy cập 1 chạm gửi qua email.
        setStep('form')
      } catch {
        setStep('form')
      }
    }
    checkAuth()
  }, [open, prefillEmail, prefillName])

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
        if (data.status === 'completed') { clearInterval(id); setStep('paid') }
      } catch { /* ignore */ }
      if (attempts >= MAX) clearInterval(id)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  // ── Đăng ký tài khoản ─────────────────────────────────────────────────────
  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    if (!regName.trim() || !regEmail.trim() || !regPassword.trim()) {
      setRegErr('Bạn điền đủ họ tên, email và mật khẩu nhé.'); return
    }
    setRegLoading(true); setRegErr('')
    try {
      const res  = await fetch('/api/auth/register', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name: regName.trim(), email: regEmail.trim(), password: regPassword }),
      })
      const data = await res.json()
      if (!res.ok) { setRegErr(data.error || 'Có lỗi rồi, thử lại nhé.'); return }
      setRegDoneEmail(regEmail.trim())
      setStep('register-success')
    } catch {
      setRegErr('Lỗi kết nối, thử lại giúp mình nhé.')
    } finally {
      setRegLoading(false)
    }
  }

  // ── Tạo đơn hàng ──────────────────────────────────────────────────────────
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

  const headerTitle = () => {
    if (step === 'register' || step === 'checking') return 'Tạo tài khoản để tiếp tục'
    if (step === 'register-success') return 'Đăng ký thành công!'
    if (step === 'paid') return 'Thanh toán thành công 🎉'
    return 'Hoàn tất đơn hàng'
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#DDD8CB] px-6 py-4 flex items-center justify-between rounded-t-3xl z-10">
          <h2 className="font-bold text-[#0D2B1A] text-base">{headerTitle()}</h2>
          <button onClick={onClose} className="p-2 hover:bg-[#F6F0E4] rounded-xl transition-colors">
            <X className="w-5 h-5 text-[#7A8C7E]" />
          </button>
        </div>

        <div className="p-6 space-y-5">

          {/* ── STEP: CHECKING ── */}
          {step === 'checking' && (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="w-6 h-6 animate-spin text-[#3D6B4A]" />
            </div>
          )}

          {/* ── STEP: REGISTER ── */}
          {step === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="bg-[#EAF5EF] border border-[#2D7A4F]/20 rounded-2xl p-4 text-sm text-[#3D6B4A] leading-relaxed">
                Tạo tài khoản miễn phí để mua khóa học và truy cập khu học viên. Chỉ mất 30 giây.
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-[#3D6B4A] mb-1.5">Họ tên</label>
                  <input
                    type="text"
                    value={regName}
                    onChange={e => setRegName(e.target.value)}
                    placeholder="Tên của bạn"
                    className="w-full h-11 px-4 rounded-xl border border-[#DDD8CB] bg-[#FAF7F2] text-[#0D2B1A] placeholder:text-[#7A8C7E] focus:outline-none focus:border-[#3D6B4A] focus:ring-2 focus:ring-[#3D6B4A]/20 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#3D6B4A] mb-1.5">Email</label>
                  <input
                    type="email"
                    value={regEmail}
                    onChange={e => setRegEmail(e.target.value)}
                    placeholder="email@cuaban.com"
                    className="w-full h-11 px-4 rounded-xl border border-[#DDD8CB] bg-[#FAF7F2] text-[#0D2B1A] placeholder:text-[#7A8C7E] focus:outline-none focus:border-[#3D6B4A] focus:ring-2 focus:ring-[#3D6B4A]/20 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#3D6B4A] mb-1.5">Mật khẩu</label>
                  <div className="relative">
                    <input
                      type={showPw ? 'text' : 'password'}
                      value={regPassword}
                      onChange={e => setRegPassword(e.target.value)}
                      placeholder="Ít nhất 6 ký tự"
                      className="w-full h-11 px-4 pr-11 rounded-xl border border-[#DDD8CB] bg-[#FAF7F2] text-[#0D2B1A] placeholder:text-[#7A8C7E] focus:outline-none focus:border-[#3D6B4A] focus:ring-2 focus:ring-[#3D6B4A]/20 transition-all text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(p => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A8C7E] hover:text-[#3D6B4A]"
                    >
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {regErr && (
                <div className="flex gap-2 items-start text-sm text-[#DC2626] bg-[#FEF2F2] border border-[#DC2626]/20 rounded-xl px-3 py-2.5">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  {regErr}
                </div>
              )}

              <button
                type="submit"
                disabled={regLoading}
                className="w-full h-12 bg-[#0D2B1A] hover:bg-[#1a4a2e] text-white font-bold rounded-xl transition-all disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {regLoading
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Đang tạo tài khoản...</>
                  : 'Tạo Tài Khoản Miễn Phí →'
                }
              </button>

              <p className="text-center text-xs text-[#7A8C7E]">
                Đã có tài khoản?{' '}
                <a href="/portal/login" className="text-[#3D6B4A] underline font-medium">
                  Đăng nhập tại đây
                </a>
              </p>
            </form>
          )}

          {/* ── STEP: REGISTER SUCCESS ── */}
          {step === 'register-success' && (
            <div className="text-center space-y-5 py-4">
              <div className="w-16 h-16 bg-[#EAF5EF] rounded-2xl flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-[#2D7A4F]" />
              </div>

              <div className="space-y-2">
                <p className="font-bold text-[#0D2B1A] text-lg">Đăng ký thành công!</p>
                <p className="text-[#3D6B4A] text-sm leading-relaxed">
                  Mình vừa gửi email kích hoạt tài khoản về{' '}
                  <strong className="text-[#0D2B1A]">{regDoneEmail}</strong>.
                </p>
              </div>

              <div className="bg-[#EAF5EF] border border-[#2D7A4F]/20 rounded-2xl p-4 text-sm text-[#3D6B4A] leading-relaxed text-left space-y-2">
                <p className="font-semibold">Bước tiếp theo:</p>
                <ol className="list-decimal list-inside space-y-1.5 text-[#3D6B4A]">
                  <li>Mở email và click link kích hoạt</li>
                  <li>Quay lại trang này và đăng nhập</li>
                  <li>Bấm mua khóa học và thanh toán</li>
                </ol>
              </div>

              <div className="bg-[#FAF7F2] border border-[#DDD8CB] rounded-xl p-3 text-xs text-[#7A8C7E]">
                Không thấy email? Kiểm tra thư mục <strong>Spam / Quảng cáo</strong>. Hoặc nhắn{' '}
                <a href={TELEGRAM} target="_blank" rel="noopener noreferrer" className="text-[#3D6B4A] underline">
                  @kenthoang
                </a>{' '}
                để được hỗ trợ.
              </div>

              <button
                onClick={onClose}
                className="w-full h-11 bg-[#0D2B1A] hover:bg-[#1a4a2e] text-white font-semibold rounded-xl transition-colors text-sm"
              >
                Đã hiểu, đóng lại
              </button>
            </div>
          )}

          {/* ── STEP: FORM ── */}
          {step === 'form' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-[#EAF5EF] border border-[#2D7A4F]/20 rounded-2xl p-4 text-sm text-[#3D6B4A] leading-relaxed">
                Điền tên + email, mình tạo mã đơn riêng cho bạn. Sau khi chuyển khoản đúng mã,
                hệ thống tự kích hoạt và gửi link vào khu học trong 1–2 phút. Không cần tạo tài khoản trước.
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

              <div className="flex flex-col items-center gap-3">
                <div className="bg-white border-2 border-[#DDD8CB] rounded-2xl p-3 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={order.qrUrl} alt="QR thanh toán" width={220} height={220} className="rounded-xl" />
                </div>
                <p className="text-xs text-[#7A8C7E] text-center">
                  Quét bằng app ngân hàng bất kỳ — số tiền và mã đã điền sẵn
                </p>
              </div>

              <div className="bg-[#FAF7F2] border border-[#DDD8CB] rounded-2xl p-4 space-y-2.5 text-sm">
                {[
                  { label: 'Ngân hàng',     value: order.bank.code },
                  { label: 'Số tài khoản',  value: order.bank.account },
                  { label: 'Chủ tài khoản', value: order.bank.name },
                  { label: 'Số tiền',       value: formatVND(order.amount) },
                  { label: 'Nội dung CK',   value: order.orderCode, copy: true, highlight: true },
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

              <div className="flex items-center gap-2 text-sm text-[#3D6B4A] bg-[#EAF5EF] border border-[#2D7A4F]/20 rounded-xl px-4 py-3">
                <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
                <span>Đang chờ xác nhận thanh toán... tự động kích hoạt sau 1–2 phút.</span>
              </div>

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
                  Mình vừa gửi email về <strong>{email}</strong> — trong đó có
                  <strong> link 1 chạm vào thẳng khu học</strong> (không cần nhớ mật khẩu).
                  Kiểm tra inbox và cả thư mục spam nha.
                </p>
              </div>
              <div className="bg-[#FAF7F2] border border-[#DDD8CB] rounded-xl p-4 text-sm text-[#7A8C7E]">
                Câu hỏi gì nhắn mình qua{' '}
                <a href={TELEGRAM} target="_blank" rel="noopener noreferrer" className="text-[#3D6B4A] underline font-medium">
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
