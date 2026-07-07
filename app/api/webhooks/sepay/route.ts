import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { sendEmail } from '@/lib/resend'
import { getWelcomeEmail } from '@/lib/emails/welcome'
import { getKhoa1EmailDay1 } from '@/lib/emails/khoa1-onboarding'
import { formatVND } from '@/lib/products'
import { getLandingEmailDay1 } from '@/lib/emails/landing-onboarding'
import { getMetaAIAgentWelcome } from '@/lib/emails/meta-ai-agent-welcome'

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

    // Tìm mã đơn hàng trong nội dung chuyển khoản
    // Prefix khớp với codePrefix trong lib/products.ts: DH-CT, DH-MINI, DH-K1, DH-K2
    const orderCodeMatch = content?.match(/DH-(?:CT|MINI|K1|K2|LP|MBA|HDCV)-[A-Z0-9]+/i)
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

      const teleMessage = `⚠️ <b>GIAO DỊCH LẠ (MÃ ĐƠN KHÔNG KHỚP DATABASE)</b>\n` +
        `- Mã đơn nhận được: <code>${orderCode}</code>\n` +
        `- Nội dung chuyển khoản: <code>${content}</code>\n` +
        `- Số tiền nhận: <b>${formatVND(transferAmount)}</b>\n` +
        `- Mã giao dịch Sepay: <code>${referenceCode || sepayId}</code>`
      await sendTelegramAlert(teleMessage)

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
            <p>Hoặc liên hệ mình qua Telegram <a href="https://t.me/KentHoang">@KentHoang</a> để được hỗ trợ nhanh hơn nhé.</p>
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
      const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 })
      let userId = existingUsers?.users.find(u => u.email === email)?.id

      if (!userId) {
        const { data: newUser } = await supabaseAdmin.auth.admin.createUser({
          email,
          email_confirm: true,
          user_metadata: { name },
        })
        userId = newUser?.user?.id
      }

      // Khóa học thường: ghi enrollment bình thường
      if (userId && order.course_id) {
        await supabaseAdmin.from('enrollments').upsert({
          user_id:     userId,
          course_id:   order.course_id,
          enrolled_at: new Date().toISOString(),
        }, { onConflict: 'user_id,course_id' })

        // Hội Đồng Cố Vấn bao gồm trọn bộ Khóa 1 → mở khóa cả 24 agent
        if (order.course_id === 'hoi-dong-co-van') {
          await supabaseAdmin.from('enrollments').upsert({
            user_id:     userId,
            course_id:   'khoa-1',
            enrolled_at: new Date().toISOString(),
          }, { onConflict: 'user_id,course_id' })
        }
      }

      // Guest checkout: tạo link 1 chạm vào khu học. Khách mua không cần
      // tài khoản trước; link recovery cho họ đặt mật khẩu lần đầu rồi vào thẳng.
      // Bọc try/catch để không bao giờ làm hỏng xác nhận thanh toán.
      const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dunghoang.com'
      let accessUrl: string | undefined
      try {
        const { data: linkData } = await supabaseAdmin.auth.admin.generateLink({
          type:    'recovery',
          email,
          options: { redirectTo: `${SITE_URL}/portal/dat-lai-mat-khau` },
        })
        accessUrl = linkData?.properties?.action_link ?? undefined
      } catch (e) {
        console.error('[sepay] generateLink lỗi:', e)
      }

      if (order.course_id === 'meta-ai-agent') {
        const welcome = getMetaAIAgentWelcome(name, accessUrl)
        await sendEmail({ to: email, subject: welcome.subject, html: welcome.html })
      } else if (order.course_id === 'landing-page') {
        const welcome = getLandingEmailDay1(name, accessUrl)
        await sendEmail({ to: email, subject: welcome.subject, html: welcome.html })
      } else if (order.course_id === 'khoa-1' || order.course_id === 'khoa1_686') {
        // Khóa 1 → dùng email onboarding riêng + khởi động chuỗi chăm sóc
        const welcome = getKhoa1EmailDay1(name, accessUrl)
        await sendEmail({ to: email, subject: welcome.subject, html: welcome.html })

        // Đảm bảo subscriber tồn tại để gắn vào email_sequences
        const { data: subRow } = await supabaseAdmin
          .from('subscribers')
          .upsert({ email: email.toLowerCase(), name }, { onConflict: 'email' })
          .select('id')
          .single()

        const subscriberId = subRow?.id ?? order.subscriber_id
        if (subscriberId) {
          const enrolledAt = new Date().toISOString()
          await supabaseAdmin.from('email_sequences').insert({
            subscriber_id:  subscriberId,
            sequence_name:  'khoa1_onboarding',
            current_day:    1,           // Email 1 đã gửi ngay → cron xử lý email 2-5
            status:         'active',
            started_at:     enrolledAt,
            last_sent_at:   enrolledAt,
          })
        }
      } else {
        // Các khóa khác: email welcome chung
        const welcome = getWelcomeEmail(name, order.course_id, order.course_name, accessUrl)
        await sendEmail({ to: email, subject: welcome.subject, html: welcome.html })
      }

      // Chuỗi chăm sóc chéo "cross_sell_nurture" — chạy cho MỌI khách hàng,
      // bất kể mua khóa nào. Đảm bảo subscriber tồn tại rồi khởi động chuỗi
      // nếu chưa có (khách mua khóa thứ 2 trở đi không bị tạo trùng chuỗi).
      const { data: nurtureSubRow } = await supabaseAdmin
        .from('subscribers')
        .upsert({ email: email.toLowerCase(), name }, { onConflict: 'email' })
        .select('id')
        .single()

      const nurtureSubscriberId = nurtureSubRow?.id ?? order.subscriber_id
      if (nurtureSubscriberId) {
        const { data: existingNurture } = await supabaseAdmin
          .from('email_sequences')
          .select('id')
          .eq('subscriber_id', nurtureSubscriberId)
          .eq('sequence_name', 'cross_sell_nurture')
          .eq('status', 'active')
          .maybeSingle()

        if (!existingNurture) {
          const enrolledAt = new Date().toISOString()
          await supabaseAdmin.from('email_sequences').insert({
            subscriber_id: nurtureSubscriberId,
            sequence_name: 'cross_sell_nurture',
            current_day:   0,           // Email đầu tiên của chuỗi bắn sau 2 ngày qua cron
            status:        'active',
            started_at:    enrolledAt,
            last_sent_at:  enrolledAt,
          })
        }
      }

      // Tag subscriber "đã mua"
      if (order.subscriber_id) {
        const tag = `da_mua_${order.course_id}`
        await supabaseAdmin.rpc('append_tag', { subscriber_id: order.subscriber_id, tag })
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

    // Upsert contact — tạo mới nếu chưa có, upgrade stage nếu là Hội viên
    if (email && email !== 'unknown@sepay.vn') {
      const newStage = order.course_id === 'hoi-dong-co-van' ? 'Hội viên' : 'Khách hàng'
      await supabaseAdmin.from('contacts').upsert(
        {
          email,
          name,
          stage:                newStage,
          interested_course_id: order.course_id,
          updated_at:           new Date().toISOString(),
        },
        { onConflict: 'email' }
      )
      // Nếu đã là Hội viên, không hạ xuống — chỉ update nếu stage cũ không cao hơn
      if (newStage !== 'Hội viên') {
        await supabaseAdmin
          .from('contacts')
          .update({ stage: newStage, updated_at: new Date().toISOString() })
          .eq('email', email)
          .in('stage', ['KH Tiềm năng', 'Người mua hàng'])
      }
    }

    console.log(`[sepay] ${orderCode} (${order.course_name}) — kích hoạt cho ${email}`)

    // Gửi Telegram báo thành công
    const teleMessage = `🔔 <b>ĐƠN HÀNG THÀNH CÔNG!</b>\n` +
      `- Mã đơn: <code>${orderCode}</code>\n` +
      `- Khách hàng: <b>${name}</b> (${email})\n` +
      `- Khóa học: <b>${order.course_name}</b>\n` +
      `- Số tiền nhận: <b>${formatVND(received)}</b>\n` +
      `- Mã giao dịch Sepay: <code>${referenceCode || sepayId}</code>`
    await sendTelegramAlert(teleMessage)

    return NextResponse.json({ success: true, message: `Đơn ${orderCode} đã xử lý` })

  } catch (err) {
    console.error('[sepay-webhook]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

async function sendTelegramAlert(message: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    })
  } catch (err) {
    console.error('[telegram-alert-error]', err)
  }
}
