import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')?.toUpperCase()
  const email = req.nextUrl.searchParams.get('email')?.toLowerCase()
  if (!code && !email) {
    return NextResponse.json({ error: 'Thiếu mã CTV hoặc email' }, { status: 400 })
  }

  let query = supabaseAdmin
    .from('affiliates')
    .select('id, name, ref_code, commission_pct, total_referrals, total_revenue, total_commission, pending_commission, paid_commission, status, joined_at')

  if (code) {
    query = query.eq('ref_code', code)
  } else if (email) {
    query = query.eq('email', email)
  }

  const { data: aff, error } = await query.single()

  if (error || !aff) {
    return NextResponse.json({ error: 'Không tìm thấy tài khoản CTV' }, { status: 404 })
  }

  // Lấy 20 đơn gần nhất do affiliate này giới thiệu
  const { data: orders } = await supabaseAdmin
    .from('orders')
    .select('order_code, email, course_name, amount, commission, status, paid_at, created_at')
    .eq('affiliate_code', aff.ref_code)
    .order('created_at', { ascending: false })
    .limit(20)

  // Lấy các yêu cầu rút tiền
  const { data: payouts } = await supabaseAdmin
    .from('affiliate_payouts')
    .select('id, gross_amount, net_amount, tax_amount, taxable, status, requested_at, paid_at')
    .eq('affiliate_id', aff.id)
    .order('requested_at', { ascending: false })
    .limit(10)

  return NextResponse.json({ affiliate: aff, orders: orders ?? [], payouts: payouts ?? [] })
}
