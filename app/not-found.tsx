import Link from 'next/link'
import { Home, ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
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
          <h1 className="text-text-primary font-bold text-2xl">Trang khong tim thay</h1>
          <p className="text-text-secondary text-sm leading-relaxed">
            Trang ban dang tim khong ton tai hoac da duoc chuyen den dia chi khac.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Link href="/admin" className="btn-primary text-sm py-2.5 px-5">
            <Home size={14} /> Ve Dashboard
          </Link>
          <Link href="javascript:history.back()" className="btn-secondary text-sm py-2.5 px-5">
            <ArrowLeft size={14} /> Quay lai
          </Link>
        </div>

        {/* Quick links */}
        <div className="pt-4 border-t border-border">
          <p className="text-text-muted text-xs mb-3">Cac trang pho bien</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { label: 'Khoa hoc', href: '/admin/courses' },
              { label: 'Don hang', href: '/admin/orders' },
              { label: 'Khach hang', href: '/admin/crm/contacts' },
              { label: 'Email', href: '/admin/email' },
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
