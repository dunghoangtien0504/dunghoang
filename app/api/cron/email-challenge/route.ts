import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { sendEmail } from '@/lib/resend'
import { getChallengeEmail } from '@/lib/emails/challenge-7-ngay'

// Chạy mỗi ngày lúc 8:00 sáng — gọi từ Vercel Cron hoặc cron job bên ngoài
// Bảo vệ bằng secret header để không ai gọi bừa được
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const now = new Date()
  // Lấy tất cả sequence đang active, đã gửi hơn 20 tiếng trước (để tránh gửi 2 lần)
  const cutoff = new Date(now.getTime() - 20 * 60 * 60 * 1000).toISOString()

  const { data: sequences, error } = await supabaseAdmin
    .from('email_sequences')
    .select(`
      id, subscriber_id, current_day,
      subscribers (email, name)
    `)
    .eq('sequence_name', 'challenge_7ngay')
    .eq('status', 'active')
    .lte('last_sent_at', cutoff)
    .lte('current_day', 7)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!sequences || sequences.length === 0) {
    return NextResponse.json({ message: 'Không có email nào cần gửi', count: 0 })
  }

  let sent = 0, failed = 0

  for (const seq of sequences) {
    const sub = (Array.isArray(seq.subscribers) ? seq.subscribers[0] : seq.subscribers) as { email: string; name: string } | null
    if (!sub?.email) continue

    const nextDay = seq.current_day + 1
    if (nextDay > 7) {
      // Hoàn thành chuỗi 7 ngày
      await supabaseAdmin
        .from('email_sequences')
        .update({ status: 'completed', completed_at: now.toISOString() })
        .eq('id', seq.id)

      // Chuyển sang chuỗi follow-up cho người chưa mua
      await supabaseAdmin.from('email_sequences').upsert({
        subscriber_id: seq.subscriber_id,
        sequence_name: 'followup_cold',
        current_day: 1,
        status: 'active',
        started_at: now.toISOString(),
        last_sent_at: now.toISOString(),
      }, { onConflict: 'subscriber_id,sequence_name', ignoreDuplicates: true })
      continue
    }

    try {
      const emailContent = getChallengeEmail(nextDay, sub.name || sub.email.split('@')[0])
      const { data: result } = await sendEmail({ to: sub.email, subject: emailContent.subject, html: emailContent.html })

      await Promise.all([
        supabaseAdmin.from('email_sequences').update({
          current_day: nextDay,
          last_sent_at: now.toISOString(),
        }).eq('id', seq.id),

        supabaseAdmin.from('email_logs').insert({
          subscriber_id: seq.subscriber_id,
          sequence_name: 'challenge_7ngay',
          day: nextDay,
          subject: emailContent.subject,
          resend_id: result?.id,
          sent_at: now.toISOString(),
        }),
      ])
      sent++
    } catch (e) {
      console.error(`[cron] Failed to send day ${nextDay} to ${sub.email}`, e)
      failed++
    }
  }

  return NextResponse.json({ success: true, sent, failed, total: sequences.length })
}
