'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { 
  Loader2, 
  Sparkles, 
  Shield, 
  Columns2, 
  AlignJustify,
  Eye,
  Star,
  Zap,
  ArrowRight,
} from 'lucide-react'

// Template data - only templates we have built
const templates = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Clean and modern design perfect for corporate jobs',
    isAts: true,
    layout: 'single',
    colorScheme: 'blue',
    bestFor: ['Corporate', 'Finance', 'Healthcare'],
    popular: true,
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Two-column layout with sleek sidebar',
    isAts: true,
    layout: 'two-column',
    colorScheme: 'slate',
    bestFor: ['Tech', 'Startups', 'Marketing'],
    popular: true,
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold gradient design for creative professionals',
    isAts: false,
    layout: 'two-column',
    colorScheme: 'purple',
    bestFor: ['Design', 'Arts', 'Media'],
    popular: false,
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Sophisticated serif design with refined typography',
    isAts: true,
    layout: 'single',
    colorScheme: 'amber',
    bestFor: ['Executive', 'Legal', 'Academia'],
    popular: false,
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Ultra-clean design with maximum readability',
    isAts: true,
    layout: 'single',
    colorScheme: 'neutral',
    bestFor: ['Any Industry', 'Students', 'Freelancers'],
    popular: true,
  },
]

// Sample data for mini preview
const sampleData = {
  name: 'Alex Johnson',
  title: 'Senior Software Engineer',
  skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS'],
}

