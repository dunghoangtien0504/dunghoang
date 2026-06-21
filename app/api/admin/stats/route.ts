import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

// GET /api/admin/stats — số liệu thật từ Supabase cho dashboard admin
export async function GET() {
  try {
    // Tất cả đơn hàng
    const { data: orders } = await supabaseAdmin
      .from('orders')
      .select('amount, status, course_id, created_at, paid_at')

    const all       = orders ?? []
    const completed = all.filter(o => o.status === 'completed')
    const pending   = all.filter(o => o.status === 'pending')
    const refunded  = all.filter(o => o.status === 'refunded')

    const revenue = completed.reduce((s, o) => s + Number(o.amount || 0), 0)
    const aov     = completed.length ? Math.round(revenue / completed.length) : 0

    // Số học viên thật = số tài khoản auth
    const { data: { users } } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 })
    const studentCount = users?.length ?? 0

    // Số enrollment (lượt ghi danh khóa)
    const { count: enrollCount } = await supabaseAdmin
      .from('enrollments')
      .select('*', { count: 'exact', head: true })

    // Doanh thu theo khóa
    const revenueByCourse: Record<string, number> = {}
    for (const o of completed) {
      const k = o.course_id || 'khác'
      revenueByCourse[k] = (revenueByCourse[k] || 0) + Number(o.amount || 0)
    }

    return NextResponse.json({
      revenue,
      aov,
      orders: {
        total:     all.length,
        completed: completed.length,
        pending:   pending.length,
        refunded:  refunded.length,
      },
      students:    studentCount,
      enrollments: enrollCount ?? 0,
      revenueByCourse,
    })
  } catch (err) {
    console.error('[admin/stats]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
