'use client'

import type { ResumeContent } from '@/types'
import { formatDateRange } from '@/lib/utils'
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react'

interface TemplateProps {
  content: ResumeContent
}

export function ProfessionalTemplate({ content }: TemplateProps) {
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
    references,
    settings,
  } = content
  
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim()

  // Dynamic settings with fallbacks
  const primaryColor = settings?.primaryColor || '#2563eb'
  const secondaryColor = settings?.secondaryColor || '#3b82f6'
  const accentColor = settings?.accentColor || '#dbeafe'
  const textColor = settings?.textColor || '#1e293b'
  const fontFamily = settings?.fontFamily || 'Inter'
  const showIcons = settings?.showIcons !== false

  // Font size mapping
  const fontSizeMap = {
    small: { base: '9pt', section: '15px', name: '26px' },
    medium: { base: '10pt', section: '17px', name: '30px' },
    large: { base: '11pt', section: '19px', name: '34px' },
  }
  const fontSize = fontSizeMap[settings?.fontSize || 'medium']

  // Line spacing mapping
  const lineSpacingMap = { compact: '1.3', normal: '1.5', relaxed: '1.7' }
  const lineHeight = lineSpacingMap[settings?.lineSpacing || 'normal']

  // Margin mapping
  const marginMap = { narrow: '0.5in', normal: '0.75in', wide: '1in' }
  const pageMargin = marginMap[settings?.pageMargins || 'normal']

  return (
    <div 
      className="bg-white min-h-[11in]" 
      style={{ 
        fontSize: fontSize.base,
        fontFamily: `'${fontFamily}', sans-serif`,
        lineHeight,
        color: textColor,
        padding: pageMargin,
      }}
    >
      {/* Header */}
      <header 
        className="text-center pb-4 mb-6"
        style={{ borderBottom: `2px solid ${primaryColor}` }}
      >
        <h1 
          className="font-bold mb-2"
          style={{ fontSize: fontSize.name, color: textColor }}
        >
          {fullName || 'Your Name'}
        </h1>
        
        {personalInfo.jobTitle && (
          <p className="text-lg mb-2" style={{ color: secondaryColor }}>
            {personalInfo.jobTitle}
          </p>
        )}
        
        {/* Contact Info */}
        <div className="flex flex-wrap justify-center gap-4 text-sm" style={{ color: textColor }}>
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              {showIcons && <Mail className="h-3 w-3" />}
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              {showIcons && <Phone className="h-3 w-3" />}
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              {showIcons && <MapPin className="h-3 w-3" />}
              {personalInfo.location}
            </span>
          )}
        </div>

        {/* Links */}
        {(personalInfo.linkedin || personalInfo.github || personalInfo.website) && (
          <div className="flex flex-wrap justify-center gap-4 text-sm mt-2" style={{ color: primaryColor }}>
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1">
                {showIcons && <Linkedin className="h-3 w-3" />}
                {personalInfo.linkedin}
              </span>
            )}
            {personalInfo.github && (
              <span className="flex items-center gap-1">
                {showIcons && <Github className="h-3 w-3" />}
                {personalInfo.github}
              </span>
            )}
            {personalInfo.website && (
              <span className="flex items-center gap-1">
                {showIcons && <Globe className="h-3 w-3" />}
                {personalInfo.website}
              </span>
            )}
          </div>
        )}
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-6">
          <h2 
            className="text-lg font-bold pb-1 mb-3"
            style={{ color: primaryColor, borderBottom: `1px solid ${accentColor}`, fontSize: fontSize.section }}
          >
            Professional Summary
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
            className="text-lg font-bold pb-1 mb-3"
            style={{ color: primaryColor, borderBottom: `1px solid ${accentColor}`, fontSize: fontSize.section }}
          >
            Work Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold" style={{ color: textColor }}>{exp.title}</h3>
                    <p style={{ color: secondaryColor }}>{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                  </div>
                  <span 
                    className="text-sm whitespace-nowrap px-2 py-0.5 rounded"
                    style={{ backgroundColor: accentColor, color: primaryColor }}
                  >
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
                {exp.description && (
                  <div 
                    className="mt-2 text-sm prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0"
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
            className="text-lg font-bold pb-1 mb-3"
            style={{ color: primaryColor, borderBottom: `1px solid ${accentColor}`, fontSize: fontSize.section }}
          >
            Internships
          </h2>
          <div className="space-y-4">
            {internships.map((intern) => (
              <div key={intern.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold" style={{ color: textColor }}>{intern.title}</h3>
                    <p style={{ color: secondaryColor }}>{intern.company}{intern.location ? `, ${intern.location}` : ''}</p>
                  </div>
                  <span 
                    className="text-sm whitespace-nowrap px-2 py-0.5 rounded"
                    style={{ backgroundColor: accentColor, color: primaryColor }}
                  >
                    {formatDateRange(intern.startDate, intern.endDate)}
                  </span>
                </div>
                {intern.description && (
                  <div 
                    className="mt-2 text-sm prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: intern.description }}
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
          <h2 
            className="text-lg font-bold pb-1 mb-3"
            style={{ color: primaryColor, borderBottom: `1px solid ${accentColor}`, fontSize: fontSize.section }}
          >
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold" style={{ color: textColor }}>{edu.school}</h3>
                  <p style={{ color: secondaryColor }}>
                    {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                  </p>
                </div>
                <span className="text-sm" style={{ color: secondaryColor }}>
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
          <h2 
            className="text-lg font-bold pb-1 mb-3"
            style={{ color: primaryColor, borderBottom: `1px solid ${accentColor}`, fontSize: fontSize.section }}
          >
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="px-3 py-1 rounded-full text-sm"
                style={{ backgroundColor: accentColor, color: primaryColor }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-6">
          <h2 
            className="text-lg font-bold pb-1 mb-3"
            style={{ color: primaryColor, borderBottom: `1px solid ${accentColor}`, fontSize: fontSize.section }}
          >
            Projects
          </h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-bold" style={{ color: textColor }}>{project.name}</h3>
                {project.description && (
                  <p className="text-sm mt-1" style={{ color: textColor }}>{project.description}</p>
                )}
                {project.technologies && project.technologies.length > 0 && (
                  <p className="text-sm mt-1" style={{ color: secondaryColor }}>
                    Technologies: {project.technologies.join(', ')}
                  </p>
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
            className="text-lg font-bold pb-1 mb-3"
            style={{ color: primaryColor, borderBottom: `1px solid ${accentColor}`, fontSize: fontSize.section }}
          >
            Certifications
          </h2>
          <div className="space-y-2">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between">
                <div>
                  <span className="font-medium" style={{ color: textColor }}>{cert.name}</span>
                  {cert.issuer && <span style={{ color: secondaryColor }}> - {cert.issuer}</span>}
                </div>
                {cert.issueDate && (
                  <span className="text-sm" style={{ color: secondaryColor }}>{cert.issueDate}</span>
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
            className="text-lg font-bold pb-1 mb-3"
            style={{ color: primaryColor, borderBottom: `1px solid ${accentColor}`, fontSize: fontSize.section }}
          >
            Awards & Honors
          </h2>
          <div className="space-y-2">
            {awards.map((award) => (
              <div key={award.id} className="flex justify-between">
                <div>
                  <span className="font-medium" style={{ color: textColor }}>{award.title}</span>
                  {award.issuer && <span style={{ color: secondaryColor }}> - {award.issuer}</span>}
                </div>
                {award.date && (
                  <span className="text-sm" style={{ color: secondaryColor }}>{award.date}</span>
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
            className="text-lg font-bold pb-1 mb-3"
            style={{ color: primaryColor, borderBottom: `1px solid ${accentColor}`, fontSize: fontSize.section }}
          >
            Courses & Training
          </h2>
          <div className="space-y-2">
            {courses.map((course) => (
              <div key={course.id} className="flex justify-between">
                <div>
                  <span className="font-medium" style={{ color: textColor }}>{course.name}</span>
                  {course.institution && <span style={{ color: secondaryColor }}> - {course.institution}</span>}
                </div>
                {course.completionDate && (
                  <span className="text-sm" style={{ color: secondaryColor }}>{course.completionDate}</span>
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
            className="text-lg font-bold pb-1 mb-3"
            style={{ color: primaryColor, borderBottom: `1px solid ${accentColor}`, fontSize: fontSize.section }}
          >
            Volunteer Experience
          </h2>
          <div className="space-y-3">
            {volunteer.map((vol) => (
              <div key={vol.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold" style={{ color: textColor }}>{vol.role}</h3>
                    <p style={{ color: secondaryColor }}>{vol.organization}</p>
                  </div>
                  {(vol.startDate || vol.endDate) && (
                    <span className="text-sm" style={{ color: secondaryColor }}>
                      {formatDateRange(vol.startDate || '', vol.endDate || '')}
                    </span>
                  )}
                </div>
                {vol.description && (
                  <div 
                    className="mt-2 text-sm prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: vol.description }}
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {languages && languages.length > 0 && (
        <section className="mb-6">
          <h2 
            className="text-lg font-bold pb-1 mb-3"
            style={{ color: primaryColor, borderBottom: `1px solid ${accentColor}`, fontSize: fontSize.section }}
          >
            Languages
          </h2>
          <div className="flex flex-wrap gap-4">
            {languages.map((lang) => (
              <span key={lang.id} style={{ color: textColor }}>
                {lang.name}
                {lang.proficiency && (
                  <span style={{ color: secondaryColor }}> ({lang.proficiency})</span>
                )}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Hobbies */}
      {hobbies && hobbies.length > 0 && (
        <section className="mb-6">
          <h2 
            className="text-lg font-bold pb-1 mb-3"
            style={{ color: primaryColor, borderBottom: `1px solid ${accentColor}`, fontSize: fontSize.section }}
          >
            Interests
          </h2>
          <p style={{ color: textColor }}>
            {hobbies.map(h => h.name).join(' • ')}
          </p>
        </section>
      )}

      {/* References */}
      {references && references.length > 0 && (
        <section>
          <h2 
            className="text-lg font-bold pb-1 mb-3"
            style={{ color: primaryColor, borderBottom: `1px solid ${accentColor}`, fontSize: fontSize.section }}
          >
            References
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {references.map((ref) => (
              <div key={ref.id}>
                <h3 className="font-bold" style={{ color: textColor }}>{ref.name}</h3>
                <p className="text-sm" style={{ color: secondaryColor }}>{ref.position} at {ref.company}</p>
                {ref.email && <p className="text-sm" style={{ color: textColor }}>{ref.email}</p>}
                {ref.phone && <p className="text-sm" style={{ color: textColor }}>{ref.phone}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}