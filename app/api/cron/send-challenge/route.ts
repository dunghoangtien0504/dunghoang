import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { sendEmail } from '@/lib/resend'
import { getChallengeEmail } from '@/lib/emails/challenge'

// Cron job chạy mỗi ngày lúc 8:00 sáng (cấu hình trong vercel.json)
// Tìm các sequence đang active, đã qua 23h kể từ lần gửi cuối → gửi email ngày tiếp theo

export async function GET(req: NextRequest) {
  // Bảo vệ endpoint — chỉ Vercel Cron hoặc cron secret mới gọi được
  const secret = req.headers.get('x-cron-secret') ?? req.nextUrl.searchParams.get('secret')
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const now = new Date()
  // Lấy tất cả sequence đang active, current_day < 7, last_sent_at hơn 23h trước
  const cutoff = new Date(now.getTime() - 23 * 60 * 60 * 1000).toISOString()

  const { data: sequences, error } = await supabaseAdmin
    .from('email_sequences')
    .select(`
      id,
      subscriber_id,
      current_day,
      last_sent_at,
      subscribers ( email, name )
    `)
    .eq('sequence_name', 'challenge_7ngay')
    .eq('status', 'active')
    .lt('current_day', 8)
    .lt('last_sent_at', cutoff)
    .limit(100)

  if (error) {
    console.error('[cron/send-challenge]', error)
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }

  if (!sequences || sequences.length === 0) {
    return NextResponse.json({ sent: 0, message: 'Không có email cần gửi' })
  }

  let sent = 0
  let failed = 0

  for (const seq of sequences) {
    const rawSub = seq.subscribers
    const sub = (Array.isArray(rawSub) ? rawSub[0] : rawSub) as { email: string; name: string } | null
    if (!sub?.email) continue

    const nextDay = (seq.current_day ?? 1) + 1
    if (nextDay > 7) {
      // Hoàn thành chuỗi
      await supabaseAdmin
        .from('email_sequences')
        .update({ status: 'completed', completed_at: now.toISOString() })
        .eq('id', seq.id)
      continue
    }

    const emailContent = getChallengeEmail(nextDay, sub.name ?? 'bạn')
    if (!emailContent) continue

    try {
      const { data: resendData, error: mailError } = await sendEmail({
        to:      sub.email,
        subject: emailContent.subject,
        html:    emailContent.html,
      })

      if (mailError) {
        console.error(`[cron] ${sub.email} ngày ${nextDay}:`, mailError)
        failed++
        continue
      }

      // Cập nhật sequence
      await supabaseAdmin
        .from('email_sequences')
        .update({
          current_day:  nextDay,
          last_sent_at: now.toISOString(),
          ...(nextDay === 7 ? { status: 'completed', completed_at: now.toISOString() } : {}),
        })
        .eq('id', seq.id)

      // Ghi log
      await supabaseAdmin.from('email_logs').insert({
        subscriber_id: seq.subscriber_id,
        sequence_name: 'challenge_7ngay',
        day:           nextDay,
        subject:       emailContent.subject,
        resend_id:     (resendData as { id?: string } | null)?.id ?? null,
        sent_at:       now.toISOString(),
      })

      sent++
      console.log(`[cron] Gửi ngày ${nextDay} cho ${sub.email}`)

    } catch (e) {
      console.error(`[cron] lỗi gửi ${sub.email}:`, e)
      failed++
    }
  }

  return NextResponse.json({
    sent,
    failed,
    total: sequences.length,
    message: `Gửi xong ${sent}/${sequences.length} email`,
  })
}
