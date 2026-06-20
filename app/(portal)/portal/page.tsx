'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/useAuth'
import { BookOpen, Play, CheckCircle, Lock } from 'lucide-react'

type Enrollment = {
  course_id: string
  enrolled_at: string
  course_products: {
    id: string
    name: string
    description: string
  }
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [loading, setLoading]         = useState(true)

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

  const COURSE_COLORS: Record<string, string> = {
    mini_368:   'from-emerald-500 to-teal-600',
    khoa1_686:  'from-blue-500 to-indigo-600',
    khoa2_2768: 'from-purple-500 to-pink-600',
    '1kem1':    'from-orange-500 to-red-600',
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f0] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#1D9E75] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="text-sm font-bold text-[#0d2b1a] tracking-wide">DungHoang.com</span>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400 hidden sm:block">{user?.email}</span>
            <a href="/portal/tai-khoan" className="text-xs text-gray-400 hover:text-[#0d2b1a] transition-colors">Tài khoản</a>
            <button onClick={() => supabase!.auth.signOut().then(() => router.push('/portal/login'))} className="text-xs text-gray-400 hover:text-gray-600">Đăng xuất</button>
          </div>
        </div>
      </nav>
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#0d2b1a]">Khu học của bạn</h1>
        <p className="text-gray-500 text-sm mt-1">
          {enrollments.length > 0
            ? `${enrollments.length} khóa học đang chờ bạn`
            : 'Chưa có khóa học nào'}
        </p>
      </div>

      {/* Enrolled courses */}
      {enrollments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {enrollments.map((e) => {
            const color = COURSE_COLORS[e.course_id] || 'from-gray-500 to-gray-700'
            return (
              <a
                key={e.course_id}
                href={`/portal/${e.course_id}`}
                className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden"
              >
                <div className={`h-28 bg-gradient-to-br ${color} flex items-center justify-center relative`}>
                  <BookOpen size={36} className="text-white/80" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <Play size={20} className="text-white ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[#0d2b1a] text-sm leading-snug group-hover:text-[#1D9E75] transition-colors">
                    {e.course_products?.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Đăng ký {new Date(e.enrolled_at).toLocaleDateString('vi-VN')}
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-xs bg-[#1D9E75]/10 text-[#1D9E75] px-2.5 py-1 rounded-full font-medium">
                      Vào học →
                    </span>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-12 text-center">
          <Lock size={32} className="text-gray-300 mx-auto mb-4" />
          <h3 className="font-medium text-gray-600 mb-2">Chưa có khóa học nào</h3>
          <p className="text-sm text-gray-400 mb-6">
            Tài khoản này chưa được gán khóa học.<br />
            Nếu bạn đã mua, liên hệ Dũng qua Telegram để được hỗ trợ.
          </p>
          <a
            href="/khoa-1"
            className="inline-block bg-[#0d2b1a] text-white text-sm px-6 py-2.5 rounded-xl hover:bg-[#1D9E75] transition-colors"
          >
            Xem Khóa 1 — 686.868đ
          </a>
        </div>
      )}

      {/* Checklist gợi ý */}
      {enrollments.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="font-bold text-[#0d2b1a] text-sm mb-4">Gợi ý bắt đầu</h3>
          <div className="space-y-3">
            {[
              'Học 1 skill → làm thử ngay → thấy kết quả → học skill tiếp',
              'Hỏi Tiểu Hà Mã trên Telegram khi bị kẹt bất cứ lúc nào',
              'Đừng xem hết tất cả cùng 1 lúc — não không hấp thụ được^^',
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
