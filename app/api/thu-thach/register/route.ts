import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json()
    if (!name || !email) {
      return NextResponse.json({ error: 'Thiếu thông tin' }, { status: 400 })
    }

    // TODO: Tích hợp Brevo — thêm subscriber vào list + tag "thuthach7ngay"
    // const brevoRes = await fetch('https://api.brevo.com/v3/contacts', {
    //   method: 'POST',
    //   headers: { 'api-key': process.env.BREVO_API_KEY!, 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     email,
    //     attributes: { FIRSTNAME: name },
    //     listIds: [BREVO_LIST_ID],
    //     tags: ['thuthach7ngay'],
    //   }),
    // })

    // TODO: Gửi email welcome + link Ngày 1 qua Resend hoặc để Brevo automation xử lý

    console.log(`[Thu Thach] New subscriber: ${name} <${email}>`)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
