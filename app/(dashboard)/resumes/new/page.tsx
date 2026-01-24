'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { ArrowLeft, ArrowRight, Loader2, FileText, Linkedin } from 'lucide-react'

const templates = [
  { id: 'professional', name: 'Professional', description: 'Clean and modern' },
  { id: 'classic', name: 'Classic', description: 'Traditional format' },
  { id: 'modern', name: 'Modern', description: 'Creative layout' },
  { id: 'minimal', name: 'Minimal', description: 'Simple and elegant' },
  { id: 'executive', name: 'Executive', description: 'For senior roles' },
]

export default function NewResumePage() {
  const [step, setStep] = useState(1)
  const [resumeTitle, setResumeTitle] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState('professional')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleCreateResume = async () => {
    if (!resumeTitle.trim()) {
      toast.error('Title required', {
        description: 'Please enter a title for your resume.',
      })
      return
    }

    setIsLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        toast.error('Not authenticated', {
          description: 'Please sign in to create a resume.',
        })
        router.push('/login')
        return
      }

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
          colorScheme: 'professional',
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
          title: resumeTitle,
          template_id: selectedTemplate,
          content: defaultContent,
        })
        .select()
        .single()

      if (error) {
        throw error
      }

      toast.success('Resume created!', {
        description: 'Start adding your information.',
      })

      router.push(`/resumes/${resume.id}/edit`)
    } catch (error) {
      console.error('Error creating resume:', error)
      toast.error('Error', {
        description: 'Failed to create resume. Please try again.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back Button */}
      <Link href="/resumes" className="inline-flex items-center text-slate-600 hover:text-slate-900">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Resumes
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Create New Resume</h1>
        <p className="text-slate-600 mt-2">
          {step === 1 ? 'Choose how you want to start' : 'Name your resume and select a template'}
        </p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-4">
        <div className={`flex items-center gap-2 ${step >= 1 ? 'text-blue-600' : 'text-slate-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-200'}`}>
            1
          </div>
          <span className="font-medium">Choose Method</span>
        </div>
        <div className="flex-1 h-px bg-slate-200" />
        <div className={`flex items-center gap-2 ${step >= 2 ? 'text-blue-600' : 'text-slate-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-200'}`}>
            2
          </div>
          <span className="font-medium">Setup</span>
        </div>
      </div>

      {/* Step 1: Choose Method */}
      {step === 1 && (
        <div className="grid md:grid-cols-2 gap-6">
          <Card
            className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-blue-500"
            onClick={() => setStep(2)}
          >
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Start from Scratch</h3>
              <p className="text-slate-600">
                Create a new resume with our easy-to-use editor
              </p>
            </CardContent>
          </Card>

          <Link href="/linkedin-import">
            <Card className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-sky-500 h-full">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Linkedin className="h-8 w-8 text-sky-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Import from LinkedIn</h3>
                <p className="text-slate-600">
                  Auto-fill your resume with LinkedIn profile data
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      )}

      {/* Step 2: Name and Template */}
      {step === 2 && (
        <div className="space-y-8">
          {/* Resume Title */}
          <Card>
            <CardHeader>
              <CardTitle>Resume Title</CardTitle>
              <CardDescription>
                Give your resume a name to identify it easily
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-w-md">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Software Engineer Resume, Marketing CV"
                  value={resumeTitle}
                  onChange={(e) => setResumeTitle(e.target.value)}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>

          {/* Template Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Choose a Template</CardTitle>
              <CardDescription>
                Select a professional template to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`cursor-pointer rounded-lg border-2 p-3 transition-all ${
                      selectedTemplate === template.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="aspect-[8.5/11] bg-slate-100 rounded mb-3 flex items-center justify-center">
                      <FileText className="h-8 w-8 text-slate-300" />
                    </div>
                    <h4 className="font-medium text-sm text-slate-900">{template.name}</h4>
                    <p className="text-xs text-slate-500">{template.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => setStep(1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button onClick={handleCreateResume} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <ArrowRight className="h-4 w-4 mr-2" />
              )}
              Create Resume
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
