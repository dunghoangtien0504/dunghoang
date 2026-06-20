'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  DollarSign, TrendingUp, Clock, CheckCircle, Copy, Check,
  ArrowRight, AlertCircle, Loader2,
} from 'lucide-react'

// ── Types ─────────────────────────────────────────────────────────────────────
interface Affiliate {
  name: string; ref_code: string; commission_pct: number
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
      className="p-1.5 rounded-lg hover:bg-[#EAF5EF] transition-colors text-[#3D6B4A]"
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
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
            <p className="text-sm text-[#7A8C7E]">Mình sẽ chuyển khoản trong 3-5 ngày làm việc. Kiểm tra email để biết thêm chi tiết.</p>
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

// ── Dashboard content ─────────────────────────────────────────────────────────
function Dashboard() {
  const params  = useSearchParams()
  const router  = useRouter()
  const code    = params.get('code')?.toUpperCase() ?? ''

  const [aff,     setAff]     = useState<Affiliate | null>(null)
  const [orders,  setOrders]  = useState<Order[]>([])
  const [payouts, setPayouts] = useState<Payout[]>([])
  const [loading, setLoading] = useState(true)
  const [err,     setErr]     = useState('')
  const [showPayout, setShowPayout] = useState(false)

  const SITE = typeof window !== 'undefined' ? window.location.origin : 'https://dunghoang.com'

  async function fetchStats() {
    if (!code) { setErr('Không có mã CTV trong URL.'); setLoading(false); return }
    try {
      const res  = await fetch(`/api/affiliates/stats?code=${code}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setAff(data.affiliate); setOrders(data.orders); setPayouts(data.payouts)
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : 'Không tải được dữ liệu.')
    } finally { setLoading(false) }
  }

  useEffect(() => { fetchStats() }, [code]) // eslint-disable-line

  if (loading) return (
    <div className="flex items-center justify-center py-32">
      <Loader2 className="w-8 h-8 text-[#3D6B4A] animate-spin" />
    </div>
  )

  if (err || !aff) return (
    <div className="max-w-md mx-auto py-20 text-center space-y-4">
      <AlertCircle className="w-12 h-12 text-[#C0390E] mx-auto" />
      <p className="font-bold text-[#0D2B1A]">{err || 'Không tìm thấy mã CTV'}</p>
      <button onClick={() => router.push('/cong-tac-vien')}
        className="text-sm text-[#3D6B4A] underline">Đăng ký làm CTV →</button>
    </div>
  )

  const refLink = `${SITE}/khoa-1-ban-tu-lap?ref=${aff.ref_code}`

  return (
    <div className="space-y-8">

      {/* Welcome */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-[#0D2B1A]">Xin chào, {aff.name.split(' ').slice(-1)[0]} 👋</h1>
        <p className="text-[#7A8C7E] text-sm">Mã CTV: <span className="font-mono font-bold text-[#0D2B1A]">{aff.ref_code}</span> · Tham gia: {fmtDate(aff.joined_at)}</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Đơn thành công', value: aff.total_referrals, icon: <TrendingUp className="w-4 h-4" />, color: 'text-[#2D7A4F]' },
          { label: 'Doanh thu tạo ra', value: fmt(aff.total_revenue), icon: <DollarSign className="w-4 h-4" />, color: 'text-[#3D6B4A]' },
          { label: 'Đang chờ rút', value: fmt(aff.pending_commission), icon: <Clock className="w-4 h-4" />, color: 'text-[#88860B]' },
          { label: 'Đã nhận', value: fmt(aff.paid_commission), icon: <CheckCircle className="w-4 h-4" />, color: 'text-[#2D7A4F]' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white border border-[#DDD8CB] rounded-2xl p-4 space-y-2">
            <div className={`flex items-center gap-1.5 text-xs font-medium ${kpi.color}`}>
              {kpi.icon}{kpi.label}
            </div>
            <p className="text-lg font-bold text-[#0D2B1A] leading-none">{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Link giới thiệu */}
      <div className="bg-white border border-[#DDD8CB] rounded-2xl p-5 space-y-3">
        <p className="font-semibold text-[#0D2B1A] text-sm">Link giới thiệu của bạn</p>
        <div className="flex items-center gap-2 bg-[#FAF7F2] border border-[#DDD8CB] rounded-xl px-3 py-2">
          <p className="flex-1 text-xs font-mono text-[#3D6B4A] truncate">{refLink}</p>
          <CopyBtn value={refLink} />
        </div>
        <p className="text-xs text-[#7A8C7E]">
          Gắn <code className="bg-[#EAF5EF] px-1 rounded">?ref={aff.ref_code}</code> vào bất kỳ trang nào của DungHoang.com.
          Cookie theo dõi 30 ngày.
        </p>
      </div>

      {/* Rút tiền */}
      {aff.pending_commission > 0 && (
        <div className={`rounded-2xl p-5 flex items-center justify-between gap-4 ${
          aff.pending_commission >= 500_000
            ? 'bg-[#EAF5EF] border border-[#2D7A4F]/20'
            : 'bg-[#FAF7F2] border border-[#DDD8CB]'
        }`}>
          <div>
            <p className="font-semibold text-[#0D2B1A] text-sm">Số dư chờ rút</p>
            <p className="text-2xl font-bold text-[#2D7A4F]">{fmt(aff.pending_commission)}</p>
            {aff.pending_commission < 500_000 && (
              <p className="text-xs text-[#7A8C7E] mt-0.5">Cần thêm {fmt(500_000 - aff.pending_commission)} để đủ rút</p>
            )}
          </div>
          {aff.pending_commission >= 500_000 && (
            <button onClick={() => setShowPayout(true)}
              className="flex items-center gap-1.5 h-10 px-5 bg-[#0D2B1A] hover:bg-[#1a4a2e] text-[#F6F0E4] font-bold text-sm rounded-xl transition-colors flex-shrink-0">
              Rút tiền <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Lịch sử đơn */}
      <div className="space-y-3">
        <h2 className="font-bold text-[#0D2B1A]">Đơn hàng gần đây</h2>
        {orders.length === 0 ? (
          <div className="bg-white border border-[#DDD8CB] rounded-2xl p-8 text-center text-sm text-[#7A8C7E]">
            Chưa có đơn nào. Chia sẻ link giới thiệu để bắt đầu kiếm hoa hồng.
          </div>
        ) : (
          <div className="bg-white border border-[#DDD8CB] rounded-2xl overflow-hidden">
            <div className="divide-y divide-[#DDD8CB]">
              {orders.map((o, i) => (
                <div key={i} className="px-5 py-3.5 flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#0D2B1A] truncate">{o.course_name}</p>
                    <p className="text-xs text-[#7A8C7E]">{o.order_code} · {fmtDate(o.created_at)}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className={`text-sm font-bold ${o.status === 'completed' ? 'text-[#2D7A4F]' : 'text-[#7A8C7E]'}`}>
                      {o.status === 'completed' ? `+${fmt(o.commission)}` : 'Chờ TT'}
                    </p>
                    <p className="text-xs text-[#7A8C7E]">{fmt(o.amount)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lịch sử rút */}
      {payouts.length > 0 && (
        <div className="space-y-3">
          <h2 className="font-bold text-[#0D2B1A]">Lịch sử rút tiền</h2>
          <div className="bg-white border border-[#DDD8CB] rounded-2xl overflow-hidden">
            <div className="divide-y divide-[#DDD8CB]">
              {payouts.map((p, i) => (
                <div key={i} className="px-5 py-3.5 flex items-center justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#0D2B1A]">{fmt(p.net_amount)} thực nhận</p>
                    <p className="text-xs text-[#7A8C7E]">
                      {fmtDate(p.requested_at)}
                      {p.taxable ? ` · Đã khấu trừ thuế ${fmt(p.tax_amount)}` : ''}
                    </p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    p.status === 'paid' ? 'bg-[#EAF5EF] text-[#2D7A4F]' :
                    p.status === 'approved' ? 'bg-[#EDF3FF] text-[#2B5BB8]' :
                    'bg-[#FFF8E6] text-[#7A6000]'
                  }`}>
                    {p.status === 'paid' ? 'Đã chuyển' : p.status === 'approved' ? 'Đã duyệt' : 'Đang xử lý'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showPayout && (
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

// ── Page wrapper ──────────────────────────────────────────────────────────────
export default function BaoCaoPage() {
  return (
    <div className="min-h-dvh bg-[#F6F0E4] font-sans">
      <header className="border-b border-[#DDD8CB] bg-[#F6F0E4]/90 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0D2B1A] flex items-center justify-center">
              <span className="text-[#F6F0E4] font-bold text-sm font-mono">DH</span>
            </div>
            <span className="font-bold text-[#0D2B1A] text-sm hidden sm:block">DungHoang.com</span>
          </Link>
          <Link href="/cong-tac-vien" className="text-sm text-[#3D6B4A] font-medium hover:text-[#0D2B1A]">
            Đăng ký CTV mới →
          </Link>
        </div>
      </header>
      <div className="max-w-3xl mx-auto px-4 py-10">
        <Suspense fallback={<div className="flex justify-center py-32"><Loader2 className="w-8 h-8 text-[#3D6B4A] animate-spin" /></div>}>
          <Dashboard />
        </Suspense>
      </div>
    </div>
  )
}
