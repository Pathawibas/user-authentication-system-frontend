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
        `group flex items-center rounded-xl px-2 py-2 font-semibold transition-colors ${isActive ? 'bg-indigo-200/70 text-indigo-900' : 'text-slate-700 hover:bg-indigo-100/70'}`
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {({ isActive }: { isActive: boolean }) => {
        const showLabel = hovered || isActive
        return (
          <>
            <span className='flex h-7 w-7 items-center justify-center text-indigo-500'>
              {icon}
            </span>
            <span
              className={
                `ml-0 flex h-7 items-center overflow-hidden whitespace-nowrap transition-all duration-400 ${labelWidth} text-sm leading-7` +
                ` ${showLabel ? 'ml-2 max-w-[120px] opacity-100' : 'max-w-0 opacity-0'} `
              }
              style={{
                transition: 'max-width 0.4s, opacity 0.3s, margin 0.3s',
              }}
            >
              {label}
            </span>
          </>
        )
      }}
    </NavLink>
  )
})
