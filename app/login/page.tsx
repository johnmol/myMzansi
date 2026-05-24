"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import { cn } from '../../lib/utils'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace('/dashboard')
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) router.replace('/dashboard')
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      setError(error.message)
      toast.error(error.message)
    } else {
      toast.success('Signed in')
      router.push('/dashboard')
    }
  }

  return (
    <div className={cn('min-h-screen flex items-center justify-center p-4')}>
      <div className={cn('max-w-md w-full p-6 rounded-xl shadow card')}>
        <h1 className={cn('text-xl font-semibold mb-4')}>Sign In</h1>
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
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <div className={cn('mt-4 text-sm')}>
          <Link href="/signup" className={cn('link-accent')}>Create account</Link> · <Link href="/forgot-password" className={cn('link-accent')}>Forgot password?</Link>
        </div>
      </div>
    </div>
  )
}
