'use client'

import { useState } from 'react'
import { useResumeStore } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  User,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Globe,
  Linkedin,
  Github,
  Twitter,
  ChevronRight,
  ImagePlus,
} from 'lucide-react'

interface PersonalInfoSectionProps {
  isOpen: boolean
  onToggle: () => void
}

export function PersonalInfoSection({ isOpen, onToggle }: PersonalInfoSectionProps) {
  const { currentResume, updatePersonalInfo } = useResumeStore()
  const { personalInfo } = currentResume
  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false)
  const [showSocialLinks, setShowSocialLinks] = useState(false)

  return (
    <Card>
      <CardHeader className="cursor-pointer" onClick={onToggle}>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="h-5 w-5 text-blue-600" />
            Personal Details
          </CardTitle>
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </CardHeader>
      
      {isOpen && (
        <CardContent className="space-y-6">
          {/* Job Title - Prominent */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <Label htmlFor="jobTitle" className="flex items-center gap-2 text-blue-700 font-medium mb-2">
              <Briefcase className="h-4 w-4" />
              Desired Job Title
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full ml-auto">+10%</span>
            </Label>
            <Input
              id="jobTitle"
              value={personalInfo.jobTitle || ''}
              onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)}
              placeholder="e.g., Senior Software Engineer"
              className="bg-white"
            />
            <p className="text-xs text-blue-600 mt-1">
              This appears at the top of your resume
            </p>
          </div>

          {/* Basic Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={personalInfo.firstName}
                onChange={(e) => updatePersonalInfo('firstName', e.target.value)}
                placeholder="John"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={personalInfo.lastName}
                onChange={(e) => updatePersonalInfo('lastName', e.target.value)}
                placeholder="Doe"
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-3 w-3" />
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={personalInfo.email}
                onChange={(e) => updatePersonalInfo('email', e.target.value)}
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-3 w-3" />
                Phone
              </Label>
              <Input
                id="phone"
                value={personalInfo.phone}
                onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                placeholder="+92 300 1234567"
              />
            </div>
          </div>

          {/* Location */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city" className="flex items-center gap-2">
                <MapPin className="h-3 w-3" />
                City
              </Label>
              <Input
                id="city"
                value={personalInfo.city || ''}
                onChange={(e) => updatePersonalInfo('city', e.target.value)}
                placeholder="Multan"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={personalInfo.country || ''}
                onChange={(e) => updatePersonalInfo('country', e.target.value)}
                placeholder="Pakistan"
              />
            </div>
          </div>

          {/* LinkedIn - Highlighted */}
          <div className="p-4 bg-slate-50 rounded-lg border">
            <Label htmlFor="linkedin" className="flex items-center gap-2 font-medium mb-2">
              <Linkedin className="h-4 w-4 text-blue-600" />
              LinkedIn URL
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full ml-auto">+5%</span>
            </Label>
            <Input
              id="linkedin"
              value={personalInfo.linkedin || ''}
              onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
              placeholder="linkedin.com/in/johndoe"
            />
          </div>

          {/* Social Links - Collapsible */}
          <Collapsible open={showSocialLinks} onOpenChange={setShowSocialLinks}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-0 h-auto hover:bg-transparent">
                <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Globe className="h-4 w-4" />
                  Website & Social Links
                </span>
                <ChevronRight className={`h-4 w-4 transition-transform ${showSocialLinks ? 'rotate-90' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website" className="flex items-center gap-2">
                    <Globe className="h-3 w-3" />
                    Website
                  </Label>
                  <Input
                    id="website"
                    value={personalInfo.website || ''}
                    onChange={(e) => updatePersonalInfo('website', e.target.value)}
                    placeholder="johndoe.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github" className="flex items-center gap-2">
                    <Github className="h-3 w-3" />
                    GitHub
                  </Label>
                  <Input
                    id="github"
                    value={personalInfo.github || ''}
                    onChange={(e) => updatePersonalInfo('github', e.target.value)}
                    placeholder="github.com/johndoe"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="portfolio" className="flex items-center gap-2">
                    <Globe className="h-3 w-3" />
                    Portfolio
                  </Label>
                  <Input
                    id="portfolio"
                    value={personalInfo.portfolio || ''}
                    onChange={(e) => updatePersonalInfo('portfolio', e.target.value)}
                    placeholder="portfolio.johndoe.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter" className="flex items-center gap-2">
                    <Twitter className="h-3 w-3" />
                    Twitter / X
                  </Label>
                  <Input
                    id="twitter"
                    value={personalInfo.twitter || ''}
                    onChange={(e) => updatePersonalInfo('twitter', e.target.value)}
                    placeholder="twitter.com/johndoe"
                  />
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Additional Details - Collapsible */}
          <Collapsible open={showAdditionalDetails} onOpenChange={setShowAdditionalDetails}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-0 h-auto hover:bg-transparent">
                <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <User className="h-4 w-4" />
                  Additional Details
                  <span className="text-xs text-slate-400 font-normal">(for non-US users)</span>
                </span>
                <ChevronRight className={`h-4 w-4 transition-transform ${showAdditionalDetails ? 'rotate-90' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4 space-y-4">
              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address">Full Address</Label>
                <Input
                  id="address"
                  value={personalInfo.address || ''}
                  onChange={(e) => updatePersonalInfo('address', e.target.value)}
                  placeholder="123 Main Street, Apt 4B"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="state">State / Province</Label>
                  <Input
                    id="state"
                    value={personalInfo.state || ''}
                    onChange={(e) => updatePersonalInfo('state', e.target.value)}
                    placeholder="Punjab"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    value={personalInfo.postalCode || ''}
                    onChange={(e) => updatePersonalInfo('postalCode', e.target.value)}
                    placeholder="60000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={personalInfo.dateOfBirth || ''}
                    onChange={(e) => updatePersonalInfo('dateOfBirth', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="placeOfBirth">Place of Birth</Label>
                  <Input
                    id="placeOfBirth"
                    value={personalInfo.placeOfBirth || ''}
                    onChange={(e) => updatePersonalInfo('placeOfBirth', e.target.value)}
                    placeholder="Lahore, Pakistan"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input
                    id="nationality"
                    value={personalInfo.nationality || ''}
                    onChange={(e) => updatePersonalInfo('nationality', e.target.value)}
                    placeholder="Pakistani"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="drivingLicense">Driving License</Label>
                  <Input
                    id="drivingLicense"
                    value={personalInfo.drivingLicense || ''}
                    onChange={(e) => updatePersonalInfo('drivingLicense', e.target.value)}
                    placeholder="Class B"
                  />
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      )}
    </Card>
  )
}