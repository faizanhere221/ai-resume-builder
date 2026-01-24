import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Merge Tailwind classes safely (this was already here from shadcn)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format date to readable string
export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    ...options
  }
  return new Date(date).toLocaleDateString('en-US', defaultOptions)
}

// Format date range (e.g., "Jan 2020 - Present")
export function formatDateRange(startDate: string, endDate: string | null, current: boolean = false): string {
  const start = formatDate(startDate)
  if (current || !endDate) {
    return `${start} - Present`
  }
  return `${start} - ${formatDate(endDate)}`
}

// Generate unique ID
export function generateId(): string {
  return crypto.randomUUID()
}

// Truncate text with ellipsis
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trim() + '...'
}

// Capitalize first letter
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

// Validate email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate LinkedIn URL
export function isValidLinkedInUrl(url: string): boolean {
  const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/
  return linkedinRegex.test(url)
}

// Extract LinkedIn username from URL
export function extractLinkedInUsername(url: string): string | null {
  const match = url.match(/linkedin\.com\/in\/([a-zA-Z0-9-]+)/)
  return match ? match[1] : null
}

// Get initials from name
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Format file size
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Debounce function
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }
    
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

// Sleep/delay utility
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Safe JSON parse
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T
  } catch {
    return fallback
  }
}

// Get error message from unknown error
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  if (typeof error === 'string') return error
  return 'An unknown error occurred'
}