"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Card } from '../../../components/ui'
import {
  Home,
  User,
  Award,
  Briefcase,
  Zap,
  Settings,
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
      <aside className="w-64 hidden md:block">
        <Card className="p-3">
          <nav className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
                    active ? 'bg-surface-raised font-medium' : 'hover:bg-accent/5'
                  }`}
                >
                  <item.Icon className="w-4 h-4 opacity-90" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="mt-4">
            <SignOutButton />
          </div>
        </Card>
      </aside>

      {/* Mobile bottom nav */}
      <div className="fixed bottom-4 left-0 right-0 px-4 md:hidden">
        <Card className="p-2">
          <div className="flex justify-around items-center">
            {NAV_ITEMS.filter(i => ['overview','credentials','profile'].includes(i.key)).map(i => (
              <Link
                key={i.key}
                href={i.href}
                className={`flex flex-col items-center justify-center gap-1 p-3 rounded-md ${isActive(i.href) ? 'bg-surface-raised' : 'hover:bg-accent/5'}`}
              >
                <i.Icon className="w-5 h-5" />
                <span className="text-xs">{i.label}</span>
              </Link>
            ))}

            <div className="p-1">
              <SignOutButton />
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}
