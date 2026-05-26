"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  User,
  Award,
  Briefcase,
  Zap,
  Settings,
  LogOut,
  type LucideIcon,
} from 'lucide-react'
import SignOutButton from './SignOutButton'

type NavItem = {
  key: string
  label: string
  href: string
  Icon: LucideIcon
}

const NAV_ITEMS: NavItem[] = [
  { key: 'overview', label: 'Overview', href: '/dashboard', Icon: Home },
  { key: 'profile', label: 'Profile', href: '/dashboard/profile', Icon: User },
  { key: 'credentials', label: 'Credentials', href: '/dashboard/credentials', Icon: Award },
  { key: 'experience', label: 'Experience', href: '/dashboard/experience', Icon: Briefcase },
  { key: 'skills', label: 'Skills', href: '/dashboard/skills', Icon: Zap },
  { key: 'settings', label: 'Settings', href: '/dashboard/settings', Icon: Settings },
]

export default function Nav() {
  const pathname = usePathname() || ''

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard' || pathname === '/dashboard/'
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-72 md:shrink-0">
        <div className="sticky top-0 flex flex-col h-screen bg-[var(--bg-sidebar)] border-r border-[var(--border-subtle)]">
          {/* Logo Area */}
          <div className="px-6 py-8 border-b border-[var(--border-subtle)]">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-primary)] flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-[var(--text-primary)] text-lg">MyMzansi</div>
                <div className="text-xs text-[var(--text-muted)]">Skills Platform</div>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? 'bg-[var(--accent-light)] text-[var(--accent-primary)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-raised)]'
                  }`}
                >
                  <item.Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-[var(--accent-primary)]' : 'text-[var(--text-muted)]'}`} />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Sign Out */}
          <div className="px-4 py-6 border-t border-[var(--border-subtle)]">
            <SignOutButton />
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-[var(--bg-surface)] border-t border-[var(--border-default)] safe-area-bottom">
        <div className="flex justify-around items-center py-2">
          {NAV_ITEMS.filter(i => ['overview', 'credentials', 'profile'].includes(i.key)).map(item => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-all ${
                  active
                    ? 'text-[var(--accent-primary)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                <item.Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            )
          })}

          <button className="flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all">
            <LogOut className="w-5 h-5" />
            <span className="text-xs font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    </>
  )
}
