"use client"

import { useRouter } from 'next/navigation'
import { supabase } from '../../../lib/supabase'
import { Button } from '../../../components/ui'
import React from 'react'
import toast from 'react-hot-toast'

export default function SignOutButton() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  async function handleSignOut() {
    try {
      setLoading(true)
      setError(null)
      const { error } = await supabase.auth.signOut()

      if (error) {
        setError(error.message)
        toast.error(error.message)
        return
      }

      router.push('/')
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Button onClick={handleSignOut} variant="ghost" disabled={loading} aria-label="Sign out">
        {loading ? 'Signing out...' : 'Sign out'}
      </Button>
      {error && (
        <p className="mt-2 text-xs" style={{ color: 'var(--state-error)' }}>
          {error}
        </p>
      )}
    </div>
  )
}
