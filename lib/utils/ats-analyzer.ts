import type { ResumeContent } from '@/types'

export interface ATSCheckResult {
  score: number
  grade: 'A' | 'B' | 'C' | 'D' | 'F'
  checks: ATSCheck[]
  summary: string
  improvements: string[]
}

export interface ATSCheck {
  id: string
  category: string
  name: string
  status: 'pass' | 'warning' | 'fail'
  score: number
  maxScore: number
  message: string
  suggestion?: string
}

export function analyzeResume(content: ResumeContent): ATSCheckResult {
  const checks: ATSCheck[] = []
  
  // 1. Contact Information (15 points)
  checks.push(checkContactInfo(content))
  
  // 2. Professional Summary (15 points)
  checks.push(checkSummary(content))
  
  // 3. Work Experience (25 points)
  checks.push(checkExperience(content))
  
  // 4. Education (10 points)
  checks.push(checkEducation(content))
  
  // 5. Skills (15 points)
  checks.push(checkSkills(content))
  
  // 6. Keywords & Action Verbs (10 points)
  checks.push(checkKeywords(content))
  
  // 7. Content Length (5 points)
  checks.push(checkContentLength(content))
  
  // 8. Formatting (5 points)
  checks.push(checkFormatting(content))
  
  // Calculate total score
  const totalScore = checks.reduce((sum, check) => sum + check.score, 0)
  const maxScore = checks.reduce((sum, check) => sum + check.maxScore, 0)
  const percentageScore = Math.round((totalScore / maxScore) * 100)
  
  // Determine grade
  const grade = getGrade(percentageScore)
  
  // Get improvements
  const improvements = checks
    .filter(c => c.status !== 'pass')
    .sort((a, b) => (b.maxScore - b.score) - (a.maxScore - a.score))
    .slice(0, 5)
    .map(c => c.suggestion || c.message)
    .filter(Boolean)
  
  // Generate summary
  const summary = generateSummary(percentageScore, checks)
  
  return {
    score: percentageScore,
    grade,
    checks,
    summary,
    improvements,
  }
}

function checkContactInfo(content: ResumeContent): ATSCheck {
  const { personalInfo } = content
  let score = 0
  const maxScore = 15
  const issues: string[] = []
  
  // Check each field
  if (personalInfo.firstName && personalInfo.lastName) {
    score += 3
  } else {
    issues.push('full name')
  }
  
  if (personalInfo.email && isValidEmail(personalInfo.email)) {
    score += 4
  } else {
    issues.push('valid email')
  }
  
  if (personalInfo.phone && personalInfo.phone.length >= 10) {
    score += 3
  } else {
    issues.push('phone number')
  }
  
  if (personalInfo.location) {
    score += 2
  } else {
    issues.push('location')
  }
  
  if (personalInfo.linkedin || personalInfo.website || personalInfo.github) {
    score += 3
  } else {
    issues.push('LinkedIn or portfolio link')
  }
  
  const status = score >= 12 ? 'pass' : score >= 8 ? 'warning' : 'fail'
  
  return {
    id: 'contact-info',
    category: 'Contact Information',
    name: 'Contact Details',
    status,
    score,
    maxScore,
    message: status === 'pass' 
      ? 'Contact information is complete' 
      : `Missing: ${issues.join(', ')}`,
    suggestion: issues.length > 0 
      ? `Add your ${issues[0]} to improve ATS compatibility`
      : undefined,
  }
}

