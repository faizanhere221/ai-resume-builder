'use client'

import { useResumeStore } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AIAssistant } from '@/components/editor/ai-assistant'
import { RichTextEditor } from '@/components/editor/rich-text-editor'
import { FileText, ChevronDown, ChevronUp } from 'lucide-react'

interface SummarySectionProps {
  isOpen: boolean
  onToggle: () => void
}

export function SummarySection({ isOpen, onToggle }: SummarySectionProps) {
  const { currentResume, updateSummary } = useResumeStore()

  const handleAIApply = (content: string) => {
    // Convert plain text to paragraph HTML
    const htmlContent = `<p>${content}</p>`
    updateSummary(htmlContent)
  }

  // Get plain text for word count and AI
  const getPlainText = (html: string) => {
    if (typeof window === 'undefined') return html
    const temp = document.createElement('div')
    temp.innerHTML = html
    return temp.textContent || temp.innerText || ''
  }

  const plainText = getPlainText(currentResume.summary)
  const wordCount = plainText.trim().split(/\s+/).filter(Boolean).length

  return (
    <Card>
      <CardHeader className="cursor-pointer" onClick={onToggle}>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5 text-purple-600" />
            Professional Summary
            {!currentResume.summary && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">+15%</span>
            )}
          </CardTitle>
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </CardHeader>
      
      {isOpen && (
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Write 2-4 sentences about your professional background
            </p>
            <AIAssistant 
              type="summary" 
              currentContent={plainText}
              onApply={handleAIApply}
            />
          </div>
          
          <RichTextEditor
            content={currentResume.summary}
            onChange={updateSummary}
            placeholder="Experienced software engineer with 5+ years of expertise in building scalable web applications. Proven track record of leading development teams and delivering high-impact projects. Passionate about clean code, performance optimization, and mentoring junior developers."
            minHeight="120px"
          />
          
          <div className="flex items-center justify-between text-xs">
            <span className={`${wordCount < 30 ? 'text-amber-600' : wordCount > 100 ? 'text-amber-600' : 'text-green-600'}`}>
              {wordCount} words {wordCount < 30 && '(add more details)'} {wordCount > 100 && '(consider shortening)'}
            </span>
            <span className="text-slate-400">Recommended: 50-80 words</span>
          </div>
        </CardContent>
      )}
    </Card>
  )
}