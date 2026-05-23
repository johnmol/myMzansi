"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import { cn } from '../../lib/utils'
import toast from 'react-hot-toast'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    const initializeRecoverySession = async () => {
      await supabase.auth.initialize()
      const { data } = await supabase.auth.getSession()

      if (active && data.session) {
        setReady(true)
      }
    }

    initializeRecoverySession().catch((err: unknown) => {
      const message = err instanceof Error ? err.message : String(err)
      if (active) {
        setError(message)
        toast.error(message)
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!active) {
        return
      }

      if (event === 'PASSWORD_RECOVERY' || session) {
        setReady(true)
      }
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    if (password !== confirmPassword) {
      const mismatchMessage = 'Passwords do not match'
      setLoading(false)
      setError(mismatchMessage)
      toast.error(mismatchMessage)
      return
    }

    try {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) {
        setError(error.message)
        toast.error(error.message)
        return
      }

      await supabase.auth.signOut({ scope: 'local' })
      setMessage('Password updated. Redirecting to sign in.')
      toast.success('Password updated')
      router.replace('/login')
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn('min-h-screen flex items-center justify-center p-4')}>
      <div className={cn('max-w-md w-full p-6 rounded-xl shadow card')}>
        <h1 className={cn('text-xl font-semibold mb-4')}>Set a new password</h1>
        <p className={cn('mb-4 text-sm')} style={{ color: 'var(--text-secondary)' }}>
          Use the link from your email to open this page, then choose a new password.
        </p>
        {message && <div className={cn('mb-2')} style={{ color: 'var(--state-success)' }}>{message}</div>}
        {error && <div className={cn('mb-2')} style={{ color: 'var(--state-error)' }}>{error}</div>}
        {!ready ? (
          <div className={cn('text-sm')} style={{ color: 'var(--text-secondary)' }}>
            Waiting for the recovery session to load...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={cn('space-y-4')}>
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={cn('w-full p-3 border rounded-lg text-base')}
              style={{ borderColor: 'var(--border-default)' }}
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={cn('w-full p-3 border rounded-lg text-base')}
              style={{ borderColor: 'var(--border-default)' }}
            />
            <button disabled={loading} className={cn('w-full py-3 px-4 btn-primary rounded-lg text-base')}>
              {loading ? 'Updating...' : 'Update password'}
            </button>
          </form>
        )}
        <div className={cn('mt-4 text-sm')}>
          <a href="/login" className={cn('link-accent')}>Back to sign in</a>
        </div>
      </div>
    </div>
  )
}