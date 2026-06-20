import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')?.toUpperCase()
  if (!code) return NextResponse.json({ error: 'Thiếu mã CTV' }, { status: 400 })

  const { data: aff, error } = await supabaseAdmin
    .from('affiliates')
    .select('id, name, ref_code, commission_pct, total_referrals, total_revenue, total_commission, pending_commission, paid_commission, status, joined_at')
    .eq('ref_code', code)
    .single()

  if (error || !aff) {
    return NextResponse.json({ error: 'Không tìm thấy mã CTV' }, { status: 404 })
  }

  // Lấy 20 đơn gần nhất do affiliate này giới thiệu
  const { data: orders } = await supabaseAdmin
    .from('orders')
    .select('order_code, email, course_name, amount, commission, status, paid_at, created_at')
    .eq('affiliate_code', code)
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
