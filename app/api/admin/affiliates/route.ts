import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET() {
  try {
    const { data: affiliates, error } = await supabaseAdmin
      .from('affiliates')
      .select('*')
      .order('joined_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ affiliates: affiliates ?? [] })
  } catch (err) {
    console.error('[admin/affiliates]', err)
    return NextResponse.json({ affiliates: [] })
  }
}
