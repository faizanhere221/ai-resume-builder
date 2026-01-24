'use client'

import { useResumeStore } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { generateId } from '@/lib/utils'
import {
  Presentation,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  GripVertical,
} from 'lucide-react'

interface ConferencesSectionProps {
  isOpen: boolean
  onToggle: () => void
}

const roleOptions = [
  { value: 'Speaker', label: 'Speaker' },
  { value: 'Panelist', label: 'Panelist' },
  { value: 'Workshop Leader', label: 'Workshop Leader' },
  { value: 'Organizer', label: 'Organizer' },
  { value: 'Attendee', label: 'Attendee' },
  { value: 'Presenter', label: 'Presenter' },
  { value: 'Keynote Speaker', label: 'Keynote Speaker' },
]

export function ConferencesSection({ isOpen, onToggle }: ConferencesSectionProps) {
  const { currentResume, addConference, updateConference, removeConference } = useResumeStore()
  const conferences = currentResume.conferences || []

  const handleAddConference = () => {
    addConference({
      id: generateId(),
      name: '',
      role: 'Attendee',
      location: '',
      date: '',
      description: '',
    })
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Keynote Speaker':
        return 'bg-purple-100 text-purple-700'
      case 'Speaker':
      case 'Presenter':
        return 'bg-blue-100 text-blue-700'
      case 'Panelist':
        return 'bg-green-100 text-green-700'
      case 'Workshop Leader':
        return 'bg-orange-100 text-orange-700'
      case 'Organizer':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-slate-100 text-slate-700'
    }
  }

  return (
    <Card>
      <CardHeader className="cursor-pointer" onClick={onToggle}>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Presentation className="h-5 w-5 text-violet-600" />
            Conferences & Speaking
            <span className="text-sm font-normal text-slate-500">({conferences.length})</span>
          </CardTitle>
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </CardHeader>
      
      {isOpen && (
        <CardContent className="space-y-4">
          {conferences.length === 0 && (
            <div className="text-center py-8 bg-slate-50 rounded-lg border-2 border-dashed">
              <Presentation className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600 mb-1">No conferences added yet</p>
              <p className="text-sm text-slate-400 mb-4">Add conferences, speaking engagements, or industry events</p>
              <Button onClick={handleAddConference}>
                <Plus className="h-4 w-4 mr-2" />
                Add Conference
              </Button>
            </div>
          )}

          {conferences.map((conf, index) => (
            <div key={conf.id} className="border rounded-lg p-4 space-y-4 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GripVertical className="h-5 w-5 text-slate-300 cursor-grab" />
                  <span className="font-medium text-slate-700">
                    {conf.name || `Conference ${index + 1}`}
                  </span>
                  {conf.role && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getRoleBadgeColor(conf.role)}`}>
                      {conf.role}
                    </span>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeConference(conf.id)}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Conference / Event Name *</Label>
                  <Input
                    value={conf.name}
                    onChange={(e) => updateConference(conf.id, { name: e.target.value })}
                    placeholder="React Summit 2024"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Your Role *</Label>
                  <Select
                    value={conf.role}
                    onValueChange={(value) => updateConference(conf.id, { role: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roleOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={conf.location || ''}
                    onChange={(e) => updateConference(conf.id, { location: e.target.value })}
                    placeholder="San Francisco, CA or Virtual"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input
                    type="month"
                    value={conf.date || ''}
                    onChange={(e) => updateConference(conf.id, { date: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description / Talk Title (Optional)</Label>
                <Textarea
                  value={conf.description || ''}
                  onChange={(e) => updateConference(conf.id, { description: e.target.value })}
                  placeholder="Talk title, topic covered, or key takeaways..."
                  rows={2}
                />
              </div>
            </div>
          ))}

          {conferences.length > 0 && (
            <Button variant="outline" onClick={handleAddConference} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Another Conference
            </Button>
          )}
        </CardContent>
      )}
    </Card>
  )
}