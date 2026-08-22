'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Home, ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-dvh bg-background flex items-center justify-center p-6">
      <div className="text-center max-w-md space-y-6">
        {/* Big 404 */}
        <div className="relative">
          <p className="text-[120px] font-black text-brand-dark/8 leading-none select-none font-mono">
            404
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-surface border-2 border-border shadow-card-md flex items-center justify-center">
              <Search size={32} className="text-text-muted" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-text-primary font-bold text-2xl">Không tìm thấy trang này</h1>
          <p className="text-text-secondary text-sm leading-relaxed">
            Trang bạn tìm không còn ở đây nữa, hoặc đường dẫn bị gõ sai một chút.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Link href="/" className="btn-primary text-sm py-2.5 px-5">
            <Home size={14} /> Về trang chủ
          </Link>
          <button onClick={() => router.back()} className="btn-secondary text-sm py-2.5 px-5">
            <ArrowLeft size={14} /> Quay lại
          </button>
        </div>

        {/* Quick links */}
        <div className="pt-4 border-t border-border">
          <p className="text-text-muted text-xs mb-3">Có thể bạn đang tìm</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { label: 'Khoá học',        href: '/#khoa-hoc' },
              { label: 'Meta AI Agent',   href: '/meta-ai-agent' },
              { label: 'Khu học viên',    href: '/portal' },
              { label: 'Cộng tác viên',   href: '/portal/cong-tac-vien' },
            ].map(l => (
              <Link key={l.href} href={l.href}
                className="badge badge-gray hover:bg-brand-dark/10 hover:text-brand-dark hover:border-brand-border/30 transition-all text-xs px-3 py-1">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
