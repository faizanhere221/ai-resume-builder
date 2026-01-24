export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  created_at?: string
  updated_at?: string
}


export interface PersonalInfo {
  // Basic Info
  firstName: string
  lastName: string
  email: string
  phone: string
  location: string
  
  // Online Presence
  website?: string
  linkedin?: string
  github?: string
  portfolio?: string
  twitter?: string
  
  // Extended Details
  jobTitle?: string
  address?: string
  city?: string
  state?: string
  postalCode?: string
  country?: string
  dateOfBirth?: string
  placeOfBirth?: string
  nationality?: string
  drivingLicense?: string
  
  // Profile Image
  profileImage?: string
}

export interface Experience {
  id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate: string | null
  current: boolean
  description: string
  bullets?: string[]
}

export interface Education {
  id: string
  school: string
  degree: string
  field: string
  startDate: string
  endDate: string
  gpa?: string
  description?: string
}

export interface Skill {
  id: string
  name: string
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
}

export interface Project {
  id: string
  name: string
  description: string
  url?: string
  startDate?: string
  endDate?: string
  technologies?: string[]
}

export interface Certification {
  id: string
  name: string
  issuer: string
  issueDate?: string
  expiryDate?: string
  credentialId?: string
  url?: string
}

export interface Language {
  id: string
  name: string
  proficiency: 'basic' | 'conversational' | 'professional' | 'fluent' | 'native'
}

// New Section Types
export interface Award {
  id: string
  title: string
  issuer: string
  date?: string
  description?: string
}

export interface Course {
  id: string
  name: string
  institution: string
  completionDate?: string
  description?: string
}

export interface Internship {
  id: string
  title: string
  company: string
  location?: string
  startDate: string
  endDate: string
  description?: string
}

export interface Volunteer {
  id: string
  role: string
  organization: string
  location?: string
  startDate?: string
  endDate?: string
  description?: string
}

export interface Reference {
  id: string
  name: string
  company: string
  position: string
  email?: string
  phone?: string
  relationship?: string
}

export interface Conference {
  id: string
  name: string
  role: string // Speaker, Attendee, Organizer
  location?: string
  date?: string
  description?: string
}

export interface Hobby {
  id: string
  name: string
}

export interface Affiliation {
  id: string
  organization: string
  role?: string
  startDate?: string
  endDate?: string
}

export interface CustomSection {
  id: string
  title: string
  items: CustomSectionItem[]
}

export interface CustomSectionItem {
  id: string
  title: string
  subtitle?: string
  date?: string
  description?: string
}

export interface ResumeSettings {
  fontFamily: string
  fontSize: 'small' | 'medium' | 'large'
  lineSpacing: 'compact' | 'normal' | 'relaxed'
  
  // Colors
  primaryColor: string
  secondaryColor: string
  accentColor: string
  textColor: string
  backgroundColor: string
  
  // Layout
  sectionOrder: string[]
  showProfileImage: boolean
  showIcons: boolean
  
  // Page
  pageMargins: 'narrow' | 'normal' | 'wide'
}

export interface ResumeContent {
  personalInfo: PersonalInfo
  summary: string
  experience: Experience[]
  education: Education[]
  skills: Skill[]
  
  // Optional Sections
  projects?: Project[]
  certifications?: Certification[]
  languages?: Language[]
  awards?: Award[]
  courses?: Course[]
  internships?: Internship[]
  volunteer?: Volunteer[]
  references?: Reference[]
  conferences?: Conference[]
  hobbies?: Hobby[]
  affiliations?: Affiliation[]
  customSections?: CustomSection[]
  
  // Settings
  settings: ResumeSettings
}

export interface Resume {
  id: string
  user_id: string
  title: string
  template_id: string
  content: ResumeContent
  created_at: string
  updated_at: string
}