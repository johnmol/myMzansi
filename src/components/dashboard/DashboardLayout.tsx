import React from 'react'
import Nav from './Nav'

type Props = {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-[var(--bg-base)]">
      <div className="flex flex-col md:flex-row min-h-screen">
        <Nav />

        <main className="flex-1 md:max-h-screen md:overflow-y-auto pb-20 md:pb-0">
          <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
