'use client'

import { useState } from 'react'
import { useResumeStore } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RichTextEditor } from '@/components/editor/rich-text-editor'
import { generateId } from '@/lib/utils'
import {
  FolderGit2,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  GripVertical,
  ExternalLink,
  X,
} from 'lucide-react'

interface ProjectsSectionProps {
  isOpen: boolean
  onToggle: () => void
}

export function ProjectsSection({ isOpen, onToggle }: ProjectsSectionProps) {
  const { currentResume, addProject, updateProject, removeProject } = useResumeStore()
  const projects = currentResume.projects || []
  const [techInput, setTechInput] = useState<{ [key: string]: string }>({})

  const handleAddProject = () => {
    addProject({
      id: generateId(),
      name: '',
      description: '',
      url: '',
      startDate: '',
      endDate: '',
      technologies: [],
    })
  }

  const handleAddTechnology = (projectId: string) => {
    const tech = techInput[projectId]?.trim()
    if (!tech) return
    
    const project = projects.find(p => p.id === projectId)
    if (!project) return
    
    const currentTech = project.technologies || []
    if (!currentTech.includes(tech)) {
      updateProject(projectId, { technologies: [...currentTech, tech] })
    }
    setTechInput({ ...techInput, [projectId]: '' })
  }

  const handleRemoveTechnology = (projectId: string, techToRemove: string) => {
    const project = projects.find(p => p.id === projectId)
    if (!project) return
    
    updateProject(projectId, {
      technologies: (project.technologies || []).filter(t => t !== techToRemove)
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent, projectId: string) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTechnology(projectId)
    }
  }

  return (
    <Card>
      <CardHeader className="cursor-pointer" onClick={onToggle}>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FolderGit2 className="h-5 w-5 text-orange-600" />
            Projects
            <span className="text-sm font-normal text-slate-500">({projects.length})</span>
          </CardTitle>
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </CardHeader>
      
      {isOpen && (
        <CardContent className="space-y-4">
          {projects.length === 0 && (
            <div className="text-center py-8 bg-slate-50 rounded-lg border-2 border-dashed">
              <FolderGit2 className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600 mb-1">No projects added yet</p>
              <p className="text-sm text-slate-400 mb-4">Showcase your personal or professional projects</p>
              <Button onClick={handleAddProject}>
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </div>
          )}

          {projects.map((project, index) => (
            <div key={project.id} className="border rounded-lg p-4 space-y-4 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GripVertical className="h-5 w-5 text-slate-300 cursor-grab" />
                  <span className="font-medium text-slate-700">
                    {project.name || `Project ${index + 1}`}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeProject(project.id)}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Project Name *</Label>
                  <Input
                    value={project.name}
                    onChange={(e) => updateProject(project.id, { name: e.target.value })}
                    placeholder="E-commerce Platform"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Project URL</Label>
                  <div className="relative">
                    <Input
                      value={project.url || ''}
                      onChange={(e) => updateProject(project.id, { url: e.target.value })}
                      placeholder="https://github.com/..."
                      className="pr-10"
                    />
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={project.startDate || ''}
                    onChange={(e) => updateProject(project.id, { startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={project.endDate || ''}
                    onChange={(e) => updateProject(project.id, { endDate: e.target.value })}
                    placeholder="Leave empty if ongoing"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Technologies Used</Label>
                <div className="flex gap-2">
                  <Input
                    value={techInput[project.id] || ''}
                    onChange={(e) => setTechInput({ ...techInput, [project.id]: e.target.value })}
                    onKeyDown={(e) => handleKeyDown(e, project.id)}
                    placeholder="Type a technology and press Enter"
                    className="flex-1"
                  />
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => handleAddTechnology(project.id)}
                  >
                    Add
                  </Button>
                </div>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologies.map((tech, i) => (
                      <Badge key={i} variant="secondary" className="gap-1">
                        {tech}
                        <button
                          type="button"
                          onClick={() => handleRemoveTechnology(project.id, tech)}
                          className="ml-1 hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <RichTextEditor
                  content={project.description}
                  onChange={(content) => updateProject(project.id, { description: content })}
                  placeholder="Describe the project, your role, and key achievements...

- Built a full-stack e-commerce platform
- Implemented payment processing with Stripe
- Achieved 99.9% uptime in production"
                  minHeight="120px"
                />
              </div>
            </div>
          ))}

          {projects.length > 0 && (
            <Button variant="outline" onClick={handleAddProject} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Another Project
            </Button>
          )}
        </CardContent>
      )}
    </Card>
  )
}