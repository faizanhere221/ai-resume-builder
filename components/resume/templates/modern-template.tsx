'use client'

import type { ResumeContent } from '@/types'
import { formatDateRange } from '@/lib/utils'
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react'

interface TemplateProps {
  content: ResumeContent
}

export function ModernTemplate({ content }: TemplateProps) {
  const { 
    personalInfo, 
    summary, 
    experience, 
    education, 
    skills, 
    projects, 
    certifications, 
    languages,
    awards,
    courses,
    internships,
    volunteer,
    hobbies,
    settings,
  } = content
  
  // Get dynamic settings with fallbacks
  const primaryColor = settings?.primaryColor || '#1e293b'
  const secondaryColor = settings?.secondaryColor || '#475569'
  const accentColor = settings?.accentColor || '#e2e8f0'
  const textColor = settings?.textColor || '#1e293b'
  const fontFamily = settings?.fontFamily || 'Inter'
  const showIcons = settings?.showIcons !== false

  // Font size mapping
  const fontSizeMap = {
    small: { base: '9pt', heading: '10pt', title: '20pt', section: '14pt' },
    medium: { base: '10pt', heading: '11pt', title: '24pt', section: '16pt' },
    large: { base: '11pt', heading: '12pt', title: '28pt', section: '18pt' },
  }
  const fontSize = fontSizeMap[settings?.fontSize || 'medium']

  // Line spacing mapping
  const lineSpacingMap = {
    compact: '1.3',
    normal: '1.5',
    relaxed: '1.7',
  }
  const lineHeight = lineSpacingMap[settings?.lineSpacing || 'normal']

  // Margin mapping
  const marginMap = {
    narrow: '0.5in',
    normal: '0.75in',
    wide: '1in',
  }

  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim()

  return (
    <div 
      className="bg-white min-h-[11in] flex" 
      style={{ 
        fontSize: fontSize.base,
        fontFamily: `'${fontFamily}', sans-serif`,
        lineHeight,
        color: textColor,
      }}
    >
      {/* Sidebar */}
      <div 
        className="w-1/3 text-white p-6"
        style={{ backgroundColor: primaryColor }}
      >
        {/* Name */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1" style={{ fontSize: fontSize.title }}>
            {personalInfo.firstName || 'Your'}
          </h1>
          <h1 className="text-2xl font-bold" style={{ color: accentColor, fontSize: fontSize.title }}>
            {personalInfo.lastName || 'Name'}
          </h1>
          {personalInfo.jobTitle && (
            <p className="mt-2 opacity-90" style={{ fontSize: fontSize.heading }}>
              {personalInfo.jobTitle}
            </p>
          )}
        </div>

        {/* Contact */}
        <div className="mb-8">
          <h2 
            className="text-xs font-bold uppercase tracking-wider mb-3"
            style={{ color: accentColor }}
          >
            Contact
          </h2>
          <div className="space-y-2" style={{ fontSize: fontSize.base }}>
            {personalInfo.email && (
              <div className="flex items-center gap-2">
                {showIcons && <Mail className="h-4 w-4 opacity-70" />}
                <span className="break-all">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                {showIcons && <Phone className="h-4 w-4 opacity-70" />}
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2">
                {showIcons && <MapPin className="h-4 w-4 opacity-70" />}
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-2">
                {showIcons && <Linkedin className="h-4 w-4 opacity-70" />}
                <span className="break-all text-xs">{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center gap-2">
                {showIcons && <Github className="h-4 w-4 opacity-70" />}
                <span className="break-all text-xs">{personalInfo.github}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center gap-2">
                {showIcons && <Globe className="h-4 w-4 opacity-70" />}
                <span className="break-all text-xs">{personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-8">
            <h2 
              className="text-xs font-bold uppercase tracking-wider mb-3"
              style={{ color: accentColor }}
            >
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-2 py-1 rounded text-xs"
                  style={{ backgroundColor: secondaryColor }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages && languages.length > 0 && (
          <div className="mb-8">
            <h2 
              className="text-xs font-bold uppercase tracking-wider mb-3"
              style={{ color: accentColor }}
            >
              Languages
            </h2>
            <div className="space-y-2">
              {languages.map((lang) => (
                <div key={lang.id} className="flex justify-between" style={{ fontSize: fontSize.base }}>
                  <span>{lang.name}</span>
                  <span className="text-xs opacity-70">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hobbies */}
        {hobbies && hobbies.length > 0 && (
          <div className="mb-8">
            <h2 
              className="text-xs font-bold uppercase tracking-wider mb-3"
              style={{ color: accentColor }}
            >
              Interests
            </h2>
            <div className="flex flex-wrap gap-2">
              {hobbies.map((hobby) => (
                <span key={hobby.id} className="text-sm opacity-90">
                  {hobby.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Education in Sidebar */}
        {education.length > 0 && (
          <div>
            <h2 
              className="text-xs font-bold uppercase tracking-wider mb-3"
              style={{ color: accentColor }}
            >
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-semibold" style={{ fontSize: fontSize.base }}>{edu.school}</h3>
                  <p className="text-xs opacity-80">
                    {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                  </p>
                  <p className="text-xs opacity-60 mt-1">
                    {formatDateRange(edu.startDate, edu.endDate)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-6">
        {/* Summary */}
        {summary && (
          <section className="mb-6">
            <h2 
              className="font-bold border-b-2 pb-1 mb-3"
              style={{ 
                fontSize: fontSize.section, 
                color: primaryColor,
                borderColor: primaryColor,
              }}
            >
              About Me
            </h2>
            <div 
              className="prose prose-sm max-w-none"
              style={{ color: textColor }}
              dangerouslySetInnerHTML={{ __html: summary }}
            />
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-6">
            <h2 
              className="font-bold border-b-2 pb-1 mb-3"
              style={{ 
                fontSize: fontSize.section, 
                color: primaryColor,
                borderColor: primaryColor,
              }}
            >
              Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold" style={{ color: primaryColor }}>{exp.title}</h3>
                      <p className="text-sm" style={{ color: secondaryColor }}>
                        {exp.company}{exp.location ? ` • ${exp.location}` : ''}
                      </p>
                    </div>
                    <span 
                      className="text-xs px-2 py-1 rounded"
                      style={{ backgroundColor: accentColor, color: primaryColor }}
                    >
                      {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                    </span>
                  </div>
                  {exp.description && (
                    <div 
                      className="mt-2 text-sm leading-relaxed prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0"
                      dangerouslySetInnerHTML={{ __html: exp.description }}
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Internships */}
        {internships && internships.length > 0 && (
          <section className="mb-6">
            <h2 
              className="font-bold border-b-2 pb-1 mb-3"
              style={{ 
                fontSize: fontSize.section, 
                color: primaryColor,
                borderColor: primaryColor,
              }}
            >
              Internships
            </h2>
            <div className="space-y-4">
              {internships.map((intern) => (
                <div key={intern.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold" style={{ color: primaryColor }}>{intern.title}</h3>
                      <p className="text-sm" style={{ color: secondaryColor }}>
                        {intern.company}{intern.location ? ` • ${intern.location}` : ''}
                      </p>
                    </div>
                    <span 
                      className="text-xs px-2 py-1 rounded"
                      style={{ backgroundColor: accentColor, color: primaryColor }}
                    >
                      {formatDateRange(intern.startDate, intern.endDate)}
                    </span>
                  </div>
                  {intern.description && (
                    <div 
                      className="mt-2 text-sm leading-relaxed prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: intern.description }}
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section className="mb-6">
            <h2 
              className="font-bold border-b-2 pb-1 mb-3"
              style={{ 
                fontSize: fontSize.section, 
                color: primaryColor,
                borderColor: primaryColor,
              }}
            >
              Projects
            </h2>
            <div className="space-y-3">
              {projects.map((project) => (
                <div key={project.id}>
                  <h3 className="font-bold" style={{ color: primaryColor }}>{project.name}</h3>
                  {project.description && (
                    <p className="text-sm mt-1" style={{ color: textColor }}>{project.description}</p>
                  )}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.technologies.map((tech, i) => (
                        <span 
                          key={i} 
                          className="text-xs px-2 py-0.5 rounded"
                          style={{ backgroundColor: accentColor }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <section className="mb-6">
            <h2 
              className="font-bold border-b-2 pb-1 mb-3"
              style={{ 
                fontSize: fontSize.section, 
                color: primaryColor,
                borderColor: primaryColor,
              }}
            >
              Certifications
            </h2>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-center">
                  <div>
                    <span className="font-medium" style={{ color: primaryColor }}>{cert.name}</span>
                    {cert.issuer && (
                      <span className="text-sm" style={{ color: secondaryColor }}> • {cert.issuer}</span>
                    )}
                  </div>
                  {cert.issueDate && (
                    <span className="text-xs" style={{ color: secondaryColor }}>{cert.issueDate}</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Awards */}
        {awards && awards.length > 0 && (
          <section className="mb-6">
            <h2 
              className="font-bold border-b-2 pb-1 mb-3"
              style={{ 
                fontSize: fontSize.section, 
                color: primaryColor,
                borderColor: primaryColor,
              }}
            >
              Awards & Honors
            </h2>
            <div className="space-y-2">
              {awards.map((award) => (
                <div key={award.id} className="flex justify-between items-center">
                  <div>
                    <span className="font-medium" style={{ color: primaryColor }}>{award.title}</span>
                    {award.issuer && (
                      <span className="text-sm" style={{ color: secondaryColor }}> • {award.issuer}</span>
                    )}
                  </div>
                  {award.date && (
                    <span className="text-xs" style={{ color: secondaryColor }}>{award.date}</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Courses */}
        {courses && courses.length > 0 && (
          <section className="mb-6">
            <h2 
              className="font-bold border-b-2 pb-1 mb-3"
              style={{ 
                fontSize: fontSize.section, 
                color: primaryColor,
                borderColor: primaryColor,
              }}
            >
              Courses & Training
            </h2>
            <div className="space-y-2">
              {courses.map((course) => (
                <div key={course.id} className="flex justify-between items-center">
                  <div>
                    <span className="font-medium" style={{ color: primaryColor }}>{course.name}</span>
                    {course.institution && (
                      <span className="text-sm" style={{ color: secondaryColor }}> • {course.institution}</span>
                    )}
                  </div>
                  {course.completionDate && (
                    <span className="text-xs" style={{ color: secondaryColor }}>{course.completionDate}</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Volunteer */}
        {volunteer && volunteer.length > 0 && (
          <section className="mb-6">
            <h2 
              className="font-bold border-b-2 pb-1 mb-3"
              style={{ 
                fontSize: fontSize.section, 
                color: primaryColor,
                borderColor: primaryColor,
              }}
            >
              Volunteer Experience
            </h2>
            <div className="space-y-3">
              {volunteer.map((vol) => (
                <div key={vol.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold" style={{ color: primaryColor }}>{vol.role}</h3>
                      <p className="text-sm" style={{ color: secondaryColor }}>
                        {vol.organization}{vol.location ? ` • ${vol.location}` : ''}
                      </p>
                    </div>
                    {(vol.startDate || vol.endDate) && (
                      <span 
                        className="text-xs px-2 py-1 rounded"
                        style={{ backgroundColor: accentColor, color: primaryColor }}
                      >
                        {formatDateRange(vol.startDate || '', vol.endDate || '')}
                      </span>
                    )}
                  </div>
                  {vol.description && (
                    <div 
                      className="mt-2 text-sm leading-relaxed prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: vol.description }}
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}