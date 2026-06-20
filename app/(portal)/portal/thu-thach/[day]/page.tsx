'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { CHALLENGE_DAYS, getDayDeadline, getFirstUnlock, getDayUnlock } from '@/lib/challenge-days'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Clock, Lock, Send } from 'lucide-react'

function fmtCountdown(deadline: Date) {
  const diff = deadline.getTime() - Date.now()
  if (diff <= 0) return 'Đã hết hạn'
  const h = Math.floor(diff / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  return `${h}h ${m}m còn lại`
}

export default function ChallengeDayPage() {
  const router    = useRouter()
  const params    = useParams()
  const dayNumber = parseInt(params.day as string)

  const [email,    setEmail]    = useState('')
  const [proof,    setProof]    = useState('')
  const [loading,  setLoading]  = useState(true)
  const [submitting,setSubmit]  = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [isOnTime,  setIsOnTime]  = useState(true)
  const [error,    setError]    = useState('')
  const [deadline, setDeadline] = useState<Date | null>(null)
  const [countdown,setCountdown]= useState('')
  const [existingSub, setExistingSub] = useState<{ is_on_time: boolean; status: string; proof_text: string } | null>(null)

  const info = CHALLENGE_DAYS[dayNumber - 1]

  useEffect(() => {
    if (!info || dayNumber < 1 || dayNumber > 7) { router.push('/portal/thu-thach'); return }
    supabase!.auth.getUser().then(async ({ data: { user } }) => {
      if (!user?.email) { router.push('/portal/login'); return }
      setEmail(user.email)

      const res = await fetch(`/api/challenges/progress?email=${encodeURIComponent(user.email)}`)
      const data = await res.json()
      if (!res.ok) { router.push('/portal/thu-thach'); return }

      const { enrollment, days } = data
      const firstUnlock = enrollment.first_unlock_at
        ? new Date(enrollment.first_unlock_at)
        : getFirstUnlock(new Date(enrollment.started_at))

      const unlockAt  = getDayUnlock(firstUnlock, dayNumber)
      const deadlineAt = getDayDeadline(firstUnlock, dayNumber)

      if (new Date() < unlockAt) { router.push('/portal/thu-thach'); return }

      setDeadline(deadlineAt)
      const dayData = days.find((d: { day_number: number }) => d.day_number === dayNumber)
      if (dayData?.submission) {
        setExistingSub(dayData.submission)
        setSubmitted(true)
        setIsOnTime(dayData.submission.is_on_time)
      }
      setLoading(false)
    })
  }, [dayNumber, info, router])

  // Countdown timer
  useEffect(() => {
    if (!deadline) return
    const t = setInterval(() => setCountdown(fmtCountdown(deadline)), 10000)
    setCountdown(fmtCountdown(deadline))
    return () => clearInterval(t)
  }, [deadline])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!proof.trim()) return
    setSubmit(true); setError('')
    try {
      const res = await fetch('/api/challenges/submit', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, day_number: dayNumber, proof_text: proof }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setSubmitted(true)
      setIsOnTime(data.is_on_time)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Có lỗi rồi, thử lại.')
    } finally {
      setSubmit(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-[#f5f5f0] flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-[#1D9E75] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/portal/thu-thach" className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#0d2b1a]">
            <ArrowLeft size={16} />Quay lại
          </Link>
          <span className="text-sm font-bold text-[#0d2b1a]">Ngày {dayNumber}/7</span>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">

        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Ngày {dayNumber}</span>
            <span className="text-xs bg-[#0d2b1a]/5 text-[#0d2b1a] px-2 py-0.5 rounded-full font-medium">{info.skill}</span>
          </div>
          <h1 className="text-xl font-bold text-[#0d2b1a] leading-snug">{info.title}</h1>
          <p className="text-[#1D9E75] text-sm font-medium">Mục tiêu: {info.goal}</p>
        </div>

        {/* Deadline */}
        {deadline && !submitted && (
          <div className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium ${
            new Date() > deadline ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-700'
          }`}>
            <Clock size={15} />
            {new Date() > deadline ? 'Đã hết hạn nộp bài ngày này' : `Hạn nộp: ${countdown}`}
          </div>
        )}

        {/* SOP */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="bg-[#0d2b1a] px-5 py-3">
            <p className="text-[#F6F0E4] font-bold text-sm">Hướng dẫn từng bước (SOP)</p>
          </div>
          <div className="p-5 space-y-4">
            {info.sop.map((step, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-[#EAF5EF] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#2D7A4F] text-xs font-bold">{i + 1}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Task */}
        <div className="bg-[#EAF5EF] border border-[#2D7A4F]/20 rounded-xl p-4 space-y-1">
          <p className="text-xs font-bold text-[#2D7A4F] uppercase tracking-wide">Bài tập hôm nay</p>
          <p className="text-sm text-[#0d2b1a] font-medium">{info.task}</p>
          <p className="text-xs text-[#3D6B4A] mt-2"><strong>Bằng chứng cần nộp:</strong> {info.proof}</p>
        </div>

        {/* Submission */}
        {submitted ? (
          <div className={`bg-white rounded-2xl border p-6 text-center space-y-3 ${
            isOnTime ? 'border-[#1D9E75]/40' : 'border-orange-200'
          }`}>
            {isOnTime
              ? <CheckCircle size={40} className="mx-auto text-[#1D9E75]" />
              : <Lock size={40} className="mx-auto text-orange-400" />}
            <h2 className="font-bold text-[#0d2b1a]">
              {isOnTime ? 'Nộp bài thành công!' : 'Đã nộp nhưng trễ hạn'}
            </h2>
            <p className="text-sm text-gray-500">
              {isOnTime
                ? 'Bài của bạn đang chờ admin xác nhận. Ngày tiếp theo sẽ mở đúng giờ.'
                : 'Ngày này bị đánh dấu "trễ hạn". Bạn không đủ điều kiện hoàn cọc nhưng vẫn có thể tiếp tục học.'}
            </p>
            {existingSub?.proof_text && (
              <div className="bg-gray-50 rounded-xl p-3 text-left">
                <p className="text-xs text-gray-400 mb-1">Bằng chứng đã nộp:</p>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{existingSub.proof_text}</p>
              </div>
            )}
            {dayNumber < 7 && (
              <Link href="/portal/thu-thach"
                className="inline-block mt-2 text-sm text-[#1D9E75] hover:underline">
                Xem tiến độ tổng →
              </Link>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#0d2b1a] mb-2">Nộp bằng chứng hoàn thành</label>
              <textarea
                value={proof}
                onChange={e => setProof(e.target.value)}
                placeholder={`${info.proof}\n\nDán link, mô tả, hoặc copy text ra đây...`}
                rows={5}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D9E75]/30 resize-none"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={submitting || !proof.trim()}
              className="w-full flex items-center justify-center gap-2 h-12 bg-[#0d2b1a] hover:bg-[#1D9E75] text-white font-bold rounded-xl transition-colors disabled:opacity-50">
              <Send size={16} />
              {submitting ? 'Đang nộp...' : 'Nộp bài ngày ' + dayNumber}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
