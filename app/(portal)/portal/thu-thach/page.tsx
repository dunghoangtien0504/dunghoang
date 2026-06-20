'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { CHALLENGE_DAYS } from '@/lib/challenge-days'
import Link from 'next/link'
import { ArrowLeft, Lock, CheckCircle, Clock, AlertCircle, ChevronRight } from 'lucide-react'

type DayProgress = {
  day_number:        number
  is_unlocked:       boolean
  is_past_deadline:  boolean
  unlock_at:         string
  deadline:          string
  submission:        { status: string; is_on_time: boolean } | null
}

type Enrollment = {
  status:        string
  all_completed: boolean
  deposit_amount:number
}

function fmtTime(iso: string) {
  return new Date(iso).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' })
}

export default function ThuThachPage() {
  const router  = useRouter()
  const [email, setEmail]   = useState('')
  const [days,  setDays]    = useState<DayProgress[]>([])
  const [enroll,setEnroll]  = useState<Enrollment | null>(null)
  const [loading,setLoading]= useState(true)
  const [error,  setError]  = useState('')

  useEffect(() => {
    supabase!.auth.getUser().then(async ({ data: { user } }) => {
      if (!user?.email) { router.push('/portal/login'); return }
      setEmail(user.email)
      const res = await fetch(`/api/challenges/progress?email=${encodeURIComponent(user.email)}`)
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Chưa đăng ký challenge'); setLoading(false); return }
      setEnroll(data.enrollment)
      setDays(data.days)
      setLoading(false)
    })
  }, [router])

  const completedCount = days.filter(d => d.submission?.is_on_time && d.submission.status !== 'rejected').length

  if (loading) return (
    <div className="min-h-screen bg-[#f5f5f0] flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-[#1D9E75] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/portal" className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#0d2b1a]">
            <ArrowLeft size={16} />Về khu học
          </Link>
          <span className="text-sm font-bold text-[#0d2b1a]">Thử Thách 7 Ngày</span>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">

        {error ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center space-y-4">
            <AlertCircle size={40} className="mx-auto text-gray-300" />
            <p className="font-medium text-[#0d2b1a]">{error}</p>
            <p className="text-sm text-gray-500">Chưa đăng ký challenge hoặc chưa có đơn hàng được xác nhận.</p>
            <Link href="/bi-quyet-7-ngay"
              className="inline-block bg-[#0d2b1a] text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-[#1D9E75] transition-colors">
              Đăng ký challenge →
            </Link>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="space-y-1">
              <h1 className="text-xl font-bold text-[#0d2b1a]">Bí Quyết 7 Ngày Đưa AI Vào Business</h1>
              <p className="text-gray-500 text-sm">Cọc {(enroll?.deposit_amount ?? 368000).toLocaleString('vi-VN')}đ · Hoàn thành đúng hạn → hoàn tiền</p>
            </div>

            {/* Progress bar */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-[#0d2b1a]">Tiến độ</span>
                <span className="text-sm font-bold text-[#1D9E75]">{completedCount}/7 ngày</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#1D9E75] rounded-full transition-all" style={{ width: `${(completedCount / 7) * 100}%` }} />
              </div>
              {enroll?.all_completed && (
                <div className="mt-3 flex items-center gap-2 text-[#1D9E75] text-sm font-medium">
                  <CheckCircle size={16} />
                  Hoàn thành đủ 7 ngày! Tiền cọc đang được xử lý hoàn lại.
                </div>
              )}
            </div>

            {/* Day cards */}
            <div className="space-y-3">
              {days.map((d) => {
                const info = CHALLENGE_DAYS[d.day_number - 1]
                const sub  = d.submission
                const isCompleted = sub && sub.is_on_time && sub.status !== 'rejected'
                const isLate      = sub && !sub.is_on_time
                const isPending   = sub && sub.status === 'pending' && sub.is_on_time

                return (
                  <div key={d.day_number}
                    className={`bg-white rounded-2xl border transition-all ${
                      isCompleted ? 'border-[#1D9E75]/40' :
                      isLate      ? 'border-orange-200' :
                      d.is_unlocked ? 'border-gray-100 hover:border-[#0d2b1a]/20 cursor-pointer' :
                      'border-gray-100 opacity-60'
                    }`}
                    onClick={() => d.is_unlocked && router.push(`/portal/thu-thach/${d.day_number}`)}
                  >
                    <div className="p-5 flex items-start gap-4">
                      {/* Status icon */}
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isCompleted  ? 'bg-[#EAF5EF]' :
                        isLate       ? 'bg-orange-50' :
                        isPending    ? 'bg-blue-50' :
                        d.is_unlocked ? 'bg-[#0d2b1a]/5' :
                        'bg-gray-50'
                      }`}>
                        {isCompleted  && <CheckCircle size={20} className="text-[#1D9E75]" />}
                        {isLate       && <AlertCircle size={20} className="text-orange-500" />}
                        {isPending    && <Clock size={20} className="text-blue-500" />}
                        {!sub && d.is_unlocked  && <span className="text-sm font-bold text-[#0d2b1a]">{d.day_number}</span>}
                        {!sub && !d.is_unlocked && <Lock size={16} className="text-gray-300" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Ngày {d.day_number}</span>
                          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{info.skill}</span>
                          {isCompleted && <span className="text-xs bg-[#EAF5EF] text-[#2D7A4F] px-2 py-0.5 rounded-full font-medium">Đúng giờ ✓</span>}
                          {isLate      && <span className="text-xs bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full">Trễ hạn</span>}
                          {isPending   && <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">Đã nộp · chờ duyệt</span>}
                        </div>
                        <p className="font-semibold text-[#0d2b1a] text-sm mt-1 leading-snug">{info.title}</p>
                        {d.is_unlocked && !isCompleted && !isLate && (
                          <p className="text-xs text-gray-400 mt-1">Hạn nộp: {fmtTime(d.deadline)}</p>
                        )}
                        {!d.is_unlocked && (
                          <p className="text-xs text-gray-400 mt-1">Mở lúc {fmtTime(d.unlock_at)}</p>
                        )}
                      </div>

                      {d.is_unlocked && <ChevronRight size={16} className="text-gray-300 flex-shrink-0 mt-1" />}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Rule reminder */}
            <div className="bg-[#0d2b1a]/5 rounded-xl p-4 text-xs text-gray-500 space-y-1">
              <p><strong className="text-[#0d2b1a]">Luật hoàn cọc:</strong> Nộp bài đúng hạn cả 7 ngày → mình hoàn 368k trong 48h sau ngày 7.</p>
              <p>Nộp trễ hoặc bỏ ngày → ngày đó bị đánh dấu "trễ" → không đủ điều kiện hoàn cọc.</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
