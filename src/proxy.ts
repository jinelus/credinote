import { type NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const isAuthenticated = request.cookies.has('jcb.session_token')

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
