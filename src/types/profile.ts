export interface Profile {
  id: string
  full_name?: string | null
  headline?: string | null
  bio?: string | null
  avatar_url?: string | null
  phone?: string | null
  location?: string | null
  is_public: boolean
  slug?: string | null
  created_at?: string | null
}

export type NewProfile = Omit<Profile, 'created_at'>
