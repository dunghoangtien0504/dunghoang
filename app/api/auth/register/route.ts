import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()

    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      return NextResponse.json({ error: 'Điền đủ họ tên, email và mật khẩu nhé.' }, { status: 400 })
    }
    if (password.length < 6) {
      return NextResponse.json({ error: 'Mật khẩu ít nhất 6 ký tự.' }, { status: 400 })
    }

    // Dùng anon client để signup → Supabase tự gửi email xác nhận
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data, error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: {
        data: { name: name.trim() },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dunghoang.com'}/portal/login`,
      },
    })

    if (error) {
      // Email đã tồn tại → Supabase trả về "User already registered"
      if (error.message.toLowerCase().includes('already registered')) {
        return NextResponse.json(
          { error: 'Email này đã có tài khoản. Kiểm tra hộp thư để kích hoạt, hoặc đăng nhập tại trang portal.' },
          { status: 409 }
        )
      }
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Lưu vào subscribers để chạy email nurturing
    await supabaseAdmin.from('subscribers').upsert(
      {
        email:    email.trim().toLowerCase(),
        name:     name.trim(),
        source:   'register',
        tags:     ['registered'],
      },
      { onConflict: 'email' }
    )

    return NextResponse.json({
      success: true,
      userId:  data.user?.id,
      email:   data.user?.email,
    })
  } catch (err) {
    console.error('[auth/register]', err)
    return NextResponse.json({ error: 'Lỗi hệ thống, thử lại giúp mình nhé.' }, { status: 500 })
  }
}
