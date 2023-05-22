import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'

const middleware = async (req: NextRequest) => {
  const token = await getToken({ req })

  const pathname = req.nextUrl.pathname
  const isAuthorized = !!token
  const isAuthorizedPage = pathname.startsWith('/auth/login')

  if (isAuthorizedPage) {
    if (isAuthorized) {
      return NextResponse.redirect(new URL('/chat', req.url))
    }

    return NextResponse.next()
  }

  if (!isAuthorized) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/chat', req.url))
  }
}

export default withAuth(middleware, {
  callbacks: {
    async authorized() {
      return true
    },
  },
})

export const config = {
  matcher: ['/', '/chat/:path*', '/auth/login'],
}
