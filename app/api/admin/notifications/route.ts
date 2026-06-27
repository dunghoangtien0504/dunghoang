import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

// GET /api/admin/notifications — thông báo thật từ orders + users
export async function GET() {
  try {
    const since = new Date(Date.now() - 30 * 86_400_000).toISOString()

    const [
      { data: orders },
      { data: { users } },
    ] = await Promise.all([
      supabaseAdmin
        .from('orders')
        .select('order_code, name, email, course_id, amount, status, created_at, paid_at')
        .gte('created_at', since)
        .order('created_at', { ascending: false })
        .limit(20),
      supabaseAdmin.auth.admin.listUsers({ perPage: 50 }),
    ])

    type Notif = {
      id: string
      type: 'order' | 'student' | 'refund'
      title: string
      body: string
      href: string
      time: string
      read: boolean
    }

    const notifs: Notif[] = []

    // Đơn hàng hoàn thành / chờ xử lý / hoàn tiền
    for (const o of (orders ?? [])) {
      const fmtAmt = (o.amount / 1000).toFixed(0) + 'k'
      const displayName = o.name || o.email?.split('@')[0] || 'Khách'
      const timeStr = relativeTime(new Date(o.paid_at ?? o.created_at))

      if (o.status === 'completed') {
        notifs.push({
          id: `order-${o.order_code}`,
          type: 'order',
          title: 'Đơn hàng mới',
          body: `${displayName} vừa thanh toán ${fmtAmt}đ — ${o.order_code}`,
          href: '/admin/orders',
          time: timeStr,
          read: false,
        })
      } else if (o.status === 'refunded') {
        notifs.push({
          id: `refund-${o.order_code}`,
          type: 'refund',
          title: 'Yêu cầu hoàn tiền',
          body: `${displayName} hoàn tiền đơn ${o.order_code} — ${fmtAmt}đ`,
          href: '/admin/orders',
          time: timeStr,
          read: false,
        })
      }
    }

    // Người dùng mới đăng ký trong 30 ngày
    const recentUsers = users
      .filter(u => new Date(u.created_at) >= new Date(since))
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5)

    for (const u of recentUsers) {
      const email = u.email ?? 'unknown'
      const timeStr = relativeTime(new Date(u.created_at))
      notifs.push({
        id: `user-${u.id}`,
        type: 'student',
        title: 'Học viên mới',
        body: `${email} vừa tạo tài khoản`,
        href: '/admin/users',
        time: timeStr,
        read: false,
      })
    }

    // Sắp xếp theo thời gian mới nhất
    notifs.sort((a, b) => {
      const ta = extractTime(a.time)
      const tb = extractTime(b.time)
      return ta - tb
    })

    return NextResponse.json({ notifs })
  } catch (err) {
    console.error('[admin/notifications]', err)
    return NextResponse.json({ notifs: [] })
  }
}

function relativeTime(d: Date): string {
  const diff = Date.now() - d.getTime()
  const mins  = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days  = Math.floor(diff / 86400000)
  if (mins < 1)   return 'Vừa xong'
  if (mins < 60)  return `${mins} phút trước`
  if (hours < 24) return `${hours} giờ trước`
  if (days < 7)   return `${days} ngày trước`
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })
}

// dùng để sort — giá trị nhỏ hơn = gần đây hơn
function extractTime(s: string): number {
  if (s === 'Vừa xong') return 0
  const m = s.match(/(\d+)\s*(phút|giờ|ngày)/)
  if (!m) return 9999
  const n = parseInt(m[1])
  if (m[2] === 'phút') return n
  if (m[2] === 'giờ')  return n * 60
  return n * 1440
}
