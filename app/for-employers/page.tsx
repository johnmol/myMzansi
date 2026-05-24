import Link from 'next/link'
import { Button } from '../../components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription } from '../../components/ui/card'
import { BookOpen, AlertTriangle, CheckCircle, Users } from 'lucide-react'
import { cn } from '../../lib/utils'

export default function ForEmployers() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section
        className={cn('container mx-auto px-6 py-20 text-center')}
        style={{ backgroundColor: 'var(--bg-surface-raised)' }}
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
            Find Verified Talent Faster in South Africa
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Access clean, professional profiles with attached credentials so you can evaluate applicants with confidence.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/" aria-label="Browse Public Profiles">
              <Button className="px-6 py-3" style={{ backgroundColor: 'var(--accent-primary)', borderColor: 'var(--accent-primary)', color: 'white' }}>
                Browse Public Profiles
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold text-center">The Challenge for Employers</h2>
        <div className="mt-6 max-w-4xl mx-auto text-muted-foreground">
          <p>
            Many employers spend hours verifying qualifications or dismiss qualified candidates due to uncertainty.
            Documents are often scattered across emails, PDFs and applicant portals — slowing hiring and increasing risk.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-6 py-12">
        <h3 className="text-center text-2xl font-semibold">Benefits for Employers</h3>
        <div className="mt-8 grid sm:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md" style={{ backgroundColor: 'var(--accent-light)' }}>
                <BookOpen className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
              </div>
              <div>
                <h4 className="font-semibold">View Real Credentials</h4>
                <p className="text-sm text-muted-foreground">Open certificates and files attached to profiles for fast verification.</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md" style={{ backgroundColor: 'var(--accent-light)' }}>
                <Users className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
              </div>
              <div>
                <h4 className="font-semibold">Clean Professional Profiles</h4>
                <p className="text-sm text-muted-foreground">Profiles present skills, experience and credentials in a clear, scannable layout.</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md" style={{ backgroundColor: 'var(--accent-light)' }}>
                <CheckCircle className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
              </div>
              <div>
                <h4 className="font-semibold">Easy Shareable Links</h4>
                <p className="text-sm text-muted-foreground">Candidates can send a single link to a public profile — no attachments required.</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="container mx-auto px-6 py-12">
        <h3 className="text-center text-2xl font-semibold">How It Works</h3>
        <div className="mt-8 grid sm:grid-cols-3 gap-6">
          <Card className="flex flex-col items-start gap-3 p-4">
            <div className="p-3 rounded-md" style={{ backgroundColor: 'var(--accent-light)' }}>
              <AlertTriangle className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
            </div>
            <CardHeader>
              <CardTitle>1. Candidates Upload</CardTitle>
              <CardDescription>Candidates add qualifications and attach certificate files to their profile.</CardDescription>
            </CardHeader>
          </Card>

          <Card className="flex flex-col items-start gap-3 p-4">
            <div className="p-3 rounded-md" style={{ backgroundColor: 'var(--accent-light)' }}>
              <Users className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
            </div>
            <CardHeader>
              <CardTitle>2. Profiles Are Visible</CardTitle>
              <CardDescription>Public profiles display credentials and documents in a consistent layout.</CardDescription>
            </CardHeader>
          </Card>

          <Card className="flex flex-col items-start gap-3 p-4">
            <div className="p-3 rounded-md" style={{ backgroundColor: 'var(--accent-light)' }}>
              <CheckCircle className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
            </div>
            <CardHeader>
              <CardTitle>3. Review Quickly</CardTitle>
              <CardDescription>Open attached certificates and make faster shortlisting decisions.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <section className="container mx-auto px-6 py-12">
        <h3 className="text-center text-2xl font-semibold">Trust Signals</h3>
        <div className="mt-6 max-w-3xl mx-auto text-muted-foreground text-center">
          <p>
            Profiles prioritise clarity and verifiability. In future releases we will surface institution verification badges
            and partner trust marks to further accelerate hiring decisions.
          </p>
        </div>
      </section>

      <footer className="border-t mt-12 bg-background/50">
        <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between">
          <div className="text-sm text-muted-foreground">© {new Date().getFullYear()} myMzansi — All rights reserved.</div>
          <div className="mt-4 md:mt-0 flex gap-4">
            <Link href="/" className="text-sm text-muted-foreground">Home</Link>
            <Link href="/privacy" className="text-sm text-muted-foreground">Privacy</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
