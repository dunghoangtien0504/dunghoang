'use client'

import { useState } from 'react'
import { Tag, Plus, Search, Copy, MoreHorizontal, CheckCircle, Clock, XCircle, DollarSign, Percent } from 'lucide-react'
import { COURSES } from '@/lib/constants'

type DType  = 'percent' | 'fixed'
type CStatus= 'active' | 'expired' | 'paused'

const COUPONS = [
  { id:1, code:'SALE50',     type:'percent' as DType, value:50,     minOrder:0,       maxUses:100, uses:87,  status:'active'  as CStatus, courses:'Tat ca',              expiresAt:'30/06/2026', revenue:43500000 },
  { id:2, code:'NEWBIE200K', type:'fixed'   as DType, value:200000, minOrder:990000,  maxUses:50,  uses:23,  status:'active'  as CStatus, courses:'Tat ca',              expiresAt:'15/06/2026', revenue:4600000  },
  { id:3, code:'AFF30',      type:'percent' as DType, value:30,     minOrder:0,       maxUses:200, uses:156, status:'active'  as CStatus, courses:'Affiliate Marketing', expiresAt:'31/12/2026', revenue:31200000 },
  { id:4, code:'FLASH24H',   type:'percent' as DType, value:40,     minOrder:0,       maxUses:30,  uses:30,  status:'expired' as CStatus, courses:'Tat ca',              expiresAt:'01/05/2026', revenue:12000000 },
  { id:5, code:'CONTENT15',  type:'percent' as DType, value:15,     minOrder:0,       maxUses:100, uses:12,  status:'paused'  as CStatus, courses:'Content System',      expiresAt:'31/07/2026', revenue:1788000  },
]

const SC: Record<CStatus,{ label:string; badge:string; icon:typeof CheckCircle }> = {
  active:  { label:'Hoat dong', badge:'badge-success', icon:CheckCircle },
  expired: { label:'Het han',   badge:'badge-gray',    icon:Clock },
  paused:  { label:'Tam dung',  badge:'badge-warning', icon:XCircle },
}

