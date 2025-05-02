import React, { useState } from 'react'

interface ProfileInfoCardProps {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
  children?: React.ReactNode
  className?: string
  isSpoiler?: boolean
  spoilerLabel?: string
}

export default function ProfileInfoCard({
  icon,
  label,
  value,
  children,
  className = '',
  isSpoiler = false,
  spoilerLabel = 'Reveal',
}: ProfileInfoCardProps) {
  const [revealed, setRevealed] = useState(false)
  return (
    <div
      className={`flex items-center gap-3 rounded-xl border border-slate-200 bg-white/90 px-5 py-3 shadow-inner ${className}`}
    >
      {icon}
      <span className='min-w-[120px] font-semibold text-indigo-700'>
        {label}
      </span>
      {isSpoiler ? (
        <span className='flex-1 break-all text-gray-700'>
          {revealed ? (
            value
          ) : (
            <button
              type='button'
              className='rounded bg-slate-200 px-2 py-1 text-xs font-semibold text-slate-600 transition-colors duration-150 hover:bg-slate-300'
              onClick={() => setRevealed(true)}
            >
              {spoilerLabel}
            </button>
          )}
        </span>
      ) : (
        <span className='flex-1 break-all text-gray-700'>{value}</span>
      )}
      {children}
    </div>
  )
}
