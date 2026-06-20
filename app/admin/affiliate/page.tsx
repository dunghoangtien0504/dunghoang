'use client'

import { useState } from 'react'
import {
  Share2, DollarSign, Users, CheckCircle, Clock, Plus, Search,
  MoreHorizontal, Copy, AlertTriangle, FileText, ChevronDown, X,
} from 'lucide-react'
import { AFFILIATES, KPI } from '@/lib/constants'

const TAX_THRESHOLD  = 2_000_000   // 2 triệu — ngưỡng phải khấu trừ 10%
const TAX_RATE       = 0.10
const MIN_PAYOUT     = 500_000     // 500k — ngưỡng rút tối thiểu

type PayoutModal = { affiliate: typeof AFFILIATES[0] } | null

function calcTax(gross: number) {
  const taxable = gross >= TAX_THRESHOLD
  const tax     = taxable ? Math.round(gross * TAX_RATE) : 0
  return { gross, tax, net: gross - tax, taxable }
}

function formatVND(n: number) {
  return n.toLocaleString('vi-VN') + '₫'
}

export default function AffiliatePage() {
  const [search,      setSearch]      = useState('')
  const [tab,         setTab]         = useState<'list' | 'payouts'>('list')
  const [payoutModal, setPayoutModal] = useState<PayoutModal>(null)

  const filtered = AFFILIATES.filter(a =>
    !search ||
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.email.toLowerCase().includes(search.toLowerCase())
  )

  const totalPending = AFFILIATES.reduce((s, a) => s + a.pending, 0)
  const stats = {
    total:   KPI.totalAffiliates,
    revenue: AFFILIATES.reduce((s, a) => s + a.revenue, 0),
    paid:    AFFILIATES.reduce((s, a) => s + a.paid, 0),
    pending: totalPending,
  }

  // Mock payouts
  const mockPayouts = AFFILIATES.slice(0, 3).map((a, i) => {
    const gross = a.pending
    const { tax, net, taxable } = calcTax(gross)
    return {
      id: `P00${i + 1}`, affiliate: a.name, email: a.email,
      gross, tax, net, taxable,
      bank: 'Vietcombank — 1234567890',
      status: i === 0 ? 'pending' : i === 1 ? 'approved' : 'paid',
      requestedAt: '20/06/2026',
    }
  })

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">Quản lý Affiliate</h1>
          <p className="page-subtitle">{stats.total} affiliates · Cookie 30 ngày · Rút tối thiểu {formatVND(MIN_PAYOUT)}</p>
        </div>
        <button className="btn-primary text-xs py-2"><Plus size={13} />Thêm Affiliate</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Tổng Affiliate',     value: String(stats.total),                          icon: Users,        color: 'text-info',         bg: 'bg-info-light' },
          { label: 'Doanh thu từ Aff.',  value: `${(stats.revenue/1_000_000).toFixed(0)}M₫`,  icon: DollarSign,   color: 'text-brand-accent', bg: 'bg-brand-accent/10' },
          { label: 'Hoa hồng đã trả',    value: `${(stats.paid/1_000_000).toFixed(1)}M₫`,     icon: CheckCircle,  color: 'text-success',      bg: 'bg-success-light' },
          { label: 'Chờ thanh toán',     value: `${(stats.pending/1_000_000).toFixed(1)}M₫`,  icon: Clock,        color: 'text-brand-olive',  bg: 'bg-brand-olive/10' },
        ].map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="bg-surface border border-border rounded-xl p-4 flex items-center gap-3 shadow-card">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.bg}`}>
                <Icon size={18} className={s.color} />
              </div>
              <div>
                <p className="text-text-primary font-bold font-mono text-lg">{s.value}</p>
                <p className="text-text-muted text-[11px]">{s.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Thuế TNCN notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
        <AlertTriangle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-semibold text-amber-800 mb-1">Luật khấu trừ thuế TNCN 10%</p>
          <p className="text-amber-700 text-xs leading-relaxed">
            Khi trả hoa hồng cho cá nhân <strong>từ 2.000.000₫ trở lên mỗi lần</strong>, phải khấu trừ 10% thuế TNCN trước khi chi.
            Ví dụ: hoa hồng 5.000.000₫ → giữ lại 500.000₫ nộp thuế, affiliate nhận 4.500.000₫.
            Cần gửi chứng từ khấu trừ cho affiliate sau khi trả.
          </p>
        </div>
      </div>

      {/* Commission settings */}
      <div className="card card-hover">
        <div className="flex items-center justify-between mb-3">
          <h3 className="section-title">Cài đặt hoa hồng</h3>
          <button className="btn-ghost text-xs">Chỉnh sửa</button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Khóa cao (Khóa 2, 1-kèm-1)', value: '10%',     color: 'text-brand-accent' },
            { label: 'Khóa thấp (Mini, Khóa 1)',    value: '20%',     color: 'text-success' },
            { label: 'Cookie tracking',              value: '30 ngày', color: 'text-info' },
            { label: 'Rút tối thiểu',                value: '500k',    color: 'text-brand-olive' },
          ].map(s => (
            <div key={s.label} className="bg-surface-2 border border-border rounded-xl p-3 text-center">
              <p className={`text-2xl font-bold font-mono ${s.color}`}>{s.value}</p>
              <p className="text-text-muted text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-surface-2 border border-border rounded-xl p-1 w-fit">
        {(['list', 'payouts'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${tab === t ? 'bg-white shadow text-text-primary border border-border' : 'text-text-muted hover:text-text-primary'}`}
          >
            {t === 'list' ? 'Danh sách Affiliate' : 'Yêu cầu rút tiền'}
            {t === 'payouts' && mockPayouts.filter(p => p.status === 'pending').length > 0 && (
              <span className="ml-1.5 bg-brand-accent text-white text-[9px] px-1.5 py-0.5 rounded-full">
                {mockPayouts.filter(p => p.status === 'pending').length}
              </span>
            )}
          </button>
        ))}
      </div>

      {tab === 'list' && (
        <div className="card card-hover">
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-title">Danh sách Affiliate</h3>
            <div className="relative">
              <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm affiliate..." className="input-field pl-8 text-xs h-8 w-48" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="table-header">Affiliate</th>
                  <th className="table-header">Mã giới thiệu</th>
                  <th className="table-header text-right">Hoa hồng</th>
                  <th className="table-header text-right">Referrals</th>
                  <th className="table-header text-right">Doanh thu</th>
                  <th className="table-header text-right">Đã trả</th>
                  <th className="table-header text-right">Chờ TT</th>
                  <th className="table-header">CCCD/Thuế</th>
                  <th className="table-header">Trạng thái</th>
                  <th className="table-header"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => {
                  const { taxable } = calcTax(a.pending)
                  return (
                    <tr key={a.id} className="table-row">
                      <td className="table-cell">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-brand-dark/10 border border-brand-dark/15 flex items-center justify-center flex-shrink-0">
                            <span className="text-brand-dark text-[10px] font-bold">{a.name.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="text-text-primary text-xs font-medium">{a.name}</p>
                            <p className="text-text-muted text-[10px]">{a.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="table-cell">
                        <div className="flex items-center gap-1.5">
                          <code className="bg-surface-2 border border-border px-2 py-0.5 rounded text-[10px] font-mono text-text-primary">{a.code}</code>
                          <button className="btn-ghost p-0.5"><Copy size={10} /></button>
                        </div>
                      </td>
                      <td className="table-cell text-right font-mono text-brand-accent font-semibold text-xs">{a.commission}%</td>
                      <td className="table-cell text-right font-mono text-sm">{a.referrals}</td>
                      <td className="table-cell text-right font-mono text-xs">{(a.revenue/1_000_000).toFixed(1)}M₫</td>
                      <td className="table-cell text-right font-mono text-success text-xs">{(a.paid/1_000_000).toFixed(1)}M₫</td>
                      <td className="table-cell text-right">
                        <div className="flex flex-col items-end">
                          <span className="font-mono text-xs text-brand-olive">{(a.pending/1_000_000).toFixed(1)}M₫</span>
                          {taxable && (
                            <span className="text-[9px] text-amber-600 font-medium">−10% thuế</span>
                          )}
                        </div>
                      </td>
                      <td className="table-cell">
                        {/* Mock: có hoặc chưa có CCCD */}
                        {a.id % 2 === 0
                          ? <span className="text-[10px] text-success flex items-center gap-1"><CheckCircle size={10} />Đã có</span>
                          : <span className="text-[10px] text-amber-600 flex items-center gap-1"><AlertTriangle size={10} />Chưa có</span>
                        }
                      </td>
                      <td className="table-cell">
                        {a.status === 'active'
                          ? <span className="badge badge-success text-[10px]">Active</span>
                          : <span className="badge badge-gray text-[10px]">Tạm dừng</span>
                        }
                      </td>
                      <td className="table-cell">
                        <button
                          onClick={() => setPayoutModal({ affiliate: a })}
                          className="btn-ghost p-1 text-[10px] text-brand-accent hover:bg-brand-accent/10"
                          title="Tạo lệnh trả"
                        >
                          <DollarSign size={13} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'payouts' && (
        <div className="card card-hover">
          <h3 className="section-title mb-4">Yêu cầu rút tiền</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="table-header">Affiliate</th>
                  <th className="table-header text-right">Hoa hồng gộp</th>
                  <th className="table-header text-right">Thuế 10%</th>
                  <th className="table-header text-right">Thực nhận</th>
                  <th className="table-header">Ngân hàng</th>
                  <th className="table-header">Ngày YC</th>
                  <th className="table-header">Trạng thái</th>
                  <th className="table-header">Chứng từ</th>
                  <th className="table-header"></th>
                </tr>
              </thead>
              <tbody>
                {mockPayouts.map(p => (
                  <tr key={p.id} className="table-row">
                    <td className="table-cell">
                      <p className="text-xs font-medium text-text-primary">{p.affiliate}</p>
                      <p className="text-[10px] text-text-muted">{p.email}</p>
                    </td>
                    <td className="table-cell text-right font-mono text-xs">{formatVND(p.gross)}</td>
                    <td className="table-cell text-right font-mono text-xs text-amber-600">
                      {p.taxable ? `−${formatVND(p.tax)}` : <span className="text-text-muted">—</span>}
                    </td>
                    <td className="table-cell text-right font-mono text-xs font-bold text-success">{formatVND(p.net)}</td>
                    <td className="table-cell text-[10px] text-text-muted">{p.bank}</td>
                    <td className="table-cell text-[10px] text-text-muted">{p.requestedAt}</td>
                    <td className="table-cell">
                      {p.status === 'pending'  && <span className="badge badge-warning text-[10px]">Chờ duyệt</span>}
                      {p.status === 'approved' && <span className="badge badge-info text-[10px]">Đã duyệt</span>}
                      {p.status === 'paid'     && <span className="badge badge-success text-[10px]">Đã trả</span>}
                    </td>
                    <td className="table-cell">
                      {p.status === 'paid'
                        ? <button className="flex items-center gap-1 text-[10px] text-brand-accent hover:underline"><FileText size={10} />Tải CT</button>
                        : <span className="text-[10px] text-text-muted">—</span>
                      }
                    </td>
                    <td className="table-cell">
                      {p.status === 'pending' && (
                        <div className="flex gap-1">
                          <button className="text-[10px] px-2 py-1 bg-success/10 text-success rounded hover:bg-success/20 font-medium">Duyệt</button>
                          <button className="text-[10px] px-2 py-1 bg-red-50 text-red-500 rounded hover:bg-red-100 font-medium">Từ chối</button>
                        </div>
                      )}
                      {p.status === 'approved' && (
                        <button className="text-[10px] px-2 py-1 bg-brand-accent/10 text-brand-accent rounded hover:bg-brand-accent/20 font-medium">Xác nhận đã trả</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Payout modal */}
      {payoutModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="font-semibold text-text-primary">Tạo lệnh thanh toán</h3>
              <button onClick={() => setPayoutModal(null)} className="btn-ghost p-1"><X size={16} /></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="bg-surface-2 rounded-xl p-4">
                <p className="text-sm font-medium text-text-primary">{payoutModal.affiliate.name}</p>
                <p className="text-xs text-text-muted">{payoutModal.affiliate.email}</p>
              </div>

              {(() => {
                const { gross, tax, net, taxable } = calcTax(payoutModal.affiliate.pending)
                const canPayout = gross >= MIN_PAYOUT
                return (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-text-muted">Hoa hồng gộp</span>
                        <span className="font-mono font-medium">{formatVND(gross)}</span>
                      </div>
                      {taxable ? (
                        <div className="flex justify-between text-sm">
                          <span className="text-amber-600 flex items-center gap-1"><AlertTriangle size={12} />Thuế TNCN 10%</span>
                          <span className="font-mono text-amber-600">−{formatVND(tax)}</span>
                        </div>
                      ) : (
                        <div className="flex justify-between text-sm">
                          <span className="text-text-muted">Thuế TNCN</span>
                          <span className="text-text-muted text-xs">Dưới ngưỡng 2.000.000₫ — miễn</span>
                        </div>
                      )}
                      <div className="border-t border-border pt-2 flex justify-between">
                        <span className="font-semibold text-text-primary">Thực nhận</span>
                        <span className="font-mono font-bold text-success text-lg">{formatVND(net)}</span>
                      </div>
                    </div>

                    {!canPayout && (
                      <div className="bg-red-50 border border-red-100 rounded-lg p-3 text-xs text-red-600">
                        Chưa đủ ngưỡng rút tối thiểu {formatVND(MIN_PAYOUT)}. Hiện có: {formatVND(gross)}.
                      </div>
                    )}

                    {taxable && (
                      <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 text-xs text-amber-700">
                        Phải khấu trừ 10% thuế TNCN và gửi chứng từ khấu trừ cho affiliate sau khi trả.
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <button onClick={() => setPayoutModal(null)} className="flex-1 btn-ghost text-sm py-2">Hủy</button>
                      <button
                        disabled={!canPayout}
                        className="flex-1 btn-primary text-sm py-2 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Xác nhận trả {formatVND(net)}
                      </button>
                    </div>
                  </>
                )
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
