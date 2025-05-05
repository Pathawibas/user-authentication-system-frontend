import {
  ChevronDown,
  ChevronUp,
  User as UserIcon,
  Trash2,
  LogIn,
} from 'lucide-react'
import ProfileInfoCard from './ProfileInfoCard'
import type { User } from '../types/User'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import { userInfoConfig } from './userInfoConfig'
import Button from './Button'

interface UserCardProps {
  user: User
  onDelete: (id: string) => void
}

export default function UserCard({ user, onDelete }: UserCardProps) {
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(false)

  return (
    <div className='relative overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-b from-white/95 to-white/85 p-6 shadow-lg backdrop-blur-sm transition-all duration-200 hover:shadow-xl'>
      <div className='pointer-events-none absolute -top-20 -left-20 h-32 w-32 rounded-full bg-indigo-200/30 blur-3xl'></div>
      <div className='pointer-events-none absolute -right-20 -bottom-20 h-32 w-32 rounded-full bg-indigo-300/20 blur-3xl'></div>
      <div className='pointer-events-none absolute inset-x-0 top-0 h-[20%] bg-white/30'></div>
      <div className='relative z-10'>
        <div className='mb-4 flex items-center justify-between'>
          <div className='flex min-w-0 flex-grow items-center gap-4'>
            <div className='h-14 w-14 flex-shrink-0 rounded-full border border-indigo-100/50 bg-gradient-to-br from-indigo-100 via-white to-indigo-50 p-0.5 shadow-lg'>
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
                      size={28}
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
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
          >
            <span>{expanded ? 'Hide Details' : 'View Details'}</span>
            {expanded ? (
              <ChevronUp
                size={18}
                className='transition-transform duration-200 group-hover:translate-y-[-1px]'
              />
            ) : (
              <ChevronDown
                size={18}
                className='transition-transform duration-200 group-hover:translate-y-[1px]'
              />
            )}
          </button>
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ease-out ${
            expanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div
            className={`origin-top transition-all duration-300 ease-out ${
              expanded ? 'translate-y-0 scale-100' : 'translate-y-4 scale-95'
            }`}
          >
            <div className='my-3 h-px w-full bg-gradient-to-r from-transparent via-indigo-200/50 to-transparent'></div>
            <div className='mb-6 space-y-4'>
              {userInfoConfig
                .filter((field) => !['fullName', 'email'].includes(field.key))
                .map((field) => {
                  const rendered = field.render ? field.render(user) : undefined
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
                        showCopy={false}
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
                        showCopy={false}
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
                  // Handle fields with custom render returning { value, copyValue }
                  if (
                    rendered &&
                    typeof rendered === 'object' &&
                    'value' in rendered
                  ) {
                    return (
                      <ProfileInfoCard
                        key={field.key}
                        icon={field.icon}
                        label={field.label}
                        isSpoiler={field.isSpoiler}
                        spoilerLabel={field.spoilerLabel}
                        value={rendered.value}
                        copyValue={rendered.copyValue}
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
                      value={rendered ?? user[field.key as keyof User]}
                    />
                  )
                })}
            </div>
          </div>
        </div>
        <div className='mt-2 flex justify-end gap-3'>
          <Button
            onClick={() =>
              navigate(`/login?email=${encodeURIComponent(user.email)}`)
            }
            variant='secondary'
            size='sm'
            className='text-xs transition-transform duration-150 hover:scale-105 hover:shadow-lg active:scale-95'
            title='Login as this user'
            iconLeft={<LogIn size={16} />}
          >
            Login as
          </Button>
          <Button
            onClick={() => onDelete(user.id)}
            variant='danger'
            size='sm'
            className='text-xs transition-transform duration-150 hover:scale-105 hover:shadow-lg active:scale-95'
            title='Delete user'
            iconLeft={<Trash2 size={16} />}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}
