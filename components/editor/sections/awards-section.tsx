'use client'

import { useResumeStore } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { generateId } from '@/lib/utils'
import {
  Trophy,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  GripVertical,
} from 'lucide-react'

interface AwardsSectionProps {
  isOpen: boolean
  onToggle: () => void
}

export function AwardsSection({ isOpen, onToggle }: AwardsSectionProps) {
  const { currentResume, addAward, updateAward, removeAward } = useResumeStore()
  const awards = currentResume.awards || []

  const handleAddAward = () => {
    addAward({
      id: generateId(),
      title: '',
      issuer: '',
      date: '',
      description: '',
    })
  }

  return (
    <Card>
      <CardHeader className="cursor-pointer" onClick={onToggle}>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Trophy className="h-5 w-5 text-yellow-600" />
            Awards & Honors
            <span className="text-sm font-normal text-slate-500">({awards.length})</span>
          </CardTitle>
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </CardHeader>
      
      {isOpen && (
        <CardContent className="space-y-4">
          {awards.length === 0 && (
            <div className="text-center py-8 bg-slate-50 rounded-lg border-2 border-dashed">
              <Trophy className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600 mb-1">No awards added yet</p>
              <p className="text-sm text-slate-400 mb-4">Highlight your achievements and recognitions</p>
              <Button onClick={handleAddAward}>
                <Plus className="h-4 w-4 mr-2" />
                Add Award
              </Button>
            </div>
          )}

          {awards.map((award, index) => (
            <div key={award.id} className="border rounded-lg p-4 space-y-4 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GripVertical className="h-5 w-5 text-slate-300 cursor-grab" />
                  <span className="font-medium text-slate-700">
                    {award.title || `Award ${index + 1}`}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeAward(award.id)}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Award Title *</Label>
                  <Input
                    value={award.title}
                    onChange={(e) => updateAward(award.id, { title: e.target.value })}
                    placeholder="Employee of the Year"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Issuing Organization *</Label>
                  <Input
                    value={award.issuer}
                    onChange={(e) => updateAward(award.id, { issuer: e.target.value })}
                    placeholder="Company Name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Date Received</Label>
                <Input
                  type="month"
                  value={award.date || ''}
                  onChange={(e) => updateAward(award.id, { date: e.target.value })}
                  className="w-48"
                />
              </div>

              <div className="space-y-2">
                <Label>Description (Optional)</Label>
                <Textarea
                  value={award.description || ''}
                  onChange={(e) => updateAward(award.id, { description: e.target.value })}
                  placeholder="Briefly describe the award and why you received it..."
                  rows={2}
                />
              </div>
            </div>
          ))}

          {awards.length > 0 && (
            <Button variant="outline" onClick={handleAddAward} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Another Award
            </Button>
          )}
        </CardContent>
      )}
    </Card>
  )
}