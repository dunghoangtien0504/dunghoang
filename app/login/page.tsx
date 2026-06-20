'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, ArrowRight, BookOpen, Users, BarChart3, Mail, Shield } from 'lucide-react'

const FEATURES = [
  { icon: BookOpen,  text: 'Quản lý khoá học & học viên' },
  { icon: BarChart3, text: 'Analytics & báo cáo doanh thu' },
  { icon: Mail,      text: 'Email marketing tự động' },
  { icon: Users,     text: 'CRM & pipeline bán hàng' },
]

const STATS = [
  { value: '605+', label: 'Học viên' },
  { value: '809M', label: 'Doanh thu' },
  { value: '5',    label: 'Khoá học' },
]

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) { setError('Vui lòng nhập đầy đủ thông tin.'); return }
    setLoading(true)
    setError('')
    await new Promise(r => setTimeout(r, 900))
    setLoading(false)
    window.location.href = '/admin'
  }

  return (
    <div className="min-h-dvh flex">
      {/* ── Cột trái: brand ────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[52%] bg-brand-dark flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-brand-accent/5" />
        <div className="absolute -bottom-40 -left-20 w-80 h-80 rounded-full bg-white/3" />
        <div className="absolute top-1/2 right-0 w-px h-32 bg-white/10" />

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-accent flex items-center justify-center shadow-btn">
              <span className="text-white font-bold text-base font-mono">DH</span>
            </div>
            <div>
              <p className="text-text-on-dark font-bold text-lg leading-tight">DungHoang.com</p>
              <p className="text-text-on-dark-2 text-xs">Nền tảng khoá học All-In-One</p>
            </div>
          </div>
        </div>

        {/* Headline */}
        <div className="relative z-10 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-brand-accent/15 border border-brand-accent/20 rounded-full px-3 py-1.5 text-xs text-brand-accent font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
              Nền tảng cho người Việt
            </div>
            <h1 className="text-4xl font-bold text-text-on-dark leading-tight tracking-tight">
              Quản lý toàn bộ<br />
              <span className="text-brand-accent">kinh doanh số</span><br />
              trong một nơi
            </h1>
            <p className="text-text-on-dark-2 text-base leading-relaxed max-w-sm">
              Từ khoá học đến CRM, email marketing đến affiliate. Thay thế 8+ công cụ với chi phí gần bằng $0.
            </p>
          </div>

          {/* Feature list */}
          <ul className="space-y-3">
            {FEATURES.map((f) => {
              const Icon = f.icon
              return (
                <li key={f.text} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-white/8 flex items-center justify-center flex-shrink-0">
                    <Icon size={14} className="text-text-on-dark-2" />
                  </div>
                  <span className="text-text-on-dark-2 text-sm">{f.text}</span>
                </li>
              )
            })}
          </ul>

          {/* Stats */}
          <div className="flex items-center gap-6 pt-2 border-t border-white/10">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="text-text-on-dark font-bold text-xl font-mono">{s.value}</p>
                <p className="text-text-on-dark-2 text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <div className="relative z-10 bg-white/5 border border-white/10 rounded-2xl p-4">
          <p className="text-text-on-dark-2 text-sm leading-relaxed italic">
            "Từ khi dùng DungHoang.com, doanh thu tăng 300% chỉ trong 3 tháng."
          </p>
          <div className="flex items-center gap-2.5 mt-3">
            <div className="w-7 h-7 rounded-full bg-brand-accent flex items-center justify-center">
              <span className="text-white text-xs font-bold">MT</span>
            </div>
            <div>
              <p className="text-text-on-dark text-xs font-semibold">Minh Tuấn</p>
              <p className="text-text-on-dark-2 text-[10px]">Affiliate Marketer</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Cột phải: form đăng nhập ─────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-brand-accent flex items-center justify-center">
              <span className="text-white font-bold text-sm font-mono">DH</span>
            </div>
            <span className="text-text-primary font-bold">DungHoang.com</span>
          </div>

          <div className="mb-8">
            <h2 className="text-text-primary text-2xl font-bold tracking-tight">Đăng nhập</h2>
            <p className="text-text-muted text-sm mt-1">Truy cập vào bảng điều khiển của bạn</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Email */}
            <div>
              <label htmlFor="email" className="text-text-secondary text-xs font-medium block mb-1.5">
                Email <span className="text-brand-accent">*</span>
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="ban@example.com"
                className="input-field h-11 text-sm"
              />
            </div>

            {/* Mật khẩu */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="text-text-secondary text-xs font-medium">
                  Mật khẩu <span className="text-brand-accent">*</span>
                </label>
                <Link href="/forgot-password" className="text-text-muted text-xs hover:text-brand-accent transition-colors">
                  Quên mật khẩu?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                  className="input-field h-11 text-sm pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors p-1"
                  aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Ghi nhớ */}
            <label className="flex items-center gap-2.5 cursor-pointer group">
              <div className="relative flex-shrink-0">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                  className="sr-only"
                  id="remember"
                />
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                  remember ? 'bg-brand-dark border-brand-dark' : 'border-border group-hover:border-brand-border'
                }`}>
                  {remember && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-text-secondary text-sm select-none">Ghi nhớ đăng nhập</span>
            </label>

            {/* Lỗi */}
            {error && (
              <div className="flex items-center gap-2 bg-danger-light border border-danger/20 rounded-lg px-3 py-2.5" role="alert">
                <Shield size={13} className="text-danger flex-shrink-0" />
                <p className="text-danger text-xs">{error}</p>
              </div>
            )}

            {/* Nút đăng nhập */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center h-11 text-sm font-semibold mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Đăng nhập <ArrowRight size={15} /></>
              )}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-border" />
            <span className="text-text-muted text-xs">hoặc</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <Link
            href="/admin"
            className="w-full flex items-center justify-center gap-2 h-11 bg-surface border border-border rounded-lg text-sm text-text-secondary hover:border-brand-border/40 hover:text-text-primary hover:bg-surface-2 transition-all shadow-card"
          >
            <BookOpen size={14} className="text-text-muted" />
            Xem demo (không cần tài khoản)
          </Link>

          <p className="text-center text-text-muted text-xs mt-6">
            Chưa có tài khoản?{' '}
            <Link href="/register" className="text-brand-accent hover:underline font-medium">
              Đăng ký miễn phí
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
