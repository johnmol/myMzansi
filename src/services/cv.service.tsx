import { pdf } from '@react-pdf/renderer'
import { createServerSupabase } from '@/lib/supabase'
import { CVDocument } from '@/src/components/cv/CVDocument'

export async function generateCVForUserId(userId: string, accessToken?: string) {
  const supabase = createServerSupabase(accessToken)
  try {
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle()

    if (profileError) {
      console.error('[cv/service] failed to load authenticated profile', { userId, profileError })
      throw new Error('Failed to load profile for CV generation')
    }

    if (!profile) throw new Error('Profile not found')

    const { data: credentials, error: credentialsError } = await supabase
      .from('credentials')
      .select('*')
      .eq('user_id', userId)

    if (credentialsError) {
      console.error('[cv/service] credential query failed, continuing with empty list', {
        userId,
        credentialsError,
      })
    }

    const credentialList = Array.isArray(credentials) ? credentials : []

    console.info('[cv/service] rendering authenticated CV', {
      userId,
      credentialCount: credentialList.length,
    })

    const doc = <CVDocument profile={profile} credentials={credentialList} />

    try {
      return await pdf(doc).toBuffer()
    } catch (renderError) {
      console.error('[cv/service] pdf render failed for authenticated CV', { userId, renderError })
      throw new Error('Failed to render CV PDF')
    }
  } catch (error) {
    console.error('[cv/service] authenticated CV generation failed', { userId, error })
    throw error instanceof Error ? error : new Error('Failed to generate CV')
  }
}

export async function generateCVForPublicSlug(slug: string) {
  const supabase = createServerSupabase()

  try {
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('slug', slug)
      .eq('is_public', true)
      .maybeSingle()

    if (profileError) {
      console.error('[cv/service] failed to load public profile', { slug, profileError })
      throw new Error('Failed to load public profile for CV generation')
    }

    if (!profile) throw new Error('Public profile not found')

    const { data: credentials, error: credentialsError } = await supabase
      .from('credentials')
      .select('*')
      .eq('user_id', profile.id)

    if (credentialsError) {
      console.error('[cv/service] public credential query failed, continuing with empty list', {
        slug,
        profileId: profile.id,
        credentialsError,
      })
    }

    const credentialList = Array.isArray(credentials) ? credentials : []

    console.info('[cv/service] rendering public CV', {
      slug,
      profileId: profile.id,
      credentialCount: credentialList.length,
    })

    const doc = <CVDocument profile={profile} credentials={credentialList} />

    try {
      return await pdf(doc).toBuffer()
    } catch (renderError) {
      console.error('[cv/service] pdf render failed for public CV', { slug, renderError })
      throw new Error('Failed to render CV PDF')
    }
  } catch (error) {
    console.error('[cv/service] public CV generation failed', { slug, error })
    throw error instanceof Error ? error : new Error('Failed to generate CV')
  }
}

export default generateCVForUserId
