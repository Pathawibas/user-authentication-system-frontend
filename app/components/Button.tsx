import { tv } from 'tailwind-variants'
import React from 'react'

const button = tv({
  base: `
    inline-flex items-center justify-center font-semibold rounded-xl 
    transition-all duration-200 relative overflow-hidden
    focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-1
    disabled:opacity-60 disabled:cursor-not-allowed
  `,
  variants: {
    variant: {
      primary: `
        bg-gradient-to-b from-indigo-400/90 to-indigo-500/90 border border-indigo-300/30 
        text-white shadow-sm
        hover:from-indigo-500/90 hover:to-indigo-600/90 hover:shadow
        active:shadow-inner active:translate-y-[0.5px]
        backdrop-blur-sm
      `,
      secondary: `
        bg-gradient-to-b from-white/95 to-white/85 border border-indigo-300 
        text-indigo-600 shadow-sm
        hover:bg-indigo-50/90 hover:shadow
        active:bg-indigo-100/80 active:shadow-inner active:translate-y-[0.5px]
        backdrop-blur-sm
      `,
      danger: `
        bg-gradient-to-b from-red-400/90 to-red-500/90 border border-red-300/30 
        text-white shadow-sm
        hover:from-red-500/90 hover:to-red-600/90 hover:shadow
        active:shadow-inner active:translate-y-[0.5px]
        backdrop-blur-sm
      `,
      icon: `
        p-2 rounded-lg bg-gradient-to-b from-white/95 to-white/85 border border-slate-200 
        text-indigo-500 
        hover:bg-indigo-50/80 hover:shadow-sm
        active:shadow-inner active:translate-y-[0.5px]
        backdrop-blur-sm
      `,
    },
    size: {
      sm: 'text-xs px-3 py-1.5',
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
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  loading?: boolean
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  iconLeft,
  iconRight,
  loading = false,
  disabled = false,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading

  return (
    <button
      className={button({ variant, size, className })}
      disabled={isDisabled}
      {...props}
    >
      {/* Button Content */}
      <span className='relative flex items-center justify-center gap-2'>
        {loading ? (
          <>
            <span className='mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent opacity-80'></span>
            <span>Loading...</span>
          </>
        ) : (
          <>
            {iconLeft && (
              <span className='mr-1.5 inline-flex transition-transform duration-200'>
                {iconLeft}
              </span>
            )}
            {children}
            {iconRight && (
              <span className='ml-1.5 inline-flex transition-transform duration-200'>
                {iconRight}
              </span>
            )}
          </>
        )}
      </span>
    </button>
  )
}
