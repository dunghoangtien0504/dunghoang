'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Play, Lock, CheckCircle, ChevronLeft, Clock } from 'lucide-react'

type Lesson = {
  id: string
  title: string
  description: string
  duration: number
  sort_order: number
  is_free: boolean
  is_published: boolean
}

type Progress = { lesson_id: string; completed: boolean }

export default function CoursePage() {
  const { slug }   = useParams<{ slug: string }>()
  const router     = useRouter()
  const [lessons, setLessons]     = useState<Lesson[]>([])
  const [progress, setProgress]   = useState<Progress[]>([])
  const [enrolled, setEnrolled]   = useState(false)
  const [courseName, setCourseName] = useState('')
  const [loading, setLoading]     = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase!.auth.getUser()
      if (!user) return

      // Kiểm tra đã mua khóa này chưa
      const { data: enroll } = await supabase!
        .from('enrollments')
        .select('course_id, course_products(name)')
        .eq('user_id', user.id)
        .eq('course_id', slug)
        .single()

      setEnrolled(!!enroll)
      if (enroll) {
        const cp = enroll.course_products as unknown as { name: string }
        setCourseName(cp?.name || '')
      }

      // Lấy danh sách bài học
      const { data: lessonData } = await supabase!
        .from('lessons')
        .select('id, title, description, duration, sort_order, is_free, is_published')
        .eq('course_id', slug)
        .eq('is_published', true)
        .order('sort_order')

      setLessons(lessonData || [])

      // Lấy progress
      if (enroll) {
        const { data: prog } = await supabase!
          .from('lesson_progress')
          .select('lesson_id, completed')
          .eq('user_id', user.id)
        setProgress(prog || [])
      }

      setLoading(false)
    }
    load()
  }, [slug])

  const completedIds = new Set(progress.filter(p => p.completed).map(p => p.lesson_id))
  const completedCount = completedIds.size
  const totalCount = lessons.length

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-6 h-6 border-2 border-[#1D9E75] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Back */}
      <button onClick={() => router.back()} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600">
        <ChevronLeft size={16} /> Quay lại
      </button>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h1 className="text-xl font-bold text-[#0d2b1a]">{courseName}</h1>
        {enrolled && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
              <span>Tiến độ</span>
              <span>{completedCount}/{totalCount} bài</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1D9E75] rounded-full transition-all"
                style={{ width: `${totalCount ? (completedCount / totalCount) * 100 : 0}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Lesson list */}
      <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50 overflow-hidden">
        {lessons.map((lesson, i) => {
          const canAccess = enrolled || lesson.is_free
          const isDone = completedIds.has(lesson.id)

          return (
            <div
              key={lesson.id}
              onClick={() => canAccess && router.push(`/hoc-vien/${slug}/${lesson.id}`)}
              className={`flex items-center gap-4 px-6 py-4 transition-colors ${
                canAccess ? 'hover:bg-gray-50 cursor-pointer' : 'opacity-60 cursor-not-allowed'
              }`}
            >
              {/* Number / Status */}
              <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                isDone
                  ? 'bg-[#1D9E75]/10 text-[#1D9E75]'
                  : 'bg-gray-100 text-gray-400'
              }`}>
                {isDone ? <CheckCircle size={18} /> : i + 1}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#0d2b1a] truncate">{lesson.title}</p>
                {lesson.description && (
                  <p className="text-xs text-gray-400 mt-0.5 truncate">{lesson.description}</p>
                )}
              </div>

              {/* Meta */}
              <div className="flex items-center gap-3 flex-shrink-0">
                {lesson.duration > 0 && (
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock size={11} />{lesson.duration} phút
                  </span>
                )}
                {lesson.is_free && !enrolled && (
                  <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full">Xem thử</span>
                )}
                {!canAccess && <Lock size={14} className="text-gray-300" />}
                {canAccess && !isDone && <Play size={14} className="text-[#1D9E75]" />}
              </div>
            </div>
          )
        })}
      </div>

      {!enrolled && (
        <div className="bg-[#0d2b1a] rounded-2xl p-6 text-center text-white">
          <p className="text-sm mb-4">Mua khóa học để mở khóa tất cả {totalCount} bài học</p>
          <a
            href={`/${slug.replace('_', '-')}`}
            className="inline-block bg-[#1D9E75] text-white text-sm px-8 py-3 rounded-xl font-medium hover:bg-[#17875f] transition-colors"
          >
            Mua khóa học ngay
          </a>
        </div>
      )}
    </div>
  )
}
