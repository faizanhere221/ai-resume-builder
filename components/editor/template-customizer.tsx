'use client'

import { useState } from 'react'
import { useResumeStore } from '@/lib/store'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { 
  Palette, 
  Type, 
  RotateCcw,
  Check,
  Sparkles,
  Image,
  CircleDot,
  AlignLeft,
  AlignCenter,
  AlignJustify,
} from 'lucide-react'

// Predefined color palettes with names and preview
const colorPalettes = [
  { 
    name: 'Ocean Blue', 
    primary: '#1e40af', 
    secondary: '#3b82f6', 
    accent: '#dbeafe',
    preview: 'from-blue-600 to-blue-400'
  },
  { 
    name: 'Forest Green', 
    primary: '#166534', 
    secondary: '#22c55e', 
    accent: '#dcfce7',
    preview: 'from-green-600 to-green-400'
  },
  { 
    name: 'Royal Purple', 
    primary: '#6b21a8', 
    secondary: '#a855f7', 
    accent: '#f3e8ff',
    preview: 'from-purple-600 to-purple-400'
  },
  { 
    name: 'Charcoal', 
    primary: '#1f2937', 
    secondary: '#4b5563', 
    accent: '#f3f4f6',
    preview: 'from-gray-700 to-gray-500'
  },
  { 
    name: 'Sunset Orange', 
    primary: '#c2410c', 
    secondary: '#f97316', 
    accent: '#ffedd5',
    preview: 'from-orange-600 to-orange-400'
  },
  { 
    name: 'Ruby Red', 
    primary: '#991b1b', 
    secondary: '#ef4444', 
    accent: '#fee2e2',
    preview: 'from-red-600 to-red-400'
  },
  { 
    name: 'Teal Wave', 
    primary: '#115e59', 
    secondary: '#14b8a6', 
    accent: '#ccfbf1',
    preview: 'from-teal-600 to-teal-400'
  },
  { 
    name: 'Midnight', 
    primary: '#0f172a', 
    secondary: '#334155', 
    accent: '#e2e8f0',
    preview: 'from-slate-800 to-slate-600'
  },
  { 
    name: 'Rose Gold', 
    primary: '#9f1239', 
    secondary: '#f43f5e', 
    accent: '#ffe4e6',
    preview: 'from-rose-600 to-rose-400'
  },
  { 
    name: 'Electric Indigo', 
    primary: '#3730a3', 
    secondary: '#6366f1', 
    accent: '#e0e7ff',
    preview: 'from-indigo-600 to-indigo-400'
  },
]

// Font options with preview
const fontOptions = [
  { value: 'Inter', label: 'Inter', category: 'Sans-serif', preview: 'Modern & Clean' },
  { value: 'Roboto', label: 'Roboto', category: 'Sans-serif', preview: 'Professional' },
  { value: 'Open Sans', label: 'Open Sans', category: 'Sans-serif', preview: 'Friendly' },
  { value: 'Lato', label: 'Lato', category: 'Sans-serif', preview: 'Elegant' },
  { value: 'Poppins', label: 'Poppins', category: 'Sans-serif', preview: 'Geometric' },
  { value: 'Montserrat', label: 'Montserrat', category: 'Sans-serif', preview: 'Bold' },
  { value: 'Playfair Display', label: 'Playfair Display', category: 'Serif', preview: 'Classic' },
  { value: 'Merriweather', label: 'Merriweather', category: 'Serif', preview: 'Traditional' },
  { value: 'Georgia', label: 'Georgia', category: 'Serif', preview: 'Timeless' },
  { value: 'Fira Code', label: 'Fira Code', category: 'Monospace', preview: 'Technical' },
]

