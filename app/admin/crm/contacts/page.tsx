'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Users, Target, UserPlus, ShoppingCart, CheckCircle, Crown,
  ThumbsUp, Star, Search, Filter, RefreshCw, Plus, MoreHorizontal,
  Phone, Mail, BookOpen, ChevronDown, ExternalLink, TrendingUp
} from 'lucide-react'
import { CONTACTS, CONTACT_STAGE_CONFIG, SOURCE_CONFIG, COURSES, KPI } from '@/lib/constants'
import type { ContactStage } from '@/types'

const SEGMENTS: { label: ContactStage | 'Tổng KH'; icon: React.ElementType; count: number; color: string; bg: string; border: string }[] = [
  { label: 'Tổng KH',         icon: Users,       count: KPI.totalContacts, color: 'text-info',         bg: 'bg-info/10',           border: 'border-info/40' },
  { label: 'KH Mục tiêu',    icon: Target,      count: 0,                  color: 'text-text-muted',   bg: 'bg-surface-3',         border: 'border-border' },
  { label: 'KH Tiềm năng',   icon: UserPlus,    count: 452,                color: 'text-brand-border', bg: 'bg-brand-border/10',   border: 'border-brand-border/30' },
  { label: 'Người mua hàng', icon: ShoppingCart,count: 155,                color: 'text-brand-olive',  bg: 'bg-brand-olive/10',    border: 'border-brand-olive/30' },
  { label: 'Khách hàng',     icon: CheckCircle, count: 45,                 color: 'text-success',      bg: 'bg-success-light',     border: 'border-success/30' },
  { label: 'Hội viên',       icon: Crown,       count: 11,                 color: 'text-brand-dark',   bg: 'bg-brand-dark/10',     border: 'border-brand-dark/30' },
  { label: 'Người ủng hộ',   icon: ThumbsUp,    count: 0,                  color: 'text-text-muted',   bg: 'bg-surface-3',         border: 'border-border' },
  { label: 'Fan hâm mộ',     icon: Star,        count: 0,                  color: 'text-text-muted',   bg: 'bg-surface-3',         border: 'border-border' },
]

