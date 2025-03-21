import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  console.log('request', request)
  const accessToken = request.cookies.get('designerHaus:accessToken')

  const urlAuthLogin = request.nextUrl.clone()
  urlAuthLogin.pathname = '/auth/login'

  const urlApp = request.nextUrl.clone()
  urlApp.pathname = '/'

  if (!accessToken && !request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(urlAuthLogin)
  }

  if (accessToken && !!request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(urlApp)
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
