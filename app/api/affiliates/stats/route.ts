import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { verifyAffiliateToken } from '@/lib/affiliate-token'
import { rateLimit, clientIp } from '@/lib/rate-limit'

export async function GET(req: NextRequest) {
  // Rate limit: chống dò token
  const rl = rateLimit(`aff-stats:${clientIp(req)}`, 30, 60_000)
  if (!rl.ok) {
    return NextResponse.json({ error: 'Thử lại sau ít giây' }, { status: 429, headers: { 'Retry-After': String(rl.retryAfter) } })
  }

  // Bắt buộc token có chữ ký — KHÔNG cho tra cứu bằng ref_code/email đoán được nữa
  const token = req.nextUrl.searchParams.get('token')
  if (!token) {
    return NextResponse.json({ error: 'Thiếu token truy cập. Dùng đúng link trong email CTV của bạn.' }, { status: 401 })
  }

  const code = await verifyAffiliateToken(token)
  if (!code) {
    return NextResponse.json({ error: 'Token không hợp lệ hoặc đã hết hạn.' }, { status: 401 })
  }

  const { data: aff, error } = await supabaseAdmin
    .from('affiliates')
    .select('id, name, ref_code, commission_pct, total_referrals, total_revenue, total_commission, pending_commission, paid_commission, status, joined_at')
    .eq('ref_code', code)
    .single()

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
