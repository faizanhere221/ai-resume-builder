'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  FileText,
  Target,
  Heart,
  Zap,
  Users,
  Globe,
  Award,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Rocket,
  Shield,
  Clock,
  TrendingUp,
  Linkedin,
} from 'lucide-react'

const values = [
  {
    icon: Heart,
    title: 'User First',
    description: 'Everything we build starts with understanding our users needs and making their job search easier.',
    color: 'red',
  },
  {
    icon: Zap,
    title: 'Simplicity',
    description: 'We believe powerful tools should be easy to use. No complexity, no learning curve.',
    color: 'yellow',
  },
  {
    icon: Shield,
    title: 'Privacy',
    description: 'Your data belongs to you. We never share your information with third parties.',
    color: 'green',
  },
  {
    icon: Sparkles,
    title: 'Innovation',
    description: 'We leverage the latest AI technology to give you an edge in your job search.',
    color: 'purple',
  },
]

const stats = [
  { number: '50,000+', label: 'Resumes Created' },
  { number: '10,000+', label: 'Happy Users' },
  { number: '95%', label: 'Success Rate' },
  { number: '24/7', label: 'Support' },
]

const milestones = [
  { year: '2024', title: 'Founded', description: 'ResumeAI was born from a simple idea: making professional resumes accessible to everyone.' },
  { year: '2024', title: 'First 1,000 Users', description: 'Within months, we helped our first thousand users land their dream jobs.' },
  { year: '2025', title: 'AI Integration', description: 'Launched advanced AI features to help users write better resume content.' },
  { year: '2025', title: '50,000+ Resumes', description: 'Reached a major milestone, helping job seekers across Pakistan and beyond.' },
]

const team = [
  {
    name: 'Faizan',
    role: 'Founder & CEO',
    bio: 'CS student & entrepreneur passionate about AI and helping job seekers succeed.',
    image: '/images/team/faizan.jpg',
    fallbackEmoji: '👨‍💻',
    linkedin: 'https://www.linkedin.com/in/faizan-islam-41a3ab28b/',
  },
  {
    name: 'Farhan',
    role: 'Co-Founder & CTO',
    bio: 'Tech enthusiast building scalable solutions for real-world problems.',
    image: '/images/team/farhan.jpg',
    fallbackEmoji: '👨‍🔬',
    linkedin: 'https://www.linkedin.com/in/farhan-islam-570685303/',
  },
  {
    name: 'Israr',
    role: 'Co-Founder & Marketing',
    bio: 'Digital marketing expert helping ResumeAI reach those who need it most.',
    image: '/images/team/israr.jpg',
    fallbackEmoji: '📈',
    linkedin: 'https://www.linkedin.com/in/israr4se/',
  },
]

// Team Member Card Component with proper image error handling
function TeamMemberCard({ member }: { member: typeof team[0] }) {
  const [imageError, setImageError] = useState(false)

  return (
    <Card className="hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group overflow-hidden">
      <CardContent className="p-6 text-center">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          {!imageError ? (
            <Image
              src={member.image}
              alt={member.name}
              width={96}
              height={96}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <span className="text-5xl">{member.fallbackEmoji}</span>
          )}
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-1">{member.name}</h3>
        <p className="text-blue-600 font-medium text-sm mb-3">{member.role}</p>
        <p className="text-slate-600 text-sm mb-4">{member.bio}</p>
        <div className="flex justify-center">
          <a 
            href={member.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-blue-600 transition-colors"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
      </CardContent>
    </Card>
  )
}

export default function AboutPage() {
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
                <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">Contact Us</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Get Started Free</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6 text-white">
            <Users className="h-4 w-4" />
            About Us
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Helping Job Seekers
            <br />
            <span className="text-blue-200">Land Their Dream Jobs</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            We're on a mission to make professional resume building accessible to everyone, regardless of their background or budget.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 -mt-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600">{stat.number}</div>
                <div className="text-slate-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Target className="h-4 w-4" />
                Our Mission
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Making Professional Resumes
                <span className="text-blue-600"> Accessible to Everyone</span>
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                We believe that everyone deserves a chance to present themselves professionally, regardless of their design skills or budget. That's why ResumeAI is and will always be free.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Our AI-powered tools help you create resumes that not only look great but also pass through Applicant Tracking Systems (ATS), giving you the best chance of landing interviews.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg">
                    Start Building Your Resume
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Rocket, label: 'Fast & Easy' },
                    { icon: Shield, label: 'ATS Optimized' },
                    { icon: Sparkles, label: 'AI Powered' },
                    { icon: Heart, label: '100% Free' },
                  ].map((item, i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                      <item.icon className="h-8 w-8 text-blue-600 mb-3" />
                      <div className="font-semibold text-slate-900">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Heart className="h-4 w-4" />
              Our Values
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              What We Stand For
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              These principles guide everything we do at ResumeAI
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => {
              const colorClasses: Record<string, { bg: string; icon: string }> = {
                red: { bg: 'bg-red-100', icon: 'text-red-600' },
                yellow: { bg: 'bg-yellow-100', icon: 'text-yellow-600' },
                green: { bg: 'bg-green-100', icon: 'text-green-600' },
                purple: { bg: 'bg-purple-100', icon: 'text-purple-600' },
              }
              const colors = colorClasses[value.color]

              return (
                <Card key={i} className="hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <value.icon className={`h-6 w-6 ${colors.icon}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{value.title}</h3>
                    <p className="text-slate-600 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Clock className="h-4 w-4" />
              Our Journey
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              The ResumeAI Story
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200"></div>
            <div className="space-y-12">
              {milestones.map((milestone, i) => (
                <div key={i} className="relative pl-20 group">
                  <div className="absolute left-4 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold group-hover:scale-110 transition-transform duration-300">
                    {i + 1}
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="text-sm text-blue-600 font-semibold mb-1">{milestone.year}</div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{milestone.title}</h3>
                    <p className="text-slate-600">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Users className="h-4 w-4" />
              Our Team
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Meet the People Behind ResumeAI
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A small team with big dreams, working to help job seekers succeed
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, i) => (
              <TeamMemberCard key={i} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to Build Your Resume?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of job seekers who have landed their dream jobs with ResumeAI
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
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