export function TemplateCustomizer() {
  const { currentResume, updateSettings } = useResumeStore()
  const settings = currentResume.settings
  const [activeColorPalette, setActiveColorPalette] = useState<string | null>(null)

  const applyColorPalette = (palette: typeof colorPalettes[0]) => {
    updateSettings('primaryColor', palette.primary)
    updateSettings('secondaryColor', palette.secondary)
    updateSettings('accentColor', palette.accent)
    setActiveColorPalette(palette.name)
  }

  const resetToDefaults = () => {
    updateSettings('fontFamily', 'Inter')
    updateSettings('fontSize', 'medium')
    updateSettings('lineSpacing', 'normal')
    updateSettings('primaryColor', '#1e40af')
    updateSettings('secondaryColor', '#3b82f6')
    updateSettings('accentColor', '#dbeafe')
    updateSettings('textColor', '#1e293b')
    updateSettings('backgroundColor', '#ffffff')
    updateSettings('pageMargins', 'normal')
    updateSettings('showProfileImage', false)
    updateSettings('showIcons', true)
    setActiveColorPalette('Ocean Blue')
  }

  // Check if current colors match a palette
  const getCurrentPalette = () => {
    const match = colorPalettes.find(
      p => p.primary === settings.primaryColor && 
           p.secondary === settings.secondaryColor
    )
    return match?.name || null
  }

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            Customize Your Resume
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Make your resume stand out with custom colors and typography
          </p>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                onClick={resetToDefaults}
                className="gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Reset all settings to default</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Color Palettes */}
      <Card className="overflow-hidden border-0 shadow-sm">
        <div className="bg-gradient-to-r from-violet-500 to-purple-500 px-5 py-3">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Color Theme
          </h3>
        </div>
        <CardContent className="p-5">
          <div className="grid grid-cols-5 gap-3">
            {colorPalettes.map((palette) => {
              const isActive = getCurrentPalette() === palette.name || activeColorPalette === palette.name
              return (
                <TooltipProvider key={palette.name}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => applyColorPalette(palette)}
                        className={`
                          relative group rounded-xl p-1 transition-all duration-200
                          ${isActive 
                            ? 'ring-2 ring-offset-2 ring-violet-500 scale-105' 
                            : 'hover:scale-105 hover:shadow-md'
                          }
                        `}
                      >
                        <div className={`h-12 w-full rounded-lg bg-gradient-to-br ${palette.preview}`} />
                        {isActive && (
                          <div className="absolute -top-1 -right-1 bg-violet-500 rounded-full p-0.5">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p className="font-medium">{palette.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )
            })}
          </div>

          {/* Custom Color Pickers */}
          <div className="mt-5 pt-5 border-t">
            <p className="text-sm font-medium text-slate-700 mb-3">Or pick custom colors:</p>
            <div className="grid grid-cols-3 gap-4">
              {/* Primary Color */}
              <div className="space-y-2">
                <Label className="text-xs text-slate-500">Primary</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="w-full h-10 rounded-lg border-2 border-slate-200 hover:border-slate-300 transition-colors flex items-center gap-2 px-3">
                      <div 
                        className="w-5 h-5 rounded-full border shadow-inner" 
                        style={{ backgroundColor: settings.primaryColor }}
                      />
                      <span className="text-xs font-mono text-slate-600">{settings.primaryColor}</span>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-3">
                    <div className="space-y-3">
                      <Input
                        type="color"
                        value={settings.primaryColor}
                        onChange={(e) => {
                          updateSettings('primaryColor', e.target.value)
                          setActiveColorPalette(null)
                        }}
                        className="w-full h-24 cursor-pointer rounded-lg"
                      />
                      <Input
                        value={settings.primaryColor}
                        onChange={(e) => {
                          updateSettings('primaryColor', e.target.value)
                          setActiveColorPalette(null)
                        }}
                        placeholder="#1e40af"
                        className="font-mono text-sm"
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Secondary Color */}
              <div className="space-y-2">
                <Label className="text-xs text-slate-500">Secondary</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="w-full h-10 rounded-lg border-2 border-slate-200 hover:border-slate-300 transition-colors flex items-center gap-2 px-3">
                      <div 
                        className="w-5 h-5 rounded-full border shadow-inner" 
                        style={{ backgroundColor: settings.secondaryColor }}
                      />
                      <span className="text-xs font-mono text-slate-600">{settings.secondaryColor}</span>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-3">
                    <div className="space-y-3">
                      <Input
                        type="color"
                        value={settings.secondaryColor}
                        onChange={(e) => {
                          updateSettings('secondaryColor', e.target.value)
                          setActiveColorPalette(null)
                        }}
                        className="w-full h-24 cursor-pointer rounded-lg"
                      />
                      <Input
                        value={settings.secondaryColor}
                        onChange={(e) => {
                          updateSettings('secondaryColor', e.target.value)
                          setActiveColorPalette(null)
                        }}
                        placeholder="#3b82f6"
                        className="font-mono text-sm"
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Accent Color */}
              <div className="space-y-2">
                <Label className="text-xs text-slate-500">Accent</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="w-full h-10 rounded-lg border-2 border-slate-200 hover:border-slate-300 transition-colors flex items-center gap-2 px-3">
                      <div 
                        className="w-5 h-5 rounded-full border shadow-inner" 
                        style={{ backgroundColor: settings.accentColor }}
                      />
                      <span className="text-xs font-mono text-slate-600">{settings.accentColor}</span>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-3">
                    <div className="space-y-3">
                      <Input
                        type="color"
                        value={settings.accentColor}
                        onChange={(e) => {
                          updateSettings('accentColor', e.target.value)
                          setActiveColorPalette(null)
                        }}
                        className="w-full h-24 cursor-pointer rounded-lg"
                      />
                      <Input
                        value={settings.accentColor}
                        onChange={(e) => {
                          updateSettings('accentColor', e.target.value)
                          setActiveColorPalette(null)
                        }}
                        placeholder="#dbeafe"
                        className="font-mono text-sm"
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Typography */}
      <Card className="overflow-hidden border-0 shadow-sm">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-3">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <Type className="h-4 w-4" />
            Typography
          </h3>
        </div>
        <CardContent className="p-5 space-y-5">
          {/* Font Family */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-slate-700">Font Family</Label>
            <div className="grid grid-cols-2 gap-2">
              {fontOptions.slice(0, 6).map((font) => (
                <button
                  key={font.value}
                  onClick={() => updateSettings('fontFamily', font.value)}
                  className={`
                    p-3 rounded-xl border-2 text-left transition-all
                    ${settings.fontFamily === font.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }
                  `}
                >
                  <div 
                    className="font-semibold text-slate-900"
                    style={{ fontFamily: font.value }}
                  >
                    {font.label}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{font.preview}</div>
                </button>
              ))}
            </div>
            <Select
              value={settings.fontFamily}
              onValueChange={(value) => updateSettings('fontFamily', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="More fonts..." />
              </SelectTrigger>
              <SelectContent>
                {fontOptions.map((font) => (
                  <SelectItem key={font.value} value={font.value}>
                    <span style={{ fontFamily: font.value }}>{font.label}</span>
                    <span className="text-slate-400 ml-2">({font.category})</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Font Size & Line Spacing */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <Label className="text-sm font-medium text-slate-700">Font Size</Label>
              <div className="flex rounded-lg border-2 border-slate-200 p-1">
                {(['small', 'medium', 'large'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => updateSettings('fontSize', size)}
                    className={`
                      flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all
                      ${settings.fontSize === size
                        ? 'bg-blue-500 text-white'
                        : 'text-slate-600 hover:bg-slate-100'
                      }
                    `}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium text-slate-700">Line Spacing</Label>
              <div className="flex rounded-lg border-2 border-slate-200 p-1">
                {([
                  { value: 'compact', icon: AlignLeft },
                  { value: 'normal', icon: AlignCenter },
                  { value: 'relaxed', icon: AlignJustify },
                ] as const).map(({ value, icon: Icon }) => (
                  <TooltipProvider key={value}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => updateSettings('lineSpacing', value)}
                          className={`
                            flex-1 py-2 px-3 rounded-md flex items-center justify-center transition-all
                            ${settings.lineSpacing === value
                              ? 'bg-blue-500 text-white'
                              : 'text-slate-600 hover:bg-slate-100'
                            }
                          `}
                        >
                          <Icon className="h-4 w-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{value.charAt(0).toUpperCase() + value.slice(1)}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Layout & Display */}
      <Card className="overflow-hidden border-0 shadow-sm">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-3">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <CircleDot className="h-4 w-4" />
            Layout & Display
          </h3>
        </div>
        <CardContent className="p-5 space-y-5">
          {/* Page Margins */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-slate-700">Page Margins</Label>
            <div className="flex rounded-lg border-2 border-slate-200 p-1">
              {(['narrow', 'normal', 'wide'] as const).map((margin) => (
                <button
                  key={margin}
                  onClick={() => updateSettings('pageMargins', margin)}
                  className={`
                    flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all
                    ${settings.pageMargins === margin
                      ? 'bg-emerald-500 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                    }
                  `}
                >
                  {margin.charAt(0).toUpperCase() + margin.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Toggle Options */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white shadow-sm">
                  <Image className="h-5 w-5 text-slate-600" />
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-900">Profile Photo</Label>
                  <p className="text-xs text-slate-500">Show your profile picture on resume</p>
                </div>
              </div>
              <Switch
                checked={settings.showProfileImage}
                onCheckedChange={(checked) => updateSettings('showProfileImage', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white shadow-sm">
                  <CircleDot className="h-5 w-5 text-slate-600" />
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-900">Contact Icons</Label>
                  <p className="text-xs text-slate-500">Show icons next to contact info</p>
                </div>
              </div>
              <Switch
                checked={settings.showIcons}
                onCheckedChange={(checked) => updateSettings('showIcons', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}