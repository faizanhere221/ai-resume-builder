import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  FileText, 
  Sparkles, 
  CheckCircle, 
  ArrowRight,
  Zap,
  Shield,
  Download,
  Palette,
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <FileText className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl">ResumeAI</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-slate-600 hover:text-slate-900 transition">
                Features
              </Link>
              <Link href="#how-it-works" className="text-slate-600 hover:text-slate-900 transition">
                How It Works
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button>Get Started Free</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Sparkles className="h-4 w-4" />
            100% Free - No Credit Card Required
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            Build Your Perfect Resume
            <span className="text-blue-600"> in Minutes</span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10">
            Let AI optimize your content and create ATS-friendly resumes that get you more interviews. Choose from 10+ professional templates.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8 py-6 w-full sm:w-auto">
                <Sparkles className="mr-2 h-5 w-5" />
                Create Your Resume
              </Button>
            </Link>
            <Link href="/templates">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 w-full sm:w-auto">
                Browse Templates
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Unlimited Resumes
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              ATS-Optimized Templates
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Export to PDF & DOCX
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              AI-Powered Content
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need to Land Your Dream Job
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our AI-powered platform helps you create professional resumes that pass ATS systems and impress recruiters.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                AI Content Writer
              </h3>
              <p className="text-slate-600">
                Let AI transform your job descriptions into powerful, achievement-focused bullet points that stand out.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                ATS Score Checker
              </h3>
              <p className="text-slate-600">
                Get instant feedback on how well your resume will perform with Applicant Tracking Systems used by 97% of Fortune 500.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <Palette className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                10+ Professional Templates
              </h3>
              <p className="text-slate-600">
                Choose from beautifully designed, ATS-friendly templates for resumes and CVs. Perfect for any industry.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Real-Time Editor
              </h3>
              <p className="text-slate-600">
                See changes instantly with our live preview. Drag and drop sections, edit inline, and customize every detail.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
                <Download className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Export Anywhere
              </h3>
              <p className="text-slate-600">
                Download your resume as PDF or DOCX. Share via link or email directly to recruiters.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Multiple Resumes
              </h3>
              <p className="text-slate-600">
                Create unlimited resumes for different jobs. Tailor each one to match specific job requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Create Your Resume in 3 Easy Steps
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Choose a Template</h3>
              <p className="text-slate-600">
                Browse our collection of professional templates and pick one that matches your style and industry.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Fill Your Details</h3>
              <p className="text-slate-600">
                Add your information and let AI help you write compelling summaries and achievement-focused bullet points.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Download & Apply</h3>
              <p className="text-slate-600">
                Export your ATS-optimized resume as PDF and start applying to your dream jobs with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Build Your Winning Resume?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Join thousands of job seekers who have landed their dream jobs with our AI-powered resume builder. It&apos;s completely free!
          </p>
          <Link href="/register">
            <Button size="lg" className="text-lg px-8 py-6 bg-white text-blue-600 hover:bg-blue-50">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 text-white mb-4">
                <FileText className="h-6 w-6" />
                <span className="font-bold text-lg">ResumeAI</span>
              </div>
              <p className="text-sm">
                AI-powered resume builder helping job seekers land their dream jobs. Free forever.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#features" className="hover:text-white transition">Features</Link></li>
                <li><Link href="#how-it-works" className="hover:text-white transition">How It Works</Link></li>
                <li><Link href="/templates" className="hover:text-white transition">Templates</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
                <li><Link href="/examples" className="hover:text-white transition">Resume Examples</Link></li>
                <li><Link href="/help" className="hover:text-white transition">Help Center</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white transition">About</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-sm text-center">
            © {new Date().getFullYear()} ResumeAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}