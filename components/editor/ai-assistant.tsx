'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { Sparkles, Loader2, Wand2, Copy, Check } from 'lucide-react'

interface AIAssistantProps {
  type: 'summary' | 'experience' | 'skills'
  currentContent?: string
  onApply: (content: string) => void
  jobTitle?: string
  company?: string
}

export function AIAssistant({ type, currentContent, onApply, jobTitle, company }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  
  // Form fields
  const [formJobTitle, setFormJobTitle] = useState(jobTitle || '')
  const [yearsExperience, setYearsExperience] = useState('')
  const [skills, setSkills] = useState('')
  const [industry, setIndustry] = useState('')
  const [responsibilities, setResponsibilities] = useState('')

  const handleGenerate = async () => {
    setIsLoading(true)
    setResult('')

    try {
      let action = ''
      let data: Record<string, string> = {}

      switch (type) {
        case 'summary':
          action = currentContent ? 'improve-summary' : 'generate-summary'
          data = currentContent 
            ? { currentSummary: currentContent }
            : {
                jobTitle: formJobTitle,
                yearsExperience,
                skills,
                industry,
              }
          break
        case 'experience':
          action = currentContent ? 'improve-experience-bullets' : 'generate-experience-bullets'
          data = currentContent
            ? { 
                currentBullets: currentContent, 
                jobTitle: formJobTitle, 
                company: company || '' 
              }
            : {
                jobTitle: formJobTitle,
                company: company || '',
                industry,
                responsibilities,
              }
          break
        case 'skills':
          action = 'generate-skills'
          data = {
            jobTitle: formJobTitle,
            industry,
            currentSkills: currentContent || '',
          }
          break
      }

      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, data }),
      })

      const json = await response.json()

      if (!response.ok) {
        throw new Error(json.error || 'Failed to generate content')
      }

      setResult(json.result)
      toast.success('Content generated!', {
        description: 'Review and apply the AI-generated content.',
      })

    } catch (error: unknown) {
      console.error('AI error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Please try again.'
      toast.error('Generation failed', {
        description: errorMessage,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleApply = () => {
    onApply(result)
    setIsOpen(false)
    setResult('')
    toast.success('Content applied!')
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getTitle = () => {
    switch (type) {
      case 'summary':
        return currentContent ? 'Improve Summary' : 'Generate Summary'
      case 'experience':
        return currentContent ? 'Improve Bullet Points' : 'Generate Bullet Points'
      case 'skills':
        return 'Suggest Skills'
      default:
        return 'AI Assistant'
    }
  }

  const getDescription = () => {
    switch (type) {
      case 'summary':
        return 'Let AI help you write a compelling professional summary'
      case 'experience':
        return 'Generate powerful, achievement-focused bullet points'
      case 'skills':
        return 'Get AI-suggested skills based on your role and industry'
      default:
        return 'AI-powered content generation'
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Sparkles className="h-4 w-4" />
          AI Assist
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-[100] bg-black/50" />
        <DialogContent className="fixed left-[50%] top-[50%] z-[101] translate-x-[-50%] translate-y-[-50%] max-w-2xl w-[90vw] max-h-[85vh] overflow-y-auto bg-white rounded-lg shadow-xl border p-6">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Wand2 className="h-5 w-5 text-purple-600" />
              {getTitle()}
            </DialogTitle>
            <DialogDescription className="text-slate-600">
              {getDescription()}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Input Fields */}
            {!result && (
              <div className="space-y-4">
                {type === 'summary' && !currentContent && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Job Title / Role</Label>
                        <Input
                          value={formJobTitle}
                          onChange={(e) => setFormJobTitle(e.target.value)}
                          placeholder="Software Engineer"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Years of Experience</Label>
                        <Select value={yearsExperience} onValueChange={setYearsExperience}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent className="z-[102]">
                            <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                            <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                            <SelectItem value="senior">Senior (6-10 years)</SelectItem>
                            <SelectItem value="expert">Expert (10+ years)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Key Skills (comma-separated)</Label>
                      <Input
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        placeholder="React, Node.js, Python, Team Leadership"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Industry</Label>
                      <Input
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        placeholder="Technology, Finance, Healthcare, etc."
                      />
                    </div>
                  </>
                )}

                {type === 'summary' && currentContent && (
                  <div className="space-y-2">
                    <Label>Current Summary</Label>
                    <Textarea
                      value={currentContent}
                      disabled
                      className="min-h-[100px] bg-slate-50"
                    />
                    <p className="text-xs text-slate-500">
                      AI will improve this summary to be more impactful
                    </p>
                  </div>
                )}

                {type === 'experience' && !currentContent && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Job Title</Label>
                        <Input
                          value={formJobTitle}
                          onChange={(e) => setFormJobTitle(e.target.value)}
                          placeholder="Software Engineer"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Industry</Label>
                        <Input
                          value={industry}
                          onChange={(e) => setIndustry(e.target.value)}
                          placeholder="Technology"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Key Responsibilities (brief description)</Label>
                      <Textarea
                        value={responsibilities}
                        onChange={(e) => setResponsibilities(e.target.value)}
                        placeholder="Describe your main duties, projects, or responsibilities..."
                        className="min-h-[80px]"
                      />
                    </div>
                  </>
                )}

                {type === 'experience' && currentContent && (
                  <div className="space-y-2">
                    <Label>Current Description</Label>
                    <Textarea
                      value={currentContent}
                      disabled
                      className="min-h-[100px] bg-slate-50"
                    />
                    <p className="text-xs text-slate-500">
                      AI will transform this into powerful bullet points
                    </p>
                  </div>
                )}

                {type === 'skills' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Target Job Title</Label>
                        <Input
                          value={formJobTitle}
                          onChange={(e) => setFormJobTitle(e.target.value)}
                          placeholder="Software Engineer"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Industry</Label>
                        <Input
                          value={industry}
                          onChange={(e) => setIndustry(e.target.value)}
                          placeholder="Technology"
                        />
                      </div>
                    </div>
                    {currentContent && (
                      <div className="space-y-2">
                        <Label>Current Skills</Label>
                        <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                          {currentContent}
                        </p>
                      </div>
                    )}
                  </>
                )}

                <Button 
                  onClick={handleGenerate} 
                  disabled={isLoading}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate with AI
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Result */}
            {result && (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-base font-semibold">Generated Content</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopy}
                      className="h-8"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 mr-1" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-slate-800 whitespace-pre-line leading-relaxed">{result}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button onClick={handleApply} className="flex-1" size="lg">
                    <Check className="h-4 w-4 mr-2" />
                    Apply This Content
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setResult('')}
                    className="flex-1"
                    size="lg"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Again
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}