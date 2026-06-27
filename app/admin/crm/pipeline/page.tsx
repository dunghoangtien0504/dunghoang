'use client'

import { useState, useEffect, useCallback } from 'react'
import { Plus, DollarSign, Calendar, ShoppingCart, RefreshCw } from 'lucide-react'
import { PRODUCTS } from '@/lib/products'

type Order = {
  id: string
  email: string
  name: string
  course_id: string
  amount: number
  status: string
  created_at: string
  order_code?: string
}

type Stage = {
  key: string
  label: string
  border: string
  color: string
  statuses: string[]
}

const STAGES: Stage[] = [
  { key: 'pending',   label: 'Chờ thanh toán', border: 'border-t-brand-olive',  color: 'text-brand-olive',  statuses: ['pending'] },
  { key: 'completed', label: 'Chốt deal',       border: 'border-t-success',     color: 'text-success',     statuses: ['completed'] },
  { key: 'refunded',  label: 'Hoàn tiền',       border: 'border-t-danger',      color: 'text-danger',      statuses: ['refunded', 'cancelled'] },
]

const STATUS_BADGE: Record<string, string> = {
  pending:   'bg-brand-olive/10 text-brand-olive border border-brand-olive/20',
  completed: 'badge-success',
  refunded:  'bg-danger/10 text-danger border border-danger/20',
  cancelled: 'badge-gray',
}

const STATUS_LABEL: Record<string, string> = {
  pending:   'Chờ TT',
  completed: 'Hoàn thành',
  refunded:  'Hoàn tiền',
  cancelled: 'Đã huỷ',
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: '2-digit' })
}

export default function PipelinePage() {
  const [orders, setOrders]   = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(() => {
    setLoading(true)
    fetch('/api/admin/orders')
      .then(r => r.json())
      .then(d => setOrders(d.orders ?? []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { load() }, [load])

  const byStage = (stage: Stage) => orders.filter(o => stage.statuses.includes(o.status))
  const grandTotal = orders.filter(o => o.status === 'completed').reduce((s, o) => s + Number(o.amount), 0)
  const winCount   = orders.filter(o => o.status === 'completed').length
  const winRate    = orders.length ? Math.round((winCount / orders.length) * 100) : 0
  const avgDeal    = winCount ? grandTotal / winCount : 0

  return (
    <div className="page-wrapper h-full">
      <div className="page-header flex-shrink-0">
        <div>
          <h1 className="page-title">Pipeline</h1>
          <p className="page-subtitle">
            {loading ? '...' : orders.length} đơn hàng · Doanh thu: {(grandTotal / 1_000_000).toFixed(2)}M₫
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* KPI strip */}
          <div className="flex items-center gap-3 bg-surface border border-border rounded-xl px-4 py-2 shadow-card">
            {[
              { label: 'Tổng đơn',    value: loading ? '...' : String(orders.length),  color: 'text-text-primary' },
              { label: 'Tỉ lệ chốt', value: loading ? '...' : `${winRate}%`,           color: 'text-success' },
              { label: 'TB/đơn',     value: loading ? '...' : avgDeal > 0 ? `${(avgDeal / 1_000).toFixed(0)}k₫` : '—', color: 'text-brand-accent' },
            ].map((s, i) => (
              <div key={s.label} className={`text-center px-3 ${i < 2 ? 'border-r border-border' : ''}`}>
                <p className={`font-bold font-mono text-sm ${s.color}`}>{s.value}</p>
                <p className="text-text-muted text-[10px]">{s.label}</p>
              </div>
            ))}
          </div>
          <button onClick={load} disabled={loading} className="btn-secondary text-xs py-2">
            <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Notice */}
      <div className="flex items-center gap-2 text-[11px] text-text-muted bg-surface-2 border border-border rounded-lg px-3 py-2 w-fit">
        <ShoppingCart size={12} />
        Pipeline hiện hiển thị từ bảng <code className="bg-surface px-1 rounded">orders</code> — dữ liệu thật từ Supabase
      </div>

      {/* Kanban */}
      <div className="flex gap-4 overflow-x-auto pb-4 min-h-0">
        {STAGES.map((stage) => {
          const cards = byStage(stage)
          const stageTotal = cards.filter(o => o.status === 'completed').reduce((s, o) => s + Number(o.amount), 0)
          return (
            <div key={stage.key} className="flex-shrink-0 w-72 flex flex-col gap-3">
              {/* Column header */}
              <div className={`bg-surface border-t-2 rounded-xl p-3 shadow-card ${stage.border}`}>
                <div className="flex items-center justify-between mb-1">
                  <h3 className={`font-semibold text-sm ${stage.color}`}>{stage.label}</h3>
                  <span className="badge badge-gray text-[10px]">{cards.length}</span>
                </div>
                <p className="text-text-muted text-xs font-mono">
                  {stage.key === 'completed'
                    ? `${(stageTotal / 1_000_000).toFixed(2)}M₫`
                    : `${cards.reduce((s, o) => s + Number(o.amount), 0).toLocaleString('vi-VN')}₫`}
                </p>
              </div>

              {/* Cards */}
              <div className="space-y-2 max-h-[calc(100vh-320px)] overflow-y-auto pr-0.5">
                {loading ? (
                  <div className="text-center py-8 text-text-muted text-xs">
                    <RefreshCw size={14} className="animate-spin mx-auto mb-1" />Đang tải...
                  </div>
                ) : cards.length === 0 ? (
                  <div className="text-center py-6 text-text-muted text-xs border border-dashed border-border rounded-xl">
                    Không có đơn nào
                  </div>
                ) : (
                  cards.map(order => {
                    const product = PRODUCTS[order.course_id]
                    const displayName = order.name || order.email.split('@')[0]
                    return (
                      <div key={order.id} className="card card-hover p-3 space-y-2 cursor-default">
                        {/* Name + status */}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-text-primary text-xs font-semibold truncate">{displayName}</p>
                            <p className="text-text-muted text-[10px] truncate">{order.email}</p>
                          </div>
                          <span className={`badge text-[9px] flex-shrink-0 ${STATUS_BADGE[order.status] ?? 'badge-gray'}`}>
                            {STATUS_LABEL[order.status] ?? order.status}
                          </span>
                        </div>

                        {/* Product */}
                        <p className="text-text-muted text-[10px] truncate border-l-2 border-border pl-2">
                          {product?.name ?? order.course_id}
                        </p>

                        {/* Value + date */}
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-0.5 text-[10px] text-text-muted">
                            <Calendar size={8} />{fmtDate(order.created_at)}
                          </span>
                          <span className="text-brand-accent text-[10px] font-mono font-bold flex items-center gap-0.5">
                            <DollarSign size={9} />{Number(order.amount).toLocaleString('vi-VN')}₫
                          </span>
                        </div>

                        {order.order_code && (
                          <p className="text-text-muted text-[9px] font-mono">#{order.order_code}</p>
                        )}
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
