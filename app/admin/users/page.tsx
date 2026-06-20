'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Users, Search, Filter, Download, Plus, MoreHorizontal,
  Mail, Phone, BookOpen, ChevronDown, UserCheck,
  UserX, Crown, Star, TrendingUp, ExternalLink
} from 'lucide-react'
import { COURSES, KPI } from '@/lib/constants'

type UserStatus = 'all' | 'active' | 'inactive' | 'blocked'

const MOCK_USERS = [
  { id: 1, name: 'Nguyen Van An',    email: 'nva@gmail.com',  phone: '0901234567', courses: [1, 2], totalPaid: 3480000, joinedAt: '15/01/2026', lastActive: '31/05/2026', status: 'active',   isVip: false },
  { id: 2, name: 'Tran Thi Binh',   email: 'ttb@gmail.com',  phone: '0912345678', courses: [2],    totalPaid: 1490000, joinedAt: '20/01/2026', lastActive: '30/05/2026', status: 'active',   isVip: false },
  { id: 3, name: 'Le Minh Cuong',   email: 'lmc@gmail.com',  phone: '0923456789', courses: [1, 3, 4], totalPaid: 5470000, joinedAt: '01/02/2026', lastActive: '29/05/2026', status: 'active', isVip: true  },
  { id: 4, name: 'Pham Thu Dung',   email: 'ptd@gmail.com',  phone: '0934567890', courses: [4],    totalPaid: 2490000, joinedAt: '10/02/2026', lastActive: '28/05/2026', status: 'active',   isVip: false },
  { id: 5, name: 'Hoang Van Em',    email: 'hve@gmail.com',  phone: '0945678901', courses: [],     totalPaid: 0,       joinedAt: '12/02/2026', lastActive: '01/04/2026', status: 'inactive', isVip: false },
  { id: 6, name: 'Vu Thi Phuong',   email: 'vtp@gmail.com',  phone: '0956789012', courses: [1, 2], totalPaid: 3480000, joinedAt: '14/02/2026', lastActive: '31/05/2026', status: 'active',   isVip: false },
  { id: 7, name: 'Dang Quoc Giang', email: 'dqg@gmail.com',  phone: '0967890123', courses: [4],    totalPaid: 2490000, joinedAt: '16/02/2026', lastActive: '31/05/2026', status: 'active',   isVip: false },
  { id: 8, name: 'Bui Thi Hoa',     email: 'bth@gmail.com',  phone: '0978901234', courses: [3],    totalPaid: 990000,  joinedAt: '18/02/2026', lastActive: '05/05/2026', status: 'inactive', isVip: false },
]

const STATUS_CFG: Record<string, { label: string; badge: string }> = {
  active:   { label: 'Hoat dong', badge: 'badge-success' },
  inactive: { label: 'Khong HD',  badge: 'badge-gray' },
  blocked:  { label: 'Da khoa',   badge: 'badge-danger' },
}

