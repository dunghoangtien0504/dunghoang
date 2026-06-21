import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { sendEmail } from '@/lib/resend'
import {
  getKhoa1EmailDay2,
  getKhoa1EmailDay3,
  getKhoa1EmailDay4,
  getKhoa1EmailDay5,
} from '@/lib/emails/khoa1-onboarding'

// Cron chạy mỗi ngày 8h sáng — gửi tiếp chuỗi onboarding Khóa 1
// Email 1 (welcome) đã được gửi ngay trong webhook → current_day = 1 khi tạo
// Cron xử lý email 2-5 dựa trên số ngày đã qua kể từ started_at

const SCHEDULE = [
  { atDay: 1, currentDayRequired: 1, fn: getKhoa1EmailDay2 },
  { atDay: 3, currentDayRequired: 2, fn: getKhoa1EmailDay3 },
  { atDay: 5, currentDayRequired: 3, fn: getKhoa1EmailDay4 },
  { atDay: 7, currentDayRequired: 4, fn: getKhoa1EmailDay5 },
] as const

export async function GET(req: NextRequest) {
  const secret = req.headers.get('x-cron-secret') ?? req.nextUrl.searchParams.get('secret')
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const now = new Date()

  const { data: sequences, error } = await supabaseAdmin
    .from('email_sequences')
    .select('id, subscriber_id, current_day, started_at, subscribers(email, name)')
    .eq('sequence_name', 'khoa1_onboarding')
    .eq('status', 'active')
    .lt('current_day', 5)
    .limit(200)

  if (error) {
    console.error('[cron/send-khoa1]', error)
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }

  if (!sequences?.length) {
    return NextResponse.json({ sent: 0, message: 'Không có email cần gửi' })
  }

  let sent = 0, failed = 0

  for (const seq of sequences) {
    const sub = (Array.isArray(seq.subscribers) ? seq.subscribers[0] : seq.subscribers) as { email: string; name: string } | null
    if (!sub?.email) continue

    const daysSince = Math.floor((now.getTime() - new Date(seq.started_at).getTime()) / 86400000)
    const step = SCHEDULE.find(s => s.currentDayRequired === seq.current_day && daysSince >= s.atDay)
    if (!step) continue

    const name = sub.name || sub.email.split('@')[0]
    const emailContent = step.fn(name)

    try {
      const { data: resendData, error: mailError } = await sendEmail({
        to:      sub.email,
        subject: emailContent.subject,
        html:    emailContent.html,
      })

      if (mailError) {
        console.error(`[cron/khoa1] ${sub.email} step ${step.currentDayRequired}:`, mailError)
        failed++
        continue
      }

      const nextDay = step.currentDayRequired + 1
      const isLast  = nextDay >= 5

      await supabaseAdmin
        .from('email_sequences')
        .update({
          current_day:  nextDay,
          last_sent_at: now.toISOString(),
          ...(isLast ? { status: 'completed', completed_at: now.toISOString() } : {}),
        })
        .eq('id', seq.id)

      await supabaseAdmin.from('email_logs').insert({
        subscriber_id: seq.subscriber_id,
        sequence_name: 'khoa1_onboarding',
        day:           step.atDay,
        subject:       emailContent.subject,
        resend_id:     (resendData as { id?: string } | null)?.id ?? null,
        sent_at:       now.toISOString(),
      })

      sent++
      console.log(`[cron/khoa1] Day ${step.atDay} → ${sub.email}`)
    } catch (e) {
      console.error(`[cron/khoa1] lỗi ${sub.email}:`, e)
      failed++
    }
  }

  return NextResponse.json({ sent, failed, total: sequences.length })
}
