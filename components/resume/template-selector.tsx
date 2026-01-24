'use client'

import { useResumeStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { templates } from '@/lib/templates'
import { Palette, Check } from 'lucide-react'
import { useState } from 'react'

export function TemplateSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const { templateId, setTemplateId } = useResumeStore()

  const handleSelectTemplate = (id: string) => {
    setTemplateId(id)
    setIsOpen(false)
  }

  const currentTemplate = templates.find(t => t.id === templateId)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Palette className="h-4 w-4" />
          {currentTemplate?.name || 'Template'}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choose a Template</DialogTitle>
          <DialogDescription>
            Select a professional template for your resume
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => handleSelectTemplate(template.id)}
              className={`relative cursor-pointer rounded-lg border-2 overflow-hidden transition-all hover:shadow-lg ${
                templateId === template.id
                  ? 'border-blue-600 ring-2 ring-blue-200'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Template Preview */}
              <div 
                className="aspect-[8.5/11] relative"
                style={{ backgroundColor: template.colors.background }}
              >
                {/* Mini preview representation */}
                <div className="absolute inset-2 flex flex-col">
                  {/* Header */}
                  <div 
                    className={`h-8 rounded mb-2 ${
                      template.layout === 'two-column' ? 'flex' : ''
                    }`}
                    style={{ 
                      backgroundColor: template.layout === 'two-column' 
                        ? template.colors.primary 
                        : template.colors.accent 
                    }}
                  />
                  
                  {/* Content */}
                  <div className={`flex-1 flex ${template.layout === 'two-column' ? 'gap-2' : 'flex-col gap-1'}`}>
                    {template.layout === 'two-column' && (
                      <div 
                        className="w-1/3 rounded"
                        style={{ backgroundColor: template.colors.primary }}
                      />
                    )}
                    <div className={`${template.layout === 'two-column' ? 'w-2/3' : 'w-full'} space-y-1`}>
                      <div className="h-2 rounded" style={{ backgroundColor: template.colors.accent, width: '60%' }} />
                      <div className="h-1 rounded" style={{ backgroundColor: template.colors.accent, width: '80%' }} />
                      <div className="h-1 rounded" style={{ backgroundColor: template.colors.accent, width: '70%' }} />
                      <div className="h-2 mt-2 rounded" style={{ backgroundColor: template.colors.accent, width: '50%' }} />
                      <div className="h-1 rounded" style={{ backgroundColor: template.colors.accent, width: '90%' }} />
                      <div className="h-1 rounded" style={{ backgroundColor: template.colors.accent, width: '75%' }} />
                    </div>
                  </div>
                </div>

                {/* Selected checkmark */}
                {templateId === template.id && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}

                {/* ATS Badge */}
                {template.isAts && (
                  <Badge className="absolute bottom-2 left-2 bg-green-500 text-white text-[10px]">
                    ATS
                  </Badge>
                )}
              </div>

              {/* Info */}
              <div className="p-3 bg-white">
                <h3 className="font-semibold text-slate-900 text-sm">{template.name}</h3>
                <p className="text-xs text-slate-500 line-clamp-1">{template.description}</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}