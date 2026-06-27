'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { DollarSign, ShoppingCart, Users, TrendingUp, RefreshCw, ArrowRight, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

type Stats = {
  revenue: number
  aov: number
  orders: { total: number; completed: number; pending: number; refunded: number }
  students: number
  enrollments: number
  revenueByCourse: Record<string, number>
}

type Order = {
  order_code: string
  name: string | null
  email: string
  course_id: string | null
  amount: number
  status: string
  created_at: string
  paid_at: string | null
}

function fmtVND(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M₫`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K₫`
  return `${n}₫`
}

const STATUS_CFG: Record<string, { label: string; icon: React.ElementType; color: string; bg: string }> = {
  completed: { label: 'Hoàn thành', icon: CheckCircle, color: 'text-success', bg: 'bg-success/10' },
  pending:   { label: 'Chờ xử lý',  icon: Clock,       color: 'text-brand-olive', bg: 'bg-brand-olive/10' },
  refunded:  { label: 'Hoàn tiền',  icon: AlertCircle, color: 'text-danger',  bg: 'bg-danger/10' },
}

const COURSE_NAMES: Record<string, string> = {
  'meta-ai-agent': 'Meta AI Agent',
  'content_368':   'Content System',
  'khoa-1':        '24 AI Agent',
  'khoa2_2768':    'Coaching',
  'landing-page':  'Landing Page',
}

