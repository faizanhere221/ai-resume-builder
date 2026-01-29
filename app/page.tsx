'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { 
  FileText, 
  Sparkles, 
  CheckCircle, 
  ArrowRight,
  Zap,
  Shield,
  Download,
  Palette,
  Star,
  Users,
  Award,
  ChevronRight,
  Play,
  Quote,
  Globe,
  Clock,
  Target,
  Mail,
  Loader2,
} from 'lucide-react'

// Testimonial Card Component with proper image handling
function TestimonialCard({ testimonial }: { testimonial: {
  name: string
  role: string
  company: string
  image: string
  fallbackEmoji: string
  content: string
}}) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
      <Quote className="h-10 w-10 text-blue-100 mb-4 group-hover:text-blue-200 transition-colors duration-300" />
      <p className="text-slate-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center shrink-0">
          {!imageError ? (
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              width={48}
              height={48}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <span className="text-2xl">{testimonial.fallbackEmoji}</span>
          )}
        </div>
        <div>
          <div className="font-semibold text-slate-900">{testimonial.name}</div>
          <div className="text-sm text-slate-500">{testimonial.role} at {testimonial.company}</div>
        </div>
      </div>
      <div className="flex gap-1 mt-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />
        ))}
      </div>
    </div>
  )
}

// Newsletter Component
function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) throw new Error('Failed to subscribe')

      setIsSubscribed(true)
      toast.success('Successfully subscribed!')
      setEmail('')
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
          <Mail className="h-4 w-4" />
          Newsletter
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Get Resume Tips & Career Advice
        </h2>
        <p className="text-slate-400 mb-8 max-w-xl mx-auto">
          Join 5,000+ job seekers getting weekly tips on resume writing, interview preparation, and career growth.
        </p>

        {isSubscribed ? (
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 max-w-md mx-auto">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
            <p className="text-green-400 font-medium">You're subscribed!</p>
            <p className="text-slate-400 text-sm mt-1">Check your inbox for a confirmation email.</p>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-500"
            />
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        )}
        <p className="text-slate-500 text-sm mt-4">No spam, unsubscribe anytime.</p>
      </div>
    </section>
  )
}

