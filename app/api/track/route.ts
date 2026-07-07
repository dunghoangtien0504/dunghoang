import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { rateLimit, clientIp } from '@/lib/rate-limit'

export async function POST(req: Request) {
  try {
    // Chống bơm page_views: 60 lượt / phút / IP (thoải mái cho người duyệt thật)
    const rl = rateLimit(`track:${clientIp(req)}`, 60, 60_000)
    if (!rl.ok) {
      return NextResponse.json({ ok: false }, { status: 429 })
    }

    const body = await req.json()
    const { path, referrer, device, sessionId } = body ?? {}

    if (!path || typeof path !== 'string') {
      return NextResponse.json({ ok: false }, { status: 400 })
    }

    // Không track admin pages
    if (path.startsWith('/admin') || path.startsWith('/api')) {
      return NextResponse.json({ ok: true })
    }

    const ua = req.headers.get('user-agent') ?? null

    await supabaseAdmin.from('page_views').insert({
      path,
      referrer: referrer || null,
      user_agent: ua,
      device: device || null,
      session_id: sessionId || null,
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
