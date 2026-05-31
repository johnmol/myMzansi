import React from 'react'
import { notFound } from 'next/navigation'
import PublicProfile from '@/src/components/profile/PublicProfile'
import { getPublicProfileBySlug } from '@/src/services/profiles.service'
import { getCredentialsByUser } from '@/src/services/credentials.service'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const profile = await getPublicProfileBySlug(slug)
  if (!profile) return notFound()

  const credentials = await getCredentialsByUser(profile.id)

  return <PublicProfile profile={profile} credentials={credentials} />
}
