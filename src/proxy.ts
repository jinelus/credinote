import { type NextRequest, NextResponse } from 'next/server'
import { env } from './lib/env'

const isSecure = env?.BETTER_AUTH_URL !== 'http://localhost:3000'

const cookieName = isSecure ? '__Secure-jcb.session_token' : 'jcb.session_token'

export function proxy(request: NextRequest) {
  const isAuthenticated = request.cookies.has(cookieName)

  if (!isAuthenticated && request.nextUrl.pathname !== '/signin') {
    const url = request.nextUrl.clone()
    url.pathname = '/signin'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
