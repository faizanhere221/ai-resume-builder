'use client'

import { useResumeStore } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { RichTextEditor } from '@/components/editor/rich-text-editor'
import { generateId } from '@/lib/utils'
import {
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  GripVertical,
} from 'lucide-react'

interface InternshipsSectionProps {
  isOpen: boolean
  onToggle: () => void
}

export function InternshipsSection({ isOpen, onToggle }: InternshipsSectionProps) {
  const { currentResume, addInternship, updateInternship, removeInternship } = useResumeStore()
  const internships = currentResume.internships || []

  const handleAddInternship = () => {
    addInternship({
      id: generateId(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
    })
  }

  return (
    <Card>
      <CardHeader className="cursor-pointer" onClick={onToggle}>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <GraduationCap className="h-5 w-5 text-indigo-600" />
            Internships
            <span className="text-sm font-normal text-slate-500">({internships.length})</span>
          </CardTitle>
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </CardHeader>
      
      {isOpen && (
        <CardContent className="space-y-4">
          {internships.length === 0 && (
            <div className="text-center py-8 bg-slate-50 rounded-lg border-2 border-dashed">
              <GraduationCap className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600 mb-1">No internships added yet</p>
              <p className="text-sm text-slate-400 mb-4">Add your internship experiences</p>
              <Button onClick={handleAddInternship}>
                <Plus className="h-4 w-4 mr-2" />
                Add Internship
              </Button>
            </div>
          )}

          {internships.map((internship, index) => (
            <div key={internship.id} className="border rounded-lg p-4 space-y-4 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GripVertical className="h-5 w-5 text-slate-300 cursor-grab" />
                  <span className="font-medium text-slate-700">
                    {internship.title || internship.company || `Internship ${index + 1}`}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeInternship(internship.id)}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Job Title *</Label>
                  <Input
                    value={internship.title}
                    onChange={(e) => updateInternship(internship.id, { title: e.target.value })}
                    placeholder="Software Engineering Intern"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Company *</Label>
                  <Input
                    value={internship.company}
                    onChange={(e) => updateInternship(internship.id, { company: e.target.value })}
                    placeholder="Google"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={internship.location || ''}
                    onChange={(e) => updateInternship(internship.id, { location: e.target.value })}
                    placeholder="Lahore, Pakistan"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Start Date *</Label>
                  <Input
                    type="month"
                    value={internship.startDate}
                    onChange={(e) => updateInternship(internship.id, { startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date *</Label>
                  <Input
                    type="month"
                    value={internship.endDate}
                    onChange={(e) => updateInternship(internship.id, { endDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <RichTextEditor
                  content={internship.description || ''}
                  onChange={(content) => updateInternship(internship.id, { description: content })}
                  placeholder="Describe your responsibilities and achievements...

- Developed features for the main product
- Collaborated with senior engineers
- Participated in code reviews"
                  minHeight="120px"
                />
              </div>
            </div>
          ))}

          {internships.length > 0 && (
            <Button variant="outline" onClick={handleAddInternship} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Another Internship
            </Button>
          )}
        </CardContent>
      )}
    </Card>
  )
}