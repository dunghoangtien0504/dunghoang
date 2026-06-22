import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { getFirstUnlock } from '@/lib/challenge-days'

export async function GET() {
  const [{ data: enrollments }, { data: submissions }] = await Promise.all([
    supabaseAdmin
      .from('challenge_enrollments')
      .select('email, order_code, status, all_completed, created_at')
      .order('created_at', { ascending: false }),
    supabaseAdmin
      .from('challenge_submissions')
      .select('*, enrollment:challenge_enrollments(email, order_code, status, all_completed)')
      .order('submitted_at', { ascending: false }),
  ])

  return NextResponse.json({ enrollments: enrollments ?? [], submissions: submissions ?? [] })
}

export async function POST(req: NextRequest) {
  const { id, status, admin_note } = await req.json()
  if (!id || !status) return NextResponse.json({ error: 'Thiếu thông tin' }, { status: 400 })

  const { error } = await supabaseAdmin
    .from('challenge_submissions')
    .update({ status, admin_note: admin_note || null, reviewed_at: new Date().toISOString() })
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

// PUT /api/admin/challenge — tạo enrollment thủ công
export async function PUT(req: NextRequest) {
  const { email, name, deposit_amount, order_code } = await req.json()
  if (!email) return NextResponse.json({ error: 'Thiếu email' }, { status: 400 })

  const startedAt   = new Date()
  const firstUnlock = getFirstUnlock(startedAt)

  const { error } = await supabaseAdmin
    .from('challenge_enrollments')
    .insert({
      email:           email.toLowerCase().trim(),
      name:            name || email.split('@')[0],
      order_code:      order_code || `ADMIN-MANUAL-${Date.now()}`,
      deposit_amount:  deposit_amount ?? 368000,
      started_at:      startedAt.toISOString(),
      first_unlock_at: firstUnlock.toISOString(),
      status:          'active',
    })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
