import { type EmailOtpType } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

import { createClient } from '@/app/utils/supabase/server'

export async function GET(request: NextRequest) {
  const cookieStore = cookies()

  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/'

  const redirectTo = request.nextUrl.clone()
  redirectTo.pathname = next
  redirectTo.searchParams.delete('token_hash')
  redirectTo.searchParams.delete('type')

  console.log('entradDSFDDFDFDSFASDASD')

  if (token_hash && type) {
    const supabase = createClient(cookieStore)

    console.log(type, token_hash)

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    console.log('error', error)
    if (!error) {
        console.log('sin error')
      redirectTo.searchParams.delete('next')
      return NextResponse.redirect(redirectTo)
    }
  }

  // return the user to an error page with some instructions
  redirectTo.pathname = '/error'
  return NextResponse.redirect(redirectTo)
}