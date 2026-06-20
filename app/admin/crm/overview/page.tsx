'use client'

import Link from 'next/link'
import { BarChart3, TrendingUp, Users, DollarSign, Target, ArrowRight, CheckCircle, Clock, Zap } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { DEALS, CONTACTS, KPI, DEAL_STAGE_CONFIG } from '@/lib/constants'

const MONTHLY = [
  { month: 'T1', revenue: 320 }, { month: 'T2', revenue: 485 },
  { month: 'T3', revenue: 390 }, { month: 'T4', revenue: 560 }, { month: 'T5', revenue: 809 },
]
const SALE_TEAM = [
  { name: 'Minh Tuan', deals: 28, revenue: 55720000, winRate: 72 },
  { name: 'Thu Ha',    deals: 22, revenue: 43780000, winRate: 65 },
  { name: 'Duc Anh',   deals: 15, revenue: 29850000, winRate: 58 },
  { name: 'Lan Anh',   deals: 9,  revenue: 17910000, winRate: 45 },
]
const STAGE_COUNTS = Object.entries(DEAL_STAGE_CONFIG)
  .filter(([k]) => k !== 'lost')
  .map(([key, cfg]) => ({
    label: cfg.label,
    count: DEALS.filter(d => d.stage === key).length,
    max:   DEALS.length,
    color: cfg.border.replace('border-t-',''),
  }))

interface TT { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }
const CT = ({ active, payload, label }: TT) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-border rounded-xl p-3 shadow-card-md text-xs">
      <p className="text-text-secondary font-semibold mb-1">{label}</p>
      <p className="text-brand-accent font-bold font-mono">{payload[0].value}M</p>
    </div>
  )
}

