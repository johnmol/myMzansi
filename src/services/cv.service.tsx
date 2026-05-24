import { pdf } from '@react-pdf/renderer'
import { getProfile, getPublicProfileBySlug } from './profiles.service'
import { getCredentialsByUser } from './credentials.service'
import { CVDocument } from '@/src/components/cv/CVDocument'

export async function generateCVForUserId(userId: string) {
  const profile = await getProfile(userId)
  if (!profile) throw new Error('Profile not found')

  const credentials = await getCredentialsByUser(userId)

  const doc = <CVDocument profile={profile} credentials={credentials} />
  const buffer = await pdf(doc).toBuffer()
  return buffer
}

export async function generateCVForPublicSlug(slug: string) {
  const profile = await getPublicProfileBySlug(slug)
  if (!profile) throw new Error('Public profile not found')

  const credentials = await getCredentialsByUser(profile.id)

  const doc = <CVDocument profile={profile} credentials={credentials} />
  const buffer = await pdf(doc).toBuffer()
  return buffer
}

export default generateCVForUserId
