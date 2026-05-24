"use client"

import type { User } from '@supabase/supabase-js'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import { cn } from '../../lib/utils'
import { Card, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
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
      <div className={cn('p-6 pb-28 md:pb-6')}>
        <div className={cn('max-w-3xl')}> 
          <h1 className={cn('text-2xl font-semibold')}>Dashboard</h1>
          {user && <p className={cn('mt-4 text-base')}>Welcome, {user.email}</p>}
          {error && <p className={cn('mt-4')} style={{ color: 'var(--state-error)' }}>{error}</p>}

          <div className={cn('mt-6 grid grid-cols-1 gap-4 md:grid-cols-2')}>
            <Link href="/dashboard/profile" className="block">
              <Card className="h-full p-4 transition-colors hover:border-[var(--accent-primary)]">
                <CardHeader className="p-0">
                  <CardTitle>Complete your profile</CardTitle>
                  <CardDescription>Add your name, headline, location, bio, and avatar so your public page feels credible.</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/dashboard/credentials" className="block">
              <Card className="h-full p-4 transition-colors hover:border-[var(--accent-primary)]">
                <CardHeader className="p-0">
                  <CardTitle>Add your first credential</CardTitle>
                  <CardDescription>Upload a qualification document to strengthen your shareable profile.</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/dashboard/profile" className="block md:col-span-2">
              <Card className="h-full p-4 transition-colors hover:border-[var(--accent-primary)]">
                <CardHeader className="p-0">
                  <CardTitle>Preview your share link</CardTitle>
                  <CardDescription>Toggle your profile public, copy the link, and review how it appears before sharing it.</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
