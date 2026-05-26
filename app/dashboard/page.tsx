"use client"

import type { User } from '@supabase/supabase-js'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import { cn } from '../../lib/utils'
import DashboardLayout from '../../src/components/dashboard/DashboardLayout'
import { User as UserIcon, Award, Link as LinkIcon, ArrowRight, Sparkles } from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)
  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0] || ''

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

  if (loading) return (
    <DashboardLayout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[var(--accent-light)]" />
          <div className="text-[var(--text-muted)]">Loading...</div>
        </div>
      </div>
    </DashboardLayout>
  )

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Hero */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-hover)] rounded-2xl p-8 text-white">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
          <div className="relative flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 opacity-90" />
                <span className="text-sm font-medium opacity-90">Welcome back</span>
              </div>
              <h1 className="text-3xl font-semibold mb-1">
                {user ? `Hello, ${displayName || 'there'}` : 'Dashboard'}
              </h1>
              <p className="text-white/80 text-base mt-2">
                Build your professional identity with verified credentials
              </p>
            </div>
            {user && (
              <div className="flex-shrink-0">
                {user.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt={displayName ? `Profile photo of ${displayName}` : ''}
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-white/20"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ring-4 ring-white/10">
                    <span className="text-xl font-semibold text-white">
                      {(() => {
                        const name = (displayName || '').trim()
                        const segments = name.split(/\s+/).filter(Boolean)
                        const initials = segments
                          .map((segment: string) => segment.trim()[0] || '')
                          .filter(Boolean)
                          .slice(0, 2)
                          .join('')
                          .toUpperCase()

                        if (initials) return initials

                        const emailLocalPart = user.email?.split('@')[0]?.trim() || ''
                        return emailLocalPart ? emailLocalPart[0].toUpperCase() : '?'
                      })()}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
          {error && (
            <p className="mt-4 text-sm bg-white/10 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
        </div>

        {/* Quick Actions Grid */}
        <div>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            Get Started
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Profile Card */}
            <Link href="/dashboard/profile" className="group block">
              <div className="relative h-full bg-[var(--bg-surface)] rounded-xl border border-[var(--border-default)] p-6 transition-all duration-200 hover:border-[var(--accent-primary)] hover:shadow-lg hover:shadow-[var(--accent-primary)]/5 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--accent-primary)] rounded-t-xl" />
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[var(--accent-light)] flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <UserIcon className="w-6 h-6 text-[var(--accent-primary)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent-primary)] transition-colors">
                      Complete your profile
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      Add your name, headline, location, and bio to make your public profile credible.
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-[var(--accent-primary)] opacity-0 group-hover:opacity-100 transition-opacity">
                  Get started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Credentials Card */}
            <Link href="/dashboard/credentials" className="group block">
              <div className="relative h-full bg-[var(--bg-surface)] rounded-xl border border-[var(--border-default)] p-6 transition-all duration-200 hover:border-[var(--accent-primary)] hover:shadow-lg hover:shadow-[var(--accent-primary)]/5 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--accent-primary)] rounded-t-xl" />
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[var(--accent-light)] flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <Award className="w-6 h-6 text-[var(--accent-primary)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent-primary)] transition-colors">
                      Add your first credential
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      Upload qualification documents to strengthen your professional identity.
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-[var(--accent-primary)] opacity-0 group-hover:opacity-100 transition-opacity">
                  Get started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Share Link Card - Full Width */}
            <Link href="/dashboard/profile" className="group block md:col-span-2">
              <div className="relative bg-[var(--bg-surface)] rounded-xl border border-[var(--border-default)] p-6 transition-all duration-200 hover:border-[var(--accent-primary)] hover:shadow-lg hover:shadow-[var(--accent-primary)]/5 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--accent-primary)] rounded-t-xl" />
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[var(--accent-light)] flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <LinkIcon className="w-6 h-6 text-[var(--accent-primary)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent-primary)] transition-colors">
                      Preview your share link
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      Toggle your profile public, copy the shareable link, and review how it appears before sharing with employers.
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-[var(--accent-primary)] opacity-0 group-hover:opacity-100 transition-opacity">
                  Get started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
