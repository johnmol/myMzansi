import React from 'react'
import { Document, Page, Text } from '@react-pdf/renderer'
import type { Profile } from '@/src/types/profile'
import type { Credential } from '@/src/types/credential'

export interface CVDocumentProps {
  profile?: Profile | null
  credentials?: Credential[] | null
}

export function CVDocument({ profile, credentials = [] }: CVDocumentProps) {
  const safeProfile = profile ?? null
  const safeCredentials = Array.isArray(credentials) ? credentials : []

  return (
    <Document>
      <Page size="A4">
        <Text>{safeProfile?.full_name ?? 'No name'}</Text>
        {safeProfile?.headline ? <Text>{safeProfile.headline}</Text> : null}
        {safeProfile?.location ? <Text>{safeProfile.location}</Text> : null}
        {safeProfile?.bio ? <Text>{safeProfile.bio}</Text> : null}
        <Text>Credentials</Text>
        {safeCredentials.length === 0 ? (
          <Text>No credentials listed.</Text>
        ) : (
          safeCredentials.map((credential) => (
            <Text key={credential.id}>
              {credential.title} - {credential.institution_name}
            </Text>
          ))
        )}
      </Page>
    </Document>
  )
}

export default CVDocument
