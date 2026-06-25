'use client'

import { useState, useEffect } from 'react'
import {
  Users, Search, Mail, BookOpen, TrendingUp, RefreshCw,
  CheckCircle, AlertCircle, KeyRound, UserPlus, ChevronDown,
  ChevronUp, X, Plus,
} from 'lucide-react'
import { COURSE_SHORT_NAMES as COURSE_NAMES, PRODUCTS } from '@/lib/products'

type RealUser = {
  id:           string
  email:        string
  created_at:   string
  last_sign_in: string | null
  enrollments:  { course_id: string; enrolled_at: string }[]
}

const COURSE_OPTIONS = Object.entries(PRODUCTS)
  .map(([id, p]) => ({ id, name: COURSE_NAMES[id] ?? p.name }))

function fmtDate(iso: string | null) {
  if (!iso) return '-'
  return new Date(iso).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: '2-digit' })
}

// ─── Activate Form ────────────────────────────────────────────────────────────

function ActivateForm({ onSuccess }: { onSuccess: () => void }) {
  const [open,     setOpen]     = useState(false)
  const [email,    setEmail]    = useState('')
  const [name,     setName]     = useState('')
  const [courseId, setCourseId] = useState(COURSE_OPTIONS[2]?.id ?? '')
  const [loading,  setLoading]  = useState(false)
  const [msg,      setMsg]      = useState<{ type: 'ok' | 'err'; text: string } | null>(null)

  async function handleActivate(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim() || !courseId) return
    setLoading(true); setMsg(null)
    try {
      const res = await fetch('/api/admin/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), course_id: courseId, name: name.trim() || undefined }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setMsg({ type: 'ok', text: `Đã kích hoạt ${COURSE_NAMES[courseId] ?? courseId} cho ${email.trim()}` })
      setEmail(''); setName('')
      onSuccess()
    } catch (err: unknown) {
      setMsg({ type: 'err', text: err instanceof Error ? err.message : 'Có lỗi xảy ra' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-card">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full px-5 py-4 flex items-center justify-between hover:bg-surface-2 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-success-light flex items-center justify-center">
            <UserPlus size={15} className="text-success" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-text-primary">Kích hoạt khóa học thủ công</p>
            <p className="text-xs text-text-muted">Cấp quyền truy cập ngay lập tức, tự động đồng bộ portal</p>
          </div>
        </div>
        {open
          ? <ChevronUp size={16} className="text-text-muted" />
          : <ChevronDown size={16} className="text-text-muted" />
        }
      </button>

      {open && (
        <form onSubmit={handleActivate} className="border-t border-border px-5 py-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-1">
              <label className="text-xs font-medium text-text-secondary block mb-1.5">Email *</label>
              <input
                type="email" required
                value={email} onChange={e => setEmail(e.target.value)}
                placeholder="user@gmail.com"
                className="input-field text-sm h-9"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-text-secondary block mb-1.5">Tên (tuỳ chọn)</label>
              <input
                type="text"
                value={name} onChange={e => setName(e.target.value)}
                placeholder="Nguyễn Văn A"
                className="input-field text-sm h-9"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-text-secondary block mb-1.5">Khóa học *</label>
              <select
                value={courseId} onChange={e => setCourseId(e.target.value)} required
                className="input-field text-sm h-9"
              >
                {COURSE_OPTIONS.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              type="submit" disabled={loading || !email.trim() || !courseId}
              className="btn-primary text-sm py-2"
            >
              {loading
                ? <><RefreshCw size={13} className="animate-spin" />Đang kích hoạt...</>
                : <><UserPlus size={13} />Kích hoạt ngay</>
              }
            </button>
            {msg && (
              <span className={`text-sm font-medium flex items-center gap-1.5 ${msg.type === 'ok' ? 'text-success' : 'text-danger'}`}>
                {msg.type === 'ok' ? <CheckCircle size={13} /> : <AlertCircle size={13} />}
                {msg.text}
              </span>
            )}
          </div>
          <p className="text-xs text-text-muted">
            Nếu email chưa có tài khoản → hệ thống tự tạo và kích hoạt. Học viên cần đặt mật khẩu qua link reset để đăng nhập.
          </p>
        </form>
      )}
    </div>
  )
}

// ─── User Row ─────────────────────────────────────────────────────────────────

function UserRow({
  u,
  onRefresh,
  onToast,
}: {
  u: RealUser
  onRefresh: () => void
  onToast: (type: 'ok' | 'err', msg: string) => void
}) {
  const [addingCourse, setAddingCourse] = useState(false)
  const [newCourse,    setNewCourse]    = useState('')
  const [working,      setWorking]      = useState(false)
  const [resetting,    setResetting]    = useState(false)

  const availableCourses = COURSE_OPTIONS.filter(
    c => !u.enrollments.find(e => e.course_id === c.id)
  )

  async function revoke(course_id: string) {
    if (!confirm(`Thu hồi quyền "${COURSE_NAMES[course_id] ?? course_id}" của ${u.email}?`)) return
    setWorking(true)
    try {
      const res = await fetch('/api/admin/enrollments', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: u.id, course_id }),
      })
      if (!res.ok) throw new Error('Lỗi')
      onToast('ok', `Đã thu hồi ${COURSE_NAMES[course_id] ?? course_id}`)
      onRefresh()
    } catch {
      onToast('err', 'Có lỗi xảy ra')
    } finally {
      setWorking(false)
    }
  }

  async function addCourse() {
    if (!newCourse) return
    setWorking(true)
    try {
      const res = await fetch('/api/admin/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: u.email, course_id: newCourse }),
      })
      if (!res.ok) throw new Error('Lỗi')
      onToast('ok', `Đã thêm ${COURSE_NAMES[newCourse] ?? newCourse} cho ${u.email}`)
      setAddingCourse(false); setNewCourse('')
      onRefresh()
    } catch {
      onToast('err', 'Có lỗi xảy ra')
    } finally {
      setWorking(false)
    }
  }

  async function resetPw() {
    setResetting(true)
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reset_password', email: u.email }),
      })
      if (res.ok) onToast('ok', `Đã gửi link reset cho ${u.email}`)
      else onToast('err', 'Gửi không được, thử lại.')
    } catch {
      onToast('err', 'Lỗi kết nối.')
    } finally {
      setResetting(false)
    }
  }

  return (
    <tr className="table-row">
      {/* Email */}
      <td className="table-cell">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-brand-dark/10 flex items-center justify-center flex-shrink-0">
            <Mail size={11} className="text-brand-dark" />
          </div>
          <div>
            <p className="text-xs font-medium text-text-primary">{u.email}</p>
            <p className="text-[10px] text-text-muted">{fmtDate(u.created_at)}</p>
          </div>
        </div>
      </td>

      {/* Courses */}
      <td className="table-cell">
        <div className="flex flex-wrap gap-1 items-center">
          {u.enrollments.length === 0 && !addingCourse && (
            <span className="text-text-muted text-xs italic">Chưa mua</span>
          )}
          {u.enrollments.map(e => (
            <span key={e.course_id}
              className="inline-flex items-center gap-1 bg-success-light text-success border border-success/20 rounded px-1.5 py-0.5 text-[10px] font-medium group">
              <BookOpen size={8} />
              {COURSE_NAMES[e.course_id] ?? e.course_id}
              <button
                onClick={() => revoke(e.course_id)}
                disabled={working}
                title="Thu hồi quyền truy cập"
                className="ml-0.5 opacity-0 group-hover:opacity-100 text-success hover:text-danger transition-all"
              >
                <X size={9} />
              </button>
            </span>
          ))}

          {/* Add course inline */}
          {addingCourse ? (
            <div className="flex items-center gap-1">
              <select
                value={newCourse} onChange={e => setNewCourse(e.target.value)}
                autoFocus
                className="text-[10px] border border-border rounded px-1.5 py-0.5 focus:outline-none focus:border-brand-border bg-surface"
              >
                <option value="">Chọn khóa...</option>
                {availableCourses.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <button
                onClick={addCourse}
                disabled={!newCourse || working}
                className="text-[10px] bg-success text-white px-2 py-0.5 rounded disabled:opacity-40 transition-colors hover:bg-success/80"
              >
                {working ? '...' : 'OK'}
              </button>
              <button
                onClick={() => { setAddingCourse(false); setNewCourse('') }}
                className="text-[10px] text-text-muted hover:text-text-primary transition-colors"
              >
                <X size={11} />
              </button>
            </div>
          ) : availableCourses.length > 0 && (
            <button
              onClick={() => setAddingCourse(true)}
              title="Thêm khóa học"
              className="w-5 h-5 rounded border border-border flex items-center justify-center text-text-muted hover:border-success hover:text-success hover:bg-success-light transition-colors"
            >
              <Plus size={10} />
            </button>
          )}
        </div>
      </td>

      {/* Last sign in */}
      <td className="table-cell text-xs">
        {u.last_sign_in
          ? <span className="text-success">{fmtDate(u.last_sign_in)}</span>
          : <span className="text-text-muted italic">Chưa đăng nhập</span>
        }
      </td>

      {/* Actions */}
      <td className="table-cell text-right">
        <button
          onClick={resetPw}
          disabled={resetting}
          title="Gửi link đặt lại mật khẩu"
          className="inline-flex items-center gap-1.5 text-[11px] text-text-muted hover:text-brand-accent border border-border hover:border-brand-accent/40 rounded-lg px-2.5 py-1.5 transition-all disabled:opacity-40"
        >
          <KeyRound size={11} />
          {resetting ? 'Đang gửi...' : 'Reset mật khẩu'}
        </button>
      </td>
    </tr>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function UsersPage() {
  const [users,   setUsers]   = useState<RealUser[]>([])
  const [loading, setLoading] = useState(true)
  const [search,  setSearch]  = useState('')
  const [toast,   setToast]   = useState<{ type: 'ok' | 'err'; msg: string } | null>(null)

  function load() {
    setLoading(true)
    fetch('/api/admin/users')
      .then(r => r.json())
      .then(d => { setUsers(d.users ?? []); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  function showToast(type: 'ok' | 'err', msg: string) {
    setToast({ type, msg })
    setTimeout(() => setToast(null), 3500)
  }

  const filtered = users.filter(u =>
    !search || u.email.toLowerCase().includes(search.toLowerCase())
  )

  const stats = {
    total:      users.length,
    withCourse: users.filter(u => u.enrollments.length > 0).length,
    noCourse:   users.filter(u => u.enrollments.length === 0).length,
  }

  return (
    <div className="page-wrapper">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-medium
          ${toast.type === 'ok'
            ? 'bg-green-50 border border-green-200 text-green-800'
            : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
          {toast.type === 'ok' ? <CheckCircle size={15} /> : <AlertCircle size={15} />}
          {toast.msg}
        </div>
      )}

      <div className="page-header">
        <div>
          <h1 className="page-title">Quản lý học viên</h1>
          <p className="page-subtitle">Tài khoản từ Supabase Auth · {users.length} users</p>
        </div>
        <button onClick={load} className="btn-secondary text-xs py-1.5">
          <RefreshCw size={12} />Làm mới
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: 'Tổng accounts', value: stats.total,      icon: Users,      color: 'text-info',         bg: 'bg-info-light' },
          { label: 'Có khóa học',   value: stats.withCourse, icon: BookOpen,   color: 'text-success',      bg: 'bg-success-light' },
          { label: 'Chưa mua',      value: stats.noCourse,   icon: TrendingUp, color: 'text-brand-accent', bg: 'bg-brand-accent/10' },
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

      {/* Activate form */}
      <ActivateForm onSuccess={load} />

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
                  <th className="table-header">Khóa học đã kích hoạt</th>
                  <th className="table-header">Đăng nhập gần nhất</th>
                  <th className="table-header text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={4} className="table-cell text-center text-text-muted py-10 text-sm">
                      {search ? 'Không tìm thấy.' : 'Chưa có học viên nào.'}
                    </td>
                  </tr>
                )}
                {filtered.map(u => (
                  <UserRow key={u.id} u={u} onRefresh={load} onToast={showToast} />
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
