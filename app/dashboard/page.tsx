"use client"

import type { User } from '@supabase/supabase-js'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import { cn } from '../../lib/utils'
import DashboardLayout from '../../src/components/dashboard/DashboardLayout'

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    async function init() {
      const { data } = await supabase.auth.getSession()
      const session = data.session
      if (!session) {
        router.replace('/login')
        return
      }
      const user = session.user
      setUser(user)

      // Ensure profile exists
      const { error } = await supabase.from('profiles').upsert({ id: user.id })
      if (error) {
        setError(error.message || String(error))
      }

      if (mounted) setLoading(false)
    }
    init()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') return
      if (!session) router.replace('/login')
    })

    return () => {
      subscription.unsubscribe()
      mounted = false
    }
  }, [router])

  if (loading) return <div className={cn('p-6')}>Loading...</div>

  return (
    <DashboardLayout>
      <div className={cn('p-6')}>
        <div className={cn('max-w-3xl')}> 
          <h1 className={cn('text-2xl font-semibold')}>Dashboard</h1>
          {user && <p className={cn('mt-4 text-base')}>Welcome, {user.email}</p>}
          {error && <p className={cn('mt-4')} style={{ color: 'var(--state-error)' }}>{error}</p>}

          <div className={cn('mt-6 grid grid-cols-1 md:grid-cols-2 gap-4')}>
            <div className={cn('p-4')}>
              <div className={cn('rounded-lg border p-4')}>
                <h3 className={cn('font-semibold')}>Complete your profile</h3>
                <p className={cn('mt-2 text-sm')}>Add a display name, bio, and social links to complete your public profile.</p>
              </div>
            </div>

            <div className={cn('p-4')}>
              <div className={cn('rounded-lg border p-4')}>
                <h3 className={cn('font-semibold')}>Add your first credential</h3>
                <p className={cn('mt-2 text-sm')}>Add a certification or certificate to show your qualifications.</p>
              </div>
            </div>

            <div className={cn('p-4')}>
              <div className={cn('rounded-lg border p-4')}>
                <h3 className={cn('font-semibold')}>Preview public profile</h3>
                <p className={cn('mt-2 text-sm')}>See how your public profile looks to visitors.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
