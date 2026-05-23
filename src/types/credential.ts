export interface Credential {
  id: string
  user_id: string
  title: string
  institution_name: string
  nqf_level?: number | null
  issue_date: string
  expiry_date?: string | null
  file_path?: string | null
  is_verified: boolean
  created_at?: string | null
}

export type NewCredential = Omit<Credential, 'id' | 'created_at' | 'is_verified'>
