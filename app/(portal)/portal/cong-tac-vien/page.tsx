'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/useAuth'
import { supabase } from '@/lib/supabase'
import {
  DollarSign, TrendingUp, Clock, CheckCircle, Copy, Check,
  ArrowRight, AlertCircle, Loader2, ChevronLeft, ShieldCheck,
  Users
} from 'lucide-react'

// ── Types ─────────────────────────────────────────────────────────────────────
interface Affiliate {
  id: string; name: string; ref_code: string; commission_pct: number
  total_referrals: number; total_revenue: number
  total_commission: number; pending_commission: number; paid_commission: number
  status: string; joined_at: string
}
interface Order {
  order_code: string; email: string; course_name: string
  amount: number; commission: number; status: string
  paid_at: string | null; created_at: string
}
interface Payout {
  id: string; gross_amount: number; net_amount: number; tax_amount: number
  taxable: boolean; status: string; requested_at: string; paid_at: string | null
}

const COMMISSIONS = [
  { product: 'Mini — Trang Bán Hàng Làm Trong 1 Buổi', price: '686.868đ',   pct: '20%', earn: '137.374đ' },
  { product: 'Khóa 1 — 24 AI Agent for Business (Bản Tự Lập)', price: '868.686đ', pct: '20%', earn: '173.737đ' },
  { product: 'Khóa 2 — Bản Có Đội Trưởng',             price: '3.868.686đ', pct: '10%', earn: '386.869đ' },
]

function fmt(n: number) { return n.toLocaleString('vi-VN') + 'đ' }
function fmtDate(d: string | null) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

