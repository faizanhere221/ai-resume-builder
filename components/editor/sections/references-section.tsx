'use client'

import { useResumeStore } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { generateId } from '@/lib/utils'
import {
  UserCheck,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  GripVertical,
  Mail,
  Phone,
} from 'lucide-react'

interface ReferencesSectionProps {
  isOpen: boolean
  onToggle: () => void
}

export function ReferencesSection({ isOpen, onToggle }: ReferencesSectionProps) {
  const { currentResume, addReference, updateReference, removeReference } = useResumeStore()
  const references = currentResume.references || []

  const handleAddReference = () => {
    addReference({
      id: generateId(),
      name: '',
      company: '',
      position: '',
      email: '',
      phone: '',
      relationship: '',
    })
  }

  return (
    <Card>
      <CardHeader className="cursor-pointer" onClick={onToggle}>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <UserCheck className="h-5 w-5 text-emerald-600" />
            References
            <span className="text-sm font-normal text-slate-500">({references.length})</span>
          </CardTitle>
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </CardHeader>
      
      {isOpen && (
        <CardContent className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
            <strong>Tip:</strong> Only include references if specifically requested. Many employers prefer &quot;References available upon request&quot; on the resume.
          </div>

          {references.length === 0 && (
            <div className="text-center py-8 bg-slate-50 rounded-lg border-2 border-dashed">
              <UserCheck className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600 mb-1">No references added yet</p>
              <p className="text-sm text-slate-400 mb-4">Add professional references who can vouch for your work</p>
              <Button onClick={handleAddReference}>
                <Plus className="h-4 w-4 mr-2" />
                Add Reference
              </Button>
            </div>
          )}

          {references.map((ref, index) => (
            <div key={ref.id} className="border rounded-lg p-4 space-y-4 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GripVertical className="h-5 w-5 text-slate-300 cursor-grab" />
                  <span className="font-medium text-slate-700">
                    {ref.name || `Reference ${index + 1}`}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeReference(ref.id)}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name *</Label>
                  <Input
                    value={ref.name}
                    onChange={(e) => updateReference(ref.id, { name: e.target.value })}
                    placeholder="John Smith"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Relationship</Label>
                  <Input
                    value={ref.relationship || ''}
                    onChange={(e) => updateReference(ref.id, { relationship: e.target.value })}
                    placeholder="Former Manager"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company *</Label>
                  <Input
                    value={ref.company}
                    onChange={(e) => updateReference(ref.id, { company: e.target.value })}
                    placeholder="Google"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Position / Title *</Label>
                  <Input
                    value={ref.position}
                    onChange={(e) => updateReference(ref.id, { position: e.target.value })}
                    placeholder="Senior Engineering Manager"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      type="email"
                      value={ref.email || ''}
                      onChange={(e) => updateReference(ref.id, { email: e.target.value })}
                      placeholder="john.smith@example.com"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      type="tel"
                      value={ref.phone || ''}
                      onChange={(e) => updateReference(ref.id, { phone: e.target.value })}
                      placeholder="+1 (555) 123-4567"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {references.length > 0 && (
            <Button variant="outline" onClick={handleAddReference} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Another Reference
            </Button>
          )}
        </CardContent>
      )}
    </Card>
  )
}