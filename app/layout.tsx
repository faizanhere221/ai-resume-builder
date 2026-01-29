import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import { GoogleAnalytics } from '@/components/google-analytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://resume.infoishai.com'),
  title: {
    default: 'ResumeAI - Free AI-Powered Resume Builder',
    template: '%s | ResumeAI',
  },
  description: 'Create professional, ATS-friendly resumes in minutes with AI assistance. 100% free, no credit card required. Choose from 10+ templates.',
  keywords: [
    'resume builder',
    'AI resume',
    'free resume maker',
    'ATS resume',
    'professional resume',
    'CV builder',
    'resume templates',
    'job application',
    'career',
    'resume generator',
  ],
  authors: [{ name: 'Infoishai', url: 'https://infoishai.com' }],
  creator: 'Infoishai',
  publisher: 'Infoishai',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://resume.infoishai.com',
    siteName: 'ResumeAI',
    title: 'ResumeAI - Free AI-Powered Resume Builder',
    description: 'Create professional, ATS-friendly resumes in minutes with AI assistance. 100% free.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ResumeAI - AI-Powered Resume Builder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ResumeAI - Free AI-Powered Resume Builder',
    description: 'Create professional, ATS-friendly resumes in minutes with AI assistance.',
    images: ['/og-image.png'],
    creator: '@infoishai',
  },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE', // Replace with actual code
  },
  alternates: {
    canonical: 'https://resume.infoishai.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''} />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}