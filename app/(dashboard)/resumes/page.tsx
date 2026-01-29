'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import {
  FileText,
  Plus,
  MoreVertical,
  Edit,
  Download,
  Copy,
  Trash2,
  Loader2,
  Search,
  LayoutGrid,
  List,
  Calendar,
  Sparkles,
  SortDesc,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Resume {
  id: string
  title: string
  template_id: string
  content: any
  ats_score: number | null
  created_at: string
  updated_at: string
}

// Mini Preview Component based on template and content
function ResumeMiniPreview({ resume }: { resume: Resume }) {
  const content = resume.content || {}
  const personalInfo = content.personalInfo || {}
  const firstName = personalInfo.firstName || ''
  const lastName = personalInfo.lastName || ''
  const fullName = `${firstName} ${lastName}`.trim() || 'Your Name'
  const jobTitle = personalInfo.jobTitle || 'Your Title'
  const hasExperience = content.experience?.length > 0
  const hasEducation = content.education?.length > 0
  const hasSkills = content.skills?.length > 0

  const templateColors: Record<string, { primary: string; secondary: string; bg: string }> = {
    professional: { primary: 'bg-blue-600', secondary: 'text-blue-600', bg: 'bg-blue-50' },
    modern: { primary: 'bg-slate-800', secondary: 'text-slate-800', bg: 'bg-slate-100' },
    creative: { primary: 'bg-violet-600', secondary: 'text-violet-600', bg: 'bg-violet-50' },
    elegant: { primary: 'bg-amber-700', secondary: 'text-amber-700', bg: 'bg-amber-50' },
    minimal: { primary: 'bg-neutral-800', secondary: 'text-neutral-600', bg: 'bg-neutral-50' },
  }

  const colors = templateColors[resume.template_id] || templateColors.professional

  // Check completion percentage
  const completionItems = [
    !!firstName,
    !!lastName,
    !!personalInfo.email,
    !!personalInfo.phone,
    !!content.summary,
    hasExperience,
    hasEducation,
    hasSkills,
  ]
  const completionPercent = Math.round((completionItems.filter(Boolean).length / completionItems.length) * 100)

  if (resume.template_id === 'modern' || resume.template_id === 'creative') {
    // Two-column preview
    return (
      <div className="w-full h-full bg-white flex text-[4px] leading-tight overflow-hidden rounded">
        <div className={`w-[35%] ${resume.template_id === 'modern' ? 'bg-slate-800' : 'bg-gradient-to-b from-violet-600 to-purple-600'} text-white p-1.5`}>
          <div className="text-[6px] font-bold truncate">{firstName || 'First'}</div>
          <div className="text-[6px] font-bold opacity-70 truncate">{lastName || 'Last'}</div>
          <div className="text-[4px] opacity-60 mt-0.5 truncate">{jobTitle}</div>
          <div className="mt-2 space-y-0.5">
            <div className="h-1 bg-white/20 rounded w-full"></div>
            <div className="h-1 bg-white/20 rounded w-4/5"></div>
            <div className="h-1 bg-white/20 rounded w-3/5"></div>
          </div>
          {hasSkills && (
            <div className="mt-2">
              <div className="flex flex-wrap gap-0.5">
                {content.skills.slice(0, 3).map((s: any, i: number) => (
                  <span key={i} className="bg-white/20 px-1 rounded text-[3px] truncate max-w-[30px]">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex-1 p-1.5">
          {content.summary && (
            <div className="mb-1.5">
              <div className="h-1 bg-slate-200 rounded w-full mb-0.5"></div>
              <div className="h-1 bg-slate-100 rounded w-4/5"></div>
            </div>
          )}
          {hasExperience && (
            <div>
              <div className={`text-[4px] font-bold ${colors.secondary} mb-0.5`}>Experience</div>
              {content.experience.slice(0, 2).map((exp: any, i: number) => (
                <div key={i} className="mb-1">
                  <div className="h-1.5 bg-slate-200 rounded w-3/4 mb-0.5"></div>
                  <div className="h-1 bg-slate-100 rounded w-full"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  // Single-column preview (Professional, Elegant, Minimal)
  return (
    <div className="w-full h-full bg-white p-2 text-[4px] leading-tight overflow-hidden rounded">
      {/* Header */}
      <div className={`text-center ${resume.template_id === 'elegant' ? '' : 'border-b-2'} pb-1 mb-1`} style={{ borderColor: resume.template_id !== 'elegant' ? (resume.template_id === 'professional' ? '#2563eb' : '#171717') : 'transparent' }}>
        <div className={`text-[7px] font-bold ${resume.template_id === 'elegant' ? 'text-amber-800' : 'text-slate-900'}`}>
          {fullName}
        </div>
        <div className={`text-[5px] ${colors.secondary}`}>{jobTitle}</div>
        {resume.template_id === 'elegant' && (
          <div className="flex justify-center mt-1">
            <div className="h-px bg-amber-200 w-6"></div>
            <div className="mx-1 text-amber-400 text-[4px]">❖</div>
            <div className="h-px bg-amber-200 w-6"></div>
          </div>
        )}
      </div>

      {/* Content sections */}
      {content.summary && (
        <div className="mb-1">
          <div className="h-1 bg-slate-100 rounded w-full mb-0.5"></div>
          <div className="h-1 bg-slate-100 rounded w-4/5"></div>
        </div>
      )}

      {hasExperience && (
        <div className="mb-1">
          <div className={`text-[4px] font-bold ${colors.secondary} border-b border-slate-200 mb-0.5`}>
            Experience
          </div>
          {content.experience.slice(0, 2).map((exp: any, i: number) => (
            <div key={i} className="mb-1">
              <div className="h-1.5 bg-slate-200 rounded w-3/4 mb-0.5"></div>
              <div className="h-1 bg-slate-100 rounded w-full"></div>
            </div>
          ))}
        </div>
      )}

      {hasSkills && (
        <div>
          <div className={`text-[4px] font-bold ${colors.secondary} border-b border-slate-200 mb-0.5`}>
            Skills
          </div>
          <div className="flex flex-wrap gap-0.5">
            {content.skills.slice(0, 4).map((s: any, i: number) => (
              <span key={i} className={`${colors.bg} px-1 rounded text-[3px]`}>
                {s.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Empty state indicator */}
      {!content.summary && !hasExperience && !hasSkills && (
        <div className="flex flex-col items-center justify-center h-16 text-slate-300">
          <FileText className="h-4 w-4 mb-1" />
          <span className="text-[4px]">Empty resume</span>
        </div>
      )}
    </div>
  )
}

export default function ResumesPage() {
  const router = useRouter()
  const supabase = createClient()

  const [resumes, setResumes] = useState<Resume[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'updated' | 'created' | 'name'>('updated')

  // Delete dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [resumeToDelete, setResumeToDelete] = useState<Resume | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Duplicate dialog state
  const [duplicateDialogOpen, setDuplicateDialogOpen] = useState(false)
  const [resumeToDuplicate, setResumeToDuplicate] = useState<Resume | null>(null)
  const [duplicateName, setDuplicateName] = useState('')
  const [isDuplicating, setIsDuplicating] = useState(false)

  // Fetch resumes
  useEffect(() => {
    async function fetchResumes() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.push('/login')
          return
        }

        const { data, error } = await supabase
          .from('resumes')
          .select('*')
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false })

        if (error) throw error
        setResumes(data || [])
      } catch (error) {
        console.error('Error fetching resumes:', error)
        toast.error('Failed to load resumes')
      } finally {
        setIsLoading(false)
      }
    }

    fetchResumes()
  }, [supabase, router])

  // Filter and sort resumes
  const filteredResumes = resumes
    .filter(resume => 
      resume.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'updated') return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      if (sortBy === 'created') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      if (sortBy === 'name') return a.title.localeCompare(b.title)
      return 0
    })

  // Delete resume
  const handleDelete = async () => {
    if (!resumeToDelete) return
    setIsDeleting(true)

    try {
      const { error } = await supabase
        .from('resumes')
        .delete()
        .eq('id', resumeToDelete.id)

      if (error) throw error

      setResumes(resumes.filter(r => r.id !== resumeToDelete.id))
      toast.success('Resume deleted')
      setDeleteDialogOpen(false)
    } catch (error) {
      console.error('Error deleting resume:', error)
      toast.error('Failed to delete resume')
    } finally {
      setIsDeleting(false)
      setResumeToDelete(null)
    }
  }

  // Duplicate resume
  const handleDuplicate = async () => {
    if (!resumeToDuplicate) return
    setIsDuplicating(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('resumes')
        .insert({
          user_id: user.id,
          title: duplicateName || `${resumeToDuplicate.title} (Copy)`,
          template_id: resumeToDuplicate.template_id,
          content: resumeToDuplicate.content,
          ats_score: resumeToDuplicate.ats_score,
        })
        .select()
        .single()

      if (error) throw error

      setResumes([data, ...resumes])
      toast.success('Resume duplicated')
      setDuplicateDialogOpen(false)
    } catch (error) {
      console.error('Error duplicating resume:', error)
      toast.error('Failed to duplicate resume')
    } finally {
      setIsDuplicating(false)
      setResumeToDuplicate(null)
      setDuplicateName('')
    }
  }

  // Download PDF
  const handleDownloadPDF = async (resume: Resume) => {
    toast.loading('Generating PDF...', { id: 'pdf-download' })

    try {
      const response = await fetch('/api/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeId: resume.id,
          templateId: resume.template_id,
          content: resume.content,
        }),
      })

      if (!response.ok) throw new Error('PDF generation failed')

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${resume.title.replace(/[^a-z0-9]/gi, '_')}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)

      toast.success('PDF downloaded!', { id: 'pdf-download' })
    } catch (error) {
      console.error('Error downloading PDF:', error)
      toast.error('Failed to download PDF', { id: 'pdf-download' })
    }
  }

  // Get completion percentage
  const getCompletionPercent = (resume: Resume) => {
    const content = resume.content || {}
    const personalInfo = content.personalInfo || {}
    const items = [
      !!personalInfo.firstName,
      !!personalInfo.lastName,
      !!personalInfo.email,
      !!personalInfo.phone,
      !!content.summary,
      content.experience?.length > 0,
      content.education?.length > 0,
      content.skills?.length > 0,
    ]
    return Math.round((items.filter(Boolean).length / items.length) * 100)
  }

  // Get template badge color
  const getTemplateBadgeColor = (templateId: string) => {
    const colors: Record<string, string> = {
      professional: 'bg-blue-100 text-blue-700',
      modern: 'bg-slate-100 text-slate-700',
      creative: 'bg-violet-100 text-violet-700',
      elegant: 'bg-amber-100 text-amber-700',
      minimal: 'bg-neutral-100 text-neutral-700',
    }
    return colors[templateId] || colors.professional
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading your resumes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Resumes</h1>
          <p className="text-slate-600 mt-1">
            {resumes.length} resume{resumes.length !== 1 ? 's' : ''} • Create, edit, and manage your resumes
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/templates">
            <Button variant="outline">
              <Sparkles className="mr-2 h-4 w-4" />
              Browse Templates
            </Button>
          </Link>
          <Link href="/resumes/new">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              New Resume
            </Button>
          </Link>
        </div>
      </div>

      {/* Search and Filters */}
      {resumes.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search resumes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <SortDesc className="h-4 w-4 mr-2" />
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSortBy('updated')}>
                  Last Updated {sortBy === 'updated' && '✓'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('created')}>
                  Date Created {sortBy === 'created' && '✓'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('name')}>
                  Name {sortBy === 'name' && '✓'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Resumes Grid/List */}
      {filteredResumes.length > 0 ? (
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
          : 'space-y-4'
        }>
          {filteredResumes.map((resume) => {
            const completionPercent = getCompletionPercent(resume)
            
            return viewMode === 'grid' ? (
              // Grid View Card
              <Card key={resume.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-blue-100">
                <CardContent className="p-0">
                  {/* Preview */}
                  <div 
                    className="aspect-[8.5/11] bg-slate-50 relative overflow-hidden cursor-pointer"
                    onClick={() => router.push(`/resumes/${resume.id}/edit`)}
                  >
                    <div className="absolute inset-3 shadow-sm rounded overflow-hidden border border-slate-200">
                      <ResumeMiniPreview resume={resume} />
                    </div>

                    {/* Completion Badge */}
                    <div className="absolute top-2 left-2">
                      <Badge className={`${completionPercent === 100 ? 'bg-green-500' : 'bg-amber-500'} text-white text-xs`}>
                        {completionPercent}% Complete
                      </Badge>
                    </div>

                    {/* Template Badge */}
                    <div className="absolute top-2 right-2">
                      <Badge className={getTemplateBadgeColor(resume.template_id) + ' capitalize text-xs'}>
                        {resume.template_id}
                      </Badge>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-end p-4">
                      <div className="flex gap-2 w-full">
                        <Button 
                          size="sm" 
                          variant="secondary" 
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation()
                            router.push(`/resumes/${resume.id}/edit`)
                          }}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          size="sm" 
                          variant="secondary" 
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDownloadPDF(resume)
                          }}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-900 truncate">{resume.title}</h3>
                        <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(resume.updated_at).toLocaleDateString()}
                        </p>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => router.push(`/resumes/${resume.id}/edit`)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDownloadPDF(resume)}>
                            <Download className="h-4 w-4 mr-2" />
                            Download PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setResumeToDuplicate(resume)
                            setDuplicateName(`${resume.title} (Copy)`)
                            setDuplicateDialogOpen(true)
                          }}>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600 focus:text-red-600"
                            onClick={() => {
                              setResumeToDelete(resume)
                              setDeleteDialogOpen(true)
                            }}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-500">Completion</span>
                        <span className={completionPercent === 100 ? 'text-green-600' : 'text-amber-600'}>
                          {completionPercent}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${completionPercent === 100 ? 'bg-green-500' : 'bg-amber-500'}`}
                          style={{ width: `${completionPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              // List View Row
              <Card key={resume.id} className="group hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Mini Preview */}
                    <div 
                      className="w-20 h-28 bg-slate-50 rounded border overflow-hidden cursor-pointer shrink-0"
                      onClick={() => router.push(`/resumes/${resume.id}/edit`)}
                    >
                      <ResumeMiniPreview resume={resume} />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-slate-900 truncate">{resume.title}</h3>
                        <Badge className={getTemplateBadgeColor(resume.template_id) + ' capitalize text-xs'}>
                          {resume.template_id}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-500 mb-2">
                        Last edited {new Date(resume.updated_at).toLocaleDateString()}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${completionPercent === 100 ? 'bg-green-500' : 'bg-amber-500'}`}
                              style={{ width: `${completionPercent}%` }}
                            />
                          </div>
                          <span className="text-xs text-slate-500">{completionPercent}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => router.push(`/resumes/${resume.id}/edit`)}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDownloadPDF(resume)}>
                        <Download className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setResumeToDuplicate(resume)
                            setDuplicateName(`${resume.title} (Copy)`)
                            setDuplicateDialogOpen(true)
                          }}>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600 focus:text-red-600"
                            onClick={() => {
                              setResumeToDelete(resume)
                              setDeleteDialogOpen(true)
                            }}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : resumes.length > 0 ? (
        // No search results
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Search className="h-12 w-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No resumes found</h3>
            <p className="text-slate-600 mb-4">Try a different search term</p>
            <Button variant="outline" onClick={() => setSearchQuery('')}>
              Clear Search
            </Button>
          </CardContent>
        </Card>
      ) : (
        // Empty state
        <Card className="border-2 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="bg-blue-50 rounded-full p-4 mb-4">
              <FileText className="h-12 w-12 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No resumes yet</h3>
            <p className="text-slate-600 mb-6 text-center max-w-md">
              Create your first professional resume and start applying for your dream job.
            </p>
            <div className="flex gap-4">
              <Link href="/templates">
                <Button variant="outline">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Browse Templates
                </Button>
              </Link>
              <Link href="/resumes/new">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Resume
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center sm:text-left">
            <div className="mx-auto sm:mx-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <Trash2 className="h-6 w-6 text-red-600" />
            </div>
            <DialogTitle className="text-xl text-slate-900">Delete Resume</DialogTitle>
            <DialogDescription className="text-slate-500 mt-2">
              Are you sure you want to delete <span className="font-semibold text-slate-700">"{resumeToDelete?.title}"</span>? 
              This action cannot be undone and all data will be permanently removed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6 flex flex-col-reverse sm:flex-row gap-3 sm:gap-3">
            <Button 
              variant="outline" 
              onClick={() => setDeleteDialogOpen(false)}
              className="w-full sm:w-auto border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleDelete} 
              disabled={isDeleting}
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white"
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4 mr-2" />
              )}
              Delete Resume
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Duplicate Dialog */}
      <Dialog open={duplicateDialogOpen} onOpenChange={setDuplicateDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center sm:text-left">
            <div className="mx-auto sm:mx-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <Copy className="h-6 w-6 text-blue-600" />
            </div>
            <DialogTitle className="text-xl text-slate-900">Duplicate Resume</DialogTitle>
            <DialogDescription className="text-slate-500 mt-2">
              Create a copy of <span className="font-semibold text-slate-700">"{resumeToDuplicate?.title}"</span>
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="duplicate-name" className="text-slate-700 font-medium">New Resume Name</Label>
            <Input
              id="duplicate-name"
              value={duplicateName}
              onChange={(e) => setDuplicateName(e.target.value)}
              placeholder="Enter name for the copy"
              className="mt-2 border-slate-300 focus:border-blue-500"
            />
          </div>
          <DialogFooter className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-3">
            <Button 
              variant="outline" 
              onClick={() => setDuplicateDialogOpen(false)}
              className="w-full sm:w-auto border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleDuplicate} 
              disabled={isDuplicating}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isDuplicating ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Copy className="h-4 w-4 mr-2" />
              )}
              Duplicate Resume
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}