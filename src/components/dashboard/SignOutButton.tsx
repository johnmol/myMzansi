"use client"

import { useRouter } from 'next/navigation'
import { supabase } from '../../../lib/supabase'
import { Button } from '../../../components/ui'
import React from 'react'

export default function SignOutButton() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)

  async function handleSignOut() {
    try {
      setLoading(true)
      await supabase.auth.signOut()
      router.push('/')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={handleSignOut} variant="ghost" disabled={loading} aria-label="Sign out">
      {loading ? 'Signing out...' : 'Sign out'}
    </Button>
  )
}
