import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/auth-token'

// ─── Routes cần auth ─────────────────────────────────────────────────────────
const PROTECTED_PREFIXES = ['/admin', '/api/admin']
const PUBLIC_PATHS = ['/landing', '/login', '/register', '/forgot-password']

// Demo auth token key (thay bằng next-auth session khi production)
const AUTH_COOKIE = 'dh_auth_token'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Bỏ qua static files và public api routes (ngoại trừ /api/admin)
  if (
    pathname.startsWith('/_next') ||
    (pathname.startsWith('/api') && !pathname.startsWith('/api/admin')) ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // /api/admin/login là API đăng nhập công khai
  const isProtected = PROTECTED_PREFIXES.some(p => pathname.startsWith(p)) && pathname !== '/api/admin/login'
  const isPublic = PUBLIC_PATHS.some(p => pathname.startsWith(p))

  // Nếu là route protected → kiểm tra token
  if (isProtected) {
    const token = request.cookies.get(AUTH_COOKIE)?.value
    const secret = process.env.ADMIN_PASSWORD

    let isValid = false
    if (token && secret) {
      const username = await verifyToken(token, secret)
      if (username) {
        isValid = true
      }
    }

    if (!isValid) {
      // Nếu là cuộc gọi API nội bộ, trả về 401 Unauthorized thay vì redirect
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('from', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Thêm security headers
  const response = NextResponse.next()
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
