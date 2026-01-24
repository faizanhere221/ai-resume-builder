'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'
import { Download, Loader2, FileText, FileIcon } from 'lucide-react'
import type { ResumeContent } from '@/types'
import { formatDateRange } from '@/lib/utils'

interface PDFDownloadProps {
  resumeId: string
  resumeTitle: string
  content: ResumeContent
}

export function PDFDownload({ resumeId, resumeTitle, content }: PDFDownloadProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const generatePDF = async () => {
    setIsGenerating(true)

    try {
      // Dynamically import jspdf and html2canvas
      const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
        import('jspdf'),
        import('html2canvas')
      ])

      // Create a temporary container with the resume content
      const container = document.createElement('div')
      container.innerHTML = generateResumeHTML(content)
      container.style.position = 'absolute'
      container.style.left = '-9999px'
      container.style.top = '0'
      container.style.width = '8.5in'
      container.style.backgroundColor = 'white'
      document.body.appendChild(container)

      // Generate canvas from HTML
      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      })

      // Remove temporary container
      document.body.removeChild(container)

      // Create PDF
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'in',
        format: 'letter',
      })

      const imgWidth = 8.5
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)

      // Download PDF
      const fileName = `${resumeTitle.replace(/[^a-z0-9]/gi, '_')}_Resume.pdf`
      pdf.save(fileName)

      toast.success('PDF Downloaded!', {
        description: `${fileName} has been saved to your downloads.`,
      })
    } catch (error) {
      console.error('Error generating PDF:', error)
      toast.error('Failed to generate PDF', {
        description: 'Please try again.',
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadAsText = () => {
    const textContent = generateResumeText(content)
    const blob = new Blob([textContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${resumeTitle.replace(/[^a-z0-9]/gi, '_')}_Resume.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast.success('Text file downloaded!')
  }

  const downloadAsJSON = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${resumeTitle.replace(/[^a-z0-9]/gi, '_')}_Resume.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast.success('JSON file downloaded!')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" disabled={isGenerating}>
          {isGenerating ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Download className="h-4 w-4 mr-2" />
          )}
          Download
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={generatePDF} disabled={isGenerating}>
          <FileText className="h-4 w-4 mr-2" />
          Download as PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={downloadAsText}>
          <FileIcon className="h-4 w-4 mr-2" />
          Download as Text
        </DropdownMenuItem>
        <DropdownMenuItem onClick={downloadAsJSON}>
          <FileIcon className="h-4 w-4 mr-2" />
          Download as JSON
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Generate HTML for PDF
function generateResumeHTML(content: ResumeContent): string {
  const { personalInfo, summary, experience, education, skills } = content
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim()

  return `
    <div style="font-family: 'Helvetica', 'Arial', sans-serif; padding: 40px; max-width: 8.5in; background: white;">
      <!-- Header -->
      <div style="text-align: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 24px;">
        <h1 style="font-size: 28px; font-weight: bold; color: #1e293b; margin: 0 0 8px 0;">
          ${fullName || 'Your Name'}
        </h1>
        <div style="font-size: 14px; color: #64748b;">
          ${[personalInfo.email, personalInfo.phone, personalInfo.location].filter(Boolean).join(' • ')}
        </div>
        <div style="font-size: 14px; color: #3b82f6; margin-top: 4px;">
          ${[personalInfo.linkedin, personalInfo.github, personalInfo.website].filter(Boolean).join(' • ')}
        </div>
      </div>

      <!-- Summary -->
      ${summary ? `
        <div style="margin-bottom: 24px;">
          <h2 style="font-size: 16px; font-weight: 600; color: #1e293b; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; margin: 0 0 12px 0;">
            Professional Summary
          </h2>
          <p style="font-size: 13px; color: #475569; line-height: 1.6; margin: 0;">
            ${summary}
          </p>
        </div>
      ` : ''}

      <!-- Experience -->
      ${experience.length > 0 ? `
        <div style="margin-bottom: 24px;">
          <h2 style="font-size: 16px; font-weight: 600; color: #1e293b; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; margin: 0 0 12px 0;">
            Work Experience
          </h2>
          ${experience.map(exp => `
            <div style="margin-bottom: 16px;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div>
                  <h3 style="font-size: 14px; font-weight: 600; color: #1e293b; margin: 0;">
                    ${exp.title || 'Job Title'}
                  </h3>
                  <p style="font-size: 13px; color: #64748b; margin: 2px 0 0 0;">
                    ${exp.company || 'Company'}${exp.location ? `, ${exp.location}` : ''}
                  </p>
                </div>
                <span style="font-size: 12px; color: #94a3b8;">
                  ${exp.startDate ? formatDateRange(exp.startDate, exp.endDate, exp.current) : ''}
                </span>
              </div>
              ${exp.description ? `
                <p style="font-size: 13px; color: #475569; margin: 8px 0 0 0; white-space: pre-line; line-height: 1.5;">
                  ${exp.description}
                </p>
              ` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}

      <!-- Education -->
      ${education.length > 0 ? `
        <div style="margin-bottom: 24px;">
          <h2 style="font-size: 16px; font-weight: 600; color: #1e293b; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; margin: 0 0 12px 0;">
            Education
          </h2>
          ${education.map(edu => `
            <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: flex-start;">
              <div>
                <h3 style="font-size: 14px; font-weight: 600; color: #1e293b; margin: 0;">
                  ${edu.school || 'School'}
                </h3>
                <p style="font-size: 13px; color: #64748b; margin: 2px 0 0 0;">
                  ${edu.degree}${edu.field ? ` in ${edu.field}` : ''}
                </p>
              </div>
              <span style="font-size: 12px; color: #94a3b8;">
                ${edu.startDate && edu.endDate ? formatDateRange(edu.startDate, edu.endDate) : ''}
              </span>
            </div>
          `).join('')}
        </div>
      ` : ''}

      <!-- Skills -->
      ${skills.length > 0 ? `
        <div style="margin-bottom: 24px;">
          <h2 style="font-size: 16px; font-weight: 600; color: #1e293b; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; margin: 0 0 12px 0;">
            Skills
          </h2>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${skills.map(skill => `
              <span style="background: #f1f5f9; color: #475569; padding: 4px 12px; border-radius: 9999px; font-size: 12px;">
                ${skill.name}
              </span>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `
}

// Generate plain text version
function generateResumeText(content: ResumeContent): string {
  const { personalInfo, summary, experience, education, skills } = content
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim()

  let text = ''

  // Header
  text += `${fullName || 'Your Name'}\n`
  text += '='.repeat(50) + '\n'
  if (personalInfo.email) text += `Email: ${personalInfo.email}\n`
  if (personalInfo.phone) text += `Phone: ${personalInfo.phone}\n`
  if (personalInfo.location) text += `Location: ${personalInfo.location}\n`
  if (personalInfo.linkedin) text += `LinkedIn: ${personalInfo.linkedin}\n`
  if (personalInfo.github) text += `GitHub: ${personalInfo.github}\n`
  if (personalInfo.website) text += `Website: ${personalInfo.website}\n`
  text += '\n'

  // Summary
  if (summary) {
    text += 'PROFESSIONAL SUMMARY\n'
    text += '-'.repeat(50) + '\n'
    text += summary + '\n\n'
  }

  // Experience
  if (experience.length > 0) {
    text += 'WORK EXPERIENCE\n'
    text += '-'.repeat(50) + '\n'
    experience.forEach(exp => {
      text += `${exp.title || 'Job Title'} at ${exp.company || 'Company'}\n`
      if (exp.location) text += `${exp.location}\n`
      if (exp.startDate) text += `${formatDateRange(exp.startDate, exp.endDate, exp.current)}\n`
      if (exp.description) text += `${exp.description}\n`
      text += '\n'
    })
  }

  // Education
  if (education.length > 0) {
    text += 'EDUCATION\n'
    text += '-'.repeat(50) + '\n'
    education.forEach(edu => {
      text += `${edu.school || 'School'}\n`
      text += `${edu.degree}${edu.field ? ` in ${edu.field}` : ''}\n`
      if (edu.startDate && edu.endDate) text += `${formatDateRange(edu.startDate, edu.endDate)}\n`
      text += '\n'
    })
  }

  // Skills
  if (skills.length > 0) {
    text += 'SKILLS\n'
    text += '-'.repeat(50) + '\n'
    text += skills.map(s => s.name).join(', ') + '\n'
  }

  return text
}