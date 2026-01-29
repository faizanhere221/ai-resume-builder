import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  FileText,
  Shield,
  ArrowLeft,
  Calendar,
} from 'lucide-react'

export default function PrivacyPolicyPage() {
  const lastUpdated = 'January 28, 2025'

  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
      content: `Welcome to ResumeAI ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our resume building service.

Please read this privacy policy carefully. By using ResumeAI, you agree to the collection and use of information in accordance with this policy.`,
    },
    {
      id: 'information-collection',
      title: 'Information We Collect',
      content: `We collect information that you voluntarily provide to us when you:
      
• Create an account (email address, name)
• Build your resume (personal details, work history, education, skills)
• Contact us for support
• Subscribe to our newsletter

We automatically collect certain information when you visit our website:
• Device information (browser type, operating system)
• Usage data (pages visited, time spent)
• IP address and approximate location

We do NOT collect:
• Payment information (our service is free)
• Government IDs or sensitive documents
• Information from third parties`,
    },
    {
      id: 'how-we-use',
      title: 'How We Use Your Information',
      content: `We use the information we collect to:

• Provide and maintain our resume building service
• Save and sync your resumes across devices
• Improve and personalize your experience
• Send you service-related communications
• Respond to your inquiries and support requests
• Analyze usage patterns to improve our service
• Protect against fraud and abuse

We will NEVER:
• Sell your personal information to third parties
• Share your resume content with employers without your consent
• Use your information for targeted advertising`,
    },
    {
      id: 'data-storage',
      title: 'Data Storage and Security',
      content: `Your data security is our priority:

• All data is encrypted in transit (HTTPS/TLS)
• Resume data is stored securely on encrypted servers
• We use Supabase for secure database management
• Regular security audits and updates
• Access to your data is limited to essential personnel

Data Location:
• Our servers are located in secure data centers
• We comply with applicable data protection regulations

Data Retention:
• Your data is retained as long as you maintain an account
• You can delete your account and all data at any time
• Deleted data is permanently removed within 30 days`,
    },
    {
      id: 'your-rights',
      title: 'Your Rights',
      content: `You have the right to:

• Access: Request a copy of your personal data
• Correction: Update or correct inaccurate information
• Deletion: Delete your account and all associated data
• Export: Download your resume data
• Opt-out: Unsubscribe from marketing communications

To exercise these rights:
• Go to Settings in your dashboard
• Or contact us at privacy@infoishai.com

We will respond to your request within 30 days.`,
    },
    {
      id: 'cookies',
      title: 'Cookies and Tracking',
      content: `We use essential cookies for:

• Authentication and session management
• Remembering your preferences
• Security and fraud prevention

We do NOT use:
• Third-party advertising cookies
• Cross-site tracking
• Social media tracking pixels

You can disable cookies in your browser settings, but some features may not work properly.`,
    },
    {
      id: 'third-parties',
      title: 'Third-Party Services',
      content: `We use the following third-party services:

• Supabase: Database and authentication
• Vercel: Website hosting
• OpenAI: AI-powered content suggestions (data is not stored)

These services have their own privacy policies and we encourage you to review them.

We do NOT share your personal information with:
• Advertisers
• Data brokers
• Marketing agencies
• Recruiters or employers (without your consent)`,
    },
    {
      id: 'children',
      title: "Children's Privacy",
      content: `ResumeAI is not intended for children under 16 years of age. We do not knowingly collect personal information from children.

If you are a parent or guardian and believe your child has provided us with personal information, please contact us at privacy@infoishai.com, and we will delete such information.`,
    },
    {
      id: 'changes',
      title: 'Changes to This Policy',
      content: `We may update this Privacy Policy from time to time. We will notify you of any changes by:

• Posting the new Privacy Policy on this page
• Updating the "Last Updated" date
• Sending an email notification for significant changes

We encourage you to review this Privacy Policy periodically for any changes.`,
    },
    {
      id: 'contact',
      title: 'Contact Us',
      content: `If you have any questions about this Privacy Policy, please contact us:

Email: privacy@infoishai.com
General Support: support@infoishai.com

Infoishai
Multan, Punjab
Pakistan

We aim to respond to all inquiries within 48 hours.`,
    },
  ]

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
              <Link href="/">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Shield className="h-4 w-4" />
            Legal
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-blue-100 mb-4">
            Your privacy is important to us. Learn how we handle your data.
          </p>
          <div className="inline-flex items-center gap-2 text-blue-200 text-sm">
            <Calendar className="h-4 w-4" />
            Last updated: {lastUpdated}
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-8 px-4 border-b bg-white sticky top-16 z-40">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-full transition-all duration-200"
              >
                {section.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-slate prose-lg max-w-none">
            {sections.map((section, index) => (
              <div
                key={section.id}
                id={section.id}
                className="mb-12 scroll-mt-32"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm">
                    {index + 1}
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 m-0">{section.title}</h2>
                </div>
                <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
                  <div className="text-slate-600 whitespace-pre-line leading-relaxed">
                    {section.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Summary Box */}
      <section className="py-12 px-4 bg-blue-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-blue-100">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              Privacy Summary
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-700 mb-2">We DO:</h4>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    Encrypt all your data
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    Let you delete your account anytime
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    Keep your resumes private
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    Respond to data requests within 30 days
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-700 mb-2">We DON'T:</h4>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    Sell your personal information
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    Share data with advertisers
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    Use tracking cookies
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    Share resumes without consent
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Questions about your privacy?</h3>
          <p className="text-slate-600 mb-6">
            We're here to help. Contact our privacy team anytime.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              Contact Us
            </Button>
          </Link>
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