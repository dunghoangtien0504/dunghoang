import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { getFirstUnlock, getDayDeadline, getDayUnlock } from '@/lib/challenge-days'

export async function POST(req: NextRequest) {
  try {
    const { email, day_number, proof_text } = await req.json()

    if (!email || !day_number || !proof_text?.trim()) {
      return NextResponse.json({ error: 'Thiếu thông tin' }, { status: 400 })
    }
    if (day_number < 1 || day_number > 7) {
      return NextResponse.json({ error: 'Ngày không hợp lệ' }, { status: 400 })
    }

    const { data: enrollment } = await supabaseAdmin
      .from('challenge_enrollments')
      .select('*')
      .eq('email', email.toLowerCase())
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (!enrollment) return NextResponse.json({ error: 'Chưa đăng ký challenge' }, { status: 404 })
    if (enrollment.status === 'refunded') {
      return NextResponse.json({ error: 'Challenge đã kết thúc' }, { status: 400 })
    }

    const firstUnlock = enrollment.first_unlock_at
      ? new Date(enrollment.first_unlock_at)
      : getFirstUnlock(new Date(enrollment.started_at))

    const deadline = getDayDeadline(firstUnlock, day_number)
    const now = new Date()

    // Kiểm tra đã mở khóa chưa
    const unlock = getDayUnlock(firstUnlock, day_number)
    if (now < unlock) {
      return NextResponse.json({ error: `Ngày ${day_number} chưa mở khóa` }, { status: 400 })
    }

    // Upsert submission
    const { data: sub, error } = await supabaseAdmin
      .from('challenge_submissions')
      .upsert({
        enrollment_id: enrollment.id,
        day_number,
        proof_text:    proof_text.trim(),
        submitted_at:  now.toISOString(),
        deadline:      deadline.toISOString(),
        status:        'pending',
      }, { onConflict: 'enrollment_id,day_number' })
      .select()
      .single()

    if (error) throw error

    // Kiểm tra nếu là ngày 7 và tất cả 7 ngày đều đã nộp đúng hạn
    if (day_number === 7) {
      const { data: allSubs } = await supabaseAdmin
        .from('challenge_submissions')
        .select('day_number, is_on_time')
        .eq('enrollment_id', enrollment.id)

      const allDone = allSubs && allSubs.length === 7 && allSubs.every(s => s.is_on_time)
      if (allDone) {
        await supabaseAdmin
          .from('challenge_enrollments')
          .update({ all_completed: true, completed_at: now.toISOString(), status: 'completed' })
          .eq('id', enrollment.id)
      }
    }

    return NextResponse.json({
      ok: true,
      is_on_time: now <= deadline,
      submitted_at: now.toISOString(),
      deadline: deadline.toISOString(),
    })
  } catch (err) {
    console.error('[challenges/submit]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
