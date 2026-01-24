'use client'

import { useResumeStore } from '@/lib/store'
import { ProfessionalTemplate } from './templates/professional-template'
import { ModernTemplate } from './templates/modern-template'
import { ElegantTemplate } from './templates/elegant-template'
import { MinimalTemplate } from './templates/minimal-template'
import { CreativeTemplate } from './templates/creative-template'

export function ResumePreview() {
  const { currentResume, templateId } = useResumeStore()

  // Render the appropriate template based on templateId
  const renderTemplate = () => {
    switch (templateId) {
      case 'modern':
        return <ModernTemplate content={currentResume} />
      case 'elegant':
        return <ElegantTemplate content={currentResume} />
      case 'minimal':
        return <MinimalTemplate content={currentResume} />
      case 'creative':
        return <CreativeTemplate content={currentResume} />
      case 'professional':
      default:
        return <ProfessionalTemplate content={currentResume} />
    }
  }

  return (
    <div className="shadow-xl rounded-lg overflow-hidden">
      {renderTemplate()}
    </div>
  )
}