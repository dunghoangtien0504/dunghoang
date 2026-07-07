'use client'

import { useState, useEffect, useCallback } from 'react'
import { Share2, DollarSign, Users, CheckCircle, Clock, Copy, RefreshCw, AlertTriangle, Link2 } from 'lucide-react'

const TAX_THRESHOLD = 2_000_000
const TAX_RATE      = 0.10
const MIN_PAYOUT    = 500_000

type Affiliate = {
  id: string
  name: string | null
  full_name: string | null
  email: string
  ref_code: string
  commission_pct: number
  total_referrals: number
  total_revenue: number
  total_commission: number
  pending_commission: number
  paid_commission: number
  status: string
  joined_at: string
  cccd: string | null
  bank_account: string | null
  bank_name: string | null
  phone: string | null
  dashboard_url: string
}

function fmtVND(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M₫`
  if (n >= 1_000)     return `${(n / 1_000).toFixed(0)}k₫`
  return `${n}₫`
}

function calcTax(gross: number) {
  const taxable = gross >= TAX_THRESHOLD
  return { gross, tax: taxable ? Math.round(gross * TAX_RATE) : 0, taxable }
}

export default function AffiliatePage() {
  const [affiliates, setAffiliates] = useState<Affiliate[]>([])
  const [loading, setLoading]       = useState(true)
  const [search, setSearch]         = useState('')
  const [copied, setCopied]         = useState<string | null>(null)

  const load = useCallback(() => {
    setLoading(true)
    fetch('/api/admin/affiliates')
      .then(r => r.json())
      .then(d => setAffiliates(d.affiliates ?? []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { load() }, [load])

  function copyCode(code: string) {
    navigator.clipboard.writeText(code)
    setCopied(code)
    setTimeout(() => setCopied(null), 1500)
  }

  function copyDashboardLink(id: string, url: string) {
    navigator.clipboard.writeText(url)
    setCopied(`dash-${id}`)
    setTimeout(() => setCopied(null), 1500)
  }

  const filtered = affiliates.filter(a =>
    !search ||
    (a.name ?? a.email).toLowerCase().includes(search.toLowerCase()) ||
    a.email.toLowerCase().includes(search.toLowerCase()) ||
    a.ref_code.toLowerCase().includes(search.toLowerCase())
  )

  const totalRevenue  = affiliates.reduce((s, a) => s + a.total_revenue, 0)
  const totalPending  = affiliates.reduce((s, a) => s + a.pending_commission, 0)
  const totalPaid     = affiliates.reduce((s, a) => s + a.paid_commission, 0)

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">Quản lý Affiliate</h1>
          <p className="page-subtitle">{loading ? '...' : affiliates.length} affiliate · {fmtVND(totalRevenue)} doanh thu từ giới thiệu</p>
        </div>
        <button onClick={load} disabled={loading} className="btn-primary text-xs py-1.5">
          <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />Làm mới
        </button>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Tổng Affiliate', value: loading ? '...' : String(affiliates.length), icon: Users,       color: 'text-info', bg: 'bg-info-light' },
          { label: 'Doanh thu từ Aff.', value: loading ? '...' : fmtVND(totalRevenue),   icon: Share2,      color: 'text-brand-border', bg: 'bg-brand-border/10' },
          { label: 'Hoa hồng đã trả', value: loading ? '...' : fmtVND(totalPaid),        icon: CheckCircle, color: 'text-success', bg: 'bg-success-light' },
          { label: 'Chờ thanh toán',   value: loading ? '...' : fmtVND(totalPending),    icon: Clock,       color: 'text-brand-olive', bg: 'bg-brand-olive/10' },
        ].map(s => {
          const Icon = s.icon
          return (
            <div key={s.label} className="bg-surface border border-border rounded-xl p-4 shadow-card flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${s.bg}`}>
                <Icon size={18} className={s.color} />
              </div>
              <div>
                <p className="text-text-muted text-xs">{s.label}</p>
                <p className="font-bold text-text-primary text-xl font-mono">{s.value}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Tax notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <AlertTriangle size={15} className="text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-amber-800 leading-relaxed">
          <span className="font-semibold">Luật khấu trừ thuế TNCN 10%</span> — Khi trả hoa hồng từ 2.000.000₫/lần
          phải khấu trừ 10% trước khi chi. Ví dụ: hoa hồng 5.000.000₫ → giữ 500.000₫ nộp thuế, affiliate nhận 4.500.000₫.
        </div>
      </div>

      {/* Config */}
      <div className="card card-hover">
        <div className="flex items-center justify-between mb-4">
          <h3 className="section-title">Cài đặt hoa hồng</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Khoá cao (Coaching)', value: '10%', color: 'text-brand-accent' },
            { label: 'Khoá thấp (Mini, Khóa 1)', value: '20%', color: 'text-success' },
            { label: 'Cookie tracking', value: '30 ngày', color: 'text-brand-border' },
            { label: 'Rút tối thiểu', value: `${fmtVND(MIN_PAYOUT)}`, color: 'text-brand-olive' },
          ].map(s => (
            <div key={s.label} className="bg-surface-2 border border-border rounded-xl p-3 text-center">
              <p className={`text-xl font-bold font-mono ${s.color}`}>{s.value}</p>
              <p className="text-text-muted text-[10px] mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Share2 size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Tìm affiliate..."
          className="input-field pl-9 text-xs w-full"
        />
      </div>

      {/* Table */}
      <div className="card card-hover overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="table-header text-left">Affiliate</th>
              <th className="table-header">Mã giới thiệu</th>
              <th className="table-header text-right">Hoa hồng</th>
              <th className="table-header text-right">Referrals</th>
              <th className="table-header text-right">Doanh thu</th>
              <th className="table-header text-right">Đã trả</th>
              <th className="table-header text-right">Chờ TT</th>
              <th className="table-header text-center">Trạng thái</th>
              <th className="table-header text-center">Dashboard</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={9} className="py-10 text-center text-text-muted text-xs">
                  <RefreshCw size={16} className="animate-spin mx-auto mb-2" />Đang tải...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-10 text-center">
                  <p className="text-text-muted text-sm">Chưa có affiliate nào</p>
                  <p className="text-text-muted text-xs mt-1">Affiliate sẽ xuất hiện khi học viên đăng ký qua trang CTV</p>
                </td>
              </tr>
            ) : (
              filtered.map(a => {
                const { tax, taxable } = calcTax(a.pending_commission)
                const displayName = a.full_name ?? a.name ?? a.email.split('@')[0]
                const joinDate = new Date(a.joined_at).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: '2-digit' })
                return (
                  <tr key={a.id} className="table-row">
                    <td className="table-cell">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-brand-dark/10 flex items-center justify-center text-xs font-bold text-brand-dark flex-shrink-0">
                          {displayName[0]?.toUpperCase()}
                        </div>
                        <div>
                          <p className="text-xs font-medium text-text-primary">{displayName}</p>
                          <p className="text-[10px] text-text-muted">{a.email}</p>
                          <p className="text-[9px] text-text-muted">Tham gia {joinDate}</p>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell text-center">
                      <div className="flex items-center justify-center gap-1">
                        <code className="bg-surface-2 border border-border rounded px-2 py-0.5 text-xs font-mono text-text-primary">
                          {a.ref_code}
                        </code>
                        <button
                          onClick={() => copyCode(a.ref_code)}
                          className="text-text-muted hover:text-brand-dark p-0.5 transition-colors"
                          title="Copy"
                        >
                          <Copy size={11} />
                        </button>
                        {copied === a.ref_code && (
                          <span className="text-[9px] text-success">Đã copy!</span>
                        )}
                      </div>
                    </td>
                    <td className="table-cell text-right font-semibold text-brand-accent">{a.commission_pct}%</td>
                    <td className="table-cell text-right font-mono">{a.total_referrals}</td>
                    <td className="table-cell text-right font-mono text-xs">{fmtVND(a.total_revenue)}</td>
                    <td className="table-cell text-right">
                      <span className="text-success font-mono text-xs">{fmtVND(a.paid_commission)}</span>
                      {!a.cccd && <p className="text-[9px] text-text-muted">Chưa có CCCD</p>}
                    </td>
                    <td className="table-cell text-right">
                      {a.pending_commission > 0 ? (
                        <>
                          <span className="text-brand-olive font-mono text-xs font-semibold">{fmtVND(a.pending_commission)}</span>
                          {taxable && (
                            <p className="text-[9px] text-danger">−{fmtVND(tax)} thuế</p>
                          )}
                        </>
                      ) : (
                        <span className="text-text-muted text-xs">0₫</span>
                      )}
                    </td>
                    <td className="table-cell text-center">
                      <span className={`badge text-[10px] ${a.status === 'active' ? 'badge-success' : 'badge-gray'}`}>
                        {a.status === 'active' ? 'Active' : 'Tạm dừng'}
                      </span>
                    </td>
                    <td className="table-cell text-center">
                      <button
                        onClick={() => copyDashboardLink(a.id, a.dashboard_url)}
                        className="inline-flex items-center gap-1 text-[10px] text-brand-dark hover:text-brand-accent border border-border rounded-lg px-2 py-1 transition-colors"
                        title="Copy link dashboard CTV (kèm token đăng nhập)"
                      >
                        <Link2 size={11} />
                        {copied === `dash-${a.id}` ? 'Đã copy!' : 'Copy link'}
                      </button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