function checkSummary(content: ResumeContent): ATSCheck {
  const { summary } = content
  let score = 0
  const maxScore = 15
  
  if (!summary || summary.trim().length === 0) {
    return {
      id: 'summary',
      category: 'Professional Summary',
      name: 'Summary Present',
      status: 'fail',
      score: 0,
      maxScore,
      message: 'No professional summary found',
      suggestion: 'Add a 2-4 sentence professional summary highlighting your key skills and experience',
    }
  }
  
  const wordCount = summary.trim().split(/\s+/).length
  
  // Check length (ideal: 50-150 words)
  if (wordCount >= 30 && wordCount <= 200) {
    score += 5
  } else if (wordCount >= 20) {
    score += 3
  } else {
    score += 1
  }
  
  // Check for keywords/skills mentioned
  const hasSkillWords = /\b(experience|skilled|proficient|expert|developed|managed|led|created|built|designed|implemented)\b/i.test(summary)
  if (hasSkillWords) {
    score += 5
  }
  
  // Check for metrics/numbers
  const hasMetrics = /\d+/.test(summary)
  if (hasMetrics) {
    score += 5
  } else {
    score += 2
  }
  
  const status = score >= 12 ? 'pass' : score >= 8 ? 'warning' : 'fail'
  
  return {
    id: 'summary',
    category: 'Professional Summary',
    name: 'Summary Quality',
    status,
    score,
    maxScore,
    message: status === 'pass'
      ? 'Professional summary is well-written'
      : `Summary could be improved (${wordCount} words)`,
    suggestion: !hasMetrics
      ? 'Add quantifiable achievements (numbers, percentages) to your summary'
      : wordCount < 30
      ? 'Expand your summary to 50-150 words for better impact'
      : undefined,
  }
}

function checkExperience(content: ResumeContent): ATSCheck {
  const { experience } = content
  let score = 0
  const maxScore = 25
  const issues: string[] = []
  
  if (!experience || experience.length === 0) {
    return {
      id: 'experience',
      category: 'Work Experience',
      name: 'Experience Section',
      status: 'fail',
      score: 0,
      maxScore,
      message: 'No work experience added',
      suggestion: 'Add your work experience with job titles, companies, dates, and achievements',
    }
  }
  
  // Points for having experience entries
  const entryPoints = Math.min(experience.length * 3, 9)
  score += entryPoints
  
  // Check each experience entry
  let hasAllTitles = true
  let hasAllCompanies = true
  let hasAllDates = true
  let hasDescriptions = 0
  let hasBulletPoints = 0
  let hasMetrics = 0
  
  experience.forEach(exp => {
    if (!exp.title) hasAllTitles = false
    if (!exp.company) hasAllCompanies = false
    if (!exp.startDate) hasAllDates = false
    if (exp.description && exp.description.length > 50) hasDescriptions++
    if (exp.description && (exp.description.includes('•') || exp.description.includes('-') || exp.description.includes('\n'))) hasBulletPoints++
    if (exp.description && /\d+%?/.test(exp.description)) hasMetrics++
  })
  
  // Job titles (4 points)
  if (hasAllTitles) {
    score += 4
  } else {
    issues.push('job titles')
  }
  
  // Companies (3 points)
  if (hasAllCompanies) {
    score += 3
  } else {
    issues.push('company names')
  }
  
  // Dates (3 points)
  if (hasAllDates) {
    score += 3
  } else {
    issues.push('employment dates')
  }
  
  // Descriptions (3 points)
  if (hasDescriptions >= experience.length * 0.8) {
    score += 3
  } else {
    issues.push('job descriptions')
  }
  
  // Metrics in descriptions (3 points)
  if (hasMetrics >= experience.length * 0.5) {
    score += 3
  } else {
    issues.push('quantifiable achievements')
  }
  
  const status = score >= 20 ? 'pass' : score >= 12 ? 'warning' : 'fail'
  
  return {
    id: 'experience',
    category: 'Work Experience',
    name: 'Experience Quality',
    status,
    score,
    maxScore,
    message: status === 'pass'
      ? `${experience.length} experience entries with good details`
      : `Experience section needs improvement`,
    suggestion: issues.length > 0
      ? `Add ${issues[0]} to strengthen your experience section`
      : undefined,
  }
}

