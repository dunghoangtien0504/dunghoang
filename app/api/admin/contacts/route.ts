import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export type DBContact = {
  id: string
  name: string | null
  email: string
  phone: string | null
  facebook_url: string | null
  source: string | null
  stage: string
  interested_course_id: string | null
  note: string | null
  lead_score: number
  last_contact_at: string | null
  created_at: string
  updated_at: string
}

// GET /api/admin/contacts
// Query params: page, pageSize, search, stage
// Returns: contacts[], total, byStage record
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const page     = Math.max(1, parseInt(searchParams.get('page') ?? '1'))
    const pageSize = Math.min(100, parseInt(searchParams.get('pageSize') ?? '20'))
    const search   = searchParams.get('search')?.trim() ?? ''
    const stage    = searchParams.get('stage') ?? ''
    const from     = (page - 1) * pageSize
    const to       = from + pageSize - 1

    // Stage counts (cheap — only fetches stage column)
    const { data: allStages } = await supabaseAdmin
      .from('contacts')
      .select('stage')

    const byStage: Record<string, number> = {}
    for (const c of allStages ?? []) {
      byStage[c.stage] = (byStage[c.stage] ?? 0) + 1
    }
    const total = allStages?.length ?? 0

    // Paginated contact list
    let query = supabaseAdmin
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })
      .range(from, to)

    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`)
    }
    if (stage && stage !== 'Tổng KH') {
      query = query.eq('stage', stage)
    }

    const { data, error } = await query
    if (error) throw error

    return NextResponse.json({ contacts: data ?? [], total, byStage })
  } catch (err) {
    console.error('[admin/contacts GET]', err)
    return NextResponse.json({ contacts: [], total: 0, byStage: {} }, { status: 500 })
  }
}

// POST /api/admin/contacts — tạo contact thủ công
export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, source, stage, interested_course_id, note } = await req.json()
    if (!email) return NextResponse.json({ error: 'Thiếu email' }, { status: 400 })

    const { data, error } = await supabaseAdmin
      .from('contacts')
      .insert({
        name:                 name || null,
        email:                email.toLowerCase().trim(),
        phone:                phone || null,
        source:               source || null,
        stage:                stage ?? 'KH Tiềm năng',
        interested_course_id: interested_course_id || null,
        note:                 note || null,
      })
      .select()
      .single()

    if (error) {
      if (error.code === '23505') return NextResponse.json({ error: 'Email đã tồn tại' }, { status: 409 })
      throw error
    }

    return NextResponse.json({ contact: data })
  } catch (err) {
    console.error('[admin/contacts POST]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
