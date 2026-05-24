"use client"

import React, { useEffect, useState } from 'react'
import { Button, Input, Textarea, Card } from '@/components/ui'
import { supabase } from '@/lib/supabase'
import type { Profile } from '@/src/types/profile'
import { updateProfile } from '@/src/services/profiles.service'

type Props = {
  initial?: Profile | null
  onSaved?: (profile: Profile) => void
}

export default function ProfileForm({ initial, onSaved }: Props) {
  const [profile, setProfile] = useState<Partial<Profile>>(initial ?? {})
  const [loading, setLoading] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(initial?.avatar_url ?? null)

  useEffect(() => {
    setProfile(initial ?? {})
    setAvatarPreview(initial?.avatar_url ?? null)
  }, [initial])

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setLoading(true)
    try {
      const userId = profile.id
      if (!userId) throw new Error('Missing user id')
      const filePath = `avatars/${userId}/${Date.now()}_${file.name}`
      const { data, error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file, { upsert: true })
      if (uploadError) throw uploadError
      const { data: publicData } = supabase.storage.from('avatars').getPublicUrl(data.path)
      setProfile((p) => ({ ...p, avatar_url: publicData.publicUrl }))
      setAvatarPreview(publicData.publicUrl)
    } catch (err) {
      console.error('Avatar upload failed', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault()
    if (!profile.id) return
    setLoading(true)
    try {
      const updated = await updateProfile(profile as Partial<Profile> & { id: string })
      if (onSaved && updated) onSaved(updated as Profile)
    } catch (err) {
      console.error('Save failed', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-muted overflow-hidden">
            {avatarPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">No avatar</div>
            )}
          </div>
          <div>
            <label className="text-sm block mb-1">Avatar</label>
            <input type="file" accept="image/*" onChange={handleAvatarChange} />
          </div>
        </div>

        <div>
          <label className="text-sm block mb-1">Full name</label>
          <Input value={profile.full_name ?? ''} onChange={(e) => setProfile(p => ({ ...p, full_name: e.target.value }))} />
        </div>

        <div>
          <label className="text-sm block mb-1">Headline</label>
          <Input value={profile.headline ?? ''} onChange={(e) => setProfile(p => ({ ...p, headline: e.target.value }))} />
        </div>

        <div>
          <label className="text-sm block mb-1">Location</label>
          <Input value={profile.location ?? ''} onChange={(e) => setProfile(p => ({ ...p, location: e.target.value }))} />
        </div>

        <div>
          <label className="text-sm block mb-1">Phone</label>
          <Input value={profile.phone ?? ''} onChange={(e) => setProfile(p => ({ ...p, phone: e.target.value }))} />
        </div>

        <div>
          <label className="text-sm block mb-1">Bio</label>
          <Textarea value={profile.bio ?? ''} onChange={(e) => setProfile(p => ({ ...p, bio: e.target.value }))} />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
        </div>
      </form>
    </Card>
  )
}
