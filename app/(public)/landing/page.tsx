'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle, BookOpen, BarChart3, ShoppingCart, Mail, Users, Share2, Zap, Shield, Star } from 'lucide-react'

// ── Data ──────────────────────────────────────────────────────
const SOCIAL_PROOF = ['Affiliate Marketer', 'Content Creator', 'Online Coach', 'KOL/Influencer', 'Digital Agency', 'Startup Founder']

const FEATURES = [
  {
    tag: 'Khoa hoc & LMS',
    headline: 'Bán khóa học, quản lý học viên — không giới hạn',
    body: 'Video lessons qua YouTube, hệ thống quiz, chứng chỉ hoàn thành tự động. Tracking progress từng học viên. Tất cả trong một giao diện duy nhất.',
    icon: BookOpen,
    bullets: ['Video lessons YouTube', 'Quiz & bài kiểm tra', 'Chứng chỉ tự động', 'Progress tracking'],
    score: '4/5',
    visual: 'course',
    reverse: false,
  },
  {
    tag: 'Marketing Analytics',
    headline: 'Biết chính xác đâu là nguồn tiền của bạn',
    body: 'UTM tracking, funnel visualization, Meta Pixel + CAPI. 8 trang analytics riêng biệt giúp bạn tối ưu ngân sách quảng cáo đến từng đồng.',
    icon: BarChart3,
    bullets: ['UTM Tracking & Builder', 'Funnel Analytics', 'Meta Pixel + CAPI', 'Marketing Dashboard'],
    score: '8/8',
    visual: 'analytics',
    reverse: true,
  },
  {
    tag: 'CRM & Ban hang',
    headline: 'Pipeline bán hàng như một team sales thực sự',
    body: 'Lead scoring, pipeline deals với 7 giai đoạn, sale team management. Biết khách hàng nào sắp chốt, ai cần follow-up ngay hôm nay.',
    icon: ShoppingCart,
    bullets: ['Pipeline 7 stages', 'Lead scoring', 'Sale team management', 'QR Payment VN-native'],
    score: '8/8',
    visual: 'crm',
    reverse: false,
  },
  {
    tag: 'Email Marketing',
    headline: 'Email automation chạy bán hàng 24/7 khi bạn ngủ',
    body: 'Campaigns, automation flows, subscriber segmentation. Tích hợp Resend — gửi 3.000 email/tháng miễn phí, tỷ lệ vào inbox cao nhất hiện nay.',
    icon: Mail,
    bullets: ['Campaigns & Templates', 'Automation Flows', 'Subscriber Segmentation', 'Open/Click Analytics'],
    score: '∞',
    visual: 'email',
    reverse: true,
  },
]

const COMPARISON = [
  { feature: 'Khoa hoc + LMS',      dh: true,  kajabi: true,  teachable: true,  ghl: false },
  { feature: 'CRM + Pipeline',       dh: true,  kajabi: false, teachable: false, ghl: true  },
  { feature: 'Email Automation',     dh: true,  kajabi: true,  teachable: false, ghl: true  },
  { feature: 'UTM Tracking',         dh: true,  kajabi: false, teachable: false, ghl: true  },
  { feature: 'UTM Builder',          dh: true,  kajabi: false, teachable: false, ghl: false },
  { feature: 'Community Forum',      dh: true,  kajabi: true,  teachable: false, ghl: false },
  { feature: 'XP Gamification',      dh: true,  kajabi: false, teachable: false, ghl: false },
  { feature: 'QR Payment (VN)',       dh: true,  kajabi: false, teachable: false, ghl: false },
  { feature: 'JSON-LD Schema',       dh: true,  kajabi: false, teachable: false, ghl: false },
  { feature: 'So huu 100% code',     dh: true,  kajabi: false, teachable: false, ghl: false },
]