function checkEducation(content: ResumeContent): ATSCheck {
  const { education } = content
  let score = 0
  const maxScore = 10
  
  if (!education || education.length === 0) {
    return {
      id: 'education',
      category: 'Education',
      name: 'Education Section',
      status: 'warning',
      score: 2,
      maxScore,
      message: 'No education information added',
      suggestion: 'Add your educational background including school, degree, and graduation date',
    }
  }
  
  // Points for having education
  score += Math.min(education.length * 3, 6)
  
  // Check completeness
  let hasSchool = false
  let hasDegree = false
  let hasDates = false
  
  education.forEach(edu => {
    if (edu.school) hasSchool = true
    if (edu.degree) hasDegree = true
    if (edu.endDate || edu.startDate) hasDates = true
  })
  
  if (hasSchool) score += 2
  if (hasDegree) score += 1
  if (hasDates) score += 1
  
  const status = score >= 8 ? 'pass' : score >= 5 ? 'warning' : 'fail'
  
  return {
    id: 'education',
    category: 'Education',
    name: 'Education Details',
    status,
    score,
    maxScore,
    message: status === 'pass'
      ? 'Education section is complete'
      : 'Education section could be improved',
    suggestion: !hasDegree
      ? 'Add your degree/certification name'
      : !hasDates
      ? 'Add graduation dates to your education'
      : undefined,
  }
}

function checkSkills(content: ResumeContent): ATSCheck {
  const { skills } = content
  let score = 0
  const maxScore = 15
  
  if (!skills || skills.length === 0) {
    return {
      id: 'skills',
      category: 'Skills',
      name: 'Skills Section',
      status: 'fail',
      score: 0,
      maxScore,
      message: 'No skills added',
      suggestion: 'Add 8-15 relevant skills to improve keyword matching with job descriptions',
    }
  }
  
  // Score based on number of skills
  if (skills.length >= 10) {
    score += 10
  } else if (skills.length >= 6) {
    score += 7
  } else if (skills.length >= 3) {
    score += 4
  } else {
    score += 2
  }
  
  // Bonus for variety (mix of hard and soft skills)
  const skillNames = skills.map(s => s.name.toLowerCase())
  const technicalKeywords = ['javascript', 'python', 'react', 'sql', 'aws', 'excel', 'java', 'html', 'css', 'node', 'api', 'data', 'analytics', 'design', 'photoshop', 'figma']
  const softKeywords = ['leadership', 'communication', 'teamwork', 'problem-solving', 'management', 'collaboration', 'planning', 'organization']
  
  const hasTechnical = skillNames.some(s => technicalKeywords.some(k => s.includes(k)))
  const hasSoft = skillNames.some(s => softKeywords.some(k => s.includes(k)))
  
  if (hasTechnical) score += 3
  if (hasSoft) score += 2
  
  const status = score >= 12 ? 'pass' : score >= 7 ? 'warning' : 'fail'
  
  return {
    id: 'skills',
    category: 'Skills',
    name: 'Skills Coverage',
    status,
    score,
    maxScore,
    message: status === 'pass'
      ? `${skills.length} skills added with good variety`
      : `${skills.length} skills added - consider adding more`,
    suggestion: skills.length < 8
      ? 'Add more relevant skills (aim for 8-15 skills)'
      : !hasTechnical
      ? 'Add technical/hard skills relevant to your target role'
      : undefined,
  }
}

function checkKeywords(content: ResumeContent): ATSCheck {
  const { summary, experience } = content
  let score = 0
  const maxScore = 10
  
  // Combine all text
  const allText = [
    summary,
    ...experience.map(e => `${e.title} ${e.description}`),
  ].join(' ').toLowerCase()
  
  // Action verbs that ATS systems look for
  const actionVerbs = [
    'achieved', 'improved', 'developed', 'created', 'managed', 'led', 'implemented',
    'designed', 'built', 'launched', 'increased', 'reduced', 'delivered', 'organized',
    'collaborated', 'analyzed', 'streamlined', 'optimized', 'generated', 'established'
  ]
  
  const foundVerbs = actionVerbs.filter(verb => allText.includes(verb))
  
  // Score based on action verbs found
  if (foundVerbs.length >= 8) {
    score += 6
  } else if (foundVerbs.length >= 5) {
    score += 4
  } else if (foundVerbs.length >= 2) {
    score += 2
  }
  
  // Check for metrics/numbers
  const metricsCount = (allText.match(/\d+%?/g) || []).length
  if (metricsCount >= 5) {
    score += 4
  } else if (metricsCount >= 2) {
    score += 2
  } else if (metricsCount >= 1) {
    score += 1
  }
  
  const status = score >= 8 ? 'pass' : score >= 5 ? 'warning' : 'fail'
  
  return {
    id: 'keywords',
    category: 'Keywords & Impact',
    name: 'Action Verbs & Metrics',
    status,
    score,
    maxScore,
    message: status === 'pass'
      ? `Strong use of action verbs (${foundVerbs.length}) and metrics (${metricsCount})`
      : `Found ${foundVerbs.length} action verbs and ${metricsCount} metrics`,
    suggestion: foundVerbs.length < 5
      ? 'Use more action verbs like "achieved", "improved", "developed", "managed"'
      : metricsCount < 3
      ? 'Add more quantifiable results (numbers, percentages, dollar amounts)'
      : undefined,
  }
}

