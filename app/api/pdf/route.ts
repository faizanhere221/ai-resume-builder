import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { resumeId } = await request.json()

    if (!resumeId) {
      return NextResponse.json({ error: 'Resume ID required' }, { status: 400 })
    }

    // Fetch resume
    const { data: resume, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('id', resumeId)
      .eq('user_id', user.id)
      .single()

    if (error || !resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 })
    }

    // Return resume data - PDF will be generated client-side
    return NextResponse.json({ 
      success: true, 
      resume: resume 
    })

  } catch (error) {
    console.error('PDF generation error:', error)
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 })
  }
}