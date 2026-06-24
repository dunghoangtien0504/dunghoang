'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import {
  ChevronDown, ChevronRight, CheckCircle2, Circle,
  Clock, Send, Lock, ExternalLink, MessageSquare,
} from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────────────

type Lesson = {
  id: string
  title: string
  description: string | null
  content_html: string | null
  video_url: string | null
  duration: number
  sort_order: number
  is_free: boolean
  host_note: string | null
}

type Progress = {
  lesson_id: string
  completed: boolean
  submission_url: string | null
  submission_note: string | null
  submitted_at: string | null
  approved: boolean | null
  admin_note: string | null
}

type DayStatus = 'locked' | 'open' | 'submitted' | 'approved' | 'rejected' | 'done'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getDayStatus(lesson: Lesson, prog: Progress | undefined, enrolled: boolean): DayStatus {
  if (!enrolled && !lesson.is_free) return 'locked'
  if (!prog) return 'open'
  if (prog.completed && prog.approved === null && !prog.submitted_at) return 'done'
  if (prog.approved === true) return 'approved'
  if (prog.approved === false) return 'rejected'
  if (prog.submitted_at && prog.approved === null) return 'submitted'
  if (prog.completed) return 'done'
  return 'open'
}

const STATUS_CONFIG = {
  locked:    { label: 'Chưa mở',         dot: 'bg-gray-200',    text: 'text-gray-400',   ring: 'border-gray-100' },
  open:      { label: 'Chưa làm',         dot: 'bg-amber-400',   text: 'text-amber-600',  ring: 'border-amber-100' },
  submitted: { label: 'Chờ duyệt',        dot: 'bg-blue-400',    text: 'text-blue-600',   ring: 'border-blue-100' },
  approved:  { label: 'Đã duyệt',         dot: 'bg-emerald-500', text: 'text-emerald-600',ring: 'border-emerald-100' },
  rejected:  { label: 'Cần làm lại',      dot: 'bg-red-400',     text: 'text-red-600',    ring: 'border-red-100' },
  done:      { label: 'Hoàn thành',       dot: 'bg-emerald-500', text: 'text-emerald-600',ring: 'border-emerald-100' },
}

// ─── Sub-component: Day Card ──────────────────────────────────────────────────

