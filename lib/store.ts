import { create } from 'zustand'
import type { 
  ResumeContent, 
  PersonalInfo, 
  Experience, 
  Education, 
  Skill,
  Project,
  Certification,
  Language,
  Award,
  Course,
  Internship,
  Volunteer,
  Reference,
  Conference,
  Hobby,
  Affiliation,
  CustomSection,
  ResumeSettings,
} from '@/types'

const defaultSettings: ResumeSettings = {
  fontFamily: 'Inter',
  fontSize: 'medium',
  lineSpacing: 'normal',
  primaryColor: '#1e40af',
  secondaryColor: '#3b82f6',
  accentColor: '#dbeafe',
  textColor: '#1e293b',
  backgroundColor: '#ffffff',
  sectionOrder: [
    'personal-info',
    'summary',
    'experience',
    'education',
    'skills',
    'projects',
    'certifications',
    'languages',
  ],
  showProfileImage: false,
  showIcons: true,
  pageMargins: 'normal',
}

const defaultPersonalInfo: PersonalInfo = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  location: '',
  website: '',
  linkedin: '',
  github: '',
  portfolio: '',
  twitter: '',
  jobTitle: '',
  address: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
  dateOfBirth: '',
  placeOfBirth: '',
  nationality: '',
  drivingLicense: '',
  profileImage: '',
}

const defaultResumeContent: ResumeContent = {
  personalInfo: defaultPersonalInfo,
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  awards: [],
  courses: [],
  internships: [],
  volunteer: [],
  references: [],
  conferences: [],
  hobbies: [],
  affiliations: [],
  customSections: [],
  settings: defaultSettings,
}

interface ResumeStore {
  // State
  currentResume: ResumeContent
  resumeId: string | null
  resumeTitle: string
  templateId: string
  isDirty: boolean
  
  // Profile Strength
  profileStrength: number
  
  // Actions - Resume
  setResumeContent: (content: ResumeContent) => void
  setResumeId: (id: string | null) => void
  setResumeTitle: (title: string) => void
  setTemplateId: (id: string) => void
  markAsSaved: () => void
  resetResume: () => void
  
  // Actions - Personal Info
  updatePersonalInfo: <K extends keyof PersonalInfo>(key: K, value: PersonalInfo[K]) => void
  
  // Actions - Summary
  updateSummary: (summary: string) => void
  
  // Actions - Experience
  addExperience: (experience: Experience) => void
  updateExperience: (id: string, updates: Partial<Experience>) => void
  removeExperience: (id: string) => void
  reorderExperience: (fromIndex: number, toIndex: number) => void
  
  // Actions - Education
  addEducation: (education: Education) => void
  updateEducation: (id: string, updates: Partial<Education>) => void
  removeEducation: (id: string) => void
  
  // Actions - Skills
  addSkill: (skill: Skill) => void
  updateSkill: (id: string, updates: Partial<Skill>) => void
  removeSkill: (id: string) => void
  
  // Actions - Projects
  addProject: (project: Project) => void
  updateProject: (id: string, updates: Partial<Project>) => void
  removeProject: (id: string) => void
  
  // Actions - Certifications
  addCertification: (cert: Certification) => void
  updateCertification: (id: string, updates: Partial<Certification>) => void
  removeCertification: (id: string) => void
  
  // Actions - Languages
  addLanguage: (language: Language) => void
  updateLanguage: (id: string, updates: Partial<Language>) => void
  removeLanguage: (id: string) => void
  
  // Actions - Awards
  addAward: (award: Award) => void
  updateAward: (id: string, updates: Partial<Award>) => void
  removeAward: (id: string) => void
  
  // Actions - Courses
  addCourse: (course: Course) => void
  updateCourse: (id: string, updates: Partial<Course>) => void
  removeCourse: (id: string) => void
  
  // Actions - Internships
  addInternship: (internship: Internship) => void
  updateInternship: (id: string, updates: Partial<Internship>) => void
  removeInternship: (id: string) => void
  
  // Actions - Volunteer
  addVolunteer: (volunteer: Volunteer) => void
  updateVolunteer: (id: string, updates: Partial<Volunteer>) => void
  removeVolunteer: (id: string) => void
  
  // Actions - References
  addReference: (reference: Reference) => void
  updateReference: (id: string, updates: Partial<Reference>) => void
  removeReference: (id: string) => void
  
