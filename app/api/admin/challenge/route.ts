import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

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
