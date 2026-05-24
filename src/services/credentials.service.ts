import { supabase } from '@/lib/supabase'
import type { Credential, NewCredential } from '@/src/types/credential'

export async function createCredential(credential: NewCredential): Promise<Credential> {
  const payload = { ...credential, is_verified: false }
  const { data, error } = await supabase.from('credentials').insert(payload).select('*').single()
  if (error) throw error
  return data as Credential
}

export async function getCredentialsByUser(user_id: string): Promise<Credential[]> {
  const { data, error } = await supabase.from('credentials').select('*').eq('user_id', user_id)
  if (error) throw error
  return data as Credential[]
}

export async function updateCredential(id: string, updates: Partial<NewCredential>): Promise<Credential> {
  const { data, error } = await supabase.from('credentials').update(updates).eq('id', id).select('*').single()
  if (error) throw error
  return data as Credential
}

export async function deleteCredential(id: string): Promise<void> {
  const { error } = await supabase.from('credentials').delete().eq('id', id)
  if (error) throw error
}

// Uploads a file to the `certificates` bucket and returns the public URL
export async function uploadCertificate(file: File, pathPrefix = ''): Promise<string> {
  const filePath = `${pathPrefix}${Date.now()}_${file.name}`
  const { data, error: uploadError } = await supabase.storage
    .from('certificates')
    .upload(filePath, file)

  if (uploadError) throw uploadError

  const urlRes = supabase.storage.from('certificates').getPublicUrl((data as any).path)
  return (urlRes as any).data.publicUrl
}
