'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FileText, Globe, Eye, Clock, Tag, ExternalLink } from 'lucide-react'
import { POSTS } from '@/lib/posts'

type StatusFilter = 'all' | 'published'

const CATEGORY_COLOR: Record<string, string> = {
  'AI thực chiến': 'bg-brand-accent/10 text-brand-accent border border-brand-accent/20',
  'Hướng dẫn':     'badge-success',
  'Kinh doanh':    'bg-brand-olive/10 text-brand-olive border border-brand-olive/20',
  'Marketing':     'bg-info-light text-info border border-info/20',
}

export default function BlogPage() {
  const [search, setSearch] = useState('')

  const filtered = POSTS.filter(p =>
    !search || p.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">Quản lý Blog</h1>
          <p className="page-subtitle">{POSTS.length} bài viết · {POSTS.length} đã xuất bản</p>
        </div>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Tổng bài viết',  value: String(POSTS.length),  icon: FileText, color: 'text-info',         bg: 'bg-info-light' },
          { label: 'Đã xuất bản',    value: String(POSTS.length),  icon: Globe,    color: 'text-success',      bg: 'bg-success-light' },
          { label: 'Tổng phút đọc',  value: String(POSTS.reduce((s,p)=>s+p.readMin,0)), icon: Clock, color: 'text-brand-olive', bg: 'bg-brand-olive/10' },
          { label: 'Danh mục',       value: String(new Set(POSTS.map(p=>p.category)).size), icon: Tag, color: 'text-brand-border', bg: 'bg-brand-border/10' },
        ].map(s => {
          const Icon = s.icon
          return (
            <div key={s.label} className="bg-surface border border-border rounded-xl p-4 shadow-card flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${s.bg}`}>
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

      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <FileText size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Tìm bài viết..."
            className="input-field pl-9 text-xs w-full"
          />
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-text-muted">
          <div className="w-2 h-2 rounded-full bg-success" />
          Dữ liệu thật · Bài viết trong <code className="bg-surface-2 px-1 rounded">lib/posts.ts</code>
        </div>
      </div>

      {/* Posts grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map(p => {
          const catColor = CATEGORY_COLOR[p.category] ?? 'badge-gray'
          const dateStr  = new Date(p.date).toLocaleDateString('vi-VN', { day:'2-digit', month:'2-digit', year:'numeric' })
          return (
            <div key={p.slug} className="card card-hover flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`badge text-[10px] ${catColor}`}>{p.category}</span>
                  <span className="badge badge-success text-[10px] flex items-center gap-1">
                    <Globe size={9} />Đã xuất bản
                  </span>
                </div>
              </div>

              <h3 className="font-bold text-text-primary text-sm leading-snug">{p.title}</h3>
              <p className="text-text-muted text-xs leading-relaxed line-clamp-2">{p.description}</p>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center gap-3 text-[10px] text-text-muted">
                  <span className="flex items-center gap-1"><Clock size={10} />{p.readMin} phút đọc</span>
                  <span>{dateStr}</span>
                </div>
                <Link
                  href={`/tin-tuc/${p.slug}`}
                  target="_blank"
                  className="flex items-center gap-1 text-[10px] text-brand-border hover:text-brand-dark font-medium"
                >
                  Xem <ExternalLink size={9} />
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center">
          <FileText size={28} className="text-text-muted mx-auto mb-2" strokeWidth={1.5} />
          <p className="text-text-muted text-sm">Không tìm thấy bài viết nào</p>
        </div>
      )}
    </div>
  )
}
