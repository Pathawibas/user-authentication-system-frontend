import React from 'react'

interface ProfileInfoCardProps {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
  children?: React.ReactNode
  className?: string
}

export default function ProfileInfoCard({
  icon,
  label,
  value,
  children,
  className = '',
}: ProfileInfoCardProps) {
  return (
    <div
      className={`flex items-center gap-3 rounded-xl border border-slate-200 bg-white/90 px-5 py-3 shadow-inner ${className}`}
    >
      {icon}
      <span className='min-w-[120px] font-semibold text-indigo-700'>
        {label}
      </span>
      <span className='flex-1 break-all text-gray-700'>{value}</span>
      {children}
    </div>
  )
}
