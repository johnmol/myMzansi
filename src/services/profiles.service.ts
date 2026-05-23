import { supabase } from '@/lib/supabase'
import type { Profile, NewProfile } from '@/src/types/profile'

export async function upsertProfile(profile: Partial<NewProfile> & { id: string }) {
  const payload: Partial<NewProfile> = {
    id: profile.id,
    full_name: profile.full_name ?? null,
    headline: profile.headline ?? null,
    bio: profile.bio ?? null,
    avatar_url: profile.avatar_url ?? null,
    phone: profile.phone ?? null,
    location: profile.location ?? null,
    is_public: profile.is_public ?? false,
    slug: profile.slug ?? null,
  }

  const { data, error } = await supabase.from('profiles').upsert(payload, { returning: 'representation' })
  if (error) throw error
  return (data as Profile[] | null)?.[0] ?? null
}

export async function getProfileBySlug(slug: string) {
  const { data, error } = await supabase.from('profiles').select('*').eq('slug', slug).maybeSingle()
  if (error) throw error
  return data as Profile | null
}
