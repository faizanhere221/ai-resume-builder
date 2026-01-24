'use client'

import { useResumeStore } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { generateId } from '@/lib/utils'
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  GripVertical,
} from 'lucide-react'

interface CoursesSectionProps {
  isOpen: boolean
  onToggle: () => void
}

export function CoursesSection({ isOpen, onToggle }: CoursesSectionProps) {
  const { currentResume, addCourse, updateCourse, removeCourse } = useResumeStore()
  const courses = currentResume.courses || []

  const handleAddCourse = () => {
    addCourse({
      id: generateId(),
      name: '',
      institution: '',
      completionDate: '',
      description: '',
    })
  }

  return (
    <Card>
      <CardHeader className="cursor-pointer" onClick={onToggle}>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <BookOpen className="h-5 w-5 text-cyan-600" />
            Courses & Training
            <span className="text-sm font-normal text-slate-500">({courses.length})</span>
          </CardTitle>
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </CardHeader>
      
      {isOpen && (
        <CardContent className="space-y-4">
          {courses.length === 0 && (
            <div className="text-center py-8 bg-slate-50 rounded-lg border-2 border-dashed">
              <BookOpen className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600 mb-1">No courses added yet</p>
              <p className="text-sm text-slate-400 mb-4">Add online courses, workshops, or training programs</p>
              <Button onClick={handleAddCourse}>
                <Plus className="h-4 w-4 mr-2" />
                Add Course
              </Button>
            </div>
          )}

          {courses.map((course, index) => (
            <div key={course.id} className="border rounded-lg p-4 space-y-4 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GripVertical className="h-5 w-5 text-slate-300 cursor-grab" />
                  <span className="font-medium text-slate-700">
                    {course.name || `Course ${index + 1}`}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeCourse(course.id)}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Course Name *</Label>
                  <Input
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, { name: e.target.value })}
                    placeholder="Machine Learning Specialization"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Institution / Platform *</Label>
                  <Input
                    value={course.institution}
                    onChange={(e) => updateCourse(course.id, { institution: e.target.value })}
                    placeholder="Coursera, Udemy, etc."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Completion Date</Label>
                <Input
                  type="month"
                  value={course.completionDate || ''}
                  onChange={(e) => updateCourse(course.id, { completionDate: e.target.value })}
                  className="w-48"
                />
              </div>

              <div className="space-y-2">
                <Label>Description (Optional)</Label>
                <Textarea
                  value={course.description || ''}
                  onChange={(e) => updateCourse(course.id, { description: e.target.value })}
                  placeholder="Key topics covered, skills learned, or notable projects..."
                  rows={2}
                />
              </div>
            </div>
          ))}

          {courses.length > 0 && (
            <Button variant="outline" onClick={handleAddCourse} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Another Course
            </Button>
          )}
        </CardContent>
      )}
    </Card>
  )
}