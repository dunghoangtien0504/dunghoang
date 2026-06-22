import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

// PATCH — cập nhật status hoặc mở toàn bộ ngày cho enrollment
export async function PATCH(req: NextRequest) {
  const { id, email, status, unlock_all } = await req.json()
  if (!id && !email) return NextResponse.json({ error: 'Thiếu id hoặc email' }, { status: 400 })

  const updates: Record<string, unknown> = {}

  if (status) updates.status = status

  if (unlock_all) {
    // Đặt first_unlock_at về 7 ngày trước → tất cả 7 ngày đã mở
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    sevenDaysAgo.setHours(7, 0, 0, 0)
    updates.first_unlock_at = sevenDaysAgo.toISOString()
    updates.started_at = new Date(sevenDaysAgo.getTime() - 60 * 1000).toISOString()
  }

  if (Object.keys(updates).length === 0) return NextResponse.json({ error: 'Không có gì cập nhật' }, { status: 400 })

  const query = supabaseAdmin.from('challenge_enrollments').update(updates)
  const { error } = id
    ? await query.eq('id', id)
    : await query.eq('email', email.toLowerCase().trim())

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

// DELETE — xoá enrollment
export async function DELETE(req: NextRequest) {
  const { id } = await req.json()
  if (!id) return NextResponse.json({ error: 'Thiếu id' }, { status: 400 })

  const { error } = await supabaseAdmin
    .from('challenge_enrollments')
    .delete()
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
