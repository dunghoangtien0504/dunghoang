import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { createAffiliateToken } from '@/lib/affiliate-token'

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dunghoang.com'

export async function GET() {
  try {
    const { data: affiliates, error } = await supabaseAdmin
      .from('affiliates')
      .select('*')
      .order('joined_at', { ascending: false })

    if (error) throw error

    // Gắn link dashboard có token (chữ ký) cho từng CTV — admin copy gửi lại cho CTV cũ
    const withLinks = await Promise.all(
      (affiliates ?? []).map(async (a) => ({
        ...a,
        dashboard_url: `${SITE}/cong-tac-vien/bao-cao?token=${await createAffiliateToken(a.ref_code)}`,
      }))
    )

    return NextResponse.json({ affiliates: withLinks })
  } catch (err) {
    console.error('[admin/affiliates]', err)
    return NextResponse.json({ affiliates: [] })
  }
}
