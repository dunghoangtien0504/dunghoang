import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { PRODUCTS } from '@/lib/products'

// POST — kích hoạt khóa học thủ công (tìm/tạo user → upsert enrollment)
export async function POST(req: NextRequest) {
  try {
    const { email, course_id, name } = await req.json()
    if (!email || !course_id) return NextResponse.json({ error: 'Thiếu email hoặc course_id' }, { status: 400 })
    if (!PRODUCTS[course_id]) return NextResponse.json({ error: 'course_id không hợp lệ' }, { status: 400 })

    const cleanEmail = email.trim().toLowerCase()

    // Tìm hoặc tạo auth user
    const { data: { users } } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 })
    let userId = users.find(u => u.email === cleanEmail)?.id

    if (!userId) {
      const { data: newUser, error: createErr } = await supabaseAdmin.auth.admin.createUser({
        email:         cleanEmail,
        email_confirm: true,
        user_metadata: { name: name || cleanEmail.split('@')[0] },
      })
      if (createErr) return NextResponse.json({ error: createErr.message }, { status: 500 })
      userId = newUser?.user?.id
    }

    if (!userId) return NextResponse.json({ error: 'Không thể tạo user' }, { status: 500 })

    // Upsert enrollment
    const { error } = await supabaseAdmin
      .from('enrollments')
      .upsert(
        { user_id: userId, course_id, enrolled_at: new Date().toISOString() },
        { onConflict: 'user_id,course_id' }
      )

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    // Ghi order thủ công để theo dõi
    await supabaseAdmin.from('orders').insert({
      email:       cleanEmail,
      name:        name || cleanEmail.split('@')[0],
      course_id,
      course_name: PRODUCTS[course_id].name,
      amount:      PRODUCTS[course_id].price,
      status:      'completed',
      order_code:  `ADMIN-MANUAL-${Date.now()}`,
      paid_at:     new Date().toISOString(),
    }).maybeSingle()

    return NextResponse.json({ ok: true, user_id: userId })
  } catch (err) {
    console.error('[admin/enrollments POST]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// DELETE — thu hồi quyền truy cập
export async function DELETE(req: NextRequest) {
  try {
    const { user_id, course_id } = await req.json()
    if (!user_id || !course_id) return NextResponse.json({ error: 'Thiếu user_id hoặc course_id' }, { status: 400 })

    const { error } = await supabaseAdmin
      .from('enrollments')
      .delete()
      .eq('user_id', user_id)
      .eq('course_id', course_id)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[admin/enrollments DELETE]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
