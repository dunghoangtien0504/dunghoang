'use client'

import { useState } from 'react'
import { DollarSign, ShoppingCart, Users, TrendingUp, CalendarDays, Download, RefreshCw } from 'lucide-react'
import StatsCard from '@/components/dashboard/StatsCard'
import RevenueChart from '@/components/dashboard/RevenueChart'
import CompareChart from '@/components/dashboard/CompareChart'
import GrowthChart from '@/components/dashboard/GrowthChart'
import ConversionFunnel from '@/components/dashboard/ConversionFunnel'

const dateRanges = ['7 ngày', '30 ngày', '90 ngày', 'Năm nay', 'Tất cả']

export default function AdminPage() {
  const [activePeriod, setActivePeriod] = useState('30 ngày')
  const [viewMode, setViewMode]         = useState<'day'|'month'>('day')

  return (
    <div className="page-wrapper">
      {/* ── Header ── */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Admin Panel</h1>
          <p className="page-subtitle">Quản lý toàn bộ nền tảng dunghoang.com</p>
        </div>
      </div>

      {/* ── Date range toolbar ── */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Period pills */}
        <div className="flex items-center gap-1 bg-surface border border-border rounded-lg p-1 shadow-card">
          {dateRanges.map((r) => (
            <button
              key={r}
              onClick={() => setActivePeriod(r)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150 ${
                activePeriod === r
                  ? 'bg-brand-dark text-text-on-dark shadow-sm'
                  : 'text-text-muted hover:text-text-primary hover:bg-surface-3'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Date range display */}
        <div className="flex items-center gap-1.5 bg-surface border border-border rounded-lg px-3 py-1.5 text-xs text-text-secondary shadow-card">
          <CalendarDays size={12} className="text-text-muted" />
          <span>01/05/2026</span>
          <span className="text-text-muted">—</span>
          <span>31/05/2026</span>
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-1 bg-surface border border-border rounded-lg p-1 shadow-card">
          {(['day','month'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setViewMode(m)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                viewMode === m
                  ? 'bg-surface-3 text-text-primary'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              {m === 'day' ? 'Theo ngày' : 'Theo tháng'}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button className="btn-secondary text-xs py-1.5">
            <Download size={12} />Xuất báo cáo
          </button>
          <button className="btn-primary text-xs py-1.5">
            <RefreshCw size={12} />Làm mới
          </button>
        </div>
      </div>

      {/* ── Main KPIs ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <StatsCard
          label="Doanh thu"
          value="809.173.000₫"
          icon={<DollarSign size={18} className="text-brand-accent" />}
          iconBg="bg-brand-accent/10"
          progress={72} progressColor="bg-brand-accent"
        />
        <StatsCard
          label="Đơn hàng"
          value="454"
          icon={<ShoppingCart size={18} className="text-brand-dark" />}
          iconBg="bg-brand-dark/10"
          progress={54} progressColor="bg-brand-dark"
        />
        <StatsCard
          label="Học viên mới"
          value="605"
          icon={<Users size={18} className="text-brand-border" />}
          iconBg="bg-brand-border/10"
          progress={65} progressColor="bg-brand-border"
        />
        <StatsCard
          label="Doanh thu TB/đơn"
          value="1.782.319₫"
          icon={<TrendingUp size={18} className="text-brand-olive" />}
          iconBg="bg-brand-olive/10"
          progress={48} progressColor="bg-brand-olive"
        />
      </div>

      {/* ── Secondary metrics ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: 'Doanh thu TB/ngày', value: '26.102.355₫', sub: 'Trong 31 ngày',
            icon: <DollarSign size={14} className="text-brand-accent" />, accent: '#C0390E' },
          { label: 'Đơn hàng TB/ngày',  value: '14.6',         sub: 'Trong 31 ngày',
            icon: <ShoppingCart size={14} className="text-brand-dark" />, accent: '#0D2B1A' },
          { label: 'Học viên mới TB/ngày', value: '19.5',      sub: 'Trong 31 ngày',
            icon: <Users size={14} className="text-brand-border" />, accent: '#3D6B4A' },
        ].map((item) => (
          <div key={item.label} className="bg-surface border border-border rounded-xl p-4 shadow-card">
            <div className="flex items-center gap-2 mb-2">
              {item.icon}
              <span className="text-text-muted text-xs">{item.label}</span>
            </div>
            <p className="text-text-primary font-bold text-xl font-mono">{item.value}</p>
            <p className="text-text-muted text-xs mt-1">{item.sub}</p>
          </div>
        ))}
      </div>

      {/* ── Charts row 1 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RevenueChart />
        <CompareChart />
      </div>

      {/* ── Charts row 2 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <GrowthChart />
        <ConversionFunnel />
      </div>
    </div>
  )
}
