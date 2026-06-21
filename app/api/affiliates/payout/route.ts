import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { sendEmail } from '@/lib/resend'

const TAX_THRESHOLD = 2_000_000
const TAX_RATE      = 0.10
const MIN_PAYOUT    = 500_000

export async function POST(req: NextRequest) {
  try {
    const { code, bank_account, bank_name } = await req.json()
    if (!code || !bank_account?.trim() || !bank_name?.trim()) {
      return NextResponse.json({ error: 'Thiếu thông tin' }, { status: 400 })
    }

    const { data: aff } = await supabaseAdmin
      .from('affiliates')
      .select('id, name, email, ref_code, pending_commission')
      .eq('ref_code', code.toUpperCase())
      .single()

    if (!aff) return NextResponse.json({ error: 'Không tìm thấy mã CTV' }, { status: 404 })

    const gross = aff.pending_commission ?? 0
    if (gross < MIN_PAYOUT) {
      return NextResponse.json({ error: `Cần tối thiểu ${MIN_PAYOUT.toLocaleString('vi-VN')}đ để rút. Hiện tại bạn có ${gross.toLocaleString('vi-VN')}đ.` }, { status: 400 })
    }

    const taxable = gross >= TAX_THRESHOLD
    const tax     = taxable ? Math.round(gross * TAX_RATE) : 0
    const net     = gross - tax

    const { data: payout, error } = await supabaseAdmin
      .from('affiliate_payouts')
      .insert({
        affiliate_id:  aff.id,
        ref_code:      aff.ref_code,
        gross_amount:  gross,
        tax_amount:    tax,
        net_amount:    net,
        taxable,
        bank_account:  bank_account.trim(),
        bank_name:     bank_name.trim(),
        status:        'pending',
      })
      .select('id')
      .single()

    if (error || !payout) {
      console.error('[affiliate/payout]', error)
      return NextResponse.json({ error: 'Không tạo được yêu cầu' }, { status: 500 })
    }

    // Gửi email xác nhận cho CTV
    await sendEmail({
      to:      aff.email,
      subject: `Yêu cầu rút tiền ${gross.toLocaleString('vi-VN')}đ đã gửi — DungHoang.com`,
      html: `
        <div style="font-family:-apple-system,sans-serif;max-width:540px;margin:0 auto;color:#0D2B1A;background:#F6F0E4;padding:32px 16px;">
          <div style="background:#0D2B1A;border-radius:16px;padding:20px 24px;margin-bottom:24px;">
            <span style="color:#F6F0E4;font-weight:900;font-size:14px;font-family:monospace;">DH · Cộng Tác Viên</span>
          </div>
          <div style="background:#fff;border-radius:16px;padding:28px;border:1px solid #DDD8CB;">
            <p style="margin:0 0 12px;">Chào ${aff.name},</p>
            <p style="margin:0 0 16px;">Mình nhận được yêu cầu rút tiền của bạn rồi. Chi tiết:</p>
            <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:20px;">
              <tr style="border-bottom:1px solid #EEE;"><td style="padding:8px 0;color:#7A8C7E;">Hoa hồng gộp</td><td style="padding:8px 0;text-align:right;font-weight:600;">${gross.toLocaleString('vi-VN')}đ</td></tr>
              ${taxable ? `<tr style="border-bottom:1px solid #EEE;"><td style="padding:8px 0;color:#7A8C7E;">Thuế TNCN 10%</td><td style="padding:8px 0;text-align:right;color:#C0390E;">-${tax.toLocaleString('vi-VN')}đ</td></tr>` : ''}
              <tr><td style="padding:8px 0;font-weight:700;">Thực nhận</td><td style="padding:8px 0;text-align:right;font-weight:700;font-size:16px;">${net.toLocaleString('vi-VN')}đ</td></tr>
            </table>
            <p style="margin:0 0 4px;font-size:13px;color:#7A8C7E;">Chuyển vào: <strong>${bank_name.trim()}</strong> — <strong>${bank_account.trim()}</strong></p>
            <p style="margin:16px 0 0;font-size:13px;color:#7A8C7E;">Mình sẽ xử lý trong 3-5 ngày làm việc. Câu hỏi gì nhắn <a href="https://t.me/KentHoang" style="color:#3D6B4A;">@KentHoang</a>.</p>
          </div>
        </div>
      `,
    })

    // Thông báo cho admin
    await sendEmail({
      to:      'dung@dunghoang.com',
      subject: `[CTV] ${aff.name} yêu cầu rút ${gross.toLocaleString('vi-VN')}đ`,
      html:    `<p>CTV: ${aff.name} (${aff.email})<br/>Mã: ${aff.ref_code}<br/>Gross: ${gross.toLocaleString('vi-VN')}đ → Net: ${net.toLocaleString('vi-VN')}đ${taxable ? ` (khấu trừ thuế ${tax.toLocaleString('vi-VN')}đ)` : ''}<br/>Bank: ${bank_name.trim()} — ${bank_account.trim()}</p>`,
    })

    return NextResponse.json({ ok: true, gross, net, tax, taxable })

  } catch (err) {
    console.error('[affiliate/payout]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
