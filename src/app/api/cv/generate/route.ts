import { NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase'
import { getPublicProfileBySlug, getProfile } from '@/src/services/profiles.service'
import { getCredentialsByUser } from '@/src/services/credentials.service'
import { generateCVForPublicSlug, generateCVForUserId } from '@/src/services/cv.service'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const slug = url.searchParams.get('slug')
    const userId = url.searchParams.get('userId')

    if (slug) {
      // public profile CV generation
      const buffer = await generateCVForPublicSlug(slug)
      return new Response(buffer as any, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${slug}-cv.pdf"`,
        },
      })
    }

    // If userId provided, attempt authenticated generation using bearer token
    if (userId) {
      const authHeader = request.headers.get('authorization')
      if (!authHeader?.startsWith('Bearer ')) return NextResponse.json({ error: { message: 'Missing auth token' } }, { status: 401 })
      const token = authHeader.split(' ')[1]

      const supabase = createServerSupabase()
      const { data: userData, error: userError } = await supabase.auth.getUser(token as any)
      if (userError || !userData?.user) return NextResponse.json({ error: { message: 'Invalid token' } }, { status: 401 })

      // Ensure requested userId matches token user
      if (userData.user.id !== userId) return NextResponse.json({ error: { message: 'Forbidden' } }, { status: 403 })

      const buffer = await generateCVForUserId(userId)
      return new Response(buffer as any, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${userId}-cv.pdf"`,
        },
      })
    }

    return NextResponse.json({ error: { message: 'Missing parameters' } }, { status: 400 })
  } catch (err: any) {
    return NextResponse.json({ error: { message: err?.message ?? 'Server error' } }, { status: 500 })
  }
}
