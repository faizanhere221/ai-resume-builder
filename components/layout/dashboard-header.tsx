'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import type { User } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { getInitials } from '@/lib/utils'
import {
  FileText,
  Menu,
  Plus,
  LogOut,
  Settings,
  User as UserIcon,
  LayoutDashboard,
  FolderOpen,
  HelpCircle,
} from 'lucide-react'

// Dynamically import components that cause hydration issues
const Sheet = dynamic(
  () => import('@/components/ui/sheet').then(mod => mod.Sheet),
  { ssr: false }
)
const SheetContent = dynamic(
  () => import('@/components/ui/sheet').then(mod => mod.SheetContent),
  { ssr: false }
)
const SheetTrigger = dynamic(
  () => import('@/components/ui/sheet').then(mod => mod.SheetTrigger),
  { ssr: false }
)
const DropdownMenu = dynamic(
  () => import('@/components/ui/dropdown-menu').then(mod => mod.DropdownMenu),
  { ssr: false }
)
const DropdownMenuContent = dynamic(
  () => import('@/components/ui/dropdown-menu').then(mod => mod.DropdownMenuContent),
  { ssr: false }
)
const DropdownMenuItem = dynamic(
  () => import('@/components/ui/dropdown-menu').then(mod => mod.DropdownMenuItem),
  { ssr: false }
)
const DropdownMenuLabel = dynamic(
  () => import('@/components/ui/dropdown-menu').then(mod => mod.DropdownMenuLabel),
  { ssr: false }
)
const DropdownMenuSeparator = dynamic(
  () => import('@/components/ui/dropdown-menu').then(mod => mod.DropdownMenuSeparator),
  { ssr: false }
)
const DropdownMenuTrigger = dynamic(
  () => import('@/components/ui/dropdown-menu').then(mod => mod.DropdownMenuTrigger),
  { ssr: false }
)

interface DashboardHeaderProps {
  user: User
}

const mobileNavItems = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { title: 'My Resumes', href: '/resumes', icon: FileText },
  { title: 'Templates', href: '/templates', icon: FolderOpen },
  { title: 'Settings', href: '/settings', icon: Settings },
  { title: 'Help', href: '/help', icon: HelpCircle },
]

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      toast.error('Error', {
        description: 'Failed to sign out. Please try again.',
      })
      return
    }

    toast.success('Signed out', {
      description: 'You have been successfully signed out.',
    })

    router.push('/')
    router.refresh()
  }

  const userName = user.user_metadata?.full_name || user.email || 'User'
  const userEmail = user.email || ''
  const userAvatar = user.user_metadata?.avatar_url

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Logo and Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="flex items-center gap-2 p-4 border-b">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <span className="font-bold text-xl">ResumeAI</span>
                </div>
                <nav className="p-4 space-y-2">
                  {mobileNavItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                      >
                        <Icon className="h-5 w-5" />
                        {item.title}
                      </Link>
                    )
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <FileText className="h-8 w-8 text-blue-600" />
            <span className="font-bold text-xl hidden sm:inline">ResumeAI</span>
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Create New Button */}
          <Link href="/resumes/new">
            <Button className="hidden sm:flex">
              <Plus className="mr-2 h-4 w-4" />
              New Resume
            </Button>
            <Button size="icon" className="sm:hidden">
              <Plus className="h-4 w-4" />
            </Button>
          </Link>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={userAvatar} alt={userName} />
                  <AvatarFallback className="bg-blue-100 text-blue-700">
                    {getInitials(userName)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userName}</p>
                  <p className="text-xs leading-none text-slate-500">{userEmail}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/settings" className="cursor-pointer">
                  <UserIcon className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-red-600 focus:text-red-600"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}