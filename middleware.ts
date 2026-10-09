import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'placeholder-anon-key',
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          const cookieOptions: CookieOptions = {
            ...options,
            sameSite: 'none',
            secure: true,
          }
          request.cookies.set({
            name,
            value,
            ...cookieOptions,
          })
          response.cookies.set({
            name,
            value,
            ...cookieOptions,
          })
        },
        remove(name: string, options: CookieOptions) {
          const cookieOptions: CookieOptions = {
            ...options,
            sameSite: 'none',
            secure: true,
            maxAge: 0,
          }
          request.cookies.set({
            name,
            value: '',
            ...cookieOptions,
          })
          response.cookies.set({
            name,
            value,
            ...cookieOptions,
          })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const { data: { session } } = !user ? await supabase.auth.getSession() : { data: { session: null } }
  
  if (!user && !session) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/login'
    return NextResponse.redirect(redirectUrl)
  }
  
  return response
}

export const config = {
  matcher: [
    '/dashboard/:path*'
  ],
}
