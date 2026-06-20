'use client'

import { useState } from 'react'
import { Share2, DollarSign, Users, CheckCircle, Clock, Plus, Search, MoreHorizontal, Copy } from 'lucide-react'
import { AFFILIATES, KPI } from '@/lib/constants'

export default function AffiliatePage() {
  const [search, setSearch] = useState('')

  const filtered = AFFILIATES.filter(a =>
    !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.email.toLowerCase().includes(search.toLowerCase())
  )

  const stats = {
    total:    KPI.totalAffiliates,
    revenue:  AFFILIATES.reduce((s, a) => s + a.revenue, 0),
    paid:     AFFILIATES.reduce((s, a) => s + a.paid, 0),
    pending:  AFFILIATES.reduce((s, a) => s + a.pending, 0),
  }

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">Quản lý Affiliate</h1>
          <p className="page-subtitle">{stats.total} affiliates đang hoạt động</p>
        </div>
        <button className="btn-primary text-xs py-2"><Plus size={13} />Thêm Affiliate</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Tổng Affiliate',       value: String(stats.total),                              icon: Users,        color: 'text-info',         bg: 'bg-info-light' },
          { label: 'Doanh thu từ Aff.',     value: `${(stats.revenue/1_000_000).toFixed(0)}M₫`,     icon: DollarSign,   color: 'text-brand-accent', bg: 'bg-brand-accent/10' },
          { label: 'Hoa hồng đã trả',       value: `${(stats.paid/1_000_000).toFixed(1)}M₫`,        icon: CheckCircle,  color: 'text-success',      bg: 'bg-success-light' },
          { label: 'Chờ thanh toán',         value: `${(stats.pending/1_000_000).toFixed(1)}M₫`,     icon: Clock,        color: 'text-brand-olive',  bg: 'bg-brand-olive/10' },
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

      {/* Commission settings */}
      <div className="card card-hover">
        <div className="flex items-center justify-between mb-3">
          <h3 className="section-title">Cài đặt hoa hồng</h3>
          <button className="btn-ghost text-xs">Chỉnh sửa</button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Mặc định',         value: '20%',     color: 'text-brand-accent' },
            { label: 'Tùy chỉnh',        value: '1–50%',   color: 'text-success' },
            { label: 'Cookie tracking', value: '90 ngày', color: 'text-info' },
          ].map(s => (
            <div key={s.label} className="bg-surface-2 border border-border rounded-xl p-3 text-center">
              <p className={`text-2xl font-bold font-mono ${s.color}`}>{s.value}</p>
              <p className="text-text-muted text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
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
                <th className="table-header">Trạng thái</th>
                <th className="table-header"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
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
                  <td className="table-cell text-right font-mono text-brand-olive text-xs">{(a.pending/1_000_000).toFixed(1)}M₫</td>
                  <td className="table-cell">
                    {a.status==='active' ? <span className="badge badge-success text-[10px]">Active</span> : <span className="badge badge-gray text-[10px]">Tạm dừng</span>}
                  </td>
                  <td className="table-cell">
                    <button className="btn-ghost p-1"><MoreHorizontal size={13} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
