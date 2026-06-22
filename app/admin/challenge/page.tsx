'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, Clock, AlertCircle, UserPlus, RefreshCw, Trash2, ChevronDown, ChevronUp, Unlock } from 'lucide-react'

type Enrollment = {
  id:             string
  email:          string
  name:           string
  order_code:     string
  deposit_amount: number
  status:         string
  all_completed:  boolean
  created_at:     string
  started_at:     string
}

type Submission = {
  id:            string
  enrollment_id: string
  day_number:    number
  proof_text:    string
  submitted_at:  string
  deadline:      string
  is_on_time:    boolean
  status:        string
  admin_note:    string | null
  enrollment:    { email: string; order_code: string; status: string; all_completed: boolean }
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
}

// ─── Activate Form ────────────────────────────────────────────────────────────

function ActivateForm({ onSuccess }: { onSuccess: () => void }) {
  const [open,    setOpen]    = useState(false)
  const [email,   setEmail]   = useState('')
  const [name,    setName]    = useState('')
  const [deposit, setDeposit] = useState('368000')
  const [loading, setLoading] = useState(false)
  const [msg,     setMsg]     = useState<{ type: 'ok' | 'err'; text: string } | null>(null)

  async function handleActivate(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true); setMsg(null)
    try {
      const res = await fetch('/api/admin/challenge', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email:          email.trim(),
          name:           name.trim() || undefined,
          deposit_amount: parseInt(deposit) || 368000,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setMsg({ type: 'ok', text: `Đã kích hoạt: ${email.trim()}` })
      setEmail(''); setName(''); setDeposit('368000')
      onSuccess()
    } catch (err: unknown) {
      setMsg({ type: 'err', text: err instanceof Error ? err.message : 'Có lỗi xảy ra' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#EAF5EF] flex items-center justify-center">
            <UserPlus size={15} className="text-[#1D9E75]" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-800">Kích hoạt tài khoản thủ công</p>
            <p className="text-xs text-gray-400">Thêm người dùng vào challenge ngay lập tức</p>
          </div>
        </div>
        {open ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
      </button>

      {open && (
        <form onSubmit={handleActivate} className="border-t border-gray-100 px-5 py-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-1">
              <label className="text-xs font-medium text-gray-500 block mb-1.5">Email *</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="user@gmail.com"
                required
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#1D9E75] focus:ring-1 focus:ring-[#1D9E75]/20 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1.5">Tên (tuỳ chọn)</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Nguyễn Văn A"
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#1D9E75] focus:ring-1 focus:ring-[#1D9E75]/20 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1.5">Số cọc (đ)</label>
              <input
                type="number"
                value={deposit}
                onChange={e => setDeposit(e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#1D9E75] focus:ring-1 focus:ring-[#1D9E75]/20 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={loading || !email.trim()}
              className="flex items-center gap-2 bg-[#0D2B1A] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#1a4a2e] disabled:opacity-50 transition-colors"
            >
              {loading
                ? <><RefreshCw size={14} className="animate-spin" />Đang kích hoạt...</>
                : <><UserPlus size={14} />Kích hoạt ngay</>
              }
            </button>
            {msg && (
              <span className={`text-sm font-medium ${msg.type === 'ok' ? 'text-[#1D9E75]' : 'text-red-500'}`}>
                {msg.type === 'ok' ? '✓ ' : '✕ '}{msg.text}
              </span>
            )}
          </div>

          <p className="text-xs text-gray-400">
            Sau khi kích hoạt, tài khoản sẽ thấy challenge ngay trong portal. Ngày 1 mở lúc 7h sáng hôm sau.
          </p>
        </form>
      )}
    </div>
  )
}

// ─── Enrollment Row ───────────────────────────────────────────────────────────

function EnrollmentRow({
  e,
  onRefresh,
  onToast,
}: {
  e: Enrollment
  onRefresh: () => void
  onToast: (msg: string) => void
}) {
  const [updating, setUpdating] = useState(false)

  async function updateStatus(status: string) {
    setUpdating(true)
    try {
      const res = await fetch('/api/admin/challenge/enrollment', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: e.id, status }),
      })
      if (!res.ok) throw new Error('Lỗi cập nhật')
      onToast(`Đã cập nhật: ${e.email}`)
      onRefresh()
    } catch {
      onToast('Có lỗi xảy ra')
    } finally {
      setUpdating(false)
    }
  }

  async function unlockAll() {
    if (!confirm(`Mở toàn bộ 7 ngày cho ${e.email}? Các tài khoản khác không bị ảnh hưởng.`)) return
    setUpdating(true)
    try {
      const res = await fetch('/api/admin/challenge/enrollment', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: e.id, unlock_all: true }),
      })
      if (!res.ok) throw new Error('Lỗi mở khóa')
      onToast(`Đã mở toàn bộ 7 ngày cho ${e.email}`)
      onRefresh()
    } catch {
      onToast('Có lỗi xảy ra')
    } finally {
      setUpdating(false)
    }
  }

  async function deleteEnrollment() {
    if (!confirm(`Xoá enrollment của ${e.email}? Không thể hoàn tác.`)) return
    setUpdating(true)
    try {
      const res = await fetch('/api/admin/challenge/enrollment', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: e.id }),
      })
      if (!res.ok) throw new Error('Lỗi xoá')
      onToast(`Đã xoá: ${e.email}`)
      onRefresh()
    } catch {
      onToast('Có lỗi xảy ra')
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className="px-5 py-3 flex items-center gap-3">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800">{e.email}</p>
        <p className="text-xs text-gray-400">{e.name} · {e.order_code} · {fmtDate(e.created_at)}</p>
        <p className="text-xs text-gray-400">Cọc: {(e.deposit_amount ?? 368000).toLocaleString('vi-VN')}đ</p>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {e.all_completed && (
          <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">Hoàn thành ✓</span>
        )}

        {/* Unlock all */}
        <button
          onClick={unlockAll}
          disabled={updating}
          title="Mở toàn bộ 7 ngày ngay (chỉ tài khoản này)"
          className="flex items-center gap-1 text-xs bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 rounded-lg px-2 py-1 transition-colors disabled:opacity-50"
        >
          <Unlock size={11} />Mở hết
        </button>

        {/* Status selector */}
        <select
          value={e.status}
          onChange={ev => updateStatus(ev.target.value)}
          disabled={updating}
          className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:border-[#1D9E75] transition-colors disabled:opacity-50 bg-white"
        >
          <option value="active">active</option>
          <option value="completed">completed</option>
          <option value="cancelled">cancelled</option>
          <option value="refunded">refunded</option>
        </select>

        <button
          onClick={deleteEnrollment}
          disabled={updating}
          title="Xoá enrollment"
          className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AdminChallengePage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter]   = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending')
  const [toast, setToast]     = useState('')

  async function load() {
    const r = await fetch('/api/admin/challenge')
    const d = await r.json()
    setSubmissions(d.submissions || [])
    setEnrollments(d.enrollments || [])
    setLoading(false)
  }

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  useEffect(() => { load() }, [])

  async function review(id: string, status: 'approved' | 'rejected', note = '') {
    const r = await fetch('/api/admin/challenge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status, admin_note: note }),
    })
    if (r.ok) showToast(status === 'approved' ? 'Đã duyệt ✓' : 'Đã từ chối')
    else showToast('Có lỗi xảy ra')
    load()
  }

  const filtered = submissions.filter(s => filter === 'all' || s.status === filter)

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {toast && (
        <div className="fixed top-4 right-4 bg-[#0D2B1A] text-white px-4 py-2.5 rounded-xl text-sm z-50 shadow-lg">
          {toast}
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Challenge 7 Ngày</h1>
          <div className="flex items-center gap-3">
            <button onClick={load} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors">
              <RefreshCw size={14} />Làm mới
            </button>
            <a href="/admin" className="text-sm text-gray-400 hover:text-gray-700">← Admin</a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Tổng đăng ký',  value: enrollments.length },
            { label: 'Đang active',    value: enrollments.filter(e => e.status === 'active').length },
            { label: 'Hoàn thành',     value: enrollments.filter(e => e.all_completed).length },
            { label: 'Chờ duyệt',      value: submissions.filter(s => s.status === 'pending').length },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4">
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Activate form */}
        <ActivateForm onSuccess={load} />

        {/* Enrollments */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
            <p className="font-semibold text-sm text-gray-700">Danh sách đăng ký ({enrollments.length})</p>
          </div>
          <div className="divide-y divide-gray-50">
            {enrollments.length === 0 && (
              <p className="px-5 py-4 text-sm text-gray-400">Chưa có ai đăng ký</p>
            )}
            {enrollments.map(e => (
              <EnrollmentRow key={e.id} e={e} onRefresh={load} onToast={showToast} />
            ))}
          </div>
        </div>

        {/* Submissions */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
            <p className="font-semibold text-sm text-gray-700">Bài nộp</p>
            <div className="flex gap-2">
              {(['all', 'pending', 'approved', 'rejected'] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`text-xs px-3 py-1 rounded-full transition-colors ${
                    filter === f ? 'bg-[#0D2B1A] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}>
                  {f === 'all' ? 'Tất cả' : f === 'pending' ? 'Chờ duyệt' : f === 'approved' ? 'Đã duyệt' : 'Từ chối'}
                </button>
              ))}
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {filtered.length === 0 && (
              <p className="px-5 py-4 text-sm text-gray-400">Không có bài nộp nào</p>
            )}
            {filtered.map(s => (
              <div key={s.id} className="px-5 py-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {s.status === 'approved' && <CheckCircle size={18} className="text-green-500" />}
                    {s.status === 'rejected'  && <XCircle size={18} className="text-red-500" />}
                    {s.status === 'pending'   && <Clock size={18} className="text-amber-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-medium text-gray-800">{s.enrollment?.email}</p>
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Ngày {s.day_number}</span>
                      {s.is_on_time
                        ? <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full">Đúng giờ</span>
                        : <span className="text-xs bg-red-50 text-red-500 px-2 py-0.5 rounded-full">Trễ {fmtDate(s.deadline)}</span>
                      }
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">Nộp lúc {fmtDate(s.submitted_at)}</p>
                    <div className="mt-2 bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{s.proof_text}</p>
                    </div>
                  </div>
                </div>
                {s.status === 'pending' && (
                  <div className="flex items-center gap-2 pl-7">
                    <button onClick={() => review(s.id, 'approved')}
                      className="flex items-center gap-1 text-xs bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors">
                      <CheckCircle size={13} />Duyệt
                    </button>
                    <button onClick={() => {
                      const note = prompt('Lý do từ chối (gửi cho học viên):') || ''
                      review(s.id, 'rejected', note)
                    }}
                      className="flex items-center gap-1 text-xs bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors">
                      <XCircle size={13} />Từ chối
                    </button>
                  </div>
                )}
                {s.admin_note && (
                  <p className="text-xs text-gray-400 pl-7 italic">Ghi chú: {s.admin_note}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