export default function CRMOverviewPage() {
  const totalPV = DEALS.reduce((s, d) => s + d.value, 0)
  const wonDeals = DEALS.filter(d => d.stage === 'won')
  const winRate  = Math.round((wonDeals.length / DEALS.length) * 100)

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">CRM Doanh so</h1>
          <p className="page-subtitle">Tong quan hieu suat ban hang & pipeline</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/crm/pipeline"  className="btn-secondary text-xs py-1.5"><TrendingUp size={12}/>Pipeline</Link>
          <Link href="/admin/crm/contacts"  className="btn-primary text-xs py-1.5"><Users size={12}/>Khach hang</Link>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label:'Tong KH',          value: String(KPI.totalContacts),                         icon:Users,       color:'text-info',        bg:'bg-info-light',       sub:'+48 thang nay' },
          { label:'Gia tri Pipeline', value:`${(totalPV/1_000_000).toFixed(0)}M`,                icon:DollarSign,  color:'text-brand-accent', bg:'bg-brand-accent/10',  sub:'6 deals dang mo' },
          { label:'Win Rate',         value:`${winRate}%`,                                       icon:Target,      color:'text-success',      bg:'bg-success-light',    sub:'TB nganh 28%' },
          { label:'Avg Deal',         value:`${(totalPV/DEALS.length/1_000_000).toFixed(1)}M`,  icon:TrendingUp,  color:'text-brand-border',  bg:'bg-brand-border/10',  sub:'Tren muc tieu' },
        ].map(s=>{ const Icon=s.icon; return (
          <div key={s.label} className="stat-card card-hover">
            <div className="flex items-start justify-between">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${s.bg}`}><Icon size={16} className={s.color}/></div>
              <span className="text-brand-olive text-[10px]">★ Moi</span>
            </div>
            <div>
              <p className="text-text-muted text-xs">{s.label}</p>
              <p className="text-2xl font-bold font-mono text-text-primary">{s.value}</p>
            </div>
            <p className="text-text-muted text-[10px]">{s.sub}</p>
          </div>
        )})}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card card-hover">
          <h3 className="section-title mb-1">Doanh thu theo thang</h3>
          <p className="text-text-muted text-xs mb-4">5 thang gan nhat (trieu dong)</p>
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

        <div className="card card-hover">
          <h3 className="section-title mb-1">Pipeline theo giai doan</h3>
          <p className="text-text-muted text-xs mb-4">So deals hien tai moi giai doan</p>
          <div className="space-y-3">
            {STAGE_COUNTS.map((s,i)=>(
              <div key={s.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-text-secondary text-xs">{s.label}</span>
                  <span className="text-text-primary text-xs font-mono font-semibold">{s.count} deals</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill bg-brand-accent" style={{ width:`${(s.count/Math.max(...STAGE_COUNTS.map(x=>x.count)))*100}%`, opacity: 0.5+i*0.1 }}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sale team */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 card card-hover">
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-title">Hieu suat Sale Team</h3>
            <Link href="/admin/crm/performance" className="btn-ghost text-xs">Chi tiet <ArrowRight size={11}/></Link>
          </div>
          <table className="w-full">
            <thead><tr>
              <th className="table-header">#</th><th className="table-header">Sale</th>
              <th className="table-header text-right">Deals</th><th className="table-header text-right">Doanh thu</th>
              <th className="table-header text-right">Win Rate</th><th className="table-header">Hieu suat</th>
            </tr></thead>
            <tbody>{SALE_TEAM.map((s,i)=>(
              <tr key={s.name} className="table-row">
                <td className="table-cell"><span className={`text-xs font-bold font-mono ${i===0?'text-brand-olive':'text-text-muted'}`}>#{i+1}</span></td>
                <td className="table-cell">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-brand-dark/10 border border-brand-dark/15 flex items-center justify-center">
                      <span className="text-brand-dark text-[10px] font-bold">{s.name.charAt(0)}</span>
                    </div>
                    <span className="text-text-primary text-xs font-medium">{s.name}</span>
                  </div>
                </td>
                <td className="table-cell text-right font-mono text-sm">{s.deals}</td>
                <td className="table-cell text-right font-mono text-brand-accent text-xs">{(s.revenue/1_000_000).toFixed(1)}M</td>
                <td className="table-cell text-right"><span className={`text-xs font-semibold ${s.winRate>=60?'text-success':s.winRate>=50?'text-brand-olive':'text-text-muted'}`}>{s.winRate}%</span></td>
                <td className="table-cell w-24"><div className="progress-bar"><div className="progress-fill bg-brand-accent" style={{ width:`${s.winRate}%` }}/></div></td>
              </tr>
            ))}</tbody>
          </table>
        </div>

        <div className="space-y-3">
          <div className="card card-hover p-4">
            <h3 className="section-title text-sm mb-3">Hanh dong nhanh</h3>
            <div className="space-y-1.5">
              {[
                { label:'Them khach hang', href:'/admin/crm/contacts', icon:Users },
                { label:'Tao deal moi',    href:'/admin/crm/pipeline', icon:TrendingUp },
                { label:'Can follow-up',   href:'/admin/crm/interested',icon:Clock },
                { label:'Phan cong sale',  href:'/admin/crm/assign',   icon:Zap },
              ].map(a=>{ const Icon=a.icon; return (
                <Link key={a.href} href={a.href} className="sidebar-item w-full rounded-lg bg-surface-2 hover:bg-brand-dark/5 text-xs">
                  <Icon size={13} className="text-brand-border"/>{a.label}
                  <ArrowRight size={10} className="ml-auto text-text-muted"/>
                </Link>
              )})}
            </div>
          </div>
          <div className="card card-hover p-4 bg-brand-dark/2 border-brand-border/15">
            <h3 className="section-title text-sm mb-2">Tong ket thang</h3>
            <div className="space-y-2">
              {[
                { label:'KH moi', value:'48', icon:CheckCircle, c:'text-success' },
                { label:'Follow-up', value:'12', icon:Clock, c:'text-brand-olive' },
                { label:'Sap het han', value:'3', icon:Target, c:'text-danger' },
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
