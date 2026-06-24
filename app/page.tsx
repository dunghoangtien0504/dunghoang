import Link from 'next/link'
import { ArrowRight, BookOpen, Users, CheckCircle, Newspaper } from 'lucide-react'
import { getRecentPosts } from '@/lib/posts'
import SiteNav from '@/components/SiteNav'
import MetaPixel from '@/components/MetaPixel'
import AffiliateTracker from '@/components/AffiliateTracker'

export const metadata = {
  title: 'DungHoang.com — 24 AI Agent for Business',
  description: 'Bộ 24 AI agent giúp solopreneur tự vận hành hệ thống bán hàng mà không cần thuê đội ngũ.',
}

const PRODUCTS = [
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
    name: 'Landing Page Siêu Chuyển Đổi',
    desc: 'Skill 08B Landing Page. Không cần code. AI làm hết kỹ thuật. Tặng kèm Content System.',
    price: '686.868đ',
    cta: 'Xem chi tiết',
    href: '/mini-trang-ban-hang',
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    badge: 'Khóa thực hành',
    badgeColor: 'bg-[#FFF0ED] text-[#C0390E]',
    name: 'Landing Page Siêu Chuyển Đổi',
    desc: 'Vibe Coding + 8 skill file. 10 buổi thực hành. Cuối khóa có landing page thật đang chạy.',
    price: '686.868đ',
    cta: 'Xem chi tiết',
    href: '/khoa-landing-page',
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    badge: 'Bộ đầy đủ',
    badgeColor: 'bg-[#EAF5EF] text-[#2D7A4F]',
    name: '24 AI Agent for Business',
    desc: 'Toàn bộ 24 AI agent tự học. Tặng kèm Content System + Landing Page skill.',
    price: '868.686đ',
    cta: 'Xem chi tiết',
    href: '/24-ai-agent',
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    badge: 'Có đội trưởng',
    badgeColor: 'bg-[#F0EDF8] text-[#5B3DA8]',
    name: 'Coaching — Cầm Tay Chỉ Việc',
    desc: '24 AI agent + 1 buổi Soi Hệ Thống 1-kèm-1 với Dũng. Dũng ngồi cùng bạn, chỉ đúng chỗ cần fix.',
    price: '3.868.686đ',
    cta: 'Xem chi tiết',
    href: '/coaching',
    icon: <Users className="w-5 h-5" />,
  },
]

