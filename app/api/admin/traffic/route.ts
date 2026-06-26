import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET(req: NextRequest) {
  try {
    const sp = req.nextUrl.searchParams
    const from = sp.get('from')
    const to = sp.get('to')
    const group = sp.get('group') || 'day' // hour | day | week | month

    if (!from || !to) {
      return NextResponse.json({ error: 'Missing from/to' }, { status: 400 })
    }

    // 1. Raw page_views in range
    const { data: rows, error } = await supabaseAdmin
      .from('page_views')
      .select('path, device, session_id, created_at')
      .gte('created_at', from)
      .lte('created_at', to)
      .order('created_at', { ascending: true })

    if (error) throw error
    const views = rows ?? []

    // 2. Aggregate into time buckets
    const buckets = new Map<string, { views: number; sessions: Set<string> }>()

    for (const v of views) {
      const d = new Date(v.created_at)
      let key: string
      switch (group) {
        case 'hour':
          key = `${d.getFullYear()}-${p2(d.getMonth() + 1)}-${p2(d.getDate())} ${p2(d.getHours())}:00`
          break
        case 'week': {
          const mon = new Date(d)
          mon.setDate(d.getDate() - ((d.getDay() + 6) % 7))
          key = `W ${p2(mon.getDate())}/${p2(mon.getMonth() + 1)}`
          break
        }
        case 'month':
          key = `${d.getFullYear()}-${p2(d.getMonth() + 1)}`
          break
        default: // day
          key = `${p2(d.getDate())}/${p2(d.getMonth() + 1)}`
      }

      if (!buckets.has(key)) buckets.set(key, { views: 0, sessions: new Set() })
      const b = buckets.get(key)!
      b.views++
      if (v.session_id) b.sessions.add(v.session_id)
    }

    const timeline = Array.from(buckets.entries()).map(([label, b]) => ({
      label,
      views: b.views,
      unique: b.sessions.size,
    }))

    // 3. Top pages
    const pageCounts = new Map<string, number>()
    for (const v of views) {
      pageCounts.set(v.path, (pageCounts.get(v.path) || 0) + 1)
    }
    const topPages = Array.from(pageCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([path, count]) => ({ path, count }))

    // 4. Device breakdown
    const deviceCounts: Record<string, number> = { mobile: 0, tablet: 0, desktop: 0 }
    for (const v of views) {
      const dev = v.device || 'desktop'
      deviceCounts[dev] = (deviceCounts[dev] || 0) + 1
    }

    // 5. Summary
    const uniqueSessions = new Set(views.map(v => v.session_id).filter(Boolean))

    return NextResponse.json({
      totalViews: views.length,
      uniqueVisitors: uniqueSessions.size,
      timeline,
      topPages,
      devices: deviceCounts,
    })
  } catch (err) {
    console.error('[admin/traffic]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

function p2(n: number) { return String(n).padStart(2, '0') }
