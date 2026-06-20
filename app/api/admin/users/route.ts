import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

// GET /api/admin/users — list all auth users + their enrollments
export async function GET() {
  try {
    const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers({
      perPage: 1000,
    })
    if (error) throw error

    // Lấy tất cả enrollments để map vào từng user
    const { data: enrollments } = await supabaseAdmin
      .from('enrollments')
      .select('user_id, course_id, enrolled_at')

    const enrollMap: Record<string, { course_id: string; enrolled_at: string }[]> = {}
    for (const e of (enrollments ?? [])) {
      if (!enrollMap[e.user_id]) enrollMap[e.user_id] = []
      enrollMap[e.user_id].push({ course_id: e.course_id, enrolled_at: e.enrolled_at })
    }

    const result = users.map(u => ({
      id:           u.id,
      email:        u.email ?? '',
      created_at:   u.created_at,
      last_sign_in: u.last_sign_in_at ?? null,
      enrollments:  enrollMap[u.id] ?? [],
    }))

    return NextResponse.json({ users: result })
  } catch (err) {
    console.error('[admin/users GET]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// POST /api/admin/users — send password reset email
export async function POST(req: NextRequest) {
  try {
    const { action, email } = await req.json()

    if (action === 'reset_password') {
      if (!email) return NextResponse.json({ error: 'Thiếu email' }, { status: 400 })

      const { error } = await supabaseAdmin.auth.admin.generateLink({
        type:       'recovery',
        email,
        options:    { redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dunghoang.com'}/portal/dat-lai-mat-khau` },
      })
      if (error) throw error
      return NextResponse.json({ ok: true })
    }

    return NextResponse.json({ error: 'Action không hợp lệ' }, { status: 400 })
  } catch (err) {
    console.error('[admin/users POST]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
