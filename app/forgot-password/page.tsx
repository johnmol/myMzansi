"use client"
import React, { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { cn } from '../../lib/utils'
import toast from 'react-hot-toast'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)
    try {
      // Send password reset email
      const redirectTo = `${window.location.origin}/reset-password`
      const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo })
      setLoading(false)
      if (error) {
        setError(error.message)
        toast.error(error.message)
      } else {
        setMessage('Password reset email sent. Check your inbox.')
        toast.success('Password reset email sent')
      }
    } catch (err: unknown) {
      setLoading(false)
      const message = err instanceof Error ? err.message : String(err)
      setError(message)
      toast.error(message)
    }
  }

  return (
    <div className={cn('min-h-screen flex items-center justify-center p-4')}>
      <div className={cn('max-w-md w-full p-6 rounded-xl shadow card')}>
        <h1 className={cn('text-xl font-semibold mb-4')}>Reset password</h1>
        {message && <div className={cn('mb-2')} style={{ color: 'var(--state-success)' }}>{message}</div>}
        {error && <div className={cn('mb-2')} style={{ color: 'var(--state-error)' }}>{error}</div>}
        <form onSubmit={handleSubmit} className={cn('space-y-4')}>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={cn('w-full p-3 border rounded-lg text-base')}
            style={{ borderColor: 'var(--border-default)' }}
          />
          <button disabled={loading} className={cn('w-full py-3 px-4 btn-primary rounded-lg text-base')}>
            {loading ? 'Sending...' : 'Send reset email'}
          </button>
        </form>
        <div className={cn('mt-4 text-sm')}>
          <a href="/login" className={cn('link-accent')}>Back to sign in</a>
        </div>
      </div>
    </div>
  )
}
