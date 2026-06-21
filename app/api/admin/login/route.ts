import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createToken } from '@/lib/auth-token'

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    const expectedUsername = process.env.ADMIN_USERNAME
    const expectedPassword = process.env.ADMIN_PASSWORD

    if (!expectedUsername || !expectedPassword) {
      return NextResponse.json(
        { success: false, error: 'Chưa cấu hình thông tin quản trị viên trên hệ thống.' },
        { status: 500 }
      )
    }

    // So khớp không phân biệt chữ hoa chữ thường đối với username và khớp tuyệt đối đối với password
    if (
      username?.toLowerCase() === expectedUsername.toLowerCase() &&
      password === expectedPassword
    ) {
      const maxAge = 7 * 24 * 60 * 60 // 7 ngày
      
      // Tạo token có chữ ký số bảo mật sử dụng ADMIN_PASSWORD làm secret key
      const token = await createToken(username, expectedPassword, maxAge)

      // Đặt cookie bảo mật dh_auth_token
      // Thiết lập httpOnly: true để chặn client JS đọc, secure: true chỉ gửi qua HTTPS (nếu ở production), sameSite: 'lax', thời hạn 7 ngày
      cookies().set('dh_auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge,
        path: '/',
      })

      return NextResponse.json({ success: true })
    }

    return NextResponse.json(
      { success: false, error: 'Tên đăng nhập hoặc mật khẩu không chính xác.' },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Đã xảy ra lỗi hệ thống.' },
      { status: 500 }
    )
  }
}
