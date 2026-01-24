'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { analyzeResume, type ATSCheck } from '@/lib/utils/ats-analyzer'
import type { ResumeContent } from '@/types'
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Target,
} from 'lucide-react'

interface ATSScoreProps {
  content: ResumeContent
}

export function ATSScore({ content }: ATSScoreProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])

  // Use useMemo instead of useEffect + useState
  const result = useMemo(() => analyzeResume(content), [content])

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case 'fail':
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A':
        return 'text-green-600 bg-green-100'
      case 'B':
        return 'text-blue-600 bg-blue-100'
      case 'C':
        return 'text-yellow-600 bg-yellow-100'
      case 'D':
        return 'text-orange-600 bg-orange-100'
      case 'F':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-slate-600 bg-slate-100'
    }
  }

  // Group checks by category
  const groupedChecks = useMemo(() => {
    return result.checks.reduce((acc, check) => {
      if (!acc[check.category]) {
        acc[check.category] = []
      }
      acc[check.category].push(check)
      return acc
    }, {} as Record<string, ATSCheck[]>)
  }, [result.checks])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Target className="h-4 w-4" />
          ATS Score: {result.score}%
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            ATS Compatibility Score
          </DialogTitle>
          <DialogDescription>
            See how well your resume will perform with Applicant Tracking Systems
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Score Overview */}
          <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-xl">
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full text-3xl font-bold ${getGradeColor(result.grade)}`}>
                {result.grade}
              </div>
              <p className="text-sm text-slate-500 mt-2">Grade</p>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">{result.score}%</span>
                <span className="text-sm text-slate-500">ATS Score</span>
              </div>
              <Progress value={result.score} className="h-3" />
              <p className="text-sm text-slate-600 mt-3">{result.summary}</p>
            </div>
          </div>

          {/* Top Improvements */}
          {result.improvements.length > 0 && (
            <Card className="border-amber-200 bg-amber-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2 text-amber-800">
                  <Sparkles className="h-4 w-4" />
                  Top Improvements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.improvements.map((improvement, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-amber-900">
                      <span className="font-medium text-amber-600">{i + 1}.</span>
                      {improvement}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Detailed Checks */}
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900">Detailed Analysis</h3>
            
            {Object.entries(groupedChecks).map(([category, checks]) => {
              const categoryScore = checks.reduce((sum, c) => sum + c.score, 0)
              const categoryMax = checks.reduce((sum, c) => sum + c.maxScore, 0)
              const categoryPercent = Math.round((categoryScore / categoryMax) * 100)
              const isExpanded = expandedCategories.includes(category)
              const worstStatus = checks.some(c => c.status === 'fail') 
                ? 'fail' 
                : checks.some(c => c.status === 'warning') 
                ? 'warning' 
                : 'pass'

              return (
                <Card key={category} className="overflow-hidden">
                  <div 
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50"
                    onClick={() => toggleCategory(category)}
                  >
                    <div className="flex items-center gap-3">
                      {getStatusIcon(worstStatus)}
                      <div>
                        <p className="font-medium">{category}</p>
                        <p className="text-sm text-slate-500">
                          {categoryScore}/{categoryMax} points ({categoryPercent}%)
                        </p>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-slate-400" />
                    )}
                  </div>

                  {isExpanded && (
                    <div className="border-t px-4 py-3 bg-slate-50 space-y-3">
                      {checks.map(check => (
                        <div key={check.id} className="flex items-start gap-3">
                          {getStatusIcon(check.status)}
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">{check.name}</p>
                              <span className="text-xs text-slate-500">
                                {check.score}/{check.maxScore}
                              </span>
                            </div>
                            <p className="text-sm text-slate-600">{check.message}</p>
                            {check.suggestion && check.status !== 'pass' && (
                              <p className="text-sm text-blue-600 mt-1">
                                💡 {check.suggestion}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              )
            })}
          </div>

          {/* Tips */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h4 className="font-medium text-blue-900 mb-2">💡 ATS Tips</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Use standard section headings (Experience, Education, Skills)</li>
                <li>• Avoid tables, graphics, and unusual formatting</li>
                <li>• Include keywords from the job description</li>
                <li>• Use a clean, simple font (Arial, Calibri, Times New Roman)</li>
                <li>• Save your resume as PDF or DOCX</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}