'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { CheckCircle2, XCircle, Clock, ChevronDown, ExternalLink } from 'lucide-react'

type Submission = {
  id:              string
  user_id:         string
  lesson_id:       string
  completed:       boolean
  submission_url:  string | null
  submission_note: string | null
  submitted_at:    string | null
  approved:        boolean | null
  admin_note:      string | null
  updated_at:      string
  lessons:         { title: string; course_id: string } | null
  users:           { email: string } | null
}

type Filter = 'pending' | 'approved' | 'rejected' | 'all'

function fmtDate(iso: string) {
  return new Date(iso).toLocaleString('vi-VN', {
    day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit',
  })
}

export default function AdminPortalPage() {
  const [items,   setItems]   = useState<Submission[]>([])
  const [filter,  setFilter]  = useState<Filter>('pending')
  const [loading, setLoading] = useState(true)
  const [notes,   setNotes]   = useState<Record<string, string>>({})
  const [saving,  setSaving]  = useState<string | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    const q = supabase!
      .from('lesson_progress')
      .select(`
        id, user_id, lesson_id, completed,
        submission_url, submission_note, submitted_at,
        approved, admin_note, updated_at,
        lessons:lesson_id (title, course_id)
      `)
      .not('submitted_at', 'is', null)
      .order('submitted_at', { ascending: false })

    if (filter === 'pending')  q.is('approved', null)
    if (filter === 'approved') q.eq('approved', true)
    if (filter === 'rejected') q.eq('approved', false)

    const { data } = await q
    setItems((data as unknown as Submission[]) || [])
    setLoading(false)
  }, [filter])

  useEffect(() => { load() }, [load])

  async function approve(item: Submission, decision: boolean) {
    setSaving(item.id)
    await supabase!.from('lesson_progress').update({
      approved:   decision,
      completed:  decision,
      admin_note: notes[item.id]?.trim() || null,
      updated_at: new Date().toISOString(),
    }).eq('id', item.id)
    setSaving(null)
    load()
  }

  const counts = { pending: 0, approved: 0, rejected: 0 }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-[#0d2b1a]">Duyệt bài — Portal khóa học</h1>
          <p className="text-sm text-gray-400 mt-0.5">Học viên nộp bài → bạn approve/reject → hệ thống cập nhật tiến độ</p>
        </div>
        <button onClick={load} className="text-xs text-gray-400 hover:text-gray-600 underline">Tải lại</button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {(['pending', 'approved', 'rejected', 'all'] as Filter[]).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              filter === f
                ? 'bg-[#0d2b1a] text-white'
                : 'bg-white border border-gray-200 text-gray-500 hover:border-[#0d2b1a]/30'
            }`}>
            {f === 'pending'  && '⏳ Chờ duyệt'}
            {f === 'approved' && '✅ Đã duyệt'}
            {f === 'rejected' && '❌ Từ chối'}
            {f === 'all'      && '📋 Tất cả'}
          </button>
        ))}
      </div>

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-6 h-6 border-2 border-[#1D9E75] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-12 text-center">
          <p className="text-gray-400 text-sm">
            {filter === 'pending' ? 'Không có bài nào đang chờ duyệt.' : 'Không có bài nào.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map(item => {
            const isPending  = item.approved === null
            const isApproved = item.approved === true
            const isRejected = item.approved === false
            const isOpen     = expanded === item.id

            return (
              <div key={item.id}
                className={`bg-white rounded-2xl border transition-all ${
                  isPending  ? 'border-amber-200' :
                  isApproved ? 'border-emerald-200' :
                  'border-red-100'
                }`}>

                {/* Header */}
                <button
                  onClick={() => setExpanded(isOpen ? null : item.id)}
                  className="w-full flex items-start gap-3 p-5 text-left hover:bg-gray-50/50 rounded-2xl transition-colors">
                  {/* Status icon */}
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isPending  ? 'bg-amber-50'   :
                    isApproved ? 'bg-emerald-50' :
                    'bg-red-50'
                  }`}>
                    {isPending  && <Clock size={16} className="text-amber-500" />}
                    {isApproved && <CheckCircle2 size={16} className="text-emerald-500" />}
                    {isRejected && <XCircle size={16} className="text-red-400" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#0d2b1a] text-sm leading-snug">
                      {item.lessons?.title ?? 'Bài không rõ'}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <span className="text-xs text-gray-400">{item.lessons?.course_id}</span>
                      <span className="text-gray-200">·</span>
                      <span className="text-xs text-gray-400">
                        Nộp lúc {item.submitted_at ? fmtDate(item.submitted_at) : '—'}
                      </span>
                    </div>
                    {item.submission_note && (
                      <p className="text-xs text-gray-500 mt-1 truncate">{item.submission_note}</p>
                    )}
                  </div>

                  <ChevronDown size={16} className={`text-gray-300 flex-shrink-0 mt-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Expanded detail */}
                {isOpen && (
                  <div className="border-t border-gray-50 p-5 space-y-4">
                    {/* Submission */}
                    <div className="space-y-2">
                      {item.submission_url && (
                        <a href={item.submission_url} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-[#1D9E75] underline">
                          <ExternalLink size={13} /> Mở link bài nộp
                        </a>
                      )}
                      {item.submission_note && (
                        <div className="bg-gray-50 rounded-xl p-3">
                          <p className="text-xs text-gray-400 mb-1">Ghi chú của học viên:</p>
                          <p className="text-sm text-gray-700 whitespace-pre-wrap">{item.submission_note}</p>
                        </div>
                      )}
                    </div>

                    {/* Admin note */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-500 font-medium">Phản hồi cho học viên (không bắt buộc)</label>
                      <textarea
                        value={notes[item.id] ?? item.admin_note ?? ''}
                        onChange={e => setNotes(n => ({ ...n, [item.id]: e.target.value }))}
                        rows={2}
                        placeholder="Viết nhận xét ngắn gọn cho học viên..."
                        className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-[#1D9E75] resize-none"
                      />
                    </div>

                    {/* Actions */}
                    {!isApproved && !isRejected ? (
                      <div className="flex items-center gap-3">
                        <button onClick={() => approve(item, true)} disabled={saving === item.id}
                          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors">
                          <CheckCircle2 size={14} />
                          {saving === item.id ? 'Đang lưu...' : 'Duyệt — Hoàn thành'}
                        </button>
                        <button onClick={() => approve(item, false)} disabled={saving === item.id}
                          className="flex items-center gap-2 border border-red-200 text-red-500 hover:bg-red-50 text-sm font-medium px-5 py-2.5 rounded-xl transition-colors">
                          <XCircle size={14} />
                          Cần làm lại
                        </button>
                      </div>
                    ) : (
                      <div className={`flex items-center gap-2 text-sm font-medium ${isApproved ? 'text-emerald-600' : 'text-red-500'}`}>
                        {isApproved ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                        {isApproved ? 'Đã duyệt' : 'Đã từ chối'}
                        <button onClick={() => {
                          setNotes(n => ({ ...n, [item.id]: item.admin_note ?? '' }))
                          approve({ ...item, approved: null }, !isApproved)
                        }} className="ml-2 text-xs text-gray-400 underline">Đổi quyết định</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