export default function UsersPage() {
  const [statusFilter, setStatusFilter] = useState<UserStatus>('all')
  const [search, setSearch] = useState('')

  const filtered = MOCK_USERS.filter(u => {
    if (statusFilter !== 'all' && u.status !== statusFilter) return false
    if (search && !u.name.toLowerCase().includes(search.toLowerCase()) &&
        !u.email.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const stats = {
    total:   MOCK_USERS.length,
    active:  MOCK_USERS.filter(u => u.status === 'active').length,
    vip:     MOCK_USERS.filter(u => u.isVip).length,
    revenue: MOCK_USERS.reduce((s, u) => s + u.totalPaid, 0),
  }

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">Quan ly Users</h1>
          <p className="page-subtitle">{KPI.newStudents} hoc vien da dang ky</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary text-xs py-1.5"><Download size={12} />Xuat Excel</button>
          <button className="btn-primary text-xs py-1.5"><Plus size={12} />Them hoc vien</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Tong hoc vien',  value: String(stats.total),  icon: Users,     color: 'text-info',         bg: 'bg-info-light' },
          { label: 'Dang hoat dong', value: String(stats.active), icon: UserCheck, color: 'text-success',      bg: 'bg-success-light' },
          { label: 'VIP members',    value: String(stats.vip),    icon: Crown,     color: 'text-brand-olive',  bg: 'bg-brand-olive/10' },
          { label: 'Tong hoc phi',   value: `${(stats.revenue / 1_000_000).toFixed(1)}M`, icon: TrendingUp, color: 'text-brand-accent', bg: 'bg-brand-accent/10' },
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
        <div className="relative max-w-xs flex-1">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tim theo ten, email..." className="input-field pl-9 text-xs h-9" />
        </div>
        <div className="flex items-center gap-1 bg-surface border border-border rounded-lg p-1 shadow-card">
          {(['all', 'active', 'inactive'] as const).map(f => (
            <button key={f} onClick={() => setStatusFilter(f)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${statusFilter === f ? 'bg-brand-dark text-text-on-dark' : 'text-text-muted hover:text-text-primary'}`}>
              {f === 'all' ? 'Tat ca' : STATUS_CFG[f].label}
            </button>
          ))}
        </div>
        <button className="btn-secondary text-xs py-2"><Filter size={12} />Khoa hoc<ChevronDown size={11} /></button>
      </div>

      {/* Table */}
      <div className="card card-hover">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="table-header">Hoc vien</th>
                <th className="table-header">Lien he</th>
                <th className="table-header">Khoa hoc</th>
                <th className="table-header text-right">Hoc phi</th>
                <th className="table-header">Tham gia</th>
                <th className="table-header">Cuoi cung</th>
                <th className="table-header">Trang thai</th>
                <th className="table-header"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => {
                const sc = STATUS_CFG[u.status]
                return (
                  <tr key={u.id} className="table-row">
                    <td className="table-cell">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-brand-dark/10 border border-brand-dark/15 flex items-center justify-center flex-shrink-0 relative">
                          <span className="text-brand-dark text-xs font-bold">{u.name.split(' ').pop()?.charAt(0)}</span>
                          {u.isVip && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-brand-olive rounded-full flex items-center justify-center">
                              <Crown size={8} className="text-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-text-primary text-xs font-medium flex items-center gap-1">
                            {u.name}
                            {u.isVip && <Star size={9} className="text-brand-olive fill-brand-olive" />}
                          </p>
                          <p className="text-text-muted text-[10px]">ID: #{String(u.id).padStart(4, '0')}</p>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1 text-[10px] text-text-muted"><Mail size={9} />{u.email}</div>
                        <div className="flex items-center gap-1 text-[10px] text-text-muted"><Phone size={9} />{u.phone}</div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center gap-1 flex-wrap">
                        {u.courses.length > 0 ? (
                          <>
                            {u.courses.slice(0, 2).map(cId => {
                              const course = COURSES.find(c => c.id === cId)
                              return course ? (
                                <Link key={cId} href="/admin/courses"
                                  className="flex items-center gap-1 bg-surface-2 border border-border rounded px-1.5 py-0.5 text-[9px] text-text-secondary hover:text-brand-accent hover:border-brand-border/30 transition-colors">
                                  <BookOpen size={8} />{course.title.split(' ').slice(0, 2).join(' ')}
                                </Link>
                              ) : null
                            })}
                            {u.courses.length > 2 && <span className="badge badge-gray text-[9px]">+{u.courses.length - 2}</span>}
                          </>
                        ) : (
                          <span className="text-text-muted text-xs italic">Chua mua</span>
                        )}
                      </div>
                    </td>
                    <td className="table-cell text-right">
                      {u.totalPaid > 0
                        ? <span className="text-brand-accent font-mono font-semibold text-xs">{u.totalPaid.toLocaleString('vi-VN')}</span>
                        : <span className="text-text-muted text-xs">-</span>}
                    </td>
                    <td className="table-cell text-text-muted text-xs">{u.joinedAt}</td>
                    <td className="table-cell">
                      <span className={`text-xs ${u.status === 'active' ? 'text-success' : 'text-text-muted'}`}>{u.lastActive}</span>
                    </td>
                    <td className="table-cell">
                      <span className={`badge text-[10px] ${sc.badge}`}>{sc.label}</span>
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center gap-1">
                        <Link href="/admin/crm/contacts" className="btn-ghost p-1" title="Xem CRM"><ExternalLink size={12} /></Link>
                        <button className="btn-ghost p-1"><MoreHorizontal size={13} /></button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs text-text-muted">
          <span>Hien thi {filtered.length} / {KPI.newStudents} hoc vien</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, '...', 76].map((p, i) => (
              <button key={i} className={`w-7 h-7 rounded flex items-center justify-center text-xs transition-colors ${p === 1 ? 'bg-brand-dark text-text-on-dark font-medium' : 'hover:bg-surface-3 text-text-muted'}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
