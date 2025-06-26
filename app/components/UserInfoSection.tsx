import { useState } from 'react'
import ProfileInfoCard from './ProfileInfoCard'
import { userInfoConfig } from './userInfoConfig'
import { ChevronDown, ChevronUp, User as UserIcon } from 'lucide-react'

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

  return (
    <div className={`w-full space-y-4 ${className}`}>
      {!expanded ? (
        <div
          className='relative cursor-pointer overflow-hidden rounded-xl border border-white/70 bg-gradient-to-b from-white/95 to-white/85 p-5 shadow-sm backdrop-blur-sm transition-all duration-200 hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400'
          tabIndex={0}
          role='button'
          aria-pressed='false'
          aria-expanded='false'
          onClick={() => setExpanded(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setExpanded(true)
          }}
        >
          <div className='pointer-events-none absolute inset-x-0 top-0 h-[30%] bg-white/30'></div>
          <div className='flex items-center justify-between'>
            {/* User Info with Profile Image */}
            <div className='flex min-w-0 flex-grow items-center gap-4'>
              <div className='h-12 w-12 flex-shrink-0 rounded-full border border-indigo-100/50 bg-gradient-to-br from-indigo-100 via-white to-indigo-50 p-0.5 shadow-lg'>
                <div className='flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-white'>
                  {user.profileImageUrl ? (
                    <img
                      src={user.profileImageUrl}
                      alt={`${user.fullName}'s profile`}
                      className='h-full w-full object-cover'
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        e.currentTarget.parentElement?.classList.add(
                          'bg-indigo-100/80',
                          'shadow-inner',
                        )
                      }}
                    />
                  ) : (
                    <div className='flex h-full w-full items-center justify-center bg-indigo-100/80 shadow-inner'>
                      <UserIcon
                        size={24}
                        strokeWidth={1.5}
                        className='text-indigo-500'
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className='flex min-w-0 flex-col overflow-hidden'>
                <span className='truncate bg-gradient-to-b from-indigo-700 to-indigo-900 bg-clip-text text-lg font-bold text-transparent'>
                  {user.fullName}
                </span>
                <span className='truncate text-sm text-slate-500'>
                  {user.email}
                </span>
              </div>
            </div>
            <button
              type='button'
              className='group relative ml-4 flex flex-shrink-0 items-center gap-2 rounded-xl border border-indigo-300/30 bg-gradient-to-b from-indigo-400/90 to-indigo-500/90 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:translate-y-[-1px] hover:shadow focus:ring-2 focus:ring-indigo-300 focus:ring-offset-1 focus:outline-none active:translate-y-[0.5px] active:shadow-inner'
              onClick={(e) => {
                e.stopPropagation()
                setExpanded(true)
              }}
              aria-expanded={expanded}
            >
              <span>View Details</span>
              <ChevronDown
                size={18}
                className='transition-transform duration-200 group-hover:translate-y-[1px]'
              />
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Header with Hide Details Button - With Profile Image */}
          <div className='flex items-center justify-between rounded-xl border border-white/70 bg-gradient-to-b from-indigo-50/60 to-white/60 p-5 shadow-sm backdrop-blur-sm'>
            <div className='flex min-w-0 flex-grow items-center gap-4'>
              <div className='h-12 w-12 flex-shrink-0 rounded-full border border-indigo-100/50 bg-gradient-to-br from-indigo-100 via-white to-indigo-50 p-0.5 shadow-lg'>
                <div className='flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-white'>
                  {user.profileImageUrl ? (
                    <img
                      src={user.profileImageUrl}
                      alt={`${user.fullName}'s profile`}
                      className='h-full w-full object-cover'
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        e.currentTarget.parentElement?.classList.add(
                          'bg-indigo-100/80',
                          'shadow-inner',
                        )
                      }}
                    />
                  ) : (
                    <div className='flex h-full w-full items-center justify-center bg-indigo-100/80 shadow-inner'>
                      <UserIcon
                        size={24}
                        strokeWidth={1.5}
                        className='text-indigo-500'
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className='flex min-w-0 flex-col overflow-hidden'>
                <span className='truncate bg-gradient-to-b from-indigo-700 to-indigo-900 bg-clip-text text-lg font-bold text-transparent'>
                  {user.fullName}
                </span>
                <span className='truncate text-sm text-slate-500'>
                  {user.email}
                </span>
              </div>
            </div>

            {/* Hide Details Button */}
            <button
              type='button'
              className='group relative ml-4 flex flex-shrink-0 items-center gap-2 rounded-xl border border-indigo-300/30 bg-gradient-to-b from-indigo-400/90 to-indigo-500/90 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:translate-y-[-1px] hover:shadow focus:ring-2 focus:ring-indigo-300 focus:ring-offset-1 focus:outline-none active:translate-y-[0.5px] active:shadow-inner'
              onClick={() => setExpanded(false)}
              aria-expanded='true'
              aria-pressed='true'
            >
              <span>Hide Details</span>
              <ChevronUp
                size={18}
                className='transition-transform duration-200 group-hover:translate-y-[-1px]'
              />
            </button>
          </div>

          {/* User Details with Animation */}
          <div
            className='origin-top space-y-4 opacity-100 transition-all duration-300 ease-out'
            style={{
              transform: expanded ? 'scaleY(1)' : 'scaleY(0.95)',
              opacity: expanded ? 1 : 0,
            }}
          >
            {userInfoConfig
              .filter((field) => field.key !== 'id')
              .map((field) => {
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
                          <span className='text-slate-400 italic'>
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
                          <div className='flex flex-wrap gap-2'>
                            {user.interests.map((interest: string) => (
                              <span
                                key={interest}
                                className='rounded-full border border-indigo-100/50 bg-indigo-50 px-3 py-1 text-xs text-indigo-600 shadow-sm'
                              >
                                {interest}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className='text-slate-400 italic'>
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
                          <span className='rounded-full border border-green-100/50 bg-green-50 px-3 py-1 text-xs text-green-600 shadow-sm'>
                            Yes
                          </span>
                        ) : (
                          <span className='rounded-full border border-slate-100/50 bg-slate-50 px-3 py-1 text-xs text-slate-500 shadow-sm'>
                            No
                          </span>
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
