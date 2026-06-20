import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { sendEmail } from '@/lib/resend'
import { getWelcomeEmail } from '@/lib/emails/welcome'
import { formatVND } from '@/lib/products'

// Sepay gửi POST này mỗi khi có tiền vào tài khoản
export async function POST(req: NextRequest) {
  try {
    // Xác thực API Key từ Sepay
    const apiKey = req.headers.get('authorization')?.replace('Apikey ', '')
    if (apiKey !== process.env.SEPAY_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { content, transferAmount, referenceCode, id: sepayId } = body

    // Tìm mã đơn hàng trong nội dung chuyển khoản (DH-MINI-XXXXX | DH-K1-XXXXX | DH-K2-XXXXX)
    const orderCodeMatch = content?.match(/DH-(?:MINI|K1|K2|K3)-[A-Z0-9]+/i)
    if (!orderCodeMatch) {
      console.log('[sepay] Không có mã DH trong nội dung:', content)
      return NextResponse.json({ message: 'Bỏ qua — không có mã đơn hàng' }, { status: 200 })
    }

    const orderCode = orderCodeMatch[0].toUpperCase()

    // Tìm đơn hàng trong database
    const { data: order } = await supabaseAdmin
      .from('orders')
      .select('*, subscribers(email, name)')
      .eq('order_code', orderCode)
      .single()

    if (!order) {
      // Đơn chưa có — ghi lại để admin xem
      await supabaseAdmin.from('orders').insert({
        order_code: orderCode,
        email:      'unknown@sepay.vn',
        amount:     transferAmount,
        status:     'pending',
        sepay_ref:  referenceCode || sepayId,
        paid_at:    new Date().toISOString(),
      })
      return NextResponse.json({ message: 'Mã không khớp đơn nào — đã ghi lại để kiểm tra' })
    }

    // Đơn đã xử lý rồi
    if (order.status === 'completed') {
      return NextResponse.json({ message: `Đơn ${orderCode} đã xử lý trước đó` })
    }

    const email = (order.subscribers as { email: string; name: string } | null)?.email || order.email
    const name  = (order.subscribers as { email: string; name: string } | null)?.name  || order.name || 'bạn'

    // ── Kiểm tra số tiền ──────────────────────────────────────────────
    const expected = order.amount
    const received = transferAmount

    if (received < expected) {
      const shortfall = expected - received
      // Gửi email báo thiếu tiền
      await sendEmail({
        to:      email,
        subject: `[DungHoang.com] Đơn ${orderCode} — còn thiếu ${formatVND(shortfall)}`,
        html: `
          <div style="font-family:sans-serif;max-width:540px;margin:0 auto;color:#0D2B1A">
            <p>Bạn ơi,</p>
            <p>Mình nhận được chuyển khoản <strong>${formatVND(received)}</strong> cho đơn hàng <strong>${orderCode}</strong> rồi.</p>
            <p>Nhưng đơn của bạn là <strong>${order.course_name}</strong> — ${formatVND(expected)}.</p>
            <p>Còn thiếu <strong style="color:#C0390E">${formatVND(shortfall)}</strong> nữa bạn nhé.</p>
            <p>Bạn chuyển thêm đúng số tiền còn thiếu, với cùng nội dung chuyển khoản <strong>${orderCode}</strong> là mình kích hoạt ngay.</p>
            <p>Hoặc liên hệ mình qua Telegram <a href="https://t.me/kenthoang">@kenthoang</a> để được hỗ trợ nhanh hơn nhé.</p>
            <p>Cảm ơn bạn,<br/>Dũng Hoàng</p>
          </div>
        `,
      })

      // Ghi lại số tiền đã nhận để tracking
      await supabaseAdmin
        .from('orders')
        .update({ sepay_ref: referenceCode || sepayId })
        .eq('order_code', orderCode)

      console.log(`[sepay] ${orderCode} thiếu ${formatVND(shortfall)} — đã gửi email ${email}`)
      return NextResponse.json({ message: `Thiếu ${formatVND(shortfall)} — đã gửi email nhắc` })
    }

    // ── Đủ tiền → kích hoạt ──────────────────────────────────────────
    await supabaseAdmin
      .from('orders')
      .update({ status: 'completed', paid_at: new Date().toISOString(), sepay_ref: referenceCode || sepayId })
      .eq('order_code', orderCode)

    if (email) {
      // Tạo hoặc lấy Supabase Auth user
      const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers()
      let userId = existingUsers?.users.find(u => u.email === email)?.id

      if (!userId) {
        const { data: newUser } = await supabaseAdmin.auth.admin.createUser({
          email,
          email_confirm: true,
          user_metadata: { name },
        })
        userId = newUser?.user?.id
      }

      // Ghi enrollment
      if (userId && order.course_id) {
        await supabaseAdmin.from('enrollments').upsert({
          user_id:     userId,
          course_id:   order.course_id,
          enrolled_at: new Date().toISOString(),
        }, { onConflict: 'user_id,course_id' })
      }

      // Gửi email welcome
      const welcome = getWelcomeEmail(name, order.course_id, order.course_name)
      await sendEmail({ to: email, subject: welcome.subject, html: welcome.html })

      // Tag subscriber "đã mua" + dừng chuỗi challenge
      if (order.subscriber_id) {
        const tag = `da_mua_${order.course_id}`
        await supabaseAdmin.rpc('append_tag', { subscriber_id: order.subscriber_id, tag })
        await supabaseAdmin
          .from('email_sequences')
          .update({ status: 'paused' })
          .eq('subscriber_id', order.subscriber_id)
          .eq('sequence_name', 'challenge_7ngay')
      }
    }

    // Hoa hồng affiliate
    if (order.affiliate_code) {
      const { data: affRow } = await supabaseAdmin
        .from('affiliates')
        .select('id, commission_pct')
        .eq('ref_code', order.affiliate_code)
        .single()

      if (affRow) {
        const commissionAmt = Math.round((received * affRow.commission_pct) / 100)
        await supabaseAdmin
          .from('orders')
          .update({ commission: commissionAmt })
          .eq('order_code', orderCode)
        await supabaseAdmin.rpc('affiliate_add_commission', {
          p_affiliate_id: affRow.id,
          p_amount:       commissionAmt,
        })
      }
    }

    console.log(`[sepay] ${orderCode} (${order.course_name}) — kích hoạt cho ${email}`)
    return NextResponse.json({ success: true, message: `Đơn ${orderCode} đã xử lý` })

  } catch (err) {
    console.error('[sepay-webhook]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
