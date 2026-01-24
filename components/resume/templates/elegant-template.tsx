'use client'

import type { ResumeContent } from '@/types'
import { formatDateRange } from '@/lib/utils'

interface TemplateProps {
  content: ResumeContent
}

interface DividerProps {
  accentColor: string
  secondaryColor: string
}

function Divider({ accentColor, secondaryColor }: DividerProps) {
  return (
    <div className="flex items-center justify-center my-6">
      <div className="h-px flex-1 max-w-[100px]" style={{ backgroundColor: accentColor }} />
      <div className="mx-4" style={{ color: secondaryColor }}>❖</div>
      <div className="h-px flex-1 max-w-[100px]" style={{ backgroundColor: accentColor }} />
    </div>
  )
}

export function ElegantTemplate({ content }: TemplateProps) {
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
  
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim()

  // Dynamic settings with fallbacks
  const primaryColor = settings?.primaryColor || '#92400e'
  const secondaryColor = settings?.secondaryColor || '#b45309'
  const accentColor = settings?.accentColor || '#fef3c7'
  const textColor = settings?.textColor || '#44403c'
  const fontFamily = settings?.fontFamily || 'Georgia'
  const showIcons = settings?.showIcons !== false

  // Font size mapping
  const fontSizeMap = {
    small: { base: '9pt', section: '12px', name: '32px' },
    medium: { base: '10pt', section: '13px', name: '36px' },
    large: { base: '11pt', section: '14px', name: '40px' },
  }
  const fontSize = fontSizeMap[settings?.fontSize || 'medium']

  // Line spacing mapping
  const lineSpacingMap = { compact: '1.4', normal: '1.6', relaxed: '1.8' }
  const lineHeight = lineSpacingMap[settings?.lineSpacing || 'normal']

  // Margin mapping
  const marginMap = { narrow: '0.6in', normal: '0.85in', wide: '1.1in' }
  const pageMargin = marginMap[settings?.pageMargins || 'normal']

  return (
    <div 
      className="bg-white min-h-[11in]" 
      style={{ 
        fontFamily: `'${fontFamily}', serif`,
        fontSize: fontSize.base,
        lineHeight,
        color: textColor,
        padding: pageMargin,
      }}
    >
      {/* Header */}
      <header className="text-center mb-8">
        <h1 
          className="font-normal tracking-wide mb-3"
          style={{ fontSize: fontSize.name, color: primaryColor }}
        >
          {fullName || 'Your Name'}
        </h1>
        
        {personalInfo.jobTitle && (
          <p className="text-lg italic mb-3" style={{ color: secondaryColor }}>
            {personalInfo.jobTitle}
          </p>
        )}
        
        {/* Contact Info - elegant dividers */}
        <div className="flex flex-wrap justify-center items-center gap-2 text-sm" style={{ color: textColor }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.email && personalInfo.phone && <span style={{ color: secondaryColor }}>✦</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.phone && personalInfo.location && <span style={{ color: secondaryColor }}>✦</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>

        {/* Links */}
        {(personalInfo.linkedin || personalInfo.github || personalInfo.website) && (
          <div className="flex flex-wrap justify-center items-center gap-2 text-sm mt-2" style={{ color: primaryColor }}>
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
            {personalInfo.linkedin && personalInfo.github && <span style={{ color: secondaryColor }}>✦</span>}
        <Divider accentColor={accentColor} secondaryColor={secondaryColor} />
            {personalInfo.github && personalInfo.website && <span style={{ color: secondaryColor }}>✦</span>}
            {personalInfo.website && <span>{personalInfo.website}</span>}
          </div>
        )}

        <Divider accentColor={accentColor} secondaryColor={secondaryColor} />
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-8">
          <h2 
            className="text-center font-bold uppercase tracking-[0.2em] mb-4"
            style={{ fontSize: fontSize.section, color: primaryColor }}
          >
            Professional Profile
          </h2>
          <div 
            className="leading-relaxed prose prose-sm max-w-none text-center"
            style={{ color: textColor }}
            dangerouslySetInnerHTML={{ __html: summary }}
          />
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-8">
          <h2 
            className="text-center font-bold uppercase tracking-[0.2em] mb-4"
            style={{ fontSize: fontSize.section, color: primaryColor }}
          >
            Professional Experience
          </h2>
          <div className="space-y-5">
            {experience.map((exp) => (
              <div 
                key={exp.id} 
                className="pl-4"
                style={{ borderLeft: `2px solid ${accentColor}` }}
              >
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold" style={{ color: textColor }}>{exp.title}</h3>
                  <span className="text-sm italic" style={{ color: secondaryColor }}>
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
                <p className="text-sm mb-2" style={{ color: primaryColor }}>
                  {exp.company}{exp.location ? ` — ${exp.location}` : ''}
                </p>
                {exp.description && (
                  <div 
                    className="mt-2 text-sm leading-relaxed prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0"
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
        <section className="mb-8">
          <h2 
            className="text-center font-bold uppercase tracking-[0.2em] mb-4"
            style={{ fontSize: fontSize.section, color: primaryColor }}
          >
            Internships
          </h2>
          <div className="space-y-5">
            {internships.map((intern) => (
              <div 
                key={intern.id} 
                className="pl-4"
                style={{ borderLeft: `2px solid ${accentColor}` }}
              >
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold" style={{ color: textColor }}>{intern.title}</h3>
                  <span className="text-sm italic" style={{ color: secondaryColor }}>
                    {formatDateRange(intern.startDate, intern.endDate)}
                  </span>
                </div>
                <p className="text-sm mb-2" style={{ color: primaryColor }}>
                  {intern.company}{intern.location ? ` — ${intern.location}` : ''}
                </p>
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

      {/* Volunteer */}
      {volunteer && volunteer.length > 0 && (
        <section className="mb-8">
          <h2 
            className="text-center font-bold uppercase tracking-[0.2em] mb-4"
            style={{ fontSize: fontSize.section, color: primaryColor }}
          >
            Volunteer Experience
          </h2>
          <div className="space-y-5">
            {volunteer.map((vol) => (
              <div 
                key={vol.id} 
                className="pl-4"
                style={{ borderLeft: `2px solid ${accentColor}` }}
              >
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold" style={{ color: textColor }}>{vol.role}</h3>
                  {(vol.startDate || vol.endDate) && (
                    <span className="text-sm italic" style={{ color: secondaryColor }}>
                      {formatDateRange(vol.startDate || '', vol.endDate || '')}
                    </span>
                  )}
                </div>
                <p className="text-sm mb-2" style={{ color: primaryColor }}>{vol.organization}</p>
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

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-8">
          <h2 
            className="text-center font-bold uppercase tracking-[0.2em] mb-4"
            style={{ fontSize: fontSize.section, color: primaryColor }}
          >
            Projects
          </h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="text-center">
                <h3 className="font-bold" style={{ color: textColor }}>{project.name}</h3>
                {project.description && (
                  <p className="text-sm mt-1" style={{ color: textColor }}>{project.description}</p>
                )}
                {project.technologies && project.technologies.length > 0 && (
                  <p className="text-sm mt-1 italic" style={{ color: secondaryColor }}>
                    {project.technologies.join(' • ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-8">
        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 
              className="text-center font-bold uppercase tracking-[0.2em] mb-4"
              style={{ fontSize: fontSize.section, color: primaryColor }}
            >
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="text-center">
                  <h3 className="font-bold" style={{ color: textColor }}>{edu.school}</h3>
                  <p className="text-sm" style={{ color: textColor }}>
                    {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                  </p>
                  <p className="text-xs italic" style={{ color: secondaryColor }}>
                    {formatDateRange(edu.startDate, edu.endDate)}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 
              className="text-center font-bold uppercase tracking-[0.2em] mb-4"
              style={{ fontSize: fontSize.section, color: primaryColor }}
            >
              Areas of Expertise
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-3 py-1 text-sm"
                  style={{ border: `1px solid ${secondaryColor}`, color: textColor }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Awards & Certifications */}
      {((certifications && certifications.length > 0) || (awards && awards.length > 0)) && (
        <div className="grid grid-cols-2 gap-8 mt-8">
          {certifications && certifications.length > 0 && (
            <section>
              <h2 
                className="text-center font-bold uppercase tracking-[0.2em] mb-4"
                style={{ fontSize: fontSize.section, color: primaryColor }}
              >
                Certifications
              </h2>
              <ul className="space-y-1 text-center">
                {certifications.map((cert) => (
                  <li key={cert.id} className="text-sm" style={{ color: textColor }}>
                    {cert.name}
                    {cert.issuer && <span style={{ color: secondaryColor }}> — {cert.issuer}</span>}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {awards && awards.length > 0 && (
            <section>
              <h2 
                className="text-center font-bold uppercase tracking-[0.2em] mb-4"
                style={{ fontSize: fontSize.section, color: primaryColor }}
              >
                Awards & Honors
              </h2>
              <ul className="space-y-1 text-center">
                {awards.map((award) => (
                  <li key={award.id} className="text-sm" style={{ color: textColor }}>
                    {award.title}
                    {award.issuer && <span style={{ color: secondaryColor }}> — {award.issuer}</span>}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}

      {/* Languages & Courses */}
      {((languages && languages.length > 0) || (courses && courses.length > 0)) && (
        <div className="grid grid-cols-2 gap-8 mt-8">
          {languages && languages.length > 0 && (
            <section>
              <h2 
                className="text-center font-bold uppercase tracking-[0.2em] mb-4"
                style={{ fontSize: fontSize.section, color: primaryColor }}
              >
                Languages
              </h2>
              <ul className="space-y-1 text-center">
                {languages.map((lang) => (
                  <li key={lang.id} className="text-sm" style={{ color: textColor }}>
                    {lang.name}
                    {lang.proficiency && <span style={{ color: secondaryColor }}> ({lang.proficiency})</span>}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {courses && courses.length > 0 && (
            <section>
              <h2 
                className="text-center font-bold uppercase tracking-[0.2em] mb-4"
                style={{ fontSize: fontSize.section, color: primaryColor }}
              >
                Courses & Training
              </h2>
              <ul className="space-y-1 text-center">
                {courses.map((course) => (
                  <li key={course.id} className="text-sm" style={{ color: textColor }}>
                    {course.name}
                    {course.institution && <span style={{ color: secondaryColor }}> — {course.institution}</span>}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}

      {/* Hobbies */}
      {hobbies && hobbies.length > 0 && (
        <section className="mt-8">
          <h2 
            className="text-center font-bold uppercase tracking-[0.2em] mb-4"
            style={{ fontSize: fontSize.section, color: primaryColor }}
          >
            Interests
          </h2>
          <p className="text-center text-sm" style={{ color: textColor }}>
            {hobbies.map(h => h.name).join(' • ')}
          </p>
        </section>
      )}
    </div>
  )
}