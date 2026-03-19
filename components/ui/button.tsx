'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  external?: boolean
  children: React.ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit'
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  external,
  children,
  className,
  onClick,
  disabled,
  type = 'button',
}: ButtonProps) {
  const base = 'inline-flex items-center gap-2 font-medium transition-all duration-200 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-d'

  const variants = {
    primary: 'bg-sage-d text-white hover:bg-ink shadow-[0_4px_16px_rgba(77,122,94,0.25)] hover:shadow-[0_6px_20px_rgba(26,32,24,0.2)] hover:-translate-y-0.5',
    secondary: 'bg-sage-xl text-sage-d hover:bg-sage-l border border-sage-l hover:-translate-y-0.5',
    ghost: 'text-ink-m border-b border-ink-xl hover:text-sage-d hover:border-sage-d pb-0.5 rounded-none',
    outline: 'border border-sage-d text-sage-d hover:bg-sage-xl hover:-translate-y-0.5',
  }

  const sizes = {
    sm: 'text-sm px-4 py-2',
    md: 'text-[0.9375rem] px-6 py-3.5',
    lg: 'text-base px-8 py-4',
  }

  const classes = cn(base, variants[variant], variant !== 'ghost' ? sizes[size] : 'text-[0.9375rem]', disabled && 'opacity-50 cursor-not-allowed', className)

  if (href) {
    if (external) {
      return <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>{children}</a>
    }
    return <Link href={href} className={classes}>{children}</Link>
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  )
}