export default function CouponsPage() {
  const [search, setSearch] = useState('')
  const [copied, setCopied] = useState<string|null>(null)
  const [showForm, setShowForm] = useState(false)
  const [dtype, setDtype] = useState<DType>('percent')

  const filtered = COUPONS.filter(c => !search || c.code.toLowerCase().includes(search.toLowerCase()))
  const stats = {
    total:   COUPONS.length,
    active:  COUPONS.filter(c=>c.status==='active').length,
    uses:    COUPONS.reduce((s,c)=>s+c.uses,0),
    revenue: COUPONS.reduce((s,c)=>s+c.revenue,0),
  }

  const copy = (code:string) => { navigator.clipboard.writeText(code); setCopied(code); setTimeout(()=>setCopied(null),2000) }

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div><h1 className="page-title">Ma giam gia</h1><p className="page-subtitle">{stats.active} ma dang hoat dong</p></div>
        <button onClick={()=>setShowForm(v=>!v)} className="btn-primary text-xs py-2"><Plus size={13}/>Tao ma moi</button>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[
          { label:'Tong ma',      value:String(stats.total),                          icon:Tag,         color:'text-info',        bg:'bg-info-light' },
          { label:'Dang HD',      value:String(stats.active),                         icon:CheckCircle, color:'text-success',     bg:'bg-success-light' },
          { label:'Tong dung',    value:String(stats.uses),                           icon:Percent,     color:'text-brand-olive', bg:'bg-brand-olive/10' },
          { label:'DT tao ra',    value:`${(stats.revenue/1_000_000).toFixed(0)}M`,   icon:DollarSign,  color:'text-brand-accent',bg:'bg-brand-accent/10' },
        ].map(s=>{ const Icon=s.icon; return (
          <div key={s.label} className="bg-surface border border-border rounded-xl p-4 flex items-center gap-3 shadow-card">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.bg}`}><Icon size={18} className={s.color}/></div>
            <div><p className="text-text-primary font-bold font-mono text-lg">{s.value}</p><p className="text-text-muted text-[11px]">{s.label}</p></div>
          </div>
        )})}
      </div>

      {showForm && (
        <div className="card border-brand-border/30 animate-slide-up">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-brand-accent/10 flex items-center justify-center"><Tag size={14} className="text-brand-accent"/></div>
            <h3 className="section-title">Tao ma giam gia moi</h3>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div><label className="text-text-muted text-xs mb-1.5 block">Ma coupon <span className="text-brand-accent">*</span></label><input placeholder="VD: SALE50" className="input-field text-xs font-mono uppercase"/></div>
            <div>
              <label className="text-text-muted text-xs mb-1.5 block">Loai giam</label>
              <div className="flex gap-1 bg-surface-3 border border-border rounded-lg p-1">
                {(['percent','fixed'] as const).map(t=>(
                  <button key={t} onClick={()=>setDtype(t)} className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-md text-xs font-medium transition-all ${dtype===t?'bg-brand-dark text-text-on-dark':'text-text-muted'}`}>
                    {t==='percent'?<><Percent size={10}/>%</>:<><DollarSign size={10}/>VND</>}
                  </button>
                ))}
              </div>
            </div>
            <div><label className="text-text-muted text-xs mb-1.5 block">Gia tri</label><input type="number" placeholder={dtype==='percent'?'20':'200000'} className="input-field text-xs"/></div>
            <div><label className="text-text-muted text-xs mb-1.5 block">Don hang min</label><input type="number" placeholder="0" className="input-field text-xs"/></div>
            <div><label className="text-text-muted text-xs mb-1.5 block">So lan dung max</label><input type="number" placeholder="100" className="input-field text-xs"/></div>
            <div><label className="text-text-muted text-xs mb-1.5 block">Het han</label><input type="date" className="input-field text-xs"/></div>
            <div className="col-span-3"><label className="text-text-muted text-xs mb-1.5 block">Ap dung cho</label>
              <select className="input-field text-xs"><option value="">Tat ca khoa hoc</option>{COURSES.map(c=><option key={c.id}>{c.title.split('—')[0].trim()}</option>)}</select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={()=>setShowForm(false)} className="btn-secondary text-xs py-2">Huy</button>
            <button className="btn-primary text-xs py-2"><Tag size={12}/>Tao ma</button>
          </div>
        </div>
      )}

      <div className="card card-hover">
        <div className="flex items-center justify-between mb-4">
          <h3 className="section-title">Danh sach ma giam gia</h3>
          <div className="relative"><Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Tim ma..." className="input-field pl-8 text-xs h-8 w-44"/>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr>
              <th className="table-header">Ma coupon</th><th className="table-header">Giam gia</th>
              <th className="table-header">Khoa hoc</th><th className="table-header text-right">Luot dung</th>
              <th className="table-header text-right">DT tao ra</th><th className="table-header">Het han</th>
              <th className="table-header">Trang thai</th><th className="table-header"></th>
            </tr></thead>
            <tbody>{filtered.map(c=>{
              const sc=SC[c.status]; const SI=sc.icon
              const pct=Math.round((c.uses/c.maxUses)*100)
              return (
                <tr key={c.id} className="table-row">
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <code className="bg-surface-2 border border-border px-2.5 py-1 rounded-lg text-xs font-mono font-semibold text-text-primary tracking-wider">{c.code}</code>
                      <button onClick={()=>copy(c.code)} className="btn-ghost p-1"><Copy size={11} className={copied===c.code?'text-success':''}/></button>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="flex items-center gap-1 text-brand-accent font-bold font-mono text-sm">
                      {c.type==='percent'?<><Percent size={12}/>{c.value}%</>:`-${(c.value/1_000).toFixed(0)}K`}
                    </span>
                  </td>
                  <td className="table-cell"><span className="badge badge-gray text-[10px]">{c.courses}</span></td>
                  <td className="table-cell text-right">
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-text-primary text-xs font-mono">{c.uses}/{c.maxUses}</span>
                      <div className="w-16 progress-bar">
                        <div className={`progress-fill ${pct>=90?'bg-danger':pct>=70?'bg-brand-olive':'bg-success'}`} style={{width:`${pct}%`}}/>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell text-right"><span className="text-success font-mono text-xs">{(c.revenue/1_000_000).toFixed(1)}M</span></td>
                  <td className="table-cell text-text-muted text-xs">{c.expiresAt}</td>
                  <td className="table-cell"><div className="flex items-center gap-1"><SI size={11} className={c.status==='active'?'text-success':'text-text-muted'}/><span className={`badge text-[10px] ${sc.badge}`}>{sc.label}</span></div></td>
                  <td className="table-cell"><button className="btn-ghost p-1"><MoreHorizontal size={13}/></button></td>
                </tr>
              )
            })}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
