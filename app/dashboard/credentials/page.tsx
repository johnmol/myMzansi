import React from 'react'
import DashboardLayout from '../../../src/components/dashboard/DashboardLayout'
import CredentialList from '../../../src/components/credentials/CredentialList'
import { cn } from '../../../lib/utils'

export default function CredentialsPage() {
  return (
    <DashboardLayout>
      <div className={cn('p-6')}>
        <div className={cn('max-w-3xl')}>
          <h1 className={cn('text-2xl font-semibold')}>My Credentials</h1>
          <div className={cn('mt-6')}>
            <CredentialList />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
