'use client'

import { useState } from 'react'
import {
  PersonalInfoSection,
  SummarySection,
  ExperienceSection,
  EducationSection,
  SkillsSection,
  ProjectsSection,
  CertificationsSection,
  LanguagesSection,
  AwardsSection,
  CoursesSection,
  InternshipsSection,
  VolunteerSection,
  ReferencesSection,
  ConferencesSection,
  HobbiesSection,
  CustomSection,
} from './sections'
import { ProfileStrength } from './profile-strength'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { 
  Plus,
  FolderGit2,
  Award,
  Languages,
  Trophy,
  BookOpen,
  GraduationCap,
  Heart,
  UserCheck,
  Presentation,
  Gamepad2,
  LayoutGrid,
  X,
} from 'lucide-react'

// Define available optional sections with colors
const optionalSections = [
  { id: 'projects', name: 'Projects', icon: FolderGit2, description: 'Showcase personal or professional projects', iconColor: 'text-orange-500', bgColor: 'bg-orange-50' },
  { id: 'certifications', name: 'Certifications', icon: Award, description: 'Professional certifications and licenses', iconColor: 'text-purple-500', bgColor: 'bg-purple-50' },
  { id: 'languages', name: 'Languages', icon: Languages, description: 'Languages you speak', iconColor: 'text-blue-500', bgColor: 'bg-blue-50' },
  { id: 'awards', name: 'Awards & Honors', icon: Trophy, description: 'Achievements and recognitions', iconColor: 'text-yellow-600', bgColor: 'bg-yellow-50' },
  { id: 'courses', name: 'Courses', icon: BookOpen, description: 'Online courses and training', iconColor: 'text-cyan-500', bgColor: 'bg-cyan-50' },
  { id: 'internships', name: 'Internships', icon: GraduationCap, description: 'Internship experiences', iconColor: 'text-indigo-500', bgColor: 'bg-indigo-50' },
  { id: 'volunteer', name: 'Volunteer', icon: Heart, description: 'Community involvement', iconColor: 'text-rose-500', bgColor: 'bg-rose-50' },
  { id: 'references', name: 'References', icon: UserCheck, description: 'Professional references', iconColor: 'text-emerald-500', bgColor: 'bg-emerald-50' },
  { id: 'conferences', name: 'Conferences', icon: Presentation, description: 'Speaking engagements and events', iconColor: 'text-violet-500', bgColor: 'bg-violet-50' },
  { id: 'hobbies', name: 'Hobbies', icon: Gamepad2, description: 'Interests and hobbies', iconColor: 'text-pink-500', bgColor: 'bg-pink-50' },
  { id: 'custom', name: 'Custom Section', icon: LayoutGrid, description: 'Add your own section', iconColor: 'text-slate-500', bgColor: 'bg-slate-100' },
]

