'use client'

import { useState } from 'react'
import {
  FileText, Plus, Search, Filter, MoreHorizontal,
  Eye, Edit, Trash2, Globe, Clock, Tag, TrendingUp,
  CalendarDays, ChevronDown, ExternalLink, BookOpen
} from 'lucide-react'

type PostStatus = 'all' | 'published' | 'draft' | 'scheduled'

const POSTS = [
  { id: 1, title: 'Affiliate Marketing 2026: Chien luoc kiem 100 trieu/thang cho nguoi moi',  category: 'Marketing', status: 'published', views: 12450, readTime: 8,  publishedAt: '28/05/2026', slug: 'affiliate-marketing-2026', tags: ['affiliate', 'marketing', 'thu nhap thu dong'] },
  { id: 2, title: 'Email Marketing la gi? Huong dan A-Z xay dung list 10.000 subscribers',     category: 'Email',     status: 'published', views: 8230,  readTime: 12, publishedAt: '24/05/2026', slug: 'email-marketing-la-gi',    tags: ['email', 'marketing', 'subscribers'] },
  { id: 3, title: 'VSL la gi? Cach viet kich ban video ban hang chuyen doi cao nhat 2026',    category: 'Copywriting',status: 'published', views: 6100,  readTime: 10, publishedAt: '20/05/2026', slug: 'vsl-la-gi',                tags: ['vsl', 'video', 'copywriting'] },
  { id: 4, title: 'CRM cho nguoi ban khoa hoc: Tat ca nhung gi ban can biet',                  category: 'CRM',       status: 'draft',     views: 0,     readTime: 15, publishedAt: null,          slug: 'crm-ban-khoa-hoc',         tags: ['crm', 'ban hang'] },
  { id: 5, title: 'Content System: Quy trinh san xuat 30 bai/thang ma khong bi can kie',      category: 'Content',   status: 'scheduled', views: 0,     readTime: 9,  publishedAt: '05/06/2026', slug: 'content-system',           tags: ['content', 'san xuat'] },
  { id: 6, title: 'Funnel ban khoa hoc: Tu quang cao den chot don trong 7 buoc',               category: 'Funnel',    status: 'published', views: 4850,  readTime: 11, publishedAt: '15/05/2026', slug: 'funnel-ban-khoa-hoc',      tags: ['funnel', 'chuyen doi'] },
]

const STATUS_CFG: Record<string, { label: string; badge: string; icon: React.ElementType }> = {
  published: { label: 'Da xuat ban', badge: 'badge-success',  icon: Globe },
  draft:     { label: 'Ban nhap',    badge: 'badge-gray',     icon: Edit },
  scheduled: { label: 'Len lich',    badge: 'badge-blue',     icon: CalendarDays },
}

const CATEGORY_CFG: Record<string, string> = {
  Marketing:   'bg-info-light text-info border border-info/20',
  Email:       'bg-brand-olive/10 text-brand-olive border border-brand-olive/20',
  Copywriting: 'bg-brand-accent/10 text-brand-accent border border-brand-accent/20',
  CRM:         'bg-brand-border/10 text-brand-border border border-brand-border/20',
  Content:     'badge-success',
  Funnel:      'bg-brand-dark/10 text-brand-dark border border-brand-dark/20',
}

