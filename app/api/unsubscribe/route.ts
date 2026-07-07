import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { escapeHtml } from '@/lib/sanitize'

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email')

  if (!email) {
    return new NextResponse(html('Thiếu thông tin', 'Không tìm thấy địa chỉ email trong yêu cầu.'), {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  }

  const cleanEmail = decodeURIComponent(email).toLowerCase().trim()

  const { data: subRow, error } = await supabaseAdmin
    .from('subscribers')
    .select('id')
    .eq('email', cleanEmail)
    .maybeSingle()

  if (error) {
    console.error('[unsubscribe]', error)
  }

  if (subRow?.id) {
    await supabaseAdmin.rpc('append_tag', { subscriber_id: subRow.id, tag: 'unsubscribed' })

    await supabaseAdmin
      .from('email_sequences')
      .update({ status: 'unsubscribed' })
      .eq('subscriber_id', subRow.id)
      .eq('status', 'active')
  }

  return new NextResponse(
    html(
      'Đã hủy đăng ký',
      `Email <strong>${escapeHtml(cleanEmail)}</strong> đã được xóa khỏi danh sách. Bạn sẽ không nhận thêm email từ mình nữa.`
    ),
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  )
}

function html(title: string, message: string): string {
  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} — DungHoang.com</title>
</head>
<body style="margin:0;padding:0;background:#F6F0E4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:480px;margin:80px auto;padding:0 16px;text-align:center;">
    <div style="background:#0D2B1A;width:48px;height:48px;border-radius:12px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:24px;">
      <span style="color:#F6F0E4;font-weight:900;font-size:16px;font-family:monospace;">DH</span>
    </div>
    <h1 style="font-size:22px;font-weight:700;color:#0D2B1A;margin:0 0 12px;">${title}</h1>
    <p style="color:#3D6B4A;line-height:1.6;margin:0 0 24px;">${message}</p>
    <a href="https://dunghoang.com" style="color:#7A8C7E;font-size:14px;text-decoration:none;">← Về trang chủ</a>
  </div>
</body>
</html>`
}
