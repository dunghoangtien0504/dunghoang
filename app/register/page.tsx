import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function RegisterPage() {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-brand-dark flex items-center justify-center">
            <span className="text-text-on-dark font-bold text-sm font-mono">DH</span>
          </div>
          <span className="text-text-primary font-bold">DungHoang.com</span>
        </div>
        <div>
          <h2 className="text-text-primary text-2xl font-bold">Dang ky mien phi</h2>
          <p className="text-text-muted text-sm mt-1">Bat dau ban khoa hoc ngay hom nay</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-text-secondary text-xs font-medium block mb-1.5">Ho va ten <span className="text-brand-accent">*</span></label>
            <input type="text" placeholder="Nguyen Van A" className="input-field h-11 text-sm" />
          </div>
          <div>
            <label className="text-text-secondary text-xs font-medium block mb-1.5">Email <span className="text-brand-accent">*</span></label>
            <input type="email" placeholder="ban@example.com" className="input-field h-11 text-sm" />
          </div>
          <div>
            <label className="text-text-secondary text-xs font-medium block mb-1.5">Mat khau <span className="text-brand-accent">*</span></label>
            <input type="password" placeholder="Toi thieu 8 ky tu" className="input-field h-11 text-sm" />
          </div>
          <Link href="/admin" className="btn-primary w-full justify-center h-11 text-sm">
            Tao tai khoan <ArrowRight size={15} />
          </Link>
        </div>
        <p className="text-center text-text-muted text-xs">
          Da co tai khoan? <Link href="/login" className="text-brand-accent hover:underline font-medium">Dang nhap</Link>
        </p>
      </div>
    </div>
  )
}