export default function HomePage() {
  const recentPosts = getRecentPosts(3)

  return (
    <div className="min-h-dvh bg-[#F6F0E4] font-sans">
      <MetaPixel />
      <AffiliateTracker />
      <SiteNav />

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-[#EAF5EF] text-[#2D7A4F] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#2D7A4F]/20">
          Hơn 600 solopreneur đang dùng
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold text-[#0D2B1A] leading-tight">
          24 AI Agent
          <br />
          <span className="text-[#3D6B4A]">for Business</span>
        </h1>
        <p className="text-[#3D6B4A] text-lg max-w-2xl mx-auto leading-relaxed">
          Không phải lý thuyết AI. Mỗi skill có output cụ thể: trang bán hàng,
          email tự động, chatbot, ads... tạo thành hệ thống tự chạy mà không cần thuê đội ngũ.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/24-ai-agent"
            className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-[#C0390E] hover:bg-[#A0300B] text-white font-bold rounded-xl transition-all shadow-lg"
          >
            Xem 24 AI Agent
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/coaching"
            className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-white hover:bg-[#FAF7F2] text-[#0D2B1A] font-semibold rounded-xl border border-[#DDD8CB] transition-colors"
          >
            Khóa 2 — Có Đội Trưởng
          </Link>
        </div>
      </section>

      {/* ── Products ── featured Khóa 1 + others below ─────────── */}
      <section className="max-w-4xl mx-auto px-4 pb-16 space-y-3">
        {/* Featured: Khóa 1 */}
        {(() => {
          const p = PRODUCTS[2]
          return (
            <div className="bg-[#0D2B1A] border border-[#0D2B1A] rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold bg-[#C0390E] text-white px-2.5 py-1 rounded-full">{p.badge}</span>
                  <span className="text-[#88860B] text-xs font-semibold">— 605+ học viên đã học</span>
                </div>
                <p className="font-black text-[#F6F0E4] text-xl leading-snug">{p.name}</p>
                <p className="text-sm text-[#C8D5C9] leading-relaxed max-w-md">{p.desc}</p>
              </div>
              <div className="flex flex-col items-start sm:items-end gap-3 flex-shrink-0">
                <p className="font-black text-[#F6F0E4] text-2xl font-mono">{p.price}</p>
                <Link href={p.href}
                  className="h-12 px-6 bg-[#C0390E] hover:bg-[#a02e0a] active:scale-[0.97] text-white font-bold text-sm rounded-xl transition-all flex items-center gap-2 whitespace-nowrap">
                  {p.cta} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )
        })()}

        {/* Secondary: 3 others */}
        <div className="grid sm:grid-cols-3 gap-3">
          {[PRODUCTS[0], PRODUCTS[3], PRODUCTS[4]].map((p, i) => (
            <div key={i}
              className="bg-white border border-[#DDD8CB] rounded-2xl p-4 space-y-3 hover:border-[#3D6B4A]/40 hover:shadow-sm transition-all flex flex-col">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full self-start ${p.badgeColor}`}>{p.badge}</span>
              <div className="flex-1 space-y-1">
                <p className="font-bold text-[#0D2B1A] text-sm leading-snug">{p.name}</p>
                <p className="text-xs text-[#3D6B4A] leading-relaxed">{p.desc}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-bold text-[#0D2B1A]">{p.price}</p>
                <Link href={p.href}
                  className="h-9 px-4 bg-[#0D2B1A] hover:bg-[#1a4a2e] text-[#F6F0E4] font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5">
                  {p.cta} <ArrowRight className="w-3 h-3" />
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
              ['24 AI agent', 'Mỗi agent thay 1 nhân sự. Cả bộ thay cả đội.'],
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
            24 AI agent này là những gì mình đang dùng thật. Mình chia sẻ lại vì nghĩ người kinh doanh
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
          Khóa 1 tự học theo nhịp của bạn. Khóa 2 có thêm AI Agent cài riêng cho business của bạn.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/24-ai-agent"
            className="inline-flex items-center gap-2 h-14 px-8 bg-[#C0390E] hover:bg-[#A0300B] active:scale-[0.97] text-white font-bold rounded-2xl transition-all shadow-lg text-base"
          >
            Khóa 1 — 868.686đ
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/coaching"
            className="inline-flex items-center gap-2 h-14 px-8 bg-white hover:bg-[#FAF7F2] text-[#0D2B1A] font-semibold rounded-2xl border border-[#DDD8CB] transition-colors text-sm"
          >
            Khóa 2 — Có Đội Trưởng
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Blog preview ───────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 pb-16 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Newspaper className="w-4 h-4 text-[#3D6B4A]" />
            <h2 className="font-bold text-[#0D2B1A]">Bài viết mới nhất</h2>
          </div>
          <Link href="/tin-tuc" className="text-sm text-[#3D6B4A] font-medium hover:text-[#0D2B1A] flex items-center gap-1">
            Xem tất cả <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {recentPosts.map(post => (
            <Link
              key={post.slug}
              href={`/tin-tuc/${post.slug}`}
              className="bg-white border border-[#DDD8CB] rounded-2xl p-5 space-y-3 hover:border-[#3D6B4A]/40 hover:shadow-sm transition-all group flex flex-col"
            >
              <span className="text-xs text-[#3D6B4A] bg-[#EAF5EF] px-2.5 py-1 rounded-full self-start">
                {post.category}
              </span>
              <p className="font-bold text-[#0D2B1A] text-sm leading-snug flex-1 group-hover:text-[#3D6B4A] transition-colors">
                {post.title}
              </p>
              <div className="flex items-center justify-between text-xs text-[#7A8C7E]">
                <span>{post.readMin} phút đọc</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#3D6B4A]" />
              </div>
            </Link>
          ))}
        </div>
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
            <Link href="/coaching" className="hover:text-[#3D6B4A]">Khóa 2</Link>
            <Link href="/he-thong-content" className="hover:text-[#3D6B4A]">Content System</Link>
            <Link href="/mini-trang-ban-hang" className="hover:text-[#3D6B4A]">Trang Bán Hàng</Link>
            <Link href="/24-ai-agent" className="hover:text-[#3D6B4A]">24 AI Agent</Link>
            <Link href="/coaching" className="hover:text-[#3D6B4A]">Có Đội</Link>
            <Link href="/portal" className="hover:text-[#3D6B4A]">Portal học viên</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}
