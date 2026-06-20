import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { sendEmail } from '@/lib/resend'
import { getChallengeEmail } from '@/lib/emails/challenge'

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json()
    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json({ error: 'Thiếu thông tin' }, { status: 400 })
    }

    const cleanEmail = email.trim().toLowerCase()
    const cleanName  = name.trim()

    // ── 1. Upsert subscriber ─────────────────────────────────────
    const { data: subscriber, error: subError } = await supabaseAdmin
      .from('subscribers')
      .upsert(
        { email: cleanEmail, name: cleanName, tags: ['thuthach7ngay'] },
        { onConflict: 'email', ignoreDuplicates: false }
      )
      .select('id, tags')
      .single()

    if (subError || !subscriber) {
      console.error('[register] upsert subscriber:', subError)
      return NextResponse.json({ error: 'Không lưu được thông tin' }, { status: 500 })
    }

    // Nếu subscriber đã có tag thì không gửi lại (tránh spam)
    const alreadyRegistered = Array.isArray(subscriber.tags) &&
      subscriber.tags.includes('thuthach7ngay') &&
      subscriber.tags.length > 0

    // ── 2. Tạo email_sequence nếu chưa có ───────────────────────
    const { data: existingSeq } = await supabaseAdmin
      .from('email_sequences')
      .select('id, status')
      .eq('subscriber_id', subscriber.id)
      .eq('sequence_name', 'challenge_7ngay')
      .single()

    if (existingSeq) {
      // Đã có sequence — không gửi lại email ngày 1
      console.log(`[register] ${cleanEmail} đã đăng ký trước đó, bỏ qua.`)
      return NextResponse.json({ ok: true })
    }

    await supabaseAdmin.from('email_sequences').insert({
      subscriber_id: subscriber.id,
      sequence_name: 'challenge_7ngay',
      current_day:   1,
      status:        'active',
      last_sent_at:  new Date().toISOString(),
    })

    // ── 3. Gửi email ngày 1 ngay lập tức ────────────────────────
    const email1 = getChallengeEmail(1, cleanName)
    if (email1) {
      const { error: mailError } = await sendEmail({
        to:      cleanEmail,
        subject: email1.subject,
        html:    email1.html,
      })
      if (mailError) {
        console.error('[register] gửi email ngày 1:', mailError)
      }
    }

    // ── 4. Tag Brevo nếu có API key ──────────────────────────────
    if (process.env.BREVO_API_KEY) {
      try {
        await fetch('https://api.brevo.com/v3/contacts', {
          method:  'POST',
          headers: {
            'api-key':      process.env.BREVO_API_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email:      cleanEmail,
            attributes: { FIRSTNAME: cleanName },
            listIds:    [Number(process.env.BREVO_LIST_ID ?? 2)],
            updateEnabled: true,
          }),
        })
      } catch (e) {
        console.error('[register] Brevo sync:', e)
      }
    }

    console.log(`[register] OK: ${cleanName} <${cleanEmail}>`)
    return NextResponse.json({ ok: true })

  } catch (err) {
    console.error('[register]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
