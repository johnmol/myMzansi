"use client"

import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui'
import { Button } from '@/components/ui'
import type { Profile } from '@/src/types/profile'
import type { Credential } from '@/src/types/credential'

type Props = {
  profile: Profile
  credentials: Credential[]
}

export default function PublicProfile({ profile, credentials }: Props) {
  async function downloadPublicCV() {
    try {
      if (!profile.slug) return alert('Profile has no public slug')
      const res = await fetch(`/api/cv/generate?slug=${encodeURIComponent(profile.slug)}`)
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
  }
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8 sm:px-6">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-full bg-muted sm:h-24 sm:w-24">
          {profile.avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profile.avatar_url} alt={profile.full_name ?? 'avatar'} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">No avatar</div>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{profile.full_name ?? 'Unnamed'}</h1>
          {profile.headline && <p className="text-sm text-muted-foreground">{profile.headline}</p>}
          {profile.location && <p className="text-sm text-muted-foreground">{profile.location}</p>}
        </div>
      </section>

      {profile.bio && (
        <section>
          <Card className="p-4 sm:p-6">
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardDescription>{profile.bio}</CardDescription>
          </Card>
        </section>
      )}

      <section>
        <h2 className="text-lg font-semibold mb-3">Credentials</h2>
        <div className="space-y-3">
          {credentials.length === 0 && (
            <Card className="p-4 sm:p-6">
              <CardDescription>No credentials added yet.</CardDescription>
            </Card>
          )}

          {credentials.map((c) => (
            <Card key={c.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{c.title}</h3>
                  <span className="rounded-md bg-[var(--badge-self)]/20 px-2 py-0.5 text-xs text-muted-foreground">Self-Reported</span>
                </div>
                <p className="text-sm text-muted-foreground">{c.institution_name}</p>
                <p className="text-sm text-muted-foreground">{c.issue_date}{c.expiry_date ? ` — ${c.expiry_date}` : ''}</p>
              </div>

              <div className="flex-shrink-0">
                {c.file_path ? (
                  <a href={c.file_path} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline">View Document</Button>
                  </a>
                ) : (
                  <Button variant="ghost" disabled>View Document</Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <div className="flex justify-end">
        <Button variant="outline" onClick={downloadPublicCV}>Download CV</Button>
      </div>
    </div>
  )
}
