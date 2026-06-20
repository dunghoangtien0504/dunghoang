'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, Clock, ChevronRight, Star, ArrowRight, Lock } from 'lucide-react'
import { trackLead } from '@/lib/fbq'

// ── Data ─────────────────────────────────────────────────────────────────────
const DAYS = [
  { day: 1, time: '15 phút', title: 'Nạp giọng bạn vào AI',           desc: 'Điền file BRAND_DNA. Làm một lần, AI nhớ mãi, không cần giải thích lại.' },
  { day: 2, time: '20 phút', title: 'Bài Facebook đầu tiên AI viết',    desc: 'AI viết hoàn toàn theo đúng giọng bạn. Đọc xong tự hỏi "ủa sao nó giống mình vậy?"' },
  { day: 3, time: '10 phút', title: '10 tiêu đề thu hút khách',         desc: 'AI tạo 10 tiêu đề cho sản phẩm bạn đang bán. Tặng thêm kho 489 tiêu đề mẫu.' },
  { day: 4, time: '5 phút',  title: 'Caption ảnh sản phẩm',             desc: 'Mô tả ảnh ngắn. AI viết caption thu hút, đúng giọng, đăng được luôn.' },
  { day: 5, time: '15 phút', title: 'Script video 30 giây TikTok/Reels', desc: 'Có script sẵn, không phải ngồi nghĩ trước camera nữa.' },
  { day: 6, time: '30 phút', title: 'Lịch đăng bài cả tuần',            desc: 'AI lên lịch 7 bài cho tuần tới. Bạn chỉ duyệt và bấm đăng.' },
  { day: 7, time: 'Demo',    title: 'Gặp Tiểu Hà Mã, đội trưởng AI',   desc: 'Thấy con bot mình dùng để trả khách lúc 2h sáng, trong khi mình đang ngủ.' },
]

const BULLETS = [
  'Cách nạp giọng bạn vào AI trong 15 phút. Làm một lần, AI nhớ mãi, không cần giải thích lại mỗi lần...',
  'File BRAND_DNA mình đang dùng hàng ngày: điền vào là AI biết bạn là ai, viết như bạn, không phải giọng máy chung chung...',
  'Ngày 2: bài Facebook đầu tiên AI viết hoàn toàn theo đúng giọng bạn. Đọc xong tự hỏi "ủa sao nó giống mình vậy?"...',
  'Kho 489 tiêu đề thu hút khách hàng. Chép là có hook, không cần ngồi nghĩ từng bài...',
  'Ngày 6: AI lên lịch 7 bài cho cả tuần trong 30 phút. Bạn chỉ duyệt rồi đăng...',
  'Ngày 7: con bot trả khách 24/7 kể cả lúc 2h sáng, trong khi bạn đang ngủ. Cái này ít người chia sẻ lắm...',
]

