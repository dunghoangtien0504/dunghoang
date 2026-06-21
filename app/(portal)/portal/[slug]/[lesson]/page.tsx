'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { ChevronLeft, ChevronRight, CheckCircle, Download, MessageCircle } from 'lucide-react'

type Lesson = {
  id: string
  title: string
  description: string
  video_url: string
  duration: number
  sort_order: number
  is_free: boolean
}

export default function LessonPage() {
  const { slug, lesson: lessonId } = useParams<{ slug: string; lesson: string }>()
  const router = useRouter()

  const [lesson, setLesson]         = useState<Lesson | null>(null)
  const [allLessons, setAllLessons] = useState<Lesson[]>([])
  const [completed, setCompleted]   = useState(false)
  const [userId, setUserId]         = useState<string | null>(null)
  const [loading, setLoading]       = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase!.auth.getUser()
      if (!user) return
      setUserId(user.id)

      const [{ data: lessonData }, { data: allData }, { data: prog }] = await Promise.all([
        supabase!.from('lessons').select('*').eq('id', lessonId).single(),
        supabase!.from('lessons').select('id, title, sort_order, is_free').eq('course_id', slug).eq('is_published', true).order('sort_order'),
        supabase!.from('lesson_progress').select('completed').eq('user_id', user.id).eq('lesson_id', lessonId).single(),
      ])

      setLesson(lessonData)
      setAllLessons((allData as unknown as Lesson[]) || [])
      setCompleted(prog?.completed || false)
      setLoading(false)
    }
    load()
  }, [lessonId, slug])

  const markComplete = useCallback(async () => {
    if (!userId || !lessonId || completed) return
    await supabase!.from('lesson_progress').upsert({
      user_id: userId, lesson_id: lessonId, completed: true,
    }, { onConflict: 'user_id,lesson_id' })
    setCompleted(true)
  }, [userId, lessonId, completed])

  const currentIndex = allLessons.findIndex(l => l.id === lessonId)
  const prevLesson   = currentIndex > 0 ? allLessons[currentIndex - 1] : null
  const nextLesson   = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null

  function getEmbedUrl(url: string) {
    if (!url) return ''
    const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/)
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?rel=0&modestbranding=1`
    return url
  }

  if (loading || !lesson) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-6 h-6 border-2 border-[#1D9E75] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main content */}
      <div className="lg:col-span-2 space-y-4">
        {/* Back */}
        <button onClick={() => router.push(`/portal/${slug}`)} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600">
          <ChevronLeft size={16} /> Danh sách bài
        </button>

        {/* Video */}
        <div className="bg-black rounded-2xl overflow-hidden aspect-video">
          {lesson.video_url ? (
            <iframe
              src={getEmbedUrl(lesson.video_url)}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onEnded={markComplete}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
              Video đang được cập nhật...
            </div>
          )}
        </div>

        {/* Title + actions */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-lg font-bold text-[#0d2b1a] leading-snug">{lesson.title}</h1>
            <button
              onClick={markComplete}
              className={`flex-shrink-0 flex items-center gap-2 text-sm px-4 py-2 rounded-xl font-medium transition-all ${
                completed
                  ? 'bg-[#1D9E75]/10 text-[#1D9E75]'
                  : 'bg-gray-100 text-gray-600 hover:bg-[#1D9E75]/10 hover:text-[#1D9E75]'
              }`}
            >
              <CheckCircle size={15} />
              {completed ? 'Đã hoàn thành' : 'Đánh dấu xong'}
            </button>
          </div>

          {lesson.description && (
            <p className="text-sm text-gray-600 leading-relaxed">{lesson.description}</p>
          )}

          {/* Quick actions */}
          <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
            <a
              href="https://t.me/KentHoang"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-gray-500 hover:text-[#1D9E75] transition-colors"
            >
              <MessageCircle size={14} />
              Hỏi Tiểu Hà Mã trên Telegram
            </a>
          </div>
        </div>

        {/* Prev / Next */}
        <div className="flex items-center gap-3">
          {prevLesson ? (
            <button
              onClick={() => router.push(`/portal/${slug}/${prevLesson.id}`)}
              className="flex-1 flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-600 hover:border-[#1D9E75]/30 hover:text-[#1D9E75] transition-all"
            >
              <ChevronLeft size={16} />
              <span className="truncate">{prevLesson.title}</span>
            </button>
          ) : <div className="flex-1" />}

          {nextLesson && (
            <button
              onClick={() => { markComplete(); router.push(`/portal/${slug}/${nextLesson.id}`) }}
              className="flex-1 flex items-center justify-end gap-2 bg-[#0d2b1a] text-white rounded-xl px-4 py-3 text-sm hover:bg-[#1D9E75] transition-all"
            >
              <span className="truncate">{nextLesson.title}</span>
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Sidebar — lesson list */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden h-fit sticky top-20">
        <div className="px-4 py-3 border-b border-gray-50">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Danh sách bài</p>
        </div>
        <div className="divide-y divide-gray-50 max-h-[60vh] overflow-y-auto">
          {allLessons.map((l, i) => {
            const isActive = l.id === lessonId
            return (
              <button
                key={l.id}
                onClick={() => router.push(`/portal/${slug}/${l.id}`)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                  isActive ? 'bg-[#1D9E75]/5 border-l-2 border-[#1D9E75]' : 'hover:bg-gray-50'
                }`}
              >
                <span className={`text-xs font-mono w-5 flex-shrink-0 ${isActive ? 'text-[#1D9E75]' : 'text-gray-300'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={`text-xs leading-snug flex-1 truncate ${isActive ? 'text-[#0d2b1a] font-medium' : 'text-gray-600'}`}>
                  {l.title}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
