import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, Tag, ArrowRight } from 'lucide-react'
import { getPostBySlug, getRecentPosts, POSTS } from '@/lib/posts'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return POSTS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title:       `${post.title} — DungHoang.com`,
    description: post.description,
    openGraph: {
      title:       post.title,
      description: post.description,
      type:        'article',
      publishedTime: post.date,
    },
  }
}

export default function PostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const related = getRecentPosts(4).filter(p => p.slug !== post.slug).slice(0, 3)

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

      <article className="max-w-2xl mx-auto px-4 py-12">

        {/* Back */}
        <Link href="/tin-tuc" className="inline-flex items-center gap-1.5 text-sm text-[#3D6B4A] hover:text-[#0D2B1A] mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Tất cả bài viết
        </Link>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-4">
          <span className="flex items-center gap-1 text-xs text-[#3D6B4A] bg-[#EAF5EF] px-2.5 py-1 rounded-full">
            <Tag className="w-3 h-3" />
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-[#7A8C7E]">
            <Clock className="w-3 h-3" />
            {post.readMin} phút đọc
          </span>
          <span className="text-xs text-[#7A8C7E]">
            {new Date(post.date).toLocaleDateString('vi-VN', { day: '2-digit', month: 'long', year: 'numeric' })}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-black text-[#0D2B1A] leading-tight mb-4">
          {post.title}
        </h1>
        <p className="text-[#3D6B4A] text-base leading-relaxed mb-8 border-l-4 border-[#3D6B4A]/30 pl-4">
          {post.description}
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 mb-8 pb-8 border-b border-[#DDD8CB]">
          <div className="w-10 h-10 rounded-xl bg-[#0D2B1A] flex items-center justify-center flex-shrink-0">
            <span className="text-[#F6F0E4] font-bold text-sm font-mono">DH</span>
          </div>
          <div>
            <p className="font-semibold text-[#0D2B1A] text-sm">Dũng Hoàng</p>
            <p className="text-xs text-[#7A8C7E]">Solopreneur · Đang dùng AI để vận hành một mình</p>
          </div>
        </div>

        {/* Content */}
        <div
          className="prose-dh"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* CTA box */}
        <div className="mt-12 bg-[#0D2B1A] rounded-2xl p-6 space-y-3">
          <p className="font-bold text-[#F6F0E4]">Muốn áp dụng ngay?</p>
          <p className="text-sm text-[#C8D5C9] leading-relaxed">
            Thử thách 7 ngày: mình hướng dẫn từng bước dùng AI vào business thật. Làm đủ thì cọc hoàn lại.
          </p>
          <Link
            href="/bi-quyet-7-ngay"
            className="inline-flex items-center gap-2 h-11 px-5 bg-[#C0390E] hover:bg-[#A0300B] text-white font-bold rounded-xl transition-colors text-sm"
          >
            Tham gia thử thách 7 ngày <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="max-w-2xl mx-auto px-4 pb-16 space-y-4">
          <p className="text-xs font-bold text-[#3D6B4A] uppercase tracking-wider">Bài viết liên quan</p>
          <div className="space-y-3">
            {related.map(p => (
              <Link
                key={p.slug}
                href={`/tin-tuc/${p.slug}`}
                className="flex items-start justify-between gap-4 bg-white border border-[#DDD8CB] rounded-xl p-4 hover:border-[#3D6B4A]/40 transition-colors group"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#0D2B1A] text-sm leading-snug group-hover:text-[#3D6B4A] transition-colors">{p.title}</p>
                  <p className="text-xs text-[#7A8C7E] mt-1">{p.readMin} phút đọc</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#3D6B4A] flex-shrink-0 mt-0.5" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-[#DDD8CB] py-6">
        <div className="max-w-5xl mx-auto px-4 text-center text-xs text-[#7A8C7E]">
          © 2026 DungHoang.com ·{' '}
          <Link href="/" className="hover:text-[#3D6B4A]">Trang chủ</Link>
          {' · '}
          <Link href="/tin-tuc" className="hover:text-[#3D6B4A]">Tin tức</Link>
        </div>
      </footer>

    </div>
  )
}
