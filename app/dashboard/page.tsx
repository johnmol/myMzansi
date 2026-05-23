"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import { cn } from '../../lib/utils'

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any | null>(null)
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
      try {
        await supabase.from('profiles').upsert({ id: user.id, email: user.email, created_at: new Date().toISOString() })
      } catch (err: any) {
        // ignore if table doesn't exist, but keep error for visibility
        setError(err?.message || String(err))
      }

      if (mounted) setLoading(false)
    }
    init()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.replace('/login')
    })

    return () => {
      subscription.unsubscribe()
      mounted = false
    }
  }, [router])

  if (loading) return <div className={cn('p-6')}>Loading...</div>

  return (
    <div className={cn('p-6')}>
      <div className={cn('max-w-3xl')}> 
        <h1 className={cn('text-2xl font-semibold')}>Dashboard</h1>
        {user && <p className={cn('mt-4 text-base')}>Welcome, {user.email}</p>}
        {error && <p className={cn('mt-4')} style={{ color: 'var(--state-error)' }}>{error}</p>}
        <div className={cn('mt-6')}>
          <button
            className={cn('px-4 py-2 rounded-lg')}
            style={{ backgroundColor: 'var(--bg-surface-raised)', border: '1px solid var(--border-default)' }}
            onClick={async () => {
              await supabase.auth.signOut()
              router.push('/')
            }}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  )
}
