'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import {
  Users, Target, UserPlus, ShoppingCart, CheckCircle, Crown,
  ThumbsUp, Star, Search, Filter, RefreshCw, Plus, MoreHorizontal,
  Phone, Mail, BookOpen, ChevronDown, TrendingUp, Loader2
} from 'lucide-react'
import { CONTACT_STAGE_CONFIG, SOURCE_CONFIG } from '@/lib/constants'
import { courseShortName } from '@/lib/products'
import type { DBContact } from '@/app/api/admin/contacts/route'

const SOURCES = ['Facebook', 'Organic', 'Ads', 'Zalo', 'Referral', 'Email', 'TikTok']
const STAGES  = ['KH Tiềm năng', 'Người mua hàng', 'Khách hàng', 'Hội viên', 'KH Mục tiêu', 'Người ủng hộ', 'Fan hâm mộ']

type SegmentDef = { label: string; icon: React.ElementType; color: string; bg: string; border: string }

const SEGMENT_DEFS: SegmentDef[] = [
  { label: 'Tổng KH',         icon: Users,       color: 'text-info',         bg: 'bg-info/10',           border: 'border-info/40' },
  { label: 'KH Tiềm năng',   icon: UserPlus,    color: 'text-brand-border', bg: 'bg-brand-border/10',   border: 'border-brand-border/30' },
  { label: 'Người mua hàng', icon: ShoppingCart,color: 'text-brand-olive',  bg: 'bg-brand-olive/10',    border: 'border-brand-olive/30' },
  { label: 'Khách hàng',     icon: CheckCircle, color: 'text-success',      bg: 'bg-success-light',     border: 'border-success/30' },
  { label: 'Hội viên',       icon: Crown,       color: 'text-brand-dark',   bg: 'bg-brand-dark/10',     border: 'border-brand-dark/30' },
  { label: 'KH Mục tiêu',   icon: Target,      color: 'text-text-muted',   bg: 'bg-surface-3',         border: 'border-border' },
  { label: 'Người ủng hộ',  icon: ThumbsUp,    color: 'text-text-muted',   bg: 'bg-surface-3',         border: 'border-border' },
  { label: 'Fan hâm mộ',    icon: Star,        color: 'text-text-muted',   bg: 'bg-surface-3',         border: 'border-border' },
]

type AddForm = { name: string; email: string; phone: string; source: string; stage: string; interested_course_id: string }
const EMPTY_FORM: AddForm = { name: '', email: '', phone: '', source: '', stage: 'KH Tiềm năng', interested_course_id: '' }

const PAGE_SIZE = 20

