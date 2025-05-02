import { useState } from 'react'
import ProfileInfoCard from './ProfileInfoCard'
import { userInfoConfig } from './userInfoConfig'

interface UserInfoSectionProps {
  user: any
  className?: string
  children?: React.ReactNode
  defaultExpanded?: boolean
}

export default function UserInfoSection({
  user,
  className = '',
  children,
  defaultExpanded = false,
}: UserInfoSectionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  // Keys to exclude from details when expanded (shown in summary only)
  const summaryKeys = ['fullName', 'email', 'id']
  return (
    <div className={`w-full space-y-4 ${className}`}>
      {!expanded && (
        <div
          className='group flex cursor-pointer items-center justify-between rounded-xl transition-colors hover:bg-indigo-50/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400'
          tabIndex={0}
          role='button'
          aria-pressed='false'
          aria-expanded='false'
          onClick={() => setExpanded(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setExpanded(true)
          }}
        >
          <div className='flex flex-col gap-1 md:flex-row md:items-center md:gap-4'>
            <span className='font-bold text-indigo-700'>{user.fullName}</span>
            <span className='text-xs text-slate-500 md:text-sm'>
              {user.email}
            </span>
            <span className='text-xs text-slate-400'>ID: {user.id}</span>
          </div>
          <button
            type='button'
            className='ml-2 flex items-center gap-1 rounded px-2 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 active:scale-95'
            onClick={(e) => {
              e.stopPropagation()
              setExpanded((v) => !v)
            }}
            aria-expanded={expanded}
          >
            Show Details
            <svg
              width='16'
              height='16'
              fill='none'
              viewBox='0 0 24 24'
              className='transition-transform duration-200'
            >
              <path
                d='M6 9l6 6 6-6'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
        </div>
      )}
      {expanded && (
        <>
          <div className='flex justify-end'>
            <button
              type='button'
              className='mb-2 flex items-center gap-1 rounded px-2 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 active:scale-95'
              onClick={() => setExpanded(false)}
              aria-expanded='true'
              aria-pressed='true'
            >
              Hide Details
              <svg
                width='16'
                height='16'
                fill='none'
                viewBox='0 0 24 24'
                className='rotate-180 transition-transform duration-200'
              >
                <path
                  d='M6 9l6 6 6-6'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          </div>
          <div
            className='origin-top scale-y-100 space-y-4 opacity-100 transition-all duration-500 ease-in-out'
            style={{
              transform: expanded ? 'scaleY(1)' : 'scaleY(0.95)',
              opacity: expanded ? 1 : 0,
            }}
          >
            {userInfoConfig
              .filter((field) => field.key !== 'id')
              .map((field) => {
                // Special rendering for gender, interests, and receiveNewsletter
                if (field.key === 'gender') {
                  return (
                    <ProfileInfoCard
                      key={field.key}
                      icon={field.icon}
                      label={field.label}
                      value={
                        user.gender ? (
                          user.gender.charAt(0).toUpperCase() +
                          user.gender.slice(1)
                        ) : (
                          <span className='text-gray-400 italic'>
                            No gender specified
                          </span>
                        )
                      }
                    />
                  )
                }
                if (field.key === 'interests') {
                  return (
                    <ProfileInfoCard
                      key={field.key}
                      icon={field.icon}
                      label={field.label}
                      value={
                        Array.isArray(user.interests) &&
                        user.interests.length > 0 ? (
                          user.interests.join(', ')
                        ) : (
                          <span className='text-gray-400 italic'>
                            No interests
                          </span>
                        )
                      }
                    />
                  )
                }
                if (field.key === 'receiveNewsletter') {
                  return (
                    <ProfileInfoCard
                      key={field.key}
                      icon={field.icon}
                      label={field.label}
                      value={
                        user.receiveNewsletter ? (
                          'Yes'
                        ) : (
                          <span className='text-gray-400 italic'>No</span>
                        )
                      }
                    />
                  )
                }
                return (
                  <ProfileInfoCard
                    key={field.key}
                    icon={field.icon}
                    label={field.label}
                    isSpoiler={field.isSpoiler}
                    spoilerLabel={field.spoilerLabel}
                    value={field.render ? field.render(user) : user[field.key]}
                  />
                )
              })}
            {children}
          </div>
        </>
      )}
    </div>
  )
}
