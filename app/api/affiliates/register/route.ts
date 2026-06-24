import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { sendEmail } from '@/lib/resend'

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dunghoang.com'

function genRefCode(name: string): string {
  const base = name
    .normalize('NFD').replace(/[̀-ͯ]/g, '') // bỏ dấu
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, 8)
  const year = new Date().getFullYear()
  return `${base}${year}`
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, note } = await req.json()
    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json({ error: 'Thiếu tên hoặc email' }, { status: 400 })
    }

    const cleanEmail = email.trim().toLowerCase()
    const cleanName  = name.trim()

    // Kiểm tra email đã đăng ký chưa
    const { data: existing } = await supabaseAdmin
      .from('affiliates')
      .select('ref_code, status')
      .eq('email', cleanEmail)
      .single()

    if (existing) {
      const dashUrl = `${SITE}/cong-tac-vien/bao-cao?code=${existing.ref_code}`
      return NextResponse.json({ ok: true, ref_code: existing.ref_code, dashboard_url: dashUrl, existing: true })
    }

    // Tạo ref_code duy nhất
    let refCode = genRefCode(cleanName)
    const { data: taken } = await supabaseAdmin
      .from('affiliates').select('ref_code').eq('ref_code', refCode).single()
    if (taken) refCode = refCode + Math.floor(Math.random() * 90 + 10)

    // Tạo affiliate
    const { data: aff, error } = await supabaseAdmin
      .from('affiliates')
      .insert({
        name:            cleanName,
        email:           cleanEmail,
        ref_code:        refCode,
        commission_pct:  20,
        notes:           note ?? null,
      })
      .select('id, ref_code')
      .single()

    if (error || !aff) {
      console.error('[affiliate/register]', error)
      return NextResponse.json({ error: 'Không tạo được tài khoản' }, { status: 500 })
    }

    const dashUrl = `${SITE}/cong-tac-vien/bao-cao?code=${aff.ref_code}`

    // Gửi email chào mừng kèm link dashboard
    await sendEmail({
      to:      cleanEmail,
      subject: `Mã CTV của bạn: ${aff.ref_code} — DungHoang.com`,
      html: `
        <div style="font-family:-apple-system,sans-serif;max-width:540px;margin:0 auto;color:#0D2B1A;background:#F6F0E4;padding:32px 16px;">
          <div style="background:#0D2B1A;border-radius:16px;padding:20px 24px;margin-bottom:24px;">
            <span style="color:#F6F0E4;font-weight:900;font-size:14px;font-family:monospace;">DH · Cộng Tác Viên</span>
          </div>
          <div style="background:#fff;border-radius:16px;padding:28px;border:1px solid #DDD8CB;">
            <p style="margin:0 0 12px;">Chào ${cleanName},</p>
            <p style="margin:0 0 16px;">Mình đã tạo tài khoản cộng tác viên cho bạn rồi. Đây là thông tin của bạn:</p>

            <div style="background:#EAF5EF;border-radius:12px;padding:16px 20px;margin:0 0 20px;">
              <p style="margin:0 0 4px;font-size:13px;color:#3D6B4A;">Mã giới thiệu của bạn</p>
              <p style="margin:0;font-size:28px;font-weight:900;font-family:monospace;color:#0D2B1A;letter-spacing:2px;">${aff.ref_code}</p>
            </div>

            <p style="margin:0 0 8px;font-size:14px;color:#3D6B4A;"><strong>Link giới thiệu:</strong></p>
            <p style="margin:0 0 20px;font-size:13px;background:#FAF7F2;border:1px solid #DDD8CB;border-radius:8px;padding:10px 12px;word-break:break-all;font-family:monospace;">
              ${SITE}/24-ai-agent?ref=${aff.ref_code}
            </p>

            <p style="margin:0 0 8px;font-size:14px;"><strong>Hoa hồng:</strong></p>
            <ul style="margin:0 0 20px;padding-left:20px;color:#3D6B4A;font-size:14px;">
              <li style="margin-bottom:4px;">Mini 686.868đ → 20% = <strong>137.374đ</strong>/đơn</li>
              <li style="margin-bottom:4px;">Khóa 1 868.686đ → 20% = <strong>173.737đ</strong>/đơn</li>
              <li style="margin-bottom:4px;">Khóa 2 3.868.686đ → 10% = <strong>386.869đ</strong>/đơn</li>
            </ul>

            <div style="text-align:center;margin:24px 0;">
              <a href="${dashUrl}" style="display:inline-block;background:#0D2B1A;color:#F6F0E4;font-weight:700;padding:14px 32px;border-radius:12px;text-decoration:none;font-size:15px;">
                Xem báo cáo của bạn →
              </a>
            </div>

            <p style="margin:0;font-size:13px;color:#7A8C7E;">Câu hỏi gì nhắn mình qua <a href="https://t.me/KentHoang" style="color:#3D6B4A;">@KentHoang</a></p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ ok: true, ref_code: aff.ref_code, dashboard_url: dashUrl })

  } catch (err) {
    console.error('[affiliate/register]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