export default function CRMContactsPage() {
  const [contacts,      setContacts]      = useState<DBContact[]>([])
  const [byStage,       setByStage]       = useState<Record<string, number>>({})
  const [total,         setTotal]         = useState(0)
  const [loading,       setLoading]       = useState(true)
  const [saving,        setSaving]        = useState(false)
  const [activeSegment, setActiveSegment] = useState('Tổng KH')
  const [showAddForm,   setShowAddForm]   = useState(false)
  const [search,        setSearch]        = useState('')
  const [page,          setPage]          = useState(1)
  const [form,          setForm]          = useState<AddForm>(EMPTY_FORM)
  const [formError,     setFormError]     = useState('')
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const fetchContacts = useCallback(async (opts?: { search?: string; stage?: string; page?: number }) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page:     String(opts?.page     ?? page),
        pageSize: String(PAGE_SIZE),
        search:   opts?.search          ?? search,
        stage:    opts?.stage           ?? activeSegment,
      })
      const res  = await fetch(`/api/admin/contacts?${params}`)
      const json = await res.json()
      setContacts(json.contacts ?? [])
      setByStage(json.byStage  ?? {})
      setTotal(json.total       ?? 0)
    } finally {
      setLoading(false)
    }
  }, [page, search, activeSegment])

  useEffect(() => { fetchContacts() }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function handleSearchChange(val: string) {
    setSearch(val)
    if (searchTimer.current) clearTimeout(searchTimer.current)
    searchTimer.current = setTimeout(() => {
      setPage(1)
      fetchContacts({ search: val, page: 1 })
    }, 350)
  }

  function handleSegment(label: string) {
    setActiveSegment(label)
    setPage(1)
    fetchContacts({ stage: label, page: 1 })
  }

  function handlePageChange(p: number) {
    setPage(p)
    fetchContacts({ page: p })
  }

  async function handleAddContact() {
    setFormError('')
    if (!form.email) { setFormError('Email là bắt buộc'); return }
    setSaving(true)
    try {
      const res = await fetch('/api/admin/contacts', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      })
      const json = await res.json()
      if (!res.ok) { setFormError(json.error ?? 'Lỗi không xác định'); return }
      setForm(EMPTY_FORM)
      setShowAddForm(false)
      fetchContacts()
    } finally {
      setSaving(false)
    }
  }

  async function handleStageChange(contactId: string, newStage: string) {
    await fetch(`/api/admin/contacts/${contactId}`, {
      method:  'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ stage: newStage }),
    })
    fetchContacts()
  }

  const totalPages = Math.ceil(total / PAGE_SIZE)
  const stageCounts: Record<string, number> = { 'Tổng KH': total, ...byStage }

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Khách hàng</h1>
          <p className="page-subtitle">{loading ? '...' : `${total} liên hệ thật từ Supabase`}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/crm/pipeline" className="btn-secondary text-xs py-1.5">
            <TrendingUp size={12} />Xem Pipeline
          </Link>
          <button onClick={() => fetchContacts()} disabled={loading} className="btn-secondary text-xs py-1.5">
            <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />Làm mới
          </button>
          <button onClick={() => setShowAddForm(v => !v)} className="btn-primary text-xs py-1.5">
            <Plus size={12} />Thêm KH
          </button>
        </div>
      </div>

      {/* Segment Cards */}
      <div className="grid grid-cols-4 lg:grid-cols-8 gap-2">
        {SEGMENT_DEFS.map((seg) => {
          const Icon     = seg.icon
          const isActive = activeSegment === seg.label
          const count    = stageCounts[seg.label] ?? 0
          return (
            <button
              key={seg.label}
              onClick={() => handleSegment(seg.label)}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all duration-150 ${
                isActive ? `${seg.bg} ${seg.border} shadow-card-md` : 'bg-surface border-border hover:border-brand-border/30 hover:bg-surface-2'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActive ? seg.bg : 'bg-surface-2'}`}>
                <Icon size={17} className={isActive ? seg.color : 'text-text-muted'} />
              </div>
              <p className={`text-lg font-bold font-mono leading-none ${isActive ? seg.color : 'text-text-primary'}`}>
                {loading ? '—' : count}
              </p>
              <p className="text-[9px] text-text-muted leading-tight text-center">{seg.label}</p>
            </button>
          )
        })}
      </div>

      {/* Search */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            value={search}
            onChange={e => handleSearchChange(e.target.value)}
            placeholder="Tìm theo tên, email, SĐT..."
            className="input-field pl-9 text-xs h-9"
          />
        </div>
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
              <label className="text-text-muted text-xs mb-1.5 block">Tên</label>
              <input value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))}
                placeholder="Nguyễn Văn A" className="input-field text-xs" />
            </div>
            <div>
              <label className="text-text-muted text-xs mb-1.5 block">Email <span className="text-danger">*</span></label>
              <input type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))}
                placeholder="email@example.com" className="input-field text-xs" />
            </div>
            <div>
              <label className="text-text-muted text-xs mb-1.5 block">SĐT</label>
              <input type="tel" value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))}
                placeholder="0901234567" className="input-field text-xs" />
            </div>
            <div>
              <label className="text-text-muted text-xs mb-1.5 block">Nguồn</label>
              <div className="relative">
                <select value={form.source} onChange={e => setForm(f => ({...f, source: e.target.value}))}
                  className="input-field text-xs appearance-none pr-7">
                  <option value="">— Chọn nguồn —</option>
                  {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="text-text-muted text-xs mb-1.5 block">Giai đoạn</label>
              <div className="relative">
                <select value={form.stage} onChange={e => setForm(f => ({...f, stage: e.target.value}))}
                  className="input-field text-xs appearance-none pr-7">
                  {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="text-text-muted text-xs mb-1.5 block">Khóa quan tâm</label>
              <input value={form.interested_course_id}
                onChange={e => setForm(f => ({...f, interested_course_id: e.target.value}))}
                placeholder="khoa-1, landing-page..." className="input-field text-xs" />
            </div>
          </div>
          {formError && <p className="text-danger text-xs mb-2">{formError}</p>}
          <div className="flex justify-end gap-2">
            <button onClick={() => { setShowAddForm(false); setForm(EMPTY_FORM); setFormError('') }}
              className="btn-secondary text-xs py-2">Huỷ</button>
            <button onClick={handleAddContact} disabled={saving} className="btn-primary text-xs py-2">
              {saving ? <Loader2 size={12} className="animate-spin" /> : <UserPlus size={12} />}Thêm KH
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="card card-hover">
        <div className="flex items-center justify-between mb-3">
          <h3 className="section-title text-sm">Danh sách liên hệ</h3>
          <p className="text-text-muted text-xs">Hiển thị {contacts.length} / {total}</p>
        </div>
        {loading ? (
          <div className="h-40 flex items-center justify-center">
            <Loader2 size={20} className="animate-spin text-text-muted" />
          </div>
        ) : contacts.length === 0 ? (
          <p className="text-text-muted text-xs text-center py-8">Chưa có liên hệ nào</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="table-header">Khách hàng</th>
                  <th className="table-header">Liên hệ</th>
                  <th className="table-header">Nguồn</th>
                  <th className="table-header">Khóa quan tâm</th>
                  <th className="table-header">Giai đoạn</th>
                  <th className="table-header">Pipeline</th>
                  <th className="table-header"></th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => {
                  const stageCfg  = CONTACT_STAGE_CONFIG[c.stage as keyof typeof CONTACT_STAGE_CONFIG]
                  const sourceCfg = c.source ? SOURCE_CONFIG[c.source as keyof typeof SOURCE_CONFIG] : null
                  return (
                    <tr key={c.id} className="table-row">
                      <td className="table-cell">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-brand-dark/10 border border-brand-dark/15 flex items-center justify-center flex-shrink-0">
                            <span className="text-brand-dark text-[10px] font-bold">
                              {(c.name ?? c.email).split(' ').pop()?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="text-text-primary text-xs font-medium">{c.name ?? '—'}</span>
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
                        {sourceCfg
                          ? <span className={`badge text-[10px] ${sourceCfg.badge}`}>{c.source}</span>
                          : <span className="text-text-muted text-xs">—</span>}
                      </td>
                      <td className="table-cell">
                        {c.interested_course_id ? (
                          <div className="flex items-center gap-1 text-xs text-text-secondary">
                            <BookOpen size={10} className="text-text-muted flex-shrink-0" />
                            <span className="truncate max-w-[120px]">{courseShortName(c.interested_course_id)}</span>
                          </div>
                        ) : (
                          <span className="text-text-muted text-xs">—</span>
                        )}
                      </td>
                      <td className="table-cell">
                        <div className="relative">
                          <select
                            value={c.stage}
                            onChange={e => handleStageChange(c.id, e.target.value)}
                            className={`text-[10px] font-medium px-2 py-0.5 rounded-full border cursor-pointer appearance-none pr-4 ${
                              stageCfg?.badge ?? 'badge-gray'
                            }`}
                          >
                            {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                          <ChevronDown size={8} className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                        </div>
                      </td>
                      <td className="table-cell">
                        <Link href="/admin/crm/pipeline"
                          className="btn-ghost text-[10px] py-1 px-2 gap-1 text-brand-border hover:text-brand-accent">
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
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs text-text-muted">
            <span>Trang {page}/{totalPages} — {total} liên hệ</span>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => handlePageChange(p)}
                  className={`w-7 h-7 rounded flex items-center justify-center text-xs ${
                    p === page ? 'bg-brand-dark text-text-on-dark font-medium' : 'hover:bg-surface-3 text-text-muted'
                  }`}>{p}</button>
              ))}
              {totalPages > 5 && <span className="px-1">…</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
