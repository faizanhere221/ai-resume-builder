'use client'

import { useResumeStore } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { RichTextEditor } from '@/components/editor/rich-text-editor'
import { generateId } from '@/lib/utils'
import {
  Heart,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  GripVertical,
} from 'lucide-react'

interface VolunteerSectionProps {
  isOpen: boolean
  onToggle: () => void
}

export function VolunteerSection({ isOpen, onToggle }: VolunteerSectionProps) {
  const { currentResume, addVolunteer, updateVolunteer, removeVolunteer } = useResumeStore()
  const volunteer = currentResume.volunteer || []

  const handleAddVolunteer = () => {
    addVolunteer({
      id: generateId(),
      role: '',
      organization: '',
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
            <Heart className="h-5 w-5 text-rose-600" />
            Volunteer Experience
            <span className="text-sm font-normal text-slate-500">({volunteer.length})</span>
          </CardTitle>
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </CardHeader>
      
      {isOpen && (
        <CardContent className="space-y-4">
          {volunteer.length === 0 && (
            <div className="text-center py-8 bg-slate-50 rounded-lg border-2 border-dashed">
              <Heart className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600 mb-1">No volunteer experience added yet</p>
              <p className="text-sm text-slate-400 mb-4">Showcase your community involvement and social impact</p>
              <Button onClick={handleAddVolunteer}>
                <Plus className="h-4 w-4 mr-2" />
                Add Volunteer Experience
              </Button>
            </div>
          )}

          {volunteer.map((vol, index) => (
            <div key={vol.id} className="border rounded-lg p-4 space-y-4 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GripVertical className="h-5 w-5 text-slate-300 cursor-grab" />
                  <span className="font-medium text-slate-700">
                    {vol.role || vol.organization || `Volunteer ${index + 1}`}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeVolunteer(vol.id)}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Role / Position *</Label>
                  <Input
                    value={vol.role}
                    onChange={(e) => updateVolunteer(vol.id, { role: e.target.value })}
                    placeholder="Volunteer Coordinator"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Organization *</Label>
                  <Input
                    value={vol.organization}
                    onChange={(e) => updateVolunteer(vol.id, { organization: e.target.value })}
                    placeholder="Red Cross"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={vol.location || ''}
                    onChange={(e) => updateVolunteer(vol.id, { location: e.target.value })}
                    placeholder="Multan, Pakistan"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={vol.startDate || ''}
                    onChange={(e) => updateVolunteer(vol.id, { startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={vol.endDate || ''}
                    onChange={(e) => updateVolunteer(vol.id, { endDate: e.target.value })}
                    placeholder="Leave empty if ongoing"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <RichTextEditor
                  content={vol.description || ''}
                  onChange={(content) => updateVolunteer(vol.id, { description: content })}
                  placeholder="Describe your volunteer activities and impact...

- Organized community events
- Trained new volunteers
- Raised funds for local initiatives"
                  minHeight="120px"
                />
              </div>
            </div>
          ))}

          {volunteer.length > 0 && (
            <Button variant="outline" onClick={handleAddVolunteer} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Another Volunteer Experience
            </Button>
          )}
        </CardContent>
      )}
    </Card>
  )
}