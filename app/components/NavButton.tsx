import React, { memo } from 'react'
import { NavLink } from 'react-router'
import type { ReactNode } from 'react'
import { useState } from 'react'

interface NavButtonProps {
  to: string
  icon: ReactNode
  label: string
  labelWidth?: string // e.g. w-[60px]
}

export default memo(function NavButton({
  to,
  icon,
  label,
  labelWidth = 'w-[60px]',
}: NavButtonProps) {
  const [hovered, setHovered] = useState(false)
  return (
    <NavLink
      to={to}
      className={({ isActive }: { isActive: boolean }) =>
        `group relative flex items-center gap-2 overflow-hidden rounded-xl px-2 py-2 font-medium transition-all duration-300 ${
          isActive
            ? 'border border-indigo-200/40 bg-gradient-to-br from-indigo-300/50 via-indigo-200/70 to-indigo-100/60 text-indigo-900 shadow-inner backdrop-blur-sm'
            : 'text-slate-700 hover:border hover:border-indigo-100/30 hover:bg-white/60 hover:shadow-md hover:backdrop-blur-sm'
        }`
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {({ isActive }: { isActive: boolean }) => {
        const showLabel = hovered || isActive
        return (
          <>
            {/* Skeuomorphic Icon Container */}
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-white/80 text-indigo-600 shadow-inner'
                  : 'text-indigo-500 group-hover:bg-white/80 group-hover:shadow-inner'
              }`}
            >
              {icon}
            </span>

            {/* Expanding Label Container */}
            <span
              className={
                `flex h-7 items-center overflow-hidden whitespace-nowrap transition-all duration-500 ${labelWidth} text-sm` +
                ` ${showLabel ? 'max-w-[120px] opacity-100' : 'max-w-0 opacity-0'} `
              }
              style={{
                transition: 'max-width 0.4s, opacity 0.3s',
              }}
            >
              {label}
            </span>

            {/* Subtle background blob effect on hover */}
            <span
              className={`absolute inset-0 -z-10 rounded-xl transition-opacity duration-300 ${
                showLabel ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <span className='absolute -top-8 -right-8 h-16 w-16 rounded-full bg-indigo-200/20 blur-xl'></span>
              <span className='absolute -bottom-8 -left-8 h-16 w-16 rounded-full bg-indigo-100/20 blur-xl'></span>
            </span>
          </>
        )
      }}
    </NavLink>
  )
})
