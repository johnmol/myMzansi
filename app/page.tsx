import Link from 'next/link'
import { Button } from '../components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/card'
import { BookOpen, Users, ShieldCheck } from 'lucide-react'
import { cn } from '../lib/utils'

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section
        className={cn('container mx-auto px-6 py-20')}
        style={{ backgroundColor: 'var(--bg-surface-raised)' }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Your Verified Career Passport for South Africa
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Store, verify, and share your qualifications and skills in one trusted place.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/signup" aria-label="Create Your Profile">
              <Button className="px-6 py-3" style={{ backgroundColor: 'var(--accent-primary)', borderColor: 'var(--accent-primary)', color: 'white' }}>
                Create Your Profile
              </Button>
            </Link>
            <Link href="/for-employers" aria-label="For Employers">
              <Button variant="ghost" className="px-4 py-2">For Employers</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl font-semibold">The Problem</h2>
            <ul className="mt-4 space-y-3 list-disc list-inside text-muted-foreground">
              <li>Qualification records are scattered and hard to verify.</li>
              <li>Employers struggle to trust unverified claims.</li>
              <li>Job seekers lack a simple, portable way to present verified credentials.</li>
            </ul>
          </div>
          <div>
            <Card className="p-6" style={{ backgroundColor: 'var(--bg-surface)' }}>
              <h2 className="text-2xl font-semibold">Our Solution</h2>
              <p className="mt-4 text-muted-foreground">
                A secure, verifiable profile that aggregates your credentials and makes sharing easy and trustworthy.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-12">
        <h3 className="text-center text-2xl font-semibold">How it Works</h3>
        <div className="mt-8 grid sm:grid-cols-3 gap-6">
          <Card className="flex flex-col items-start gap-3 p-4">
            <div className="p-3 rounded-md" style={{ backgroundColor: 'var(--accent-light)' }}>
              <BookOpen className="w-6 h-6" style={{ color: 'var(--accent-primary)' }} />
            </div>
            <CardHeader>
              <CardTitle>Collect</CardTitle>
              <CardDescription>Upload certificates and qualifications to your profile.</CardDescription>
            </CardHeader>
          </Card>

          <Card className="flex flex-col items-start gap-3 p-4">
            <div className="p-3 rounded-md" style={{ backgroundColor: 'var(--accent-light)' }}>
              <Users className="w-6 h-6" style={{ color: 'var(--accent-primary)' }} />
            </div>
            <CardHeader>
              <CardTitle>Verify</CardTitle>
              <CardDescription>Trusted institutions confirm authenticity.</CardDescription>
            </CardHeader>
          </Card>

          <Card className="flex flex-col items-start gap-3 p-4">
            <div className="p-3 rounded-md" style={{ backgroundColor: 'var(--accent-light)' }}>
              <ShieldCheck className="w-6 h-6" style={{ color: 'var(--accent-primary)' }} />
            </div>
            <CardHeader>
              <CardTitle>Share</CardTitle>
              <CardDescription>Share a secure, verifiable profile with employers.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <section className="container mx-auto px-6 py-12">
        <h3 className="text-center text-2xl font-semibold">Trust & Security</h3>
        <div className="mt-8 grid sm:grid-cols-3 gap-6">
          <Card className="text-center p-6" style={{ borderTop: '4px solid var(--accent-primary)' }}>
            <CardTitle style={{ color: 'var(--accent-primary)' }}>NQF-aligned</CardTitle>
            <CardDescription className="mt-2">Built to respect national qualification frameworks and institutional standards.</CardDescription>
          </Card>
          <Card className="text-center p-6" style={{ borderTop: '4px solid var(--accent-primary)' }}>
            <CardTitle style={{ color: 'var(--accent-primary)' }}>Institution Partners</CardTitle>
            <CardDescription className="mt-2">Working with trusted training providers and institutions.</CardDescription>
          </Card>
          <Card className="text-center p-6" style={{ borderTop: '4px solid var(--accent-primary)' }}>
            <CardTitle style={{ color: 'var(--accent-primary)' }}>Secure</CardTitle>
            <CardDescription className="mt-2">Profiles and documents are stored and shared safely.</CardDescription>
          </Card>
        </div>
      </section>

      <footer className="border-t mt-12 bg-background/50">
        <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between">
          <div className="text-sm text-muted-foreground">© {new Date().getFullYear()} myMzansi — All rights reserved.</div>
          <div className="mt-4 md:mt-0 flex gap-4">
            <Link href="/about" className="text-sm text-muted-foreground">About</Link>
            <Link href="/privacy" className="text-sm text-muted-foreground">Privacy</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}