'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { useResumeStore } from '@/lib/store'
import { ResumeEditor } from '@/components/editor/resume-editor'
import { TemplateCustomizer } from '@/components/editor/template-customizer'
import { SectionReorder } from '@/components/editor/section-reorder'
import { ResumePreview } from '@/components/resume/resume-preview'
import { PDFDownload } from '@/components/resume/pdf-download'
import { ATSScore } from '@/components/resume/ats-score'
import { TemplateSelector } from '@/components/resume/template-selector'
import type { ResumeContent } from '@/types'
import {
  ArrowLeft,
  Save,
  Eye,
  EyeOff,
  Loader2,
  FileText,
  Palette,
  Layers,
  CheckCircle2,
  Circle,
} from 'lucide-react'

export default function EditResumePage() {
  const params = useParams()
  const router = useRouter()
  const supabase = createClient()
  const resumeId = params.id as string

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [showPreview, setShowPreview] = useState(true)
  const [activeTab, setActiveTab] = useState('content')

  const {
    currentResume,
    resumeTitle,
    templateId,
    isDirty,
    setResumeContent,
    setResumeTitle,
    setTemplateId,
    setResumeId,
    markAsSaved,
  } = useResumeStore()

  // Fetch resume data
  useEffect(() => {
    async function fetchResume() {
      try {
        const { data: resume, error } = await supabase
          .from('resumes')
          .select('*')
          .eq('id', resumeId)
          .single()

        if (error) throw error

        if (resume) {
          setResumeId(resume.id)
          setResumeTitle(resume.title)
          setTemplateId(resume.template_id)
          setResumeContent(resume.content as ResumeContent)
          markAsSaved()
        }
      } catch (error) {
        console.error('Error fetching resume:', error)
        toast.error('Error', {
          description: 'Failed to load resume.',
        })
        router.push('/resumes')
      } finally {
        setIsLoading(false)
      }
    }

    fetchResume()
  }, [resumeId, supabase, router, setResumeContent, setResumeId, setResumeTitle, setTemplateId, markAsSaved])

  // Save resume
  const handleSave = useCallback(async () => {
    setIsSaving(true)

    try {
      const { error } = await supabase
        .from('resumes')
        .update({
          title: resumeTitle,
          template_id: templateId,
          content: currentResume,
          updated_at: new Date().toISOString(),
        })
        .eq('id', resumeId)

      if (error) throw error

      markAsSaved()
      toast.success('Saved!', {
        description: 'Your resume has been saved.',
      })
    } catch (error) {
      console.error('Error saving resume:', error)
      toast.error('Error', {
        description: 'Failed to save resume.',
      })
    } finally {
      setIsSaving(false)
    }
  }, [currentResume, resumeId, resumeTitle, templateId, supabase, markAsSaved])

  // Auto-save after 3 seconds of inactivity
  useEffect(() => {
    if (!isDirty || isLoading) return

    const timer = setTimeout(() => {
      handleSave()
    }, 3000)

    return () => clearTimeout(timer)
  }, [isDirty, isLoading, handleSave])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading resume...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col -m-6 lg:-m-8">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-white">
        <div className="flex items-center gap-4">
          <Link href="/resumes" className="text-slate-600 hover:text-slate-900">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <input
              type="text"
              value={resumeTitle}
              onChange={(e) => setResumeTitle(e.target.value)}
              className="text-lg font-semibold bg-transparent border-none outline-none focus:ring-0 p-0 w-64"
              placeholder="Untitled Resume"
            />
            <div className="flex items-center gap-2 text-sm">
              {isDirty ? (
                <>
                  <Circle className="h-2 w-2 fill-amber-500 text-amber-500" />
                  <span className="text-amber-600">Unsaved changes</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                  <span className="text-green-600">All changes saved</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Template Selector */}
          <TemplateSelector />
          
          {/* ATS Score Button */}
          <ATSScore content={currentResume} />

          {/* Preview Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPreview(!showPreview)}
            className="hidden md:flex"
          >
            {showPreview ? (
              <>
                <EyeOff className="h-4 w-4 mr-2" />
                Hide Preview
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Show Preview
              </>
            )}
          </Button>

          {/* Save Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleSave}
            disabled={isSaving || !isDirty}
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save
          </Button>

          {/* Download Button */}
          <PDFDownload
            resumeId={resumeId}
            resumeTitle={resumeTitle}
            content={currentResume}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor Panel */}
        <div className={`flex flex-col overflow-hidden bg-slate-50 ${showPreview ? 'w-1/2' : 'w-full'}`}>
          {/* Custom Tab Navigation */}
          <div className="bg-white border-b px-6 pt-4">
            <div className="flex gap-1 bg-slate-100 p-1 rounded-xl max-w-md">
              <button
                onClick={() => setActiveTab('content')}
                className={`
                  flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all
                  ${activeTab === 'content' 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                  }
                `}
              >
                <FileText className="h-4 w-4" />
                Content
              </button>
              <button
                onClick={() => setActiveTab('design')}
                className={`
                  flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all
                  ${activeTab === 'design' 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                  }
                `}
              >
                <Palette className="h-4 w-4" />
                Design
              </button>
              <button
                onClick={() => setActiveTab('layout')}
                className={`
                  flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all
                  ${activeTab === 'layout' 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                  }
                `}
              >
                <Layers className="h-4 w-4" />
                Layout
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-2xl mx-auto p-6">
              {activeTab === 'content' && <ResumeEditor />}
              {activeTab === 'design' && <TemplateCustomizer />}
              {activeTab === 'layout' && <SectionReorder />}
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        {showPreview && (
          <div className="w-1/2 border-l overflow-y-auto bg-slate-200 p-6 hidden md:block">
            <div className="max-w-[8.5in] mx-auto">
              <ResumePreview />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}