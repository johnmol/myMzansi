import Link from 'next/link'
import React from 'react'
import Nav from './Nav'

type Props = {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          <Nav />

          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile bottom nav is handled inside Nav component */}
    </div>
  )
}
