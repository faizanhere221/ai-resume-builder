'use client'

import { useState } from 'react'
import { useResumeStore } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { generateId } from '@/lib/utils'
import {
  Gamepad2,
  ChevronDown,
  ChevronUp,
  Plus,
  X,
} from 'lucide-react'

interface HobbiesSectionProps {
  isOpen: boolean
  onToggle: () => void
}

const suggestedHobbies = [
  'Reading', 'Writing', 'Photography', 'Traveling', 'Cooking', 'Gaming',
  'Hiking', 'Swimming', 'Cycling', 'Yoga', 'Meditation', 'Music',
  'Painting', 'Drawing', 'Dancing', 'Gardening', 'Chess', 'Volunteering',
  'Blogging', 'Podcasting', 'Coding', 'DIY Projects', 'Sports', 'Fitness',
]

export function HobbiesSection({ isOpen, onToggle }: HobbiesSectionProps) {
  const { currentResume, addHobby, removeHobby } = useResumeStore()
  const hobbies = currentResume.hobbies || []
  const [inputValue, setInputValue] = useState('')

  const handleAddHobby = (hobbyName?: string) => {
    const name = hobbyName || inputValue.trim()
    if (!name) return
    
    // Check if hobby already exists
    if (hobbies.some(h => h.name.toLowerCase() === name.toLowerCase())) {
      return
    }
    
    addHobby({
      id: generateId(),
      name,
    })
    setInputValue('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddHobby()
    }
  }

  // Filter out already added hobbies from suggestions
  const availableSuggestions = suggestedHobbies.filter(
    suggestion => !hobbies.some(h => h.name.toLowerCase() === suggestion.toLowerCase())
  )

  return (
    <Card>
      <CardHeader className="cursor-pointer" onClick={onToggle}>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Gamepad2 className="h-5 w-5 text-pink-600" />
            Hobbies & Interests
            <span className="text-sm font-normal text-slate-500">({hobbies.length})</span>
          </CardTitle>
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </CardHeader>
      
      {isOpen && (
        <CardContent className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
            <strong>Tip:</strong> Include hobbies that showcase relevant skills or make you memorable. Quality over quantity!
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a hobby and press Enter"
              className="flex-1"
            />
            <Button onClick={() => handleAddHobby()} disabled={!inputValue.trim()}>
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>

          {/* Added Hobbies */}
          {hobbies.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-700">Your Hobbies:</p>
              <div className="flex flex-wrap gap-2">
                {hobbies.map((hobby) => (
                  <Badge 
                    key={hobby.id} 
                    variant="secondary" 
                    className="gap-1 py-1.5 px-3 text-sm bg-pink-50 text-pink-700 hover:bg-pink-100"
                  >
                    {hobby.name}
                    <button
                      type="button"
                      onClick={() => removeHobby(hobby.id)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Suggestions */}
          {availableSuggestions.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-500">Suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {availableSuggestions.slice(0, 12).map((suggestion) => (
                  <Badge 
                    key={suggestion} 
                    variant="outline" 
                    className="cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => handleAddHobby(suggestion)}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    {suggestion}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {hobbies.length === 0 && (
            <div className="text-center py-4 text-slate-500 text-sm">
              Add hobbies that reflect your personality and interests
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}