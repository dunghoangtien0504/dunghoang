'use client'

import { useState, useEffect } from 'react'
import { BookOpen, Plus, Users, DollarSign, RefreshCw, ShoppingCart } from 'lucide-react'
import { PRODUCTS, formatVND } from '@/lib/products'
import { clsx } from 'clsx'

type CourseStats = {
  course_id: string
  enrollments: number
  orders_completed: number
  orders_pending: number
  revenue: number
}

const COURSE_CATEGORY: Record<string, string> = {
  'meta-ai-agent': 'AI Tool',
  'content_368':   'Content',
  'landing-page':  'Vibe Coding',
  'khoa-1':        'AI Agent',
  'khoa2_2768':    'Coaching',
}

const CATEGORY_COLOR: Record<string, string> = {
  'AI Tool':    'bg-info-light text-info border border-info/20',
  'Content':    'badge-success',
  'Vibe Coding':'bg-brand-olive/10 text-brand-olive border border-brand-olive/20',
  'AI Agent':   'bg-brand-accent/10 text-brand-accent border border-brand-accent/20',
  'Coaching':   'bg-brand-dark/10 text-brand-dark border border-brand-dark/20',
}

export default function CoursesPage() {
  const [stats, setStats]   = useState<CourseStats[]>([])
  const [loading, setLoading] = useState(true)

  function load() {
    setLoading(true)
    Promise.all([
      fetch('/api/admin/orders').then(r => r.json()),
      fetch('/api/admin/enrollments').then(r => r.json()),
    ])
      .then(([ordersRes, enrollRes]) => {
        const orders     = ordersRes.orders ?? []
        const enrollments = Array.isArray(enrollRes) ? enrollRes : (enrollRes.enrollments ?? [])

        // Aggregate per course
        const map = new Map<string, CourseStats>()
        for (const pid of Object.keys(PRODUCTS)) {
          map.set(pid, { course_id: pid, enrollments: 0, orders_completed: 0, orders_pending: 0, revenue: 0 })
        }

        for (const o of orders) {
          const id = o.course_id
          if (!id || !map.has(id)) continue
          const s = map.get(id)!
          if (o.status === 'completed') { s.orders_completed++; s.revenue += Number(o.amount || 0) }
          if (o.status === 'pending') s.orders_pending++
        }
        for (const e of enrollments) {
          const id = e.course_id
          if (!id || !map.has(id)) continue
          map.get(id)!.enrollments++
        }

        setStats(Array.from(map.values()))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const totalStudents  = stats.reduce((s, c) => s + c.enrollments, 0)
  const totalRevenue   = stats.reduce((s, c) => s + c.revenue, 0)
  const totalCompleted = stats.reduce((s, c) => s + c.orders_completed, 0)

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">Quản lý Khoá học</h1>
          <p className="page-subtitle">{Object.keys(PRODUCTS).length} khoá · {loading ? '...' : totalStudents} học viên</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={load} disabled={loading} className="btn-secondary text-xs py-1.5">
            <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />Làm mới
          </button>
          <button className="btn-primary text-xs py-2">
            <Plus size={13} />Tạo khoá học
          </button>
        </div>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Tổng khoá học',  value: String(Object.keys(PRODUCTS).length), icon: BookOpen,     color: 'text-info',         bg: 'bg-info-light' },
          { label: 'Tổng học viên',  value: loading ? '...' : String(totalStudents), icon: Users,   color: 'text-success',      bg: 'bg-success-light' },
          { label: 'Đơn hoàn thành', value: loading ? '...' : String(totalCompleted), icon: ShoppingCart, color: 'text-brand-accent', bg: 'bg-brand-accent/10' },
          { label: 'Doanh thu',      value: loading ? '...' : formatVND(totalRevenue), icon: DollarSign, color: 'text-brand-olive', bg: 'bg-brand-olive/10' },
        ].map(s => {
          const Icon = s.icon
          return (
            <div key={s.label} className="bg-surface border border-border rounded-xl p-4 shadow-card flex items-center gap-3">
              <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', s.bg)}>
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

      {/* Course grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.values(PRODUCTS).map(product => {
          const s = stats.find(x => x.course_id === product.id)
          const cat = COURSE_CATEGORY[product.id] ?? 'Khoá học'
          return (
            <div key={product.id} className="card card-hover flex flex-col gap-4">
              {/* Thumbnail placeholder */}
              <div className="h-32 bg-surface-2 border border-border rounded-lg flex items-center justify-center">
                <BookOpen size={28} className="text-text-muted" strokeWidth={1.5} />
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <span className={clsx('badge text-[10px] flex-shrink-0', CATEGORY_COLOR[cat])}>{cat}</span>
                </div>
                <h3 className="font-bold text-text-primary text-sm leading-snug">{product.name}</h3>
                <p className="text-brand-accent font-bold font-mono text-base">{formatVND(product.price)}</p>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
                {[
                  { label: 'Học viên', value: loading ? '...' : String(s?.enrollments ?? 0) },
                  { label: 'Đơn xong', value: loading ? '...' : String(s?.orders_completed ?? 0) },
                  { label: 'Doanh thu', value: loading ? '...' : (s?.revenue ? `${(s.revenue/1000).toFixed(0)}k` : '0') },
                ].map(m => (
                  <div key={m.label} className="text-center">
                    <p className="text-text-primary font-bold font-mono text-sm">{m.value}</p>
                    <p className="text-text-muted text-[9px]">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