export default function DashboardPage() {
  const [stats, setStats]   = useState<Stats | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  function load() {
    setLoading(true)
    Promise.all([
      fetch('/api/admin/stats').then(r => r.json()),
      fetch('/api/admin/orders').then(r => r.json()),
    ])
      .then(([s, o]) => {
        setStats(s)
        setOrders(Array.isArray(o) ? o : (o.orders ?? []))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  // Revenue mini chart từ orders thật
  const revenueChart = (() => {
    const completed = orders.filter(o => o.status === 'completed')
    const map = new Map<string, number>()
    for (const o of completed) {
      const d = new Date(o.paid_at ?? o.created_at)
      const key = `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}`
      map.set(key, (map.get(key) ?? 0) + o.amount)
    }
    return Array.from(map.entries())
      .sort(([a],[b]) => a.localeCompare(b))
      .slice(-14)
      .map(([date, revenue]) => ({ date, revenue }))
  })()

  const recentOrders = orders.slice(0, 5)

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard của tôi</h1>
          <p className="page-subtitle">Số liệu thật từ Supabase — cập nhật theo thời gian thực</p>
        </div>
        <button onClick={load} disabled={loading} className="btn-primary text-xs py-1.5">
          <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
          Làm mới
        </button>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          {
            label: 'Doanh thu',
            value: loading || !stats ? '...' : fmtVND(stats.revenue),
            icon: <DollarSign size={18} className="text-brand-accent" />,
            iconBg: 'bg-brand-accent/10',
            sub: stats ? `${stats.orders.completed} đơn hoàn thành` : '',
          },
          {
            label: 'Tổng đơn hàng',
            value: loading || !stats ? '...' : String(stats.orders.total),
            icon: <ShoppingCart size={18} className="text-brand-dark" />,
            iconBg: 'bg-brand-dark/10',
            sub: stats ? `${stats.orders.pending} đang chờ` : '',
          },
          {
            label: 'Học viên',
            value: loading || !stats ? '...' : String(stats.students),
            icon: <Users size={18} className="text-brand-border" />,
            iconBg: 'bg-brand-border/10',
            sub: stats ? `${stats.enrollments} lượt ghi danh` : '',
          },
          {
            label: 'Doanh thu TB/đơn',
            value: loading || !stats ? '...' : fmtVND(stats.aov),
            icon: <TrendingUp size={18} className="text-brand-olive" />,
            iconBg: 'bg-brand-olive/10',
            sub: '',
          },
        ].map(card => (
          <div key={card.label} className="stat-card card-hover">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.iconBg}`}>
              {card.icon}
            </div>
            <div>
              <p className="text-text-muted text-xs mb-0.5">{card.label}</p>
              <p className="text-2xl font-bold font-mono text-text-primary">{card.value}</p>
              {card.sub && <p className="text-text-muted text-[10px] mt-0.5">{card.sub}</p>}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue mini chart */}
        <div className="card card-hover lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="section-title">Doanh thu theo ngày</h3>
              <p className="text-text-muted text-xs mt-0.5">14 ngày gần nhất</p>
            </div>
            <span className="chip">{revenueChart.length > 0 ? 'Dữ liệu thật' : 'Chưa có data'}</span>
          </div>
          {revenueChart.length > 0 ? (
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={revenueChart} margin={{ top: 4, right: 4, left: -12, bottom: 0 }}>
                <defs>
                  <linearGradient id="gRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C0390E" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#C0390E" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#DDD8CB" vertical={false} />
                <XAxis dataKey="date" tick={{ fill: '#7A8C7E', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={v => fmtVND(v)} tick={{ fill: '#7A8C7E', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip
                  formatter={(v: number) => [fmtVND(v), 'Doanh thu']}
                  contentStyle={{ borderRadius: 12, border: '1px solid #DDD8CB', fontSize: 11 }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#C0390E" strokeWidth={2} fill="url(#gRev)" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-44 flex items-center justify-center">
              <p className="text-text-muted text-sm">Chưa có đơn hoàn thành nào</p>
            </div>
          )}
        </div>

        {/* Revenue by course */}
        <div className="card card-hover">
          <h3 className="section-title mb-4">Doanh thu theo khóa</h3>
          {loading || !stats ? (
            <p className="text-text-muted text-xs">Đang tải...</p>
          ) : Object.keys(stats.revenueByCourse).length === 0 ? (
            <p className="text-text-muted text-xs">Chưa có doanh thu</p>
          ) : (
            <div className="space-y-3">
              {Object.entries(stats.revenueByCourse)
                .sort(([,a],[,b]) => b - a)
                .map(([courseId, rev]) => {
                  const total = stats.revenue || 1
                  const pct = (rev / total) * 100
                  return (
                    <div key={courseId}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-text-primary font-medium truncate">
                          {COURSE_NAMES[courseId] ?? courseId}
                        </span>
                        <span className="text-xs font-mono text-text-muted ml-2">{fmtVND(rev)}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-surface-3">
                        <div className="h-full rounded-full bg-brand-accent/70" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  )
                })}
            </div>
          )}
        </div>
      </div>

      {/* Recent orders */}
      <div className="card card-hover">
        <div className="flex items-center justify-between mb-4">
          <h3 className="section-title">Đơn hàng gần đây</h3>
          <Link href="/admin/orders" className="text-xs text-brand-border hover:text-brand-dark font-medium flex items-center gap-1">
            Xem tất cả <ArrowRight size={12} />
          </Link>
        </div>
        {loading ? (
          <p className="text-text-muted text-xs py-4 text-center">Đang tải...</p>
        ) : recentOrders.length === 0 ? (
          <p className="text-text-muted text-xs py-4 text-center">Chưa có đơn hàng</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="table-header text-left">Mã đơn</th>
                  <th className="table-header text-left">Khách hàng</th>
                  <th className="table-header text-left">Khóa học</th>
                  <th className="table-header text-right">Số tiền</th>
                  <th className="table-header">Trạng thái</th>
                  <th className="table-header text-right">Thời gian</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(o => {
                  const cfg = STATUS_CFG[o.status] ?? STATUS_CFG.pending
                  const Icon = cfg.icon
                  const d = new Date(o.paid_at ?? o.created_at)
                  const timeStr = `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')} ${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}`
                  return (
                    <tr key={o.order_code} className="table-row">
                      <td className="table-cell font-mono text-xs font-semibold text-text-primary">{o.order_code}</td>
                      <td className="table-cell">
                        <p className="text-xs font-medium text-text-primary">{o.name || '—'}</p>
                        <p className="text-[10px] text-text-muted">{o.email}</p>
                      </td>
                      <td className="table-cell text-xs text-text-secondary">
                        {o.course_id ? (COURSE_NAMES[o.course_id] ?? o.course_id) : '—'}
                      </td>
                      <td className="table-cell text-right font-mono font-semibold text-text-primary text-xs">
                        {fmtVND(o.amount)}
                      </td>
                      <td className="table-cell text-center">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>
                          <Icon size={10} />{cfg.label}
                        </span>
                      </td>
                      <td className="table-cell text-right text-[10px] text-text-muted font-mono">{timeStr}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
