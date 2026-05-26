import React from 'react'
import Nav from './Nav'

type Props = {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8 lg:py-6 min-h-screen">
        <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
          <div className="md:flex md:flex-col md:w-64 md:shrink-0 md:min-h-screen md:bg-(var(--bg-surface)) md:border-r md:border-(var(--border-default)) md:pr-6">
            <Nav />
          </div>

          <main className="flex-1 pb-16 md:pb-0 md:pl-6 md:border-l md:border-(var(--border-default))">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile bottom nav is handled inside Nav component */}
    </div>
  )
}
