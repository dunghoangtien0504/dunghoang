'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { CHALLENGE_DAYS } from '@/lib/challenge-days'
import Link from 'next/link'
import {
  ArrowLeft, CheckCircle2, Circle, Clock, Lock,
  Send, AlertCircle, ChevronRight,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type DayProgress = {
  day_number:       number
  is_unlocked:      boolean
  is_past_deadline: boolean
  unlock_at:        string
  deadline:         string
  submission: {
    status:     string
    is_on_time: boolean
    proof_text: string
    admin_note?: string
  } | null
}

type Enrollment = {
  status:         string
  all_completed:  boolean
  deposit_amount: number
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmtTime(iso: string) {
  return new Date(iso).toLocaleString('vi-VN', {
    hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit',
  })
}

function fmtCountdown(deadline: string) {
  const diff = new Date(deadline).getTime() - Date.now()
  if (diff <= 0) return 'Đã hết hạn'
  const h = Math.floor(diff / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  return `${h}h ${m}m còn lại`
}

type ChallengeStatus = 'locked' | 'open' | 'submitted' | 'late' | 'approved' | 'rejected'

function getDayStatus(d: DayProgress): ChallengeStatus {
  if (!d.is_unlocked) return 'locked'
  const sub = d.submission
  if (!sub) return 'open'
  if (sub.status === 'approved') return 'approved'
  if (sub.status === 'rejected') return 'rejected'
  if (!sub.is_on_time) return 'late'
  return 'submitted'
}

const STATUS_CFG: Record<ChallengeStatus, { label: string; dot: string; text: string }> = {
  locked:    { label: 'Chưa mở',      dot: 'bg-gray-200',    text: 'text-gray-400'   },
  open:      { label: 'Đang mở',      dot: 'bg-amber-400',   text: 'text-amber-600'  },
  submitted: { label: 'Chờ duyệt',    dot: 'bg-blue-400',    text: 'text-blue-600'   },
  late:      { label: 'Nộp trễ hạn',  dot: 'bg-orange-400',  text: 'text-orange-600' },
  approved:  { label: 'Đúng giờ ✓',   dot: 'bg-emerald-500', text: 'text-emerald-600'},
  rejected:  { label: 'Cần làm lại',  dot: 'bg-red-400',     text: 'text-red-600'    },
}

// ─── Day Accordion Card ───────────────────────────────────────────────────────

function DayCard({
  d,
  email,
  onRefresh,
}: {
  d: DayProgress
  email: string
  onRefresh: () => void
}) {
  const info   = CHALLENGE_DAYS[d.day_number - 1]
  const status = getDayStatus(d)
  const cfg    = STATUS_CFG[status]
  const isLocked = status === 'locked'
  const isDone   = status === 'approved'

  const [open,    setOpen]    = useState(false)
  const [proof,   setProof]   = useState(d.submission?.proof_text ?? '')
  const [saving,  setSaving]  = useState(false)
  const [saved,   setSaved]   = useState(false)
  const [err,     setErr]     = useState('')
  const [tick,    setTick]    = useState(0)

  // Live countdown re-render every minute
  useEffect(() => {
    if (status !== 'open') return
    const t = setInterval(() => setTick(n => n + 1), 60000)
    return () => clearInterval(t)
  }, [status])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!proof.trim()) return
    setSaving(true); setErr('')
    try {
      const res = await fetch('/api/challenges/submit', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, day_number: d.day_number, proof_text: proof }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setSaved(true)
      onRefresh()
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : 'Có lỗi rồi, thử lại.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className={`bg-white rounded-2xl border transition-all ${
      isDone      ? 'border-emerald-100' :
      status === 'late' ? 'border-orange-100' :
      isLocked    ? 'border-gray-100' :
      open        ? 'border-[#0D2B1A]/20 shadow-sm' :
      'border-gray-100'
    }`}>
      {/* Header */}
      <button
        onClick={() => !isLocked && setOpen(o => !o)}
        className={`w-full flex items-center gap-4 px-5 py-4 text-left rounded-2xl transition-colors ${
          isLocked ? 'cursor-not-allowed' : 'hover:bg-gray-50/50'
        }`}
        disabled={isLocked}
      >
        {/* Day circle */}
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${
          isDone
            ? 'bg-emerald-50 border-emerald-200'
            : status === 'late'
              ? 'bg-orange-50 border-orange-200'
              : isLocked
                ? 'bg-gray-50 border-gray-100'
                : 'bg-[#0D2B1A]/5 border-[#0D2B1A]/10'
        }`}>
          {isDone      && <CheckCircle2 size={18} className="text-emerald-500" />}
          {status === 'late' && <AlertCircle size={16} className="text-orange-500" />}
          {isLocked    && <Lock size={14} className="text-gray-300" />}
          {!isDone && status !== 'late' && !isLocked && (
            <span className="text-xs font-black text-[#0D2B1A]">{String(d.day_number).padStart(2,'0')}</span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-bold leading-snug ${isLocked ? 'text-gray-300' : 'text-[#0D2B1A]'}`}>
            Ngày {d.day_number} · {info?.title}
          </p>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${cfg.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
              {cfg.label}
            </span>
            {info?.skill && (
              <span className="text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">{info.skill}</span>
            )}
            {status === 'open' && !isLocked && (
              <span className="text-xs text-amber-500 flex items-center gap-1">
                <Clock size={10} /> {fmtCountdown(d.deadline)}
              </span>
            )}
            {isLocked && (
              <span className="text-xs text-gray-300">Mở lúc {fmtTime(d.unlock_at)}</span>
            )}
          </div>
        </div>

        {!isLocked && (
          <ChevronRight size={18} className={`text-gray-300 flex-shrink-0 transition-transform ${open ? 'rotate-90' : ''}`} />
        )}
      </button>

      {/* Expanded */}
      {open && (
        <div className="border-t border-gray-50 divide-y divide-gray-50">

          {/* Mục tiêu */}
          {info?.goal && (
            <div className="px-5 py-4">
              <p className="text-xs font-bold text-[#1D9E75] mb-1 uppercase tracking-widest">Mục tiêu hôm nay</p>
              <p className="text-sm text-[#0D2B1A] font-medium">{info.goal}</p>
            </div>
          )}

          {/* SOP */}
          {info?.sop && (
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#0D2B1A] uppercase tracking-widest">Hướng dẫn</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>
              <div className="space-y-3">
                {info.sop.map((step: string, i: number) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#EAF5EF] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#2D7A4F] text-xs font-bold">{i + 1}</span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bài tập */}
          {info?.task && (
            <div className="px-5 py-4">
              <div className="bg-[#EAF5EF] border border-[#2D7A4F]/20 rounded-xl p-4 space-y-2">
                <p className="text-xs font-bold text-[#2D7A4F] uppercase tracking-widest">Bài tập hôm nay</p>
                <p className="text-sm text-[#0D2B1A] font-medium">{info.task}</p>
                {info.proof && (
                  <p className="text-xs text-[#3D6B4A]"><strong>Bằng chứng cần nộp:</strong> {info.proof}</p>
                )}
              </div>
            </div>
          )}

          {/* Submission */}
          <div className="p-5 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#0D2B1A] uppercase tracking-widest">Nộp Bài</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* Admin note */}
            {d.submission?.admin_note && (
              <div className={`rounded-xl p-3 text-sm ${
                status === 'rejected'
                  ? 'bg-red-50 border border-red-100 text-red-700'
                  : 'bg-emerald-50 border border-emerald-100 text-emerald-700'
              }`}>
                <p className="font-semibold text-xs mb-1">Phản hồi từ Dũng:</p>
                <p>{d.submission.admin_note}</p>
              </div>
            )}

            {isDone ? (
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-start gap-3">
                <CheckCircle2 size={20} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-bold text-emerald-700">Đã duyệt — đúng hạn ✓</p>
                  {d.submission?.proof_text && (
                    <p className="text-xs text-emerald-600 bg-white/60 rounded-lg p-2 whitespace-pre-wrap">
                      {d.submission.proof_text}
                    </p>
                  )}
                </div>
              </div>
            ) : status === 'submitted' ? (
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <p className="text-sm font-bold text-blue-700">Đã nộp · đang chờ duyệt</p>
                {d.submission?.proof_text && (
                  <p className="text-xs text-blue-600 mt-1 whitespace-pre-wrap">{d.submission.proof_text}</p>
                )}
              </div>
            ) : status === 'late' ? (
              <div className="space-y-3">
                <div className="bg-orange-50 border border-orange-100 rounded-xl p-3">
                  <p className="text-sm text-orange-700 font-medium">Ngày này đã trễ hạn — không tính điểm hoàn cọc.</p>
                  <p className="text-xs text-orange-600 mt-0.5">Bạn vẫn có thể nộp để lưu lại kết quả.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <textarea
                    value={proof}
                    onChange={e => setProof(e.target.value)}
                    placeholder="Dán link, mô tả, hoặc copy text kết quả ra đây..."
                    rows={4}
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#1D9E75] focus:ring-1 focus:ring-[#1D9E75]/20 transition-colors resize-none"
                  />
                  {err && <p className="text-red-500 text-xs">{err}</p>}
                  <button type="submit" disabled={saving || !proof.trim()}
                    className="flex items-center gap-2 bg-[#0D2B1A]/60 text-white text-sm font-bold px-5 py-2.5 rounded-xl disabled:opacity-40 transition-colors">
                    <Send size={13} />{saving ? 'Đang gửi...' : saved ? 'Đã gửi ✓' : 'Nộp bổ sung'}
                  </button>
                </form>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <textarea
                  value={proof}
                  onChange={e => setProof(e.target.value)}
                  placeholder={info?.proof
                    ? `${info.proof}\n\nDán link, mô tả, hoặc copy text ra đây...`
                    : 'Dán link, mô tả, hoặc copy text kết quả ra đây...'}
                  rows={4}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#1D9E75] focus:ring-1 focus:ring-[#1D9E75]/20 transition-colors resize-none"
                />
                {err && <p className="text-red-500 text-xs">{err}</p>}
                <button type="submit" disabled={saving || !proof.trim()}
                  className="flex items-center gap-2 bg-[#0D2B1A] hover:bg-[#1a4a2e] text-white text-sm font-bold px-5 py-2.5 rounded-xl disabled:opacity-40 transition-colors">
                  <Send size={13} />
                  {saving ? 'Đang gửi...' : saved ? 'Đã gửi ✓' : `Nộp bài ngày ${d.day_number}`}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ThuThachPage() {
  const router = useRouter()
  const [email,   setEmail]   = useState('')
  const [days,    setDays]    = useState<DayProgress[]>([])
  const [enroll,  setEnroll]  = useState<Enrollment | null>(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState('')

  const load = useCallback(async () => {
    const { data: { user } } = await supabase!.auth.getUser()
    if (!user?.email) { router.push('/portal/login'); return }
    setEmail(user.email)
    const res  = await fetch(`/api/challenges/progress?email=${encodeURIComponent(user.email)}`)
    const data = await res.json()
    if (!res.ok) { setError(data.error ?? 'Chưa đăng ký challenge'); setLoading(false); return }
    setEnroll(data.enrollment)
    setDays(data.days)
    setLoading(false)
  }, [router])

  useEffect(() => { load() }, [load])

  const completedCount = days.filter(d => {
    const s = getDayStatus(d)
    return s === 'approved' || s === 'submitted'
  }).length

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <div className="w-6 h-6 border-2 border-[#1D9E75] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto space-y-4 pb-12">

      {/* Back */}
      <Link href="/portal" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors">
        <ArrowLeft size={15} /> Về khu học
      </Link>

      {error ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center space-y-4">
          <AlertCircle size={36} className="mx-auto text-gray-300" />
          <p className="font-bold text-[#0D2B1A]">{error}</p>
          <p className="text-sm text-gray-500">Nếu đã đăng ký, liên hệ Dũng qua Telegram để kiểm tra.</p>
          <Link href="/bi-quyet-7-ngay"
            className="inline-block bg-[#0D2B1A] text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-[#1D9E75] transition-colors">
            Đăng ký challenge →
          </Link>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="bg-[#0D2B1A] rounded-2xl p-6 space-y-4">
            <div>
              <p className="text-[#F6F0E4]/50 text-xs font-mono uppercase tracking-wider mb-1">DungHoang.com · Challenge</p>
              <h1 className="text-lg font-black text-[#F6F0E4] leading-snug">Bí Quyết 7 Ngày Đưa AI Vào Business</h1>
              <p className="text-[#F6F0E4]/50 text-xs mt-1">
                Cọc {((enroll?.deposit_amount ?? 368000)).toLocaleString('vi-VN')}đ · hoàn thành đúng hạn → hoàn tiền
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#F6F0E4]/60">Nhiệm vụ hằng ngày</span>
                <span className="text-[#F6F0E4] font-bold">{completedCount}/7 hoàn thành</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1D9E75] rounded-full transition-all duration-700"
                  style={{ width: `${(completedCount / 7) * 100}%` }}
                />
              </div>
            </div>
            {enroll?.all_completed && (
              <div className="flex items-center gap-2 text-[#1D9E75] text-sm font-bold bg-[#1D9E75]/10 rounded-xl px-3 py-2">
                <CheckCircle2 size={16} />
                Đã hoàn thành 7 ngày! Tiền cọc đang được xử lý hoàn lại.
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 px-1 flex-wrap">
            {(Object.entries(STATUS_CFG) as [ChallengeStatus, typeof STATUS_CFG[ChallengeStatus]][])
              .filter(([k]) => k !== 'locked')
              .map(([k, v]) => (
              <div key={k} className={`flex items-center gap-1.5 text-xs ${v.text}`}>
                <span className={`w-2 h-2 rounded-full ${v.dot}`} />
                {v.label}
              </div>
            ))}
          </div>

          {/* Day cards */}
          <div className="space-y-2">
            {days.map(d => (
              <DayCard key={d.day_number} d={d} email={email} onRefresh={load} />
            ))}
          </div>

          {/* Rule */}
          <div className="bg-[#0D2B1A]/5 rounded-xl p-4 text-xs text-gray-500 space-y-1.5">
            <p className="font-bold text-[#0D2B1A] text-sm">Luật hoàn cọc</p>
            <p>Nộp bài đúng hạn cả 7 ngày → Dũng hoàn {((enroll?.deposit_amount ?? 368000)).toLocaleString('vi-VN')}đ trong 48h sau ngày 7.</p>
            <p>Nộp trễ hoặc bỏ ngày → ngày đó bị đánh dấu "trễ hạn" → không đủ điều kiện hoàn cọc nhưng vẫn học được.</p>
          </div>
        </>
      )}
    </div>
  )
}