  // Actions - Conferences
  addConference: (conference: Conference) => void
  updateConference: (id: string, updates: Partial<Conference>) => void
  removeConference: (id: string) => void
  
  // Actions - Hobbies
  addHobby: (hobby: Hobby) => void
  removeHobby: (id: string) => void
  
  // Actions - Affiliations
  addAffiliation: (affiliation: Affiliation) => void
  updateAffiliation: (id: string, updates: Partial<Affiliation>) => void
  removeAffiliation: (id: string) => void
  
  // Actions - Custom Sections
  addCustomSection: (section: CustomSection) => void
  updateCustomSection: (id: string, updates: Partial<CustomSection>) => void
  removeCustomSection: (id: string) => void
  addCustomSectionItem: (sectionId: string, item: CustomSection['items'][0]) => void
  updateCustomSectionItem: (sectionId: string, itemId: string, updates: Partial<CustomSection['items'][0]>) => void
  removeCustomSectionItem: (sectionId: string, itemId: string) => void
  
  // Actions - Settings
  updateSettings: <K extends keyof ResumeSettings>(key: K, value: ResumeSettings[K]) => void
  
  // Actions - Section Order
  reorderSections: (newOrder: string[]) => void
  toggleSection: (sectionId: string) => void
}

// Helper function to calculate profile strength
function calculateProfileStrength(content: ResumeContent): number {
  let score = 0
  const maxScore = 100
  
  const { personalInfo, summary, experience, education, skills } = content
  
  // Personal Info (25 points)
  if (personalInfo.firstName && personalInfo.lastName) score += 5
  if (personalInfo.email) score += 5
  if (personalInfo.phone) score += 3
  if (personalInfo.jobTitle) score += 5
  if (personalInfo.location || personalInfo.city) score += 3
  if (personalInfo.linkedin) score += 4
  
  // Summary (15 points)
  if (summary && summary.length > 50) score += 15
  else if (summary && summary.length > 0) score += 8
  
  // Experience (25 points)
  if (experience.length > 0) {
    score += Math.min(experience.length * 8, 20)
    const hasDescriptions = experience.some(e => e.description && e.description.length > 50)
    if (hasDescriptions) score += 5
  }
  
  // Education (15 points)
  if (education.length > 0) {
    score += Math.min(education.length * 8, 15)
  }
  
  // Skills (10 points)
  if (skills.length > 0) {
    score += Math.min(skills.length, 10)
  }
  
  // Bonus sections (10 points)
  if (content.projects && content.projects.length > 0) score += 2
  if (content.certifications && content.certifications.length > 0) score += 2
  if (content.languages && content.languages.length > 0) score += 2
  if (content.awards && content.awards.length > 0) score += 2
  if (content.volunteer && content.volunteer.length > 0) score += 2
  
  return Math.min(Math.round(score), maxScore)
}

