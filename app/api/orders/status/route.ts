import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  if (!code) return NextResponse.json({ error: 'Thiếu order code' }, { status: 400 })

  const { data: order } = await supabaseAdmin
    .from('orders')
    .select('status, paid_at, amount')
    .eq('order_code', code)
    .single()

  if (!order) return NextResponse.json({ error: 'Không tìm thấy đơn' }, { status: 404 })

  return NextResponse.json({ status: order.status, paidAt: order.paid_at })
}