// ── Sub-component: Opt-in Form ────────────────────────────────────────────────
function OptinForm({ variant = 'hero' }: { variant?: 'hero' | 'bottom' }) {
  const router                = useRouter()
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) { setError('Bạn điền tên và email để mình gửi nha.'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/thu-thach/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      })
      if (!res.ok) throw new Error()
      trackLead({ content_name: 'thuthach_7ngay' })
      router.push('/cam-on')
    } catch {
      setError('Có lỗi gì đó rồi. Bạn thử lại giúp mình nha.')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-[#3D6B4A] mb-1.5">Tên của bạn</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Mình gọi bạn là..."
          className="w-full h-12 px-4 rounded-xl border border-[#DDD8CB] bg-white text-[#0D2B1A] placeholder:text-[#7A8C7E] focus:outline-none focus:border-[#3D6B4A] focus:ring-2 focus:ring-[#3D6B4A]/20 transition-all text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#3D6B4A] mb-1.5">Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="email@cuaban.com"
          className="w-full h-12 px-4 rounded-xl border border-[#DDD8CB] bg-white text-[#0D2B1A] placeholder:text-[#7A8C7E] focus:outline-none focus:border-[#3D6B4A] focus:ring-2 focus:ring-[#3D6B4A]/20 transition-all text-sm"
        />
      </div>

      {error && (
        <p className="text-sm text-[#DC2626] bg-[#FEF2F2] border border-[#DC2626]/20 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full h-14 bg-[#C0390E] hover:bg-[#A0300B] text-white font-bold text-base rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            Gửi Thử Thách Cho Tôi Ngay
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>

      <p className="text-center text-xs text-[#7A8C7E] flex items-center justify-center gap-1.5">
        <Lock className="w-3 h-3" />
        Miễn phí hoàn toàn. Không spam. Hủy bất cứ lúc nào.
      </p>
    </form>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function ThuThach7NgayPage() {
  return (
    <div className="min-h-dvh bg-[#F6F0E4] font-sans">

      {/* ── Announcement Bar ─────────────────────────────────────── */}
      <div className="bg-[#0D2B1A] text-[#F6F0E4] text-center py-2.5 px-4">
        <p className="text-sm font-medium">
          Miễn phí · 7 ngày · 15–25 phút/ngày · Bắt đầu ngay hôm nay
        </p>
      </div>

      {/* ── Header (minimal) ─────────────────────────────────────── */}
      <header className="border-b border-[#DDD8CB] bg-[#F6F0E4]/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0D2B1A] flex items-center justify-center">
              <span className="text-[#F6F0E4] font-bold text-sm font-mono">DH</span>
            </div>
            <span className="font-bold text-[#0D2B1A] text-sm">DungHoang.com</span>
          </div>
          <a
            href="#dang-ky"
            className="hidden sm:flex items-center gap-1.5 bg-[#C0390E] hover:bg-[#A0300B] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Đăng ký miễn phí <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* ── HERO — Above the Fold ────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 pt-12 pb-16 lg:pt-20 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: Copy */}
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#EAF5EF] border border-[#2D7A4F]/30 rounded-full px-4 py-1.5">
              <span className="w-2 h-2 rounded-full bg-[#2D7A4F]" />
              <span className="text-sm font-medium text-[#2D7A4F]">Miễn phí · 7 ngày · 15–25 phút/ngày</span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <p className="text-[#88860B] font-semibold text-sm uppercase tracking-widest">Thử Thách 7 Ngày</p>
              <h1 className="text-4xl lg:text-5xl font-bold text-[#0D2B1A] leading-tight">
                Dạy AI Viết Bài<br />
                <span className="text-[#C0390E]">Đúng Giọng Bạn</span>
              </h1>
              <p className="text-xl text-[#3D6B4A] font-medium">Dù Bạn Chưa Biết Gì Về AI</p>
            </div>

            {/* Subheadline */}
            <p className="text-[#3D6B4A] text-base leading-relaxed">
              Mỗi ngày 1 việc nhỏ. Ngày đầu tiên mất 15 phút - AI sẽ viết đúng giọng bạn lần đầu tiên.
              Điền tên và email bên dưới, mình gửi ngay.
            </p>

            {/* Bullets */}
            <ul className="space-y-3">
              {BULLETS.map((b, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <CheckCircle className="w-5 h-5 text-[#2D7A4F] flex-shrink-0 mt-0.5" />
                  <span className="text-[#0D2B1A] text-sm leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Form */}
          <div id="dang-ky" className="bg-white rounded-3xl shadow-lg border border-[#DDD8CB] p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#EAF5EF] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤖</span>
              </div>
              <h2 className="text-xl font-bold text-[#0D2B1A] mb-1">Đăng ký nhận thử thách</h2>
              <p className="text-sm text-[#7A8C7E]">Mình gửi email đầu tiên trong vài phút</p>
            </div>
            <OptinForm variant="hero" />
          </div>
        </div>
      </section>

      {/* ── Pain Section ─────────────────────────────────────────── */}
      <section className="bg-[#0D2B1A] py-16 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="text-[#88860B] font-semibold text-sm uppercase tracking-widest">Bạn có đang như vậy không?</p>
          <h2 className="text-3xl font-bold text-[#F6F0E4] leading-tight">
            Biết AI mạnh lắm, nhưng mở ra toàn thấy nó viết không ra giọng mình...
          </h2>
          <div className="grid sm:grid-cols-3 gap-4 pt-4">
            {[
              { emoji: '😩', text: '"Mua combo AI về rồi để đó, vẫn phải tự bấm mọi thứ."' },
              { emoji: '🤯', text: '"AI viết chung chung quá, đọc là biết không phải mình."' },
              { emoji: '😰', text: '"Không biết bắt đầu từ đâu, sợ mất thêm tiền vào cái không dùng được."' },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-left">
                <div className="text-2xl mb-3">{item.emoji}</div>
                <p className="text-[#A8C4B0] text-sm leading-relaxed italic">{item.text}</p>
              </div>
            ))}
          </div>
          <p className="text-[#A8C4B0] text-base leading-relaxed">
            Không phải lỗi bạn đâu. Vấn đề là chưa ai chỉ cách <strong className="text-[#F6F0E4]">dạy AI biết bạn là ai</strong> trước khi nhờ nó làm việc.
          </p>
        </div>
      </section>

      {/* ── What You Get — 7 Ngày ────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#88860B] font-semibold text-sm uppercase tracking-widest mb-3">Bạn sẽ làm được gì</p>
            <h2 className="text-3xl font-bold text-[#0D2B1A]">7 Ngày — Mỗi Ngày 1 Việc Nhỏ</h2>
            <p className="text-[#3D6B4A] mt-3">Từ "chưa biết gì về AI" đến "AI tự viết bài thay mình"</p>
          </div>

          <div className="space-y-3">
            {DAYS.map((d, i) => (
              <div key={i} className="flex gap-4 items-start bg-white border border-[#DDD8CB] rounded-2xl p-5 hover:border-[#3D6B4A]/40 hover:shadow-md transition-all">
                {/* Day badge */}
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#0D2B1A] flex flex-col items-center justify-center">
                  <span className="text-[#A8C4B0] text-[10px] font-medium">Ngày</span>
                  <span className="text-[#F6F0E4] font-bold text-lg leading-none">{d.day}</span>
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-[#0D2B1A]">{d.title}</span>
                    <span className="inline-flex items-center gap-1 text-xs text-[#3D6B4A] bg-[#EAF5EF] px-2 py-0.5 rounded-full">
                      <Clock className="w-3 h-3" />
                      {d.time}
                    </span>
                  </div>
                  <p className="text-[#7A8C7E] text-sm mt-1 leading-relaxed">{d.desc}</p>
                </div>
                {/* Day 7 special */}
                {d.day === 7 && (
                  <div className="flex-shrink-0">
                    <span className="text-xs font-semibold text-[#C0390E] bg-[#FEF2F2] px-2 py-1 rounded-full">Wow</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who This Is For ──────────────────────────────────────── */}
      <section className="bg-[#FAF7F2] py-16 px-4 border-y border-[#DDD8CB]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-[#0D2B1A]">Thử thách này dành cho bạn nếu...</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              'Đang kinh doanh một mình — bán khóa học, dịch vụ, shop online',
              'Tự làm hết mọi thứ và bắt đầu thấy kiệt sức với việc viết bài mỗi ngày',
              'Biết AI mạnh nhưng chưa biết bắt đầu từ đâu cho đúng',
              'Đã thử ChatGPT nhưng AI cứ viết không ra giọng mình',
              'Muốn dùng AI thật sự trong công việc, không phải học lý thuyết suông',
              'Không rành công nghệ — chỉ cần 15 phút/ngày là đủ',
            ].map((item, i) => (
              <div key={i} className="flex gap-3 items-start bg-white rounded-xl p-4 border border-[#DDD8CB]">
                <CheckCircle className="w-5 h-5 text-[#2D7A4F] flex-shrink-0 mt-0.5" />
                <span className="text-[#0D2B1A] text-sm leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About Dũng ───────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border border-[#DDD8CB] rounded-3xl p-8">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Avatar placeholder */}
              <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-[#0D2B1A] flex items-center justify-center">
                <span className="text-[#F6F0E4] font-bold text-2xl font-mono">DH</span>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="font-bold text-[#0D2B1A] text-lg">Dũng Hoàng</p>
                  <p className="text-[#3D6B4A] text-sm">DungHoang.com · Solopreneur · AI Agent</p>
                </div>
                <p className="text-[#0D2B1A] text-sm leading-relaxed">
                  Mình không phải chuyên gia hay thầy dạy AI. Mình là người từng làm một mình đến kiệt sức, từng mua combo AI về để đó, rồi lụi cụi tìm ra cách cho AI làm việc thay mình.
                </p>
                <p className="text-[#0D2B1A] text-sm leading-relaxed">
                  Thứ mình chia sẻ là thứ đang chạy thật trong công việc của mình — không phải lý thuyết.
                </p>
                <div className="flex gap-4 pt-1">
                  {[
                    { label: 'Homestay', value: 'Top 1% Airbnb' },
                    { label: 'AI Agent', value: 'Đang chạy thật' },
                    { label: 'Thử thách', value: 'Miễn phí' },
                  ].map((s, i) => (
                    <div key={i} className="text-center">
                      <p className="font-bold text-[#0D2B1A] text-sm">{s.value}</p>
                      <p className="text-[#7A8C7E] text-xs">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Second CTA / Form Repeat ─────────────────────────────── */}
      <section className="bg-[#0D2B1A] py-16 px-4">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="space-y-2">
            <div className="flex justify-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#88860B] text-[#88860B]" />
              ))}
            </div>
            <p className="text-[#A8C4B0] text-sm italic">
              "Ngày đầu mà AI viết bài đúng giọng mình luôn, mình hơi sốc..."
            </p>
            <p className="text-[#7A8C7E] text-xs">[PLACEHOLDER — testimonial học viên thật điền vào đây]</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-[#F6F0E4]">
              Bắt đầu miễn phí hôm nay
            </h2>
            <p className="text-[#A8C4B0] text-sm">
              7 ngày · 15–25 phút/ngày · Không cần biết gì về AI
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6">
            <OptinForm variant="bottom" />
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="bg-[#F6F0E4] border-t border-[#DDD8CB] py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#0D2B1A] flex items-center justify-center">
              <span className="text-[#F6F0E4] font-bold text-xs font-mono">DH</span>
            </div>
            <span className="text-[#0D2B1A] font-semibold text-sm">DungHoang.com</span>
          </div>
          <p className="text-[#7A8C7E] text-xs text-center">
            © 2026 DungHoang.com · Miễn phí hoàn toàn · Không spam
          </p>
          <div className="flex gap-4">
            <a href="/chinh-sach-bao-mat" className="text-[#7A8C7E] text-xs hover:text-[#0D2B1A] transition-colors">Chính sách</a>
            <a href="/lien-he" className="text-[#7A8C7E] text-xs hover:text-[#0D2B1A] transition-colors">Liên hệ</a>
          </div>
        </div>
      </footer>

    </div>
  )
}
