'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Filter, Download, ChevronDown, MoreHorizontal, RefreshCw, DollarSign, CheckCircle, Clock, ExternalLink, Plus } from 'lucide-react'
import { useToast } from '@/components/ui/Toast'
import { courseShortName } from '@/lib/products'

type RealOrder = {
  id:             string
  order_code:     string
  email:          string
  name:           string | null
  amount:         number
  course_id:      string | null
  course_name:    string | null
  status:         'pending' | 'completed' | 'refunded'
  affiliate_code: string | null
  commission:     number | null
  paid_at:        string | null
  created_at:     string
}

const STATUS_LABEL: Record<string, { label: string; badge: string }> = {
  completed: { label: 'Hoàn thành', badge: 'bg-success-light text-success' },
  pending:   { label: 'Chờ xử lý',  badge: 'bg-brand-olive/10 text-brand-olive' },
  refunded:  { label: 'Hoàn tiền',  badge: 'bg-danger-light text-danger' },
}

function fmtDateTime(iso: string | null) {
  if (!iso) return '-'
  return new Date(iso).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
}

export default function OrdersPage() {
  const [statusFilter, setStatusFilter] = useState<'all' | RealOrder['status']>('all')
  const [search, setSearch] = useState('')
  const [orders, setOrders] = useState<RealOrder[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  function load() {
    setLoading(true)
    fetch('/api/admin/orders')
      .then(r => r.json())
      .then(d => { setOrders(d.orders ?? []); setLoading(false) })
      .catch(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  const filtered = orders.filter(o => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false
    const q = search.toLowerCase()
    if (q && !(o.name || '').toLowerCase().includes(q) &&
        !o.email.toLowerCase().includes(q) &&
        !o.order_code.toLowerCase().includes(q)) return false
    return true
  })

  const stats = {
    revenue:   orders.filter(o => o.status === 'completed').reduce((s, o) => s + Number(o.amount), 0),
    completed: orders.filter(o => o.status === 'completed').length,
    pending:   orders.filter(o => o.status === 'pending').length,
    refunded:  orders.filter(o => o.status === 'refunded').length,
  }

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Quản lý Đơn hàng</h1>
          <p className="page-subtitle">{orders.length} đơn hàng · dữ liệu thật từ Supabase</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary text-xs py-1.5" onClick={load}>
            <RefreshCw size={12} />Làm mới
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
              {f === 'all' ? 'Tất cả' : STATUS_LABEL[f].label}
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
                <th className="table-header">Trạng thái</th>
                <th className="table-header">Thời gian</th>
                <th className="table-header"></th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={7} className="table-cell text-center text-text-muted py-10 text-sm">Đang tải...</td></tr>
              )}
              {!loading && filtered.length === 0 && (
                <tr><td colSpan={7} className="table-cell text-center text-text-muted py-10 text-sm">
                  {search || statusFilter !== 'all' ? 'Không tìm thấy đơn nào.' : 'Chưa có đơn hàng nào.'}
                </td></tr>
              )}
              {filtered.map((order) => {
                const sc = STATUS_LABEL[order.status] ?? STATUS_LABEL.pending
                return (
                  <tr key={order.id} className="table-row">
                    <td className="table-cell">
                      <span className="text-text-primary text-xs font-mono font-semibold">{order.order_code}</span>
                    </td>
                    <td className="table-cell">
                      <Link
                        href={`/admin/crm/contacts?search=${encodeURIComponent(order.email)}`}
                        className="group"
                      >
                        <p className="text-text-primary text-xs font-medium group-hover:text-brand-accent transition-colors">
                          {order.name || '(chưa rõ tên)'}
                        </p>
                        <p className="text-text-muted text-[10px] flex items-center gap-1">
                          {order.email}
                          <ExternalLink size={8} className="opacity-0 group-hover:opacity-60 transition-opacity" />
                        </p>
                      </Link>
                    </td>
                    <td className="table-cell">
                      <span className="text-text-secondary text-xs truncate max-w-[200px] block">
                        {order.course_id ? courseShortName(order.course_id) : (order.course_name || '-')}
                      </span>
                    </td>
                    <td className="table-cell text-right">
                      <span className="text-brand-accent font-mono font-semibold text-xs">
                        {Number(order.amount).toLocaleString('vi-VN')}₫
                      </span>
                    </td>
                    <td className="table-cell">
                      <span className={`badge text-[10px] ${sc.badge}`}>{sc.label}</span>
                    </td>
                    <td className="table-cell text-text-muted text-[11px]">{fmtDateTime(order.paid_at || order.created_at)}</td>
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
          <span>Hiển thị {filtered.length} / {orders.length} đơn hàng</span>
        </div>
      </div>
    </div>
  )
}
