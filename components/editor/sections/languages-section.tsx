'use client'

import { useResumeStore } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { generateId } from '@/lib/utils'
import {
  Languages,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
} from 'lucide-react'

interface LanguagesSectionProps {
  isOpen: boolean
  onToggle: () => void
}

const proficiencyLevels = [
  { value: 'basic', label: 'Basic', description: 'Elementary proficiency' },
  { value: 'conversational', label: 'Conversational', description: 'Limited working proficiency' },
  { value: 'professional', label: 'Professional', description: 'Professional working proficiency' },
  { value: 'fluent', label: 'Fluent', description: 'Full professional proficiency' },
  { value: 'native', label: 'Native', description: 'Native or bilingual proficiency' },
] as const

export function LanguagesSection({ isOpen, onToggle }: LanguagesSectionProps) {
  const { currentResume, addLanguage, updateLanguage, removeLanguage } = useResumeStore()
  const languages = currentResume.languages || []

  const handleAddLanguage = () => {
    addLanguage({
      id: generateId(),
      name: '',
      proficiency: 'professional',
    })
  }

  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency) {
      case 'native':
        return 'bg-green-100 text-green-700'
      case 'fluent':
        return 'bg-blue-100 text-blue-700'
      case 'professional':
        return 'bg-purple-100 text-purple-700'
      case 'conversational':
        return 'bg-yellow-100 text-yellow-700'
      case 'basic':
        return 'bg-slate-100 text-slate-700'
      default:
        return 'bg-slate-100 text-slate-700'
    }
  }

  return (
    <Card>
      <CardHeader className="cursor-pointer" onClick={onToggle}>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Languages className="h-5 w-5 text-blue-600" />
            Languages
            <span className="text-sm font-normal text-slate-500">({languages.length})</span>
          </CardTitle>
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </CardHeader>
      
      {isOpen && (
        <CardContent className="space-y-4">
          {languages.length === 0 && (
            <div className="text-center py-8 bg-slate-50 rounded-lg border-2 border-dashed">
              <Languages className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600 mb-1">No languages added yet</p>
              <p className="text-sm text-slate-400 mb-4">Add languages you speak to stand out globally</p>
              <Button onClick={handleAddLanguage}>
                <Plus className="h-4 w-4 mr-2" />
                Add Language
              </Button>
            </div>
          )}

          {languages.length > 0 && (
            <div className="space-y-3">
              {languages.map((lang) => (
                <div key={lang.id} className="flex items-center gap-4 p-3 border rounded-lg bg-white">
                  <div className="flex-1">
                    <Input
                      value={lang.name}
                      onChange={(e) => updateLanguage(lang.id, { name: e.target.value })}
                      placeholder="e.g., English, Spanish, Mandarin"
                      className="border-0 p-0 h-auto text-base font-medium focus-visible:ring-0"
                    />
                  </div>
                  <div className="w-48">
                    <Select
                      value={lang.proficiency}
                      onValueChange={(value: typeof lang.proficiency) => 
                        updateLanguage(lang.id, { proficiency: value })
                      }
                    >
                      <SelectTrigger className={`${getProficiencyColor(lang.proficiency)} border-0`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {proficiencyLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            <div>
                              <div className="font-medium">{level.label}</div>
                              <div className="text-xs text-slate-500">{level.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeLanguage(lang.id)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <Button variant="outline" onClick={handleAddLanguage} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Another Language
            </Button>
          )}
        </CardContent>
      )}
    </Card>
  )
}