export const useResumeStore = create<ResumeStore>((set, get) => ({
  // Initial State
  currentResume: defaultResumeContent,
  resumeId: null,
  resumeTitle: 'Untitled Resume',
  templateId: 'professional',
  isDirty: false,
  profileStrength: 0,
  
  // Resume Actions
  setResumeContent: (content) => set({ 
    currentResume: content,
    profileStrength: calculateProfileStrength(content),
  }),
  
  setResumeId: (id) => set({ resumeId: id }),
  
  setResumeTitle: (title) => set({ resumeTitle: title, isDirty: true }),
  
  setTemplateId: (id) => set({ templateId: id, isDirty: true }),
  
  markAsSaved: () => set({ isDirty: false }),
  
  resetResume: () => set({
    currentResume: defaultResumeContent,
    resumeId: null,
    resumeTitle: 'Untitled Resume',
    templateId: 'professional',
    isDirty: false,
    profileStrength: 0,
  }),
  
  // Personal Info
  updatePersonalInfo: (key, value) => set((state) => {
    const newContent = {
      ...state.currentResume,
      personalInfo: { ...state.currentResume.personalInfo, [key]: value },
    }
    return { 
      currentResume: newContent, 
      isDirty: true,
      profileStrength: calculateProfileStrength(newContent),
    }
  }),
  
  // Summary
  updateSummary: (summary) => set((state) => {
    const newContent = { ...state.currentResume, summary }
    return { 
      currentResume: newContent, 
      isDirty: true,
      profileStrength: calculateProfileStrength(newContent),
    }
  }),
  
  // Experience
  addExperience: (experience) => set((state) => {
    const newContent = {
      ...state.currentResume,
      experience: [...state.currentResume.experience, experience],
    }
    return { 
      currentResume: newContent, 
      isDirty: true,
      profileStrength: calculateProfileStrength(newContent),
    }
  }),
  
  updateExperience: (id, updates) => set((state) => {
    const newContent = {
      ...state.currentResume,
      experience: state.currentResume.experience.map((exp) =>
        exp.id === id ? { ...exp, ...updates } : exp
      ),
    }
    return { 
      currentResume: newContent, 
      isDirty: true,
      profileStrength: calculateProfileStrength(newContent),
    }
  }),
  
  removeExperience: (id) => set((state) => {
    const newContent = {
      ...state.currentResume,
      experience: state.currentResume.experience.filter((exp) => exp.id !== id),
    }
    return { 
      currentResume: newContent, 
      isDirty: true,
      profileStrength: calculateProfileStrength(newContent),
    }
  }),
  
  reorderExperience: (fromIndex, toIndex) => set((state) => {
    const newExperience = [...state.currentResume.experience]
    const [removed] = newExperience.splice(fromIndex, 1)
    newExperience.splice(toIndex, 0, removed)
    return {
      currentResume: { ...state.currentResume, experience: newExperience },
      isDirty: true,
    }
  }),
  
  // Education
  addEducation: (education) => set((state) => {
    const newContent = {
      ...state.currentResume,
      education: [...state.currentResume.education, education],
    }
    return { 
      currentResume: newContent, 
      isDirty: true,
      profileStrength: calculateProfileStrength(newContent),
    }
  }),
  
  updateEducation: (id, updates) => set((state) => ({
    currentResume: {
      ...state.currentResume,
      education: state.currentResume.education.map((edu) =>
        edu.id === id ? { ...edu, ...updates } : edu
      ),
    },
    isDirty: true,
  })),
  
  removeEducation: (id) => set((state) => {
    const newContent = {
      ...state.currentResume,
      education: state.currentResume.education.filter((edu) => edu.id !== id),
    }
    return { 
      currentResume: newContent, 
      isDirty: true,
      profileStrength: calculateProfileStrength(newContent),
    }
  }),
  
  // Skills
  addSkill: (skill) => set((state) => {
    const newContent = {
      ...state.currentResume,
      skills: [...state.currentResume.skills, skill],
    }
    return { 
      currentResume: newContent, 
      isDirty: true,
      profileStrength: calculateProfileStrength(newContent),
    }
  }),
  
  updateSkill: (id, updates) => set((state) => ({
    currentResume: {
      ...state.currentResume,
      skills: state.currentResume.skills.map((skill) =>
        skill.id === id ? { ...skill, ...updates } : skill
      ),
    },
    isDirty: true,
  })),
  
  removeSkill: (id) => set((state) => {
    const newContent = {
      ...state.currentResume,
      skills: state.currentResume.skills.filter((skill) => skill.id !== id),
    }
    return { 
      currentResume: newContent, 
      isDirty: true,
      profileStrength: calculateProfileStrength(newContent),
    }
  }),
  
  // Projects
  addProject: (project) => set((state) => ({
    currentResume: {
      ...state.currentResume,
      projects: [...(state.currentResume.projects || []), project],
    },
    isDirty: true,
  })),
  
  updateProject: (id, updates) => set((state) => ({
    currentResume: {
      ...state.currentResume,
      projects: (state.currentResume.projects || []).map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
    },
    isDirty: true,
  })),
  
  removeProject: (id) => set((state) => ({
    currentResume: {
      ...state.currentResume,
      projects: (state.currentResume.projects || []).filter((p) => p.id !== id),
    },
    isDirty: true,
  })),
  
  // Certifications
  addCertification: (cert) => set((state) => ({
    currentResume: {
      ...state.currentResume,
      certifications: [...(state.currentResume.certifications || []), cert],
    },
    isDirty: true,
  })),
  
  updateCertification: (id, updates) => set((state) => ({
    currentResume: {
      ...state.currentResume,
      certifications: (state.currentResume.certifications || []).map((c) =>
        c.id === id ? { ...c, ...updates } : c
      ),
    },
    isDirty: true,
  })),
  
  removeCertification: (id) => set((state) => ({
    currentResume: {
      ...state.currentResume,
      certifications: (state.currentResume.certifications || []).filter((c) => c.id !== id),
    },
    isDirty: true,
  })),
  
  // Languages
  addLanguage: (language) => set((state) => ({
    currentResume: {
      ...state.currentResume,
      languages: [...(state.currentResume.languages || []), language],
    },
    isDirty: true,
  })),
  
  updateLanguage: (id, updates) => set((state) => ({
    currentResume: {
      ...state.currentResume,
      languages: (state.currentResume.languages || []).map((l) =>
        l.id === id ? { ...l, ...updates } : l
      ),
    },
    isDirty: true,
  })),
  
  removeLanguage: (id) => set((state) => ({
    currentResume: {
      ...state.currentResume,
      languages: (state.currentResume.languages || []).filter((l) => l.id !== id),
    },
    isDirty: true,
  })),
  
  // Awards
  addAward: (award) => set((state) => ({
    currentResume: {
      ...state.currentResume,
      awards: [...(state.currentResume.awards || []), award],
    },
    isDirty: true,
  })),
  
  updateAward: (id, updates) => set((state) => ({
    currentResume: {
      ...state.currentResume,
      awards: (state.currentResume.awards || []).map((a) =>
        a.id === id ? { ...a, ...updates } : a
      ),
    },
    isDirty: true,
  })),
  
  removeAward: (id) => set((state) => ({
    currentResume: {
      ...state.currentResume,
      awards: (state.currentResume.awards || []).filter((a) => a.id !== id),
    },
    isDirty: true,
  })),
  
  // Courses
  addCourse: (course) => set((state) => ({
    currentResume: {
      ...state.currentResume,
      courses: [...(state.currentResume.courses || []), course],
    },
    isDirty: true,
  })),
  
  updateCourse: (id, updates) => set((state) => ({
    currentResume: {
      ...state.currentResume,
      courses: (state.currentResume.courses || []).map((c) =>
        c.id === id ? { ...c, ...updates } : c
      ),
    },
    isDirty: true,
  })),
  
  removeCourse: (id) => set((state) => ({
    currentResume: {
      ...state.currentResume,
      courses: (state.currentResume.courses || []).filter((c) => c.id !== id),
    },
    isDirty: true,
  })),
  
  // Internships
  addInternship: (internship) => set((state) => ({
    currentResume: {
      ...state.currentResume,
      internships: [...(state.currentResume.internships || []), internship],
    },
    isDirty: true,
  })),
  
  updateInternship: (id, updates) => set((state) => ({
    currentResume: {
      ...state.currentResume,
      internships: (state.currentResume.internships || []).map((i) =>
        i.id === id ? { ...i, ...updates } : i
      ),
    },
    isDirty: true,
  })),
  
  removeInternship: (id) => set((state) => ({
    currentResume: {
      ...state.currentResume,
      internships: (state.currentResume.internships || []).filter((i) => i.id !== id),
    },
    isDirty: true,
  })),
  
  // Volunteer
  addVolunteer: (volunteer) => set((state) => ({
    currentResume: {
      ...state.currentResume,
      volunteer: [...(state.currentResume.volunteer || []), volunteer],
    },
    isDirty: true,
  })),
  
  updateVolunteer: (id, updates) => set((state) => ({
    currentResume: {
      ...state.currentResume,
      volunteer: (state.currentResume.volunteer || []).map((v) =>
        v.id === id ? { ...v, ...updates } : v
      ),
    },
    isDirty: true,
  })),
  
  removeVolunteer: (id) => set((state) => ({
    currentResume: {
      ...state.currentResume,
      volunteer: (state.currentResume.volunteer || []).filter((v) => v.id !== id),
    },
    isDirty: true,
  })),
  
  // References
  addReference: (reference) => set((state) => ({
    currentResume: {
      ...state.currentResume,
      references: [...(state.currentResume.references || []), reference],
    },
    isDirty: true,
  })),
  
  updateReference: (id, updates) => set((state) => ({
    currentResume: {
      ...state.currentResume,
      references: (state.currentResume.references || []).map((r) =>
        r.id === id ? { ...r, ...updates } : r
      ),
    },
    isDirty: true,
  })),
  
  removeReference: (id) => set((state) => ({
    currentResume: {
      ...state.currentResume,
      references: (state.currentResume.references || []).filter((r) => r.id !== id),
    },
    isDirty: true,
  })),
  
  // Conferences
  addConference: (conference) => set((state) => ({
    currentResume: {
      ...state.currentResume,
      conferences: [...(state.currentResume.conferences || []), conference],
    },
    isDirty: true,
  })),
  
  updateConference: (id, updates) => set((state) => ({
    currentResume: {
      ...state.currentResume,
      conferences: (state.currentResume.conferences || []).map((c) =>
        c.id === id ? { ...c, ...updates } : c
      ),
    },
    isDirty: true,
  })),
  
  removeConference: (id) => set((state) => ({
    currentResume: {
      ...state.currentResume,
      conferences: (state.currentResume.conferences || []).filter((c) => c.id !== id),
    },
    isDirty: true,
  })),
  
  // Hobbies
  addHobby: (hobby) => set((state) => ({
    currentResume: {
      ...state.currentResume,
      hobbies: [...(state.currentResume.hobbies || []), hobby],
    },
    isDirty: true,
  })),
  
  removeHobby: (id) => set((state) => ({
    currentResume: {
      ...state.currentResume,
      hobbies: (state.currentResume.hobbies || []).filter((h) => h.id !== id),
    },
    isDirty: true,
  })),
  
  // Affiliations
  addAffiliation: (affiliation) => set((state) => ({
    currentResume: {
      ...state.currentResume,
      affiliations: [...(state.currentResume.affiliations || []), affiliation],
    },
    isDirty: true,
  })),
  
  updateAffiliation: (id, updates) => set((state) => ({
    currentResume: {
      ...state.currentResume,
      affiliations: (state.currentResume.affiliations || []).map((a) =>
        a.id === id ? { ...a, ...updates } : a
      ),
    },
    isDirty: true,
  })),
  
  removeAffiliation: (id) => set((state) => ({
    currentResume: {
      ...state.currentResume,
      affiliations: (state.currentResume.affiliations || []).filter((a) => a.id !== id),
    },
    isDirty: true,
  })),
  
  // Custom Sections
  addCustomSection: (section) => set((state) => ({
    currentResume: {
      ...state.currentResume,
      customSections: [...(state.currentResume.customSections || []), section],
    },
    isDirty: true,
  })),
  
  updateCustomSection: (id, updates) => set((state) => ({
    currentResume: {
      ...state.currentResume,
      customSections: (state.currentResume.customSections || []).map((s) =>
        s.id === id ? { ...s, ...updates } : s
      ),
    },
    isDirty: true,
  })),
  
  removeCustomSection: (id) => set((state) => ({
    currentResume: {
      ...state.currentResume,
      customSections: (state.currentResume.customSections || []).filter((s) => s.id !== id),
    },
    isDirty: true,
  })),
  
  addCustomSectionItem: (sectionId, item) => set((state) => ({
    currentResume: {
      ...state.currentResume,
      customSections: (state.currentResume.customSections || []).map((s) =>
        s.id === sectionId ? { ...s, items: [...s.items, item] } : s
      ),
    },
    isDirty: true,
  })),
  
  updateCustomSectionItem: (sectionId, itemId, updates) => set((state) => ({
    currentResume: {
      ...state.currentResume,
      customSections: (state.currentResume.customSections || []).map((s) =>
        s.id === sectionId
          ? {
              ...s,
              items: s.items.map((item) =>
                item.id === itemId ? { ...item, ...updates } : item
              ),
            }
          : s
      ),
    },
    isDirty: true,
  })),
  
  removeCustomSectionItem: (sectionId, itemId) => set((state) => ({
    currentResume: {
      ...state.currentResume,
      customSections: (state.currentResume.customSections || []).map((s) =>
        s.id === sectionId
          ? { ...s, items: s.items.filter((item) => item.id !== itemId) }
          : s
      ),
    },
    isDirty: true,
  })),
  
  // Settings
  updateSettings: (key, value) => set((state) => ({
    currentResume: {
      ...state.currentResume,
      settings: { ...state.currentResume.settings, [key]: value },
    },
    isDirty: true,
  })),
  
  // Section Order
  reorderSections: (newOrder) => set((state) => ({
    currentResume: {
      ...state.currentResume,
      settings: { ...state.currentResume.settings, sectionOrder: newOrder },
    },
    isDirty: true,
  })),
  
  toggleSection: (sectionId) => set((state) => {
    const currentOrder = state.currentResume.settings.sectionOrder
    const newOrder = currentOrder.includes(sectionId)
      ? currentOrder.filter((id) => id !== sectionId)
      : [...currentOrder, sectionId]
    return {
      currentResume: {
        ...state.currentResume,
        settings: { ...state.currentResume.settings, sectionOrder: newOrder },
      },
      isDirty: true,
    }
  }),
}))