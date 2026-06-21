import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

// GET /api/admin/orders — danh sách đơn hàng thật từ Supabase
export async function GET() {
  try {
    const { data: orders, error } = await supabaseAdmin
      .from('orders')
      .select('id, order_code, email, name, amount, course_id, course_name, status, affiliate_code, commission, paid_at, created_at')
      .order('created_at', { ascending: false })
      .limit(500)

    if (error) throw error

    return NextResponse.json({ orders: orders ?? [] })
  } catch (err) {
    console.error('[admin/orders]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
