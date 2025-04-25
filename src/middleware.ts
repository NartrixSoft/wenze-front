import { NextRequest, NextResponse } from 'next/server'

// Les pages qui nécessitent une authentification
const protectedRoutes = [
  '/profile/me',
  '/cart',
  '/messages',
  '/products',
  '/user',
  '/products/add',
]

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value

  const isProtected = protectedRoutes.some(path =>
    request.nextUrl.pathname.startsWith(path)
  )

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/cart',
    '/messages/:id*',
    '/support',
    '/suggestion',
  ],
}