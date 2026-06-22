'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BookOpen, Plus, Search, Filter, MoreHorizontal, Play, Users, Star, DollarSign, Eye, Edit, Trash2, ChevronDown, Grid3X3, List, ShoppingCart } from 'lucide-react'
import { COURSES, KPI } from '@/lib/constants'

const categoryColor: Record<string, string> = {
  Marketing:   'bg-info-light text-info border border-info/20',
  Content:     'badge-success',
  Copywriting: 'bg-brand-olive/10 text-brand-olive border border-brand-olive/20',
  Sales:       'bg-brand-border/10 text-brand-border border border-brand-border/20',
  Tech:        'bg-brand-dark/10 text-brand-dark border border-brand-dark/20',
  Business:    'bg-brand-accent/10 text-brand-accent border border-brand-accent/20',
}

export default function CoursesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [search, setSearch]     = useState('')

  const filtered = COURSES.filter(c =>
    !search || c.title.toLowerCase().includes(search.toLowerCase())
  )

  const totals = {
    students: COURSES.reduce((s, c) => s + c.students, 0),
    revenue:  COURSES.reduce((s, c) => s + c.revenue, 0),
    rating:   (COURSES.reduce((s, c) => s + c.rating, 0) / COURSES.length).toFixed(1),
  }

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">Quản lý Khoá học</h1>
          <p className="page-subtitle">{COURSES.length} khoá học · {totals.students} học viên</p>
        </div>
        <button className="btn-primary text-xs py-2">
          <Plus size={13} />Tạo khoá học
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Tổng khoá học',  value: String(COURSES.length), icon: BookOpen,     color: 'text-info',         bg: 'bg-info-light' },
          { label: 'Tổng học viên',  value: String(totals.students), icon: Users,        color: 'text-success',      bg: 'bg-success-light' },
          { label: 'Doanh thu',      value: `${(totals.revenue/1_000_000_000).toFixed(2)}B₫`, icon: DollarSign, color: 'text-brand-accent', bg: 'bg-brand-accent/10' },
          { label: 'Rating TB',      value: `${totals.rating}★`,    icon: Star,         color: 'text-brand-olive',  bg: 'bg-brand-olive/10' },
        ].map((s) => {
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

      {/* Controls */}
      <div className="flex items-center gap-2">
        <div className="relative max-w-xs flex-1">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm khoá học..." className="input-field pl-9 text-xs h-9" />
        </div>
        <button className="btn-secondary text-xs py-2"><Filter size={12} />Danh mục<ChevronDown size={11} /></button>
        <div className="ml-auto flex items-center gap-1 bg-surface border border-border rounded-lg p-1 shadow-card">
          <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded ${viewMode==='grid' ? 'bg-brand-dark text-text-on-dark' : 'text-text-muted hover:text-text-primary'}`}><Grid3X3 size={14} /></button>
          <button onClick={() => setViewMode('list')} className={`p-1.5 rounded ${viewMode==='list' ? 'bg-brand-dark text-text-on-dark' : 'text-text-muted hover:text-text-primary'}`}><List size={14} /></button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((course) => (
            <div key={course.id} className="card card-hover group flex flex-col gap-3">
              {/* Thumbnail */}
              <div className="w-full h-36 bg-surface-2 rounded-lg flex items-center justify-center relative overflow-hidden border border-border">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/3 to-brand-accent/3" />
                <BookOpen size={28} className="text-border relative z-10" />
                <div className="absolute top-2 right-2 flex gap-1">
                  <span className={`badge text-[10px] ${categoryColor[course.category] ?? 'badge-gray'}`}>{course.category}</span>
                  {course.status === 'draft' && <span className="badge badge-gray text-[10px]">Nháp</span>}
                </div>
                <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-brand-dark/30">
                  <div className="w-10 h-10 rounded-full bg-brand-accent flex items-center justify-center shadow-btn">
                    <Play size={16} className="text-white ml-0.5" />
                  </div>
                </button>
              </div>
              {/* Info */}
              <div className="flex-1">
                <h3 className="text-text-primary text-sm font-semibold line-clamp-2 leading-snug">{course.title}</h3>
                <div className="flex items-center gap-3 mt-2 text-[10px] text-text-muted">
                  <span className="flex items-center gap-1"><Play size={9} />{course.lessons} bài</span>
                  <span className="flex items-center gap-1"><Users size={9} />{course.students}</span>
                  <span className="flex items-center gap-1 text-brand-olive"><Star size={9} />{course.rating}</span>
                </div>
              </div>
              {/* Footer */}
              <div className="pt-3 border-t border-border flex items-center justify-between">
                <div>
                  <p className="text-brand-accent font-bold font-mono text-sm">{course.price.toLocaleString('vi-VN')}₫</p>
                  <p className="text-success text-[10px]">DT: {(course.revenue/1_000_000).toFixed(0)}M₫</p>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {/* Cross-link → Orders */}
                  <Link href={`/admin/orders?course=${course.id}`} className="btn-ghost p-1.5" title="Xem đơn hàng">
                    <ShoppingCart size={12} />
                  </Link>
                  <button className="btn-ghost p-1.5"><Eye size={13} /></button>
                  <button className="btn-ghost p-1.5"><Edit size={13} /></button>
                  <button className="btn-ghost p-1.5 hover:text-danger"><Trash2 size={13} /></button>
                </div>
              </div>
            </div>
          ))}
          {/* Add card */}
          <button className="card border-dashed hover:border-brand-accent/40 hover:bg-surface-2 flex flex-col items-center justify-center gap-3 h-64 transition-all group">
            <div className="w-12 h-12 rounded-full bg-surface-2 group-hover:bg-brand-accent/10 flex items-center justify-center transition-colors">
              <Plus size={20} className="text-text-muted group-hover:text-brand-accent transition-colors" />
            </div>
            <p className="text-text-muted text-sm group-hover:text-text-secondary transition-colors">Tạo khoá học mới</p>
          </button>
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="card card-hover">
          <table className="w-full">
            <thead>
              <tr>
                <th className="table-header">Khoá học</th>
                <th className="table-header text-right">Giá</th>
                <th className="table-header text-right">Học viên</th>
                <th className="table-header text-right">Doanh thu</th>
                <th className="table-header text-right">Rating</th>
                <th className="table-header">Trạng thái</th>
                <th className="table-header"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="table-row">
                  <td className="table-cell">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-surface-2 border border-border flex items-center justify-center flex-shrink-0">
                        <BookOpen size={14} className="text-text-muted" />
                      </div>
                      <div>
                        <p className="text-text-primary text-xs font-medium line-clamp-1 max-w-xs">{c.title}</p>
                        <span className={`badge text-[9px] mt-0.5 ${categoryColor[c.category] ?? 'badge-gray'}`}>{c.category}</span>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell text-right font-mono text-brand-accent text-xs">{c.price.toLocaleString('vi-VN')}₫</td>
                  <td className="table-cell text-right font-mono text-xs">{c.students}</td>
                  <td className="table-cell text-right font-mono text-success text-xs">{(c.revenue/1_000_000).toFixed(0)}M₫</td>
                  <td className="table-cell text-right text-brand-olive text-xs">★{c.rating}</td>
                  <td className="table-cell">
                    {c.status==='active' ? <span className="badge badge-success text-[10px]">Active</span> : <span className="badge badge-gray text-[10px]">Draft</span>}
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center gap-1">
                      <Link href={`/admin/orders?course=${c.id}`} className="btn-ghost p-1" title="Đơn hàng"><ShoppingCart size={12} /></Link>
                      <button className="btn-ghost p-1"><MoreHorizontal size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
