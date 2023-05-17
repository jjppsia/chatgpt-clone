import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'

const middleware = async (req: NextRequest) => {
  const token = await getToken({ req })
  const isAuthorized = !!token
  const isAuthorizedPage = req.nextUrl.pathname.startsWith('/auth/login')

  if (isAuthorizedPage) {
    if (isAuthorized) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    return null
  }

  if (!isAuthorized) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
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
  matcher: ['/', '/chats/:path*', '/auth/login'],
}