const TESTIMONIALS = [
  { name: 'Minh Tuan', role: 'Affiliate Marketer', rating: 5, quote: 'Tu khi dung DungHoang.com, doanh thu tang 300%. CRM va Email automation thuc su xit. Khong bao gio quay lai Kajabi nua.', metric: '+300% doanh thu', avatar: 'MT', size: 'lg' },
  { name: 'Thu Ha',    role: 'Content Creator',    rating: 5, quote: 'All-in-one tot nhat toi tung dung. Tiet kiem ca trieu moi thang.', metric: '5 tool thay 1', avatar: 'TH', size: 'sm' },
  { name: 'Duc Anh',   role: 'Online Coach',       rating: 5, quote: 'Analytics chi tiet, de dung. Biet chinh xac dau la nguon doanh thu chinh.', metric: '215 hoc vien', avatar: 'DA', size: 'sm' },
  { name: 'Lan Anh',   role: 'KOL / Influencer',   rating: 5, quote: 'Community + gamification giup hoc vien hoc deu hon nhieu. Ty le hoan thanh khoa hoc tang tu 40% len 82%.', metric: '82% hoan thanh', avatar: 'LA', size: 'md' },
]

const PRICING = [
  {
    name: 'Starter',
    price: '$0',
    period: '/thang',
    desc: 'Cho nguoi bat dau',
    highlight: false,
    features: ['Supabase free (500MB)', 'Vercel free', 'Resend 3k email/thang', '2 khoa hoc', '100 hoc vien'],
    cta: 'Bat dau mien phi',
  },
  {
    name: 'Pro',
    price: '$25',
    period: '/thang',
    desc: 'Cho creator nghiem tuc',
    highlight: true,
    features: ['Supabase Pro ($25)', 'Vercel Pro (free)', 'Resend Scale', 'Khong gioi han khoa hoc', 'Khong gioi han hoc vien', 'UTM & Pixel tracking', 'Email automation', 'Priority support'],
    cta: 'Bat dau 14 ngay mien phi',
  },
]

