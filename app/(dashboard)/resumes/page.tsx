import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  FileText,
  Plus,
  MoreVertical,
  Edit,
  Download,
  Copy,
  Trash2,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default async function ResumesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: resumes } = await supabase
    .from('resumes')
    .select('*')
    .eq('user_id', user?.id)
    .order('updated_at', { ascending: false })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Resumes</h1>
          <p className="text-slate-600 mt-1">
            Manage and edit your resumes
          </p>
        </div>
        <Link href="/resumes/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Resume
          </Button>
        </Link>
      </div>

      {/* Resumes Grid */}
      {resumes && resumes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <Card key={resume.id} className="group hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                {/* Preview Thumbnail */}
                <Link href={`/resumes/${resume.id}/edit`}>
                  <div className="aspect-[8.5/11] bg-slate-100 rounded-t-lg relative overflow-hidden cursor-pointer">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FileText className="h-16 w-16 text-slate-300" />
                    </div>
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button size="sm" variant="secondary">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </Link>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 truncate">
                        {resume.title}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">
                        Last edited {new Date(resume.updated_at).toLocaleDateString()}
                      </p>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/resumes/${resume.id}/edit`}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 focus:text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* ATS Score Badge */}
                  {resume.ats_score && (
                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${resume.ats_score}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-600">
                        {resume.ats_score}%
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <FileText className="h-16 w-16 text-slate-300 mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No resumes yet</h3>
            <p className="text-slate-600 mb-6 text-center max-w-md">
              Create your first professional resume and start applying for your dream job.
            </p>
            <div className="flex gap-4">
              <Link href="/resumes/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create from Scratch
                </Button>
              </Link>
              <Link href="/linkedin-import">
                <Button variant="outline">
                  Import from LinkedIn
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}