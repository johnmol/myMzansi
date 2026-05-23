import { supabase } from '@/lib/supabase'
import type { Credential, NewCredential } from '@/src/types/credential'

export async function createCredential(credential: NewCredential) {
  const payload = { ...credential, is_verified: false }
  const { data, error } = await supabase.from('credentials').insert(payload).select('*')
  if (error) throw error
  return (data as Credential[])[0]
}

export async function getCredentialsByUserId(user_id: string) {
  const { data, error } = await supabase.from('credentials').select('*').eq('user_id', user_id)
  if (error) throw error
  return data as Credential[]
}
