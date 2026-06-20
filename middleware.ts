import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// ─── Routes cần auth ─────────────────────────────────────────────────────────
const PROTECTED_PREFIXES = ['/admin']
const PUBLIC_PATHS = ['/landing', '/login', '/register', '/forgot-password']

// Demo auth token key (thay bằng next-auth session khi production)
const AUTH_COOKIE = 'dh_auth_token'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Bỏ qua static files và api routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  const isProtected = PROTECTED_PREFIXES.some(p => pathname.startsWith(p))
  const isPublic = PUBLIC_PATHS.some(p => pathname.startsWith(p))

  // Nếu là route protected → kiểm tra token
  if (isProtected) {
    const token = request.cookies.get(AUTH_COOKIE)?.value

    // Yêu cầu token phải tồn tại và có giá trị khớp
    if (token !== 'authenticated') {
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