// ── Copy button ───────────────────────────────────────────────────────────────
function CopyBtn({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
      className="p-1.5 rounded-lg hover:bg-[#EAF5EF] transition-colors text-[#3D6B4A] flex-shrink-0"
    >
      {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
    </button>
  )
}

// ── Payout modal ──────────────────────────────────────────────────────────────
function PayoutModal({ code, pending, onClose, onDone }: {
  code: string; pending: number; onClose: () => void; onDone: () => void
}) {
  const [bank_name,    setBankName]    = useState('')
  const [bank_account, setBankAccount] = useState('')
  const [loading, setLoading] = useState(false)
  const [err,     setErr]     = useState('')
  const [done,    setDone]    = useState(false)
  const [result,  setResult]  = useState<{ gross: number; net: number; tax: number; taxable: boolean } | null>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!bank_name.trim() || !bank_account.trim()) { setErr('Điền đủ thông tin ngân hàng nha.'); return }
    setLoading(true); setErr('')
    try {
      const res  = await fetch('/api/affiliates/payout', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, bank_name: bank_name.trim(), bank_account: bank_account.trim() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setResult(data); setDone(true)
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : 'Có lỗi rồi.')
    } finally { setLoading(false) }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-md p-6 space-y-5 shadow-2xl">
        {done && result ? (
          <div className="text-center space-y-4">
            <div className="w-14 h-14 bg-[#EAF5EF] rounded-2xl flex items-center justify-center mx-auto">
              <CheckCircle className="w-7 h-7 text-[#2D7A4F]" />
            </div>
            <h3 className="font-bold text-[#0D2B1A] text-lg">Yêu cầu đã gửi!</h3>
            <div className="bg-[#FAF7F2] border border-[#DDD8CB] rounded-xl p-4 text-sm space-y-2 text-left">
              <div className="flex justify-between"><span className="text-[#7A8C7E]">Hoa hồng gộp</span><span className="font-semibold">{fmt(result.gross)}</span></div>
              {result.taxable && <div className="flex justify-between"><span className="text-[#7A8C7E]">Thuế TNCN 10%</span><span className="text-[#C0390E]">-{fmt(result.tax)}</span></div>}
              <div className="flex justify-between border-t border-[#DDD8CB] pt-2"><span className="font-bold">Thực nhận</span><span className="font-bold text-[#2D7A4F]">{fmt(result.net)}</span></div>
            </div>
            <p className="text-sm text-[#7A8C7E]">Dũng sẽ chuyển khoản trong 3-5 ngày làm việc. Kiểm tra email để biết thêm chi tiết.</p>
            <button onClick={() => { onDone(); onClose() }} className="w-full h-11 bg-[#0D2B1A] text-white font-semibold rounded-xl text-sm">Đóng</button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div>
              <h3 className="font-bold text-[#0D2B1A] text-lg">Yêu cầu rút tiền</h3>
              <p className="text-sm text-[#7A8C7E] mt-0.5">Số dư hiện tại: <span className="font-semibold text-[#0D2B1A]">{fmt(pending)}</span></p>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-[#3D6B4A] mb-1.5">Tên ngân hàng</label>
                <input value={bank_name} onChange={e => setBankName(e.target.value)}
                  placeholder="MB Bank, Vietcombank, Techcombank..."
                  className="w-full h-11 px-4 bg-[#FAF7F2] border border-[#DDD8CB] rounded-xl text-sm text-[#0D2B1A] placeholder:text-[#AAA] focus:outline-none focus:ring-2 focus:ring-[#3D6B4A]/30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#3D6B4A] mb-1.5">Số tài khoản</label>
                <input value={bank_account} onChange={e => setBankAccount(e.target.value)}
                  placeholder="0123456789"
                  className="w-full h-11 px-4 bg-[#FAF7F2] border border-[#DDD8CB] rounded-xl text-sm text-[#0D2B1A] placeholder:text-[#AAA] focus:outline-none focus:ring-2 focus:ring-[#3D6B4A]/30" />
              </div>
            </div>
            {pending >= 2_000_000 && (
              <div className="flex gap-2 bg-[#FFF8E6] border border-[#DDD8CB] rounded-xl p-3 text-xs text-[#7A6000]">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                Số tiền trên 2 triệu sẽ bị khấu trừ thuế TNCN 10% theo quy định.
              </div>
            )}
            {err && <p className="text-sm text-[#C0390E]">{err}</p>}
            <div className="flex gap-3">
              <button type="button" onClick={onClose}
                className="flex-1 h-11 border border-[#DDD8CB] text-[#3D6B4A] font-semibold rounded-xl text-sm hover:bg-[#FAF7F2]">
                Huỷ
              </button>
              <button type="submit" disabled={loading}
                className="flex-1 h-11 bg-[#C0390E] hover:bg-[#A0300B] disabled:opacity-50 text-white font-bold rounded-xl text-sm">
                {loading ? 'Đang gửi...' : 'Xác nhận rút'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default function PortalAffiliatePage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth(true) // force login

  const [aff,     setAff]     = useState<Affiliate | null>(null)
  const [orders,  setOrders]  = useState<Order[]>([])
  const [payouts, setPayouts] = useState<Payout[]>([])
  
  const [loading, setLoading] = useState(true)
  const [registering, setRegistering] = useState(false)
  const [error,   setError]   = useState('')
  const [showPayout, setShowPayout] = useState(false)

  const SITE = typeof window !== 'undefined' ? window.location.origin : 'https://dunghoang.com'

  async function fetchStats() {
    if (!user?.email) return
    setError('')
    try {
      const res = await fetch(`/api/affiliates/stats?email=${encodeURIComponent(user.email)}`)
      const data = await res.json()
      
      if (res.status === 404) {
        // Chưa đăng ký làm CTV
        setAff(null)
      } else if (!res.ok) {
        throw new Error(data.error || 'Có lỗi xảy ra khi lấy dữ liệu.')
      } else {
        setAff(data.affiliate)
        setOrders(data.orders)
        setPayouts(data.payouts)
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Không kết nối được server.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      fetchStats()
    }
  }, [user]) // eslint-disable-line

  async function handleActivate() {
    if (!user?.email) return
    setRegistering(true)
    setError('')
    
    const defaultName = user.user_metadata?.name || user.email.split('@')[0]
    
    try {
      const res = await fetch('/api/affiliates/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: defaultName,
          email: user.email,
          note: 'Đăng ký tự động qua Portal học viên'
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Kích hoạt không thành công.')
      
      // Thành công -> Tải lại stats
      await fetchStats()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Lỗi kích hoạt.')
    } finally {
      setRegistering(false)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F6F0E4]">
        <div className="w-6 h-6 border-2 border-[#1D9E75] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const refLink = aff ? `${SITE}/khoa-1-ban-tu-lap?ref=${aff.ref_code}` : ''

  return (
    <div className="min-h-screen bg-[#F6F0E4]">
      {/* Navigation */}
      <nav className="bg-[#0D2B1A] sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/portal" className="text-[#F6F0E4]/60 hover:text-[#F6F0E4] flex items-center gap-1.5 text-xs transition-colors">
            <ChevronLeft size={16} /> Quay lại Portal
          </Link>
          <span className="text-[#F6F0E4] font-black font-mono text-sm">DungHoang.com</span>
          <div className="flex items-center gap-4">
            <span className="text-[#F6F0E4]/40 text-xs hidden sm:block">{user?.email}</span>
            <a href="/portal/tai-khoan" className="text-[#F6F0E4]/60 hover:text-[#F6F0E4] text-xs transition-colors">
              Tài khoản
            </a>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl mb-6 text-sm flex gap-2 items-center">
            <AlertCircle size={16} className="flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {!aff ? (
          /* GIAO DIỆN CHƯA ĐĂNG KÝ (MARKETING + ONE-CLICK ACTIVATE) */
          <div className="space-y-8">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-[#EAF5EF] text-[#2D7A4F] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#2D7A4F]/20">
                Chương trình Cộng tác viên học viên
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#0D2B1A] leading-tight">
                Giới thiệu khóa học — Nhận hoa hồng 10–20%
              </h1>
              <p className="text-[#3D6B4A] text-sm leading-relaxed max-w-lg mx-auto">
                Nếu bạn thấy các khoá học của Dũng Hoàng có giá trị, hãy chia sẻ link giới thiệu cho bạn bè, đồng nghiệp. Họ đăng ký học là bạn nhận hoa hồng tự động.
              </p>
            </div>

            {/* Bảng hoa hồng */}
            <div className="bg-white border border-[#DDD8CB] rounded-3xl overflow-hidden shadow-sm">
              <div className="bg-[#0D2B1A] px-6 py-4">
                <p className="text-[#88860B] text-xs font-semibold uppercase tracking-wider">Bảng hoa hồng giới thiệu</p>
              </div>
              <div className="divide-y divide-[#DDD8CB]">
                {COMMISSIONS.map((c, i) => (
                  <div key={i} className="px-6 py-4 flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#0D2B1A] text-sm truncate">{c.product}</p>
                      <p className="text-xs text-[#7A8C7E]">Giá bán: {c.price}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-bold text-[#2D7A4F] text-lg">{c.earn}</p>
                      <p className="text-xs text-[#7A8C7E]">{c.pct} / đơn</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* How it works */}
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: <Users className="w-5 h-5" />, step: '1', title: 'Kích hoạt ngay', desc: 'Một nhấp chuột duy nhất. Hệ thống tạo mã CTV tự động cho bạn.' },
                { icon: <TrendingUp className="w-5 h-5" />, step: '2', title: 'Chia sẻ link', desc: 'Copy link chứa mã của bạn và chia sẻ bất cứ đâu.' },
                { icon: <DollarSign className="w-5 h-5" />, step: '3', title: 'Nhận hoa hồng', desc: 'Tiền tự động cộng vào ví khi khách thanh toán thành công. Rút về ngân hàng từ 500k.' },
              ].map((item, i) => (
                <div key={i} className="bg-white border border-[#DDD8CB] rounded-2xl p-5 space-y-3 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#EAF5EF] flex items-center justify-center text-[#2D7A4F]">
                      {item.icon}
                    </div>
                    <span className="text-xs font-bold text-[#7A8C7E] uppercase tracking-wider">Bước {item.step}</span>
                  </div>
                  <p className="font-bold text-[#0D2B1A] text-sm">{item.title}</p>
                  <p className="text-xs text-[#3D6B4A] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Action panel */}
            <div className="max-w-md mx-auto bg-white border border-[#DDD8CB] rounded-3xl p-6 text-center space-y-4 shadow-sm">
              <div>
                <p className="font-bold text-[#0D2B1A] text-base">Kích hoạt tài khoản</p>
                <p className="text-xs text-[#7A8C7E] mt-1">Đăng ký bằng thông tin email: <strong>{user?.email}</strong></p>
              </div>
              <button
                onClick={handleActivate} disabled={registering}
                className="flex items-center justify-center gap-2 w-full h-12 bg-[#C0390E] hover:bg-[#A0300B] disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-sm"
              >
                {registering ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Đang kích hoạt...
                  </>
                ) : (
                  <>
                    Kích hoạt tài khoản CTV ngay <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
              <p className="text-xs text-[#7A8C7E] flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Cookie theo dõi 30 ngày · Rút tiền tối thiểu 500k
              </p>
            </div>
          </div>
        ) : (
          /* GIAO DIỆN ĐÃ ĐĂNG KÝ (DASHBOARD THỐNG KÊ) */
          <div className="space-y-8">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-[#0D2B1A]">Chào bạn, {aff.name.split(' ').slice(-1)[0]} 👋</h1>
              <p className="text-[#7A8C7E] text-xs">Mã CTV: <span className="font-mono font-bold text-[#0D2B1A]">{aff.ref_code}</span> · Bắt đầu: {fmtDate(aff.joined_at)}</p>
            </div>

            {/* KPI cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Đơn thành công', value: aff.total_referrals, icon: <TrendingUp className="w-4 h-4" />, color: 'text-[#2D7A4F]' },
                { label: 'Doanh thu tạo ra', value: fmt(aff.total_revenue), icon: <DollarSign className="w-4 h-4" />, color: 'text-[#3D6B4A]' },
                { label: 'Đang chờ rút', value: fmt(aff.pending_commission), icon: <Clock className="w-4 h-4" />, color: 'text-[#88860B]' },
                { label: 'Đã nhận', value: fmt(aff.paid_commission), icon: <CheckCircle className="w-4 h-4" />, color: 'text-[#2D7A4F]' },
              ].map((kpi, i) => (
                <div key={i} className="bg-white border border-[#DDD8CB] rounded-2xl p-4 space-y-1 shadow-sm">
                  <div className={`flex items-center gap-1 text-xs font-semibold ${kpi.color}`}>
                    {kpi.icon}{kpi.label}
                  </div>
                  <p className="text-lg font-black text-[#0D2B1A] leading-none mt-1">{kpi.value}</p>
                </div>
              ))}
            </div>

            {/* Link giới thiệu */}
            <div className="bg-white border border-[#DDD8CB] rounded-2xl p-5 space-y-3 shadow-sm">
              <p className="font-bold text-[#0D2B1A] text-sm">Link giới thiệu cá nhân</p>
              <div className="flex items-center gap-2 bg-[#FAF7F2] border border-[#DDD8CB] rounded-xl px-3 py-1.5">
                <p className="flex-1 text-xs font-mono text-[#3D6B4A] truncate">{refLink}</p>
                <CopyBtn value={refLink} />
              </div>
              <p className="text-xs text-[#7A8C7E]">
                Chia sẻ link này cho người khác. Bạn cũng có thể gắn <code className="bg-[#EAF5EF] px-1 rounded font-bold font-mono">?ref={aff.ref_code}</code> vào bất kỳ trang con nào của DungHoang.com. Cookie theo dõi tự động 30 ngày.
              </p>
            </div>

            {/* Rút tiền */}
            {aff.pending_commission > 0 && (
              <div className={`rounded-2xl p-5 flex items-center justify-between gap-4 shadow-sm ${
                aff.pending_commission >= 500_000
                  ? 'bg-[#EAF5EF] border border-[#2D7A4F]/20'
                  : 'bg-[#FAF7F2] border border-[#DDD8CB]'
              }`}>
                <div>
                  <p className="font-semibold text-[#0D2B1A] text-sm">Số dư chờ rút</p>
                  <p className="text-2xl font-black text-[#2D7A4F]">{fmt(aff.pending_commission)}</p>
                  {aff.pending_commission < 500_000 && (
                    <p className="text-xs text-[#7A8C7E] mt-0.5">Cần thêm {fmt(500_000 - aff.pending_commission)} để đạt mức rút tối thiểu</p>
                  )}
                </div>
                {aff.pending_commission >= 500_000 && (
                  <button onClick={() => setShowPayout(true)}
                    className="flex items-center gap-1.5 h-10 px-5 bg-[#0D2B1A] hover:bg-[#1a4a2e] text-[#F6F0E4] font-bold text-sm rounded-xl transition-colors flex-shrink-0 shadow-sm">
                    Rút tiền <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}

            {/* Lịch sử đơn hàng */}
            <div className="space-y-3">
              <h2 className="font-bold text-[#0D2B1A] text-base">Đơn hàng giới thiệu gần đây</h2>
              {orders.length === 0 ? (
                <div className="bg-white border border-[#DDD8CB] rounded-2xl p-8 text-center text-xs text-[#7A8C7E] shadow-sm">
                  Chưa ghi nhận đơn hàng nào. Hãy chia sẻ link của bạn để bắt đầu tích lũy hoa hồng.
                </div>
              ) : (
                <div className="bg-white border border-[#DDD8CB] rounded-2xl overflow-hidden shadow-sm">
                  <div className="divide-y divide-[#DDD8CB]">
                    {orders.map((o, i) => (
                      <div key={i} className="px-5 py-3.5 flex items-center justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-[#0D2B1A] truncate">{o.course_name}</p>
                          <p className="text-[10px] text-[#7A8C7E] mt-0.5">{o.order_code} · {fmtDate(o.created_at)}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className={`text-xs font-black ${o.status === 'completed' ? 'text-[#2D7A4F]' : 'text-[#7A8C7E]'}`}>
                            {o.status === 'completed' ? `+${fmt(o.commission)}` : 'Đang xử lý'}
                          </p>
                          <p className="text-[10px] text-[#7A8C7E] mt-0.5">{fmt(o.amount)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Lịch sử rút tiền */}
            {payouts.length > 0 && (
              <div className="space-y-3">
                <h2 className="font-bold text-[#0D2B1A] text-base">Lịch sử rút tiền</h2>
                <div className="bg-white border border-[#DDD8CB] rounded-2xl overflow-hidden shadow-sm">
                  <div className="divide-y divide-[#DDD8CB]">
                    {payouts.map((p, i) => (
                      <div key={i} className="px-5 py-3.5 flex items-center justify-between gap-3">
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-[#0D2B1A]">{fmt(p.net_amount)} thực nhận</p>
                          <p className="text-[10px] text-[#7A8C7E] mt-0.5">
                            Yêu cầu ngày {fmtDate(p.requested_at)}
                            {p.taxable ? ` · Khấu trừ thuế TNCN 10% (${fmt(p.tax_amount)})` : ''}
                          </p>
                        </div>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                          p.status === 'paid' ? 'bg-[#EAF5EF] text-[#2D7A4F]' :
                          p.status === 'approved' ? 'bg-[#EDF3FF] text-[#2B5BB8]' :
                          'bg-[#FFF8E6] text-[#7A6000]'
                        }`}>
                          {p.status === 'paid' ? 'Đã nhận' : p.status === 'approved' ? 'Đã duyệt' : 'Đang xử lý'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {showPayout && aff && (
        <PayoutModal
          code={aff.ref_code}
          pending={aff.pending_commission}
          onClose={() => setShowPayout(false)}
          onDone={fetchStats}
        />
      )}
    </div>
  )
}
