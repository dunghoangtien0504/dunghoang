'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, Search, Filter, Download, ChevronDown, MoreHorizontal, RefreshCw, DollarSign, CheckCircle, Clock, ExternalLink, Plus } from 'lucide-react'
import { ORDERS, ORDER_STATUS_CONFIG, PAYMENT_METHOD_CONFIG, KPI } from '@/lib/constants'
import { useToast } from '@/components/ui/Toast'
import type { Order } from '@/types'

export default function OrdersPage() {
  const [statusFilter, setStatusFilter] = useState<'all' | Order['status']>('all')
  const [search, setSearch] = useState('')
  const { toast } = useToast()

  const filtered = ORDERS.filter(o => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false
    if (search && !o.customer.toLowerCase().includes(search.toLowerCase()) &&
        !o.email.toLowerCase().includes(search.toLowerCase()) &&
        !o.id.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const stats = {
    revenue:   ORDERS.filter(o => o.status === 'completed').reduce((s, o) => s + o.amount, 0),
    completed: ORDERS.filter(o => o.status === 'completed').length,
    pending:   ORDERS.filter(o => o.status === 'pending').length,
    refunded:  ORDERS.filter(o => o.status === 'refunded').length,
  }

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Quản lý Đơn hàng</h1>
          <p className="page-subtitle">{KPI.orders} đơn hàng tháng này</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="btn-secondary text-xs py-1.5"
            onClick={() => toast.success('Dang xuat...', 'File Excel se tai xuong trong giay lat')}
          >
            <Download size={12} />Xuất Excel
          </button>
          <button
            className="btn-primary text-xs py-1.5"
            onClick={() => toast.info('Coming soon', 'Tinh nang tao don thu cong dang phat trien')}
          >
            <Plus size={12} />Tạo đơn
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Tổng doanh thu',  value: `${(stats.revenue/1_000_000).toFixed(0)}M₫`, icon: DollarSign,   color: 'text-brand-accent', bg: 'bg-brand-accent/10' },
          { label: 'Đơn hoàn thành', value: String(stats.completed),                        icon: CheckCircle,  color: 'text-success',      bg: 'bg-success-light' },
          { label: 'Chờ xử lý',      value: String(stats.pending),                          icon: Clock,        color: 'text-brand-olive',  bg: 'bg-brand-olive/10' },
          { label: 'Hoàn tiền',       value: String(stats.refunded),                         icon: RefreshCw,    color: 'text-danger',       bg: 'bg-danger-light' },
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

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="relative max-w-xs flex-1">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Tìm theo mã, tên, email..."
            className="input-field pl-9 text-xs h-9"
          />
        </div>
        <div className="flex items-center gap-1 bg-surface border border-border rounded-lg p-1 shadow-card">
          {(['all','completed','pending','refunded'] as const).map(f => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                statusFilter === f ? 'bg-brand-dark text-text-on-dark' : 'text-text-muted hover:text-text-primary'
              }`}
            >
              {f === 'all' ? 'Tất cả' : ORDER_STATUS_CONFIG[f].label}
            </button>
          ))}
        </div>
        <button className="btn-secondary text-xs py-2">
          <Filter size={12} />Phương thức<ChevronDown size={11} />
        </button>
      </div>

      {/* Table */}
      <div className="card card-hover">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="table-header">Mã đơn</th>
                <th className="table-header">Khách hàng</th>
                <th className="table-header">Khoá học</th>
                <th className="table-header text-right">Số tiền</th>
                <th className="table-header">Thanh toán</th>
                <th className="table-header">Trạng thái</th>
                <th className="table-header">Thời gian</th>
                <th className="table-header"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => {
                const sc = ORDER_STATUS_CONFIG[order.status]
                const mc = PAYMENT_METHOD_CONFIG[order.method]
                return (
                  <tr key={order.id} className="table-row">
                    <td className="table-cell">
                      <span className="text-text-primary text-xs font-mono font-semibold">{order.id}</span>
                    </td>
                    <td className="table-cell">
                      {/* Cross-link → CRM */}
                      <Link
                        href={`/admin/crm/contacts?search=${encodeURIComponent(order.email)}`}
                        className="group"
                      >
                        <p className="text-text-primary text-xs font-medium group-hover:text-brand-accent transition-colors">
                          {order.customer}
                        </p>
                        <p className="text-text-muted text-[10px] flex items-center gap-1">
                          {order.email}
                          <ExternalLink size={8} className="opacity-0 group-hover:opacity-60 transition-opacity" />
                        </p>
                      </Link>
                    </td>
                    <td className="table-cell">
                      <span className="text-text-secondary text-xs truncate max-w-[200px] block">{order.courseTitle}</span>
                    </td>
                    <td className="table-cell text-right">
                      <span className="text-brand-accent font-mono font-semibold text-xs">
                        {order.amount.toLocaleString('vi-VN')}₫
                      </span>
                    </td>
                    <td className="table-cell">
                      <span className={`badge text-[10px] ${mc.badge}`}>{order.method}</span>
                    </td>
                    <td className="table-cell">
                      <span className={`badge text-[10px] ${sc.badge}`}>{sc.label}</span>
                    </td>
                    <td className="table-cell text-text-muted text-[11px]">{order.createdAt}</td>
                    <td className="table-cell">
                      <button className="btn-ghost p-1"><MoreHorizontal size={13} /></button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs text-text-muted">
          <span>Hiển thị {filtered.length} / {KPI.orders} đơn hàng</span>
          <div className="flex items-center gap-1">
            {[1,2,3,'…',57].map((p, i) => (
              <button key={i} className={`w-7 h-7 rounded flex items-center justify-center text-xs transition-colors ${p === 1 ? 'bg-brand-dark text-text-on-dark font-medium' : 'hover:bg-surface-3 text-text-muted'}`}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
