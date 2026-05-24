import React from 'react'
import Nav from './Nav'

type Props = {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="flex flex-col gap-6 md:flex-row">
          <Nav />

          <main className="flex-1 pb-24 md:pb-0">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile bottom nav is handled inside Nav component */}
    </div>
  )
}
