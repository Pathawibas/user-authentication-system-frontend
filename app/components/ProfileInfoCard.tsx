import React, { useState, memo } from 'react'

interface ProfileInfoCardProps {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
  children?: React.ReactNode
  className?: string
  isSpoiler?: boolean
  spoilerLabel?: string
}

export default memo(function ProfileInfoCard({
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
      className={`flex flex-col items-start gap-1 rounded-xl border border-slate-200 bg-white/90 px-5 py-3 shadow-inner md:flex-row md:items-center md:gap-3 ${className}`}
    >
      {icon}
      <span className='min-w-[120px] font-semibold text-indigo-700 md:min-w-[120px]'>
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
})
