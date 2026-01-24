import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/components/providers/query-provider";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AI Resume Builder - Create ATS-Optimized Resumes with LinkedIn Import",
  description: "Build professional, ATS-friendly resumes in minutes. Import your LinkedIn profile, use AI to optimize content, and land more interviews.",
  keywords: ["resume builder", "CV maker", "ATS resume", "LinkedIn resume", "AI resume", "job application"],
  authors: [{ name: "Infoishai" }],
  openGraph: {
    title: "AI Resume Builder - Create ATS-Optimized Resumes",
    description: "Build professional resumes with AI assistance and LinkedIn import",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <QueryProvider>
          {children}
          <Toaster richColors position="top-right" />
        </QueryProvider>
      </body>
    </html>
  );
}