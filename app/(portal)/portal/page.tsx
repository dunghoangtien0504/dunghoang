'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/useAuth'
import { BookOpen, Lock, CheckCircle, ChevronRight } from 'lucide-react'

type Enrollment = {
  course_id:   string
  enrolled_at: string
  course_products: { id: string; name: string; description: string }
}

const COURSE_ACCENT: Record<string, string> = {
  content_368: 'bg-amber-500',
  mini_368:    'bg-emerald-600',
  'landing-page': 'bg-red-600',
  'khoa-1':    'bg-blue-600',
  khoa1_686:   'bg-blue-600',
  khoa2_2768:  'bg-purple-600',
  '1kem1':     'bg-orange-600',
}

const COURSE_EMOJI: Record<string, string> = {
  content_368: '✍️',
  mini_368:    '🛒',
  'landing-page': '🚀',
  'khoa-1':    '⚡',
  khoa1_686:   '⚡',
  khoa2_2768:  '🤝',
  '1kem1':     '🎯',
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [loading,     setLoading]     = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase!.auth.getUser()
      if (!user) return
      const { data } = await supabase!
        .from('enrollments')
        .select('course_id, enrolled_at, course_products(id, name, description)')
        .eq('user_id', user.id)
      setEnrollments((data as unknown as Enrollment[]) || [])
      setLoading(false)
    }
    load()
  }, [])

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F6F0E4]">
        <div className="w-6 h-6 border-2 border-[#1D9E75] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F6F0E4]">

      {/* Nav */}
      <nav className="bg-[#0D2B1A] sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="text-[#F6F0E4] font-black font-mono text-sm">DungHoang.com</span>
          <div className="flex items-center gap-4">
            <span className="text-[#F6F0E4]/40 text-xs hidden sm:block">{user?.email}</span>
            <a href="/portal/cong-tac-vien" className="text-[#F6F0E4]/60 hover:text-[#F6F0E4] text-xs transition-colors">
              Cộng tác viên
            </a>
            <a href="/portal/tai-khoan" className="text-[#F6F0E4]/60 hover:text-[#F6F0E4] text-xs transition-colors">
              Tài khoản
            </a>
            <button
              onClick={() => supabase!.auth.signOut().then(() => router.push('/portal/login'))}
              className="text-xs text-[#F6F0E4]/40 hover:text-[#F6F0E4]/70 transition-colors"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* Header */}
        <div className="bg-[#0D2B1A] rounded-2xl p-6 space-y-1">
          <p className="text-[#F6F0E4]/50 text-xs font-mono uppercase tracking-widest">Khu học viên</p>
          <h1 className="text-xl font-black text-[#F6F0E4]">
            {enrollments.length > 0
              ? `${enrollments.length} khóa đang chờ bạn`
              : 'Chưa có khóa học nào'}
          </h1>
        </div>

        {/* Courses */}
        {enrollments.length > 0 ? (
          <div className="space-y-2">
            {enrollments.map(e => {
              const accent = COURSE_ACCENT[e.course_id] ?? 'bg-gray-600'
              const emoji  = COURSE_EMOJI[e.course_id]  ?? '📚'
              return (
                <a
                  key={e.course_id}
                  href={`/portal/${e.course_id}`}
                  className="group flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-5 hover:border-[#0D2B1A]/20 hover:shadow-sm transition-all"
                >
                  <div className={`w-12 h-12 rounded-xl ${accent} flex items-center justify-center flex-shrink-0 text-xl`}>
                    {emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#0D2B1A] text-sm leading-snug group-hover:text-[#1D9E75] transition-colors">
                      {e.course_products?.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Đăng ký {new Date(e.enrolled_at).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-[#1D9E75] flex-shrink-0 transition-colors" />
                </a>
              )
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-12 text-center space-y-4">
            <Lock size={32} className="text-gray-300 mx-auto" />
            <div>
              <p className="font-bold text-[#0D2B1A]">Chưa có khóa học nào</p>
              <p className="text-sm text-gray-400 mt-1">
                Nếu đã mua, liên hệ Dũng qua Telegram để được cấp quyền.
              </p>
            </div>
            <a href="/khoa-1"
              className="inline-block bg-[#0D2B1A] text-white text-sm px-6 py-3 rounded-xl hover:bg-[#1D9E75] transition-colors font-bold">
              Xem Khóa 1 — 868.686đ →
            </a>
          </div>
        )}



        {/* Cộng tác viên */}
        <a href="/portal/cong-tac-vien"
          className="group flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-5 hover:border-[#0D2B1A]/20 hover:shadow-sm transition-all">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0 text-xl text-[#2D7A4F]">
            🤝
          </div>
          <div className="flex-1">
            <p className="font-bold text-[#0D2B1A] text-sm group-hover:text-[#1D9E75] transition-colors">
              Chương trình Cộng tác viên
            </p>
            <p className="text-xs text-gray-400 mt-0.5">Giới thiệu khóa học — Nhận hoa hồng 10–20%</p>
          </div>
          <ChevronRight size={16} className="text-gray-300 group-hover:text-[#1D9E75] flex-shrink-0 transition-colors" />
        </a>

        {/* Tips */}
        {enrollments.length > 0 && (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-4">
            <p className="font-bold text-[#0D2B1A] text-sm">Gợi ý bắt đầu</p>
            <div className="space-y-3">
              {[
                'Học 1 skill → làm thử ngay → thấy kết quả → học skill tiếp. Đừng xem hết một lúc.',
                'Nộp bài từng ngày để Dũng theo dõi và duyệt. Bài được duyệt mới tính hoàn thành.',
                'Bị kẹt ở đâu? Nhắn Telegram @KentHoang bất cứ lúc nào.',
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle size={15} className="text-[#1D9E75] mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
