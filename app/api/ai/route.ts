import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { action, data } = await request.json()

    let prompt = ''
    const systemPrompt = `You are an expert resume writer and career coach with 15+ years of experience. 
You write professional, ATS-friendly content that:
- Uses strong action verbs (Led, Developed, Increased, Managed, Created, etc.)
- Includes quantifiable achievements when possible
- Is concise and impactful
- Avoids first-person pronouns (I, my, me)
- Is tailored for modern job markets

Always respond with ONLY the requested content, no explanations or additional text.`

    switch (action) {
      case 'generate-summary':
        prompt = `Write a professional resume summary (3-4 sentences, 50-80 words) for someone with this background:

Job Title/Role: ${data.jobTitle || 'Professional'}
Years of Experience: ${data.yearsExperience || 'Several years'}
Key Skills: ${data.skills || 'Not specified'}
Industry: ${data.industry || 'Not specified'}
Career Goals: ${data.careerGoals || 'Seeking new opportunities'}

The summary should:
1. Start with years of experience and primary expertise
2. Highlight 2-3 key achievements or skills
3. End with value proposition or career objective
4. Be ATS-friendly with relevant keywords

Write ONLY the summary paragraph, nothing else.`
        break

      case 'improve-summary':
        prompt = `Improve this professional summary to be more impactful and ATS-friendly:

"${data.currentSummary}"

Requirements:
- Keep it 3-4 sentences (50-80 words)
- Use stronger action words and power verbs
- Add quantifiable achievements if possible
- Make it more specific and compelling
- Ensure ATS compatibility
- Remove first-person pronouns

Write ONLY the improved summary, nothing else.`
        break

      case 'generate-experience-bullets':
        prompt = `Generate 4-5 powerful bullet points for this job experience:

Job Title: ${data.jobTitle}
Company: ${data.company}
Industry: ${data.industry || 'Not specified'}
Key Responsibilities: ${data.responsibilities || 'General duties'}
Any Achievements: ${data.achievements || 'Not specified'}

Requirements for each bullet point:
- Start with a strong action verb (Led, Developed, Increased, Managed, Implemented, etc.)
- Include specific metrics/numbers where possible (%, $, time saved, etc.)
- Focus on achievements and impact, not just duties
- Keep each bullet to 1-2 lines
- Make them ATS-friendly with industry keywords

Format: Return each bullet point on a new line, starting with "• "

Write ONLY the bullet points, nothing else.`
        break

      case 'improve-experience-bullets':
        prompt = `Improve these job experience bullet points to be more impactful:

Current bullets:
${data.currentBullets}

Job Title: ${data.jobTitle || 'Not specified'}
Company: ${data.company || 'Not specified'}

Requirements:
- Transform each bullet to start with a strong action verb
- Add quantifiable results where possible (increased by X%, saved $X, etc.)
- Focus on achievements and business impact
- Keep each bullet concise (1-2 lines)
- Make them ATS-friendly

Format: Return each improved bullet point on a new line, starting with "• "

Write ONLY the improved bullet points, nothing else.`
        break

      case 'generate-skills':
        prompt = `Generate a list of 10-15 relevant skills for this profile:

Job Title: ${data.jobTitle}
Industry: ${data.industry || 'Not specified'}
Experience Level: ${data.experienceLevel || 'Mid-level'}
Current Skills: ${data.currentSkills || 'None specified'}

Requirements:
- Include a mix of hard skills (technical) and soft skills
- Prioritize skills that are ATS-friendly and commonly searched
- Make them specific to the role and industry
- Include modern/trending skills where relevant

Format: Return skills as a comma-separated list.

Write ONLY the skills list, nothing else.`
        break

      case 'tailor-for-job':
        prompt = `Tailor this resume content for a specific job:

Current Summary: ${data.summary || 'Not provided'}

Current Experience: ${data.experience || 'Not provided'}

Target Job Description:
${data.jobDescription}

Requirements:
1. Identify key requirements and keywords from the job description
2. Rewrite the summary to align with the job requirements
3. Suggest which skills to highlight
4. Provide 3 specific improvements to make

Format your response as:
TAILORED SUMMARY:
[new summary]

KEY SKILLS TO HIGHLIGHT:
[comma-separated skills]

RECOMMENDATIONS:
1. [recommendation 1]
2. [recommendation 2]
3. [recommendation 3]`
        break

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    })

    const result = completion.choices[0]?.message?.content?.trim() || ''

    // Track AI usage (optional)
    await supabase.from('ai_usage').insert({
      user_id: user.id,
      feature: action,
      tokens_used: completion.usage?.total_tokens || 0,
    })

    return NextResponse.json({ 
      success: true, 
      result,
      tokensUsed: completion.usage?.total_tokens || 0,
    })

  }  catch (error: unknown) {
    console.error('AI generation error:', error)
    
    // Check for OpenAI specific error
    if (
      error instanceof Error && 
      'code' in error && 
      (error as { code?: string }).code === 'insufficient_quota'
    ) {
      return NextResponse.json(
        { error: 'AI service quota exceeded. Please try again later.' },
        { status: 429 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to generate content. Please try again.' },
      { status: 500 }
    )
  }
}