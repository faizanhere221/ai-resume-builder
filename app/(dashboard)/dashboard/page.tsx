import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  FileText,
  Plus,
  Sparkles,
} from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const userName = user?.user_metadata?.full_name?.split(' ')[0] || 'there'

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Welcome back, {userName}!</h1>
        <p className="text-slate-600 mt-2">
          Ready to create your next winning resume?
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/resumes/new">
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-2 border-dashed border-blue-200 bg-blue-50/50">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Plus className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Create New Resume</h3>
                <p className="text-sm text-slate-600">Start from scratch</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/templates">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Sparkles className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Browse Templates</h3>
                <p className="text-sm text-slate-600">10+ professional designs</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Resumes</p>
                <p className="text-3xl font-bold text-slate-900">0</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Downloads</p>
                <p className="text-3xl font-bold text-slate-900">0</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Avg ATS Score</p>
                <p className="text-3xl font-bold text-slate-900">--</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Empty State */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Resumes</CardTitle>
          <CardDescription>Your most recently edited resumes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No resumes yet</h3>
            <p className="text-slate-600 mb-4">Create your first resume to get started</p>
            <Link href="/resumes/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Resume
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}