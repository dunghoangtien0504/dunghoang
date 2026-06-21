'use client'

import { useState, useEffect } from 'react'
import { DollarSign, ShoppingCart, Users, TrendingUp, Download, RefreshCw } from 'lucide-react'
import StatsCard from '@/components/dashboard/StatsCard'
import RevenueChart from '@/components/dashboard/RevenueChart'
import CompareChart from '@/components/dashboard/CompareChart'
import GrowthChart from '@/components/dashboard/GrowthChart'
import ConversionFunnel from '@/components/dashboard/ConversionFunnel'

type Stats = {
  revenue:  number
  aov:      number
  orders:   { total: number; completed: number; pending: number; refunded: number }
  students: number
  enrollments: number
}

type ChartData = {
  revenueByDay:   { date: string; revenue: number; orders: number }[]
  growthByDay:    { date: string; enrollments: number; newUsers: number }[]
  comparePeriods: { day: string; current: number; previous: number }[]
  funnel:         { step: number; label: string; count: number; color: string; text: string }[]
}

function fmtVND(n: number) { return n.toLocaleString('vi-VN') + '₫' }

export default function AdminPage() {
  const [stats, setStats]       = useState<Stats | null>(null)
  const [charts, setCharts]     = useState<ChartData | null>(null)
  const [loading, setLoading]   = useState(true)

  function load() {
    setLoading(true)
    Promise.all([
      fetch('/api/admin/stats').then(r => r.json()),
      fetch('/api/admin/charts').then(r => r.json()),
    ])
      .then(([s, c]) => { setStats(s); setCharts(c) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  return (
    <div className="page-wrapper">
      {/* ── Header ── */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Admin Panel</h1>
          <p className="page-subtitle">Quản lý toàn bộ nền tảng dunghoang.com</p>
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 bg-surface border border-border rounded-lg px-3 py-1.5 text-xs text-text-secondary shadow-card">
          <span className="w-1.5 h-1.5 rounded-full bg-success inline-block" />
          <span>Số liệu thật từ Supabase</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button className="btn-secondary text-xs py-1.5">
            <Download size={12} />Xuất báo cáo
          </button>
          <button className="btn-primary text-xs py-1.5" onClick={load}>
            <RefreshCw size={12} />Làm mới
          </button>
        </div>
      </div>

      {/* ── Main KPIs ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <StatsCard
          label="Doanh thu (đã thanh toán)"
          value={loading || !stats ? '...' : fmtVND(stats.revenue)}
          icon={<DollarSign size={18} className="text-brand-accent" />}
          iconBg="bg-brand-accent/10"
          progress={72} progressColor="bg-brand-accent"
        />
        <StatsCard
          label="Đơn hoàn thành"
          value={loading || !stats ? '...' : `${stats.orders.completed}/${stats.orders.total}`}
          icon={<ShoppingCart size={18} className="text-brand-dark" />}
          iconBg="bg-brand-dark/10"
          progress={54} progressColor="bg-brand-dark"
        />
        <StatsCard
          label="Học viên (tài khoản)"
          value={loading || !stats ? '...' : String(stats.students)}
          icon={<Users size={18} className="text-brand-border" />}
          iconBg="bg-brand-border/10"
          progress={65} progressColor="bg-brand-border"
        />
        <StatsCard
          label="Doanh thu TB/đơn"
          value={loading || !stats ? '...' : fmtVND(stats.aov)}
          icon={<TrendingUp size={18} className="text-brand-olive" />}
          iconBg="bg-brand-olive/10"
          progress={48} progressColor="bg-brand-olive"
        />
      </div>

      {/* ── Secondary metrics ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: 'Đơn chờ xử lý',    value: loading || !stats ? '...' : String(stats.orders.pending),
            icon: <ShoppingCart size={14} className="text-brand-olive" /> },
          { label: 'Đơn hoàn tiền',    value: loading || !stats ? '...' : String(stats.orders.refunded),
            icon: <DollarSign size={14} className="text-danger" /> },
          { label: 'Lượt ghi danh khóa', value: loading || !stats ? '...' : String(stats.enrollments),
            icon: <Users size={14} className="text-brand-border" /> },
        ].map((item) => (
          <div key={item.label} className="bg-surface border border-border rounded-xl p-4 shadow-card">
            <div className="flex items-center gap-2 mb-2">
              {item.icon}
              <span className="text-text-muted text-xs">{item.label}</span>
            </div>
            <p className="text-text-primary font-bold text-xl font-mono">{item.value}</p>
          </div>
        ))}
      </div>

      {/* ── Charts row 1 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RevenueChart data={charts?.revenueByDay} />
        <CompareChart data={charts?.comparePeriods} />
      </div>

      {/* ── Charts row 2 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <GrowthChart data={charts?.growthByDay} />
        <ConversionFunnel data={charts?.funnel} />
      </div>
    </div>
  )
}
