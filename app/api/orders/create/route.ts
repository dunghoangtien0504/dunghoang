import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { PRODUCTS, genOrderCode, vietQRUrl } from '@/lib/products'
import { rateLimit, clientIp } from '@/lib/rate-limit'

export async function POST(req: NextRequest) {
  try {
    // Chống spam tạo đơn: 20 đơn / 10 phút / IP (đủ cho người mua thật, chặn bot)
    const rl = rateLimit(`orders-create:${clientIp(req)}`, 20, 10 * 60_000)
    if (!rl.ok) {
      return NextResponse.json({ error: `Thử lại sau ${rl.retryAfter} giây` }, { status: 429, headers: { 'Retry-After': String(rl.retryAfter) } })
    }

    const { productId, name, email, refCode } = await req.json()

    if (!productId || !name?.trim() || !email?.trim()) {
      return NextResponse.json({ error: 'Thiếu thông tin' }, { status: 400 })
    }

    const product = PRODUCTS[productId]
    if (!product) {
      return NextResponse.json({ error: 'Sản phẩm không tồn tại' }, { status: 400 })
    }

    // Kiểm tra affiliate code nếu có
    let affiliateData = null
    if (refCode) {
      const { data: aff } = await supabaseAdmin
        .from('affiliates')
        .select('ref_code, commission_pct')
        .eq('ref_code', refCode.toUpperCase())
        .eq('status', 'active')
        .single()
      affiliateData = aff
    }

    // Tìm subscriber nếu đã opt-in
    const { data: subscriber } = await supabaseAdmin
      .from('subscribers')
      .select('id')
      .eq('email', email.trim().toLowerCase())
      .single()

    const orderCode = genOrderCode(productId)

    // Tạo đơn hàng
    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .insert({
        order_code:     orderCode,
        subscriber_id:  subscriber?.id ?? null,
        email:          email.trim().toLowerCase(),
        name:           name.trim(),
        amount:         product.price,
        course_id:      productId,
        course_name:    product.name,
        affiliate_code: affiliateData?.ref_code ?? null,
        status:         'pending',
      })
      .select('order_code, amount')
      .single()

    if (error || !order) {
      console.error('[orders/create]', error)
      return NextResponse.json({ error: 'Không tạo được đơn hàng' }, { status: 500 })
    }

    return NextResponse.json({
      orderCode: order.order_code,
      amount:    order.amount,
      qrUrl:     vietQRUrl(order.amount, order.order_code),
      product:   { name: product.name, price: product.price },
      bank: {
        code:    process.env.NEXT_PUBLIC_BANK_CODE    ?? 'MB',
        account: process.env.NEXT_PUBLIC_ACCOUNT_NO   ?? '',
        name:    process.env.NEXT_PUBLIC_ACCOUNT_NAME ?? '',
      },
    })
  } catch (err) {
    console.error('[orders/create]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
