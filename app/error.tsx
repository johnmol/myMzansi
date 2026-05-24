"use client"

import { useEffect } from 'react'
import Link from 'next/link'
import { Card, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'

type ErrorPageProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16">
      <Card className="w-full max-w-xl p-6 text-center sm:p-8">
        <CardHeader className="space-y-3 p-0">
          <CardTitle className="text-3xl">Something went wrong</CardTitle>
          <CardDescription>
            We hit an unexpected problem while loading this page.
          </CardDescription>
        </CardHeader>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button onClick={reset}>Try again</Button>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-md border border-[var(--border-default)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-surface-raised)]"
          >
            Open dashboard
          </Link>
        </div>
      </Card>
    </main>
  )
}