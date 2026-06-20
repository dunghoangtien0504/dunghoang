import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { sendEmail } from '@/lib/resend'
import { getEmailDay1 } from '@/lib/emails/challenge-7-ngay'

export async function POST(req: NextRequest) {
  try {
    const { email, name, phone, utm_source, utm_medium, utm_campaign, ref_code } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Email không hợp lệ' }, { status: 400 })
    }

    // 1. Lưu subscriber (upsert — nếu email đã có thì cập nhật)
    const { data: subscriber, error: subError } = await supabaseAdmin
      .from('subscribers')
      .upsert(
        { email, name, phone, utm_source, utm_medium, utm_campaign, ref_code, tags: ['challenge_7ngay'] },
        { onConflict: 'email', ignoreDuplicates: false }
      )
      .select('id')
      .single()

    if (subError) throw subError

    // 2. Tạo email sequence cho 7 ngày thử thách
    await supabaseAdmin
      .from('email_sequences')
      .upsert(
        {
          subscriber_id: subscriber.id,
          sequence_name: 'challenge_7ngay',
          current_day: 1,
          status: 'active',
          started_at: new Date().toISOString(),
          last_sent_at: new Date().toISOString(),
        },
        { onConflict: 'subscriber_id,sequence_name', ignoreDuplicates: true }
      )

    // 3. Gửi Email Ngày 1 ngay lập tức
    const email1 = getEmailDay1(name || email.split('@')[0])
    const { data: sent } = await sendEmail({ to: email, subject: email1.subject, html: email1.html })

    // 4. Log email đã gửi
    await supabaseAdmin.from('email_logs').insert({
      subscriber_id: subscriber.id,
      sequence_name: 'challenge_7ngay',
      day: 1,
      subject: email1.subject,
      resend_id: sent?.id,
    })

    return NextResponse.json({ success: true, message: 'Đăng ký thành công! Kiểm tra email ngay.' })
  } catch (err) {
    console.error('[subscribe]', err)
    return NextResponse.json({ error: 'Có lỗi xảy ra, thử lại sau.' }, { status: 500 })
  }
}
