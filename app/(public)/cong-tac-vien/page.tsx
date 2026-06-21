'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, ArrowRight, DollarSign, Users, TrendingUp, ShieldCheck } from 'lucide-react'

const COMMISSIONS = [
  { product: 'Mini — Trang Bán Hàng Làm Trong 1 Buổi', price: '686.868đ',   pct: '20%', earn: '137.374đ' },
  { product: 'Khóa 1 — 24 Skill AI (Bản Tự Lập)',      price: '868.686đ',   pct: '20%', earn: '173.737đ' },
  { product: 'Khóa 2 — Bản Có Đội Trưởng',             price: '3.868.686đ', pct: '10%', earn: '386.869đ' },
]

const SCENARIOS = [
  { label: '3 người/tháng mua Mini',     earn: '412.122đ/tháng',  detail: '3 × 137.374đ' },
  { label: '2 người/tháng mua Khóa 1',  earn: '347.474đ/tháng',  detail: '2 × 173.737đ' },
  { label: '1 người/tháng mua Khóa 2',  earn: '386.869đ/tháng',  detail: '1 × 386.869đ' },
  { label: 'Combo 3 Mini + 1 Khóa 2',   earn: '798.991đ/tháng',  detail: '412.122đ + 386.869đ' },
]

export default function CongTacVienPage() {
  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [note,    setNote]    = useState('')
  const [loading, setLoading] = useState(false)
  const [result,  setResult]  = useState<{ ref_code: string; dashboard_url: string } | null>(null)
  const [error,   setError]   = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) { setError('Bạn điền tên và email để mình tạo tài khoản nha.'); return }
    setLoading(true); setError('')
    try {
      const res  = await fetch('/api/affiliates/register', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name: name.trim(), email: email.trim(), note: note.trim() || null }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setResult(data)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Có lỗi rồi, thử lại nha.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-dvh bg-[#F6F0E4] font-sans">

      {/* Header */}
      <header className="border-b border-[#DDD8CB] bg-[#F6F0E4]/90 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0D2B1A] flex items-center justify-center">
              <span className="text-[#F6F0E4] font-bold text-sm font-mono">DH</span>
            </div>
            <span className="font-bold text-[#0D2B1A] text-sm">DungHoang.com</span>
          </Link>
          <Link href="/cong-tac-vien/bao-cao" className="text-sm text-[#3D6B4A] font-medium hover:text-[#0D2B1A]">
            Đã có mã → Xem báo cáo
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">

        {/* Hero */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#EAF5EF] text-[#2D7A4F] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#2D7A4F]/20">
            Hoa hồng 10–20% · Cookie 30 ngày · Không giới hạn số đơn
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0D2B1A] leading-tight">
            Bạn đã học xong.<br />
            <span className="text-[#3D6B4A]">Giới thiệu người khác — nhận hoa hồng.</span>
          </h1>
          <p className="text-[#3D6B4A] leading-relaxed max-w-lg mx-auto">
            Nếu bạn thấy khoá học có giá trị, chia sẻ link cho người khác. Họ mua là bạn nhận tiền tự động.
            Không cần bán. Không cần thuyết phục. Chỉ cần chia sẻ đúng chỗ.
          </p>
        </div>

        {/* Commission table */}
        <div className="bg-white border border-[#DDD8CB] rounded-3xl overflow-hidden">
          <div className="bg-[#0D2B1A] px-6 py-4">
            <p className="text-[#88860B] text-xs font-semibold uppercase tracking-wider">Bảng hoa hồng</p>
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

        {/* Earnings examples */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-[#3D6B4A] uppercase tracking-wider text-center">Ví dụ thu nhập thực tế</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {SCENARIOS.map((s, i) => (
              <div key={i} className="bg-white border border-[#DDD8CB] rounded-2xl px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#0D2B1A]">{s.label}</p>
                  <p className="text-xs text-[#7A8C7E] mt-0.5">{s.detail}</p>
                </div>
                <p className="text-sm font-black text-[#2D7A4F] flex-shrink-0 ml-3">{s.earn}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-[#7A8C7E]">Cookie theo dõi 30 ngày · Không giới hạn số người giới thiệu · Rút tối thiểu 500k</p>
        </div>

        {/* How it works */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: <Users className="w-5 h-5" />, step: '1', title: 'Đăng ký', desc: 'Điền tên + email. Mình tạo mã CTV cho bạn trong vòng vài giây.' },
            { icon: <TrendingUp className="w-5 h-5" />, step: '2', title: 'Chia sẻ link', desc: 'Gắn `?ref=MÃ_CỦA_BẠN` vào bất kỳ link nào của DungHoang.com.' },
            { icon: <DollarSign className="w-5 h-5" />, step: '3', title: 'Nhận hoa hồng', desc: 'Tự động cộng vào tài khoản sau khi đơn thanh toán xong. Rút khi đủ 500k.' },
          ].map((item, i) => (
            <div key={i} className="bg-white border border-[#DDD8CB] rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#EAF5EF] flex items-center justify-center text-[#2D7A4F]">
                  {item.icon}
                </div>
                <span className="text-xs font-bold text-[#7A8C7E] uppercase tracking-wider">Bước {item.step}</span>
              </div>
              <p className="font-bold text-[#0D2B1A]">{item.title}</p>
              <p className="text-sm text-[#3D6B4A] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Form + Result */}
        <div className="max-w-lg mx-auto">
          {result ? (
            <div className="bg-white border border-[#DDD8CB] rounded-3xl p-8 space-y-5 text-center">
              <div className="w-16 h-16 bg-[#EAF5EF] rounded-2xl flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-[#2D7A4F]" />
              </div>
              <div className="space-y-1">
                <h2 className="font-bold text-[#0D2B1A] text-xl">Xong rồi!</h2>
                <p className="text-[#3D6B4A] text-sm">Mình đã gửi email kèm hướng dẫn về hộp thư của bạn.</p>
              </div>
              <div className="bg-[#EAF5EF] rounded-2xl p-4">
                <p className="text-xs text-[#3D6B4A] mb-1">Mã CTV của bạn</p>
                <p className="text-3xl font-black font-mono text-[#0D2B1A] tracking-widest">{result.ref_code}</p>
              </div>
              <div className="bg-[#FAF7F2] border border-[#DDD8CB] rounded-xl p-3 text-left">
                <p className="text-xs text-[#7A8C7E] mb-1">Ví dụ link giới thiệu</p>
                <p className="text-xs font-mono text-[#3D6B4A] break-all">
                  https://dunghoang.com/khoa-1-ban-tu-lap?ref={result.ref_code}
                </p>
              </div>
              <Link
                href={`/cong-tac-vien/bao-cao?code=${result.ref_code}`}
                className="flex items-center justify-center gap-2 w-full h-11 bg-[#0D2B1A] hover:bg-[#1a4a2e] text-[#F6F0E4] font-semibold text-sm rounded-xl transition-colors"
              >
                Xem báo cáo của bạn <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white border border-[#DDD8CB] rounded-3xl p-8 space-y-5">
              <div className="space-y-1">
                <h2 className="font-bold text-[#0D2B1A] text-xl">Đăng ký làm cộng tác viên</h2>
                <p className="text-sm text-[#7A8C7E]">Miễn phí. Mình tạo mã cho bạn ngay.</p>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-[#3D6B4A] mb-1.5">Tên của bạn</label>
                  <input
                    value={name} onChange={e => setName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full h-11 px-4 bg-[#FAF7F2] border border-[#DDD8CB] rounded-xl text-[#0D2B1A] placeholder:text-[#AAA] focus:outline-none focus:ring-2 focus:ring-[#3D6B4A]/30 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#3D6B4A] mb-1.5">Email</label>
                  <input
                    type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="email@cua-ban.com"
                    className="w-full h-11 px-4 bg-[#FAF7F2] border border-[#DDD8CB] rounded-xl text-[#0D2B1A] placeholder:text-[#AAA] focus:outline-none focus:ring-2 focus:ring-[#3D6B4A]/30 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#3D6B4A] mb-1.5">
                    Bạn dự định chia sẻ qua kênh nào? <span className="text-[#7A8C7E] font-normal">(không bắt buộc)</span>
                  </label>
                  <input
                    value={note} onChange={e => setNote(e.target.value)}
                    placeholder="Facebook, Zalo, TikTok, blog..."
                    className="w-full h-11 px-4 bg-[#FAF7F2] border border-[#DDD8CB] rounded-xl text-[#0D2B1A] placeholder:text-[#AAA] focus:outline-none focus:ring-2 focus:ring-[#3D6B4A]/30 text-sm"
                  />
                </div>
              </div>
              {error && <p className="text-sm text-[#C0390E]">{error}</p>}
              <button
                type="submit" disabled={loading}
                className="flex items-center justify-center gap-2 w-full h-12 bg-[#C0390E] hover:bg-[#A0300B] disabled:opacity-50 text-white font-bold rounded-xl transition-all"
              >
                {loading ? 'Đang tạo...' : 'Đăng ký ngay'}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
              <p className="text-center text-xs text-[#7A8C7E] flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Cookie theo dõi 30 ngày · Rút tiền tối thiểu 500k · Thuế TNCN 10% nếu &gt;2 triệu/lần
              </p>
            </form>
          )}
        </div>

      </div>
    </div>
  )
}
