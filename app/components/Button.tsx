import { tv } from 'tailwind-variants'
import React from 'react'

const button = tv({
  base: 'inline-flex items-center justify-center font-semibold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:opacity-60 disabled:cursor-not-allowed',
  variants: {
    variant: {
      primary:
        'bg-indigo-500/80 border border-indigo-300/30 text-white shadow-inner backdrop-blur hover:bg-indigo-600/90',
      secondary:
        'bg-white border border-indigo-300 text-indigo-600 shadow hover:bg-indigo-50',
      danger:
        'bg-gradient-to-br from-red-400/80 via-red-500/80 to-red-600/80 border border-red-200/40 text-white shadow-[0_2px_8px_0_rgba(239,68,68,0.10)] hover:bg-red-600/90',
      icon: 'p-2 rounded-lg border border-slate-200 bg-white/70 text-indigo-500 hover:bg-indigo-100/60',
    },
    size: {
      sm: 'text-xs px-3 py-1',
      md: 'text-sm px-4 py-2',
      lg: 'text-base px-6 py-3',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'icon'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={button({ variant, size, className })} {...props}>
      {children}
    </button>
  )
}
