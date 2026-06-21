import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

function fmtDate(d: Date) {
  return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}`
}

// GET /api/admin/charts — dữ liệu thật cho 4 biểu đồ dashboard
export async function GET() {
  try {
    const now  = new Date()
    const d30  = new Date(now.getTime() - 30 * 86_400_000)
    const d60  = new Date(now.getTime() - 60 * 86_400_000)

    // Fetch parallel
    const [
      { data: ordersRaw },
      { data: enrollmentsRaw },
      { data: { users } },
      { data: progressRaw },
    ] = await Promise.all([
      supabaseAdmin.from('orders').select('paid_at, created_at, amount, status').gte('created_at', d60.toISOString()),
      supabaseAdmin.from('enrollments').select('created_at, user_id').gte('created_at', d30.toISOString()),
      supabaseAdmin.auth.admin.listUsers({ perPage: 1000 }),
      supabaseAdmin.from('lesson_progress').select('user_id, completed'),
    ])

    const orders         = ordersRaw ?? []
    const completedOrders = orders.filter(o => o.status === 'completed')

    // ── 1. Revenue by day (last 30 days) ─────────────────────────────────────
    const revenueMap: Record<string, { revenue: number; orders: number }> = {}
    for (const o of completedOrders) {
      const dt = o.paid_at ? new Date(o.paid_at) : new Date(o.created_at)
      if (dt < d30) continue
      const key = fmtDate(dt)
      revenueMap[key] ??= { revenue: 0, orders: 0 }
      revenueMap[key].revenue += Number(o.amount || 0)
      revenueMap[key].orders  += 1
    }
    const revenueByDay = Object.entries(revenueMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, v]) => ({ date, ...v }))

    // ── 2. Growth by day: enrollments + new users (last 30 days) ─────────────
    const enrollMap: Record<string, number> = {}
    for (const e of (enrollmentsRaw ?? [])) {
      const key = fmtDate(new Date(e.created_at))
      enrollMap[key] = (enrollMap[key] ?? 0) + 1
    }
    const userMap: Record<string, number> = {}
    for (const u of users) {
      const dt = new Date(u.created_at)
      if (dt < d30) continue
      const key = fmtDate(dt)
      userMap[key] = (userMap[key] ?? 0) + 1
    }
    const growthDates = Array.from(new Set([...Object.keys(enrollMap), ...Object.keys(userMap)])).sort()
    const growthByDay = growthDates.map(date => ({
      date,
      enrollments: enrollMap[date] ?? 0,
      newUsers:    userMap[date] ?? 0,
    }))

    // ── 3. Compare: current 30d vs previous 30d (binned every 3 days) ─────────
    const currentByDay:  Record<number, number> = {}
    const previousByDay: Record<number, number> = {}
    for (const o of completedOrders) {
      const dt = o.paid_at ? new Date(o.paid_at) : new Date(o.created_at)
      const amt = Number(o.amount || 0)
      if (dt >= d30) {
        const day = Math.floor((dt.getTime() - d30.getTime()) / 86_400_000)
        currentByDay[day] = (currentByDay[day] ?? 0) + amt
      } else if (dt >= d60) {
        const day = Math.floor((dt.getTime() - d60.getTime()) / 86_400_000)
        previousByDay[day] = (previousByDay[day] ?? 0) + amt
      }
    }
    const comparePeriods = Array.from({ length: 10 }, (_, i) => {
      const start   = i * 3
      const current  = [0,1,2].reduce((s, x) => s + (currentByDay[start+x]  ?? 0), 0)
      const previous = [0,1,2].reduce((s, x) => s + (previousByDay[start+x] ?? 0), 0)
      return { day: `Ngày ${start + 1}`, current, previous }
    })

    // ── 4. Funnel: hành trình học viên ────────────────────────────────────────
    const { count: enrolledCount } = await supabaseAdmin
      .from('enrollments')
      .select('user_id', { count: 'exact', head: true })

    const progress     = progressRaw ?? []
    const startedSet   = new Set(progress.map(p => p.user_id))
    const completedSet = new Set(progress.filter(p => p.completed).map(p => p.user_id))

    const funnel = [
      { step: 1, label: 'Đăng ký tài khoản',       count: users.length,            color: 'bg-brand-dark',   text: 'text-brand-dark' },
      { step: 2, label: 'Ghi danh khoá học',        count: enrolledCount ?? 0,      color: 'bg-brand-accent', text: 'text-brand-accent' },
      { step: 3, label: 'Bắt đầu học bài',          count: startedSet.size,         color: 'bg-brand-border', text: 'text-brand-border' },
      { step: 4, label: 'Hoàn thành ít nhất 1 bài', count: completedSet.size,       color: 'bg-success',      text: 'text-success' },
    ]

    return NextResponse.json({ revenueByDay, growthByDay, comparePeriods, funnel })
  } catch (err) {
    console.error('[admin/charts]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
