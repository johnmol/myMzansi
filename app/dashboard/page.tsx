"use client"

import type { User } from '@supabase/supabase-js'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import { cn } from '../../lib/utils'
import { Card, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import DashboardLayout from '../../src/components/dashboard/DashboardLayout'
import { User as UserIcon, Award, Link as LinkIcon } from 'lucide-react'

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
          <div className="bg-[var(--bg-surface-raised)] p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <h1 className={cn('text-2xl font-semibold')}>{user ? `Welcome back, ${user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0]}` : 'Dashboard'}</h1>
              {user && (
                <div className="ml-4">
                  {user.user_metadata?.avatar_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={user.user_metadata.avatar_url} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[var(--accent-light)] flex items-center justify-center text-sm font-medium text-[var(--accent-primary)]">
                      {(() => {
                        const name = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0]
                        return name.split(' ').map((n: string) => n[0] || '').slice(0,2).join('').toUpperCase()
                      })()}
                    </div>
                  )}
                </div>
              )}
            </div>
            {error && <p className={cn('mt-2 text-sm')} style={{ color: 'var(--state-error)' }}>{error}</p>}
          </div>

          <div className={cn('mt-6 grid grid-cols-1 gap-6 md:grid-cols-2')}>
            <Link href="/dashboard/profile" className="block">
              <Card className="h-full p-6 transition-colors hover:border-[var(--accent-primary)] shadow-sm rounded-xl bg-[var(--bg-surface)] border-[var(--border-default)] border-l-4 border-[var(--accent-primary)]">
                <div className="flex justify-center">
                  <UserIcon className="w-8 h-8 text-[var(--accent-primary)]" />
                </div>
                <CardHeader className="p-0 text-center mt-3">
                  <CardTitle className="text-2xl font-semibold">Complete your profile</CardTitle>
                  <CardDescription className="mt-2 text-sm text-[var(--text-secondary)]">Add your name, headline, location, bio, and avatar so your public page feels credible.</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/dashboard/credentials" className="block">
              <Card className="h-full p-6 transition-colors hover:border-[var(--accent-primary)] shadow-sm rounded-xl bg-[var(--bg-surface)] border-[var(--border-default)] border-l-4 border-[var(--accent-primary)]">
                <div className="flex justify-center">
                  <Award className="w-8 h-8 text-[var(--accent-primary)]" />
                </div>
                <CardHeader className="p-0 text-center mt-3">
                  <CardTitle className="text-2xl font-semibold">Add your first credential</CardTitle>
                  <CardDescription className="mt-2 text-sm text-[var(--text-secondary)]">Upload a qualification document to strengthen your shareable profile.</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/dashboard/profile" className="block md:col-span-2">
              <Card className="h-full p-6 transition-colors hover:border-[var(--accent-primary)] shadow-sm rounded-xl bg-[var(--bg-surface)] border-[var(--border-default)] border-l-4 border-[var(--accent-primary)]">
                <div className="flex justify-center">
                  <LinkIcon className="w-8 h-8 text-[var(--accent-primary)]" />
                </div>
                <CardHeader className="p-0 text-center mt-3">
                  <CardTitle className="text-2xl font-semibold">Preview your share link</CardTitle>
                  <CardDescription className="mt-2 text-sm text-[var(--text-secondary)]">Toggle your profile public, copy the link, and review how it appears before sharing it.</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
