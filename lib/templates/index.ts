export interface TemplateConfig {
  id: string
  name: string
  description: string
  thumbnail: string
  colors: {
    primary: string
    secondary: string
    accent: string
    text: string
    background: string
    muted: string
  }
  fonts: {
    heading: string
    body: string
  }
  layout: 'single-column' | 'two-column' | 'modern'
  isAts: boolean
}

export const templates: TemplateConfig[] = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Clean and modern design perfect for corporate jobs',
    thumbnail: '/templates/professional.png',
    colors: {
      primary: '#1e40af',
      secondary: '#3b82f6',
      accent: '#dbeafe',
      text: '#1e293b',
      background: '#ffffff',
      muted: '#64748b',
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
    },
    layout: 'single-column',
    isAts: true,
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary two-column layout with sidebar',
    thumbnail: '/templates/modern.png',
    colors: {
      primary: '#0f172a',
      secondary: '#334155',
      accent: '#f1f5f9',
      text: '#1e293b',
      background: '#ffffff',
      muted: '#64748b',
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
    },
    layout: 'two-column',
    isAts: true,
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Sophisticated design with subtle accents',
    thumbnail: '/templates/elegant.png',
    colors: {
      primary: '#78350f',
      secondary: '#a16207',
      accent: '#fef3c7',
      text: '#1c1917',
      background: '#ffffff',
      muted: '#78716c',
    },
    fonts: {
      heading: 'Georgia',
      body: 'Inter',
    },
    layout: 'single-column',
    isAts: true,
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and clean with maximum readability',
    thumbnail: '/templates/minimal.png',
    colors: {
      primary: '#171717',
      secondary: '#404040',
      accent: '#f5f5f5',
      text: '#171717',
      background: '#ffffff',
      muted: '#737373',
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
    },
    layout: 'single-column',
    isAts: true,
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold design for creative professionals',
    thumbnail: '/templates/creative.png',
    colors: {
      primary: '#7c3aed',
      secondary: '#8b5cf6',
      accent: '#ede9fe',
      text: '#1e293b',
      background: '#ffffff',
      muted: '#64748b',
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
    },
    layout: 'two-column',
    isAts: false,
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Premium design for senior professionals',
    thumbnail: '/templates/executive.png',
    colors: {
      primary: '#0c4a6e',
      secondary: '#0369a1',
      accent: '#e0f2fe',
      text: '#0f172a',
      background: '#ffffff',
      muted: '#475569',
    },
    fonts: {
      heading: 'Georgia',
      body: 'Inter',
    },
    layout: 'single-column',
    isAts: true,
  },
  {
    id: 'tech',
    name: 'Tech',
    description: 'Modern design for tech professionals',
    thumbnail: '/templates/tech.png',
    colors: {
      primary: '#059669',
      secondary: '#10b981',
      accent: '#d1fae5',
      text: '#1e293b',
      background: '#ffffff',
      muted: '#64748b',
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
    },
    layout: 'two-column',
    isAts: true,
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional format that works for any industry',
    thumbnail: '/templates/classic.png',
    colors: {
      primary: '#1f2937',
      secondary: '#374151',
      accent: '#f3f4f6',
      text: '#111827',
      background: '#ffffff',
      muted: '#6b7280',
    },
    fonts: {
      heading: 'Times New Roman',
      body: 'Times New Roman',
    },
    layout: 'single-column',
    isAts: true,
  },
]

export function getTemplate(id: string): TemplateConfig {
  return templates.find(t => t.id === id) || templates[0]
}