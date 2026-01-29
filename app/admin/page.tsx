'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import {
  FileText,
  Users,
  Mail,
  MessageSquare,
  Search,
  MoreVertical,
  Eye,
  Trash2,
  Download,
  RefreshCw,
  Loader2,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowLeft,
  BarChart3,
  TrendingUp,
  Calendar,
  Filter,
} from 'lucide-react'

interface ContactMessage {
  id: string
  name: string
  email: string
  reason: string
  subject: string
  message: string
  status: string
  created_at: string
}

interface NewsletterSubscriber {
  id: string
  email: string
  status: string
  subscribed_at: string
}

export default function AdminPage() {
  const router = useRouter()
  const supabase = createClient()
  
  const [activeTab, setActiveTab] = useState<'overview' | 'contacts' | 'newsletter'>('overview')
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  
  // Data states
  const [contacts, setContacts] = useState<ContactMessage[]>([])
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([])
  const [stats, setStats] = useState({
    totalContacts: 0,
    newContacts: 0,
    totalSubscribers: 0,
    activeSubscribers: 0,
  })
  
  // UI states
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedContact, setSelectedContact] = useState<ContactMessage | null>(null)
  const [contactDialogOpen, setContactDialogOpen] = useState(false)

  // Check if user is admin
  useEffect(() => {
    async function checkAdmin() {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/login')
        return
      }

      // Check if user is admin (you can customize this logic)
      // Option 1: Check email
      const adminEmails = ['admin@infoishai.com', 'faizan@infoishai.com', 'islam9039438@gmail.com'] // Add your admin emails
      // Option 2: Check role in users table
      
      if (adminEmails.includes(user.email || '')) {
        setIsAdmin(true)
        fetchData()
      } else {
        // Check users table for admin role
        const { data: userData } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single()
        
        if (userData?.role === 'admin') {
          setIsAdmin(true)
          fetchData()
        } else {
          toast.error('Access denied. Admin only.')
          router.push('/dashboard')
        }
      }
    }
    
    checkAdmin()
  }, [supabase, router])

  // Fetch all data
  async function fetchData() {
    setIsLoading(true)
    try {
      // Fetch contacts
      const { data: contactsData } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })
      
      setContacts(contactsData || [])

      // Fetch newsletter subscribers
      const { data: subscribersData } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('subscribed_at', { ascending: false })
      
      setSubscribers(subscribersData || [])

      // Calculate stats
      const newContacts = (contactsData || []).filter(c => c.status === 'new').length
      const activeSubscribers = (subscribersData || []).filter(s => s.status === 'active').length

      setStats({
        totalContacts: contactsData?.length || 0,
        newContacts,
        totalSubscribers: subscribersData?.length || 0,
        activeSubscribers,
      })
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Failed to load data')
    } finally {
      setIsLoading(false)
    }
  }

  // Update contact status
  async function updateContactStatus(id: string, status: string) {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status })
        .eq('id', id)
      
      if (error) throw error
      
      setContacts(contacts.map(c => c.id === id ? { ...c, status } : c))
      toast.success('Status updated')
    } catch (error) {
      toast.error('Failed to update status')
    }
  }

  // Delete contact
  async function deleteContact(id: string) {
    if (!confirm('Are you sure you want to delete this message?')) return
    
    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      
      setContacts(contacts.filter(c => c.id !== id))
      toast.success('Message deleted')
    } catch (error) {
      toast.error('Failed to delete message')
    }
  }

  // Delete subscriber
  async function deleteSubscriber(id: string) {
    if (!confirm('Are you sure you want to remove this subscriber?')) return
    
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      
      setSubscribers(subscribers.filter(s => s.id !== id))
      toast.success('Subscriber removed')
    } catch (error) {
      toast.error('Failed to remove subscriber')
    }
  }

  // Export subscribers as CSV
  function exportSubscribersCSV() {
    const csv = [
      ['Email', 'Status', 'Subscribed At'],
      ...subscribers.map(s => [s.email, s.status, s.subscribed_at])
    ].map(row => row.join(',')).join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
    toast.success('Exported successfully')
  }

  // Filter contacts by search
  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.subject.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Filter subscribers by search
  const filteredSubscribers = subscribers.filter(s =>
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-slate-600 hover:text-slate-900">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-xl">Admin Panel</span>
              </div>
            </div>
            <Button variant="outline" onClick={fetchData}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'contacts', label: 'Contact Messages', icon: MessageSquare },
            { id: 'newsletter', label: 'Newsletter', icon: Mail },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'outline'}
              onClick={() => setActiveTab(tab.id as any)}
              className={activeTab === tab.id ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">Total Contacts</p>
                      <p className="text-3xl font-bold">{stats.totalContacts}</p>
                    </div>
                    <MessageSquare className="h-10 w-10 text-blue-200" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-amber-500 to-orange-500 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-amber-100 text-sm">New Messages</p>
                      <p className="text-3xl font-bold">{stats.newContacts}</p>
                    </div>
                    <AlertCircle className="h-10 w-10 text-amber-200" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">Subscribers</p>
                      <p className="text-3xl font-bold">{stats.totalSubscribers}</p>
                    </div>
                    <Mail className="h-10 w-10 text-green-200" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-purple-500 to-violet-500 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm">Active</p>
                      <p className="text-3xl font-bold">{stats.activeSubscribers}</p>
                    </div>
                    <TrendingUp className="h-10 w-10 text-purple-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                    Recent Messages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {contacts.slice(0, 5).map((contact) => (
                    <div key={contact.id} className="flex items-center justify-between py-3 border-b last:border-0">
                      <div>
                        <p className="font-medium text-slate-900">{contact.name}</p>
                        <p className="text-sm text-slate-500 truncate max-w-[200px]">{contact.subject}</p>
                      </div>
                      <Badge className={contact.status === 'new' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}>
                        {contact.status}
                      </Badge>
                    </div>
                  ))}
                  {contacts.length === 0 && (
                    <p className="text-slate-500 text-center py-8">No messages yet</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-green-600" />
                    Recent Subscribers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {subscribers.slice(0, 5).map((subscriber) => (
                    <div key={subscriber.id} className="flex items-center justify-between py-3 border-b last:border-0">
                      <div>
                        <p className="font-medium text-slate-900">{subscriber.email}</p>
                        <p className="text-sm text-slate-500">
                          {new Date(subscriber.subscribed_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-700">active</Badge>
                    </div>
                  ))}
                  {subscribers.length === 0 && (
                    <p className="text-slate-500 text-center py-8">No subscribers yet</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className="space-y-6">
            {/* Search */}
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Messages List */}
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {filteredContacts.map((contact) => (
                    <div key={contact.id} className="p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <p className="font-semibold text-slate-900">{contact.name}</p>
                            <Badge className={
                              contact.status === 'new' ? 'bg-amber-100 text-amber-700' :
                              contact.status === 'read' ? 'bg-blue-100 text-blue-700' :
                              'bg-green-100 text-green-700'
                            }>
                              {contact.status}
                            </Badge>
                            {contact.reason && (
                              <Badge variant="outline">{contact.reason}</Badge>
                            )}
                          </div>
                          <p className="text-sm text-slate-600 mb-1">{contact.email}</p>
                          <p className="font-medium text-slate-800">{contact.subject}</p>
                          <p className="text-sm text-slate-500 mt-1 line-clamp-2">{contact.message}</p>
                          <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(contact.created_at).toLocaleString()}
                          </p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => {
                              setSelectedContact(contact)
                              setContactDialogOpen(true)
                              if (contact.status === 'new') {
                                updateContactStatus(contact.id, 'read')
                              }
                            }}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Full
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateContactStatus(contact.id, 'resolved')}>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Mark Resolved
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => deleteContact(contact.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                  {filteredContacts.length === 0 && (
                    <div className="p-12 text-center">
                      <MessageSquare className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500">No messages found</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Newsletter Tab */}
        {activeTab === 'newsletter' && (
          <div className="space-y-6">
            {/* Actions */}
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search subscribers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button onClick={exportSubscribersCSV} className="bg-green-600 hover:bg-green-700 text-white">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>

            {/* Subscribers List */}
            <Card>
              <CardHeader>
                <CardTitle>Subscribers ({filteredSubscribers.length})</CardTitle>
                <CardDescription>Manage your newsletter subscribers</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {filteredSubscribers.map((subscriber) => (
                    <div key={subscriber.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Mail className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{subscriber.email}</p>
                          <p className="text-sm text-slate-500">
                            Subscribed: {new Date(subscriber.subscribed_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className="bg-green-100 text-green-700">{subscriber.status}</Badge>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => deleteSubscriber(subscriber.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {filteredSubscribers.length === 0 && (
                    <div className="p-12 text-center">
                      <Mail className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500">No subscribers found</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Contact Detail Dialog */}
      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Message from {selectedContact?.name}</DialogTitle>
            <DialogDescription>{selectedContact?.email}</DialogDescription>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <Badge className={
                  selectedContact.status === 'new' ? 'bg-amber-100 text-amber-700' :
                  selectedContact.status === 'read' ? 'bg-blue-100 text-blue-700' :
                  'bg-green-100 text-green-700'
                }>
                  {selectedContact.status}
                </Badge>
                {selectedContact.reason && (
                  <Badge variant="outline">{selectedContact.reason}</Badge>
                )}
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Subject</p>
                <p className="font-medium">{selectedContact.subject}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Message</p>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-500">
                  Received: {new Date(selectedContact.created_at).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={() => {
                    window.location.href = `mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Reply via Email
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    updateContactStatus(selectedContact.id, 'resolved')
                    setContactDialogOpen(false)
                  }}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark Resolved
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}