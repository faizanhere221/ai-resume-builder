import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, reason, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Option 1: Store in Supabase (recommended)
    // Create a 'contact_messages' table in Supabase with columns:
    // id, name, email, reason, subject, message, created_at, status
    const supabase = await createClient()
    
    const { error: dbError } = await supabase
      .from('contact_messages')
      .insert({
        name,
        email,
        reason: reason || 'general',
        subject,
        message,
        status: 'new',
      })

    if (dbError) {
      console.error('Database error:', dbError)
      // Continue even if DB fails - at least log the message
    }

    // Option 2: Send email notification (you can use services like Resend, SendGrid, etc.)
    // Example with Resend (uncomment and add RESEND_API_KEY to env):
    /*
    const resend = new Resend(process.env.RESEND_API_KEY)
    
    await resend.emails.send({
      from: 'ResumeAI <noreply@infoishai.com>',
      to: 'support@infoishai.com',
      subject: `New Contact: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Reason:</strong> ${reason || 'General'}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })
    */

    // For now, just log the message
    console.log('📧 New contact form submission:', {
      name,
      email,
      reason,
      subject,
      message,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}