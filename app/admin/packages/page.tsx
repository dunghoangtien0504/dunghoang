'use client'

import { useState } from 'react'
import { Package, Plus, MoreHorizontal, CheckCircle, Users, DollarSign, Star, Edit, Trash2 } from 'lucide-react'
import { COURSES } from '@/lib/constants'

const PACKAGES = [
  {
    id: 1, name: 'Starter Bundle',
    courses: [1, 3],
    originalPrice: 2980000, bundlePrice: 2190000,
    discount: 27, sold: 48, active: true,
    highlight: false,
    perks: ['Truy cap vinh vien', 'Certificate hoàn thành', 'Community access'],
  },
  {
    id: 2, name: 'Creator Pro Pack',
    courses: [1, 2, 3],
    originalPrice: 4470000, bundlePrice: 2990000,
    discount: 33, sold: 87, active: true,
    highlight: true,
    perks: ['Tat ca khoa hoc', 'Certificate hoàn thành', 'Priority support', '1-1 Mentoring (1h)'],
  },
  {
    id: 3, name: 'VSL + Affiliate Combo',
    courses: [1, 4],
    originalPrice: 4480000, bundlePrice: 3290000,
    discount: 27, sold: 23, active: true,
    highlight: false,
    perks: ['Truy cap vinh vien', 'Affiliate tracking setup', 'Bonus templates'],
  },
  {
    id: 4, name: 'All-Access Pass',
    courses: [1, 2, 3, 4, 5],
    originalPrice: 9950000, bundlePrice: 5990000,
    discount: 40, sold: 12, active: false,
    highlight: false,
    perks: ['Tat ca khoa hoc hien tai & tuong lai', 'VIP Community', 'Monthly group call', '2h Mentoring'],
  },
]

const stats = {
  total:   PACKAGES.length,
  active:  PACKAGES.filter(p => p.active).length,
  sold:    PACKAGES.reduce((s, p) => s + p.sold, 0),
  revenue: PACKAGES.reduce((s, p) => s + p.sold * p.bundlePrice, 0),
}

export default function PackagesPage() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">Quan ly Goi</h1>
          <p className="page-subtitle">{stats.active} goi dang ban · {stats.sold} da ban</p>
        </div>
        <button onClick={() => setShowForm(v => !v)} className="btn-primary text-xs py-2">
          <Plus size={13} />Tao goi moi
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label:'Tong goi',     value:String(stats.total),                          icon:Package,    color:'text-info',        bg:'bg-info-light' },
          { label:'Dang ban',     value:String(stats.active),                         icon:CheckCircle,color:'text-success',     bg:'bg-success-light' },
          { label:'Da ban',       value:String(stats.sold),                           icon:Users,      color:'text-brand-border',bg:'bg-brand-border/10' },
          { label:'Doanh thu',    value:`${(stats.revenue/1_000_000).toFixed(0)}M`,   icon:DollarSign, color:'text-brand-accent',bg:'bg-brand-accent/10' },
        ].map(s => {
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

      {/* Create form */}
      {showForm && (
        <div className="card border-brand-border/30 animate-slide-up">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-brand-accent/10 flex items-center justify-center">
              <Package size={14} className="text-brand-accent" />
            </div>
            <h3 className="section-title">Tao goi moi</h3>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="col-span-2">
              <label className="text-text-muted text-xs mb-1.5 block">Ten goi <span className="text-brand-accent">*</span></label>
              <input placeholder="VD: Creator Pro Pack" className="input-field text-xs" />
            </div>
            <div>
              <label className="text-text-muted text-xs mb-1.5 block">Gia goi (VND)</label>
              <input type="number" placeholder="2990000" className="input-field text-xs font-mono" />
            </div>
            <div>
              <label className="text-text-muted text-xs mb-1.5 block">Khoa hoc bao gom</label>
              <select multiple className="input-field text-xs h-20">
                {COURSES.map(c => <option key={c.id} value={c.id}>{c.title.split('—')[0].trim()}</option>)}
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={() => setShowForm(false)} className="btn-secondary text-xs py-2">Huy</button>
            <button className="btn-primary text-xs py-2"><Package size={12}/>Tao goi</button>
          </div>
        </div>
      )}

      {/* Package cards — 2-col asymmetric */}
      <div className="grid grid-cols-2 gap-4">
        {PACKAGES.map(pkg => {
          const pkgCourses = COURSES.filter(c => pkg.courses.includes(c.id))
          const savingAmount = pkg.originalPrice - pkg.bundlePrice

          return (
            <div
              key={pkg.id}
              className={`card card-hover group flex flex-col gap-4 relative ${
                pkg.highlight ? 'border-brand-accent/30 shadow-card-md bg-brand-dark/1' : ''
              }`}
            >
              {pkg.highlight && (
                <div className="absolute -top-3 left-4">
                  <span className="badge bg-brand-accent text-white text-xs px-3 py-1 shadow-btn">
                    <Star size={10} className="mr-1" />Pho bien nhat
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="flex items-start justify-between pt-1">
                <div>
                  <h3 className="text-text-primary font-bold text-base">{pkg.name}</h3>
                  <p className="text-text-muted text-xs mt-0.5">{pkg.courses.length} khoa hoc</p>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="btn-ghost p-1.5"><Edit size={13} /></button>
                  <button className="btn-ghost p-1.5 hover:text-danger"><Trash2 size={13} /></button>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-brand-accent font-mono">
                  {(pkg.bundlePrice / 1_000_000).toFixed(2)}M
                </span>
                <span className="text-text-muted text-sm line-through font-mono">
                  {(pkg.originalPrice / 1_000_000).toFixed(1)}M
                </span>
                <span className="badge bg-success-light text-success border border-success/20 text-xs">
                  -{pkg.discount}%
                </span>
              </div>

              {/* Courses included */}
              <div className="space-y-1.5">
                {pkgCourses.map(c => (
                  <div key={c.id} className="flex items-center gap-2 text-xs text-text-secondary">
                    <CheckCircle size={11} className="text-success flex-shrink-0" />
                    <span className="truncate">{c.title.split('—')[0].trim()}</span>
                  </div>
                ))}
              </div>

              {/* Perks */}
              <div className="pt-2 border-t border-border/50">
                <div className="flex flex-wrap gap-1.5">
                  {pkg.perks.map(perk => (
                    <span key={perk} className="badge badge-gray text-[9px]">{perk}</span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <Users size={11} />
                  <span>{pkg.sold} da mua</span>
                  <span>·</span>
                  <span className="text-success font-medium">
                    Tiet kiem {(savingAmount / 1_000_000).toFixed(1)}M
                  </span>
                </div>
                <span className={`badge text-[10px] ${pkg.active ? 'badge-success' : 'badge-gray'}`}>
                  {pkg.active ? 'Dang ban' : 'Tat'}
                </span>
              </div>
            </div>
          )
        })}

        {/* Add new card */}
        <button
          onClick={() => setShowForm(true)}
          className="card border-dashed hover:border-brand-accent/40 hover:bg-surface-2 flex flex-col items-center justify-center gap-3 min-h-[280px] transition-all group"
        >
          <div className="w-12 h-12 rounded-full bg-surface-2 group-hover:bg-brand-accent/10 flex items-center justify-center transition-colors">
            <Plus size={20} className="text-text-muted group-hover:text-brand-accent transition-colors" />
          </div>
          <div className="text-center">
            <p className="text-text-secondary text-sm font-medium group-hover:text-text-primary">Tao goi moi</p>
            <p className="text-text-muted text-xs mt-0.5">Combo nhieu khoa hoc</p>
          </div>
        </button>
      </div>
    </div>
  )
}
