import { supabase } from '@/lib/supabase'
import type { Profile, NewProfile } from '@/src/types/profile'

export async function upsertProfile(profile: Partial<NewProfile> & { id: string }) {
  const payload: Partial<NewProfile> = { id: profile.id }

  if (profile.full_name !== undefined) payload.full_name = profile.full_name
  if (profile.headline !== undefined) payload.headline = profile.headline
  if (profile.bio !== undefined) payload.bio = profile.bio
  if (profile.avatar_url !== undefined) payload.avatar_url = profile.avatar_url
  if (profile.phone !== undefined) payload.phone = profile.phone
  if (profile.location !== undefined) payload.location = profile.location
  if (profile.slug !== undefined) payload.slug = profile.slug
  if (profile.is_public !== undefined) payload.is_public = profile.is_public

  const { data, error } = await supabase.from('profiles').upsert(payload).select('*').single()
  if (error) throw error
  return data as Profile | null
}

export async function getProfileBySlug(slug: string) {
  const { data, error } = await supabase.from('profiles').select('*').eq('slug', slug).maybeSingle()
  if (error) throw error
  return data as Profile | null
}

export async function getPublicProfileBySlug(slug: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('slug', slug)
    .eq('is_public', true)
    .maybeSingle()

  if (error) throw error
  return data as Profile | null
}

export async function getProfile(userId: string) {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle()
  if (error) throw error
  return data as Profile | null
}

export async function updateProfile(profile: Partial<NewProfile> & { id: string }) {
  // If no slug provided, attempt to generate one from full_name or id
  if (!profile.slug) {
    const namePart = (profile.full_name ?? '').toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    profile.slug = `${namePart || 'user'}-${profile.id.slice(0, 8)}`
  }
  // delegate to upsertProfile to keep behavior consistent
  return await upsertProfile(profile)
}

export async function toggleProfileVisibility(userId: string, isPublic: boolean) {
  const { data, error } = await supabase
    .from('profiles')
    .update({ is_public: isPublic })
    .eq('id', userId)
    .select('*')
    .single()

  if (error) throw error
  return data as Profile | null
}
