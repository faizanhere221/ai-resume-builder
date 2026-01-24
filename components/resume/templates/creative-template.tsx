'use client'

import type { ResumeContent } from '@/types'
import { formatDateRange } from '@/lib/utils'
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Briefcase, GraduationCap, Lightbulb, Award, Heart, Trophy, BookOpen } from 'lucide-react'

interface TemplateProps {
  content: ResumeContent
}

export function CreativeTemplate({ content }: TemplateProps) {
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
  const primaryColor = settings?.primaryColor || '#7c3aed'
  const secondaryColor = settings?.secondaryColor || '#8b5cf6'
  const accentColor = settings?.accentColor || '#ede9fe'
  const textColor = settings?.textColor || '#1e293b'
  const fontFamily = settings?.fontFamily || 'Inter'
  const showIcons = settings?.showIcons !== false

  // Font size mapping
  const fontSizeMap = {
    small: { base: '9pt', section: '16px', name: '32px' },
    medium: { base: '10pt', section: '18px', name: '36px' },
    large: { base: '11pt', section: '20px', name: '40px' },
  }
  const fontSize = fontSizeMap[settings?.fontSize || 'medium']

  // Line spacing mapping
  const lineSpacingMap = { compact: '1.3', normal: '1.5', relaxed: '1.7' }
  const lineHeight = lineSpacingMap[settings?.lineSpacing || 'normal']

  // Create gradient style
  const gradientStyle = {
    background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
  }

  return (
    <div 
      className="bg-white min-h-[11in]" 
      style={{ 
        fontSize: fontSize.base,
        fontFamily: `'${fontFamily}', sans-serif`,
        lineHeight,
        color: textColor,
      }}
    >
      {/* Header with gradient */}
      <header className="text-white p-8" style={gradientStyle}>
        <h1 className="font-bold mb-2" style={{ fontSize: fontSize.name }}>
          {fullName || 'Your Name'}
        </h1>
        
        {personalInfo.jobTitle && (
          <p className="text-lg opacity-90 mb-4">{personalInfo.jobTitle}</p>
        )}
        
        {/* Contact Grid */}
        <div className="grid grid-cols-2 gap-2 text-sm opacity-90 mt-4">
          {personalInfo.email && (
            <div className="flex items-center gap-2">
              {showIcons && <Mail className="h-4 w-4" />}
              {personalInfo.email}
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2">
              {showIcons && <Phone className="h-4 w-4" />}
              {personalInfo.phone}
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-2">
              {showIcons && <MapPin className="h-4 w-4" />}
              {personalInfo.location}
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-2">
              {showIcons && <Linkedin className="h-4 w-4" />}
              {personalInfo.linkedin}
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-center gap-2">
              {showIcons && <Github className="h-4 w-4" />}
              {personalInfo.github}
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-2">
              {showIcons && <Globe className="h-4 w-4" />}
              {personalInfo.website}
            </div>
          )}
        </div>
      </header>

      <div className="flex">
        {/* Main Content */}
        <div className="w-2/3 p-6">
          {/* Summary */}
          {summary && (
            <section className="mb-6">
              <div 
                className="leading-relaxed prose prose-sm max-w-none"
                style={{ color: textColor }}
                dangerouslySetInnerHTML={{ __html: summary }}
              />
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section className="mb-6">
              <h2 
                className="flex items-center gap-2 font-bold mb-4"
                style={{ color: primaryColor, fontSize: fontSize.section }}
              >
                {showIcons && <Briefcase className="h-5 w-5" />}
                Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div 
                    key={exp.id} 
                    className="relative pl-6"
                    style={{ borderLeft: `2px solid ${accentColor}` }}
                  >
                    <div 
                      className="absolute -left-2 top-0 w-4 h-4 rounded-full"
                      style={{ backgroundColor: primaryColor }}
                    />
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold" style={{ color: textColor }}>{exp.title}</h3>
                        <p style={{ color: primaryColor }}>{exp.company}</p>
                      </div>
                      <span 
                        className="text-xs px-2 py-1 rounded-full"
                        style={{ backgroundColor: accentColor, color: primaryColor }}
                      >
                        {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                      </span>
                    </div>
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
            <section className="mb-6">
              <h2 
                className="flex items-center gap-2 font-bold mb-4"
                style={{ color: primaryColor, fontSize: fontSize.section }}
              >
                {showIcons && <GraduationCap className="h-5 w-5" />}
                Internships
              </h2>
              <div className="space-y-4">
                {internships.map((intern) => (
                  <div 
                    key={intern.id} 
                    className="relative pl-6"
                    style={{ borderLeft: `2px solid ${accentColor}` }}
                  >
                    <div 
                      className="absolute -left-2 top-0 w-4 h-4 rounded-full"
                      style={{ backgroundColor: secondaryColor }}
                    />
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold" style={{ color: textColor }}>{intern.title}</h3>
                        <p style={{ color: primaryColor }}>{intern.company}</p>
                      </div>
                      <span 
                        className="text-xs px-2 py-1 rounded-full"
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

          {/* Volunteer */}
          {volunteer && volunteer.length > 0 && (
            <section className="mb-6">
              <h2 
                className="flex items-center gap-2 font-bold mb-4"
                style={{ color: primaryColor, fontSize: fontSize.section }}
              >
                {showIcons && <Heart className="h-5 w-5" />}
                Volunteer Work
              </h2>
              <div className="space-y-4">
                {volunteer.map((vol) => (
                  <div 
                    key={vol.id} 
                    className="relative pl-6"
                    style={{ borderLeft: `2px solid ${accentColor}` }}
                  >
                    <div 
                      className="absolute -left-2 top-0 w-4 h-4 rounded-full"
                      style={{ backgroundColor: secondaryColor }}
                    />
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold" style={{ color: textColor }}>{vol.role}</h3>
                        <p style={{ color: primaryColor }}>{vol.organization}</p>
                      </div>
                      {(vol.startDate || vol.endDate) && (
                        <span 
                          className="text-xs px-2 py-1 rounded-full"
                          style={{ backgroundColor: accentColor, color: primaryColor }}
                        >
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

          {/* Projects */}
          {projects && projects.length > 0 && (
            <section>
              <h2 
                className="flex items-center gap-2 font-bold mb-4"
                style={{ color: primaryColor, fontSize: fontSize.section }}
              >
                {showIcons && <Lightbulb className="h-5 w-5" />}
                Projects
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {projects.map((project) => (
                  <div 
                    key={project.id} 
                    className="rounded-lg p-4"
                    style={{ backgroundColor: accentColor }}
                  >
                    <h3 className="font-bold" style={{ color: textColor }}>{project.name}</h3>
                    {project.description && (
                      <p className="text-sm mt-1" style={{ color: textColor }}>{project.description}</p>
                    )}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.technologies.map((tech, i) => (
                          <span 
                            key={i} 
                            className="text-xs bg-white px-2 py-0.5 rounded"
                            style={{ color: primaryColor }}
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
        </div>

        {/* Sidebar */}
        <div className="w-1/3 p-6" style={{ backgroundColor: accentColor }}>
          {/* Skills */}
          {skills.length > 0 && (
            <section className="mb-6">
              <h2 
                className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-3"
                style={{ color: primaryColor }}
              >
                {showIcons && <Lightbulb className="h-4 w-4" />}
                Skills
              </h2>
              <div className="space-y-2">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex items-center gap-2">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: primaryColor }}
                    />
                    <span className="text-sm" style={{ color: textColor }}>{skill.name}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section className="mb-6">
              <h2 
                className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-3"
                style={{ color: primaryColor }}
              >
                {showIcons && <GraduationCap className="h-4 w-4" />}
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-semibold text-sm" style={{ color: textColor }}>{edu.school}</h3>
                    <p className="text-xs" style={{ color: secondaryColor }}>
                      {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                    </p>
                    <p className="text-xs opacity-70">
                      {formatDateRange(edu.startDate, edu.endDate)}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <section className="mb-6">
              <h2 
                className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-3"
                style={{ color: primaryColor }}
              >
                {showIcons && <Award className="h-4 w-4" />}
                Certifications
              </h2>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <p className="font-medium text-sm" style={{ color: textColor }}>{cert.name}</p>
                    {cert.issuer && <p className="text-xs" style={{ color: secondaryColor }}>{cert.issuer}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Awards */}
          {awards && awards.length > 0 && (
            <section className="mb-6">
              <h2 
                className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-3"
                style={{ color: primaryColor }}
              >
                {showIcons && <Trophy className="h-4 w-4" />}
                Awards
              </h2>
              <div className="space-y-2">
                {awards.map((award) => (
                  <div key={award.id}>
                    <p className="font-medium text-sm" style={{ color: textColor }}>{award.title}</p>
                    {award.issuer && <p className="text-xs" style={{ color: secondaryColor }}>{award.issuer}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Courses */}
          {courses && courses.length > 0 && (
            <section className="mb-6">
              <h2 
                className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-3"
                style={{ color: primaryColor }}
              >
                {showIcons && <BookOpen className="h-4 w-4" />}
                Courses
              </h2>
              <div className="space-y-2">
                {courses.map((course) => (
                  <div key={course.id}>
                    <p className="font-medium text-sm" style={{ color: textColor }}>{course.name}</p>
                    {course.institution && <p className="text-xs" style={{ color: secondaryColor }}>{course.institution}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages && languages.length > 0 && (
            <section className="mb-6">
              <h2 
                className="text-sm font-bold uppercase tracking-wider mb-3"
                style={{ color: primaryColor }}
              >
                Languages
              </h2>
              <div className="space-y-1">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between text-sm">
                    <span style={{ color: textColor }}>{lang.name}</span>
                    <span className="text-xs" style={{ color: secondaryColor }}>{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Hobbies */}
          {hobbies && hobbies.length > 0 && (
            <section>
              <h2 
                className="text-sm font-bold uppercase tracking-wider mb-3"
                style={{ color: primaryColor }}
              >
                Interests
              </h2>
              <div className="flex flex-wrap gap-2">
                {hobbies.map((hobby) => (
                  <span 
                    key={hobby.id} 
                    className="text-xs px-2 py-1 rounded bg-white"
                    style={{ color: primaryColor }}
                  >
                    {hobby.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}