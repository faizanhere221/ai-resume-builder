'use client'

import { useState } from 'react'
import { useResumeStore } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AIAssistant } from '@/components/editor/ai-assistant'
import { generateId } from '@/lib/utils'
import {
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Plus,
  X,
} from 'lucide-react'

interface SkillsSectionProps {
  isOpen: boolean
  onToggle: () => void
}

export function SkillsSection({ isOpen, onToggle }: SkillsSectionProps) {
  const { currentResume, addSkill, removeSkill } = useResumeStore()
  const { skills } = currentResume
  const [newSkill, setNewSkill] = useState('')

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      addSkill({
        id: generateId(),
        name: newSkill.trim(),
      })
      setNewSkill('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddSkill()
    }
  }

  const handleAIApply = (content: string) => {
    const newSkills = content.split(',').map(s => s.trim()).filter(Boolean)
    newSkills.forEach(skillName => {
      // Check if skill already exists
      if (!skills.some(s => s.name.toLowerCase() === skillName.toLowerCase())) {
        addSkill({
          id: generateId(),
          name: skillName,
        })
      }
    })
  }

  // Suggested skills based on common roles
  const suggestedSkills = [
    'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript',
    'SQL', 'Git', 'AWS', 'Communication', 'Leadership',
    'Problem Solving', 'Team Collaboration', 'Agile', 'Project Management'
  ].filter(s => !skills.some(sk => sk.name.toLowerCase() === s.toLowerCase()))

  return (
    <Card>
      <CardHeader className="cursor-pointer" onClick={onToggle}>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Lightbulb className="h-5 w-5 text-yellow-600" />
            Skills
            <span className="text-sm font-normal text-slate-500">({skills.length})</span>
            {skills.length < 5 && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">+10%</span>
            )}
          </CardTitle>
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </CardHeader>
      
      {isOpen && (
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Add skills relevant to your target job
            </p>
            <AIAssistant 
              type="skills"
              currentContent={skills.map(s => s.name).join(', ')}
              onApply={handleAIApply}
            />
          </div>

          {/* Add Skill Input */}
          <div className="flex gap-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a skill and press Enter"
              className="flex-1"
            />
            <Button onClick={handleAddSkill} disabled={!newSkill.trim()}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Current Skills */}
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge
                  key={skill.id}
                  variant="secondary"
                  className="flex items-center gap-1 px-3 py-1.5 text-sm"
                >
                  {skill.name}
                  <button
                    onClick={() => removeSkill(skill.id)}
                    className="ml-1 hover:text-red-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {skills.length === 0 && (
            <div className="text-center py-6 bg-slate-50 rounded-lg border-2 border-dashed">
              <Lightbulb className="h-8 w-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm text-slate-500">No skills added yet</p>
            </div>
          )}

          {/* Suggested Skills */}
          {suggestedSkills.length > 0 && (
            <div className="pt-2 border-t">
              <p className="text-xs text-slate-500 mb-2">Quick add:</p>
              <div className="flex flex-wrap gap-1">
                {suggestedSkills.slice(0, 8).map((skill) => (
                  <button
                    key={skill}
                    onClick={() => {
                      addSkill({ id: generateId(), name: skill })
                    }}
                    className="text-xs px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded transition-colors"
                  >
                    + {skill}
                  </button>
                ))}
              </div>
            </div>
          )}

          <p className="text-xs text-slate-400">
            Tip: Include 8-15 skills mixing technical and soft skills
          </p>
        </CardContent>
      )}
    </Card>
  )
}