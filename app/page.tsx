import Link from 'next/link'
import { ArrowRight, BookOpen, Zap, Users, CheckCircle } from 'lucide-react'

export const metadata = {
  title: 'DungHoang.com — 25 Skill AI Cho Người Kinh Doanh Một Mình',
  description: 'Bộ 25 skill AI giúp solopreneur tự vận hành hệ thống bán hàng mà không cần thuê đội ngũ. Thử thách 7 ngày miễn phí.',
}

const PRODUCTS = [
  {
    badge: 'Miễn phí',
    badgeColor: 'bg-[#EAF5EF] text-[#2D7A4F]',
    name: 'Thử Thách 7 Ngày AI',
    desc: 'Dạy AI viết bài đúng giọng bạn. Mỗi ngày 15-25 phút, 7 ngày là có kết quả.',
    price: null,
    cta: 'Tham gia miễn phí',
    href: '/thu-thach-7-ngay',
    icon: <Zap className="w-5 h-5" />,
  },
  {
    badge: 'Vào cửa',
    badgeColor: 'bg-[#FFF8E6] text-[#7A6000]',
    name: 'Content Không Cần Cảm Hứng',
    desc: 'Workspace Notion + AI viết đúng giọng bạn. Gõ "viết bài" là có bài sẵn để đăng.',
    price: '368.686đ',
    cta: 'Xem chi tiết',
    href: '/he-thong-content',
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    badge: 'Phổ biến nhất',
    badgeColor: 'bg-[#EDF3FF] text-[#2B5BB8]',
    name: 'Trang Bán Hàng — Làm Trong 1 Buổi',
    desc: 'Skill 08B Landing Page. Không cần code. AI làm hết kỹ thuật. Tặng kèm Content System.',
    price: '686.868đ',
    cta: 'Xem chi tiết',
    href: '/mini-trang-ban-hang',
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    badge: 'Bộ đầy đủ',
    badgeColor: 'bg-[#EAF5EF] text-[#2D7A4F]',
    name: 'Khóa 1 — 25 Skill AI',
    desc: 'Toàn bộ 24 skill tự học. Tặng kèm Content System + Landing Page skill.',
    price: '868.686đ',
    cta: 'Xem chi tiết',
    href: '/khoa-1-ban-tu-lap',
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    badge: 'Có đội trưởng',
    badgeColor: 'bg-[#F0EDF8] text-[#5B3DA8]',
    name: 'Khóa 2 — Bản Có Đội Trưởng',
    desc: '25 skill + Tiểu Hà Mã kèm sát 24/7. Cam kết 30 ngày có hệ thống tự chạy.',
    price: '2.768.686đ',
    cta: 'Xem chi tiết',
    href: '/khoa-2-ban-co-doi-truong',
    icon: <Users className="w-5 h-5" />,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-[#F6F0E4] font-sans">

      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="border-b border-[#DDD8CB] bg-[#F6F0E4]/90 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0D2B1A] flex items-center justify-center">
              <span className="text-[#F6F0E4] font-bold text-sm font-mono">DH</span>
            </div>
            <span className="font-bold text-[#0D2B1A] text-sm">DungHoang.com</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/thu-thach-7-ngay"
              className="text-sm text-[#3D6B4A] font-medium hover:text-[#0D2B1A] transition-colors"
            >
              Thử thách miễn phí
            </Link>
            <Link
              href="/portal"
              className="text-sm text-[#7A8C7E] hover:text-[#3D6B4A] transition-colors"
            >
              Đăng nhập
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-[#EAF5EF] text-[#2D7A4F] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#2D7A4F]/20">
          Hơn 600 solopreneur đang dùng
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold text-[#0D2B1A] leading-tight">
          25 Skill AI cho người
          <br />
          <span className="text-[#3D6B4A]">kinh doanh một mình</span>
        </h1>
        <p className="text-[#3D6B4A] text-lg max-w-2xl mx-auto leading-relaxed">
          Không phải lý thuyết AI. Mỗi skill có output cụ thể: trang bán hàng,
          email tự động, chatbot, ads... tạo thành hệ thống tự chạy mà không cần thuê đội ngũ.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/thu-thach-7-ngay"
            className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-[#C0390E] hover:bg-[#A0300B] text-white font-bold rounded-xl transition-all shadow-lg"
          >
            Thử 7 ngày miễn phí
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/khoa-1-ban-tu-lap"
            className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-white hover:bg-[#FAF7F2] text-[#0D2B1A] font-semibold rounded-xl border border-[#DDD8CB] transition-colors"
          >
            Xem 25 skill
          </Link>
        </div>
      </section>

      {/* ── Products ───────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRODUCTS.map((p, i) => (
            <div
              key={i}
              className="bg-white border border-[#DDD8CB] rounded-2xl p-5 space-y-4 hover:border-[#3D6B4A]/40 hover:shadow-sm transition-all flex flex-col"
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${p.badgeColor}`}>
                  {p.badge}
                </span>
                <span className="text-[#3D6B4A]">{p.icon}</span>
              </div>
              <div className="flex-1 space-y-1.5">
                <p className="font-bold text-[#0D2B1A] text-sm leading-snug">{p.name}</p>
                <p className="text-xs text-[#3D6B4A] leading-relaxed">{p.desc}</p>
              </div>
              <div className="space-y-2">
                {p.price && (
                  <p className="font-bold text-[#0D2B1A] text-lg">{p.price}</p>
                )}
                <Link
                  href={p.href}
                  className="flex items-center justify-center gap-1.5 w-full h-10 bg-[#0D2B1A] hover:bg-[#1a4a2e] text-[#F6F0E4] font-semibold text-sm rounded-xl transition-colors"
                >
                  {p.cta}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Social proof ───────────────────────────────────────── */}
      <section className="bg-[#0D2B1A] py-12">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <p className="text-center text-[#88860B] text-sm font-semibold uppercase tracking-wider">
            Tại sao người kinh doanh một mình chọn Biệt Đội AI Agent
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              ['25 skill', 'Mỗi skill thay 1 nhân sự. Cả bộ thay cả đội.'],
              ['30 ngày', 'Cam kết Khóa 2: dựng xong hệ thống tự chạy hoặc mình sửa cùng.'],
              ['14 ngày BH', 'Hoàn 100% không hỏi lý do nếu không phù hợp.'],
            ].map(([num, desc], i) => (
              <div key={i} className="text-center space-y-2">
                <p className="text-3xl font-bold text-[#F6F0E4]">{num}</p>
                <p className="text-sm text-[#C8D5C9] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why ────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 py-14 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-[#0D2B1A]">Mình là ai và tại sao làm cái này</h2>
        </div>
        <div className="bg-white border border-[#DDD8CB] rounded-3xl p-8 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0D2B1A] flex items-center justify-center flex-shrink-0">
              <span className="text-[#F6F0E4] font-bold text-xl font-mono">DH</span>
            </div>
            <div>
              <p className="font-bold text-[#0D2B1A]">Dũng Hoàng</p>
              <p className="text-sm text-[#7A8C7E]">Solopreneur. Đang dùng AI để vận hành mọi thứ một mình.</p>
            </div>
          </div>
          <p className="text-[#3D6B4A] leading-relaxed text-sm">
            Mình không phải chuyên gia AI hay giảng viên. Mình đang kinh doanh một mình, vận hành homestay,
            build DungHoang.com, và dùng AI để làm phần lớn những việc mà trước đây cần cả đội.
          </p>
          <p className="text-[#3D6B4A] leading-relaxed text-sm">
            25 skill này là những gì mình đang dùng thật. Mình chia sẻ lại vì nghĩ người kinh doanh
            một mình deserves biết những công cụ này. Không phải để "học AI cho vui" mà để dùng
            ngay vào việc kinh doanh thật.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {['Không xưng thầy/chuyên gia', 'Đang dùng thật', 'Hơn 600 học viên', 'BH 14 ngày'].map((tag, i) => (
              <span key={i} className="text-xs bg-[#EAF5EF] text-[#2D7A4F] px-2.5 py-1 rounded-full border border-[#2D7A4F]/20">
                <CheckCircle className="w-3 h-3 inline mr-1" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────────── */}
      <section className="max-w-2xl mx-auto px-4 pb-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#0D2B1A]">Bắt đầu từ đâu?</h2>
        <p className="text-[#3D6B4A] text-sm">
          Nếu chưa biết thì thử 7 ngày miễn phí trước. Không cần thẻ. Không cam kết.
        </p>
        <Link
          href="/thu-thach-7-ngay"
          className="inline-flex items-center gap-2 h-13 px-8 py-3 bg-[#C0390E] hover:bg-[#A0300B] text-white font-bold rounded-xl transition-all shadow-lg text-base"
        >
          Tham gia thử thách 7 ngày miễn phí
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="border-t border-[#DDD8CB] py-8">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#7A8C7E]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#0D2B1A] flex items-center justify-center">
              <span className="text-[#F6F0E4] font-bold text-xs font-mono">DH</span>
            </div>
            <span>DungHoang.com</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/thu-thach-7-ngay" className="hover:text-[#3D6B4A]">Thử thách 7 ngày</Link>
            <Link href="/he-thong-content" className="hover:text-[#3D6B4A]">Content System</Link>
            <Link href="/mini-trang-ban-hang" className="hover:text-[#3D6B4A]">Trang Bán Hàng</Link>
            <Link href="/khoa-1-ban-tu-lap" className="hover:text-[#3D6B4A]">Khóa 1</Link>
            <Link href="/khoa-2-ban-co-doi-truong" className="hover:text-[#3D6B4A]">Khóa 2</Link>
            <Link href="/portal" className="hover:text-[#3D6B4A]">Portal học viên</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}
