import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

// GET /api/admin/email/subscribers — danh sách subscriber thật, phân trang + tìm kiếm
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const page     = Math.max(1, parseInt(searchParams.get('page') ?? '1'))
    const pageSize = Math.min(100, parseInt(searchParams.get('pageSize') ?? '20'))
    const search   = searchParams.get('search')?.trim() ?? ''
    const from     = (page - 1) * pageSize
    const to       = from + pageSize - 1

    let query = supabaseAdmin
      .from('subscribers')
      .select('id, email, name, source, tags, created_at', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to)

    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`)
    }

    const { data, count, error } = await query
    if (error) throw error

    return NextResponse.json({ subscribers: data ?? [], total: count ?? 0 })
  } catch (err) {
    console.error('[admin/email/subscribers GET]', err)
    return NextResponse.json({ subscribers: [], total: 0 }, { status: 500 })
  }
}
