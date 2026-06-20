import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { sendEmail } from '@/lib/resend'
import { getWelcomeEmail } from '@/lib/emails/welcome'

// Sepay gửi POST này mỗi khi có tiền vào tài khoản với mã DH-xxx
export async function POST(req: NextRequest) {
  try {
    // Xác thực API Key từ Sepay
    const apiKey = req.headers.get('authorization')?.replace('Apikey ', '')
    if (apiKey !== process.env.SEPAY_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()

    // Sepay payload: { id, gateway, transactionDate, accountNumber, subAccount,
    //   code, content, transferType, transferAmount, referenceCode, description }
    const { content, transferAmount, referenceCode, id: sepayId } = body

    // Tìm mã đơn hàng trong nội dung chuyển khoản (format: DH-368-001)
    const orderCodeMatch = content?.match(/DH[-\s]?\w+/i)
    if (!orderCodeMatch) {
      return NextResponse.json({ message: 'Không tìm thấy mã đơn hàng' }, { status: 200 })
    }

    const orderCode = orderCodeMatch[0].replace(/\s/g, '-').toUpperCase()

    // Tìm đơn hàng trong database
    const { data: order } = await supabaseAdmin
      .from('orders')
      .select('*, subscribers(email, name)')
      .eq('order_code', orderCode)
      .single()

    if (!order) {
      // Đơn chưa có trong DB — tạo mới từ thông tin Sepay
      // (trường hợp khách chuyển khoản thẳng không qua form)
      await supabaseAdmin.from('orders').insert({
        order_code: orderCode,
        amount: transferAmount,
        status: 'completed',
        sepay_ref: referenceCode || sepayId,
        paid_at: new Date().toISOString(),
      })
      return NextResponse.json({ message: 'Đơn hàng mới từ CK trực tiếp — đã lưu' })
    }

    // Cập nhật trạng thái đơn hàng thành completed
    await supabaseAdmin
      .from('orders')
      .update({ status: 'completed', paid_at: new Date().toISOString(), sepay_ref: referenceCode })
      .eq('order_code', orderCode)

    // Lấy thông tin subscriber
    const sub = order.subscribers as { email: string; name: string } | null
    const email = sub?.email || order.email
    const name  = sub?.name  || order.name || 'bạn'

    if (email) {
      // 1. Tạo hoặc lấy Supabase Auth user cho học viên
      const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers()
      let userId = existingUsers?.users.find(u => u.email === email)?.id

      if (!userId) {
        const { data: newUser } = await supabaseAdmin.auth.admin.createUser({
          email,
          email_confirm: true, // không cần verify email — đã mua rồi
          user_metadata: { name },
        })
        userId = newUser?.user?.id
      }

      // 2. Ghi enrollment — cho phép học viên vào khu học
      if (userId && order.course_id) {
        await supabaseAdmin.from('enrollments').upsert({
          user_id: userId,
          course_id: order.course_id,
          enrolled_at: new Date().toISOString(),
        }, { onConflict: 'user_id,course_id' })
      }

      // 3. Gửi email welcome + link magic login vào khu học
      const welcome = getWelcomeEmail(name, order.course_id, order.course_name)
      await sendEmail({ to: email, subject: welcome.subject, html: welcome.html })

      // 4. Tag subscriber "đã mua" + dừng chuỗi challenge
      if (sub && order.subscriber_id) {
        const tag = `da_mua_${order.course_id}`
        await supabaseAdmin.rpc('append_tag', { subscriber_id: order.subscriber_id, tag })

        await supabaseAdmin
          .from('email_sequences')
          .update({ status: 'paused' })
          .eq('subscriber_id', order.subscriber_id)
          .eq('sequence_name', 'challenge_7ngay')
      }
    }

    // Tính hoa hồng affiliate nếu có
    if (order.affiliate_code) {
      const commissionAmt = Math.round((transferAmount * (order.commission || 20)) / 100)
      await supabaseAdmin
        .from('affiliates')
        .update({
          total_referrals: supabaseAdmin.rpc('increment', { x: 1 }) as unknown as number,
          total_revenue: supabaseAdmin.rpc('increment', { x: transferAmount }) as unknown as number,
          pending_commission: supabaseAdmin.rpc('increment', { x: commissionAmt }) as unknown as number,
        })
        .eq('ref_code', order.affiliate_code)

      await supabaseAdmin
        .from('orders')
        .update({ commission: commissionAmt })
        .eq('order_code', orderCode)
    }

    return NextResponse.json({ success: true, message: `Đơn ${orderCode} đã xử lý` })
  } catch (err) {
    console.error('[sepay-webhook]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