// ── Visual mock components ────────────────────────────────────
function CourseMock() {
  return (
    <div className="bg-brand-dark rounded-2xl p-5 shadow-card-lg">
      <div className="flex items-center justify-between mb-4">
        <span className="text-text-on-dark text-sm font-semibold">Quan ly Khoa hoc</span>
        <span className="badge bg-brand-accent text-white text-[10px]">5 khoa</span>
      </div>
      {[
        { title: 'Affiliate Marketing 2026', students: 215, revenue: '428M', progress: 85 },
        { title: 'Content System 10X',       students: 187, revenue: '278M', progress: 72 },
        { title: 'Email Marketing Pro',      students: 124, revenue: '122M', progress: 58 },
      ].map((c, i) => (
        <div key={i} className="bg-white/5 rounded-xl p-3 mb-2 last:mb-0">
          <div className="flex items-center justify-between mb-2">
            <p className="text-text-on-dark text-xs font-medium truncate mr-2">{c.title}</p>
            <span className="text-brand-accent text-xs font-mono flex-shrink-0">{c.revenue}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-brand-accent rounded-full" style={{ width: `${c.progress}%` }} />
            </div>
            <span className="text-text-on-dark-2 text-[10px] flex-shrink-0">{c.students} hoc vien</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function AnalyticsMock() {
  return (
    <div className="bg-brand-dark rounded-2xl p-5 shadow-card-lg">
      <p className="text-text-on-dark text-sm font-semibold mb-4">Marketing Analytics</p>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {[
          { label: 'Doanh thu', value: '809M', trend: '+24%' },
          { label: 'ROAS', value: '8.4x', trend: '+12%' },
          { label: 'CPL', value: '18K', trend: '-8%' },
          { label: 'Conversion', value: '4.2%', trend: '+1.1%' },
        ].map((m, i) => (
          <div key={i} className="bg-white/5 rounded-xl p-3">
            <p className="text-text-on-dark font-bold font-mono text-base">{m.value}</p>
            <div className="flex items-center justify-between mt-0.5">
              <p className="text-text-on-dark-2 text-[10px]">{m.label}</p>
              <span className={`text-[9px] font-medium ${m.trend.startsWith('+') ? 'text-green-400' : 'text-green-400'}`}>{m.trend}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-end gap-1 h-16">
        {[30, 45, 38, 60, 75, 55, 90, 145, 120, 98, 85, 45, 38, 22].map((v, i) => (
          <div key={i} className="flex-1 bg-brand-accent/70 rounded-sm" style={{ height: `${(v / 145) * 100}%` }} />
        ))}
      </div>
    </div>
  )
}

function CRMMock() {
  const stages = [
    { label: 'Moi vao', count: 145, color: 'bg-info' },
    { label: 'Lien he', count: 98,  color: 'bg-brand-olive' },
    { label: 'Quan tam', count: 67, color: 'bg-brand-border' },
    { label: 'Chot',    count: 34,  color: 'bg-success' },
  ]
  return (
    <div className="bg-brand-dark rounded-2xl p-5 shadow-card-lg">
      <p className="text-text-on-dark text-sm font-semibold mb-4">Pipeline Ban Hang</p>
      <div className="flex gap-2">
        {stages.map((s, i) => (
          <div key={i} className="flex-1 bg-white/5 rounded-xl p-3">
            <div className={`w-2 h-2 rounded-full ${s.color} mb-2`} />
            <p className="text-text-on-dark font-bold font-mono text-lg">{s.count}</p>
            <p className="text-text-on-dark-2 text-[9px]">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 space-y-2">
        {['Nguyen Van An — Affiliate (1.99M)', 'Tran Thi Binh — Content (1.49M)'].map((d, i) => (
          <div key={i} className="bg-white/5 rounded-lg px-3 py-2 flex items-center justify-between">
            <p className="text-text-on-dark-2 text-[10px]">{d}</p>
            <div className="w-1.5 h-1.5 rounded-full bg-success" />
          </div>
        ))}
      </div>
    </div>
  )
}

function EmailMock() {
  return (
    <div className="bg-brand-dark rounded-2xl p-5 shadow-card-lg">
      <p className="text-text-on-dark text-sm font-semibold mb-4">Email Marketing</p>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: 'Subscribers', value: '480' },
          { label: 'Open Rate', value: '29.5%' },
          { label: 'Click Rate', value: '1.3%' },
        ].map((m, i) => (
          <div key={i} className="bg-white/5 rounded-xl p-2.5 text-center">
            <p className="text-text-on-dark font-bold font-mono text-sm">{m.value}</p>
            <p className="text-text-on-dark-2 text-[9px] mt-0.5">{m.label}</p>
          </div>
        ))}
      </div>
      {['Google tang 4 thang Pro — 26% open', 'Update VEO3.1 OMNI — 30% open', 'Zoom WebAllInOne — 24% open'].map((c, i) => (
        <div key={i} className="flex items-center gap-2 mb-2 last:mb-0 bg-white/5 rounded-lg px-3 py-2">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-accent flex-shrink-0" />
          <p className="text-text-on-dark-2 text-[10px] truncate">{c}</p>
        </div>
      ))}
    </div>
  )
}

const VISUALS: Record<string, React.ReactNode> = {
  course:    <CourseMock />,
  analytics: <AnalyticsMock />,
  crm:       <CRMMock />,
  email:     <EmailMock />,
}

// ── Page ─────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div className="min-h-dvh bg-background text-text-primary">
      {/* ── Nav ── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-dark flex items-center justify-center shadow-btn">
              <span className="text-text-on-dark font-bold text-sm font-mono">DH</span>
            </div>
            <span className="text-text-primary font-bold text-base">DungHoang.com</span>
          </div>
          <div className="hidden md:flex items-center gap-5 text-sm text-text-secondary">
            <a href="#features"      className="hover:text-text-primary transition-colors">Tinh nang</a>
            <a href="#compare"       className="hover:text-text-primary transition-colors">So sanh</a>
            <a href="#testimonials"  className="hover:text-text-primary transition-colors">Danh gia</a>
            <a href="#pricing"       className="hover:text-text-primary transition-colors">Bang gia</a>
          </div>
          <div className="flex items-center gap-2.5">
            <Link href="/login"  className="btn-ghost text-sm px-3 py-2">Dang nhap</Link>
            <Link href="/admin"  className="btn-primary text-sm py-2">
              Dung thu mien phi <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="pt-28 pb-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/3 via-transparent to-brand-accent/3 pointer-events-none" />

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-brand-dark/8 border border-brand-border/20 rounded-full px-3.5 py-1.5 text-xs text-brand-border font-medium">
                <Zap size={12} className="text-brand-accent" />
                All-In-One cho nguoi Viet — chi phi $0-25/thang
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-text-primary">
                Ban khoa hoc.<br />
                <span className="text-brand-accent">Quan ly toan bo</span><br />
                kinh doanh so.
              </h1>

              <p className="text-text-secondary text-lg leading-relaxed max-w-md">
                Nen tang duy nhat ket hop: Khoa hoc + CRM + Email Automation + Marketing Analytics.
                Thay the <strong className="text-text-primary">8+ cong cu</strong> dang tra tien hang thang.
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                <Link href="/admin" className="btn-primary text-base px-6 py-3">
                  Bat dau mien phi <ArrowRight size={15} />
                </Link>
                <Link href="/admin" className="btn-secondary text-base px-6 py-3">
                  Xem demo <BookOpen size={15} />
                </Link>
              </div>

              {/* Social proof inline */}
              <div className="flex items-center gap-3 pt-2">
                <div className="flex -space-x-2">
                  {['MT', 'TH', 'DA', 'LA', 'PK'].map((init) => (
                    <div key={init} className="w-8 h-8 rounded-full bg-brand-dark border-2 border-background flex items-center justify-center">
                      <span className="text-text-on-dark text-[10px] font-bold">{init}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-0.5 mb-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} size={11} className="text-brand-olive fill-brand-olive" />)}
                  </div>
                  <p className="text-text-muted text-xs">600+ creator dang dung</p>
                </div>
              </div>
            </div>

            {/* Right: Dashboard preview */}
            <div className="relative lg:block hidden">
              <div className="absolute -inset-4 bg-gradient-to-br from-brand-accent/5 to-brand-border/5 rounded-3xl blur-2xl" />
              <div className="relative bg-brand-dark/5 border border-border rounded-2xl p-4">
                {/* Mock dashboard header */}
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border">
                  <div className="w-5 h-5 rounded bg-brand-accent flex items-center justify-center">
                    <span className="text-white text-[9px] font-bold">DH</span>
                  </div>
                  <span className="text-text-primary text-xs font-semibold">Admin Panel</span>
                  <div className="ml-auto flex items-center gap-1">
                    {['bg-brand-olive', 'bg-success', 'bg-brand-accent'].map((c, i) => (
                      <div key={i} className={`w-2 h-2 rounded-full ${c}`} />
                    ))}
                  </div>
                </div>
                {/* Stats row */}
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {[
                    { v: '809M', l: 'Doanh thu' },
                    { v: '454',  l: 'Don hang' },
                    { v: '605',  l: 'Hoc vien' },
                    { v: '1.78M',l: 'TB/don' },
                  ].map((s, i) => (
                    <div key={i} className="bg-surface rounded-lg p-2.5 border border-border text-center">
                      <p className="text-text-primary font-bold font-mono text-sm">{s.v}</p>
                      <p className="text-text-muted text-[9px]">{s.l}</p>
                    </div>
                  ))}
                </div>
                {/* Chart placeholder */}
                <div className="bg-surface rounded-xl p-3 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-text-secondary text-xs font-medium">Xu huong doanh thu</span>
                    <span className="badge badge-gray text-[9px]">30 ngay</span>
                  </div>
                  <div className="flex items-end gap-0.5 h-20">
                    {[20, 15, 35, 28, 48, 42, 95, 145, 120, 98, 85, 45, 38, 22].map((v, i) => (
                      <div key={i} className="flex-1 bg-brand-accent rounded-sm" style={{ height: `${(v/145)*100}%`, opacity: 0.7 + (i/14)*0.3 }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Social proof strip ── */}
      <section className="py-8 px-6 border-y border-border bg-surface/40">
        <div className="max-w-6xl mx-auto">
          <p className="text-text-muted text-xs text-center mb-5 uppercase tracking-widest">Duoc tin tuong boi</p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {SOCIAL_PROOF.map((role) => (
              <span key={role} className="text-text-muted text-sm font-medium hover:text-text-secondary transition-colors">
                {role}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features — Zig-zag (anti-slop: NOT 3-equal-card) ── */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-24">
          <div className="text-center mb-4">
            <p className="text-brand-border text-sm font-semibold uppercase tracking-wider mb-2">Tinh nang</p>
            <h2 className="text-3xl font-bold">Moi thu ban can — trong mot platform</h2>
          </div>

          {FEATURES.map((f, i) => {
            const Icon = f.icon
            return (
              <div key={i} className={`grid lg:grid-cols-2 gap-12 items-center ${f.reverse ? 'lg:flex lg:flex-row-reverse' : ''}`}>
                {/* Text side */}
                <div className="space-y-5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-brand-dark flex items-center justify-center">
                      <Icon size={16} className="text-text-on-dark" />
                    </div>
                    <span className="text-brand-border text-xs font-semibold uppercase tracking-wider">{f.tag}</span>
                    <span className="ml-auto badge bg-brand-olive/10 text-brand-olive border border-brand-olive/20 text-[10px]">{f.score} diem</span>
                  </div>

                  <h3 className="text-2xl font-bold leading-snug">{f.headline}</h3>
                  <p className="text-text-secondary leading-relaxed">{f.body}</p>

                  <ul className="space-y-2.5">
                    {f.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2.5 text-sm text-text-secondary">
                        <CheckCircle size={14} className="text-success flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <Link href="/admin" className="inline-flex items-center gap-2 text-brand-accent text-sm font-semibold hover:gap-3 transition-all">
                    Xem tinh nang nay <ArrowRight size={14} />
                  </Link>
                </div>

                {/* Visual side */}
                <div className={f.reverse ? 'lg:mr-12' : 'lg:ml-0'}>
                  {VISUALS[f.visual]}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Comparison ── */}
      <section id="compare" className="py-20 px-6 bg-surface/40 border-y border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-brand-border text-sm font-semibold uppercase tracking-wider mb-2">So sanh</p>
            <h2 className="text-3xl font-bold">43/44 diem — voi chi phi gan bang $0</h2>
            <p className="text-text-secondary mt-2">Trong khi doi thu thu $100-500/thang</p>
          </div>

          <div className="card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="table-header text-left w-[35%]">Tinh nang</th>
                  <th className="table-header text-center bg-brand-dark/3">
                    <span className="text-brand-accent font-bold">DungHoang</span>
                    <br /><span className="text-success text-[10px] font-normal normal-case">~$25/thang</span>
                  </th>
                  <th className="table-header text-center">
                    Kajabi<br /><span className="text-danger text-[10px] font-normal normal-case">$149-399</span>
                  </th>
                  <th className="table-header text-center">
                    Teachable<br /><span className="text-danger text-[10px] font-normal normal-case">$39-299</span>
                  </th>
                  <th className="table-header text-center">
                    GoHighLevel<br /><span className="text-danger text-[10px] font-normal normal-case">$97-497</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.feature} className="table-row">
                    <td className="table-cell font-medium text-text-secondary text-sm">{row.feature}</td>
                    {(['dh','kajabi','teachable','ghl'] as const).map((k) => (
                      <td key={k} className={`table-cell text-center ${k === 'dh' ? 'bg-brand-dark/2' : ''}`}>
                        {row[k]
                          ? <CheckCircle size={14} className={k === 'dh' ? 'text-brand-accent mx-auto' : 'text-success mx-auto'} />
                          : <span className="text-danger font-bold text-base">x</span>
                        }
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Testimonials — mixed sizes (anti-slop) ── */}
      <section id="testimonials" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-brand-border text-sm font-semibold uppercase tracking-wider mb-2">Danh gia</p>
            <h2 className="text-3xl font-bold">Creator noi gi ve DungHoang.com</h2>
          </div>

          {/* Asymmetric grid */}
          <div className="grid grid-cols-3 gap-4 items-start">
            {/* Large featured testimonial */}
            <div className="col-span-2 card p-6 border-brand-border/20 bg-brand-dark/2">
              <div className="flex items-center gap-1 mb-4">
                {[1,2,3,4,5].map(i => <Star key={i} size={14} className="text-brand-olive fill-brand-olive" />)}
              </div>
              <blockquote className="text-text-primary text-lg font-medium leading-relaxed mb-5">
                "{TESTIMONIALS[0].quote}"
              </blockquote>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-dark flex items-center justify-center">
                    <span className="text-text-on-dark font-bold">{TESTIMONIALS[0].avatar}</span>
                  </div>
                  <div>
                    <p className="text-text-primary font-semibold text-sm">{TESTIMONIALS[0].name}</p>
                    <p className="text-text-muted text-xs">{TESTIMONIALS[0].role}</p>
                  </div>
                </div>
                <div className="bg-brand-accent/10 border border-brand-accent/20 rounded-xl px-4 py-2 text-center">
                  <p className="text-brand-accent font-bold font-mono text-base">{TESTIMONIALS[0].metric}</p>
                </div>
              </div>
            </div>

            {/* Stack of small testimonials */}
            <div className="space-y-4">
              {TESTIMONIALS.slice(1, 3).map((t) => (
                <div key={t.name} className="card p-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[1,2,3,4,5].map(i => <Star key={i} size={10} className="text-brand-olive fill-brand-olive" />)}
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed mb-3">"{t.quote}"</p>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-brand-dark/10 border border-brand-dark/15 flex items-center justify-center">
                      <span className="text-brand-dark text-[10px] font-bold">{t.avatar}</span>
                    </div>
                    <div>
                      <p className="text-text-primary text-xs font-semibold">{t.name}</p>
                      <p className="text-text-muted text-[10px]">{t.role}</p>
                    </div>
                    <span className="ml-auto text-success text-[10px] font-semibold">{t.metric}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Medium testimonial spanning full width */}
            <div className="col-span-3 card p-5 border-brand-border/15">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-dark flex items-center justify-center flex-shrink-0">
                  <span className="text-text-on-dark font-bold">{TESTIMONIALS[3].avatar}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <p className="text-text-primary font-semibold text-sm">{TESTIMONIALS[3].name}</p>
                    <span className="text-text-muted text-xs">{TESTIMONIALS[3].role}</span>
                    <div className="flex items-center gap-0.5 ml-1">
                      {[1,2,3,4,5].map(i => <Star key={i} size={10} className="text-brand-olive fill-brand-olive" />)}
                    </div>
                    <span className="ml-auto badge badge-success text-[10px]">{TESTIMONIALS[3].metric}</span>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed">"{TESTIMONIALS[3].quote}"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-20 px-6 bg-surface/40 border-y border-border">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-brand-border text-sm font-semibold uppercase tracking-wider mb-2">Bang gia</p>
            <h2 className="text-3xl font-bold">Chi phi gan bang $0</h2>
            <p className="text-text-secondary mt-2">Chay tren free tier Supabase + Vercel + Resend</p>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {PRICING.map((plan) => (
              <div key={plan.name} className={`card p-6 flex flex-col gap-5 ${plan.highlight ? 'border-brand-accent/30 bg-brand-dark/2 shadow-card-md' : ''}`}>
                {plan.highlight && (
                  <div className="badge bg-brand-accent text-white text-xs w-fit">Pho bien nhat</div>
                )}
                <div>
                  <p className="text-text-primary font-bold text-lg">{plan.name}</p>
                  <p className="text-text-muted text-xs mt-0.5">{plan.desc}</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className={`font-bold font-mono text-4xl ${plan.highlight ? 'text-brand-accent' : 'text-text-primary'}`}>{plan.price}</span>
                  <span className="text-text-muted text-sm">{plan.period}</span>
                </div>
                <ul className="space-y-2 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-text-secondary">
                      <CheckCircle size={13} className="text-success flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/admin"
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${
                    plan.highlight ? 'btn-primary' : 'btn-secondary'
                  }`}
                >
                  {plan.cta} <ArrowRight size={13} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-brand-dark flex items-center justify-center mx-auto">
            <Zap size={22} className="text-text-on-dark" />
          </div>
          <h2 className="text-3xl font-bold">Bat dau hom nay — mien phi</h2>
          <p className="text-text-secondary text-lg">Khong can the tin dung. Setup trong 5 phut. Thay the ngay 8 tool dang tra tien moi thang.</p>
          <div className="flex items-center justify-center gap-4 pt-2">
            <Link href="/admin" className="btn-primary text-base px-8 py-3">
              Tao tai khoan mien phi <ArrowRight size={15} />
            </Link>
            <Link href="/login" className="btn-secondary text-base px-6 py-3">Dang nhap</Link>
          </div>
          <div className="flex items-center justify-center gap-6 pt-2 text-sm text-text-muted">
            <span className="flex items-center gap-1.5"><Shield size={13} />Bao mat SSL</span>
            <span className="flex items-center gap-1.5"><CheckCircle size={13} />Khong can credit card</span>
            <span className="flex items-center gap-1.5"><Zap size={13} />Chay ngay lap tuc</span>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border py-8 px-6 bg-surface/30">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-text-muted text-xs">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-brand-dark flex items-center justify-center">
              <span className="text-text-on-dark font-bold text-[10px] font-mono">DH</span>
            </div>
            <span>2026 DungHoang.com. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-text-primary transition-colors">Bao mat</a>
            <a href="#" className="hover:text-text-primary transition-colors">Dieu khoan</a>
            <a href="#" className="hover:text-text-primary transition-colors">Lien he</a>
            <Link href="/admin" className="hover:text-brand-accent transition-colors font-medium">Admin</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
