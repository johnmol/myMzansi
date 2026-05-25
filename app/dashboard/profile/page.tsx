"use client"

import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import ProfileForm from '@/src/components/profile/ProfileForm'
import { getProfile, toggleProfileVisibility, updateProfile, upsertProfile } from '@/src/services/profiles.service'
import { Card } from '@/components/ui'
import { Button } from '@/components/ui'
import DashboardLayout from '@/src/components/dashboard/DashboardLayout'
import type { Profile } from '@/src/types/profile'

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [toggling, setToggling] = useState(false)
  const [copied, setCopied] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      try {
        const { data: userData } = await supabase.auth.getUser()
        const user = userData?.user
        if (!user) return
        const existing = await getProfile(user.id)
        if (existing) {
          if (mounted) setProfile(existing)
          return
        }

        const created = await upsertProfile({ id: user.id, is_public: false })
        if (mounted) {
          if (created) {
            setProfile(created)
          } else {
            console.error('Failed to create profile after dashboard bootstrap', { userId: user.id })
            setLoadError('Failed to create your profile. Refresh and try again.')
          }
        }
      } catch (err) {
        console.error(err)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()
    return () => { mounted = false }
  }, [])

  async function ensureSlug() {
    if (!profile) return
    if (profile.slug) return profile.slug
    try {
      const base = (profile.full_name || 'user').toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      const slug = `${base || 'user'}-${profile.id?.slice(0, 8)}`
      const updated = await updateProfile({ id: profile.id, slug })
      setProfile(updated)
      return updated?.slug ?? slug
    } catch (e) {
      console.error('Failed to generate slug', e)
      return null
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6 pb-28 md:pb-6">
          <Card className="p-4">Loading profile...</Card>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-4 p-6 pb-28 md:pb-6">
        {loadError ? (
          <Card className="border-[var(--state-error)] bg-[var(--state-error)]/10 p-4 text-sm text-[var(--state-error)]">
            {loadError}
          </Card>
        ) : null}

        <div className="max-w-3xl space-y-2">
          <h1 className="text-2xl font-semibold">Profile</h1>
          <p className="text-sm text-muted-foreground">Keep your public profile current, then toggle visibility and share it when you are ready.</p>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:flex-wrap">
          <Button onClick={async () => {
            try {
              if (!profile) return
              const { data: sessionData } = await supabase.auth.getSession()
              const token = sessionData.session?.access_token
              if (!token) return alert('Not signed in')
              const res = await fetch(`/api/cv/generate?userId=${encodeURIComponent(profile.id)}`, {
                headers: { Authorization: `Bearer ${token}` },
              })
              if (!res.ok) {
                const err = await res.json().catch(() => ({ error: { message: 'Failed to generate CV' } }))
                return alert(err?.error?.message ?? 'Failed to generate CV')
              }
              const blob = await res.blob()
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = `${profile.full_name ?? 'cv'}.pdf`
              document.body.appendChild(a)
              a.click()
              a.remove()
              URL.revokeObjectURL(url)
            } catch (e) {
              console.error(e)
              alert('Error generating CV')
            }
          }} disabled={!profile}>Download CV</Button>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap">
            <div className="text-sm text-muted-foreground">Visibility:</div>
            <div className="text-sm font-medium">{profile?.is_public ? 'Public' : 'Private'}</div>
            <Button disabled={toggling || !profile} onClick={async () => {
              if (!profile) return
              setToggling(true)
              try {
                const updated = await toggleProfileVisibility(profile.id, !profile.is_public)
                setProfile(updated)
              } catch (e) {
                console.error(e)
                alert('Failed to update visibility')
              } finally {
                setToggling(false)
              }
            }}>{profile?.is_public ? 'Make Private' : 'Make Public'}</Button>
            <Button disabled={!profile} onClick={async () => {
              try {
                if (!profile) return
                const slug = await ensureSlug()
                if (!slug) return alert('Failed to prepare share link')
                const url = `${window.location.origin}/profile/${slug}`
                await navigator.clipboard.writeText(url)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
              } catch (e) {
                console.error(e)
                alert('Failed to copy link')
              }
            }}>{copied ? 'Copied!' : 'Copy Share Link'}</Button>
          </div>
        </div>

        <ProfileForm initial={profile} onSaved={(p) => { setProfile(p); }} />
      </div>
    </DashboardLayout>
  )
}
