import { createClient } from '@supabase/supabase-js'

function getRequiredEnv(value: string | undefined, variableName: string): string {
  if (!value?.trim()) {
    throw new Error(`Missing required environment variable: ${variableName}`)
  }

  return value
}

const supabaseUrl = getRequiredEnv(process.env.NEXT_PUBLIC_SUPABASE_URL, 'NEXT_PUBLIC_SUPABASE_URL')
const supabaseAnonKey = getRequiredEnv(
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  'NEXT_PUBLIC_SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY'
)

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export function createServerSupabase() {
  return createClient(supabaseUrl, supabaseAnonKey)
}

export default supabase