export function ResumeEditor() {
  const [openSections, setOpenSections] = useState<string[]>(['personal', 'summary'])
  const [enabledSections, setEnabledSections] = useState<string[]>([
    'personal', 'summary', 'experience', 'education', 'skills'
  ])
  const [addSectionDialogOpen, setAddSectionDialogOpen] = useState(false)

  const toggleSection = (section: string) => {
    setOpenSections(prev =>  
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    )
  }

  const addSection = (sectionId: string) => {
    if (!enabledSections.includes(sectionId)) {
      setEnabledSections(prev => [...prev, sectionId])
      setOpenSections(prev => [...prev, sectionId])
    }
    setAddSectionDialogOpen(false)
  }

  const removeSection = (sectionId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setEnabledSections(prev => prev.filter(s => s !== sectionId))
    setOpenSections(prev => prev.filter(s => s !== sectionId))
  }

  return (
    <div className="space-y-4">
      {/* Profile Strength */}
      <ProfileStrength />

      {/* Core Sections - Always visible */}
      <PersonalInfoSection 
        isOpen={openSections.includes('personal')} 
        onToggle={() => toggleSection('personal')} 
      />
      
      <SummarySection 
        isOpen={openSections.includes('summary')} 
        onToggle={() => toggleSection('summary')} 
      />
      
      <ExperienceSection 
        isOpen={openSections.includes('experience')} 
        onToggle={() => toggleSection('experience')} 
      />
      
      <EducationSection 
        isOpen={openSections.includes('education')} 
        onToggle={() => toggleSection('education')} 
      />
      
      <SkillsSection 
        isOpen={openSections.includes('skills')} 
        onToggle={() => toggleSection('skills')} 
      />

      {/* Optional Sections - Only show if enabled */}
      {enabledSections.includes('projects') && (
        <ProjectsSection 
          isOpen={openSections.includes('projects')} 
          onToggle={() => toggleSection('projects')} 
        />
      )}

      {enabledSections.includes('certifications') && (
        <CertificationsSection 
          isOpen={openSections.includes('certifications')} 
          onToggle={() => toggleSection('certifications')} 
        />
      )}

      {enabledSections.includes('languages') && (
        <LanguagesSection 
          isOpen={openSections.includes('languages')} 
          onToggle={() => toggleSection('languages')} 
        />
      )}

      {enabledSections.includes('awards') && (
        <AwardsSection 
          isOpen={openSections.includes('awards')} 
          onToggle={() => toggleSection('awards')} 
        />
      )}

      {enabledSections.includes('courses') && (
        <CoursesSection 
          isOpen={openSections.includes('courses')} 
          onToggle={() => toggleSection('courses')} 
        />
      )}

      {enabledSections.includes('internships') && (
        <InternshipsSection 
          isOpen={openSections.includes('internships')} 
          onToggle={() => toggleSection('internships')} 
        />
      )}

      {enabledSections.includes('volunteer') && (
        <VolunteerSection 
          isOpen={openSections.includes('volunteer')} 
          onToggle={() => toggleSection('volunteer')} 
        />
      )}

      {enabledSections.includes('references') && (
        <ReferencesSection 
          isOpen={openSections.includes('references')} 
          onToggle={() => toggleSection('references')} 
        />
      )}

      {enabledSections.includes('conferences') && (
        <ConferencesSection 
          isOpen={openSections.includes('conferences')} 
          onToggle={() => toggleSection('conferences')} 
        />
      )}

      {enabledSections.includes('hobbies') && (
        <HobbiesSection 
          isOpen={openSections.includes('hobbies')} 
          onToggle={() => toggleSection('hobbies')} 
        />
      )}

      {enabledSections.includes('custom') && (
        <CustomSection 
          isOpen={openSections.includes('custom')} 
          onToggle={() => toggleSection('custom')} 
        />
      )}

      {/* Add Section Button */}
      <Dialog open={addSectionDialogOpen} onOpenChange={setAddSectionDialogOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full border-dashed border-2 h-14 text-slate-500 hover:text-slate-700 hover:border-slate-400 hover:bg-slate-50 transition-all"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Section
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] p-0 gap-0 overflow-hidden bg-white">
          <DialogHeader className="px-6 pt-6 pb-4 border-b bg-slate-50">
            <DialogTitle className="text-xl font-semibold">Add Resume Section</DialogTitle>
            <DialogDescription className="text-slate-500">
              Choose additional sections to enhance your resume
            </DialogDescription>
          </DialogHeader>
          
          <div className="p-4 max-h-[60vh] overflow-y-auto">
            <div className="grid gap-2">
              {optionalSections.map((section) => {
                const isEnabled = enabledSections.includes(section.id)
                const Icon = section.icon
                
                return (
                  <div
                    key={section.id}
                    onClick={() => !isEnabled && addSection(section.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        if (!isEnabled) addSection(section.id)
                      }
                    }}
                    className={`
                      flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all w-full
                      ${isEnabled 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm cursor-pointer'
                      }
                    `}
                  >
                    <div className={`p-3 rounded-xl ${isEnabled ? 'bg-green-100' : section.bgColor}`}>
                      <Icon className={`h-5 w-5 ${isEnabled ? 'text-green-600' : section.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-slate-900 text-base">{section.name}</div>
                      <div className="text-sm text-slate-500">{section.description}</div>
                    </div>
                    {isEnabled ? (
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-semibold text-green-700 bg-green-100 px-3 py-1.5 rounded-full">
                          Added
                        </span>
                        <button
                          onClick={(e) => removeSection(section.id, e)}
                          className="p-1.5 rounded-full hover:bg-red-100 text-slate-400 hover:text-red-500 transition-colors"
                          title="Remove section"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="p-2 rounded-full bg-slate-100 shrink-0">
                        <Plus className="h-5 w-5 text-slate-400" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
          
          <div className="px-6 py-4 border-t bg-slate-50">
            <p className="text-xs text-slate-500 text-center">
              You can remove sections anytime by clicking the X button
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}