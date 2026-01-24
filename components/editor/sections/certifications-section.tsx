'use client'

import { useResumeStore } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { generateId } from '@/lib/utils'
import {
  Award,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  GripVertical,
  ExternalLink,
} from 'lucide-react'

interface CertificationsSectionProps {
  isOpen: boolean
  onToggle: () => void
}

export function CertificationsSection({ isOpen, onToggle }: CertificationsSectionProps) {
  const { currentResume, addCertification, updateCertification, removeCertification } = useResumeStore()
  const certifications = currentResume.certifications || []

  const handleAddCertification = () => {
    addCertification({
      id: generateId(),
      name: '',
      issuer: '',
      issueDate: '',
      expiryDate: '',
      credentialId: '',
      url: '',
    })
  }

  return (
    <Card>
      <CardHeader className="cursor-pointer" onClick={onToggle}>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Award className="h-5 w-5 text-purple-600" />
            Certifications & Licenses
            <span className="text-sm font-normal text-slate-500">({certifications.length})</span>
          </CardTitle>
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </CardHeader>
      
      {isOpen && (
        <CardContent className="space-y-4">
          {certifications.length === 0 && (
            <div className="text-center py-8 bg-slate-50 rounded-lg border-2 border-dashed">
              <Award className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600 mb-1">No certifications added yet</p>
              <p className="text-sm text-slate-400 mb-4">Add your professional certifications and licenses</p>
              <Button onClick={handleAddCertification}>
                <Plus className="h-4 w-4 mr-2" />
                Add Certification
              </Button>
            </div>
          )}

          {certifications.map((cert, index) => (
            <div key={cert.id} className="border rounded-lg p-4 space-y-4 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GripVertical className="h-5 w-5 text-slate-300 cursor-grab" />
                  <span className="font-medium text-slate-700">
                    {cert.name || `Certification ${index + 1}`}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeCertification(cert.id)}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Certification Name *</Label>
                  <Input
                    value={cert.name}
                    onChange={(e) => updateCertification(cert.id, { name: e.target.value })}
                    placeholder="AWS Solutions Architect"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Issuing Organization *</Label>
                  <Input
                    value={cert.issuer}
                    onChange={(e) => updateCertification(cert.id, { issuer: e.target.value })}
                    placeholder="Amazon Web Services"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Issue Date</Label>
                  <Input
                    type="month"
                    value={cert.issueDate || ''}
                    onChange={(e) => updateCertification(cert.id, { issueDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Expiry Date</Label>
                  <Input
                    type="month"
                    value={cert.expiryDate || ''}
                    onChange={(e) => updateCertification(cert.id, { expiryDate: e.target.value })}
                    placeholder="Leave empty if no expiry"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Credential ID</Label>
                  <Input
                    value={cert.credentialId || ''}
                    onChange={(e) => updateCertification(cert.id, { credentialId: e.target.value })}
                    placeholder="ABC123XYZ"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Credential URL</Label>
                  <div className="relative">
                    <Input
                      value={cert.url || ''}
                      onChange={(e) => updateCertification(cert.id, { url: e.target.value })}
                      placeholder="https://verify.example.com/..."
                      className="pr-10"
                    />
                    {cert.url && (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {certifications.length > 0 && (
            <Button variant="outline" onClick={handleAddCertification} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Another Certification
            </Button>
          )}
        </CardContent>
      )}
    </Card>
  )
}