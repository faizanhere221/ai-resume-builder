'use client'

import { useResumeStore } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { generateId } from '@/lib/utils'
import {
  LayoutGrid,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  GripVertical,
  PencilLine,
} from 'lucide-react'

interface CustomSectionProps {
  isOpen: boolean
  onToggle: () => void
}

export function CustomSection({ isOpen, onToggle }: CustomSectionProps) {
  const { 
    currentResume, 
    addCustomSection, 
    updateCustomSection,
    removeCustomSection,
    addCustomSectionItem,
    updateCustomSectionItem,
    removeCustomSectionItem,
  } = useResumeStore()
  const customSections = currentResume.customSections || []

  const handleAddSection = () => {
    addCustomSection({
      id: generateId(),
      title: 'Custom Section',
      items: [],
    })
  }

  const handleAddItem = (sectionId: string) => {
    addCustomSectionItem(sectionId, {
      id: generateId(),
      title: '',
      subtitle: '',
      date: '',
      description: '',
    })
  }

  return (
    <Card>
      <CardHeader className="cursor-pointer" onClick={onToggle}>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <LayoutGrid className="h-5 w-5 text-slate-600" />
            Custom Sections
            <span className="text-sm font-normal text-slate-500">({customSections.length})</span>
          </CardTitle>
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </CardHeader>
      
      {isOpen && (
        <CardContent className="space-y-4">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm text-slate-700">
            <strong>Custom Sections</strong> let you add any information that doesn&apos;t fit standard categories - publications, patents, memberships, or anything else!
          </div>

          {customSections.length === 0 && (
            <div className="text-center py-8 bg-slate-50 rounded-lg border-2 border-dashed">
              <LayoutGrid className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600 mb-1">No custom sections added yet</p>
              <p className="text-sm text-slate-400 mb-4">Create sections for publications, patents, memberships, etc.</p>
              <Button onClick={handleAddSection}>
                <Plus className="h-4 w-4 mr-2" />
                Add Custom Section
              </Button>
            </div>
          )}

          {customSections.map((section) => (
            <div key={section.id} className="border rounded-lg overflow-hidden bg-white">
              {/* Section Header */}
              <div className="bg-slate-50 p-4 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1">
                    <GripVertical className="h-5 w-5 text-slate-300 cursor-grab" />
                    <PencilLine className="h-4 w-4 text-slate-400" />
                    <Input
                      value={section.title}
                      onChange={(e) => updateCustomSection(section.id, { title: e.target.value })}
                      placeholder="Section Title"
                      className="border-0 bg-transparent font-semibold text-lg p-0 h-auto focus-visible:ring-0"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCustomSection(section.id)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Section Items */}
              <div className="p-4 space-y-4">
                {section.items.length === 0 && (
                  <div className="text-center py-4 text-slate-500 text-sm">
                    No items in this section yet
                  </div>
                )}

                {section.items.map((item, index) => (
                  <div key={item.id} className="border rounded-lg p-4 space-y-3 bg-slate-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GripVertical className="h-4 w-4 text-slate-300 cursor-grab" />
                        <span className="text-sm font-medium text-slate-600">
                          Item {index + 1}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCustomSectionItem(section.id, item.id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 w-8 p-0"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Title</Label>
                        <Input
                          value={item.title}
                          onChange={(e) => updateCustomSectionItem(section.id, item.id, { title: e.target.value })}
                          placeholder="Item title"
                          className="h-9"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Subtitle</Label>
                        <Input
                          value={item.subtitle || ''}
                          onChange={(e) => updateCustomSectionItem(section.id, item.id, { subtitle: e.target.value })}
                          placeholder="Subtitle or organization"
                          className="h-9"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs">Date</Label>
                      <Input
                        value={item.date || ''}
                        onChange={(e) => updateCustomSectionItem(section.id, item.id, { date: e.target.value })}
                        placeholder="e.g., 2024 or Jan 2024 - Present"
                        className="h-9 w-48"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs">Description</Label>
                      <Textarea
                        value={item.description || ''}
                        onChange={(e) => updateCustomSectionItem(section.id, item.id, { description: e.target.value })}
                        placeholder="Additional details..."
                        rows={2}
                        className="resize-none"
                      />
                    </div>
                  </div>
                ))}

                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleAddItem(section.id)} 
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item to {section.title || 'Section'}
                </Button>
              </div>
            </div>
          ))}

          {customSections.length > 0 && (
            <Button variant="outline" onClick={handleAddSection} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Another Custom Section
            </Button>
          )}
        </CardContent>
      )}
    </Card>
  )
}