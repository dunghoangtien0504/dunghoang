'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { TrendingUp, Users, DollarSign, Target, ArrowRight, CheckCircle, Clock, Zap, Loader2, RefreshCw } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { DEAL_STAGE_CONFIG } from '@/lib/constants'

// Dữ liệu mẫu cho các phần chưa có API thật
const MONTHLY = [
  { month: 'T3', revenue: 390 }, { month: 'T4', revenue: 560 }, { month: 'T5', revenue: 809 },
  { month: 'T6', revenue: 720 }, { month: 'T7', revenue: 0 },
]

interface TT { active?: boolean; payload?: Array<{ value: number }>; label?: string }
const CT = ({ active, payload, label }: TT) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-border rounded-xl p-3 shadow-card-md text-xs">
      <p className="text-text-secondary font-semibold mb-1">{label}</p>
      <p className="text-brand-accent font-bold font-mono">{payload[0].value}M</p>
    </div>
  )
}

type AdminStats = {
  revenue: number
  orders:  { total: number; completed: number; pending: number }
  students: number
}

type ContactStats = {
  total:   number
  byStage: Record<string, number>
}

function fmtVND(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M₫`
  if (n >= 1_000)     return `${(n / 1_000).toFixed(0)}K₫`
  return `${n}₫`
}

export default function CRMOverviewPage() {
  const [stats,    setStats]    = useState<AdminStats | null>(null)
  const [contacts, setContacts] = useState<ContactStats | null>(null)
  const [loading,  setLoading]  = useState(true)

  async function load() {
    setLoading(true)
    try {
      const [sRes, cRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/contacts?pageSize=1'),
      ])
      const [s, c] = await Promise.all([sRes.json(), cRes.json()])
      setStats(s)
      setContacts({ total: c.total, byStage: c.byStage })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const totalContacts = contacts?.total ?? 0
  const byStage       = contacts?.byStage ?? {}
  const winRate       = stats
    ? Math.round((stats.orders.completed / Math.max(stats.orders.total, 1)) * 100)
    : 0

  const STAGE_BARS = Object.entries(DEAL_STAGE_CONFIG)
    .filter(([k]) => k !== 'lost')
    .map(([key, cfg]) => ({
      label: cfg.label,
      count: key === 'won'
        ? (stats?.orders.completed ?? 0)
        : key === 'new'
        ? (stats?.orders.pending ?? 0)
        : 0,
    }))

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">CRM Doanh số</h1>
          <p className="page-subtitle">Tổng quan — số liệu thật từ Supabase</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={load} disabled={loading} className="btn-secondary text-xs py-1.5">
            <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />Làm mới
          </button>
          <Link href="/admin/crm/pipeline"  className="btn-secondary text-xs py-1.5"><TrendingUp size={12}/>Pipeline</Link>
          <Link href="/admin/crm/contacts"  className="btn-primary text-xs py-1.5"><Users size={12}/>Khách hàng</Link>
        </div>
      </div>

      {/* KPIs — thật từ Supabase */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          {
            label: 'Tổng liên hệ',
            value: loading ? '...' : String(totalContacts),
            icon: Users, color: 'text-info', bg: 'bg-info-light',
            sub: loading ? '' : `${byStage['Khách hàng'] ?? 0} đã mua`,
          },
          {
            label: 'Doanh thu',
            value: loading || !stats ? '...' : fmtVND(stats.revenue),
            icon: DollarSign, color: 'text-brand-accent', bg: 'bg-brand-accent/10',
            sub: loading || !stats ? '' : `${stats.orders.completed} đơn hoàn thành`,
          },
          {
            label: 'Tỉ lệ chốt',
            value: loading ? '...' : `${winRate}%`,
            icon: Target, color: 'text-success', bg: 'bg-success-light',
            sub: 'completed / total orders',
          },
          {
            label: 'Học viên',
            value: loading || !stats ? '...' : String(stats.students),
            icon: TrendingUp, color: 'text-brand-border', bg: 'bg-brand-border/10',
            sub: loading || !stats ? '' : `${stats.orders.pending} đơn chờ xử lý`,
          },
        ].map(s => { const Icon = s.icon; return (
          <div key={s.label} className="stat-card card-hover">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${s.bg}`}>
              {loading ? <Loader2 size={16} className="animate-spin text-text-muted" /> : <Icon size={16} className={s.color}/>}
            </div>
            <div>
              <p className="text-text-muted text-xs">{s.label}</p>
              <p className="text-2xl font-bold font-mono text-text-primary">{s.value}</p>
            </div>
            <p className="text-text-muted text-[10px]">{s.sub}</p>
          </div>
        )})}
      </div>

      {/* Contacts theo giai đoạn (thật) + Monthly (mẫu) */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card card-hover">
          <h3 className="section-title mb-1">Khách hàng theo giai đoạn</h3>
          <p className="text-text-muted text-xs mb-4">Số liệu thật từ bảng contacts</p>
          {loading ? (
            <div className="h-44 flex items-center justify-center">
              <Loader2 size={20} className="animate-spin text-text-muted" />
            </div>
          ) : (
            <div className="space-y-3">
              {[
                { label: 'Hội viên',        key: 'Hội viên' },
                { label: 'Khách hàng',      key: 'Khách hàng' },
                { label: 'Người mua hàng',  key: 'Người mua hàng' },
                { label: 'KH Tiềm năng',   key: 'KH Tiềm năng' },
              ].map(({ label, key }) => {
                const count = byStage[key] ?? 0
                const max   = totalContacts || 1
                return (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-text-secondary text-xs">{label}</span>
                      <span className="text-text-primary text-xs font-mono font-semibold">{count}</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill bg-brand-accent" style={{ width:`${(count/max)*100}%` }}/>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="card card-hover">
          <div className="flex items-center justify-between mb-1">
            <h3 className="section-title">Doanh thu theo tháng</h3>
            <span className="chip text-[10px]">Dữ liệu mẫu</span>
          </div>
          <p className="text-text-muted text-xs mb-4">5 tháng gần nhất (triệu đồng)</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={MONTHLY} margin={{ top:4, right:4, left:-20, bottom:0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#DDD8CB" vertical={false}/>
              <XAxis dataKey="month" tick={{ fill:'#7A8C7E', fontSize:11 }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fill:'#7A8C7E', fontSize:10 }} axisLine={false} tickLine={false}/>
              <Tooltip content={<CT/>}/>
              <Bar dataKey="revenue" fill="#C0390E" radius={[5,5,0,0]} maxBarSize={32}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Đơn hàng pipeline + Hanh dong nhanh */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 card card-hover">
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-title">Pipeline đơn hàng</h3>
            <Link href="/admin/orders" className="btn-ghost text-xs">Xem tất cả <ArrowRight size={11}/></Link>
          </div>
          <div className="space-y-3">
            {STAGE_BARS.map(s => (
              <div key={s.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-text-secondary text-xs">{s.label}</span>
                  <span className="text-text-primary text-xs font-mono font-semibold">{loading ? '—' : s.count} đơn</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill bg-brand-accent"
                    style={{ width: `${stats ? (s.count/Math.max(stats.orders.total,1))*100 : 0}%` }}/>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="card card-hover p-4">
            <h3 className="section-title text-sm mb-3">Hành động nhanh</h3>
            <div className="space-y-1.5">
              {[
                { label:'Thêm khách hàng', href:'/admin/crm/contacts', icon:Users },
                { label:'Xem pipeline',    href:'/admin/crm/pipeline', icon:TrendingUp },
                { label:'Theo dõi quan tâm',href:'/admin/crm/interested',icon:Clock },
                { label:'Phân công sale',  href:'/admin/crm/assign',   icon:Zap },
              ].map(a=>{ const Icon=a.icon; return (
                <Link key={a.href} href={a.href} className="sidebar-item w-full rounded-lg bg-surface-2 hover:bg-brand-dark/5 text-xs">
                  <Icon size={13} className="text-brand-border"/>{a.label}
                  <ArrowRight size={10} className="ml-auto text-text-muted"/>
                </Link>
              )})}
            </div>
          </div>
          <div className="card card-hover p-4 bg-brand-dark/2 border-brand-border/15">
            <h3 className="section-title text-sm mb-2">Tổng kết</h3>
            <div className="space-y-2">
              {[
                { label:'Hội viên',        value: loading ? '—' : String(byStage['Hội viên'] ?? 0),       icon:CheckCircle, c:'text-success' },
                { label:'Đơn chờ xử lý',  value: loading ? '—' : String(stats?.orders.pending ?? 0),     icon:Clock,       c:'text-brand-olive' },
                { label:'Tiềm năng',       value: loading ? '—' : String(byStage['KH Tiềm năng'] ?? 0),  icon:Target,      c:'text-brand-border' },
              ].map(s=>{ const Icon=s.icon; return (
                <div key={s.label} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5"><Icon size={11} className={s.c}/><span className="text-text-secondary">{s.label}</span></div>
                  <span className="font-mono font-semibold text-text-primary">{s.value}</span>
                </div>
              )})}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
