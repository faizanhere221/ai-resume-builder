'use client'

import { useResumeStore } from '@/lib/store'
import { Progress } from '@/components/ui/progress'
import { CheckCircle, Circle, AlertCircle } from 'lucide-react'

interface CheckItem {
  label: string
  points: number
  isComplete: boolean
}

export function ProfileStrength() {
  const { currentResume, profileStrength } = useResumeStore()
  const { personalInfo, summary, experience, education, skills } = currentResume

  const checks: CheckItem[] = [
    {
      label: 'Add profile summary',
      points: 15,
      isComplete: !!summary && summary.length > 50,
    },
    {
      label: 'Add job title',
      points: 10,
      isComplete: !!personalInfo.jobTitle,
    },
    {
      label: 'Add email',
      points: 5,
      isComplete: !!personalInfo.email,
    },
    {
      label: 'Add employment history',
      points: 25,
      isComplete: experience.length > 0 && experience.some(e => e.description && e.description.length > 50),
    },
    {
      label: 'Add education',
      points: 15,
      isComplete: education.length > 0,
    },
    {
      label: 'Add skills',
      points: 10,
      isComplete: skills.length >= 3,
    },
    {
      label: 'Add LinkedIn URL',
      points: 5,
      isComplete: !!personalInfo.linkedin,
    },
  ]

  const getStrengthLabel = () => {
    if (profileStrength >= 80) return { text: 'Excellent', color: 'text-green-600' }
    if (profileStrength >= 60) return { text: 'Good', color: 'text-blue-600' }
    if (profileStrength >= 40) return { text: 'Fair', color: 'text-yellow-600' }
    return { text: 'Needs Work', color: 'text-red-600' }
  }

  const getProgressColor = () => {
    if (profileStrength >= 80) return 'bg-green-500'
    if (profileStrength >= 60) return 'bg-blue-500'
    if (profileStrength >= 40) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const strengthLabel = getStrengthLabel()

  return (
    <div className="bg-white rounded-lg border p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-900">Profile Strength</h3>
        <span className={`font-bold ${strengthLabel.color}`}>
          {profileStrength}%
        </span>
      </div>

      <div className="space-y-2">
        <Progress value={profileStrength} className="h-2" />
        <p className={`text-sm font-medium ${strengthLabel.color}`}>
          {strengthLabel.text}
        </p>
      </div>

      <div className="space-y-2 pt-2 border-t">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
          Suggestions
        </p>
        {checks
          .filter(check => !check.isComplete)
          .slice(0, 4)
          .map((check, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Circle className="h-4 w-4 text-slate-300" />
                <span className="text-slate-600">{check.label}</span>
              </div>
              <span className="text-green-600 font-medium">+{check.points}%</span>
            </div>
          ))}
        {checks
          .filter(check => check.isComplete)
          .slice(0, 3)
          .map((check, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-slate-400 line-through">{check.label}</span>
            </div>
          ))}
      </div>
    </div>
  )
}