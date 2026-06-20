'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react'

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

export default function AdminChallengePage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [enrollments, setEnrollments] = useState<{ email: string; status: string; all_completed: boolean; created_at: string; order_code: string }[]>([])
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

  useEffect(() => { load() }, [])

  async function review(id: string, status: 'approved' | 'rejected', note = '') {
    const r = await fetch('/api/admin/challenge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status, admin_note: note }),
    })
    if (r.ok) { setToast(status === 'approved' ? 'Đã duyệt' : 'Đã từ chối'); load() }
    else setToast('Lỗi rồi')
    setTimeout(() => setToast(''), 2500)
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
        <div className="fixed top-4 right-4 bg-[#0D2B1A] text-white px-4 py-2 rounded-xl text-sm z-50 shadow-lg">
          {toast}
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Challenge 7 Ngày</h1>
          <a href="/admin" className="text-sm text-gray-400 hover:text-gray-700">← Admin</a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Tổng đăng ký', value: enrollments.length },
            { label: 'Đang active', value: enrollments.filter(e => e.status === 'active').length },
            { label: 'Hoàn thành', value: enrollments.filter(e => e.all_completed).length },
            { label: 'Chờ duyệt', value: submissions.filter(s => s.status === 'pending').length },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4">
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Enrollments */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100">
            <p className="font-semibold text-sm text-gray-700">Danh sách đăng ký</p>
          </div>
          <div className="divide-y divide-gray-50">
            {enrollments.length === 0 && (
              <p className="px-5 py-4 text-sm text-gray-400">Chưa có ai đăng ký</p>
            )}
            {enrollments.map((e, i) => (
              <div key={i} className="px-5 py-3 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{e.email}</p>
                  <p className="text-xs text-gray-400">{e.order_code} · {fmtDate(e.created_at)}</p>
                </div>
                <div className="flex items-center gap-2">
                  {e.all_completed && <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">Hoàn thành ✓</span>}
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    e.status === 'active'    ? 'bg-blue-50 text-blue-600' :
                    e.status === 'completed' ? 'bg-green-50 text-green-600' :
                    'bg-gray-100 text-gray-500'
                  }`}>{e.status}</span>
                </div>
              </div>
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
                  }`}>{f === 'all' ? 'Tất cả' : f === 'pending' ? 'Chờ duyệt' : f === 'approved' ? 'Đã duyệt' : 'Từ chối'}</button>
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
                  {/* Status icon */}
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
                        : <span className="text-xs bg-red-50 text-red-500 px-2 py-0.5 rounded-full">Trễ {fmtDate(s.deadline)}</span>}
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
