import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from './app/lib/session'
import { cookies } from 'next/headers'

const protectedAdminRoutes = ['/admin']
const protectedUserRoutes = ['/dashboard']
const publicUserUnauthRoutes = ['/login', '/signup']
const publicRoutes = ['/']

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const filterProtectedAdminRoutes = protectedAdminRoutes.map((u) => path.includes(u) ? true : false)
  const filterProtectedUserRoutes = protectedUserRoutes.map((u) => path.includes(u) ? true : false)
  const filterPublicUserUnauthRoutes = publicUserUnauthRoutes.map((u) => path.includes(u) ? true : false)
  const isProtectedAdminRoute = filterProtectedAdminRoutes.includes(true)
  const isProtectedUserRoute = filterProtectedUserRoutes.includes(true)
  const isPublicUserUnauthRoutes = filterPublicUserUnauthRoutes.includes(true)
  const isPublicRoute = publicRoutes.includes(path)

  const cookieSession = cookies().get('session')?.value
  const session = await decrypt(cookieSession)

  // 5. Redirect to /login if the user is not authenticated
  if (
    (isProtectedAdminRoute || 
    isProtectedUserRoute) && 
    !session?.id
  ) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  // 6. Redirect to / if the user is authenticated as user
  if (
    (isProtectedAdminRoute ||
    isPublicUserUnauthRoutes) &&
    session?.role == 'user'
  ) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }

  // 7. Redirect to /admin if the user is authenticated as admin
  if (
    (isPublicRoute ||
    isPublicUserUnauthRoutes || 
    isProtectedUserRoute) &&
    session?.role == 'admin' &&
    !req.nextUrl.pathname.startsWith('/admin')
  ) {
    return NextResponse.redirect(new URL('/admin', req.nextUrl))
  }
  
  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
