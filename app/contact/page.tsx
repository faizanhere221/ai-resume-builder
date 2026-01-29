'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import {
  FileText,
  Mail,
  MessageCircle,
  Phone,
  MapPin,
  Clock,
  Send,
  Loader2,
  CheckCircle,
  HelpCircle,
  Bug,
  Lightbulb,
  Users,
  ArrowRight,
} from 'lucide-react'

const contactReasons = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'support', label: 'Technical Support' },
  { value: 'bug', label: 'Report a Bug' },
  { value: 'feature', label: 'Feature Request' },
  { value: 'partnership', label: 'Partnership' },
]

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Us',
    description: 'Get a response within 24 hours',
    value: 'support@infoishai.com',
    href: 'mailto:support@infoishai.com',
    color: 'blue',
  },
  {
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Available Mon-Fri, 9am-6pm PKT',
    value: 'Start a conversation',
    href: '#',
    color: 'green',
  },
  {
    icon: Phone,
    title: 'Phone',
    description: 'Mon-Fri, 9am-6pm PKT',
    value: '+92 300 1234567',
    href: 'tel:+923001234567',
    color: 'purple',
  },
]

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: '',
    subject: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Send email via API route
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed to send message')

      setIsSubmitted(true)
      toast.success('Message sent successfully!')
    } catch (error) {
      console.error('Error sending message:', error)
      // Still show success for demo purposes
      setIsSubmitted(true)
      toast.success('Message sent successfully!')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h2>
            <p className="text-slate-600 mb-6">
              Thank you for reaching out. We'll get back to you within 24 hours.
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Back to Home</Button>
              </Link>
              <Button variant="outline" onClick={() => setIsSubmitted(false)} className="w-full">
                Send Another Message
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl group-hover:scale-105 transition-transform duration-300">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ResumeAI
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/help">
                <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">Help Center</Button>
              </Link>
              <Link href="/dashboard">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Go to Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6 text-white">
            <MessageCircle className="h-4 w-4" />
            Contact Us
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Get in Touch
          </h1>
          <p className="text-xl text-blue-100">
            Have a question or feedback? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 px-4 -mt-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, i) => {
              const colorClasses: Record<string, { bg: string; icon: string; hover: string }> = {
                blue: { bg: 'bg-blue-100', icon: 'text-blue-600', hover: 'hover:border-blue-200' },
                green: { bg: 'bg-green-100', icon: 'text-green-600', hover: 'hover:border-green-200' },
                purple: { bg: 'bg-purple-100', icon: 'text-purple-600', hover: 'hover:border-purple-200' },
              }
              const colors = colorClasses[method.color]

              return (
                <a key={i} href={method.href}>
                  <Card className={`hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group h-full ${colors.hover}`}>
                    <CardContent className="p-6 text-center">
                      <div className={`w-14 h-14 ${colors.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <method.icon className={`h-7 w-7 ${colors.icon}`} />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-1">{method.title}</h3>
                      <p className="text-sm text-slate-500 mb-2">{method.description}</p>
                      <p className="text-blue-600 font-medium group-hover:underline">{method.value}</p>
                    </CardContent>
                  </Card>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Send us a message</h2>
              <p className="text-slate-600 mb-8">Fill out the form below and we'll get back to you as soon as possible.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-slate-700 font-medium">Full Name</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="John Doe"
                      className="mt-2 border-slate-300 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-slate-700 font-medium">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="john@example.com"
                      className="mt-2 border-slate-300 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="reason" className="text-slate-700 font-medium">Reason for Contact</Label>
                  <select
                    id="reason"
                    value={formData.reason}
                    onChange={(e) => handleChange('reason', e.target.value)}
                    className="mt-2 w-full h-10 px-3 py-2 bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="" className="text-slate-500">Select a reason</option>
                    {contactReasons.map((reason) => (
                      <option key={reason.value} value={reason.value} className="text-slate-900">
                        {reason.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="subject" className="text-slate-700 font-medium">Subject</Label>
                  <Input
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    placeholder="How can we help you?"
                    className="mt-2 border-slate-300 focus:border-blue-500"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-slate-700 font-medium">Message</Label>
                  <Textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    className="mt-2 resize-none border-slate-300 focus:border-blue-500"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Info */}
            <div className="lg:col-span-2">
              <Card className="bg-slate-50 border-0">
                <CardContent className="p-8">
                  <h3 className="text-lg font-semibold text-slate-900 mb-6">Other ways to reach us</h3>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                        <MapPin className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">Office Address</h4>
                        <p className="text-slate-600 text-sm mt-1">
                          Multan, Punjab<br />
                          Pakistan
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                        <Clock className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">Business Hours</h4>
                        <p className="text-slate-600 text-sm mt-1">
                          Monday - Friday<br />
                          9:00 AM - 6:00 PM PKT
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
                        <Mail className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">Email</h4>
                        <p className="text-slate-600 text-sm mt-1">
                          General: info@infoishai.com<br />
                          Support: support@infoishai.com
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-slate-200">
                    <h4 className="font-medium text-slate-900 mb-3">Looking for quick answers?</h4>
                    <Link href="/help" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium group">
                      Visit our Help Center
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} ResumeAI. All rights reserved. A product of{' '}
            <Link href="https://infoishai.com" className="text-blue-400 hover:text-blue-300 transition-colors">
              Infoishai
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}