function checkContentLength(content: ResumeContent): ATSCheck {
  const { summary, experience, education, skills } = content
  let score = 0
  const maxScore = 5
  
  // Calculate total content
  const summaryWords = summary?.split(/\s+/).length || 0
  const expWords = experience.reduce((sum, e) => sum + (e.description?.split(/\s+/).length || 0), 0)
  const totalWords = summaryWords + expWords
  
  // Ideal resume is 400-800 words
  if (totalWords >= 300 && totalWords <= 1000) {
    score = 5
  } else if (totalWords >= 200 && totalWords <= 1200) {
    score = 3
  } else if (totalWords >= 100) {
    score = 2
  } else {
    score = 1
  }
  
  const status = score >= 4 ? 'pass' : score >= 2 ? 'warning' : 'fail'
  
  return {
    id: 'content-length',
    category: 'Content',
    name: 'Resume Length',
    status,
    score,
    maxScore,
    message: `Approximately ${totalWords} words`,
    suggestion: totalWords < 200
      ? 'Your resume is too short. Add more details about your experience and achievements.'
      : totalWords > 1000
      ? 'Your resume may be too long. Consider being more concise.'
      : undefined,
  }
}

function checkFormatting(content: ResumeContent): ATSCheck {
  let score = 5
  const maxScore = 5
  const issues: string[] = []
  
  // Check for ATS-unfriendly elements
  const allText = JSON.stringify(content)
  
  // Check for special characters that might cause issues
  if (/[^\x00-\x7F]/.test(allText)) {
    // Has non-ASCII characters (emojis, special chars)
    const hasEmojis = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]/u.test(allText)
    if (hasEmojis) {
      score -= 2
      issues.push('emojis')
    }
  }
  
  // All sections have standard names (we use standard names, so this passes)
  
  const status = score >= 4 ? 'pass' : score >= 2 ? 'warning' : 'fail'
  
  return {
    id: 'formatting',
    category: 'Formatting',
    name: 'ATS Compatibility',
    status,
    score,
    maxScore,
    message: status === 'pass'
      ? 'Resume format is ATS-compatible'
      : `Potential formatting issues: ${issues.join(', ')}`,
    suggestion: issues.length > 0
      ? `Remove ${issues[0]} for better ATS compatibility`
      : undefined,
  }
}

function getGrade(score: number): 'A' | 'B' | 'C' | 'D' | 'F' {
  if (score >= 90) return 'A'
  if (score >= 80) return 'B'
  if (score >= 70) return 'C'
  if (score >= 60) return 'D'
  return 'F'
}

function generateSummary(score: number, checks: ATSCheck[]): string {
  const passCount = checks.filter(c => c.status === 'pass').length
  const warningCount = checks.filter(c => c.status === 'warning').length
  const failCount = checks.filter(c => c.status === 'fail').length
  
  if (score >= 90) {
    return 'Excellent! Your resume is highly optimized for ATS systems. It should perform well in automated screenings.'
  } else if (score >= 80) {
    return 'Good job! Your resume is well-optimized for ATS. A few minor improvements could make it even stronger.'
  } else if (score >= 70) {
    return 'Your resume is decent but has room for improvement. Focus on the suggestions below to boost your score.'
  } else if (score >= 60) {
    return 'Your resume needs attention. Several areas require improvement to pass ATS screenings effectively.'
  } else {
    return 'Your resume needs significant work to be ATS-friendly. Follow the recommendations below to improve your chances.'
  }
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}