// Testimonials data
const testimonials = [
  {
    name: 'Faizan Islam',
    role: 'AI Engineer',
    company: 'Infoishai',
    image: '/images/testimonials/faizan.jpg',
    fallbackEmoji: '👨‍💻',
    content: 'ResumeAI helped me land my dream job! The AI suggestions were incredibly helpful.',
  },
  {
    name: 'Haris',
    role: 'Data Analyst',
    company: 'Digital Solutions',
    image: '/images/testimonials/haris.jpg',
    fallbackEmoji: '👨‍💼',
    content: 'I created a professional resume in just 10 minutes. Got 3 interview calls within a week!',
  },
  {
    name: 'Ahtasham Samad',
    role: 'Marketing Manager',
    company: 'MarketGuru',
    image: '/images/testimonials/ahtasham.jpg',
    fallbackEmoji: '📈',
    content: 'The ATS optimization feature is amazing. Finally got past those automated screening systems.',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
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
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-slate-600 hover:text-blue-600 transition-colors duration-200 font-medium">
                Features
              </Link>
              <Link href="#how-it-works" className="text-slate-600 hover:text-blue-600 transition-colors duration-200 font-medium">
                How It Works
              </Link>
              <Link href="#testimonials" className="text-slate-600 hover:text-blue-600 transition-colors duration-200 font-medium">
                Testimonials
              </Link>
              <Link href="/templates" className="text-slate-600 hover:text-blue-600 transition-colors duration-200 font-medium">
                Templates
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" className="font-medium hover:bg-slate-100 transition-colors duration-200 text-slate-700">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-500"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 px-5 py-2.5 rounded-full text-sm font-semibold mb-8 border border-green-200 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-default">
            <Sparkles className="h-4 w-4 animate-pulse" />
            100% Free - No Credit Card Required
            <ChevronRight className="h-4 w-4" />
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            Build Your Perfect Resume
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              in Minutes
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Let AI optimize your content and create ATS-friendly resumes that get you 
            <span className="font-semibold text-slate-800"> 3x more interviews</span>. 
            Choose from 10+ professional templates designed by experts.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8 py-6 w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-1 hover:scale-105 group">
                <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                Create Your Resume
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
            <Link href="/templates">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 w-full sm:w-auto border-2 border-slate-300 text-slate-700 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 hover:-translate-y-1 group">
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                Browse Templates
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
            {[
              { number: '50,000+', label: 'Resumes Created', icon: FileText },
              { number: '10,000+', label: 'Happy Users', icon: Users },
              { number: '95%', label: 'Success Rate', icon: Target },
              { number: '4.9/5', label: 'User Rating', icon: Star },
            ].map((stat, i) => (
              <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default group">
                <stat.icon className="h-6 w-6 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-3xl font-bold text-slate-900">{stat.number}</div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-600">
            {[
              { icon: CheckCircle, text: 'Unlimited Resumes' },
              { icon: Shield, text: 'ATS-Optimized' },
              { icon: Download, text: 'PDF & DOCX Export' },
              { icon: Sparkles, text: 'AI-Powered' },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 hover:border-green-300 hover:bg-green-50 transition-all duration-300 cursor-default group">
                <badge.icon className="h-5 w-5 text-green-500 group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:text-green-700 transition-colors duration-300">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gradient-to-b from-slate-50 to-white relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Zap className="h-4 w-4" />
              Powerful Features
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Everything You Need to
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Land Your Dream Job</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our AI-powered platform helps you create professional resumes that pass ATS systems and impress recruiters.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                color: 'purple',
                title: 'AI Content Writer',
                description: 'Let AI transform your job descriptions into powerful, achievement-focused bullet points that stand out.',
              },
              {
                icon: Shield,
                color: 'green',
                title: 'ATS Score Checker',
                description: 'Get instant feedback on how well your resume will perform with Applicant Tracking Systems.',
              },
              {
                icon: Palette,
                color: 'orange',
                title: '10+ Professional Templates',
                description: 'Choose from beautifully designed, ATS-friendly templates perfect for any industry.',
              },
              {
                icon: Zap,
                color: 'red',
                title: 'Real-Time Editor',
                description: 'See changes instantly with our live preview. Drag and drop sections, edit inline.',
              },
              {
                icon: Download,
                color: 'teal',
                title: 'Export Anywhere',
                description: 'Download your resume as PDF or DOCX. Share via link or email directly to recruiters.',
              },
              {
                icon: FileText,
                color: 'blue',
                title: 'Multiple Resumes',
                description: 'Create unlimited resumes for different jobs. Tailor each one to match specific requirements.',
              },
            ].map((feature, i) => {
              const colorClasses: Record<string, { bg: string; icon: string; hover: string }> = {
                purple: { bg: 'bg-purple-100', icon: 'text-purple-600', hover: 'hover:border-purple-200 hover:shadow-purple-100' },
                green: { bg: 'bg-green-100', icon: 'text-green-600', hover: 'hover:border-green-200 hover:shadow-green-100' },
                orange: { bg: 'bg-orange-100', icon: 'text-orange-600', hover: 'hover:border-orange-200 hover:shadow-orange-100' },
                red: { bg: 'bg-red-100', icon: 'text-red-600', hover: 'hover:border-red-200 hover:shadow-red-100' },
                teal: { bg: 'bg-teal-100', icon: 'text-teal-600', hover: 'hover:border-teal-200 hover:shadow-teal-100' },
                blue: { bg: 'bg-blue-100', icon: 'text-blue-600', hover: 'hover:border-blue-200 hover:shadow-blue-100' },
              }
              const colors = colorClasses[feature.color]

              return (
                <div
                  key={i}
                  className={`bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl ${colors.hover} transition-all duration-300 hover:-translate-y-2 group cursor-default`}
                >
                  <div className={`w-14 h-14 ${colors.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`h-7 w-7 ${colors.icon}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Clock className="h-4 w-4" />
              Quick & Easy
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Create Your Resume in <span className="text-blue-600">3 Easy Steps</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200"></div>

            {[
              { step: 1, title: 'Choose a Template', description: 'Browse our collection of professional templates and pick one that matches your style and industry.' },
              { step: 2, title: 'Fill Your Details', description: 'Add your information and let AI help you write compelling summaries and achievement-focused bullet points.' },
              { step: 3, title: 'Download & Apply', description: 'Export your ATS-optimized resume as PDF and start applying to your dream jobs with confidence.' },
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="relative inline-block mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto shadow-xl shadow-blue-500/25 group-hover:shadow-blue-500/40 group-hover:scale-110 transition-all duration-300">
                    {item.step}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-50 group-hover:scale-100">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors duration-300">{item.title}</h3>
                <p className="text-slate-600 max-w-xs mx-auto">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Star className="h-4 w-4 fill-amber-500" />
              Testimonials
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Loved by <span className="text-blue-600">10,000+</span> Job Seekers
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <TestimonialCard key={i} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSection />

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Award className="h-4 w-4" />
            Join 10,000+ successful job seekers
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Build Your Winning Resume?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands who have landed their dream jobs with our AI-powered resume builder. It's completely free!
          </p>
          <Link href="/register">
            <Button size="lg" className="text-lg px-10 py-7 bg-white text-blue-600 hover:bg-blue-50 shadow-2xl hover:shadow-white/25 transition-all duration-300 hover:-translate-y-1 hover:scale-105 group">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
          <p className="text-white/80 mt-6 text-sm">No credit card required • Free forever</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-2 text-white mb-4 group">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-500 p-2 rounded-xl group-hover:scale-105 transition-transform duration-300">
                  <FileText className="h-5 w-5" />
                </div>
                <span className="font-bold text-xl">ResumeAI</span>
              </Link>
              <p className="text-sm leading-relaxed mb-4">
                AI-powered resume builder helping job seekers land their dream jobs. Create professional, ATS-friendly resumes in minutes.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <Globe className="h-4 w-4" />
                Made with ❤️ in Pakistan
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-3 text-sm">
                {['Features', 'Templates', 'Pricing', 'Examples'].map((item) => (
                  <li key={item}>
                    <Link href={`/${item.toLowerCase()}`} className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-3 text-sm">
                {[
                  { label: 'Help Center', href: '/help' },
                  { label: 'Blog', href: '/blog' },
                  { label: 'Resume Tips', href: '/tips' },
                  { label: 'Career Advice', href: '/advice' },
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-sm">
                {[
                  { label: 'About', href: '/about' },
                  { label: 'Contact', href: '/contact' },
                  { label: 'Privacy Policy', href: '/privacy' },
                  { label: 'Terms of Service', href: '/terms' },
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">
              © {new Date().getFullYear()} ResumeAI. All rights reserved.
            </p>
            <p className="text-sm">
              A product of <Link href="https://infoishai.com" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">Infoishai</Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}