export default function CRMContactsPage() {
  const [activeSegment, setActiveSegment] = useState<string>('Tổng KH')
  const [showAddForm, setShowAddForm] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = CONTACTS.filter(c => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) &&
        !c.email.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="page-wrapper">
      {/* Demo data banner */}
      <div className="bg-brand-olive/10 border border-brand-olive/30 rounded-xl px-4 py-2.5 flex items-center gap-2 text-xs text-brand-olive font-medium">
        <span>⚠️</span>
        <span>Đang hiển thị dữ liệu mẫu — CRM chưa kết nối Supabase. Số liệu thật cần tích hợp API contacts.</span>
      </div>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Khách hàng</h1>
          <p className="page-subtitle">{KPI.totalContacts} liên hệ</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/crm/pipeline" className="btn-secondary text-xs py-1.5">
            <TrendingUp size={12} />Xem Pipeline
          </Link>
          <button className="btn-secondary text-xs py-1.5">
            <RefreshCw size={12} />Đồng bộ
          </button>
          <button onClick={() => setShowAddForm(v => !v)} className="btn-primary text-xs py-1.5">
            <Plus size={12} />Thêm KH
          </button>
        </div>
      </div>

      {/* Segment Cards */}
      <div className="grid grid-cols-4 lg:grid-cols-8 gap-2">
        {SEGMENTS.map((seg) => {
          const Icon = seg.icon
          const isActive = activeSegment === seg.label
          return (
            <button
              key={seg.label}
              onClick={() => setActiveSegment(seg.label)}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all duration-150 ${
                isActive ? `${seg.bg} ${seg.border} shadow-card-md` : 'bg-surface border-border hover:border-brand-border/30 hover:bg-surface-2'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActive ? seg.bg : 'bg-surface-2'}`}>
                <Icon size={17} className={isActive ? seg.color : 'text-text-muted'} />
              </div>
              <p className={`text-lg font-bold font-mono leading-none ${isActive ? seg.color : 'text-text-primary'}`}>
                {seg.count}
              </p>
              <p className="text-[9px] text-text-muted leading-tight text-center">{seg.label}</p>
            </button>
          )
        })}
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Tìm theo tên, email, SĐT..."
            className="input-field pl-9 text-xs h-9"
          />
        </div>
        <button className="btn-secondary text-xs py-2 gap-1.5">
          <Filter size={12} />Trạng thái<ChevronDown size={11} />
        </button>
        <button className="btn-secondary text-xs py-2 gap-1.5">
          <Filter size={12} />Giai đoạn<ChevronDown size={11} />
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="card border-brand-border/30 animate-slide-up">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-brand-accent/10 flex items-center justify-center">
              <UserPlus size={14} className="text-brand-accent" />
            </div>
            <h3 className="section-title">Thêm khách hàng mới</h3>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div>
              <label className="text-text-muted text-xs mb-1.5 block">Tên <span className="text-danger">*</span></label>
              <input placeholder="Nguyễn Văn A" className="input-field text-xs" />
            </div>
            <div>
              <label className="text-text-muted text-xs mb-1.5 block">Email</label>
              <input type="email" placeholder="email@example.com" className="input-field text-xs" />
            </div>
            <div>
              <label className="text-text-muted text-xs mb-1.5 block">SĐT</label>
              <input type="tel" placeholder="0901234567" className="input-field text-xs" />
            </div>
            <div>
              <label className="text-text-muted text-xs mb-1.5 block">Gán cho sale</label>
              <div className="relative">
                <select className="input-field text-xs appearance-none pr-7">
                  <option value="">— Chưa gán —</option>
                  <option>Sale 1</option><option>Sale 2</option><option>Sale 3</option>
                </select>
                <ChevronDown size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="text-text-muted text-xs mb-1.5 block">Nguồn</label>
              <input placeholder="Facebook, Zalo..." className="input-field text-xs" />
            </div>
            <div>
              <label className="text-text-muted text-xs mb-1.5 block">Khoá học quan tâm</label>
              <div className="relative">
                <select className="input-field text-xs appearance-none pr-7">
                  <option value="">— Chọn khoá học —</option>
                  {COURSES.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                </select>
                <ChevronDown size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={() => setShowAddForm(false)} className="btn-secondary text-xs py-2">Huỷ</button>
            <button className="btn-primary text-xs py-2"><UserPlus size={12} />Thêm KH</button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="card card-hover">
        <div className="flex items-center justify-between mb-3">
          <h3 className="section-title text-sm">Danh sách liên hệ</h3>
          <p className="text-text-muted text-xs">Hiển thị {filtered.length} liên hệ</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="table-header">Khách hàng</th>
                <th className="table-header">Liên hệ</th>
                <th className="table-header">Nguồn</th>
                <th className="table-header">Khoá học</th>
                <th className="table-header">Giai đoạn</th>
                <th className="table-header">Pipeline</th>
                <th className="table-header"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => {
                const stageCfg = CONTACT_STAGE_CONFIG[c.stage]
                const sourceCfg = c.source ? SOURCE_CONFIG[c.source] : null
                const course = c.interestedCourseId ? COURSES.find(cr => cr.id === c.interestedCourseId) : null
                return (
                  <tr key={c.id} className="table-row">
                    <td className="table-cell">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-brand-dark/10 border border-brand-dark/15 flex items-center justify-center flex-shrink-0">
                          <span className="text-brand-dark text-[10px] font-bold">
                            {c.name.split(' ').pop()?.charAt(0)}
                          </span>
                        </div>
                        <span className="text-text-primary text-xs font-medium">{c.name}</span>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1 text-[10px] text-text-muted">
                          <Mail size={9} />{c.email}
                        </div>
                        {c.phone && (
                          <div className="flex items-center gap-1 text-[10px] text-text-muted">
                            <Phone size={9} />{c.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="table-cell">
                      {sourceCfg && <span className={`badge text-[10px] ${sourceCfg.badge}`}>{c.source}</span>}
                    </td>
                    <td className="table-cell">
                      {course ? (
                        <Link href={`/admin/courses`} className="flex items-center gap-1 text-xs text-text-secondary hover:text-brand-accent transition-colors group">
                          <BookOpen size={10} className="text-text-muted flex-shrink-0" />
                          <span className="truncate max-w-[130px]">{course.title.split('—')[0].trim()}</span>
                          <ExternalLink size={8} className="opacity-0 group-hover:opacity-50 flex-shrink-0" />
                        </Link>
                      ) : (
                        <span className="text-text-muted text-xs">—</span>
                      )}
                    </td>
                    <td className="table-cell">
                      <span className={`badge text-[10px] ${stageCfg.badge}`}>{c.stage}</span>
                    </td>
                    <td className="table-cell">
                      {/* Cross-link → Pipeline */}
                      <Link
                        href="/admin/crm/pipeline"
                        className="btn-ghost text-[10px] py-1 px-2 gap-1 text-brand-border hover:text-brand-accent"
                      >
                        <TrendingUp size={10} />Pipeline
                      </Link>
                    </td>
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
          <span>Hiển thị {filtered.length} / {KPI.totalContacts}</span>
          <div className="flex items-center gap-1">
            {[1,2,3,'…',83].map((p, i) => (
              <button key={i} className={`w-7 h-7 rounded flex items-center justify-center text-xs ${p === 1 ? 'bg-brand-dark text-text-on-dark font-medium' : 'hover:bg-surface-3 text-text-muted'}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
