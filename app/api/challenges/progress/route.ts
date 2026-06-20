import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { getFirstUnlock, getDayUnlock, getDayDeadline } from '@/lib/challenge-days'

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get('email')
    if (!email) return NextResponse.json({ error: 'Thiếu email' }, { status: 400 })

    const { data: enrollment } = await supabaseAdmin
      .from('challenge_enrollments')
      .select('*')
      .eq('email', email.toLowerCase())
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (!enrollment) return NextResponse.json({ error: 'Chưa đăng ký challenge' }, { status: 404 })

    const { data: submissions } = await supabaseAdmin
      .from('challenge_submissions')
      .select('*')
      .eq('enrollment_id', enrollment.id)
      .order('day_number')

    const firstUnlock = enrollment.first_unlock_at
      ? new Date(enrollment.first_unlock_at)
      : getFirstUnlock(new Date(enrollment.started_at))

    const now = new Date()
    const days = Array.from({ length: 7 }, (_, i) => {
      const dayNum  = i + 1
      const unlock  = getDayUnlock(firstUnlock, dayNum)
      const deadline = getDayDeadline(firstUnlock, dayNum)
      const sub     = submissions?.find(s => s.day_number === dayNum)
      return {
        day_number:  dayNum,
        is_unlocked: now >= unlock,
        is_past_deadline: now > deadline,
        unlock_at:   unlock.toISOString(),
        deadline:    deadline.toISOString(),
        submission:  sub ?? null,
      }
    })

    return NextResponse.json({ enrollment, days })
  } catch (err) {
    console.error('[challenges/progress]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
