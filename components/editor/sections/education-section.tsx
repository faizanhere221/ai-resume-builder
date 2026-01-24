'use client'

import { useResumeStore } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { generateId } from '@/lib/utils'
import {
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
} from 'lucide-react'

interface EducationSectionProps {
  isOpen: boolean
  onToggle: () => void
}

export function EducationSection({ isOpen, onToggle }: EducationSectionProps) {
  const { currentResume, addEducation, updateEducation, removeEducation } = useResumeStore()
  const { education } = currentResume

  const handleAddEducation = () => {
    addEducation({
      id: generateId(),
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
    })
  }

  return (
    <Card>
      <CardHeader className="cursor-pointer" onClick={onToggle}>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <GraduationCap className="h-5 w-5 text-orange-600" />
            Education
            <span className="text-sm font-normal text-slate-500">({education.length})</span>
            {education.length === 0 && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">+15%</span>
            )}
          </CardTitle>
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </CardHeader>
      
      {isOpen && (
        <CardContent className="space-y-4">
          {education.length === 0 && (
            <div className="text-center py-8 bg-slate-50 rounded-lg border-2 border-dashed">
              <GraduationCap className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600 mb-1">No education added yet</p>
              <p className="text-sm text-slate-400 mb-4">Add your educational background</p>
              <Button onClick={handleAddEducation}>
                <Plus className="h-4 w-4 mr-2" />
                Add Education
              </Button>
            </div>
          )}

          {education.map((edu, index) => (
            <div key={edu.id} className="border rounded-lg p-4 space-y-4 bg-white">
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-700">
                  {edu.school || edu.degree || `Education ${index + 1}`}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(edu.id)}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <Label>School / University *</Label>
                <Input
                  value={edu.school}
                  onChange={(e) => updateEducation(edu.id, { school: e.target.value })}
                  placeholder="Bahauddin Zakariya University"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Degree *</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                    placeholder="Bachelor of Science"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Field of Study</Label>
                  <Input
                    value={edu.field}
                    onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                    placeholder="Computer Science"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>GPA (optional)</Label>
                  <Input
                    value={edu.gpa || ''}
                    onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                    placeholder="3.8 / 4.0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description (optional)</Label>
                <Textarea
                  value={edu.description || ''}
                  onChange={(e) => updateEducation(edu.id, { description: e.target.value })}
                  placeholder="Relevant coursework, honors, activities..."
                  className="min-h-[80px]"
                />
              </div>
            </div>
          ))}

          {education.length > 0 && (
            <Button variant="outline" onClick={handleAddEducation} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Another Education
            </Button>
          )}
        </CardContent>
      )}
    </Card>
  )
}