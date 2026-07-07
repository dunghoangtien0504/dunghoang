import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

// GET /api/admin/email — thống kê thật cho trang Email Marketing (admin/email)
// Toàn bộ số liệu lấy trực tiếp từ subscribers / email_sequences / email_logs,
// không có dữ liệu giả nào ở đây.
export async function GET() {
  try {
    const [{ data: subscribers }, { data: sequences }, { data: recentLogs }, { count: totalLogs }] =
      await Promise.all([
        supabaseAdmin.from('subscribers').select('id, tags'),
        supabaseAdmin.from('email_sequences').select('id, sequence_name, status, current_day'),
        supabaseAdmin
          .from('email_logs')
          .select('id, subject, sequence_name, day, sent_at, subscribers(email, name)')
          .order('sent_at', { ascending: false })
          .limit(30),
        supabaseAdmin.from('email_logs').select('id', { count: 'exact', head: true }),
      ])

    const totalSubscribers = subscribers?.length ?? 0
    const unsubscribedCount = (subscribers ?? []).filter(s => s.tags?.includes('unsubscribed')).length
    const activeSubscribers = totalSubscribers - unsubscribedCount

    // Gom theo sequence_name → { active, completed, unsubscribed, paused }
    const bySequence: Record<string, { active: number; completed: number; unsubscribed: number; paused: number; total: number }> = {}
    for (const seq of sequences ?? []) {
      const key = seq.sequence_name
      if (!bySequence[key]) bySequence[key] = { active: 0, completed: 0, unsubscribed: 0, paused: 0, total: 0 }
      bySequence[key].total++
      if (seq.status === 'active') bySequence[key].active++
      else if (seq.status === 'completed') bySequence[key].completed++
      else if (seq.status === 'unsubscribed') bySequence[key].unsubscribed++
      else if (seq.status === 'paused') bySequence[key].paused++
    }

    const activeAutomations = Object.keys(bySequence).filter(k => bySequence[k].active > 0).length

    return NextResponse.json({
      totalSubscribers,
      activeSubscribers,
      unsubscribedCount,
      totalEmailsSent: totalLogs ?? 0,
      activeAutomations,
      bySequence,
      recentLogs: (recentLogs ?? []).map(l => ({
        id: l.id,
        subject: l.subject,
        sequence_name: l.sequence_name,
        day: l.day,
        sent_at: l.sent_at,
        subscriber: Array.isArray(l.subscribers) ? l.subscribers[0] : l.subscribers,
      })),
    })
  } catch (err) {
    console.error('[admin/email GET]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
