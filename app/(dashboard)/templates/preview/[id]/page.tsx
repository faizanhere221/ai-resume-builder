'use client'

import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { useState } from 'react'
import {
  ArrowLeft,
  Zap,
  Loader2,
  Shield,
  ChevronLeft,
  ChevronRight,
  Check,
} from 'lucide-react'

// Template data
const templates = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Clean and modern design perfect for corporate jobs and traditional industries',
    isAts: true,
    layout: 'single',
    bestFor: ['Corporate', 'Finance', 'Healthcare'],
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary two-column layout with sleek sidebar for maximum impact',
    isAts: true,
    layout: 'two-column',
    bestFor: ['Tech', 'Startups', 'Marketing'],
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold gradient design that stands out for creative professionals',
    isAts: false,
    layout: 'two-column',
    bestFor: ['Design', 'Arts', 'Media'],
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Sophisticated serif design with refined typography and subtle accents',
    isAts: true,
    layout: 'single',
    bestFor: ['Executive', 'Legal', 'Academia'],
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Ultra-clean design focused on content with maximum readability',
    isAts: true,
    layout: 'single',
    bestFor: ['Any Industry', 'Students', 'Freelancers'],
  },
]

// Sample data for preview
const sampleData = {
  name: 'Alex Johnson',
  title: 'Senior Software Engineer',
  email: 'alex.johnson@email.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  linkedin: 'linkedin.com/in/alexjohnson',
  summary: 'Experienced software engineer with 8+ years of expertise in building scalable web applications and leading cross-functional teams. Passionate about clean code, user experience, and mentoring junior developers.',
  experience: [
    {
      title: 'Senior Software Engineer',
      company: 'Tech Corp Inc.',
      date: '2020 - Present',
      bullets: [
        'Led development of microservices architecture serving 2M+ daily users',
        'Reduced API response time by 60% through optimization and caching',
        'Mentored team of 5 junior developers and conducted code reviews',
      ],
    },
    {
      title: 'Software Engineer',
      company: 'StartupXYZ',
      date: '2017 - 2020',
      bullets: [
        'Built core product features using React and Node.js',
        'Collaborated with design team to improve user experience',
      ],
    },
  ],
  skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'PostgreSQL', 'Docker', 'GraphQL'],
  education: {
    degree: 'B.S. Computer Science',
    school: 'Stanford University',
    date: '2013 - 2017',
  },
}

