'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Check, Loader2 } from 'lucide-react'

const templates = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Clean and modern design perfect for corporate jobs',
    type: 'resume',
    isAts: true,
    layout: 'single',
    headerColor: '#1e40af',
    accentColor: '#dbeafe',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary two-column layout with sidebar',
    type: 'resume',
    isAts: true,
    layout: 'two-column',
    headerColor: '#0f172a',
    accentColor: '#f1f5f9',
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Sophisticated design with subtle accents',
    type: 'resume',
    isAts: true,
    layout: 'single',
    headerColor: '#78350f',
    accentColor: '#fef3c7',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and clean with maximum readability',
    type: 'resume',
    isAts: true,
    layout: 'single',
    headerColor: '#171717',
    accentColor: '#f5f5f5',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold design for creative professionals',
    type: 'resume',
    isAts: false,
    layout: 'two-column',
    headerColor: '#7c3aed',
    accentColor: '#ede9fe',
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Premium design for senior professionals',
    type: 'resume',
    isAts: true,
    layout: 'single',
    headerColor: '#0c4a6e',
    accentColor: '#e0f2fe',
  },
  {
    id: 'tech',
    name: 'Tech',
    description: 'Modern design for tech professionals',
    type: 'resume',
    isAts: true,
    layout: 'two-column',
    headerColor: '#059669',
    accentColor: '#d1fae5',
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional format that works for any industry',
    type: 'resume',
    isAts: true,
    layout: 'single',
    headerColor: '#1f2937',
    accentColor: '#f3f4f6',
  },
]

// Pre-defined widths to avoid Math.random() during render
const skillWidths = [12, 18, 14, 16, 13, 17, 15, 19, 11, 14]
const sidebarSkillWidths = [14, 18, 12, 16, 15, 20]

