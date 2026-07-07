import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

// GET /api/admin/email/subscribers/export — tải toàn bộ (hoặc theo tìm kiếm) subscribers dạng CSV
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search')?.trim() ?? ''

    let query = supabaseAdmin
      .from('subscribers')
      .select('email, name, source, tags, created_at')
      .order('created_at', { ascending: false })

    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`)
    }

    const { data, error } = await query
    if (error) throw error

    const rows = data ?? []
    const header = ['Email', 'Ten', 'Nguon', 'Tags', 'Ngay tao']
    const csvLines = [
      header.join(','),
      ...rows.map(r => [
        csvEscape(r.email),
        csvEscape(r.name ?? ''),
        csvEscape(r.source ?? ''),
        csvEscape((r.tags ?? []).join('; ')),
        csvEscape(new Date(r.created_at).toLocaleString('vi-VN')),
      ].join(',')),
    ]
    const csv = '﻿' + csvLines.join('\r\n') // BOM để Excel đọc đúng UTF-8

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="subscribers-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    })
  } catch (err) {
    console.error('[admin/email/subscribers/export GET]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

function csvEscape(value: string): string {
  if (/[",\r\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}
