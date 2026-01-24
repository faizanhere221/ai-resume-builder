'use client'

import { useState } from 'react'
import { useResumeStore } from '@/lib/store'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  GripVertical,
  ChevronUp,
  ChevronDown,
  Layers,
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Award,
  Languages,
  Trophy,
  BookOpen,
  Heart,
  UserCheck,
  Presentation,
  Gamepad2,
  LayoutGrid,
  Eye,
  EyeOff,
  Sparkles,
  ArrowUpDown,
} from 'lucide-react'

// Section configuration with icons and colors
const sectionConfig: Record<string, { 
  label: string
  icon: React.ElementType
  required?: boolean
  color: string
  bgColor: string
}> = {
  'personal-info': { label: 'Personal Info', icon: User, required: true, color: 'text-blue-600', bgColor: 'bg-blue-100' },
  'summary': { label: 'Professional Summary', icon: FileText, required: true, color: 'text-indigo-600', bgColor: 'bg-indigo-100' },
  'experience': { label: 'Work Experience', icon: Briefcase, color: 'text-green-600', bgColor: 'bg-green-100' },
  'education': { label: 'Education', icon: GraduationCap, color: 'text-purple-600', bgColor: 'bg-purple-100' },
  'skills': { label: 'Skills', icon: Wrench, color: 'text-orange-600', bgColor: 'bg-orange-100' },
  'projects': { label: 'Projects', icon: FolderGit2, color: 'text-amber-600', bgColor: 'bg-amber-100' },
  'certifications': { label: 'Certifications', icon: Award, color: 'text-cyan-600', bgColor: 'bg-cyan-100' },
  'languages': { label: 'Languages', icon: Languages, color: 'text-pink-600', bgColor: 'bg-pink-100' },
  'awards': { label: 'Awards', icon: Trophy, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
  'courses': { label: 'Courses', icon: BookOpen, color: 'text-teal-600', bgColor: 'bg-teal-100' },
  'internships': { label: 'Internships', icon: GraduationCap, color: 'text-violet-600', bgColor: 'bg-violet-100' },
  'volunteer': { label: 'Volunteer', icon: Heart, color: 'text-rose-600', bgColor: 'bg-rose-100' },
  'references': { label: 'References', icon: UserCheck, color: 'text-emerald-600', bgColor: 'bg-emerald-100' },
  'conferences': { label: 'Conferences', icon: Presentation, color: 'text-fuchsia-600', bgColor: 'bg-fuchsia-100' },
  'hobbies': { label: 'Hobbies', icon: Gamepad2, color: 'text-lime-600', bgColor: 'bg-lime-100' },
  'custom': { label: 'Custom Sections', icon: LayoutGrid, color: 'text-slate-600', bgColor: 'bg-slate-100' },
}

// All available sections
const allSections = [
  'personal-info',
  'summary',
  'experience',
  'education',
  'skills',
  'projects',
  'certifications',
  'languages',
  'awards',
  'courses',
  'internships',
  'volunteer',
  'references',
  'conferences',
  'hobbies',
  'custom',
]

export function SectionReorder() {
  const { currentResume, reorderSections, toggleSection } = useResumeStore()
  const sectionOrder = currentResume.settings.sectionOrder
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [dragOverItem, setDragOverItem] = useState<string | null>(null)

  // Get sections not in current order (hidden sections)
  const hiddenSections = allSections.filter(s => !sectionOrder.includes(s))

  const handleDragStart = (e: React.DragEvent, sectionId: string) => {
    const config = sectionConfig[sectionId]
    if (config?.required) return
    
    setDraggedItem(sectionId)
    e.dataTransfer.effectAllowed = 'move'
    const target = e.target as HTMLElement
    setTimeout(() => {
      target.style.opacity = '0.5'
    }, 0)
  }

  const handleDragEnd = (e: React.DragEvent) => {
    const target = e.target as HTMLElement
    target.style.opacity = '1'
    setDraggedItem(null)
    setDragOverItem(null)
  }

  const handleDragOver = (e: React.DragEvent, sectionId: string) => {
    e.preventDefault()
    if (draggedItem && draggedItem !== sectionId) {
      setDragOverItem(sectionId)
    }
  }

  const handleDragLeave = () => {
    setDragOverItem(null)
  }

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault()
    if (!draggedItem || draggedItem === targetId) return

    const newOrder = [...sectionOrder]
    const draggedIndex = newOrder.indexOf(draggedItem)
    const targetIndex = newOrder.indexOf(targetId)

    if (draggedIndex !== -1 && targetIndex !== -1) {
      newOrder.splice(draggedIndex, 1)
      newOrder.splice(targetIndex, 0, draggedItem)
      reorderSections(newOrder)
    }

    setDraggedItem(null)
    setDragOverItem(null)
  }

  const moveSection = (sectionId: string, direction: 'up' | 'down') => {
    const currentIndex = sectionOrder.indexOf(sectionId)
    if (currentIndex === -1) return

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    if (newIndex < 0 || newIndex >= sectionOrder.length) return

    const newOrder = [...sectionOrder]
    newOrder.splice(currentIndex, 1)
    newOrder.splice(newIndex, 0, sectionId)
    reorderSections(newOrder)
  }

  const handleToggleSection = (sectionId: string) => {
    const config = sectionConfig[sectionId]
    if (config?.required) return
    toggleSection(sectionId)
  }

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div>
        <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
          <ArrowUpDown className="h-5 w-5 text-teal-500" />
          Section Order
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Drag sections to reorder or toggle visibility
        </p>
      </div>

      {/* Active Sections */}
      <Card className="overflow-hidden border-0 shadow-sm">
        <div className="bg-gradient-to-r from-teal-500 to-emerald-500 px-5 py-3">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Visible Sections
            <Badge variant="secondary" className="ml-2 bg-white/20 text-white hover:bg-white/30">
              {sectionOrder.length}
            </Badge>
          </h3>
        </div>
        <CardContent className="p-4">
          <div className="space-y-2">
            {sectionOrder.map((sectionId, index) => {
              const config = sectionConfig[sectionId]
              if (!config) return null
              const Icon = config.icon

              return (
                <div
                  key={sectionId}
                  draggable={!config.required}
                  onDragStart={(e) => handleDragStart(e, sectionId)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => handleDragOver(e, sectionId)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, sectionId)}
                  className={`
                    flex items-center gap-3 p-3 rounded-xl border-2 bg-white transition-all
                    ${dragOverItem === sectionId ? 'border-teal-400 bg-teal-50 scale-[1.02]' : 'border-slate-100'}
                    ${draggedItem === sectionId ? 'opacity-50' : ''}
                    ${!config.required ? 'cursor-grab active:cursor-grabbing hover:border-slate-200 hover:shadow-sm' : ''}
                  `}
                >
                  {/* Drag Handle */}
                  <div className={`${config.required ? 'opacity-0' : 'text-slate-300 hover:text-slate-400'}`}>
                    <GripVertical className="h-5 w-5" />
                  </div>

                  {/* Icon */}
                  <div className={`p-2 rounded-lg ${config.bgColor}`}>
                    <Icon className={`h-4 w-4 ${config.color}`} />
                  </div>

                  {/* Label */}
                  <div className="flex-1">
                    <span className="font-medium text-slate-800">{config.label}</span>
                    {config.required && (
                      <Badge variant="outline" className="ml-2 text-xs border-slate-200">
                        Required
                      </Badge>
                    )}
                  </div>
                  
                  {/* Move Buttons */}
                  <div className="flex items-center gap-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-slate-400 hover:text-slate-600"
                            onClick={() => moveSection(sectionId, 'up')}
                            disabled={index === 0}
                          >
                            <ChevronUp className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">Move up</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-slate-400 hover:text-slate-600"
                            onClick={() => moveSection(sectionId, 'down')}
                            disabled={index === sectionOrder.length - 1}
                          >
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">Move down</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  {/* Toggle Switch */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <Switch
                            checked={true}
                            onCheckedChange={() => handleToggleSection(sectionId)}
                            disabled={config.required}
                            className="data-[state=checked]:bg-teal-500"
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="left">
                        {config.required ? 'Required section' : 'Toggle visibility'}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Hidden Sections */}
      {hiddenSections.length > 0 && (
        <Card className="overflow-hidden border-0 shadow-sm">
          <div className="bg-gradient-to-r from-slate-400 to-slate-500 px-5 py-3">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <EyeOff className="h-4 w-4" />
              Hidden Sections
              <Badge variant="secondary" className="ml-2 bg-white/20 text-white hover:bg-white/30">
                {hiddenSections.length}
              </Badge>
            </h3>
          </div>
          <CardContent className="p-4">
            <div className="space-y-2">
              {hiddenSections.map((sectionId) => {
                const config = sectionConfig[sectionId]
                if (!config) return null
                const Icon = config.icon

                return (
                  <div
                    key={sectionId}
                    className="flex items-center gap-3 p-3 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50"
                  >
                    {/* Empty space for alignment */}
                    <div className="w-5" />

                    {/* Icon (grayed out) */}
                    <div className="p-2 rounded-lg bg-slate-100">
                      <Icon className="h-4 w-4 text-slate-400" />
                    </div>

                    {/* Label */}
                    <div className="flex-1">
                      <span className="font-medium text-slate-500">{config.label}</span>
                    </div>

                    {/* Add Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleSection(sectionId)}
                      className="text-teal-600 border-teal-200 hover:bg-teal-50 hover:border-teal-300"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Show
                    </Button>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pro Tip */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
        <Sparkles className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-medium text-amber-800">Pro Tip</p>
          <p className="text-sm text-amber-700 mt-0.5">
            Put your strongest sections at the top. Recruiters spend about 6 seconds on initial resume review!
          </p>
        </div>
      </div>
    </div>
  )
}