import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { sendEmail } from '@/lib/resend'
import { getNurtureEmail } from '@/lib/emails/nurture-sequence'

// Cron chạy hằng ngày — xử lý chuỗi chăm sóc chéo "cross_sell_nurture"
// Nhịp: 2 ngày/email, lặp vô thời hạn (không đánh dấu completed).
// Chu kỳ 5 email: 4 giá trị → 1 bán hàng gợi ý đúng khóa tiếp theo khách chưa có.
const INTERVAL_DAYS = 2

export async function GET(req: NextRequest) {
  const secret = req.headers.get('x-cron-secret') ?? req.nextUrl.searchParams.get('secret')
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const now = new Date()

  const { data: sequences, error } = await supabaseAdmin
    .from('email_sequences')
    .select('id, subscriber_id, current_day, last_sent_at, subscribers(email, name, tags)')
    .eq('sequence_name', 'cross_sell_nurture')
    .eq('status', 'active')
    .limit(500)

  if (error) {
    console.error('[cron/send-nurture]', error)
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }

  if (!sequences?.length) {
    return NextResponse.json({ sent: 0, message: 'Không có subscriber nào trong chuỗi' })
  }

  let sent = 0, skipped = 0, failed = 0

  for (const seq of sequences) {
    const sub = (Array.isArray(seq.subscribers) ? seq.subscribers[0] : seq.subscribers) as
      { email: string; name: string; tags: string[] | null } | null
    if (!sub?.email) { skipped++; continue }

    // Khách đã unsubscribe qua link ở footer email → dừng hẳn
    if (sub.tags?.includes('unsubscribed')) { skipped++; continue }

    const daysSince = Math.floor((now.getTime() - new Date(seq.last_sent_at).getTime()) / 86400000)
    if (daysSince < INTERVAL_DAYS) { skipped++; continue }

    try {
      // Tìm các khóa khách đã sở hữu (đơn completed) để chọn đúng khóa gợi ý tiếp theo
      const { data: owned } = await supabaseAdmin
        .from('orders')
        .select('course_id')
        .eq('email', sub.email)
        .eq('status', 'completed')

      const ownedCourseIds = (owned ?? []).map(o => o.course_id).filter(Boolean) as string[]
      const name = sub.name || sub.email.split('@')[0]
      const emailContent = getNurtureEmail(seq.current_day, name, sub.email, ownedCourseIds)

      const { data: resendData, error: mailError } = await sendEmail({
        to:      sub.email,
        subject: emailContent.subject,
        html:    emailContent.html,
      })

      if (mailError) {
        console.error(`[cron/nurture] ${sub.email}:`, mailError)
        failed++
        continue
      }

      await supabaseAdmin
        .from('email_sequences')
        .update({ current_day: seq.current_day + 1, last_sent_at: now.toISOString() })
        .eq('id', seq.id)

      await supabaseAdmin.from('email_logs').insert({
        subscriber_id: seq.subscriber_id,
        sequence_name: 'cross_sell_nurture',
        day:           seq.current_day,
        subject:       emailContent.subject,
        resend_id:     (resendData as { id?: string } | null)?.id ?? null,
        sent_at:       now.toISOString(),
      })

      sent++
      console.log(`[cron/nurture] slot ${seq.current_day % 5} → ${sub.email}`)
    } catch (e) {
      console.error(`[cron/nurture] lỗi ${sub.email}:`, e)
      failed++
    }
  }

  return NextResponse.json({ sent, skipped, failed, total: sequences.length })
}
