'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'
import type { Resume } from '@/types'

export function useResumes() {
  const supabase = createClient()
  const queryClient = useQueryClient()

  // Fetch all resumes
  const {
    data: resumes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['resumes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .order('updated_at', { ascending: false })

      if (error) throw error
      return data as Resume[]
    },
  })

  // Create resume
  const createResume = useMutation({
    mutationFn: async (newResume: Partial<Resume>) => {
      const { data, error } = await supabase
        .from('resumes')
        .insert(newResume)
        .select()
        .single()

      if (error) throw error
      return data as Resume
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] })
    },
  })

  // Update resume
  const updateResume = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Resume> }) => {
      const { data, error } = await supabase
        .from('resumes')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data as Resume
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] })
    },
  })

  // Delete resume
  const deleteResume = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('resumes')
        .delete()
        .eq('id', id)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] })
    },
  })

  return {
    resumes,
    isLoading,
    error,
    createResume,
    updateResume,
    deleteResume,
  }
}