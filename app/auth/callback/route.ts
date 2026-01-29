import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  
  const code = searchParams.get('code')
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type')
  const next = searchParams.get('next') ?? '/dashboard'
  const error = searchParams.get('error')
  const error_description = searchParams.get('error_description')

  // Handle errors
  if (error) {
    console.error('Auth callback error:', error, error_description)
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(error_description || error)}`)
  }

  const supabase = await createClient()

  // Handle password reset (type=recovery)
  if (type === 'recovery' && token_hash) {
    const { error: verifyError } = await supabase.auth.verifyOtp({
      token_hash,
      type: 'recovery',
    })

    if (verifyError) {
      console.error('Recovery verification error:', verifyError)
      return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(verifyError.message)}`)
    }

    // Redirect to reset password page
    return NextResponse.redirect(`${origin}/auth/reset-password`)
  }

  // Handle email confirmation (type=signup or type=email)
  if (type === 'signup' || type === 'email') {
    if (token_hash) {
      const { error: verifyError } = await supabase.auth.verifyOtp({
        token_hash,
        type: type === 'signup' ? 'signup' : 'email',
      })

      if (verifyError) {
        console.error('Email verification error:', verifyError)
        return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(verifyError.message)}`)
      }
    }
    
    return NextResponse.redirect(`${origin}/login?message=Email confirmed! Please sign in.`)
  }

  // Handle OAuth callback (code exchange)
  if (code) {
    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
    
    if (exchangeError) {
      console.error('Code exchange error:', exchangeError)
      return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(exchangeError.message)}`)
    }

    if (data.user) {
      // Check if user exists in users table, if not create them
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('id', data.user.id)
        .single()

      if (!existingUser) {
        // Create user profile for OAuth users
        await supabase.from('users').insert({
          id: data.user.id,
          email: data.user.email,
          full_name: data.user.user_metadata?.full_name || data.user.user_metadata?.name || '',
          avatar_url: data.user.user_metadata?.avatar_url || data.user.user_metadata?.picture || '',
          created_at: new Date().toISOString(),
        })
      }

      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Default: redirect to login with error
  return NextResponse.redirect(`${origin}/login?error=Could not authenticate user`)
}