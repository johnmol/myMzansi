import { NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase'
import { generateCVForPublicSlug, generateCVForUserId } from '@/src/services/cv.service'

function sanitizeAttachmentFilename(value: string, fallback: string) {
  const sanitized = value
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .replace(/[\\/:")(<>'`|?*]+/g, '')
    .replace(/[^A-Za-z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return sanitized || fallback
}

function buildPdfResponse(buffer: BodyInit, filename: string) {
  const safeFilename = sanitizeAttachmentFilename(filename, 'cv.pdf')

  return new Response(buffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${safeFilename}"`,
      'Cache-Control': 'private, no-store',
      Vary: 'Authorization',
    },
  })
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const slug = url.searchParams.get('slug')
    const userId = url.searchParams.get('userId')

    if (slug && userId) {
      return NextResponse.json({ error: { message: 'Provide either slug or userId, not both' } }, { status: 400 })
    }

    console.info('[cv/generate] request started', {
      hasSlug: Boolean(slug),
      hasUserId: Boolean(userId),
    })

    if (slug) {
      console.info('[cv/generate] public slug branch', { slug })
      console.info('[cv/generate] generating public PDF', { slug })
      const buffer = await generateCVForPublicSlug(slug)
      return buildPdfResponse(buffer as unknown as BodyInit, `${slug}-cv.pdf`)
    }

    if (userId) {
      const authHeader = request.headers.get('authorization')
      if (!authHeader?.startsWith('Bearer ')) {
        return NextResponse.json({ error: { message: 'Missing auth token' } }, { status: 401 })
      }

      const token = authHeader.slice('Bearer '.length)
      const supabase = createServerSupabase(token)
      const { data, error } = await supabase.auth.getUser(token)

      if (error || !data.user) {
        return NextResponse.json({ error: { message: 'Invalid token' } }, { status: 401 })
      }

      if (data.user.id !== userId) {
        return NextResponse.json({ error: { message: 'Forbidden' } }, { status: 403 })
      }

      console.info('[cv/generate] authenticated user branch', { userId })
      console.info('[cv/generate] generating authenticated PDF', { userId })
      const buffer = await generateCVForUserId(userId, token)
      return buildPdfResponse(buffer as unknown as BodyInit, `${userId}-cv.pdf`)
    }

    return NextResponse.json({ error: { message: 'Missing parameters' } }, { status: 400 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Server error'
    console.error('[cv/generate] request failed', { message, error })
    return NextResponse.json({ error: { message } }, { status: 500 })
  }
}