// Realistic template preview component
function TemplatePreview({ template }: { template: typeof templates[0] }) {
  const isTwoColumn = template.layout === 'two-column'

  return (
    <div className="w-full h-full bg-white rounded overflow-hidden" style={{ fontSize: '4px' }}>
      {isTwoColumn ? (
        // Two Column Layout
        <div className="flex h-full">
          {/* Sidebar */}
          <div 
            className="w-[35%] p-2 text-white"
            style={{ backgroundColor: template.headerColor }}
          >
            {/* Name */}
            <div className="mb-3">
              <div className="h-2 bg-white/90 rounded w-16 mb-1" />
              <div className="h-2 bg-white/60 rounded w-12" />
            </div>
            
            {/* Contact */}
            <div className="mb-3">
              <div className="h-1 bg-white/40 rounded w-8 mb-1" />
              <div className="space-y-0.5">
                <div className="h-1 bg-white/60 rounded w-14" />
                <div className="h-1 bg-white/60 rounded w-12" />
                <div className="h-1 bg-white/60 rounded w-10" />
              </div>
            </div>
            
            {/* Skills */}
            <div className="mb-3">
              <div className="h-1 bg-white/40 rounded w-6 mb-1" />
              <div className="flex flex-wrap gap-0.5">
                {sidebarSkillWidths.map((width, i) => (
                  <div 
                    key={i} 
                    className="h-1.5 bg-white/30 rounded" 
                    style={{ width: `${width}px` }} 
                  />
                ))}
              </div>
            </div>
            
            {/* Education */}
            <div>
              <div className="h-1 bg-white/40 rounded w-8 mb-1" />
              <div className="h-1.5 bg-white/60 rounded w-14 mb-0.5" />
              <div className="h-1 bg-white/40 rounded w-12" />
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 p-2">
            {/* Summary */}
            <div className="mb-3">
              <div className="h-1.5 rounded w-10 mb-1" style={{ backgroundColor: template.headerColor }} />
              <div className="space-y-0.5">
                <div className="h-1 bg-slate-200 rounded w-full" />
                <div className="h-1 bg-slate-200 rounded w-[90%]" />
                <div className="h-1 bg-slate-200 rounded w-[70%]" />
              </div>
            </div>
            
            {/* Experience */}
            <div className="mb-3">
              <div className="h-1.5 rounded w-12 mb-1" style={{ backgroundColor: template.headerColor }} />
              {[0, 1].map((i) => (
                <div key={i} className="mb-2">
                  <div className="flex justify-between mb-0.5">
                    <div className="h-1.5 bg-slate-300 rounded w-16" />
                    <div className="h-1 bg-slate-200 rounded w-8" />
                  </div>
                  <div className="h-1 bg-slate-200 rounded w-12 mb-0.5" />
                  <div className="space-y-0.5 ml-1">
                    <div className="h-1 bg-slate-100 rounded w-[95%]" />
                    <div className="h-1 bg-slate-100 rounded w-[85%]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Single Column Layout
        <div className="p-2">
          {/* Header */}
          <div className="text-center mb-2 pb-1" style={{ borderBottom: `1px solid ${template.headerColor}` }}>
            <div className="h-2.5 rounded w-20 mx-auto mb-1" style={{ backgroundColor: template.headerColor }} />
            <div className="flex justify-center gap-1">
              <div className="h-1 bg-slate-300 rounded w-12" />
              <div className="h-1 bg-slate-300 rounded w-10" />
              <div className="h-1 bg-slate-300 rounded w-8" />
            </div>
          </div>
          
          {/* Summary */}
          <div className="mb-2">
            <div className="h-1.5 rounded w-14 mb-1" style={{ backgroundColor: template.headerColor }} />
            <div className="space-y-0.5">
              <div className="h-1 rounded w-full" style={{ backgroundColor: template.accentColor }} />
              <div className="h-1 rounded w-[90%]" style={{ backgroundColor: template.accentColor }} />
            </div>
          </div>
          
          {/* Experience */}
          <div className="mb-2">
            <div className="h-1.5 rounded w-12 mb-1" style={{ backgroundColor: template.headerColor }} />
            {[0, 1].map((i) => (
              <div key={i} className="mb-1.5">
                <div className="flex justify-between mb-0.5">
                  <div className="h-1.5 bg-slate-300 rounded w-14" />
                  <div className="h-1 bg-slate-200 rounded w-8" />
                </div>
                <div className="h-1 bg-slate-200 rounded w-10 mb-0.5" />
                <div className="space-y-0.5">
                  <div className="h-1 rounded w-[95%]" style={{ backgroundColor: template.accentColor }} />
                  <div className="h-1 rounded w-[80%]" style={{ backgroundColor: template.accentColor }} />
                </div>
              </div>
            ))}
          </div>
          
          {/* Education */}
          <div className="mb-2">
            <div className="h-1.5 rounded w-10 mb-1" style={{ backgroundColor: template.headerColor }} />
            <div className="flex justify-between">
              <div className="h-1.5 bg-slate-300 rounded w-16" />
              <div className="h-1 bg-slate-200 rounded w-6" />
            </div>
            <div className="h-1 bg-slate-200 rounded w-14 mt-0.5" />
          </div>
          
          {/* Skills */}
          <div>
            <div className="h-1.5 rounded w-8 mb-1" style={{ backgroundColor: template.headerColor }} />
            <div className="flex flex-wrap gap-0.5">
              {skillWidths.map((width, i) => (
                <div 
                  key={i} 
                  className="h-1.5 rounded" 
                  style={{ 
                    backgroundColor: template.accentColor,
                    width: `${width}px`
                  }} 
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleUseTemplate = async (templateId: string) => {
    setSelectedTemplate(templateId)
    setIsCreating(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        toast.error('Please sign in to create a resume')
        router.push('/login')
        return
      }

      const template = templates.find(t => t.id === templateId)

      const defaultContent = {
        personalInfo: {
          firstName: '',
          lastName: '',
          email: user.email || '',
          phone: '',
          location: '',
          website: '',
          linkedin: '',
          github: '',
          portfolio: '',
        },
        summary: '',
        experience: [],
        education: [],
        skills: [],
        certifications: [],
        projects: [],
        languages: [],
        customSections: [],
        settings: {
          fontFamily: 'Inter',
          fontSize: 'medium',
          colorScheme: templateId,
          lineSpacing: 'normal',
          sectionOrder: ['personal-info', 'summary', 'experience', 'education', 'skills', 'projects'],
          showProfileImage: false,
          showIcons: true,
        },
      }

      const { data: resume, error } = await supabase
        .from('resumes')
        .insert({
          user_id: user.id,
          title: `${template?.name || 'New'} Resume`,
          template_id: templateId,
          content: defaultContent,
        })
        .select()
        .single()

      if (error) throw error

      toast.success('Resume created!', {
        description: `Using ${template?.name} template`,
      })

      router.push(`/resumes/${resume.id}/edit`)
    } catch (error) {
      console.error('Error creating resume:', error)
      toast.error('Failed to create resume')
    } finally {
      setIsCreating(false)
      setSelectedTemplate(null)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Resume Templates</h1>
        <p className="text-slate-600 mt-2">
          Choose from our collection of professional, ATS-friendly templates
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        <Badge variant="secondary" className="cursor-pointer">All Templates</Badge>
        <Badge variant="outline" className="cursor-pointer">ATS-Friendly</Badge>
        <Badge variant="outline" className="cursor-pointer">Two-Column</Badge>
        <Badge variant="outline" className="cursor-pointer">Single Column</Badge>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {templates.map((template) => (
          <Card 
            key={template.id} 
            className="group hover:shadow-lg transition-all cursor-pointer overflow-hidden"
          >
            <CardContent className="p-0">
              {/* Template Preview */}
              <div className="aspect-[8.5/11] bg-slate-100 relative overflow-hidden">
                <div className="absolute inset-2">
                  <TemplatePreview template={template} />
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    onClick={() => handleUseTemplate(template.id)}
                    disabled={isCreating && selectedTemplate === template.id}
                  >
                    {isCreating && selectedTemplate === template.id ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Check className="h-4 w-4 mr-2" />
                    )}
                    Use Template
                  </Button>
                </div>

                {/* ATS Badge */}
                {template.isAts && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-green-500 text-white text-xs">
                      ATS-Friendly
                    </Badge>
                  </div>
                )}
              </div>

              {/* Template Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-slate-900">{template.name}</h3>
                  <Badge variant="outline" className="text-xs capitalize">
                    {template.type}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600">{template.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}