function DayCard({
  lesson,
  index,
  prog,
  enrolled,
  userId,
  onProgressChange,
}: {
  lesson: Lesson
  index: number
  prog: Progress | undefined
  enrolled: boolean
  userId: string | null
  onProgressChange: () => void
}) {
  const status = getDayStatus(lesson, prog, enrolled)
  const cfg = STATUS_CONFIG[status]
  const isLocked = status === 'locked'
  const isDone = status === 'approved' || status === 'done'

  const [open, setOpen] = useState(false)
  const [subUrl,  setSubUrl]  = useState(prog?.submission_url  ?? '')
  const [subNote, setSubNote] = useState(prog?.submission_note ?? '')
  const [saving, setSaving]   = useState(false)
  const [saved,  setSaved]    = useState(false)

  const canSubmit = enrolled && !isLocked
  const hasExistingSubmission = !!prog?.submitted_at

  const handleSubmit = useCallback(async () => {
    if (!userId || !canSubmit) return
    setSaving(true)
    await supabase!.from('lesson_progress').upsert({
      user_id:         userId,
      lesson_id:       lesson.id,
      completed:       false,
      submission_url:  subUrl.trim() || null,
      submission_note: subNote.trim() || null,
      submitted_at:    new Date().toISOString(),
      approved:        null,
    }, { onConflict: 'user_id,lesson_id' })
    setSaving(false)
    setSaved(true)
    onProgressChange()
  }, [userId, canSubmit, lesson.id, subUrl, subNote, onProgressChange])

  const handleSelfComplete = useCallback(async () => {
    if (!userId || !canSubmit || isDone) return
    await supabase!.from('lesson_progress').upsert({
      user_id: userId, lesson_id: lesson.id, completed: true,
    }, { onConflict: 'user_id,lesson_id' })
    onProgressChange()
  }, [userId, canSubmit, isDone, lesson.id, onProgressChange])

  return (
    <div className={`bg-white rounded-2xl border transition-all ${open ? 'border-[#0D2B1A]/20 shadow-sm' : cfg.ring}`}>
      {/* Header row */}
      <button
        onClick={() => !isLocked && setOpen(o => !o)}
        className={`w-full flex items-center gap-4 px-5 py-4 text-left ${isLocked ? 'cursor-not-allowed' : 'hover:bg-gray-50/50'} rounded-2xl transition-colors`}
        disabled={isLocked}
      >
        {/* Day circle */}
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${
          isDone
            ? 'bg-emerald-50 border-emerald-200'
            : isLocked
              ? 'bg-gray-50 border-gray-100'
              : 'bg-[#0D2B1A]/5 border-[#0D2B1A]/10'
        }`}>
          {isDone
            ? <CheckCircle2 size={18} className="text-emerald-500" />
            : isLocked
              ? <Lock size={14} className="text-gray-300" />
              : <span className="text-xs font-black text-[#0D2B1A]">{String(index + 1).padStart(2,'0')}</span>
          }
        </div>

        {/* Title + status */}
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-bold leading-snug ${isLocked ? 'text-gray-300' : 'text-[#0D2B1A]'}`}>
            Bài {index + 1} · {lesson.title}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${cfg.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
              {cfg.label}
            </span>
            {lesson.duration > 0 && (
              <span className="text-xs text-gray-300 flex items-center gap-1">
                <Clock size={11} />{lesson.duration} phút
              </span>
            )}
          </div>
        </div>

        {/* Chevron */}
        {!isLocked && (
          <div className={`text-gray-300 flex-shrink-0 transition-transform ${open ? 'rotate-90' : ''}`}>
            <ChevronRight size={18} />
          </div>
        )}
      </button>

      {/* Expanded content */}
      {open && (
        <div className="border-t border-gray-50 divide-y divide-gray-50">

          {/* Video */}
          {lesson.video_url && (
            <div className="p-5">
              <div className="rounded-xl overflow-hidden aspect-video bg-black">
                <iframe
                  src={lesson.video_url}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* SOP */}
          {(lesson.content_html || lesson.description) && (
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#0D2B1A] uppercase tracking-widest">Hướng Dẫn</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>
              {lesson.content_html ? (
                <div
                  className="prose prose-sm max-w-none text-gray-700 leading-relaxed text-sm"
                  dangerouslySetInnerHTML={{ __html: lesson.content_html }}
                />
              ) : (
                <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">
                  {lesson.description}
                </div>
              )}
            </div>
          )}

          {/* Host note */}
          {lesson.host_note && (
            <div className="px-5 py-4">
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 space-y-1.5">
                <p className="text-xs font-bold text-amber-700 flex items-center gap-1.5">
                  <MessageSquare size={12} /> Nhắn từ Dũng
                </p>
                <p className="text-sm text-amber-800 leading-relaxed">{lesson.host_note}</p>
              </div>
            </div>
          )}

          {/* Submission area */}
          {canSubmit && (
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#0D2B1A] uppercase tracking-widest">Nộp Bài</span>
                <div className="flex-1 h-px bg-gray-100" />
                {hasExistingSubmission && status === 'submitted' && (
                  <span className="text-xs text-blue-500 font-medium">Đang chờ duyệt</span>
                )}
              </div>

              {/* Admin feedback */}
              {prog?.admin_note && (
                <div className={`rounded-xl p-3 text-sm ${
                  status === 'rejected'
                    ? 'bg-red-50 border border-red-100 text-red-700'
                    : 'bg-emerald-50 border border-emerald-100 text-emerald-700'
                }`}>
                  <p className="font-semibold text-xs mb-1">Phản hồi từ Dũng:</p>
                  <p>{prog.admin_note}</p>
                </div>
              )}

              {/* Approved — show proof + self-complete option */}
              {(status === 'approved' || status === 'done') ? (
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-emerald-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-emerald-700">Đã hoàn thành</p>
                    {prog?.submission_url && (
                      <a href={prog.submission_url} target="_blank" rel="noopener noreferrer"
                        className="text-xs text-emerald-600 underline flex items-center gap-1 mt-0.5">
                        Xem bài đã nộp <ExternalLink size={10} />
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-500 font-medium">Link bài nộp (Google Drive, Vercel, v.v.)</label>
                    <input
                      type="url"
                      value={subUrl}
                      onChange={e => setSubUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#1D9E75] focus:ring-1 focus:ring-[#1D9E75]/20 transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-500 font-medium">Ghi chú / cảm nhận (không bắt buộc)</label>
                    <textarea
                      value={subNote}
                      onChange={e => setSubNote(e.target.value)}
                      rows={3}
                      placeholder="Bạn đã làm gì, kết quả trông thế nào, điều gì bạn thấy thú vị nhất..."
                      className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#1D9E75] focus:ring-1 focus:ring-[#1D9E75]/20 transition-colors resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleSubmit}
                      disabled={saving || (!subUrl.trim() && !subNote.trim())}
                      className="flex items-center gap-2 bg-[#0D2B1A] hover:bg-[#1a4a2e] disabled:opacity-40 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors"
                    >
                      <Send size={13} />
                      {saving ? 'Đang gửi...' : saved ? 'Đã gửi ✓' : hasExistingSubmission ? 'Gửi lại' : 'Nộp bài'}
                    </button>
                    <button
                      onClick={handleSelfComplete}
                      className="text-xs text-gray-400 hover:text-gray-600 underline transition-colors"
                    >
                      Tự đánh dấu xong (không cần duyệt)
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CoursePage() {
  const { slug } = useParams<{ slug: string }>()
  const router   = useRouter()

  const [lessons,    setLessons]    = useState<Lesson[]>([])
  const [progMap,    setProgMap]    = useState<Record<string, Progress>>({})
  const [enrolled,   setEnrolled]   = useState(false)
  const [courseName, setCourseName] = useState('')
  const [userId,     setUserId]     = useState<string | null>(null)
  const [loading,    setLoading]    = useState(true)

  const loadData = useCallback(async () => {
    const { data: { user } } = await supabase!.auth.getUser()
    if (!user) { router.push('/portal/login'); return }
    setUserId(user.id)

    const { data: enroll } = await supabase!
      .from('enrollments')
      .select('course_id, course_products(name)')
      .eq('user_id', user.id)
      .eq('course_id', slug)
      .single()

    const isEnrolled = !!enroll
    setEnrolled(isEnrolled)
    if (enroll) {
      const cp = enroll.course_products as unknown as { name: string }
      setCourseName(cp?.name || '')
    }

    const { data: lessonData } = await supabase!
      .from('lessons')
      .select('id, title, description, content_html, video_url, duration, sort_order, is_free, host_note')
      .eq('course_id', slug)
      .eq('is_published', true)
      .order('sort_order')

    setLessons((lessonData as unknown as Lesson[]) || [])

    if (isEnrolled) {
      const { data: prog } = await supabase!
        .from('lesson_progress')
        .select('lesson_id, completed, submission_url, submission_note, submitted_at, approved, admin_note')
        .eq('user_id', user.id)

      const map: Record<string, Progress> = {}
      for (const p of (prog || [])) map[p.lesson_id] = p
      setProgMap(map)
    }

    setLoading(false)
  }, [slug, router])

  useEffect(() => { loadData() }, [loadData])

  const completedCount = Object.values(progMap).filter(p =>
    p.completed || p.approved === true
  ).length
  const totalCount = lessons.length
  const pct = totalCount ? Math.round((completedCount / totalCount) * 100) : 0

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-6 h-6 border-2 border-[#1D9E75] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4 pb-12">

      {/* Header */}
      <div className="bg-[#0D2B1A] rounded-2xl p-6 space-y-4">
        <div>
          <p className="text-[#F6F0E4]/50 text-xs font-mono uppercase tracking-wider mb-1">DungHoang.com · Khu học viên</p>
          <h1 className="text-lg font-black text-[#F6F0E4] leading-snug">{courseName}</h1>
        </div>
        {enrolled && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#F6F0E4]/60">Tiến độ</span>
              <span className="text-[#F6F0E4] font-bold">{completedCount}/{totalCount} bài hoàn thành</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1D9E75] rounded-full transition-all duration-700"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      {enrolled && (
        <div className="flex items-center gap-4 px-1 flex-wrap">
          {(Object.entries(STATUS_CONFIG) as [DayStatus, typeof STATUS_CONFIG[DayStatus]][])
            .filter(([k]) => k !== 'locked')
            .map(([k, v]) => (
            <div key={k} className={`flex items-center gap-1.5 text-xs ${v.text}`}>
              <span className={`w-2 h-2 rounded-full ${v.dot}`} />
              {v.label}
            </div>
          ))}
        </div>
      )}

      {/* Days */}
      <div className="space-y-2">
        {lessons.map((lesson, i) => (
          <DayCard
            key={lesson.id}
            lesson={lesson}
            index={i}
            prog={progMap[lesson.id]}
            enrolled={enrolled}
            userId={userId}
            onProgressChange={loadData}
          />
        ))}
      </div>

      {/* Upsell if not enrolled */}
      {!enrolled && (
        <div className="bg-[#0D2B1A] rounded-2xl p-6 text-center space-y-4">
          <p className="text-[#F6F0E4]/70 text-sm">Mua khóa học để mở khóa toàn bộ {totalCount} ngày</p>
          <a
            href={slug === 'landing-page' ? '/landing-page' : slug === 'khoa-1' ? '/khoa-1' : `/${slug.replace('_', '-')}`}
            className="inline-block bg-[#1D9E75] text-white text-sm px-8 py-3 rounded-xl font-bold hover:bg-[#17875f] transition-colors"
          >
            Xem chi tiết →
          </a>
        </div>
      )}
    </div>
  )
}
