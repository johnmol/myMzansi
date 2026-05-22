import * as React from 'react'
import { cn } from '../../lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost' | 'outline'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const base = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
    const variants: Record<string, string> = {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2',
      ghost: 'bg-transparent px-3 py-1',
      outline: 'border border-muted px-4 py-2'
    }

    return (
      <button ref={ref} className={cn(base, variants[variant], className)} {...props} />
    )
  }
)
Button.displayName = 'Button'
