import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

// GET /api/admin/portal — Lấy danh sách bài nộp của học viên (vượt qua RLS an toàn ở Server)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const filter = searchParams.get('filter') || 'all'

    let q = supabaseAdmin
      .from('lesson_progress')
      .select(`
        id, user_id, lesson_id, completed,
        submission_url, submission_note, submitted_at,
        approved, admin_note, updated_at,
        lessons:lesson_id (title, course_id)
      `)
      .not('submitted_at', 'is', null)
      .order('submitted_at', { ascending: false })

    if (filter === 'pending') {
      q = q.is('approved', null)
    } else if (filter === 'approved') {
      q = q.eq('approved', true)
    } else if (filter === 'rejected') {
      q = q.eq('approved', false)
    }

    const { data, error } = await q
    if (error) throw error

    return NextResponse.json({ submissions: data })
  } catch (err) {
    console.error('[admin/portal GET]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// POST /api/admin/portal — Duyệt bài nộp (Approve/Reject) của học viên
export async function POST(req: NextRequest) {
  try {
    const { id, approved, completed, admin_note } = await req.json()
    if (!id) {
      return NextResponse.json({ error: 'Thiếu ID bài nộp' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('lesson_progress')
      .update({
        approved,
        completed,
        admin_note,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ ok: true, data })
  } catch (err) {
    console.error('[admin/portal POST]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
