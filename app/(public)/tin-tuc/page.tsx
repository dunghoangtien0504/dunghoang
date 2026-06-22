import Link from 'next/link'
import { ArrowRight, Clock, Tag } from 'lucide-react'
import { POSTS } from '@/lib/posts'

export const metadata = {
  title: 'Tin Tức & Hướng Dẫn AI — DungHoang.com',
  description: 'Hướng dẫn thực chiến về AI cho người kinh doanh một mình. Cách dùng AI viết content, tự động hóa bán hàng, tiết kiệm thời gian.',
}

export default function TinTucPage() {
  const posts = [...POSTS].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="min-h-dvh bg-[#F6F0E4] font-sans">

      {/* Header */}
      <header className="border-b border-[#DDD8CB] bg-[#F6F0E4]/90 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0D2B1A] flex items-center justify-center">
              <span className="text-[#F6F0E4] font-bold text-sm font-mono">DH</span>
            </div>
            <span className="font-bold text-[#0D2B1A] text-sm">DungHoang.com</span>
          </Link>
          <nav className="hidden sm:flex items-center gap-5 text-sm">
            <Link href="/khoa-1-ban-tu-lap" className="text-[#3D6B4A] font-medium hover:text-[#0D2B1A]">Khóa học</Link>
            <Link href="/tin-tuc" className="text-[#0D2B1A] font-semibold">Tin tức</Link>
            <Link href="/cong-tac-vien" className="text-[#7A8C7E] hover:text-[#3D6B4A]">Cộng tác viên</Link>
            <Link href="/portal" className="text-[#7A8C7E] hover:text-[#3D6B4A]">Đăng nhập</Link>
          </nav>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-12 space-y-10">

        {/* Hero */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-[#3D6B4A] uppercase tracking-wider">Tin tức & hướng dẫn</p>
          <h1 className="text-3xl font-black text-[#0D2B1A]">AI thực chiến cho solopreneur</h1>
          <p className="text-[#3D6B4A] leading-relaxed">
            Không phải hướng dẫn lý thuyết. Những gì mình đang dùng thật trong business.
          </p>
        </div>

        {/* Post list */}
        <div className="space-y-4">
          {posts.map(post => (
            <Link
              key={post.slug}
              href={`/tin-tuc/${post.slug}`}
              className="block bg-white border border-[#DDD8CB] rounded-2xl p-6 hover:border-[#3D6B4A]/40 hover:shadow-sm transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="flex items-center gap-1 text-xs text-[#3D6B4A] bg-[#EAF5EF] px-2.5 py-1 rounded-full">
                  <Tag className="w-3 h-3" />
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-[#7A8C7E]">
                  <Clock className="w-3 h-3" />
                  {post.readMin} phút đọc
                </span>
                <span className="text-xs text-[#7A8C7E]">
                  {new Date(post.date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                </span>
              </div>
              <h2 className="font-black text-[#0D2B1A] text-lg leading-snug mb-2 group-hover:text-[#3D6B4A] transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-[#3D6B4A] leading-relaxed">{post.description}</p>
              <div className="flex items-center gap-1 mt-4 text-xs font-semibold text-[#3D6B4A]">
                Đọc bài <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-[#0D2B1A] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-[#F6F0E4]">Muốn áp dụng ngay vào business?</p>
            <p className="text-sm text-[#C8D5C9] mt-0.5">Thử thách 7 ngày miễn phí. Làm đủ thì cọc hoàn lại.</p>
          </div>
          <Link
            href="/bi-quyet-7-ngay"
            className="flex-shrink-0 flex items-center gap-2 h-11 px-5 bg-[#C0390E] hover:bg-[#A0300B] text-white font-bold rounded-xl transition-colors text-sm"
          >
            Tham gia ngay <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* Footer */}
      <footer className="border-t border-[#DDD8CB] py-6 mt-8">
        <div className="max-w-5xl mx-auto px-4 text-center text-xs text-[#7A8C7E]">
          © 2026 DungHoang.com ·{' '}
          <Link href="/" className="hover:text-[#3D6B4A]">Trang chủ</Link>
          {' · '}
          <Link href="/portal" className="hover:text-[#3D6B4A]">Đăng nhập</Link>
        </div>
      </footer>

    </div>
  )
}
