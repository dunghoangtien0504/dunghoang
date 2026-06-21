'use client'

import { useState, useEffect } from 'react'
import {
  Users, Search, Mail, BookOpen, TrendingUp, RefreshCw,
  CheckCircle, AlertCircle, KeyRound,
} from 'lucide-react'
import { COURSE_SHORT_NAMES as COURSE_NAMES } from '@/lib/products'

type RealUser = {
  id:           string
  email:        string
  created_at:   string
  last_sign_in: string | null
  enrollments:  { course_id: string; enrolled_at: string }[]
}

function fmtDate(iso: string | null) {
  if (!iso) return '-'
  return new Date(iso).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: '2-digit' })
}

export default function UsersPage() {
  const [users,   setUsers]   = useState<RealUser[]>([])
  const [loading, setLoading] = useState(true)
  const [search,  setSearch]  = useState('')
  const [resetting, setResetting] = useState<string>('')   // email đang reset
  const [toast,   setToast]   = useState<{ type: 'ok' | 'err'; msg: string } | null>(null)

  useEffect(() => {
    fetch('/api/admin/users')
      .then(r => r.json())
      .then(d => { setUsers(d.users ?? []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  function showToast(type: 'ok' | 'err', msg: string) {
    setToast({ type, msg })
    setTimeout(() => setToast(null), 3500)
  }

  async function resetPassword(email: string) {
    setResetting(email)
    try {
      const res = await fetch('/api/admin/users', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ action: 'reset_password', email }),
      })
      if (res.ok) showToast('ok', `Đã gửi link reset cho ${email}`)
      else        showToast('err', 'Gửi không được, thử lại.')
    } catch {
      showToast('err', 'Lỗi kết nối.')
    } finally {
      setResetting('')
    }
  }

  const filtered = users.filter(u =>
    !search || u.email.toLowerCase().includes(search.toLowerCase())
  )

  const stats = {
    total:    users.length,
    withCourse: users.filter(u => u.enrollments.length > 0).length,
    noCourse:   users.filter(u => u.enrollments.length === 0).length,
  }

  return (
    <div className="page-wrapper">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-medium
          ${toast.type === 'ok' ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'}`}>
          {toast.type === 'ok' ? <CheckCircle size={15} /> : <AlertCircle size={15} />}
          {toast.msg}
        </div>
      )}

      <div className="page-header">
        <div>
          <h1 className="page-title">Quản lý học viên</h1>
          <p className="page-subtitle">Tài khoản từ Supabase Auth · {users.length} users</p>
        </div>
        <button onClick={() => { setLoading(true); fetch('/api/admin/users').then(r => r.json()).then(d => { setUsers(d.users ?? []); setLoading(false) }) }}
          className="btn-secondary text-xs py-1.5">
          <RefreshCw size={12} />Làm mới
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Tổng accounts', value: stats.total,      icon: Users,     color: 'text-info',         bg: 'bg-info-light' },
          { label: 'Có khóa học',   value: stats.withCourse, icon: BookOpen,  color: 'text-success',      bg: 'bg-success-light' },
          { label: 'Chưa mua',      value: stats.noCourse,   icon: TrendingUp,color: 'text-brand-accent', bg: 'bg-brand-accent/10' },
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

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Tìm theo email..." className="input-field pl-9 text-xs h-9" />
      </div>

      {/* Table */}
      <div className="card card-hover">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-brand-border border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="table-header">Email</th>
                  <th className="table-header">Khóa học</th>
                  <th className="table-header">Đăng ký</th>
                  <th className="table-header">Đăng nhập gần nhất</th>
                  <th className="table-header text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="table-cell text-center text-text-muted py-10 text-sm">
                      {search ? 'Không tìm thấy.' : 'Chưa có học viên nào.'}
                    </td>
                  </tr>
                )}
                {filtered.map((u) => (
                  <tr key={u.id} className="table-row">
                    <td className="table-cell">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-brand-dark/10 flex items-center justify-center flex-shrink-0">
                          <Mail size={11} className="text-brand-dark" />
                        </div>
                        <span className="text-xs font-medium text-text-primary">{u.email}</span>
                      </div>
                    </td>
                    <td className="table-cell">
                      {u.enrollments.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {u.enrollments.map(e => (
                            <span key={e.course_id}
                              className="inline-flex items-center gap-1 bg-success-light text-success border border-success/20 rounded px-1.5 py-0.5 text-[10px] font-medium">
                              <BookOpen size={8} />
                              {COURSE_NAMES[e.course_id] ?? e.course_id}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-text-muted text-xs italic">Chưa mua</span>
                      )}
                    </td>
                    <td className="table-cell text-text-muted text-xs">{fmtDate(u.created_at)}</td>
                    <td className="table-cell text-xs">
                      {u.last_sign_in
                        ? <span className="text-success">{fmtDate(u.last_sign_in)}</span>
                        : <span className="text-text-muted italic">Chưa đăng nhập</span>}
                    </td>
                    <td className="table-cell text-right">
                      <button
                        onClick={() => resetPassword(u.email)}
                        disabled={resetting === u.email}
                        title="Gửi link đặt lại mật khẩu cho học viên"
                        className="inline-flex items-center gap-1.5 text-[11px] text-text-muted hover:text-brand-accent border border-border hover:border-brand-accent/40 rounded-lg px-2.5 py-1.5 transition-all disabled:opacity-40">
                        <KeyRound size={11} />
                        {resetting === u.email ? 'Đang gửi...' : 'Reset mật khẩu'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {!loading && (
          <div className="mt-3 pt-3 border-t border-border text-xs text-text-muted">
            Hiển thị {filtered.length} / {users.length} tài khoản
          </div>
        )}
      </div>
    </div>
  )
}