export default function BlogPage() {
  const [statusFilter, setStatusFilter] = useState<PostStatus>('all')
  const [search, setSearch] = useState('')

  const filtered = POSTS.filter(p => {
    if (statusFilter !== 'all' && p.status !== statusFilter) return false
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const stats = {
    total:     POSTS.length,
    published: POSTS.filter(p => p.status === 'published').length,
    totalViews:POSTS.reduce((s, p) => s + p.views, 0),
    draft:     POSTS.filter(p => p.status === 'draft').length,
  }

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">Quan ly Blog</h1>
          <p className="page-subtitle">{stats.published} bai da xuat ban - {stats.totalViews.toLocaleString('vi-VN')} luot xem</p>
        </div>
        <div className="flex items-center gap-2">
          <a href="/" target="_blank" className="btn-secondary text-xs py-1.5">
            <ExternalLink size={12} />Xem Blog
          </a>
          <button className="btn-primary text-xs py-1.5">
            <Plus size={12} />Viet bai moi
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Tong bai viet',   value: String(stats.total),                       icon: FileText,  color: 'text-info',         bg: 'bg-info-light' },
          { label: 'Da xuat ban',     value: String(stats.published),                   icon: Globe,     color: 'text-success',      bg: 'bg-success-light' },
          { label: 'Tong luot xem',   value: stats.totalViews.toLocaleString('vi-VN'),  icon: Eye,       color: 'text-brand-accent', bg: 'bg-brand-accent/10' },
          { label: 'Ban nhap',        value: String(stats.draft),                       icon: Edit,      color: 'text-text-muted',   bg: 'bg-surface-3' },
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

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tim bai viet..." className="input-field pl-9 text-xs h-9" />
        </div>
        <div className="flex items-center gap-1 bg-surface border border-border rounded-lg p-1 shadow-card">
          {(['all', 'published', 'draft', 'scheduled'] as const).map(f => (
            <button key={f} onClick={() => setStatusFilter(f)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${statusFilter === f ? 'bg-brand-dark text-text-on-dark' : 'text-text-muted hover:text-text-primary'}`}>
              {f === 'all' ? 'Tat ca' : STATUS_CFG[f].label}
            </button>
          ))}
        </div>
        <button className="btn-secondary text-xs py-2"><Filter size={12} />Danh muc<ChevronDown size={11} /></button>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filtered.map((post) => {
          const sc = STATUS_CFG[post.status]
          const StatusIcon = sc.icon
          return (
            <div key={post.id} className="card card-hover group flex flex-col gap-3">
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface-2 border border-border flex items-center justify-center flex-shrink-0 group-hover:bg-brand-dark/5 transition-colors">
                  <FileText size={16} className="text-text-muted" />
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className={`badge text-[10px] ${STATUS_CFG[post.status].badge}`}>
                    <StatusIcon size={8} className="mr-0.5" />
                    {sc.label}
                  </span>
                </div>
              </div>

              {/* Title */}
              <div className="flex-1">
                <h3 className="text-text-primary text-sm font-semibold leading-snug line-clamp-2 group-hover:text-brand-dark transition-colors">
                  {post.title}
                </h3>
              </div>

              {/* Tags */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className={`badge text-[9px] ${CATEGORY_CFG[post.category] ?? 'badge-gray'}`}>
                  {post.category}
                </span>
                {post.tags.slice(0, 2).map(t => (
                  <span key={t} className="flex items-center gap-0.5 text-[9px] text-text-muted">
                    <Tag size={7} />{t}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-3 text-[10px] text-text-muted">
                  {post.views > 0 && (
                    <span className="flex items-center gap-1">
                      <Eye size={9} />{post.views.toLocaleString()}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Clock size={9} />{post.readTime} phut
                  </span>
                  {post.publishedAt && (
                    <span className="flex items-center gap-1">
                      <CalendarDays size={9} />{post.publishedAt}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="btn-ghost p-1.5"><Eye size={12} /></button>
                  <button className="btn-ghost p-1.5"><Edit size={12} /></button>
                  <button className="btn-ghost p-1.5 hover:text-danger"><Trash2 size={12} /></button>
                </div>
              </div>
            </div>
          )
        })}

        {/* New post card */}
        <button className="card border-dashed hover:border-brand-accent/40 hover:bg-surface-2 flex flex-col items-center justify-center gap-3 min-h-[180px] transition-all group">
          <div className="w-12 h-12 rounded-full bg-surface-2 group-hover:bg-brand-accent/10 flex items-center justify-center transition-colors">
            <Plus size={20} className="text-text-muted group-hover:text-brand-accent transition-colors" />
          </div>
          <div className="text-center">
            <p className="text-text-secondary text-sm font-medium group-hover:text-text-primary">Viet bai moi</p>
            <p className="text-text-muted text-xs mt-0.5">Thu hut hoc vien qua SEO content</p>
          </div>
        </button>
      </div>

      {/* SEO Tips */}
      <div className="card bg-brand-dark/3 border-brand-border/20">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-border/15 flex items-center justify-center flex-shrink-0">
            <TrendingUp size={15} className="text-brand-border" />
          </div>
          <div>
            <p className="text-text-primary text-sm font-semibold">SEO Performance</p>
            <p className="text-text-muted text-xs mt-0.5">
              {stats.totalViews.toLocaleString()} luot xem tu organic search.
              Bai viet "Affiliate Marketing 2026" dang top 3 Google VN.
            </p>
          </div>
          <button className="btn-secondary text-xs py-1.5 ml-auto flex-shrink-0">
            <BookOpen size={11} />Xem chi tiet SEO
          </button>
        </div>
      </div>
    </div>
  )
}