// Mini Preview Components for Cards
function ProfessionalMiniPreview() {
  return (
    <div className="w-full h-full bg-white p-2 text-[4px] leading-tight">
      <div className="text-center border-b border-blue-600 pb-1 mb-1">
        <div className="text-[7px] font-bold text-slate-900">{sampleData.name}</div>
        <div className="text-[5px] text-blue-600">{sampleData.title}</div>
      </div>
      <div className="mb-1">
        <div className="text-[5px] font-bold text-blue-600 border-b border-slate-200 mb-0.5">Summary</div>
        <div className="h-1.5 bg-slate-100 rounded w-full mb-0.5"></div>
        <div className="h-1.5 bg-slate-100 rounded w-4/5"></div>
      </div>
      <div className="mb-1">
        <div className="text-[5px] font-bold text-blue-600 border-b border-slate-200 mb-0.5">Experience</div>
        <div className="h-1.5 bg-slate-200 rounded w-3/4 mb-0.5"></div>
        <div className="h-1 bg-slate-100 rounded w-full mb-0.5"></div>
        <div className="h-1 bg-slate-100 rounded w-5/6"></div>
      </div>
      <div>
        <div className="text-[5px] font-bold text-blue-600 border-b border-slate-200 mb-0.5">Skills</div>
        <div className="flex flex-wrap gap-0.5">
          {sampleData.skills.slice(0, 4).map((s, i) => (
            <span key={i} className="bg-blue-50 text-blue-700 px-1 rounded text-[3px]">{s}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function ModernMiniPreview() {
  return (
    <div className="w-full h-full bg-white flex text-[4px] leading-tight">
      <div className="w-[35%] bg-slate-800 text-white p-1.5">
        <div className="text-[6px] font-bold">{sampleData.name.split(' ')[0]}</div>
        <div className="text-[6px] font-bold text-slate-400 mb-1">{sampleData.name.split(' ')[1]}</div>
        <div className="text-[4px] text-slate-400 uppercase mb-1">Contact</div>
        <div className="space-y-0.5 text-[3px] text-slate-300 mb-2">
          <div className="h-1 bg-slate-700 rounded w-full"></div>
          <div className="h-1 bg-slate-700 rounded w-4/5"></div>
        </div>
        <div className="text-[4px] text-slate-400 uppercase mb-1">Skills</div>
        <div className="flex flex-wrap gap-0.5">
          {sampleData.skills.slice(0, 3).map((s, i) => (
            <span key={i} className="bg-slate-700 px-1 rounded text-[3px]">{s}</span>
          ))}
        </div>
      </div>
      <div className="flex-1 p-1.5">
        <div className="text-[5px] font-bold text-slate-800 border-b border-slate-800 mb-0.5">About</div>
        <div className="h-1.5 bg-slate-100 rounded w-full mb-0.5"></div>
        <div className="h-1.5 bg-slate-100 rounded w-4/5 mb-2"></div>
        <div className="text-[5px] font-bold text-slate-800 border-b border-slate-800 mb-0.5">Experience</div>
        <div className="h-1.5 bg-slate-200 rounded w-3/4 mb-0.5"></div>
        <div className="h-1 bg-slate-100 rounded w-full"></div>
      </div>
    </div>
  )
}

function CreativeMiniPreview() {
  return (
    <div className="w-full h-full bg-white text-[4px] leading-tight">
      <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white p-2">
        <div className="text-[7px] font-bold">{sampleData.name}</div>
        <div className="text-[5px] text-violet-200">{sampleData.title}</div>
      </div>
      <div className="flex">
        <div className="w-2/3 p-1.5">
          <div className="text-[5px] font-bold text-violet-600 mb-0.5">Experience</div>
          <div className="pl-1 border-l border-violet-200">
            <div className="h-1.5 bg-slate-200 rounded w-3/4 mb-0.5"></div>
            <div className="h-1 bg-slate-100 rounded w-full"></div>
          </div>
        </div>
        <div className="w-1/3 bg-slate-50 p-1.5">
          <div className="text-[4px] font-bold text-violet-600 mb-0.5">Skills</div>
          <div className="space-y-0.5">
            {sampleData.skills.slice(0, 3).map((s, i) => (
              <div key={i} className="flex items-center gap-0.5">
                <div className="w-1 h-1 bg-violet-600 rounded-full"></div>
                <span className="text-[3px]">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ElegantMiniPreview() {
  return (
    <div className="w-full h-full bg-white p-2 text-[4px] leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
      <div className="text-center mb-1">
        <div className="text-[8px] text-amber-800">{sampleData.name}</div>
        <div className="text-[5px] text-amber-600 italic">{sampleData.title}</div>
        <div className="flex justify-center mt-1">
          <div className="h-px bg-amber-200 w-6"></div>
          <div className="mx-1 text-amber-400 text-[5px]">❖</div>
          <div className="h-px bg-amber-200 w-6"></div>
        </div>
      </div>
      <div className="text-[4px] font-bold text-amber-800 text-center uppercase mb-0.5">Profile</div>
      <div className="h-1.5 bg-amber-50 rounded w-full mb-0.5"></div>
      <div className="h-1.5 bg-amber-50 rounded w-4/5 mx-auto mb-1"></div>
      <div className="text-[4px] font-bold text-amber-800 text-center uppercase mb-0.5">Experience</div>
      <div className="border-l border-amber-200 pl-1 ml-1">
        <div className="h-1.5 bg-slate-200 rounded w-3/4 mb-0.5"></div>
        <div className="h-1 bg-amber-50 rounded w-full"></div>
      </div>
    </div>
  )
}

function MinimalMiniPreview() {
  return (
    <div className="w-full h-full bg-white p-2 text-[4px] leading-tight">
      <div className="mb-1">
        <div className="text-[8px] font-semibold text-neutral-900">{sampleData.name}</div>
        <div className="text-[4px] text-neutral-500">{sampleData.title}</div>
        <div className="text-[3px] text-neutral-400">email@example.com • +1 234 567 890</div>
      </div>
      <div className="h-1.5 bg-neutral-100 rounded w-full mb-0.5"></div>
      <div className="h-1.5 bg-neutral-100 rounded w-4/5 mb-2"></div>
      <div className="text-[4px] font-bold text-neutral-400 uppercase mb-0.5">Experience</div>
      <div className="h-1.5 bg-neutral-200 rounded w-3/4 mb-0.5"></div>
      <div className="h-1 bg-neutral-100 rounded w-full mb-0.5"></div>
      <div className="h-1 bg-neutral-100 rounded w-5/6 mb-2"></div>
      <div className="text-[4px] font-bold text-neutral-400 uppercase mb-0.5">Skills</div>
      <div className="text-[3px] text-neutral-600">{sampleData.skills.join(' • ')}</div>
    </div>
  )
}

const templatePreviews: Record<string, React.FC> = {
  professional: ProfessionalMiniPreview,
  modern: ModernMiniPreview,
  creative: CreativeMiniPreview,
  elegant: ElegantMiniPreview,
  minimal: MinimalMiniPreview,
}

type FilterType = 'all' | 'ats' | 'two-column' | 'single'

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const filteredTemplates = templates.filter(template => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'ats') return template.isAts
    if (activeFilter === 'two-column') return template.layout === 'two-column'
    if (activeFilter === 'single') return template.layout === 'single'
    return true
  })

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
          jobTitle: '',
          targetJob: '',
        },
        summary: '',
        experience: [],
        education: [],
        skills: [],
        certifications: [],
        projects: [],
        languages: [],
        awards: [],
        courses: [],
        internships: [],
        volunteer: [],
        hobbies: [],
        references: [],
        customSections: [],
        settings: {
          fontFamily: 'Inter',
          fontSize: 'medium' as const,
          lineSpacing: 'normal' as const,
          pageMargins: 'normal' as const,
          primaryColor: '#1e40af',
          secondaryColor: '#3b82f6',
          accentColor: '#dbeafe',
          textColor: '#1e293b',
          backgroundColor: '#ffffff',
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            Professional Templates
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Choose Your Perfect Resume Template
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Stand out with our professionally designed templates. Click preview to see the full design.
          </p>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 mb-10">
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900">5</div>
            <div className="text-sm text-slate-500">Templates</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">4</div>
            <div className="text-sm text-slate-500">ATS-Friendly</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">100%</div>
            <div className="text-sm text-slate-500">Customizable</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-xl p-1.5 shadow-sm border">
            {[
              { id: 'all' as FilterType, label: 'All Templates', icon: Sparkles },
              { id: 'ats' as FilterType, label: 'ATS-Friendly', icon: Shield },
              { id: 'two-column' as FilterType, label: 'Two-Column', icon: Columns2 },
              { id: 'single' as FilterType, label: 'Single Column', icon: AlignJustify },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeFilter === filter.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <filter.icon className="h-4 w-4" />
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => {
            const PreviewComponent = templatePreviews[template.id]
            const isHovered = hoveredTemplate === template.id

            return (
              <Card
                key={template.id}
                className={`group overflow-hidden transition-all duration-300 border-2 ${
                  isHovered ? 'shadow-2xl scale-[1.02] border-blue-200' : 'shadow-md border-transparent hover:shadow-xl'
                }`}
                onMouseEnter={() => setHoveredTemplate(template.id)}
                onMouseLeave={() => setHoveredTemplate(null)}
              >
                <CardContent className="p-0">
                  {/* Preview */}
                  <div className="aspect-[8.5/11] bg-slate-100 relative overflow-hidden">
                    <div className="absolute inset-3 shadow-lg rounded-lg overflow-hidden border border-slate-200">
                      {PreviewComponent && <PreviewComponent />}
                    </div>

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {template.popular && (
                        <Badge className="bg-amber-500 text-white shadow-lg">
                          <Star className="h-3 w-3 mr-1 fill-white" />
                          Popular
                        </Badge>
                      )}
                      {template.isAts && (
                        <Badge className="bg-green-500 text-white shadow-lg">
                          <Shield className="h-3 w-3 mr-1" />
                          ATS-Friendly
                        </Badge>
                      )}
                    </div>

                    {/* Hover Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-end p-6 transition-opacity duration-300 ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <div className="flex gap-3 w-full">
                        <Link href={`/templates/preview/${template.id}`} className="flex-1">
                          <Button variant="outline" className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm">
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </Button>
                        </Link>
                        <Button
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                          onClick={() => handleUseTemplate(template.id)}
                          disabled={isCreating && selectedTemplate === template.id}
                        >
                          {isCreating && selectedTemplate === template.id ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <Zap className="h-4 w-4 mr-2" />
                          )}
                          Use This
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{template.name}</h3>
                        <p className="text-sm text-slate-500 capitalize">{template.layout.replace('-', ' ')} layout</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{template.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {template.bestFor.map((tag, i) => (
                        <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-10 text-white">
          <h2 className="text-2xl font-bold mb-3">Can't Decide? Start with Our Most Popular</h2>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            The Professional template works great for any industry and is optimized for ATS systems.
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50"
            onClick={() => handleUseTemplate('professional')}
          >
            Start with Professional Template
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}