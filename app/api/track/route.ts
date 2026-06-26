import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(req: Request) {
  try {
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
