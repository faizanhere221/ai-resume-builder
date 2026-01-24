'use client'

import { useResumeStore } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { AIAssistant } from '@/components/editor/ai-assistant'
import { RichTextEditor } from '@/components/editor/rich-text-editor'
import { generateId } from '@/lib/utils'
import {
  Briefcase,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  GripVertical,
} from 'lucide-react'

interface ExperienceSectionProps {
  isOpen: boolean
  onToggle: () => void
}

export function ExperienceSection({ isOpen, onToggle }: ExperienceSectionProps) {
  const { currentResume, addExperience, updateExperience, removeExperience } = useResumeStore()
  const { experience } = currentResume

  const handleAddExperience = () => {
    addExperience({
      id: generateId(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: null,
      current: false,
      description: '',
    })
  }

  const handleAIApply = (content: string, expId: string) => {
    // Convert plain text bullet points to HTML list
    const lines = content.split('\n').filter(line => line.trim())
    const hasBullets = lines.some(line => line.trim().startsWith('•') || line.trim().startsWith('-'))
    
    let htmlContent = content
    if (hasBullets) {
      const listItems = lines
        .map(line => line.replace(/^[•\-]\s*/, '').trim())
        .filter(Boolean)
        .map(item => `<li>${item}</li>`)
        .join('')
      htmlContent = `<ul>${listItems}</ul>`
    }
    
    updateExperience(expId, { description: htmlContent })
  }

  // Convert HTML to plain text for AI processing
  const getPlainText = (html: string) => {
    const temp = document.createElement('div')
    temp.innerHTML = html
    return temp.textContent || temp.innerText || ''
  }

  return (
    <Card>
      <CardHeader className="cursor-pointer" onClick={onToggle}>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Briefcase className="h-5 w-5 text-green-600" />
            Employment History
            <span className="text-sm font-normal text-slate-500">({experience.length})</span>
            {experience.length === 0 && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">+25%</span>
            )}
          </CardTitle>
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </CardHeader>
      
      {isOpen && (
        <CardContent className="space-y-4">
          {experience.length === 0 && (
            <div className="text-center py-8 bg-slate-50 rounded-lg border-2 border-dashed">
              <Briefcase className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600 mb-1">No work experience added yet</p>
              <p className="text-sm text-slate-400 mb-4">Add your employment history to strengthen your resume</p>
              <Button onClick={handleAddExperience}>
                <Plus className="h-4 w-4 mr-2" />
                Add Employment
              </Button>
            </div>
          )}

          {experience.map((exp, index) => (
            <div key={exp.id} className="border rounded-lg p-4 space-y-4 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GripVertical className="h-5 w-5 text-slate-300 cursor-grab" />
                  <span className="font-medium text-slate-700">
                    {exp.title || exp.company || `Position ${index + 1}`}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <AIAssistant 
                    type="experience"
                    currentContent={getPlainText(exp.description)}
                    onApply={(content) => handleAIApply(content, exp.id)}
                    jobTitle={exp.title}
                    company={exp.company}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeExperience(exp.id)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Job Title *</Label>
                  <Input
                    value={exp.title}
                    onChange={(e) => updateExperience(exp.id, { title: e.target.value })}
                    placeholder="Software Engineer"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Company *</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                    placeholder="Google"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={exp.location}
                    onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                    placeholder="Lahore, Pakistan"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={exp.endDate || ''}
                    onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                    disabled={exp.current}
                    placeholder={exp.current ? 'Present' : ''}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id={`current-${exp.id}`}
                  checked={exp.current}
                  onCheckedChange={(checked) => 
                    updateExperience(exp.id, { 
                      current: checked as boolean, 
                      endDate: checked ? null : exp.endDate 
                    })
                  }
                />
                <Label htmlFor={`current-${exp.id}`} className="cursor-pointer text-sm">
                  I currently work here
                </Label>
              </div>

              <div className="space-y-2">
                <Label>Description / Achievements</Label>
                <RichTextEditor
                  content={exp.description}
                  onChange={(content) => updateExperience(exp.id, { description: content })}
                  placeholder="Describe your responsibilities and achievements...

- Led development of customer-facing features
- Reduced page load time by 40%
- Mentored junior developers"
                  minHeight="150px"
                />
                <p className="text-xs text-slate-400">
                  Tip: Use bullet points and include numbers/metrics for impact
                </p>
              </div>
            </div>
          ))}

          {experience.length > 0 && (
            <Button variant="outline" onClick={handleAddExperience} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Another Position
            </Button>
          )}
        </CardContent>
      )}
    </Card>
  )
}