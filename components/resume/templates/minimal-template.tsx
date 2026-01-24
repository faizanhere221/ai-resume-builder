'use client'

import type { ResumeContent } from '@/types'
import { formatDateRange } from '@/lib/utils'

interface TemplateProps {
  content: ResumeContent
}

export function MinimalTemplate({ content }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = content
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim()

  return (
    <div className="bg-white p-8 min-h-[11in] font-['Inter']" style={{ fontSize: '10pt' }}>
      {/* Header - Ultra minimal */}
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-neutral-900 mb-2">
          {fullName || 'Your Name'}
        </h1>
        
        <div className="text-sm text-neutral-500 space-x-3">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
        </div>

        {(personalInfo.linkedin || personalInfo.github || personalInfo.website) && (
          <div className="text-sm text-neutral-500 mt-1 space-x-3">
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
            {personalInfo.github && <span>• {personalInfo.github}</span>}
            {personalInfo.website && <span>• {personalInfo.website}</span>}
          </div>
        )}
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-6">
          <div 
  className="text-slate-700 leading-relaxed prose prose-sm max-w-none"
  dangerouslySetInnerHTML={{ __html: summary }}
/>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">
            Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-medium text-neutral-900">{exp.title}</span>
                    <span className="text-neutral-400 mx-2">at</span>
                    <span className="text-neutral-700">{exp.company}</span>
                  </div>
                  <span className="text-sm text-neutral-400">
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
                {exp.description && (
  <div 
    className="mt-2 text-slate-700 text-sm leading-relaxed prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0"
    dangerouslySetInnerHTML={{ __html: exp.description }}
  />
)}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">
            Education
          </h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-medium text-neutral-900">{edu.degree}</span>
                  {edu.field && <span className="text-neutral-600">, {edu.field}</span>}
                  <span className="text-neutral-400 mx-2">—</span>
                  <span className="text-neutral-700">{edu.school}</span>
                </div>
                <span className="text-sm text-neutral-400">
                  {formatDateRange(edu.startDate, edu.endDate)}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">
            Skills
          </h2>
          <p className="text-neutral-700">
            {skills.map(s => s.name).join(' • ')}
          </p>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">
            Projects
          </h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id}>
                <span className="font-medium text-neutral-900">{project.name}</span>
                {project.description && (
                  <p className="text-neutral-600 text-sm mt-1">{project.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">
            Certifications
          </h2>
          <p className="text-neutral-700">
            {certifications.map(c => c.name).join(' • ')}
          </p>
        </section>
      )}
    </div>
  )
}