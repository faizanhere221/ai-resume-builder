'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import {
  FileText,
  Search,
  ChevronDown,
  ChevronRight,
  BookOpen,
  MessageCircle,
  Mail,
  Zap,
  Shield,
  Download,
  Palette,
  HelpCircle,
  ExternalLink,
  Sparkles,
  FileQuestion,
  CreditCard,
  User,
  Settings,
} from 'lucide-react'

const faqs = [
  {
    category: 'Getting Started',
    icon: Zap,
    questions: [
      {
        q: 'How do I create my first resume?',
        a: 'Creating your first resume is easy! Simply click "Create Resume" from your dashboard, choose a template that suits your style, and start filling in your information. Our AI assistant will help you write compelling content along the way.',
      },
      {
        q: 'Is ResumeAI really free?',
        a: 'Yes! ResumeAI is completely free to use. You can create unlimited resumes, use all our templates, and export to PDF without any charges. We believe everyone deserves access to professional resume tools.',
      },
      {
        q: 'Do I need to create an account?',
        a: 'Yes, you need to create a free account to save your resumes and access them from any device. Your data is securely stored and you can delete your account at any time.',
      },
    ],
  },
  {
    category: 'Templates & Design',
    icon: Palette,
    questions: [
      {
        q: 'How many templates are available?',
        a: 'We offer 10+ professionally designed templates, including Professional, Modern, Creative, Elegant, and Minimal styles. Each template is ATS-friendly and fully customizable.',
      },
      {
        q: 'Can I customize the colors and fonts?',
        a: 'Absolutely! Every template is fully customizable. You can change colors, fonts, font sizes, spacing, and even rearrange sections to match your personal brand.',
      },
      {
        q: 'Which template should I choose?',
        a: 'It depends on your industry. For corporate/finance roles, try Professional or Minimal. For creative industries, use Creative or Modern. When in doubt, Professional works for most situations.',
      },
    ],
  },
  {
    category: 'ATS & Optimization',
    icon: Shield,
    questions: [
      {
        q: 'What is ATS and why does it matter?',
        a: 'ATS (Applicant Tracking System) is software used by 97% of Fortune 500 companies to scan resumes before humans see them. Our templates are designed to pass ATS scans while still looking great.',
      },
      {
        q: 'How do I improve my ATS score?',
        a: 'Use keywords from the job description, avoid images and graphics in important sections, use standard section headings, and stick to common fonts. Our ATS checker will give you specific suggestions.',
      },
      {
        q: 'Are all templates ATS-friendly?',
        a: 'Most of our templates are ATS-optimized. The Creative template uses a two-column layout which some older ATS systems may struggle with, but works fine with modern systems.',
      },
    ],
  },
  {
    category: 'Export & Download',
    icon: Download,
    questions: [
      {
        q: 'What formats can I download my resume in?',
        a: 'You can download your resume as a PDF (recommended for applications) or DOCX (if you need to make edits in Word). PDF preserves the exact formatting.',
      },
      {
        q: 'Is there a limit on downloads?',
        a: 'No limits! Download your resume as many times as you want. We recommend downloading a fresh copy each time you make changes.',
      },
      {
        q: 'Can I share my resume via link?',
        a: 'Yes! You can generate a shareable link to your resume that recruiters can view online. You can also set an expiration date for the link.',
      },
    ],
  },
  {
    category: 'AI Features',
    icon: Sparkles,
    questions: [
      {
        q: 'How does the AI content writer work?',
        a: 'Our AI analyzes your job title and responsibilities to generate professional, achievement-focused bullet points. Simply enter your basic info and click "Enhance with AI" to get suggestions.',
      },
      {
        q: 'Can I edit AI-generated content?',
        a: 'Of course! AI suggestions are just a starting point. You have full control to edit, modify, or completely rewrite any content. We recommend personalizing AI content with your specific achievements.',
      },
      {
        q: 'Is there a limit on AI usage?',
        a: 'Currently, AI features are unlimited for all users. We may introduce fair usage limits in the future, but basic AI assistance will always be free.',
      },
    ],
  },
  {
    category: 'Account & Privacy',
    icon: User,
    questions: [
      {
        q: 'How is my data protected?',
        a: 'We use industry-standard encryption to protect your data. Your resumes are stored securely and we never share your information with third parties. See our Privacy Policy for details.',
      },
      {
        q: 'Can I delete my account?',
        a: 'Yes, you can delete your account at any time from Settings. This will permanently remove all your data including resumes. This action cannot be undone.',
      },
      {
        q: 'Can I use ResumeAI on mobile?',
        a: 'Yes! Our platform is fully responsive and works on smartphones and tablets. For the best editing experience, we recommend using a desktop or laptop.',
      },
    ],
  },
]

const quickLinks = [
  { title: 'Create Your First Resume', href: '/templates', icon: FileText },
  { title: 'Browse Templates', href: '/templates', icon: Palette },
  { title: 'Contact Support', href: '/contact', icon: MessageCircle },
  { title: 'Privacy Policy', href: '/privacy', icon: Shield },
]

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      q =>
        q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(category => category.questions.length > 0)

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
              <Link href="/contact">
                <Button variant="outline">Contact Support</Button>
              </Link>
              <Link href="/dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <HelpCircle className="h-4 w-4" />
            Help Center
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            How can we help you?
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Find answers to common questions or contact our support team
          </p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-lg bg-white text-slate-900 border-0 shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 px-4 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickLinks.map((link, i) => (
              <Link key={i} href={link.href}>
                <Card className="hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group h-full">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                      <link.icon className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                      {link.title}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>

          {filteredFaqs.length === 0 ? (
            <Card className="p-12 text-center">
              <FileQuestion className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No results found</h3>
              <p className="text-slate-600 mb-4">Try a different search term or browse all categories below</p>
              <Button variant="outline" onClick={() => setSearchQuery('')}>
                Clear Search
              </Button>
            </Card>
          ) : (
            <div className="space-y-8">
              {filteredFaqs.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <category.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">{category.category}</h3>
                  </div>
                  <div className="space-y-3">
                    {category.questions.map((faq, faqIndex) => {
                      const itemId = `${categoryIndex}-${faqIndex}`
                      const isOpen = openItems.includes(itemId)

                      return (
                        <Card
                          key={faqIndex}
                          className={`overflow-hidden transition-all duration-300 ${isOpen ? 'shadow-md border-blue-200' : 'hover:shadow-sm'}`}
                        >
                          <button
                            onClick={() => toggleItem(itemId)}
                            className="w-full p-5 flex items-center justify-between text-left"
                          >
                            <span className="font-medium text-slate-900 pr-4">{faq.q}</span>
                            <ChevronDown
                              className={`h-5 w-5 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                            />
                          </button>
                          <div
                            className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}
                          >
                            <div className="px-5 pb-5 text-slate-600 leading-relaxed border-t pt-4">
                              {faq.a}
                            </div>
                          </div>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Still have questions?</h2>
          <p className="text-slate-600 mb-8">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <MessageCircle className="mr-2 h-5 w-5" />
                Contact Support
              </Button>
            </Link>
            <Link href="mailto:hello@infoishai.com">
              <Button size="lg" variant="outline" className="hover:-translate-y-0.5 transition-all duration-300">
                <Mail className="mr-2 h-5 w-5" />
                Email Us
              </Button>
            </Link>
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