"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import { cn } from '../../lib/utils'
import toast from 'react-hot-toast'
import { upsertProfile } from '@/src/services/profiles.service'

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { data, error } = await supabase.auth.signUp({ email, password })
    setLoading(false)
    if (error) {
      setError(error.message)
      toast.error(error.message)
    } else {
      toast.success('Account created — check your email if confirmation required')
      try {
        const userId = data?.user?.id
        if (userId) {
          const emailPrefix = email.split('@')[0].replace(/[^a-z0-9_-]/gi, '').toLowerCase()
          const slug = `${emailPrefix}-${userId.slice(0, 6)}`
          await upsertProfile({ id: userId, slug, is_public: false })
        }
      } catch (err) {
        // Non-blocking: log and continue
        // eslint-disable-next-line no-console
        console.error('Failed to create profile after signup', err)
      }
      router.push('/dashboard')
    }
  }

  return (
    <div className={cn('min-h-screen flex items-center justify-center p-4')}>
      <div className={cn('max-w-md w-full p-6 rounded-xl shadow card')}>
        <h1 className={cn('text-xl font-semibold mb-4')}>Create an account</h1>
        {error && <div className={cn('mb-2')} style={{ color: 'var(--state-error)' }}>{error}</div>}
        <form onSubmit={handleSubmit} className={cn('space-y-4')}>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={cn('w-full p-3 border rounded-lg text-base')}
            style={{ borderColor: 'var(--border-default)' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={cn('w-full p-3 border rounded-lg text-base')}
            style={{ borderColor: 'var(--border-default)' }}
          />
          <button disabled={loading} className={cn('w-full py-3 px-4 btn-primary rounded-lg text-base')}>
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>
        <div className={cn('mt-4 text-sm')}>
          <a href="/login" className={cn('link-accent')}>Sign in</a>
        </div>
      </div>
    </div>
  )
}