// Full Preview Components
function ProfessionalPreview() {
  return (
    <div className="bg-white w-full h-full p-8" style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', lineHeight: '1.5' }}>
      <div className="text-center border-b-2 border-blue-600 pb-4 mb-5">
        <div className="text-2xl font-bold text-slate-900">{sampleData.name}</div>
        <div className="text-base text-blue-600 mb-2">{sampleData.title}</div>
        <div className="flex justify-center gap-3 text-slate-500 text-xs">
          <span>{sampleData.email}</span><span>•</span>
          <span>{sampleData.phone}</span><span>•</span>
          <span>{sampleData.location}</span>
        </div>
      </div>
      <div className="mb-5">
        <div className="text-sm font-bold text-blue-600 border-b border-slate-200 pb-1 mb-2">Professional Summary</div>
        <div className="text-slate-600">{sampleData.summary}</div>
      </div>
      <div className="mb-5">
        <div className="text-sm font-bold text-blue-600 border-b border-slate-200 pb-1 mb-2">Work Experience</div>
        {sampleData.experience.map((exp, i) => (
          <div key={i} className="mb-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-bold text-slate-800">{exp.title}</div>
                <div className="text-blue-600">{exp.company}</div>
              </div>
              <span className="text-slate-500 bg-blue-50 px-2 py-0.5 rounded text-xs">{exp.date}</span>
            </div>
            <ul className="list-disc list-inside text-slate-600 mt-1.5 space-y-0.5">
              {exp.bullets.map((b, j) => <li key={j}>{b}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="mb-5">
        <div className="text-sm font-bold text-blue-600 border-b border-slate-200 pb-1 mb-2">Education</div>
        <div className="flex justify-between">
          <div>
            <div className="font-bold text-slate-800">{sampleData.education.degree}</div>
            <div className="text-slate-600">{sampleData.education.school}</div>
          </div>
          <span className="text-slate-500">{sampleData.education.date}</span>
        </div>
      </div>
      <div>
        <div className="text-sm font-bold text-blue-600 border-b border-slate-200 pb-1 mb-2">Skills</div>
        <div className="flex flex-wrap gap-1.5">
          {sampleData.skills.map((s, i) => (
            <span key={i} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">{s}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function ModernPreview() {
  return (
    <div className="bg-white w-full h-full flex" style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', lineHeight: '1.5' }}>
      <div className="w-[35%] bg-slate-800 text-white p-5">
        <div className="text-xl font-bold mb-0.5">{sampleData.name.split(' ')[0]}</div>
        <div className="text-xl font-bold text-slate-400 mb-1">{sampleData.name.split(' ')[1]}</div>
        <div className="text-slate-400 text-xs mb-5">{sampleData.title}</div>
        <div className="mb-5">
          <div className="text-xs text-slate-400 uppercase tracking-wider mb-2">Contact</div>
          <div className="space-y-1.5 text-slate-300 text-xs">
            <div>{sampleData.email}</div>
            <div>{sampleData.phone}</div>
            <div>{sampleData.location}</div>
          </div>
        </div>
        <div className="mb-5">
          <div className="text-xs text-slate-400 uppercase tracking-wider mb-2">Skills</div>
          <div className="flex flex-wrap gap-1">
            {sampleData.skills.map((s, i) => (
              <span key={i} className="bg-slate-700 px-1.5 py-0.5 rounded text-xs">{s}</span>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-400 uppercase tracking-wider mb-2">Education</div>
          <div className="font-semibold text-xs">{sampleData.education.school}</div>
          <div className="text-slate-400 text-xs">{sampleData.education.degree}</div>
        </div>
      </div>
      <div className="flex-1 p-5">
        <div className="mb-5">
          <div className="text-sm font-bold text-slate-800 border-b-2 border-slate-800 pb-1 mb-2">About Me</div>
          <div className="text-slate-600">{sampleData.summary}</div>
        </div>
        <div>
          <div className="text-sm font-bold text-slate-800 border-b-2 border-slate-800 pb-1 mb-2">Experience</div>
          {sampleData.experience.map((exp, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-slate-800">{exp.title}</div>
                  <div className="text-slate-500">{exp.company}</div>
                </div>
                <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs">{exp.date}</span>
              </div>
              <ul className="list-disc list-inside text-slate-600 mt-1.5 space-y-0.5">
                {exp.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CreativePreview() {
  return (
    <div className="bg-white w-full h-full" style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', lineHeight: '1.5' }}>
      <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white p-6">
        <div className="text-2xl font-bold">{sampleData.name}</div>
        <div className="text-violet-200 mb-3">{sampleData.title}</div>
        <div className="grid grid-cols-2 gap-2 text-xs text-violet-100">
          <div>{sampleData.email}</div>
          <div>{sampleData.phone}</div>
          <div>{sampleData.location}</div>
          <div>{sampleData.linkedin}</div>
        </div>
      </div>
      <div className="flex">
        <div className="w-2/3 p-5">
          <div className="text-slate-600 mb-4">{sampleData.summary}</div>
          <div className="text-sm font-bold text-violet-600 flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-violet-600 rounded-full"></div>Experience
          </div>
          {sampleData.experience.map((exp, i) => (
            <div key={i} className="mb-4 pl-3 border-l-2 border-violet-200">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-slate-800">{exp.title}</div>
                  <div className="text-violet-600">{exp.company}</div>
                </div>
                <span className="bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full text-xs">{exp.date}</span>
              </div>
              <ul className="list-disc list-inside text-slate-600 mt-1.5 space-y-0.5">
                {exp.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="w-1/3 bg-slate-50 p-5">
          <div className="text-xs font-bold text-violet-600 uppercase tracking-wider mb-2">Skills</div>
          <div className="space-y-1.5 mb-5">
            {sampleData.skills.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-violet-600 rounded-full"></div>
                <span className="text-xs">{s}</span>
              </div>
            ))}
          </div>
          <div className="text-xs font-bold text-violet-600 uppercase tracking-wider mb-2">Education</div>
          <div className="font-semibold text-slate-800 text-xs">{sampleData.education.school}</div>
          <div className="text-slate-600 text-xs">{sampleData.education.degree}</div>
        </div>
      </div>
    </div>
  )
}

function ElegantPreview() {
  return (
    <div className="bg-white w-full h-full p-8" style={{ fontFamily: 'Georgia, serif', fontSize: '11px', lineHeight: '1.6' }}>
      <div className="text-center mb-6">
        <div className="text-2xl text-amber-800 tracking-wide mb-1">{sampleData.name}</div>
        <div className="text-base text-amber-600 italic mb-2">{sampleData.title}</div>
        <div className="flex justify-center items-center gap-2 text-stone-500 text-xs">
          <span>{sampleData.email}</span>
          <span className="text-amber-400">✦</span>
          <span>{sampleData.phone}</span>
          <span className="text-amber-400">✦</span>
          <span>{sampleData.location}</span>
        </div>
        <div className="flex items-center justify-center mt-4">
          <div className="h-px bg-amber-200 w-16"></div>
          <div className="mx-3 text-amber-400">❖</div>
          <div className="h-px bg-amber-200 w-16"></div>
        </div>
      </div>
      <div className="mb-5">
        <div className="text-xs font-bold text-amber-800 text-center uppercase tracking-[0.15em] mb-2">Profile</div>
        <div className="text-stone-600 text-center">{sampleData.summary}</div>
      </div>
      <div className="mb-5">
        <div className="text-xs font-bold text-amber-800 text-center uppercase tracking-[0.15em] mb-2">Experience</div>
        {sampleData.experience.map((exp, i) => (
          <div key={i} className="mb-4 border-l-2 border-amber-200 pl-3">
            <div className="flex justify-between items-baseline">
              <div className="font-bold text-stone-800">{exp.title}</div>
              <span className="text-stone-500 italic text-xs">{exp.date}</span>
            </div>
            <div className="text-amber-700 mb-1">{exp.company}</div>
            <ul className="list-disc list-inside text-stone-600 space-y-0.5">
              {exp.bullets.map((b, j) => <li key={j}>{b}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="text-xs font-bold text-amber-800 text-center uppercase tracking-[0.15em] mb-2">Education</div>
          <div className="text-center">
            <div className="font-bold text-stone-800">{sampleData.education.school}</div>
            <div className="text-stone-600">{sampleData.education.degree}</div>
          </div>
        </div>
        <div>
          <div className="text-xs font-bold text-amber-800 text-center uppercase tracking-[0.15em] mb-2">Expertise</div>
          <div className="flex flex-wrap justify-center gap-1">
            {sampleData.skills.slice(0, 6).map((s, i) => (
              <span key={i} className="border border-amber-300 text-stone-600 px-2 py-0.5 text-xs">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function MinimalPreview() {
  return (
    <div className="bg-white w-full h-full p-8" style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', lineHeight: '1.5' }}>
      <div className="mb-5">
        <div className="text-2xl font-semibold text-neutral-900">{sampleData.name}</div>
        <div className="text-neutral-500 mb-1">{sampleData.title}</div>
        <div className="text-neutral-400 text-xs">
          {sampleData.email} • {sampleData.phone} • {sampleData.location}
        </div>
      </div>
      <div className="mb-5">
        <div className="text-neutral-600">{sampleData.summary}</div>
      </div>
      <div className="mb-5">
        <div className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">Experience</div>
        {sampleData.experience.map((exp, i) => (
          <div key={i} className="mb-4">
            <div className="flex justify-between items-baseline">
              <div>
                <span className="font-medium text-neutral-800">{exp.title}</span>
                <span className="text-neutral-400 mx-1.5">at</span>
                <span className="text-neutral-600">{exp.company}</span>
              </div>
              <span className="text-neutral-400 text-xs">{exp.date}</span>
            </div>
            <ul className="list-disc list-inside text-neutral-600 mt-1.5 space-y-0.5">
              {exp.bullets.map((b, j) => <li key={j}>{b}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="mb-5">
        <div className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">Education</div>
        <div className="flex justify-between">
          <div>
            <span className="font-medium text-neutral-800">{sampleData.education.degree}</span>
            <span className="text-neutral-400 mx-1.5">—</span>
            <span className="text-neutral-600">{sampleData.education.school}</span>
          </div>
          <span className="text-neutral-400 text-xs">{sampleData.education.date}</span>
        </div>
      </div>
      <div>
        <div className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">Skills</div>
        <div className="text-neutral-600">{sampleData.skills.join(' • ')}</div>
      </div>
    </div>
  )
}

const templatePreviews: Record<string, React.FC> = {
  professional: ProfessionalPreview,
  modern: ModernPreview,
  creative: CreativePreview,
  elegant: ElegantPreview,
  minimal: MinimalPreview,
}

export default function TemplatePreviewPage() {
  const params = useParams()
  const router = useRouter()
  const supabase = createClient()
  const templateId = params.id as string

  const [isCreating, setIsCreating] = useState(false)

  const template = templates.find(t => t.id === templateId)
  const currentIndex = templates.findIndex(t => t.id === templateId)
  const PreviewComponent = templatePreviews[templateId]

  const handleUseTemplate = async () => {
    setIsCreating(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        toast.error('Please sign in to create a resume')
        router.push('/login')
        return
      }

      const defaultContent = {
        personalInfo: { firstName: '', lastName: '', email: user.email || '', phone: '', location: '', website: '', linkedin: '', github: '', portfolio: '', jobTitle: '', targetJob: '' },
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
        .insert({ user_id: user.id, title: `${template?.name || 'New'} Resume`, template_id: templateId, content: defaultContent })
        .select()
        .single()

      if (error) throw error
      toast.success('Resume created!', { description: `Using ${template?.name} template` })
      router.push(`/resumes/${resume.id}/edit`)
    } catch (error) {
      console.error('Error creating resume:', error)
      toast.error('Failed to create resume')
    } finally {
      setIsCreating(false)
    }
  }

  const navigateTo = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentIndex > 0) {
      router.push(`/templates/preview/${templates[currentIndex - 1].id}`)
    } else if (direction === 'next' && currentIndex < templates.length - 1) {
      router.push(`/templates/preview/${templates[currentIndex + 1].id}`)
    }
  }

  if (!template || !PreviewComponent) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Template not found</h1>
          <Button onClick={() => router.push('/templates')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Templates
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.push('/templates')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Templates
            </Button>
            <div className="h-6 w-px bg-slate-200" />
            <div>
              <h1 className="text-lg font-semibold text-slate-900">{template.name} Template</h1>
              <div className="flex items-center gap-2">
                {template.isAts && (
                  <Badge className="bg-green-500 text-white text-xs">
                    <Shield className="h-3 w-3 mr-1" />
                    ATS-Friendly
                  </Badge>
                )}
                <span className="text-sm text-slate-500 capitalize">{template.layout.replace('-', ' ')} layout</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 mr-2">
              <Button variant="outline" size="icon" onClick={() => navigateTo('prev')} disabled={currentIndex === 0}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-slate-500 min-w-[50px] text-center">{currentIndex + 1} / {templates.length}</span>
              <Button variant="outline" size="icon" onClick={() => navigateTo('next')} disabled={currentIndex === templates.length - 1}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleUseTemplate} disabled={isCreating}>
              {isCreating ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Zap className="h-4 w-4 mr-2" />}
              Use This Template
            </Button>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <p className="text-slate-600">{template.description}</p>
            <div className="flex justify-center gap-2 mt-3">
              {template.bestFor.map((tag, i) => (
                <span key={i} className="text-xs bg-white text-slate-600 px-3 py-1 rounded-full border">{tag}</span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="flex justify-center gap-6 mb-6">
            {['Customizable colors', 'Multiple fonts', 'PDF export', 'ATS optimized'].map((feature, i) => (
              <div key={i} className="flex items-center gap-1.5 text-sm text-slate-600">
                <Check className="h-4 w-4 text-green-500" />
                {feature}
              </div>
            ))}
          </div>

          {/* Resume Preview */}
          <div className="bg-white shadow-2xl rounded-lg overflow-hidden aspect-[8.5/11]">
            <PreviewComponent />
          </div>
        </div>
      </div>
    </div>
  )
}